/* Engelsk översättning av ovningar (fy1-b). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "fy1-5.1": {
  "kalla": "73882441cb",
  "data": [
   {
    "level": 1,
    "question": "An iron cube has volume $1.0 \\cdot 10^{-3}\\ \\mathrm{m^3}$ (that is, 1.0 litre) and mass 7.87 kg. Calculate the density of iron in kg/m³.",
    "answer": {
     "value": 7870,
     "unit": "kg/m³",
     "tol": 0.02
    },
    "solution": "We use the density formula directly:\n\n$$\n\\rho = \\frac{m}{V}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 7.87\\ \\mathrm{kg} \\\\\nV = 1.0 \\cdot 10^{-3}\\ \\mathrm{m^3}\n\\end{array} \\right]\n$$\n\n$$\n\\rho = \\frac{7.87\\ \\mathrm{kg}}{1.0 \\cdot 10^{-3}\\ \\mathrm{m^3}} = 7\\,870\\ \\mathrm{kg/m^3}\n$$\n\n**Answer:** The density is about 7 900 kg/m³ (rounded to 2 significant figures) or 7.87 g/cm³."
   },
   {
    "level": 1,
    "question": "A gold ring has volume $1.5 \\cdot 10^{-6}\\ \\mathrm{m^3}$ and the density of gold is 19 300 kg/m³. What is the mass of the ring? Give the answer in kg.",
    "answer": {
     "value": 0.029,
     "unit": "kg",
     "tol": 0.03
    },
    "solution": "We solve for the mass from the density formula:\n\n$$\n\\rho = \\frac{m}{V} \\quad\\Leftrightarrow\\quad m = \\rho \\cdot V\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\rho = 19\\,300\\ \\mathrm{kg/m^3} \\\\\nV = 1.5 \\cdot 10^{-6}\\ \\mathrm{m^3}\n\\end{array} \\right]\n$$\n\n$$\nm = 19\\,300 \\cdot 1.5 \\cdot 10^{-6} = 0.02895\\ \\mathrm{kg} \\approx 0.029\\ \\mathrm{kg} = 29\\ \\mathrm{g}\n$$\n\n**Answer:** The ring has a mass of about 29 g."
   },
   {
    "level": 1,
    "question": "Aluminium has density 2.70 g/cm³. Convert this density to the SI unit **kg/m³**.",
    "answer": {
     "value": 2700,
     "unit": "kg/m³",
     "tol": 0.01
    },
    "solution": "The conversion factor between g/cm³ and kg/m³ is 1 000:\n\n$$\n1\\ \\mathrm{g/cm^3} = 1\\,000\\ \\mathrm{kg/m^3}\n$$\n\nWe therefore multiply by 1 000:\n\n$$\n2.70\\ \\mathrm{g/cm^3} = 2.70 \\cdot 1\\,000\\ \\mathrm{kg/m^3} = 2\\,700\\ \\mathrm{kg/m^3}\n$$\n\n**Answer:** 2 700 kg/m³."
   },
   {
    "level": 2,
    "question": "A copper cube has side 5.00 cm. The density of copper is 8 960 kg/m³. Calculate the mass of the cube in kg.",
    "answer": {
     "value": 1.12,
     "unit": "kg",
     "tol": 0.02
    },
    "solution": "Two steps: first calculate the volume in the SI unit m³, then use the density formula to solve for the mass.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\na = 5.00\\ \\mathrm{cm} = 0.0500\\ \\mathrm{m} \\\\\n\\rho = 8\\,960\\ \\mathrm{kg/m^3}\n\\end{array} \\right]\n$$\n\nVolume (side cubed):\n$$\nV = a^{3} = (0.0500)^{3}\\ \\mathrm{m^3} = 1.25 \\cdot 10^{-4}\\ \\mathrm{m^3}\n$$\n\nMass:\n$$\nm = \\rho \\cdot V = 8\\,960 \\cdot 1.25 \\cdot 10^{-4} = 1.12\\ \\mathrm{kg}\n$$\n\n**Answer:** The mass of the cube is 1.12 kg."
   },
   {
    "level": 2,
    "question": "A stone with mass 0.180 kg is lowered into a measuring cylinder containing water. The water level then rises from 100 ml to 165 ml. Calculate the density of the stone in kg/m³.",
    "answer": {
     "value": 2800,
     "unit": "kg/m³",
     "tol": 0.03
    },
    "solution": "The increase in volume in the measuring cylinder equals the volume of the stone (the water is displaced).\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 0.180\\ \\mathrm{kg} \\\\\n\\Delta V = 165 - 100 = 65\\ \\mathrm{ml} = 65\\ \\mathrm{cm^3} = 6.5 \\cdot 10^{-5}\\ \\mathrm{m^3}\n\\end{array} \\right]\n$$\n\nDensity:\n$$\n\\rho = \\frac{m}{V} = \\frac{0.180}{6.5 \\cdot 10^{-5}} \\approx 2\\,769\\ \\mathrm{kg/m^3}\n$$\n\nRounded to two significant figures (limited by $\\Delta V$):\n\n$$\n\\rho \\approx 2\\,800\\ \\mathrm{kg/m^3} = 2.8\\ \\mathrm{g/cm^3}\n$$\n\n**Answer:** The density of the stone is about 2 800 kg/m³.\n\n**General conclusion:** Water displacement is a classic method for measuring the volume of irregular objects. It works for anything that sinks and does not dissolve in water."
   },
   {
    "level": 2,
    "question": "A goldsmith has made a crown that is claimed to be made of **pure gold**. The crown has a mass of 320 g, and when it is lowered into a measuring cylinder with water the water level rises from 250.0 ml to 268.9 ml.\n\na) What is the density of the crown (in g/cm³)?\n\nb) Is the crown definitely made of pure gold? Pure gold has density 19.3 g/cm³.\n\n*Give your numerical calculation of the density as the answer.*",
    "answer": {
     "value": 16.9,
     "unit": "g/cm³",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 16.9,
      "unit": "g/cm³"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**a)** The increase in volume in the measuring cylinder equals the volume of the crown.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 320\\ \\mathrm{g} \\\\\n\\Delta V = 268.9 - 250.0 = 18.9\\ \\mathrm{cm^3}\n\\end{array} \\right]\n$$\n\nDensity:\n$$\n\\rho_\\text{crown} = \\frac{m}{V} = \\frac{320}{18.9} \\approx 16.9\\ \\mathrm{g/cm^3}\n$$\n\n**b)** Pure gold has density 19.3 g/cm³. The density of the crown is **clearly lower** than that:\n\n$$\n\\rho_\\text{crown} \\approx 16.9\\ \\mathrm{g/cm^3} < 19.3\\ \\mathrm{g/cm^3} = \\rho_\\text{gold}\n$$\n\nSince density is a *material property* that does not depend on the size or shape of the object, the crown **cannot** be made of pure gold. It is probably alloyed with a lighter metal (for example silver or copper).\n\n**Answer:** a) 16.9 g/cm³&emsp;&emsp;b) No. The density is clearly lower than the 19.3 g/cm³ of gold, so the crown is not made of pure gold.\n\n**General conclusion:** Measuring density by water displacement is a non-destructive method for deciding whether an object is made of the material it claims to be. Historically, it is the same method that is said to have exposed the case of Archimedes' \"gold crown\"."
   },
   {
    "level": 3,
    "question": "A small cube is cast from an alloy of **gold** ($\\rho_\\text{gold} = 19.3\\ \\mathrm{g/cm^3}$) and **silver** ($\\rho_\\text{silver} = 10.5\\ \\mathrm{g/cm^3}$). The cube has side 2.0 cm and total mass 130 g. Calculate what **percentage of the cube's mass** is gold. Ignore the fact that the volume may change slightly when the alloy is made.",
    "answer": {
     "value": 77.6,
     "unit": "%",
     "tol": 0.03
    },
    "solution": "We have two unknowns, the mass of gold $m_g$ and the mass of silver $m_s$, and need two equations.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nV = (2.0)^{3}\\ \\mathrm{cm^3} = 8.0\\ \\mathrm{cm^3} \\\\\nm_\\text{tot} = 130\\ \\mathrm{g} \\\\\n\\rho_g = 19.3\\ \\mathrm{g/cm^3} \\\\\n\\rho_s = 10.5\\ \\mathrm{g/cm^3}\n\\end{array} \\right]\n$$\n\n**Equation 1**: mass balance (the total mass is the sum of the masses of the parts):\n$$\nm_g + m_s = 130\n$$\n\n**Equation 2**: volume balance (the total volume is the sum of the volumes of the parts):\n$$\nV_g + V_s = V \\quad\\Leftrightarrow\\quad \\frac{m_g}{\\rho_g} + \\frac{m_s}{\\rho_s} = 8.0\n$$\n\nWe substitute $m_s = 130 - m_g$ into equation 2:\n\n$$\n\\frac{m_g}{19.3} + \\frac{130 - m_g}{10.5} = 8.0\n$$\n\nMultiply both sides by $19.3 \\cdot 10.5 = 202.65$:\n\n$$\n10.5\\, m_g + 19.3\\, (130 - m_g) = 8.0 \\cdot 202.65\n$$\n\n$$\n10.5\\, m_g + 2\\,509 - 19.3\\, m_g = 1\\,621.2\n$$\n\n$$\n-8.8\\, m_g = -887.8 \\quad\\Leftrightarrow\\quad m_g \\approx 100.9\\ \\mathrm{g}\n$$\n\nThe proportion of gold in the total mass:\n\n$$\n\\frac{m_g}{m_\\text{tot}} = \\frac{100.9}{130} \\approx 0.776 = 77.6\\ \\%\n$$\n\n**Answer:** About 78 % of the cube's mass is gold.\n\n**General conclusion:** Mass fractions in an alloy can be determined from a *density measurement* plus the total mass, because the two components have different densities. The same principle is used in practice by goldsmiths and when checking coins or jewellery."
   }
  ]
 },
 "fy1-5.2": {
  "kalla": "5cd55df2bd",
  "data": [
   {
    "level": 1,
    "question": "A skier with mass 70 kg stands on two skis, each with area 1 500 cm². What pressure does the skier exert on the snow? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 2290,
     "unit": "Pa",
     "tol": 0.03
    },
    "solution": "The pressure is the compressive force divided by the area:\n\n$$\np = \\frac{F}{A}\n$$\n\nMeasured values (after conversion to SI):\n\n$$\n\\left[ \\begin{array}{l}\nF = m \\cdot g = 70 \\cdot 9.82 = 687.4\\ \\mathrm{N} \\\\\nA = 2 \\cdot 1\\,500\\ \\mathrm{cm^2} = 3\\,000\\ \\mathrm{cm^2} = 0.30\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\np = \\frac{687.4}{0.30} \\approx 2\\,290\\ \\mathrm{Pa} \\approx 2.3\\ \\mathrm{kPa}\n$$\n\n**Answer:** The pressure is about 2.3 kPa."
   },
   {
    "level": 1,
    "question": "In a shark bite, the pressure is measured as 25 kN/cm². What pressure is that in pascals?",
    "answer": {
     "value": 250000000,
     "unit": "Pa",
     "tol": 0.02
    },
    "solution": "We must convert both the numerator and the denominator to SI units.\n\n$$\n\\left[ \\begin{array}{l}\nF = 25\\ \\mathrm{kN} = 25\\,000\\ \\mathrm{N} \\\\\nA = 1\\ \\mathrm{cm^2} = 1 \\cdot 10^{-4}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\np = \\frac{F}{A} = \\frac{25\\,000}{1 \\cdot 10^{-4}} = 2.5 \\cdot 10^{8}\\ \\mathrm{Pa} = 250\\ \\mathrm{MPa}\n$$\n\n**Answer:** 250 MPa (about 2 500 times normal air pressure)."
   },
   {
    "level": 1,
    "question": "A brick exerts a pressure of 1 200 Pa on the floor through its smallest face, which has area 0.025 m². What is the weight of the brick?",
    "answer": {
     "value": 30,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We solve for the compressive force from the pressure formula.\n\n$$\np = \\frac{F}{A} \\quad\\Leftrightarrow\\quad F = p \\cdot A\n$$\n\n$$\n\\left[ \\begin{array}{l}\np = 1\\,200\\ \\mathrm{Pa} \\\\\nA = 0.025\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\nF = 1\\,200 \\cdot 0.025 = 30\\ \\mathrm{N}\n$$\n\n**Answer:** The weight of the brick is 30 N (corresponding to about 3.1 kg)."
   },
   {
    "level": 2,
    "question": "A paintball gun works with an overpressure of 1.9 MPa. The barrel is circular with radius 6.0 mm. How large a force is needed to hold a finger over the barrel so that the gas cannot get out?",
    "answer": {
     "value": 215,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "The compressive force is given by $F = p \\cdot A$ where $A$ is the cross-sectional area of the barrel. The area of a circle is $\\pi r^{2}$.\n\n$$\n\\left[ \\begin{array}{l}\np = 1.9\\ \\mathrm{MPa} = 1.9 \\cdot 10^{6}\\ \\mathrm{Pa} \\\\\nr = 6.0\\ \\mathrm{mm} = 6.0 \\cdot 10^{-3}\\ \\mathrm{m} \\\\\nA = \\pi r^{2} = \\pi \\cdot (6.0 \\cdot 10^{-3})^{2} \\approx 1.131 \\cdot 10^{-4}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\nF = p \\cdot A = 1.9 \\cdot 10^{6} \\cdot 1.131 \\cdot 10^{-4} \\approx 215\\ \\mathrm{N}\n$$\n\n**Answer:** About 215 N (corresponding to the weight of about 22 kg!).\n\n**General conclusion:** This is why you should **never** try to block a paintball barrel with a finger."
   },
   {
    "level": 2,
    "question": "A person with mass 60 kg walks on a heel with area 1.0 cm². On the ground next to them stands a tank with mass 60 tonnes whose total track area is 6.0 m². How many times greater is the pressure from the heel than the pressure from the tank? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 60,
     "unit": "",
     "tol": 0.05
    },
    "solution": "We calculate the two pressures and take the ratio.\n\n**Pressure from the heel:**\n\n$$\n\\left[ \\begin{array}{l}\nF_1 = 60 \\cdot 9.82 = 589.2\\ \\mathrm{N} \\\\\nA_1 = 1.0\\ \\mathrm{cm^2} = 1.0 \\cdot 10^{-4}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\np_1 = \\frac{589.2}{1.0 \\cdot 10^{-4}} \\approx 5.9 \\cdot 10^{6}\\ \\mathrm{Pa} = 5.9\\ \\mathrm{MPa}\n$$\n\n**Pressure from the tank:**\n\n$$\n\\left[ \\begin{array}{l}\nF_2 = 60\\,000 \\cdot 9.82 = 589\\,200\\ \\mathrm{N} \\\\\nA_2 = 6.0\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\np_2 = \\frac{589\\,200}{6.0} \\approx 9.8 \\cdot 10^{4}\\ \\mathrm{Pa} = 98\\ \\mathrm{kPa}\n$$\n\n**Ratio:**\n\n$$\n\\frac{p_1}{p_2} = \\frac{5.9 \\cdot 10^{6}}{9.8 \\cdot 10^{4}} \\approx 60\n$$\n\n**Answer:** The pressure from the heel is about 60 times greater than that from the tank.\n\n**General conclusion:** This is why stiletto heels can leave permanent marks in a parquet floor, while a tank on the same floor (if it could bear the weight) does not. A small contact area gives a large pressure, which is also why skis and snowshoes work."
   },
   {
    "level": 3,
    "question": "Three steel cubes (density 7 850 kg/m³) are placed on a table. The cubes have edge lengths 4.0 cm, 8.0 cm and 16 cm respectively.\n\na) Calculate the pressure each cube exerts on the table.\n\nb) Derive a general formula for the pressure that a cube-shaped body with density *ρ* and edge length *a* exerts on the surface beneath it.\n\n*Give the pressure for the 16 cm cube as your numerical answer in Pa. Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "answer": {
     "value": 12330,
     "unit": "Pa",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3083,
      "unit": "Pa",
      "etikett": "the 4.0 cm cube",
      "tol": 0.03
     },
     {
      "del": "a",
      "value": 6166,
      "unit": "Pa",
      "etikett": "the 8.0 cm cube",
      "tol": 0.03
     },
     {
      "del": "a",
      "value": 12330,
      "unit": "Pa",
      "etikett": "the 16 cm cube",
      "tol": 0.03
     },
     {
      "del": "b"
     }
    ],
    "solution": "**a) Calculate the three pressures.** For a cube with edge length *a* the mass is $m = \\rho \\cdot V = \\rho \\cdot a^{3}$, the weight $F = m g$ and the base area $A = a^{2}$. For the 4.0 cm cube:\n\n$$\n\\left[ \\begin{array}{l}\na = 0.040\\ \\mathrm{m} \\\\\nm = 7\\,850 \\cdot (0.040)^{3} = 7\\,850 \\cdot 6.4 \\cdot 10^{-5} \\approx 0.502\\ \\mathrm{kg} \\\\\nF = 0.502 \\cdot 9.82 \\approx 4.93\\ \\mathrm{N} \\\\\nA = (0.040)^{2} = 1.6 \\cdot 10^{-3}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\np_1 = \\frac{4.93}{1.6 \\cdot 10^{-3}} \\approx 3\\,080\\ \\mathrm{Pa}\n$$\n\nWith the same method for 8.0 cm: $m \\approx 4.02$ kg, $F \\approx 39.5$ N, $A = 6.4 \\cdot 10^{-3}$ m², giving $p_2 \\approx 6\\,170$ Pa. For 16 cm: $m \\approx 32.2$ kg, $F \\approx 316$ N, $A = 2.56 \\cdot 10^{-2}$ m², giving $p_3 \\approx 12\\,330$ Pa.\n\n**b) General formula.** We substitute $F = \\rho a^{3} g$ and $A = a^{2}$ into $p = F/A$:\n\n$$\np = \\frac{\\rho \\cdot a^{3} \\cdot g}{a^{2}} = \\rho \\cdot g \\cdot a\n$$\n\n**Answer:** a) about 3.1 kPa, 6.2 kPa, 12.3 kPa. b) $p = \\rho \\cdot g \\cdot a$.\n\n**General conclusion:** Many students guess that the **smallest** cube gives the greatest pressure, because \"small area = large pressure\" is a strong intuition from the heel task. But for cubes of the same material the weight grows faster ($a^{3}$) than the base area ($a^{2}$), so a **larger** cube actually gives a **higher** pressure. This is the same principle that explains why large animals (elephants) need pillar-like legs and cannot be scaled-up copies of small animals (ants)."
   }
  ]
 },
 "fy1-5.3": {
  "kalla": "b6bdb40525",
  "data": [
   {
    "level": 1,
    "question": "Olov dives to a depth of 4.0 m in a lake. What liquid pressure then acts on him? Use the density of water 998 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 260\" style=\"max-width:360px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"20\" x2=\"30\" y2=\"240\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"310\" y1=\"20\" x2=\"310\" y2=\"240\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"30\" y1=\"240\" x2=\"310\" y2=\"240\" stroke=\"#0f1620\" stroke-width=\"2\"/><rect x=\"31\" y=\"38\" width=\"278\" height=\"202\" fill=\"rgba(56,189,248,0.18)\"/><path d=\"M 30 38 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0 q 10 6 20 0\" stroke=\"#1c3d6b\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"302\" y=\"32\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#1c3d6b\" text-anchor=\"end\">ρ = 998 kg/m³</text><rect x=\"166\" y=\"167.39999999999998\" width=\"36\" height=\"24\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/><text x=\"184\" y=\"179.39999999999998\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\">diver</text><line x1=\"80.4\" y1=\"38\" x2=\"80.4\" y2=\"179.39999999999998\" stroke=\"#8a8579\" stroke-width=\"1.4\"/><polygon points=\"76.4,44 80.4,38 84.4,44\" fill=\"#8a8579\"/><polygon points=\"76.4,173.39999999999998 80.4,179.39999999999998 84.4,173.39999999999998\" fill=\"#8a8579\"/><text x=\"88.4\" y=\"108.69999999999999\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">h = 4.0 m</text></svg>",
    "answer": {
     "value": 39200,
     "unit": "Pa",
     "tol": 0.03
    },
    "solution": "The liquid pressure is given by $p = \\rho \\cdot g \\cdot h$.\n\n$$\n\\left[ \\begin{array}{l}\n\\rho = 998\\ \\mathrm{kg/m^3} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nh = 4.0\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\np = 998 \\cdot 9.82 \\cdot 4.0 \\approx 39\\,200\\ \\mathrm{Pa} \\approx 39\\ \\mathrm{kPa}\n$$\n\n**Answer:** About 39 kPa."
   },
   {
    "level": 1,
    "question": "A tank holds biodiesel with density 0.91 g/cm³. How large is the liquid pressure at the bottom of the tank if the liquid depth is 4.6 m? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 41100,
     "unit": "Pa",
     "tol": 0.03
    },
    "solution": "We start by converting the density to SI units.\n\n$$\n\\rho = 0.91\\ \\mathrm{g/cm^3} = 910\\ \\mathrm{kg/m^3}\n$$\n\nThe liquid pressure:\n\n$$\np = \\rho \\cdot g \\cdot h = 910 \\cdot 9.82 \\cdot 4.6 \\approx 41\\,100\\ \\mathrm{Pa} \\approx 41\\ \\mathrm{kPa}\n$$\n\n**Answer:** About 41 kPa.\n\n**General conclusion:** Since biodiesel has a lower density than water (910 vs 998 kg/m³), the pressure at a given depth is somewhat lower than the corresponding pressure in water."
   },
   {
    "level": 1,
    "question": "At what depth in the sea (density 1 028 kg/m³) does the liquid pressure equal 1.0 MPa? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 99,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "We solve for the depth from the liquid pressure formula.\n\n$$\np = \\rho \\cdot g \\cdot h \\quad\\Leftrightarrow\\quad h = \\frac{p}{\\rho \\cdot g}\n$$\n\n$$\n\\left[ \\begin{array}{l}\np = 1.0\\ \\mathrm{MPa} = 1.0 \\cdot 10^{6}\\ \\mathrm{Pa} \\\\\n\\rho = 1\\,028\\ \\mathrm{kg/m^3} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg}\n\\end{array} \\right]\n$$\n\n$$\nh = \\frac{1.0 \\cdot 10^{6}}{1\\,028 \\cdot 9.82} \\approx 99\\ \\mathrm{m}\n$$\n\n**Answer:** About 99 m.\n\n**General conclusion:** A rule of thumb: in the sea the liquid pressure increases by about 1 atm (≈ 100 kPa) per 10 m of depth. At a depth of 100 m there is therefore about 10 atm of liquid pressure, which is the limit of what a trained recreational diving system can handle."
   },
   {
    "level": 2,
    "question": "Mira is diving in a lake and wants to know how large a force the liquid pressure exerts on one of her eardrums (area 65 mm²) when she is at a depth of 5.0 m. Use the density of water 998 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 3.18,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "We first need to calculate the liquid pressure and then use it to find the compressive force.\n\n**Step 1: liquid pressure:**\n\n$$\np = \\rho \\cdot g \\cdot h = 998 \\cdot 9.82 \\cdot 5.0 \\approx 49\\,000\\ \\mathrm{Pa}\n$$\n\n**Step 2: compressive force from $p = F/A$:**\n\n$$\nF = p \\cdot A\n$$\n\n$$\n\\left[ \\begin{array}{l}\np \\approx 49\\,000\\ \\mathrm{Pa} \\\\\nA = 65\\ \\mathrm{mm^2} = 65 \\cdot 10^{-6}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\nF = 49\\,000 \\cdot 65 \\cdot 10^{-6} \\approx 3.18\\ \\mathrm{N}\n$$\n\n**Answer:** About 3.2 N.\n\n**General conclusion:** So at a depth of only 5 m the eardrum feels a force corresponding to the weight of just over 300 grams. This is why you need to \"pinch your nose\" to equalise the pressure when diving."
   },
   {
    "level": 2,
    "question": "A U-tube is filled with an unknown liquid on the left and with water on the right. The water column is 24 cm high and the liquid in the left arm is 30 cm high, and both liquid surfaces are in equilibrium. Determine the density of the unknown liquid. Use the density of water 998 kg/m³.",
    "answer": {
     "value": 798,
     "unit": "kg/m³",
     "tol": 0.03
    },
    "solution": "In a U-tube the liquid pressure at the bottom of the U-tube (or at the same height in both arms) must be equal, otherwise liquid would flow across. We set:\n\n$$\n\\rho_\\mathrm{unknown} \\cdot g \\cdot h_\\mathrm{unknown} = \\rho_\\mathrm{water} \\cdot g \\cdot h_\\mathrm{water}\n$$\n\nThe gravitational field strength *g* cancels, and we solve for the unknown density:\n\n$$\n\\rho_\\mathrm{unknown} = \\rho_\\mathrm{water} \\cdot \\frac{h_\\mathrm{water}}{h_\\mathrm{unknown}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\n\\rho_\\mathrm{water} = 998\\ \\mathrm{kg/m^3} \\\\\nh_\\mathrm{water} = 24\\ \\mathrm{cm} \\\\\nh_\\mathrm{unknown} = 30\\ \\mathrm{cm}\n\\end{array} \\right]\n$$\n\n$$\n\\rho_\\mathrm{unknown} = 998 \\cdot \\frac{24}{30} \\approx 798\\ \\mathrm{kg/m^3}\n$$\n\n**Answer:** The unknown liquid has a density of about 800 kg/m³ (roughly that of cooking oil or paraffin).\n\n**General conclusion:** This is how a **U-tube** can be used as a density meter: you only need to measure two column heights. Note that the unit for *h* does not have to be metres; as long as both sides use the same unit (cm) you get the correct ratio."
   },
   {
    "level": 3,
    "question": "A block of flats is supplied with water from a water tower in which the water surface lies 30 m above the ground. The tenants experience different water pressure in their taps depending on which floor they live on.\n\na) What overpressure (in addition to air pressure) does the water have at a tap at ground level?\n\nb) What overpressure does the water have on the top floor, where the tap is 22 m above the ground?\n\nc) Lina lives at ground level and accidentally loosens a plug in the inlet hose of her washing machine before she has turned off the water. The inner opening of the hose is 7.0 mm in diameter. How large a force must she hold back with her thumb to stop the jet of water right at the opening?\n\n*Use the density of water 998 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$. Give the force from (c) as your numerical answer.*",
    "answer": {
     "value": 11.3,
     "unit": "N",
     "tol": 0.05
    },
    "delsvar": [
     {
      "del": "a",
      "value": 294,
      "unit": "kPa",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 78.4,
      "unit": "kPa",
      "tol": 0.03
     },
     {
      "del": "c",
      "value": 11.3,
      "unit": "N",
      "tol": 0.05
     }
    ],
    "solution": "**a) Overpressure at ground level.** The difference in water level is the full height of the tower, 30 m:\n\n$$\n\\Delta p_a = \\rho \\cdot g \\cdot h = 998 \\cdot 9.82 \\cdot 30 \\approx 294\\,000\\ \\mathrm{Pa} \\approx 294\\ \\mathrm{kPa}\n$$\n\n**b) Overpressure on the top floor.** The effective height difference between the water surface in the tower and the tap is now only $30 - 22 = 8.0$ m:\n\n$$\n\\Delta p_b = \\rho \\cdot g \\cdot (30 - 22) = 998 \\cdot 9.82 \\cdot 8.0 \\approx 78\\,400\\ \\mathrm{Pa} \\approx 78\\ \\mathrm{kPa}\n$$\n\n**c) Force on the thumb.** The thumb is subjected to the **overpressure** from the hose (the total pressure from inside minus the air pressure from outside, which would have pushed on the outside of the thumb anyway). We use the overpressure at ground level from (a):\n\n$$\n\\left[ \\begin{array}{l}\n\\Delta p = 294\\,000\\ \\mathrm{Pa} \\\\\nr = 3.5\\ \\mathrm{mm} = 3.5 \\cdot 10^{-3}\\ \\mathrm{m} \\\\\nA = \\pi r^{2} = \\pi \\cdot (3.5 \\cdot 10^{-3})^{2} \\approx 3.85 \\cdot 10^{-5}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\nF = \\Delta p \\cdot A = 294\\,000 \\cdot 3.85 \\cdot 10^{-5} \\approx 11.3\\ \\mathrm{N}\n$$\n\n**Answer:** a) about 294 kPa. b) about 78 kPa. c) about 11 N (corresponding to the weight of about 1.2 kg).\n\n**General conclusion:** This is why taps on the top floors feel \"weaker\": the height difference between the water source and the tap is smaller. A common trap in (c) is to use the **total pressure** ($p_0 + \\rho g h$) instead of the overpressure. But since the air pressure pushes just as hard on the outside of the thumb, they cancel, and only the overpressure contributes to the net force."
   }
  ]
 },
 "fy1-5.4": {
  "kalla": "89dd85c503",
  "data": [
   {
    "level": 1,
    "question": "At normal sea level the air pressure is 101.3 kPa. How many pascals (Pa) is that? How many bar?",
    "choices": [
     "101 300 Pa and 1.013 bar",
     "1 013 Pa and 10 130 bar",
     "1.013 Pa and 0.1013 bar",
     "10 130 000 Pa and 100 bar"
    ],
    "correct": 0,
    "solution": "According to the table in the theory:\n\n- 1 kPa = 1 000 Pa, so 101.3 kPa = 101 300 Pa.\n- 1 bar = 100 000 Pa, so 101 300 Pa / 100 000 = 1.013 bar.\n\n**Answer:** Option A: 101 300 Pa and 1.013 bar.\n\n**General conclusion:** The air pressure at sea level is usually rounded to $1\\ \\mathrm{atm} = 101\\,325\\ \\mathrm{Pa} \\approx 1\\ \\mathrm{bar} = 100\\ \\mathrm{kPa}$. The difference between atm and bar is only about 1 %, so they can often be treated as equivalent in rough estimates."
   },
   {
    "level": 1,
    "question": "You dive to a depth of 3.0 m in a lake where the air pressure at the surface is 101.3 kPa. How large is **the total pressure** on you at that depth? Use the density of water 998 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 130700,
     "unit": "Pa",
     "tol": 0.02
    },
    "solution": "The total pressure is the sum of the air pressure at the surface and the liquid pressure.\n\n$$\np = p_0 + \\rho \\cdot g \\cdot h\n$$\n\n$$\n\\left[ \\begin{array}{l}\np_0 = 101.3\\ \\mathrm{kPa} = 101\\,300\\ \\mathrm{Pa} \\\\\n\\rho = 998\\ \\mathrm{kg/m^3} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nh = 3.0\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\np = 101\\,300 + 998 \\cdot 9.82 \\cdot 3.0 \\approx 130\\,700\\ \\mathrm{Pa} \\approx 0.13\\ \\mathrm{MPa}\n$$\n\n**Answer:** About 0.13 MPa (or 130 kPa)."
   },
   {
    "level": 1,
    "question": "The total pressure at the bottom of a pool is 152 kPa. The air pressure at the surface is 101 kPa. What is the liquid pressure at the bottom of the pool?",
    "answer": {
     "value": 51000,
     "unit": "Pa",
     "tol": 0.02
    },
    "solution": "The liquid pressure is the difference between the total pressure and the air pressure:\n\n$$\np_\\mathrm{liquid} = p_\\mathrm{tot} - p_0 = 152 - 101 = 51\\ \\mathrm{kPa} = 51\\,000\\ \\mathrm{Pa}\n$$\n\n**Answer:** The liquid pressure is 51 kPa."
   },
   {
    "level": 2,
    "question": "A winter storm makes the air pressure outside your window drop to 92 kPa, while the pressure indoors is still 101 kPa (normal air pressure). How large is the net force pushing the window outwards? The window is 1.2 m wide and 1.5 m high.",
    "answer": {
     "value": 16200,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "The pressure difference across the window is:\n\n$$\n\\Delta p = p_\\mathrm{inside} - p_\\mathrm{outside} = 101 - 92 = 9\\ \\mathrm{kPa} = 9\\,000\\ \\mathrm{Pa}\n$$\n\nThe force is given by $F = \\Delta p \\cdot A$ where the area is $1.2 \\cdot 1.5 = 1.8\\ \\mathrm{m^2}$:\n\n$$\nF = 9\\,000 \\cdot 1.8 = 16\\,200\\ \\mathrm{N} \\approx 16\\ \\mathrm{kN}\n$$\n\n**Answer:** About 16 kN (corresponding to the weight of 1.6 tonnes!).\n\n**General conclusion:** This is why strong storm winds together with pressure differences (the hurricane sucks air past the outside of the house) can blow out whole windows, even if the wind itself does not have enough force."
   },
   {
    "level": 2,
    "question": "A cork in a PET bottle is stuck and can withstand a pressure difference of 20 bar before it shoots off. The opening of the bottle has a diameter of 21 mm. What force does the cork \"feel\" from the compressed gas inside just before it comes loose?",
    "answer": {
     "value": 693,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "We need to convert the pressure and calculate the area of the opening.\n\n$$\n\\left[ \\begin{array}{l}\n\\Delta p = 20\\ \\mathrm{bar} = 20 \\cdot 10^{5}\\ \\mathrm{Pa} = 2.0 \\cdot 10^{6}\\ \\mathrm{Pa} \\\\\nr = 10.5\\ \\mathrm{mm} = 10.5 \\cdot 10^{-3}\\ \\mathrm{m} \\\\\nA = \\pi r^{2} = \\pi \\cdot (10.5 \\cdot 10^{-3})^{2} \\approx 3.46 \\cdot 10^{-4}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$\nF = \\Delta p \\cdot A = 2.0 \\cdot 10^{6} \\cdot 3.46 \\cdot 10^{-4} \\approx 693\\ \\mathrm{N}\n$$\n\n**Answer:** About 690 N, corresponding to the weight of about 70 kg.\n\n**General conclusion:** This is why corks in carbonated bottles (champagne, beer bottles in high-altitude aircraft) can fly off at high speed if they are not opened in a controlled way. At a speed of about 12–15 m/s a loose cork is a real risk of injury to the eye."
   },
   {
    "level": 3,
    "question": "The Mariana Trench is the deepest place in the ocean, about 11 km deep. Calculate **the total pressure** at the bottom if the mean density of seawater is 1 030 kg/m³ and the air pressure at the surface is 101 kPa.\n\na) What total pressure acts?\n\nb) How many times greater is this than normal air pressure?\n\nc) What force would act on a circular observation window with radius 15 cm?\n\n*Use $g = 9.82\\ \\mathrm{N/kg}$ and give the total pressure in MPa as your numerical answer.*",
    "answer": {
     "value": 111,
     "unit": "MPa",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 111,
      "unit": "MPa",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 1100,
      "unit": "times",
      "tol": 0.03
     },
     {
      "del": "c",
      "value": 7.87,
      "unit": "MN",
      "tol": 0.03
     }
    ],
    "solution": "**a) Total pressure.**\n\n$$\np = p_0 + \\rho \\cdot g \\cdot h\n$$\n\n$$\n\\left[ \\begin{array}{l}\np_0 = 101\\,000\\ \\mathrm{Pa} \\\\\n\\rho = 1\\,030\\ \\mathrm{kg/m^3} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nh = 11\\,000\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\np = 101\\,000 + 1\\,030 \\cdot 9.82 \\cdot 11\\,000 \\approx 1.113 \\cdot 10^{8}\\ \\mathrm{Pa} \\approx 111\\ \\mathrm{MPa}\n$$\n\n**b) Comparison with air pressure:**\n\n$$\n\\frac{p}{p_0} = \\frac{1.113 \\cdot 10^{8}}{1.01 \\cdot 10^{5}} \\approx 1\\,100\n$$\n\nThe total pressure is therefore about **1 100 times normal air pressure**.\n\n**c) Force on the observation window:**\n\n$$\nA = \\pi r^{2} = \\pi \\cdot (0.15)^{2} \\approx 0.0707\\ \\mathrm{m^2}\n$$\n\n$$\nF = p \\cdot A = 1.113 \\cdot 10^{8} \\cdot 0.0707 \\approx 7.87 \\cdot 10^{6}\\ \\mathrm{N} \\approx 7.9\\ \\mathrm{MN}\n$$\n\n**Answer:** a) about 111 MPa. b) about 1 100 times the air pressure. c) about 7.9 MN (corresponding to the weight of about 800 tonnes).\n\n**General conclusion:** This is why crewed submersibles for such depths need titanium hulls with walls decimetres thick. Note that the air pressure at the surface (101 kPa) is negligible compared with the liquid pressure (111 MPa): at great depths you can ignore $p_0$ completely."
   }
  ]
 },
 "fy1-5.5": {
  "kalla": "2bf85290f9",
  "data": [
   {
    "level": 1,
    "question": "A stone with volume 5.0 litres is lowered completely into water. How large a buoyant force acts on the stone from the water? Use the density of water 998 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 49,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "Archimedes' principle gives the buoyant force directly:\n\n$$\nF_\\mathrm{L} = \\rho \\cdot g \\cdot V\n$$\n\n$$\n\\left[ \\begin{array}{l}\n\\rho = 998\\ \\mathrm{kg/m^3} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nV = 5.0\\ \\mathrm{litre} = 5.0 \\cdot 10^{-3}\\ \\mathrm{m^3}\n\\end{array} \\right]\n$$\n\n$$\nF_\\mathrm{L} = 998 \\cdot 9.82 \\cdot 5.0 \\cdot 10^{-3} \\approx 49\\ \\mathrm{N}\n$$\n\n**Answer:** About 49 N."
   },
   {
    "level": 1,
    "question": "A boat with mass 450 kg floats in water (density 998 kg/m³). What volume of water does the boat displace? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.451,
     "unit": "m³",
     "tol": 0.03
    },
    "solution": "For a floating body there is force equilibrium: $F_\\mathrm{L} = F_\\mathrm{G}$.\n\n$$\n\\rho \\cdot g \\cdot V = m \\cdot g \\quad\\Leftrightarrow\\quad V = \\frac{m}{\\rho}\n$$\n\nThe gravitational field strength *g* cancels: note that the answer does not depend on *g*!\n\n$$\n\\left[ \\begin{array}{l}\nm = 450\\ \\mathrm{kg} \\\\\n\\rho = 998\\ \\mathrm{kg/m^3}\n\\end{array} \\right]\n$$\n\n$$\nV = \\frac{450}{998} \\approx 0.451\\ \\mathrm{m^3}\n$$\n\n**Answer:** About 0.45 m³ (corresponding to 450 litres).\n\n**General conclusion:** The mass of the displaced liquid is always equal to the mass of the floating object. Since 1 litre of water has a mass of about 1 kg, a 450 kg boat displaces about 450 litres of water."
   },
   {
    "level": 1,
    "question": "A metal cube with volume 200 cm³ is lowered into fresh water (998 kg/m³). The buoyant force from the water turns out to be 1.96 N. What volume of the cube is under the water?",
    "choices": [
     "The whole volume, 200 cm³.",
     "Half the volume, 100 cm³.",
     "A quarter of the volume, 50 cm³.",
     "It cannot be determined without knowing the density of the cube."
    ],
    "correct": 0,
    "solution": "We calculate which volume corresponds to the buoyant force 1.96 N:\n\n$$\nV = \\frac{F_\\mathrm{L}}{\\rho \\cdot g} = \\frac{1.96}{998 \\cdot 9.82} \\approx 2.00 \\cdot 10^{-4}\\ \\mathrm{m^3} = 200\\ \\mathrm{cm^3}\n$$\n\nThis shows that the whole volume is under the water: the cube is completely submerged (and sinks).\n\n**Answer:** Option A: the whole volume is under the water."
   },
   {
    "level": 2,
    "question": "An aluminium cube with edge length 10 cm is lowered completely into water. What is the **resultant force** needed to hold the cube still (that is, not let it sink)? Aluminium has density 2 700 kg/m³ and water 998 kg/m³. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 16.7,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "The cube is acted on by the gravitational force $F_\\mathrm{G}$ downwards and the buoyant force $F_\\mathrm{L}$ upwards. The extra force $F$ needed to hold the cube still is the difference:\n\n$$\nF = F_\\mathrm{G} - F_\\mathrm{L}\n$$\n\nVolume and mass:\n\n$$\n\\left[ \\begin{array}{l}\nV = (0.10)^{3} = 1.0 \\cdot 10^{-3}\\ \\mathrm{m^3} \\\\\nm = \\rho_\\mathrm{Al} \\cdot V = 2\\,700 \\cdot 1.0 \\cdot 10^{-3} = 2.70\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\nGravitational force and buoyant force:\n\n$$\nF_\\mathrm{G} = m \\cdot g = 2.70 \\cdot 9.82 \\approx 26.5\\ \\mathrm{N}\n$$\n\n$$\nF_\\mathrm{L} = \\rho_\\mathrm{water} \\cdot g \\cdot V = 998 \\cdot 9.82 \\cdot 1.0 \\cdot 10^{-3} \\approx 9.80\\ \\mathrm{N}\n$$\n\n$$\nF = 26.5 - 9.80 \\approx 16.7\\ \\mathrm{N}\n$$\n\n**Answer:** About 17 N, which corresponds to the weight of about 1.7 kg. So the cube feels 1.7 kg \"heavy\" under water, even though its actual mass is 2.7 kg.\n\n**General conclusion:** In general, the **apparent weight** under water is given by $m_\\mathrm{apparent} = m \\cdot (1 - \\rho_\\mathrm{water}/\\rho_\\mathrm{body})$. The smaller the density difference between the body and the liquid, the \"lighter\" the object feels."
   },
   {
    "level": 2,
    "question": "Lotta is pulling an iron anchor up out of the water. While the anchor is still **completely under water** she pulls with a force of 470 N and the anchor then moves **upwards at constant velocity**. What is the weight of the anchor (in air)? Use the density of water 998 kg/m³, the density of iron 7 860 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 538,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "At constant velocity there is force equilibrium on the anchor. The three forces acting are the gravitational force $F_\\mathrm{G}$ downwards, the buoyant force $F_\\mathrm{L}$ upwards and Lotta's pull $F = 470$ N upwards:\n\n$$\nF + F_\\mathrm{L} = F_\\mathrm{G}\n$$\n\nWe use that $F_\\mathrm{G} = m \\cdot g$ (which is the weight in air) and $F_\\mathrm{L} = \\rho_\\mathrm{water} \\cdot g \\cdot V$, and that $m = \\rho_\\mathrm{iron} \\cdot V$. From the last expression we get $V = m / \\rho_\\mathrm{iron}$, which we substitute into the buoyancy formula:\n\n$$\nF_\\mathrm{L} = \\rho_\\mathrm{water} \\cdot g \\cdot \\frac{m}{\\rho_\\mathrm{iron}} = F_\\mathrm{G} \\cdot \\frac{\\rho_\\mathrm{water}}{\\rho_\\mathrm{iron}}\n$$\n\nSubstituting into the force equilibrium:\n\n$$\nF + F_\\mathrm{G} \\cdot \\frac{\\rho_\\mathrm{water}}{\\rho_\\mathrm{iron}} = F_\\mathrm{G}\n\\quad\\Leftrightarrow\\quad\nF_\\mathrm{G} = \\frac{F}{1 - \\rho_\\mathrm{water}/\\rho_\\mathrm{iron}}\n$$\n\n$$\nF_\\mathrm{G} = \\frac{470}{1 - 998/7\\,860} = \\frac{470}{1 - 0.127} \\approx \\frac{470}{0.873} \\approx 538\\ \\mathrm{N}\n$$\n\nThe mass is then:\n\n$$\nm = \\frac{F_\\mathrm{G}}{g} = \\frac{538}{9.82} \\approx 54.8\\ \\mathrm{kg}\n$$\n\n**Answer:** The anchor weighs about 540 N in air (corresponding to about 55 kg).\n\n**General conclusion:** The simple rule \"pulling force + buoyant force = gravitational force\" is useful in all *constant velocity* problems under water. Do not forget to use the density of the water in the buoyancy formula, not that of the object!"
   },
   {
    "level": 3,
    "question": "An iceberg floats in the sea. What proportion (in per cent) of the iceberg's volume lies **below** the water surface? Use the density of ice 920 kg/m³ and the density of seawater 1 028 kg/m³.",
    "answer": {
     "value": 89.5,
     "unit": "%",
     "tol": 0.03
    },
    "solution": "The iceberg floats, so the buoyant force balances the gravitational force. Let $V$ be the volume of the whole iceberg and $V_\\mathrm{u}$ the displaced volume (= below the surface).\n\n$$\nF_\\mathrm{L} = F_\\mathrm{G} \\quad\\Leftrightarrow\\quad \\rho_\\mathrm{water} \\cdot g \\cdot V_\\mathrm{u} = \\rho_\\mathrm{ice} \\cdot g \\cdot V\n$$\n\nThe gravitational field strength cancels, and we solve for the ratio:\n\n$$\n\\frac{V_\\mathrm{u}}{V} = \\frac{\\rho_\\mathrm{ice}}{\\rho_\\mathrm{water}} = \\frac{920}{1\\,028} \\approx 0.895 = 89.5\\ \\%\n$$\n\n**Answer:** About 89.5 % of the iceberg's volume lies below the surface.\n\n**General conclusion:** The classic \"tip of the iceberg\" rule: about 90 % of the iceberg is below the surface, and only 10 % can be seen. This is a general rule: when an object with density $\\rho_\\mathrm{body}$ floats in a liquid with density $\\rho_\\mathrm{liquid}$, the proportion below the surface is always $\\rho_\\mathrm{body}/\\rho_\\mathrm{liquid}$. This is also why the Titanic, and so many other ships, have collided with icebergs: you only see \"10 % of the problem\" from the surface."
   }
  ]
 },
 "fy1-5.6": {
  "kalla": "b44220d0a3",
  "data": [
   {
    "level": 1,
    "question": "A weather balloon displaces 2.0 m³ of air. How large a buoyant force from the air acts on the balloon? Use the density of air 1.293 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 25.4,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "Archimedes' principle also applies in gases:\n\n$$\nF_\\mathrm{L} = \\rho_\\mathrm{air} \\cdot g \\cdot V = 1.293 \\cdot 9.82 \\cdot 2.0 \\approx 25.4\\ \\mathrm{N}\n$$\n\n**Answer:** About 25 N."
   },
   {
    "level": 1,
    "question": "A helium balloon holds 15 litres of helium (density 0.178 kg/m³). What is the weight of the helium? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.0262,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "We first calculate the mass of the helium, then its weight.\n\n$$\n\\left[ \\begin{array}{l}\nV = 15\\ \\mathrm{litre} = 1.5 \\cdot 10^{-2}\\ \\mathrm{m^3} \\\\\n\\rho = 0.178\\ \\mathrm{kg/m^3}\n\\end{array} \\right]\n$$\n\n$$\nm = \\rho \\cdot V = 0.178 \\cdot 1.5 \\cdot 10^{-2} \\approx 2.67 \\cdot 10^{-3}\\ \\mathrm{kg}\n$$\n\n$$\nF_\\mathrm{G} = m \\cdot g = 2.67 \\cdot 10^{-3} \\cdot 9.82 \\approx 2.62 \\cdot 10^{-2}\\ \\mathrm{N} = 26\\ \\mathrm{mN}\n$$\n\n**Answer:** About 26 mN.\n\n**General conclusion:** The density of helium is about one seventh of that of air (0.178 vs 1.293 kg/m³), so the helium contributes almost nothing to the total weight of the balloon. That is why the balloon can fly."
   },
   {
    "level": 1,
    "question": "Which of the following **rises** in normal air (1.293 kg/m³)?",
    "choices": [
     "A metal balloon filled with air at a temperature of 15 °C.",
     "A balloon filled with carbon dioxide (density 1.98 kg/m³).",
     "A balloon filled with helium (density 0.178 kg/m³).",
     "A balloon filled with argon (density 1.78 kg/m³)."
    ],
    "correct": 2,
    "solution": "An object rises in air if its **total density** (gas + envelope) is lower than that of the surrounding air. Of the options:\n\n- Air in air: same density → no net buoyant force (the balloon sinks because of the weight of the envelope).\n- Carbon dioxide (1.98 kg/m³): heavier than air → sinks.\n- Helium (0.178 kg/m³): about 7 times lower density than air → rises.\n- Argon (1.78 kg/m³): heavier than air → sinks.\n\n**Answer:** Option C: the helium balloon rises."
   },
   {
    "level": 2,
    "question": "Algot is holding a helium balloon on a string. The balloon holds 11 litres of helium and the balloon envelope itself has a mass of 4.0 g. How large is the **tension** in the string? Use $\\rho_\\mathrm{air} = 1.293\\ \\mathrm{kg/m^3}$, $\\rho_\\mathrm{He} = 0.178\\ \\mathrm{kg/m^3}$ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.0811,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "The balloon is in equilibrium: the buoyant force upwards is balanced by the gravitational force downwards (envelope + helium) **plus** the tension in the string. For a balloon hanging still:\n\n$$\nF_\\mathrm{S} = F_\\mathrm{L} - F_\\mathrm{G}\n$$\n\nThe **buoyant force** from the air:\n\n$$\nF_\\mathrm{L} = \\rho_\\mathrm{air} \\cdot g \\cdot V = 1.293 \\cdot 9.82 \\cdot 0.011 \\approx 0.1397\\ \\mathrm{N}\n$$\n\nThe **gravitational force** (envelope + helium):\n\n$$\n\\left[ \\begin{array}{l}\nm_\\mathrm{envelope} = 4.0\\ \\mathrm{g} = 0.0040\\ \\mathrm{kg} \\\\\nm_\\mathrm{He} = \\rho_\\mathrm{He} \\cdot V = 0.178 \\cdot 0.011 \\approx 1.958 \\cdot 10^{-3}\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$\nF_\\mathrm{G} = (0.0040 + 1.958 \\cdot 10^{-3}) \\cdot 9.82 \\approx 0.0585\\ \\mathrm{N}\n$$\n\n**Tension:**\n\n$$\nF_\\mathrm{S} = 0.1397 - 0.0585 \\approx 0.0812\\ \\mathrm{N} = 81\\ \\mathrm{mN}\n$$\n\n**Answer:** About 81 mN.\n\n**General conclusion:** The gravitational force on the envelope (4 g) dominates compared with the weight of the helium (just under 2 g). If you removed the envelope the balloon would lift almost twice as much, but then of course you would have nothing to fill with helium!"
   },
   {
    "level": 2,
    "question": "You want to build an ultralight helium balloon that can lift a GoPro camera with mass 120 g (ignore the weight of the balloon envelope). What volume of helium is needed in the balloon? Use $\\rho_\\mathrm{air} = 1.293\\ \\mathrm{kg/m^3}$, $\\rho_\\mathrm{He} = 0.178\\ \\mathrm{kg/m^3}$ and $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.108,
     "unit": "m³",
     "tol": 0.03
    },
    "solution": "To just lift the GoPro we need $F_\\mathrm{L} = F_\\mathrm{G,total}$. The total weight is the weight of the camera plus the weight of the helium:\n\n$$\n\\rho_\\mathrm{air} \\cdot g \\cdot V = m_\\mathrm{camera} \\cdot g + \\rho_\\mathrm{He} \\cdot g \\cdot V\n$$\n\nThe gravitational field strength cancels, and we solve for the volume:\n\n$$\nV \\cdot (\\rho_\\mathrm{air} - \\rho_\\mathrm{He}) = m_\\mathrm{camera}\n\\quad\\Leftrightarrow\\quad\nV = \\frac{m_\\mathrm{camera}}{\\rho_\\mathrm{air} - \\rho_\\mathrm{He}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nm_\\mathrm{camera} = 0.120\\ \\mathrm{kg} \\\\\n\\rho_\\mathrm{air} - \\rho_\\mathrm{He} = 1.293 - 0.178 = 1.115\\ \\mathrm{kg/m^3}\n\\end{array} \\right]\n$$\n\n$$\nV = \\frac{0.120}{1.115} \\approx 0.108\\ \\mathrm{m^3} = 108\\ \\mathrm{litre}\n$$\n\n**Answer:** About 0.11 m³ = 108 litres of helium.\n\n**General conclusion:** The effective \"lifting density\" of a gas is the difference between the density of air and that of the gas, $\\rho_\\mathrm{air} - \\rho_\\mathrm{gas}$. For helium this is about 1.1 kg/m³, so 1 m³ of helium lifts about 1.1 kg. For hot air the difference is much smaller (about 0.3 kg/m³), which is why hot-air balloons have to be so enormous."
   },
   {
    "level": 3,
    "question": "A hot-air balloon has volume 2 500 m³. The balloon fabric, the basket and the burner together have a mass of 350 kg. The surrounding cold air has density 1.293 kg/m³.\n\na) What is the maximum density the hot air can have for the balloon + 3 people of 75 kg each to be able to lift off the ground?\n\nb) What temperature corresponds to the density you found in a)? Assume that at 0 °C (273 K) the density of air is 1.293 kg/m³ and that $\\rho \\propto 1/T$ at constant pressure.\n\n*Give the density of the hot air in kg/m³ as your numerical answer.*",
    "answer": {
     "value": 1.063,
     "unit": "kg/m³",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.063,
      "unit": "kg/m³"
     },
     {
      "del": "b",
      "value": 59,
      "unit": "°C",
      "tol": 0.05
     }
    ],
    "solution": "**a) Density of the hot air.** Total mass to lift:\n\n$$\nm_\\mathrm{tot} = m_\\mathrm{balloon} + 3 \\cdot m_\\mathrm{person} = 350 + 3 \\cdot 75 = 575\\ \\mathrm{kg}\n$$\n\nTo lift off, the buoyant force from the displaced cold air must be greater than or equal to the weight of (hot air + load):\n\n$$\n\\rho_\\mathrm{cold} \\cdot g \\cdot V = (\\rho_\\mathrm{hot} \\cdot V + m_\\mathrm{tot}) \\cdot g\n$$\n\n*g* cancels. Solving for $\\rho_\\mathrm{hot}$:\n\n$$\n\\rho_\\mathrm{hot} = \\rho_\\mathrm{cold} - \\frac{m_\\mathrm{tot}}{V} = 1.293 - \\frac{575}{2\\,500} = 1.293 - 0.230 = 1.063\\ \\mathrm{kg/m^3}\n$$\n\n**b) Temperature.** We use $\\rho_1 \\cdot T_1 = \\rho_2 \\cdot T_2$ with $\\rho_1 = 1.293$ at $T_1 = 273$ K:\n\n$$\nT_2 = T_1 \\cdot \\frac{\\rho_1}{\\rho_2} = 273 \\cdot \\frac{1.293}{1.063} \\approx 332\\ \\mathrm{K} = 59\\ ^{\\circ}\\mathrm{C}\n$$\n\n**Answer:** a) The hot air needs to have a density of 1.063 kg/m³. b) This corresponds to a temperature of about 332 K = 59 °C, only 60 °C warmer than the surroundings.\n\n**General conclusion:** This shows why hot-air balloons do not need to be unreasonably hot: just a few tens of degrees warmer than the surroundings is enough. The fuel in the burner is mostly used to make up for heat losses through the balloon fabric, not to create large temperature differences."
   }
  ]
 },
 "fy1-5.7": {
  "kalla": "cad231f78d",
  "data": [
   {
    "level": 1,
    "question": "Convert the temperature 25 °C to kelvin.",
    "answer": {
     "value": 298,
     "unit": "K",
     "tol": 0.01
    },
    "solution": "We use the relationship $T_K = T_C + 273$.\n\n$$\nT_K = 25 + 273 = 298\\ \\mathrm{K}\n$$\n\n**Answer:** 298 K."
   },
   {
    "level": 1,
    "question": "A pressure pump compresses 8.0 litres of air at a pressure of 100 kPa to a volume of 2.0 litres. The temperature is kept constant. What is the new pressure?",
    "answer": {
     "value": 400,
     "unit": "kPa",
     "tol": 0.02
    },
    "solution": "Since the temperature is constant ($T_1 = T_2$), $T$ cancels in the ideal gas law:\n\n$$\n\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2}\n\\quad\\Rightarrow\\quad\np_1 \\cdot V_1 = p_2 \\cdot V_2\n$$\n\nWe solve for $p_2$:\n\n$$\np_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{100 \\cdot 8.0}{2.0} = 400\\ \\mathrm{kPa}\n$$\n\n**Answer:** 400 kPa.\n\n**General conclusion:** When you halve the volume at constant temperature the pressure doubles: this is **Boyle's law**. It is the principle that bicycle pumps and compressors are based on."
   },
   {
    "level": 1,
    "question": "A sealed gas container has a pressure of 200 kPa at a temperature of 20 °C. What will the pressure be if the temperature is raised to 80 °C? (The container is rigid, so the volume is constant.)",
    "answer": {
     "value": 241,
     "unit": "kPa",
     "tol": 0.02
    },
    "solution": "At constant volume ($V_1 = V_2$), $V$ cancels:\n\n$$\n\\frac{p_1}{T_1} = \\frac{p_2}{T_2}\n\\quad\\Leftrightarrow\\quad\np_2 = p_1 \\cdot \\frac{T_2}{T_1}\n$$\n\n**Do not forget to convert to kelvin!**\n\n$$\n\\left[ \\begin{array}{l}\np_1 = 200\\ \\mathrm{kPa} \\\\\nT_1 = 20 + 273 = 293\\ \\mathrm{K} \\\\\nT_2 = 80 + 273 = 353\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\n$$\np_2 = 200 \\cdot \\frac{353}{293} \\approx 241\\ \\mathrm{kPa}\n$$\n\n**Answer:** About 241 kPa.\n\n**General conclusion:** A common trap is to calculate $p_2 = 200 \\cdot 80/20 = 800$ kPa (in degrees Celsius), which gives the wrong answer. **Always** use kelvin in the ideal gas law!"
   },
   {
    "level": 2,
    "question": "A bicycle pump has an internal volume of 0.40 litres with the handle up. When you push the handle down the air is compressed to 0.10 litres. In the starting position the pressure is 1.0 atm and the temperature 20 °C. The pumping happens so quickly that the air temperature rises to 60 °C. What is the pressure in the compressed position?",
    "answer": {
     "value": 4.55,
     "unit": "atm",
     "tol": 0.03
    },
    "solution": "We use the ideal gas law in its full form (since both *V* and *T* change):\n\n$$\n\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2}\n\\quad\\Leftrightarrow\\quad\np_2 = p_1 \\cdot \\frac{V_1 \\cdot T_2}{V_2 \\cdot T_1}\n$$\n\n$$\n\\left[ \\begin{array}{l}\np_1 = 1.0\\ \\mathrm{atm} \\\\\nV_1 = 0.40\\ \\mathrm{litre} \\\\\nT_1 = 20 + 273 = 293\\ \\mathrm{K} \\\\\nV_2 = 0.10\\ \\mathrm{litre} \\\\\nT_2 = 60 + 273 = 333\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\n$$\np_2 = 1.0 \\cdot \\frac{0.40 \\cdot 333}{0.10 \\cdot 293} \\approx 4.55\\ \\mathrm{atm}\n$$\n\n**Answer:** About 4.5 atm.\n\n**General conclusion:** This is why a bicycle pump gets warm when you pump hard: the gas is compressed quickly and the temperature rises. If the compression were *isothermal* (very slow) we would get $p_2 = 4.0$ atm; the extra 14 % increase in pressure comes from the rise in temperature."
   },
   {
    "level": 2,
    "question": "A helium balloon is released at ground level where the pressure is 101 kPa and the temperature 20 °C. The balloon then holds 3.0 litres of helium. It rises to an altitude where the pressure is 30 kPa and the temperature −40 °C. What volume does the balloon have then?",
    "answer": {
     "value": 8.1,
     "unit": "litres",
     "tol": 0.03
    },
    "solution": "We use the ideal gas law to find the new volume:\n\n$$\nV_2 = V_1 \\cdot \\frac{p_1 \\cdot T_2}{p_2 \\cdot T_1}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nV_1 = 3.0\\ \\mathrm{litre} \\\\\np_1 = 101\\ \\mathrm{kPa} \\\\\nT_1 = 20 + 273 = 293\\ \\mathrm{K} \\\\\np_2 = 30\\ \\mathrm{kPa} \\\\\nT_2 = -40 + 273 = 233\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\n$$\nV_2 = 3.0 \\cdot \\frac{101 \\cdot 233}{30 \\cdot 293} \\approx 8.03\\ \\mathrm{litre}\n$$\n\n**Answer:** About 8.0 litres: the balloon has expanded to about 2.7 times its original volume.\n\n**General conclusion:** This is why helium balloons that are released often **burst** at high altitude: the external pressure falls faster than the temperature, and the balloon envelope cannot cope with the expansion. Weather balloons are specially designed to be able to expand several times over before they burst."
   },
   {
    "level": 3,
    "question": "A cylindrical diving bell (open at the bottom, closed at the top) has an internal height of 2.0 m and is completely filled with air at normal air pressure 101 kPa and temperature 20 °C. The bell is lowered vertically into a lake so that the **top** of the bell is at a depth of 8.0 m. The water is at 20 °C throughout the lake.\n\na) Show that the water rises some way up into the bell, and calculate how high.\n\nb) What is the pressure inside the bell when it has reached that depth?\n\n*Use the density of water 998 kg/m³ and $g = 9.82\\ \\mathrm{N/kg}$. Give the height the water has risen inside the bell (in metres).*",
    "answer": {
     "value": 0.93,
     "unit": "m",
     "tol": 0.05
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.93,
      "unit": "m",
      "tol": 0.05
     },
     {
      "del": "b",
      "value": 189,
      "unit": "kPa",
      "tol": 0.03
     }
    ],
    "solution": "**Idea.** The air in the bell is trapped and its volume is reduced when the water is pushed in from the bottom. Since the temperature is constant (20 °C), Boyle's law applies: $p_1 V_1 = p_2 V_2$.\n\nLet $h$ be the height the water has risen inside the bell. The air then has:\n- Original volume (at the surface): $V_1 = A \\cdot 2.0$ (where $A$ is the cross-sectional area of the bell)\n- New volume (under water): $V_2 = A \\cdot (2.0 - h)$\n\nThe water level inside the bell (= the air–liquid boundary) is at a depth of $8.0 + h$ below the surface of the lake (the top of the bell is 8.0 m down, and the water surface inside is $h$ metres below the top of the bell). The pressure on the air cushion must equal the total pressure of the water there:\n\n$$\np_2 = p_0 + \\rho \\cdot g \\cdot (8.0 + h)\n$$\n\nwith $p_0 = 101\\,000$ Pa and $\\rho g = 998 \\cdot 9.82 \\approx 9\\,802$ Pa/m.\n\nBoyle's law ($p_1 V_1 = p_2 V_2$, the areas cancel):\n\n$$\np_1 \\cdot 2.0 = p_2 \\cdot (2.0 - h)\n$$\n\nwith $p_1 = 101\\,000$ Pa. Substituting:\n\n$$\n101\\,000 \\cdot 2.0 = \\bigl(101\\,000 + 9\\,802 \\cdot (8.0 + h)\\bigr) \\cdot (2.0 - h)\n$$\n\nSimplify:\n\n$$\n202\\,000 = \\bigl(101\\,000 + 78\\,416 + 9\\,802\\,h\\bigr) \\cdot (2.0 - h)\n$$\n\n$$\n202\\,000 = (179\\,416 + 9\\,802\\,h) \\cdot (2.0 - h)\n$$\n\nMultiply out:\n\n$$\n202\\,000 = 358\\,832 + 19\\,604\\,h - 179\\,416\\,h - 9\\,802\\,h^{2}\n$$\n\n$$\n9\\,802\\,h^{2} + 159\\,812\\,h - 156\\,832 = 0\n$$\n\nA quadratic equation. Solve:\n\n$$\nh = \\frac{-159\\,812 + \\sqrt{159\\,812^{2} + 4 \\cdot 9\\,802 \\cdot 156\\,832}}{2 \\cdot 9\\,802}\n$$\n\nThe discriminant: $159\\,812^{2} + 4 \\cdot 9\\,802 \\cdot 156\\,832 = 2.554 \\cdot 10^{10} + 6.151 \\cdot 10^{9} \\approx 3.169 \\cdot 10^{10}$, the square root $\\approx 1.780 \\cdot 10^{5}$.\n\n$$\nh \\approx \\frac{-159\\,812 + 178\\,000}{19\\,604} \\approx \\frac{18\\,188}{19\\,604} \\approx 0.93\\ \\mathrm{m}\n$$\n\n**b) The pressure inside the bell:**\n\n$$\np_2 = 101\\,000 + 9\\,802 \\cdot (8.0 + 0.93) \\approx 188\\,500\\ \\mathrm{Pa} \\approx 189\\ \\mathrm{kPa}\n$$\n\nCheck: $p_2 V_2 = 188\\,500 \\cdot (2.0 - 0.93) \\approx 188\\,500 \\cdot 1.07 \\approx 201\\,700$, which is very close to $p_1 V_1 = 101\\,000 \\cdot 2.0 = 202\\,000$. ✓\n\n**Answer:** a) The water rises about 0.93 m inside the bell. b) The pressure is about 189 kPa.\n\n**General conclusion:** A diving bell protects the diver because the air in the bell is pressurised to the same pressure as the water outside; otherwise the water would simply flow in. Note that the volume of the air is halved when the pressure doubles (Boyle's law): at a depth of 100 m, where the total pressure is about 11 atm, 2 m of air would be compressed to only about 18 cm."
   }
  ]
 },
 "fy1-5.8": {
  "kalla": "94e79e8a57",
  "data": [
   {
    "level": 1,
    "question": "In a hydraulic press the small piston is pushed down with a force of 80 N. The small piston has area 5.0 cm² and the large piston 50 cm². What force does the large piston lift with?",
    "answer": {
     "value": 800,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Pascal's principle:\n\n$$\n\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\quad\\Leftrightarrow\\quad F_2 = F_1 \\cdot \\frac{A_2}{A_1}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_1 = 80\\ \\mathrm{N} \\\\\nA_1 = 5.0\\ \\mathrm{cm^2} \\\\\nA_2 = 50\\ \\mathrm{cm^2}\n\\end{array} \\right]\n$$\n\nNote that the areas do not have to be in SI units, as long as both sides use the same unit.\n\n$$\nF_2 = 80 \\cdot \\frac{50}{5.0} = 800\\ \\mathrm{N}\n$$\n\n**Answer:** 800 N.\n\n**General conclusion:** The ratio between the output force and the input force is the **ratio of the areas**. A press with an area ratio of 10:1 gives a force 10 times greater."
   },
   {
    "level": 1,
    "question": "A hydraulic press has a small piston with area 2.0 cm² and a large piston with area 80 cm². How many times greater than the input force is the force you get out?",
    "answer": {
     "value": 40,
     "unit": "",
     "tol": 0.02
    },
    "solution": "Pascal's principle gives that the force amplification equals the ratio of the areas:\n\n$$\n\\frac{F_2}{F_1} = \\frac{A_2}{A_1} = \\frac{80}{2.0} = 40\n$$\n\n**Answer:** 40 times."
   },
   {
    "level": 1,
    "question": "A hydraulic jack has a small piston with diameter 1.0 cm and a large piston with diameter 8.0 cm. What is the ratio of the output force to the input force?",
    "answer": {
     "value": 64,
     "unit": "",
     "tol": 0.02
    },
    "solution": "Areas of circles are in the same ratio as the squares of the diameters (since $A = \\pi d^{2}/4$):\n\n$$\n\\frac{F_2}{F_1} = \\frac{A_2}{A_1} = \\frac{d_2^{2}}{d_1^{2}} = \\frac{8.0^{2}}{1.0^{2}} = 64\n$$\n\n**Answer:** 64 times.\n\n**General conclusion:** A classic trap is to answer 8 (= the ratio of the diameters). But it is the **areas** that matter, and the area of a circle grows with the square of the diameter, so the force amplification is $(d_2/d_1)^{2}$."
   },
   {
    "level": 2,
    "question": "The picture shows a schematic sketch of a hydraulic jack. The small piston has area 3.5 cm² and the large one 52 cm². How large a force must be pushed on the small piston to be able to lift a car with mass 1 200 kg? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 220\" style=\"max-width:420px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><path d=\"M 60 60 L 60 160 Q 60 180 80 180 L 320 180 Q 360 180 360 160 L 360 60 L 320 60 L 320 140 Q 320 150 310 150 L 100 150 Q 90 150 90 140 L 90 60 Z\" fill=\"rgba(56,189,248,0.18)\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><rect x=\"60\" y=\"40\" width=\"30\" height=\"22\" fill=\"#0f1620\" stroke=\"#0f1620\" stroke-width=\"1.5\"/><rect x=\"320\" y=\"40\" width=\"40\" height=\"22\" fill=\"#0f1620\" stroke=\"#0f1620\" stroke-width=\"1.5\"/><line x1=\"75\" y1=\"10\" x2=\"75\" y2=\"36\" stroke=\"#c8324a\" stroke-width=\"2.4\"/><polygon points=\"71,30 75,40 79,30\" fill=\"#c8324a\"/><line x1=\"340\" y1=\"36\" x2=\"340\" y2=\"10\" stroke=\"#c8324a\" stroke-width=\"2.4\"/><polygon points=\"336,16 340,6 344,16\" fill=\"#c8324a\"/><text x=\"75\" y=\"6\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#c8324a\" text-anchor=\"middle\">F₁</text><text x=\"340\" y=\"6\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#c8324a\" text-anchor=\"middle\">F₂</text><text x=\"75\" y=\"84\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">A₁ = 3.5 cm²</text><text x=\"340\" y=\"84\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">A₂ = 52 cm²</text></svg>",
    "answer": {
     "value": 793,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "The car exerts a gravitational force on the large piston:\n\n$$\nF_2 = m \\cdot g = 1\\,200 \\cdot 9.82 = 11\\,784\\ \\mathrm{N}\n$$\n\nPascal's principle then gives:\n\n$$\nF_1 = F_2 \\cdot \\frac{A_1}{A_2} = 11\\,784 \\cdot \\frac{3.5}{52} \\approx 793\\ \\mathrm{N}\n$$\n\n**Answer:** About 793 N (corresponding to the weight of about 81 kg).\n\n**General conclusion:** With a hydraulic jack an ordinary person can lift a car using their body weight as the input force. The area ratio 52/3.5 ≈ 15 means that you get a lifting force 15 times greater."
   },
   {
    "level": 2,
    "question": "A hydraulic press is used to cut sheet metal. The small piston has area 4.0 cm² and is pushed down with a force of 120 N through a distance of 20 cm. The large piston has area 100 cm².\n\na) What force does the large piston deliver?\n\nb) How far does the large piston move?\n\n*Give the answer to (b) in centimetres.*",
    "answer": {
     "value": 0.8,
     "unit": "cm",
     "tol": 0.05
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3000,
      "unit": "N"
     },
     {
      "del": "b",
      "value": 0.8,
      "unit": "cm",
      "tol": 0.05
     }
    ],
    "solution": "**a) The force on the large piston:**\n\n$$\nF_2 = F_1 \\cdot \\frac{A_2}{A_1} = 120 \\cdot \\frac{100}{4.0} = 3\\,000\\ \\mathrm{N}\n$$\n\n**b) How far does the large piston move?** Since the liquid is incompressible, the same volume of liquid that is pushed down by the small piston must be moved to the large one:\n\n$$\nA_1 \\cdot s_1 = A_2 \\cdot s_2\n\\quad\\Leftrightarrow\\quad\ns_2 = s_1 \\cdot \\frac{A_1}{A_2}\n$$\n\n$$\ns_2 = 20 \\cdot \\frac{4.0}{100} = 0.80\\ \\mathrm{cm} = 8.0\\ \\mathrm{mm}\n$$\n\n**Answer:** a) 3 000 N (= 3.0 kN). b) 0.80 cm.\n\n**General conclusion:** There is no \"free\" force amplification. What you gain in force you lose in distance: the product $F \\cdot s$ (= the work) is the same on both sides. Check: $F_1 s_1 = 120 \\cdot 0.20 = 24$ J and $F_2 s_2 = 3\\,000 \\cdot 0.0080 = 24$ J. ✓ This is the **golden rule of mechanics**."
   },
   {
    "level": 3,
    "question": "A hydraulic pump is connected to a lifting piston through a hose filled with oil (density 870 kg/m³). The small piston (at the pump) has area 5.0 cm². The large lifting piston has area 200 cm² and is **3.0 m higher up** than the small one. How large a force must be pushed on the small piston to be able to lift a load of 1 500 kg? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n*Hint: compare the pressures at the two pistons and remember that the liquid column in the hose contributes a liquid pressure.*",
    "answer": {
     "value": 381,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "**Idea.** In a hydraulic press without a height difference the two pistons have **the same pressure**. Here, however, the pistons are at different heights, so the pressure at the upper piston is *lower* by $\\rho g h$ than at the lower one. We must take this into account.\n\nThe pressure at the small piston (lower):\n\n$$\np_1 = \\frac{F_1}{A_1}\n$$\n\nThe pressure at the large piston (upper): it must lift the load, so $p_2 = F_\\mathrm{load}/A_2$.\n\nThe relationship between the pressures (Pascal's principle + liquid column):\n\n$$\np_1 = p_2 + \\rho \\cdot g \\cdot h\n$$\n\nThe pressure at the upper piston is lower because we have gone 3 m upwards in the liquid. We put it together:\n\n$$\n\\frac{F_1}{A_1} = \\frac{F_\\mathrm{load}}{A_2} + \\rho \\cdot g \\cdot h\n$$\n\nThe load gives the gravitational force $F_\\mathrm{load} = m g = 1\\,500 \\cdot 9.82 = 14\\,730$ N.\n\n$$\n\\left[ \\begin{array}{l}\nF_\\mathrm{load} = 14\\,730\\ \\mathrm{N} \\\\\nA_1 = 5.0\\ \\mathrm{cm^2} = 5.0 \\cdot 10^{-4}\\ \\mathrm{m^2} \\\\\nA_2 = 200\\ \\mathrm{cm^2} = 2.0 \\cdot 10^{-2}\\ \\mathrm{m^2} \\\\\n\\rho = 870\\ \\mathrm{kg/m^3} \\\\\nh = 3.0\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\nCalculate the right-hand side of the pressure equation:\n\n$$\np_2 + \\rho g h = \\frac{14\\,730}{2.0 \\cdot 10^{-2}} + 870 \\cdot 9.82 \\cdot 3.0\n= 736\\,500 + 25\\,631 \\approx 762\\,000\\ \\mathrm{Pa}\n$$\n\nMultiply by $A_1$ to get the input force:\n\n$$\nF_1 = A_1 \\cdot \\bigl(p_2 + \\rho g h\\bigr) = 5.0 \\cdot 10^{-4} \\cdot 762\\,000 \\approx 381\\ \\mathrm{N}\n$$\n\n**Answer:** About 380 N (the force must be large enough to balance both the weight of the load and the liquid column in the hose).\n\n**General conclusion:** In the ideal case (if the pistons had been at the same height) the input force would have been only $F_1 = F_\\mathrm{load} \\cdot A_1/A_2 = 14\\,730 \\cdot 5.0/200 \\approx 368$ N. The extra ~13 N comes from having to \"push up\" the liquid 3 m in the hose, which gives an extra liquid pressure $\\rho g h \\approx 26$ kPa that, multiplied by the small area of 5.0 · 10⁻⁴ m², gives exactly 13 N."
   }
  ]
 },
 "fy1-6.1": {
  "kalla": "5fa70bd6bf",
  "data": [
   {
    "level": 1,
    "question": "Convert the temperature 25 °C to kelvin.",
    "answer": {
     "value": 298,
     "unit": "K",
     "tol": 0.01
    },
    "solution": "We use the relationship between degrees Celsius and kelvin:\n\n$$ T_K = T_C + 273 $$\n\n$$ T_K = 25 + 273 = 298\\ \\mathrm{K} $$\n\n**Answer:** 298 K."
   },
   {
    "level": 1,
    "question": "On a frosty winter morning it is −18 °C outside. What is that in kelvin?",
    "answer": {
     "value": 255,
     "unit": "K",
     "tol": 0.01
    },
    "solution": "We use the relationship between degrees Celsius and kelvin:\n\n$$ T_K = T_C + 273 = -18 + 273 = 255\\ \\mathrm{K} $$\n\n**Answer:** 255 K.\n\n**General conclusion:** Kelvin values are always positive, since 0 K corresponds to absolute zero (−273 °C). So it is not possible to have negative kelvin values."
   },
   {
    "level": 1,
    "question": "An ice cube and an aluminium plate lie side by side on the kitchen worktop and both have the same temperature as the room (about 20 °C). When you put your hand on each object, the aluminium plate feels **colder**. What is the reason?",
    "choices": [
     "The aluminium plate actually has a lower temperature than the room: thermometers usually show the wrong value on metal.",
     "Aluminium conducts heat better than ice, so heat flows faster from the hand to the aluminium.",
     "The atoms of aluminium move more slowly than the atoms of ice despite the same temperature.",
     "Aluminium \"attracts cold\" from the room and therefore becomes cold."
    ],
    "correct": 1,
    "solution": "Both objects have the same temperature. What we experience as *cold* is heat **flowing away from the hand**. Since aluminium conducts heat much better than ice (and considerably better than plastic or wood), the heat flows faster from the hand to the aluminium, and we perceive it as colder.\n\n**Answer:** Option B.\n\n**General conclusion:** \"Cold\" does not exist as a physical phenomenon, only heat transfer in different directions. How cold something feels depends just as much on the thermal conductivity of the material as on its actual temperature."
   },
   {
    "level": 2,
    "question": "Three containers A, B and C hold different gases at the temperatures 27 °C, 127 °C and 327 °C. In which container is the mean kinetic energy of the atoms exactly **twice** as large as in container A?",
    "choices": [
     "Container B: because 127 is twice as much as a little more than half of 327.",
     "Container B: because 127 °C ÷ 27 °C ≈ 5.",
     "Container C: because its temperature is twice as high as that of A on the kelvin scale.",
     "None of the containers: none of the temperatures is exactly twice as high as 27."
    ],
    "correct": 2,
    "solution": "The mean kinetic energy of the atoms is proportional to the temperature in **kelvin**, not in degrees Celsius. We convert all three temperatures:\n\n$$\n\\left[ \\begin{array}{l}\nT_A = 27 + 273 = 300\\ \\mathrm{K} \\\\\nT_B = 127 + 273 = 400\\ \\mathrm{K} \\\\\nT_C = 327 + 273 = 600\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\nWe are looking for the container where $T = 2 \\cdot T_A = 2 \\cdot 300 = 600\\ \\mathrm{K}$. That is container C.\n\n**Answer:** Option C.\n\n**General conclusion:** A classic trap is to think that \"doubling the Celsius temperature\" doubles the kinetic energy. Proportionality only holds on the kelvin scale. This is why kelvin is used in all physical relationships involving temperature (for example the ideal gas law)."
   },
   {
    "level": 2,
    "question": "You have an aluminium plate and a plastic plate, both at room temperature 20 °C. You put an ice cube on each plate. On which plate does the ice melt fastest, and why?",
    "choices": [
     "The aluminium plate: since aluminium conducts heat better, the plate transports energy from the room to the ice faster.",
     "The plastic plate: since plastic feels warmer, it actually is warmer and melts the ice faster.",
     "Both equally fast: they have the same temperature, so the same heat flows to the ice.",
     "The plastic plate: since plastic insulates better, it keeps the heat against the ice instead of losing it to the room."
    ],
    "correct": 0,
    "solution": "Both plates have the same temperature, but it is the **thermal conduction** that decides how fast energy reaches the ice. Aluminium conducts heat much better than plastic, so the aluminium plate can quickly \"fetch\" energy from itself and the room and transfer it to the ice. The plastic insulates and supplies the ice with energy much more slowly.\n\n**Answer:** Option A: on the aluminium plate.\n\n**General conclusion:** That a material *feels* cold means that it conducts heat effectively. The same property that makes aluminium \"cold to the hand\" also makes it melt ice faster. Plastic feels \"warm\" but is a poorer heat transferrer."
   },
   {
    "level": 3,
    "question": "A patient has a fever with a body temperature of 42.2 °C. A healthy person has 37.0 °C. By what percentage is the mean kinetic energy of the molecules in the patient's body higher than that of the molecules in a healthy person's body?",
    "answer": {
     "value": 1.68,
     "unit": "%",
     "tol": 0.05
    },
    "solution": "The mean kinetic energy is proportional to the temperature in **kelvin**, so we must first convert:\n\n$$\n\\left[ \\begin{array}{l}\nT_\\mathrm{healthy} = 37.0 + 273 = 310.0\\ \\mathrm{K} \\\\\nT_\\mathrm{ill} = 42.2 + 273 = 315.2\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\nThe percentage increase in the mean kinetic energy is the same as the percentage increase in the kelvin temperature:\n\n$$\n\\frac{T_\\mathrm{ill} - T_\\mathrm{healthy}}{T_\\mathrm{healthy}}\n= \\frac{315.2 - 310.0}{310.0} \\approx 0.0168 = 1.68\\ \\%\n$$\n\n**Answer:** About 1.7 % higher.\n\n**General conclusion:** Although the fever feels dramatic, the increase in the kinetic energy of the molecules is very small in physical terms, under 2 %. But the body's biochemical processes are so finely tuned that even this small change is large enough for proteins to start malfunctioning. If you mix up degrees Celsius and kelvin here ((42.2 − 37.0) / 37.0 ≈ 14 %), you are wrong by almost a factor of 10."
   }
  ]
 },
 "fy1-6.2": {
  "kalla": "3216835f0d",
  "data": [
   {
    "level": 1,
    "question": "How much energy is needed to heat 0.50 kg of water from 20 °C to 90 °C? Use $c_\\mathrm{water} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}$. Give the answer in kJ.",
    "answer": {
     "value": 146,
     "unit": "kJ",
     "tol": 0.02
    },
    "solution": "We use the formula for heating:\n\n$$ E = c \\cdot m \\cdot \\Delta T $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nc = 4.18\\ \\mathrm{kJ/(kg \\cdot K)} \\\\\nm = 0.50\\ \\mathrm{kg} \\\\\n\\Delta T = 90 - 20 = 70\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\n$$ E = 4.18 \\cdot 0.50 \\cdot 70 = 146.3\\ \\mathrm{kJ} \\approx 146\\ \\mathrm{kJ} $$\n\n**Answer:** About 146 kJ (or about 1.5 · 10⁵ J)."
   },
   {
    "level": 1,
    "question": "You supply 18 kJ of energy to 2.0 kg of aluminium with a starting temperature of 25 °C. How warm does the aluminium get? Use $c_\\mathrm{Al} = 0.90\\ \\mathrm{kJ/(kg \\cdot K)}$. Give the answer in °C.",
    "answer": {
     "value": 35,
     "unit": "°C",
     "tol": 0.03
    },
    "solution": "We solve for the change in temperature from the heating formula:\n\n$$ E = c \\cdot m \\cdot \\Delta T \\quad\\Leftrightarrow\\quad \\Delta T = \\frac{E}{c \\cdot m} $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nE = 18\\ \\mathrm{kJ} \\\\\nc = 0.90\\ \\mathrm{kJ/(kg \\cdot K)} \\\\\nm = 2.0\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$ \\Delta T = \\frac{18}{0.90 \\cdot 2.0} = 10\\ \\mathrm{K} $$\n\nThe final temperature is $T_2 = T_1 + \\Delta T = 25 + 10 = 35\\ ^{\\circ}\\mathrm{C}$.\n\n**Answer:** 35 °C."
   },
   {
    "level": 1,
    "question": "A kettle with power 2.2 kW heats 0.40 kg of water from 20 °C to 100 °C. How long does the heating take? Use $c_\\mathrm{water} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}$ and assume that all the energy from the kettle goes to the water. Give the answer in seconds.",
    "answer": {
     "value": 60.8,
     "unit": "s",
     "tol": 0.03
    },
    "solution": "The energy the water needs to absorb is equal to the energy the kettle gives off during the time *t*. Since $P = E/t$ we get $E_\\mathrm{avg} = P \\cdot t$.\n\n$$ E_\\mathrm{avg} = E_\\mathrm{upp} \\quad\\Leftrightarrow\\quad P \\cdot t = c \\cdot m \\cdot \\Delta T $$\n\nSolving for the time:\n\n$$ t = \\frac{c \\cdot m \\cdot \\Delta T}{P} $$\n\nMeasured values (converted to SI units):\n\n$$\n\\left[ \\begin{array}{l}\nc = 4\\,180\\ \\mathrm{J/(kg \\cdot K)} \\\\\nm = 0.40\\ \\mathrm{kg} \\\\\n\\Delta T = 100 - 20 = 80\\ \\mathrm{K} \\\\\nP = 2.2\\ \\mathrm{kW} = 2\\,200\\ \\mathrm{W}\n\\end{array} \\right]\n$$\n\n$$ t = \\frac{4\\,180 \\cdot 0.40 \\cdot 80}{2\\,200} = \\frac{133\\,760}{2\\,200} \\approx 60.8\\ \\mathrm{s} $$\n\n**Answer:** About 61 s (just over a minute)."
   },
   {
    "level": 2,
    "question": "You mix 0.30 kg of water at a temperature of 80 °C with 0.50 kg of water at a temperature of 20 °C in an insulated container. What final temperature does the mixture reach? Ignore energy losses to the surroundings. Give the answer in °C.",
    "answer": {
     "value": 42.5,
     "unit": "°C",
     "tol": 0.02
    },
    "solution": "Heat flows from warm to cold: the hot water gives off energy that is absorbed by the cold water. Since it is the same liquid (the same *c*), the heat capacity cancels.\n\n$$ E_\\mathrm{avg} = E_\\mathrm{upp} \\quad\\Rightarrow\\quad c \\cdot m_v \\cdot \\Delta T_v = c \\cdot m_k \\cdot \\Delta T_k $$\n\n$$ m_v \\cdot (T_v - T) = m_k \\cdot (T - T_k) $$\n\nMeasured values (if we call the final temperature *T*):\n\n$$\n\\left[ \\begin{array}{l}\nm_v = 0.30\\ \\mathrm{kg},\\quad T_v = 80\\ ^{\\circ}\\mathrm{C} \\\\\nm_k = 0.50\\ \\mathrm{kg},\\quad T_k = 20\\ ^{\\circ}\\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ 0.30 \\cdot (80 - T) = 0.50 \\cdot (T - 20) $$\n\n$$ 24 - 0.30\\,T = 0.50\\,T - 10 $$\n\n$$ 34 = 0.80\\,T \\quad\\Leftrightarrow\\quad T = \\frac{34}{0.80} = 42.5\\ ^{\\circ}\\mathrm{C} $$\n\n**Answer:** 42.5 °C ≈ 43 °C.\n\n**General conclusion:** Since the amount of cold water is larger, it \"pulls\" the final temperature towards itself. The final temperature is not the midpoint between 20 °C and 80 °C (50 °C), but lies closer to the cold side because there is more cold water."
   },
   {
    "level": 2,
    "question": "You put a piece of copper with mass 100 g and temperature 200 °C into 200 g of water at 25 °C. What is the final temperature of the mixture? Use $c_\\mathrm{Cu} = 0.39\\ \\mathrm{kJ/(kg \\cdot K)}$ and $c_\\mathrm{water} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}$. Ignore energy losses. Give the answer in °C.",
    "answer": {
     "value": 32.8,
     "unit": "°C",
     "tol": 0.03
    },
    "solution": "The piece of copper gives off energy and cools down; the water absorbs the energy and warms up.\n\n$$ E_\\mathrm{avg} = E_\\mathrm{upp} $$\n\n$$ c_\\mathrm{Cu} \\cdot m_\\mathrm{Cu} \\cdot (T_\\mathrm{Cu} - T) = c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot (T - T_\\mathrm{v}) $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nm_\\mathrm{Cu} = 0.100\\ \\mathrm{kg},\\quad T_\\mathrm{Cu} = 200\\ ^{\\circ}\\mathrm{C},\\quad c_\\mathrm{Cu} = 0.39\\ \\mathrm{kJ/(kg \\cdot K)} \\\\\nm_\\mathrm{v} = 0.200\\ \\mathrm{kg},\\quad T_\\mathrm{v} = 25\\ ^{\\circ}\\mathrm{C},\\quad c_\\mathrm{v} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}\n\\end{array} \\right]\n$$\n\nSubstitution (all *c* in kJ/(kg·K), so *E* ends up in kJ):\n\n$$ 0.39 \\cdot 0.100 \\cdot (200 - T) = 4.18 \\cdot 0.200 \\cdot (T - 25) $$\n\n$$ 0.0390 \\cdot (200 - T) = 0.836 \\cdot (T - 25) $$\n\n$$ 7.80 - 0.0390\\,T = 0.836\\,T - 20.9 $$\n\n$$ 28.7 = 0.875\\,T \\quad\\Leftrightarrow\\quad T \\approx 32.8\\ ^{\\circ}\\mathrm{C} $$\n\n**Answer:** About 33 °C.\n\n**General conclusion:** Even though the piece of copper is 175 degrees warmer than the water, the water only gets about 8 degrees warmer. This is because the specific heat capacity of water is about 11 times higher than that of copper: water \"needs\" much more energy to warm up. This is why water is so good as a coolant, as a heat transferrer in radiators and as a temperature regulator in the sea."
   },
   {
    "level": 3,
    "question": "A calorimeter (insulated container) is made of aluminium with mass 200 g. The calorimeter contains 300 g of water at a temperature of 20.0 °C. You heat an unknown metal object ($m = 150\\ \\mathrm{g}$) to 200 °C and drop it into the calorimeter. When the mixture is in equilibrium, water + calorimeter + metal object have the same temperature, 28.5 °C. Determine the specific heat capacity of the metal. Use $c_\\mathrm{water} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}$ and $c_\\mathrm{Al} = 0.90\\ \\mathrm{kJ/(kg \\cdot K)}$. Ignore energy losses to the surroundings. Give the answer in kJ/(kg·K).",
    "answer": {
     "value": 0.474,
     "unit": "kJ/(kg·K)",
     "tol": 0.05
    },
    "solution": "The metal object gives off energy when it cools from 200 °C to 28.5 °C. The energy given off is absorbed by **both** the water and the aluminium calorimeter (both are heated from 20.0 °C to 28.5 °C):\n\n$$ E_\\mathrm{avg} = E_\\mathrm{upp,water} + E_\\mathrm{upp,calorimeter} $$\n\n$$ c_x \\cdot m_x \\cdot \\Delta T_x = c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v} + c_\\mathrm{Al} \\cdot m_\\mathrm{Al} \\cdot \\Delta T_\\mathrm{Al} $$\n\nWe solve for the specific heat capacity of the metal $c_x$:\n\n$$ c_x = \\frac{c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v} + c_\\mathrm{Al} \\cdot m_\\mathrm{Al} \\cdot \\Delta T_\\mathrm{Al}}{m_x \\cdot \\Delta T_x} $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nm_\\mathrm{v} = 0.300\\ \\mathrm{kg},\\quad \\Delta T_\\mathrm{v} = 28.5 - 20.0 = 8.5\\ \\mathrm{K} \\\\\nm_\\mathrm{Al} = 0.200\\ \\mathrm{kg},\\quad \\Delta T_\\mathrm{Al} = 8.5\\ \\mathrm{K} \\\\\nm_x = 0.150\\ \\mathrm{kg},\\quad \\Delta T_x = 200 - 28.5 = 171.5\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ c_x = \\frac{4.18 \\cdot 0.300 \\cdot 8.5 + 0.90 \\cdot 0.200 \\cdot 8.5}{0.150 \\cdot 171.5} = \\frac{10.659 + 1.530}{25.725} = \\frac{12.189}{25.725} \\approx 0.474\\ \\mathrm{kJ/(kg \\cdot K)} $$\n\n**Answer:** About 0.47 kJ/(kg·K).\n\n**General conclusion:** The value 0.47 kJ/(kg·K) is close to the specific heat capacity of iron (0.46 kJ/(kg·K) in tables), so the unknown metal is probably iron. This is a classic calorimetry method for identifying metals. Note how important it is to include the heat absorbed by the calorimeter itself: if you leave it out you get $c_x \\approx 0.414\\ \\mathrm{kJ/(kg \\cdot K)}$, which would point to a completely different material."
   }
  ]
 },
 "fy1-6.3": {
  "kalla": "1d68a73466",
  "data": [
   {
    "level": 1,
    "question": "How much energy is needed to melt 0.50 kg of ice that is already at 0 °C? Use $l_s = 334\\ \\mathrm{kJ/kg}$ for ice. Give the answer in kJ.",
    "answer": {
     "value": 167,
     "unit": "kJ",
     "tol": 0.02
    },
    "solution": "Melting is a phase change without a change in temperature. The energy is calculated with:\n\n$$ E = l_s \\cdot m $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nl_s = 334\\ \\mathrm{kJ/kg} \\\\\nm = 0.50\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$ E = 334 \\cdot 0.50 = 167\\ \\mathrm{kJ} $$\n\n**Answer:** 167 kJ."
   },
   {
    "level": 1,
    "question": "How much energy is released when 0.20 kg of steam at 100 °C condenses to liquid water at 100 °C? Use $l_å = 2.26\\ \\mathrm{MJ/kg}$. Give the answer in kJ.",
    "answer": {
     "value": 452,
     "unit": "kJ",
     "tol": 0.02
    },
    "solution": "Condensation releases the same energy as vaporisation requires for the same mass. We use the vaporisation formula:\n\n$$ E = l_å \\cdot m $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nl_å = 2.26\\ \\mathrm{MJ/kg} = 2\\,260\\ \\mathrm{kJ/kg} \\\\\nm = 0.20\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$ E = 2\\,260 \\cdot 0.20 = 452\\ \\mathrm{kJ} $$\n\n**Answer:** 452 kJ.\n\n**General conclusion:** Vaporising water requires much more energy than melting ice of the same mass (compare with 167 kJ for 0.50 kg of ice). This is why it takes a long time to boil away the water in a saucepan, and why steam in contact with the skin causes much more serious burns than boiling water."
   },
   {
    "level": 1,
    "question": "What is the name of the phase change from **gas** directly to **solid** form, without passing through the liquid form?",
    "choices": [
     "Sublimation.",
     "Deposition.",
     "Solidification.",
     "Condensation."
    ],
    "correct": 1,
    "solution": "The six phase changes are:\n\n- Melting (solid → liquid)\n- Solidification (liquid → solid)\n- Vaporisation (liquid → gas)\n- Condensation (gas → liquid)\n- **Sublimation** (solid → gas)\n- **Deposition** (gas → solid)\n\n**Answer:** Option B: deposition.\n\n**General conclusion:** Frost on window panes on a cold morning forms by deposition: water vapour in the air turns directly into ice without first becoming water. The reverse (sublimation) can be seen when dry ice (solid CO₂) turns directly into gas at room temperature."
   },
   {
    "level": 2,
    "question": "You take 1.0 kg of ice at a temperature of −10 °C out of the freezer. How much energy is needed to (1) heat the ice to 0 °C and (2) then melt all of it? Use $c_\\mathrm{ice} = 2.2\\ \\mathrm{kJ/(kg \\cdot K)}$ and $l_s = 334\\ \\mathrm{kJ/kg}$. Give the total energy in kJ.",
    "answer": {
     "value": 356,
     "unit": "kJ",
     "tol": 0.02
    },
    "solution": "The process takes place in two steps: heating the ice from −10 °C to 0 °C, and then melting at 0 °C.\n\n**Step 1: heating:**\n\n$$ E_1 = c_\\mathrm{ice} \\cdot m \\cdot \\Delta T = 2.2 \\cdot 1.0 \\cdot 10 = 22\\ \\mathrm{kJ} $$\n\n**Step 2: melting:**\n\n$$ E_2 = l_s \\cdot m = 334 \\cdot 1.0 = 334\\ \\mathrm{kJ} $$\n\n**Total energy:**\n\n$$ E = E_1 + E_2 = 22 + 334 = 356\\ \\mathrm{kJ} $$\n\n**Answer:** 356 kJ.\n\n**General conclusion:** Note that the melting requires about 15 times more energy than the heating from −10 °C to 0 °C. That is typical: phase changes generally require much more energy than heating or cooling over the same temperature interval. This is why ice in a drink cools it so effectively: the melting absorbs large amounts of energy from the drink."
   },
   {
    "level": 2,
    "question": "How much energy is needed to heat 200 g of water from 20 °C and then vaporise all of it at 100 °C? Use $c_\\mathrm{water} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}$ and $l_å = 2.26\\ \\mathrm{MJ/kg}$. Give the total energy in kJ.",
    "answer": {
     "value": 519,
     "unit": "kJ",
     "tol": 0.02
    },
    "solution": "The process takes place in two steps: first heating to the boiling point 100 °C, then vaporisation at 100 °C.\n\n**Step 1: heating:**\n\n$$ E_1 = c \\cdot m \\cdot \\Delta T $$\n\n$$\n\\left[ \\begin{array}{l}\nc = 4.18\\ \\mathrm{kJ/(kg \\cdot K)} \\\\\nm = 0.200\\ \\mathrm{kg} \\\\\n\\Delta T = 100 - 20 = 80\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\n$$ E_1 = 4.18 \\cdot 0.200 \\cdot 80 = 66.88\\ \\mathrm{kJ} $$\n\n**Step 2: vaporisation:**\n\n$$ E_2 = l_å \\cdot m = 2\\,260 \\cdot 0.200 = 452\\ \\mathrm{kJ} $$\n\n**Total energy:**\n\n$$ E = E_1 + E_2 = 66.88 + 452 \\approx 519\\ \\mathrm{kJ} $$\n\n**Answer:** About 519 kJ.\n\n**General conclusion:** The vaporisation accounts for 87 % of the total energy. This is why it is much quicker to heat a saucepan of water from 20 °C to 100 °C than to boil the water away afterwards: the phase change swallows much more energy than the change in temperature."
   },
   {
    "level": 3,
    "question": "You pour 0.80 kg of water at a temperature of 70 °C into an insulated flask. You then add a number of ice cubes (0 °C) until the final temperature, once all the ice has melted, is 25 °C. How many grams of ice did you need? Use $c_\\mathrm{water} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)}$ and $l_s = 334\\ \\mathrm{kJ/kg}$. Ignore energy losses to the surroundings. Give the answer in grams.",
    "answer": {
     "value": 343,
     "unit": "g",
     "tol": 0.04
    },
    "solution": "The hot water gives off energy when it cools from 70 °C to 25 °C. That energy is absorbed by the ice through **two** processes: (1) melting of the ice at 0 °C and (2) heating of the meltwater from 0 °C to 25 °C.\n\n$$ E_\\mathrm{avg} = E_\\mathrm{melting} + E_\\mathrm{heating of meltwater} $$\n\n$$ c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v} = l_s \\cdot m_\\mathrm{ice} + c_\\mathrm{v} \\cdot m_\\mathrm{ice} \\cdot \\Delta T_\\mathrm{ice} $$\n\nWe solve for $m_\\mathrm{ice}$:\n\n$$ m_\\mathrm{ice} = \\frac{c_\\mathrm{v} \\cdot m_\\mathrm{v} \\cdot \\Delta T_\\mathrm{v}}{l_s + c_\\mathrm{v} \\cdot \\Delta T_\\mathrm{ice}} $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nc_\\mathrm{v} = 4.18\\ \\mathrm{kJ/(kg \\cdot K)} \\\\\nm_\\mathrm{v} = 0.80\\ \\mathrm{kg} \\\\\n\\Delta T_\\mathrm{v} = 70 - 25 = 45\\ \\mathrm{K} \\\\\nl_s = 334\\ \\mathrm{kJ/kg} \\\\\n\\Delta T_\\mathrm{ice} = 25 - 0 = 25\\ \\mathrm{K}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ m_\\mathrm{ice} = \\frac{4.18 \\cdot 0.80 \\cdot 45}{334 + 4.18 \\cdot 25} = \\frac{150.48}{334 + 104.5} = \\frac{150.48}{438.5} \\approx 0.343\\ \\mathrm{kg} $$\n\n**Answer:** About 343 g.\n\n**General conclusion:** The classic trap here is to forget that the meltwater in turn has to be heated from 0 °C to the final temperature 25 °C. If you only count the melting energy you get $m_\\mathrm{ice} = 150.48/334 \\approx 0.450$ kg, that is about 30 % too much ice. Heating the meltwater contributes about 104.5 kJ/kg, which is not at all negligible compared with the specific latent heat of fusion 334 kJ/kg."
   }
  ]
 },
 "fy1-6.4": {
  "kalla": "878011007b",
  "data": [
   {
    "level": 1,
    "question": "Why does sweating cool the body down when it is hot?",
    "choices": [
     "The sweat itself is colder than the body temperature and cools the skin on contact.",
     "When the sweat evaporates, energy is taken from the skin, which lowers its temperature.",
     "The sweat contains salts that react chemically and absorb heat.",
     "The sweat reflects the sun's infrared radiation and prevents heating."
    ],
    "correct": 1,
    "solution": "Evaporation is a phase change from liquid to gas and requires energy (the latent heat of vaporisation). That energy is taken from what it moistens, that is, the skin. The result is that the temperature of the skin falls.\n\n**Answer:** Option B.\n\n**General conclusion:** The same physical principle explains why you feel cold when you step out of the shower, why you can keep drinks bottles cool with a wet cloth wrapped around them, and why dogs pant (they do not sweat, so they use the breathing air to evaporate water from the tongue)."
   },
   {
    "level": 1,
    "question": "A human body at rest gives off heat to the surroundings at roughly the same power as a small radiator. What power are we talking about?",
    "choices": [
     "About 10 W.",
     "About 100 W.",
     "About 1 000 W.",
     "About 10 000 W."
    ],
    "correct": 1,
    "solution": "A human body at rest gives off about **100 W** of heat through radiation, convection and evaporation from the skin and airways.\n\n**Answer:** Option B: about 100 W.\n\n**General conclusion:** This is why a classroom with 30 students gets warm even without the radiators on: 30 people give a combined heating power of about 3 000 W, corresponding to three powerful radiators. Many modern passive houses make use of this to reduce the need for active heating."
   },
   {
    "level": 1,
    "question": "A human body at rest gives off about 100 W of heat. How much energy do you give off during 8 hours of sleep? Give the answer in MJ.",
    "answer": {
     "value": 2.88,
     "unit": "MJ",
     "tol": 0.02
    },
    "solution": "Energy is power multiplied by time:\n\n$$ E = P \\cdot t $$\n\nMeasured values (with the time in SI units):\n\n$$\n\\left[ \\begin{array}{l}\nP = 100\\ \\mathrm{W} \\\\\nt = 8\\ \\mathrm{h} = 8 \\cdot 3\\,600\\ \\mathrm{s} = 28\\,800\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$ E = 100 \\cdot 28\\,800 = 2\\,880\\,000\\ \\mathrm{J} = 2.88\\ \\mathrm{MJ} $$\n\n**Answer:** 2.88 MJ.\n\n**General conclusion:** That corresponds roughly to the energy in 125 g of chocolate (about 2.3 MJ per 100 g) or seven bananas. This is why we need to eat: the body must constantly top up its energy to make up for the heat it gives off."
   },
   {
    "level": 2,
    "question": "In a sauna the air temperature is 80 °C. When you blow hard on your arm there, you do **not** experience it as cool, but as extremely **hot**. Why?",
    "choices": [
     "At high air temperatures sweat stops evaporating, so the cooling disappears.",
     "Sauna air is drier and conducts heat better than ordinary air.",
     "High temperature switches off the nerve endings that would otherwise sense heat, so only the feeling of pressure remains.",
     "The hot air sweeps away the 33-degree air close to the skin and replaces it with 80-degree air, so heat flows **to** the skin instead of from it."
    ],
    "correct": 3,
    "solution": "Heat always flows from warm to cold. When you blow hard on your arm outdoors (with 20 °C air) you sweep away the warm air close to the skin and replace it with cold air; heat then flows **from** the arm, and you experience it as cold. In the sauna you do the opposite: you sweep away the 33-degree air close to the skin and replace it with 80-degree air; heat then flows **to** the arm and you experience it as hot.\n\n**Answer:** Option D.\n\n**General conclusion:** It is not the movement of the air in itself that decides whether you feel warm or cold: it is the **temperature difference** between your skin and the new air. The same phenomenon explains why fans do not help in extreme heat (and sometimes make it worse if the air is warmer than the skin)."
   },
   {
    "level": 2,
    "question": "Assume that all the heat given off by a person at rest (power 100 W over one day) took place solely through sweat **vaporising** from the skin. How much water in kg would have to be sweated out and vaporised during the day? Use $l_å = 2.26\\ \\mathrm{MJ/kg}$ for water at skin temperature.",
    "answer": {
     "value": 3.82,
     "unit": "kg",
     "tol": 0.03
    },
    "solution": "First we calculate the total energy given off during one day:\n\n$$ E = P \\cdot t = 100 \\cdot 24 \\cdot 3\\,600 = 8\\,640\\,000\\ \\mathrm{J} = 8.64\\ \\mathrm{MJ} $$\n\nIf all this energy is to be used to vaporise water:\n\n$$ E = l_å \\cdot m \\quad\\Leftrightarrow\\quad m = \\frac{E}{l_å} $$\n\nMeasured values:\n\n$$\n\\left[ \\begin{array}{l}\nE = 8.64\\ \\mathrm{MJ} \\\\\nl_å = 2.26\\ \\mathrm{MJ/kg}\n\\end{array} \\right]\n$$\n\n$$ m = \\frac{8.64}{2.26} \\approx 3.82\\ \\mathrm{kg} $$\n\n**Answer:** About 3.8 kg of water.\n\n**General conclusion:** In reality you do not sweat that much during normal activity (about 0.5–1 kg per day): most of the heat is given off through **radiation** and **convection** to the surrounding air. But in extreme heat or during hard physical exertion, when the surroundings are warmer than the skin, sweating becomes the only effective cooling mechanism, and then the amount of sweat can approach several kg per day."
   }
  ]
 },
 "fy1-6.5": {
  "kalla": "d8e3beb2fd",
  "data": [
   {
    "level": 1,
    "question": "Which of the laws of thermodynamics says that **energy cannot be created or destroyed, only converted**?",
    "choices": [
     "The zeroth law.",
     "The first law.",
     "The second law.",
     "The third law."
    ],
    "correct": 1,
    "solution": "**The first law** is the principle of conservation of energy: energy can be neither created nor destroyed, only converted between different forms of energy (kinetic energy, potential energy, heat, chemical energy and so on).\n\n**Answer:** Option B: the first law.\n\n**General conclusion:** The first law is the foundation of all energy calculations in physics. It rules out \"perpetual motion machines of the first kind\", machines that would create energy from nothing."
   },
   {
    "level": 1,
    "question": "Which law explains why heat **never flows by itself** from a cold object to a warmer object?",
    "choices": [
     "The zeroth law.",
     "The first law.",
     "The second law.",
     "The third law."
    ],
    "correct": 2,
    "solution": "**The second law** says that heat always flows from warm to cold, never spontaneously in the other direction. To move heat from cold to warm (as in a refrigerator or a heat pump), **work** from an external energy source is needed.\n\n**Answer:** Option C: the second law.\n\n**General conclusion:** This is what makes time seem to have a direction in thermodynamic processes: we never see a smashed cup \"put itself back together\", and cold milk does not spontaneously warm up in the fridge. The second law is closely linked to the concept of **entropy** (disorder), which you will meet in Physics level 2."
   },
   {
    "level": 1,
    "question": "According to the **third law**, at what temperature do all processes in a system stop?",
    "choices": [
     "At −100 °C, where all ordinary gases condense.",
     "At 0 °C, the freezing point of water.",
     "At 0 K, absolute zero.",
     "At the temperature of the cosmic background radiation (2.7 K)."
    ],
    "correct": 2,
    "solution": "**The third law** says that all processes stop at **absolute zero** (0 K = −273.15 °C). There, in theory, the atoms have no motion at all. In practice you can get arbitrarily close to 0 K, but never quite reach it.\n\n**Answer:** Option C: at 0 K.\n\n**General conclusion:** In modern laboratories, temperatures below a billionth of a kelvin (10⁻⁹ K) have been reached, colder than anything else anywhere in the observable universe. It is a consequence of the third law that 0 K cannot be reached in a finite number of steps, but you can get as close as you like."
   },
   {
    "level": 2,
    "question": "You take a cold can of fizzy drink (4 °C) out of the fridge and put it on the kitchen table, where the room air is 22 °C. After a while the can has the same temperature as the room. Which law most directly describes this equalisation?",
    "choices": [
     "The zeroth law: two systems in contact exchange energy until they reach equilibrium (the same temperature).",
     "The first law: the energy from the room becomes equal to the energy in the can.",
     "The second law: heat flows from cold to warm.",
     "The third law: the equalisation is only possible if both systems are above 0 K."
    ],
    "correct": 0,
    "solution": "**The zeroth law** says that two systems in contact exchange energy until they reach **thermal equilibrium**, that is, the same temperature. That is what happens to the can: heat flows from the warmer room air to the colder can until the temperatures are equal.\n\n**Answer:** Option A: the zeroth law.\n\n**General conclusion:** The second law is also relevant (it determines the **direction** of the heat flow, from warm to cold), but it is the zeroth law that specifically says that the equalisation always goes all the way. It is because of the zeroth law that thermometers work: the thermometer and the object exchange energy until they have the same temperature, and the thermometer then shows the temperature of the object."
   },
   {
    "level": 2,
    "question": "An inventor claims to have built a machine that heats a room solely by transferring heat from the cold outdoor air, **without supplying any electrical or other external energy**. The machine is thus supposed to work entirely by itself, without a power source. Which of the laws makes this invention impossible?",
    "choices": [
     "The zeroth law.",
     "The first law.",
     "The second law.",
     "The third law."
    ],
    "correct": 2,
    "solution": "Heat flows by itself only from warm to cold, never the other way round. Transferring heat from a colder to a warmer place always requires work to be supplied (for example electricity to a compressor in a heat pump). It is **the second law** that makes this kind of \"passive heat pump without a power source\" impossible.\n\n**Answer:** Option C: the second law.\n\n**General conclusion:** Real heat pumps and refrigerators do not break the second law: they use electrical energy to \"force\" heat to go from cold to warm. An ordinary heat pump can, however, deliver 3–4 times as much heat energy to the room as the electricity it draws from the socket, because the rest comes from the outdoor air. It is still not free, but it is efficient."
   }
  ]
 },
 "fy1-7.1": {
  "kalla": "49b3a36e02",
  "data": [
   {
    "level": 1,
    "question": "Rod A is negatively charged and rod B is positively charged. What happens when they are brought close to each other?",
    "choices": [
     "They attract each other (are pulled towards each other).",
     "They repel each other (are pushed away from each other).",
     "No force arises because the charges cancel each other out.",
     "They first repel and then attract."
    ],
    "correct": 0,
    "solution": "The rods have charges of **opposite** sign (one negative, one positive). Opposite charges pull towards each other with an attractive force.\n\n**Answer:** Option A: they attract each other.\n\n**General conclusion:** Like charges repel, opposite charges attract. It is the same rule as for magnets (like poles repel), but here it is about electric charge, not magnetism."
   },
   {
    "level": 1,
    "question": "Which statement about conductors and insulators is correct?",
    "choices": [
     "In a conductor the conduction electrons move easily through the material.",
     "In an insulator the electrons move easily through the material.",
     "In a conductor all electrons are tightly bound to the atoms.",
     "A semiconductor always conducts current better than a metal."
    ],
    "correct": 0,
    "solution": "In a **conductor** (for example a metal) there are conduction electrons that move easily through the material, which is why conductors conduct current well. In an **insulator** (glass, plastic, wood) the electrons are tightly bound and do not move easily.\n\n**Answer:** Option A.\n\n**General conclusion:** A **semiconductor** (silicon, selenium) is something in between: an insulator at low temperature, a conductor at high temperature. So it does *not* always conduct better than a metal."
   },
   {
    "level": 1,
    "question": "A small plastic ball is negatively charged with $Q = 4.0\\ \\mathrm{nC}$. How many excess electrons does the ball have? The elementary charge is $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 25000000000,
     "unit": ""
    },
    "solution": "The number of excess electrons *n* is found by dividing the charge of the ball *Q* by the charge of the electron $q_e$:\n\n$$ n = \\frac{Q}{q_e} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ = 4.0\\ \\mathrm{nC} = 4.0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nq_e \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ n = \\frac{4.0 \\cdot 10^{-9}}{1.602 \\cdot 10^{-19}} = 2.50 \\cdot 10^{10}\\ \\text{electrons} $$\n\n**Answer:** The ball has about $2.5 \\cdot 10^{10}$ excess electrons (25 billion)."
   },
   {
    "level": 2,
    "question": "Two identical metal balls have the charges $Q_1 = +6.0\\ \\mathrm{nC}$ and $Q_2 = -2.0\\ \\mathrm{nC}$. The balls are allowed to touch and are then separated. What charge does each ball have afterwards?",
    "answer": {
     "value": 2,
     "unit": "nC"
    },
    "solution": "When two **identical** conducting balls touch, the total charge is shared equally between them. Each ball then gets the mean of the original charges:\n\n$$ Q = \\frac{Q_1 + Q_2}{2} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ_1 = +6.0\\ \\mathrm{nC} \\\\\nQ_2 = -2.0\\ \\mathrm{nC}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = \\frac{+6.0 + (-2.0)}{2} = \\frac{+4.0}{2} = +2.0\\ \\mathrm{nC} $$\n\n**Answer:** Each ball has the charge $+2.0\\ \\mathrm{nC}$ afterwards.\n\n**General conclusion:** The total charge is conserved ($+4.0\\ \\mathrm{nC}$ before and after): charge cannot be created or destroyed, only redistributed. Equal sharing only applies when the balls are identical in size."
   },
   {
    "level": 2,
    "question": "A balloon is rubbed against hair and then gains an excess of $3.0 \\cdot 10^{10}$ electrons. What charge does the balloon get? Answer in nC. The elementary charge is $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": -4.8,
     "unit": "nC",
     "ignoreSign": true
    },
    "solution": "The charge *Q* is the number of excess electrons *n* multiplied by the charge of the electron $q_e$:\n\n$$ Q = n \\cdot q_e $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nn = 3.0 \\cdot 10^{10}\\ \\text{electrons} \\\\\nq_e \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = 3.0 \\cdot 10^{10} \\cdot 1.602 \\cdot 10^{-19} = 4.806 \\cdot 10^{-9}\\ \\mathrm{C} \\approx 4.8\\ \\mathrm{nC} $$\n\n**Answer:** The charge of the balloon is about $-4.8\\ \\mathrm{nC}$ (negative, since it has an excess of electrons).\n\n**General conclusion:** This is the reverse of $n = Q/q_e$. The sign of the charge is decided by whether the object has an excess (negative) or a deficit (positive) of electrons."
   },
   {
    "level": 2,
    "question": "Two identical metal balls have the charges $Q_1 = +5.0\\ \\mathrm{nC}$ and $Q_2 = -3.0\\ \\mathrm{nC}$. They are allowed to touch and are then separated. How many electrons have then moved from one ball to the other? The elementary charge is $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 25000000000,
     "unit": ""
    },
    "solution": "First we determine the final state. Identical conducting balls share the charge equally:\n\n$$ Q = \\frac{Q_1 + Q_2}{2} = \\frac{+5.0 + (-3.0)}{2} = +1.0\\ \\mathrm{nC} $$\n\nSo both balls have $+1.0\\ \\mathrm{nC}$ afterwards. Now we see how much each ball changed:\n\n$$\n\\left[ \\begin{array}{l}\n\\text{Ball 1: } +5.0 \\to +1.0\\ \\mathrm{nC} \\quad (\\text{became } 4.0\\ \\mathrm{nC}\\ \\text{more negative}) \\\\\n\\text{Ball 2: } -3.0 \\to +1.0\\ \\mathrm{nC} \\quad (\\text{became } 4.0\\ \\mathrm{nC}\\ \\text{more positive})\n\\end{array} \\right]\n$$\n\nBall 1 became more negative → it **received** electrons. Ball 2 became more positive → it **gave away** electrons. The charge that moved corresponds to $\\Delta Q = 4.0\\ \\mathrm{nC}$. The number of electrons is then\n\n$$ n = \\frac{\\Delta Q}{q_e} = \\frac{4.0 \\cdot 10^{-9}}{1.602 \\cdot 10^{-19}} = 2.50 \\cdot 10^{10}\\ \\text{electrons} $$\n\n**Answer:** About $2.5 \\cdot 10^{10}$ electrons moved from ball 2 to ball 1.\n\n**General conclusion:** It is *electrons* that move, never protons. A ball becomes less positive by receiving electrons, not by \"sending away\" positive charge. Working out the charge that moved, $\\Delta Q$, and not the final state, is the key."
   },
   {
    "level": 3,
    "question": "Two small balls with the charges $Q_1$ and $Q_2$ hang at a distance of $10\\ \\mathrm{cm}$ from each other and **attract** each other with the force $14.4\\ \\mathrm{\\mu N}$. The balls are then allowed to touch and are placed $10\\ \\mathrm{cm}$ apart again; now they **repel** each other with the force $8.1\\ \\mathrm{\\mu N}$. Determine the original charges $Q_1$ and $Q_2$. ($k \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$)",
    "solution": "This cannot be solved by straightforward substitution: we need to set up two relationships and solve a system of equations.\n\n**After touching**, the two identical balls share the charge equally, so each gets $\\dfrac{Q_1 + Q_2}{2}$. That they now repel with $8.1\\ \\mathrm{\\mu N}$ gives, through Coulomb's law,\n\n$$ F_2 = k \\cdot \\frac{\\left(\\frac{Q_1+Q_2}{2}\\right)^2}{r^2} \\quad\\Rightarrow\\quad \\frac{Q_1+Q_2}{2} = \\sqrt{\\frac{F_2 \\cdot r^2}{k}} = \\sqrt{\\frac{8.1 \\cdot 10^{-6} \\cdot 0.10^2}{8.99 \\cdot 10^9}} = 3.0 \\cdot 10^{-9}\\ \\mathrm{C} $$\n\nThe **sum** is therefore $Q_1 + Q_2 = 6.0\\ \\mathrm{nC}$.\n\n**Before touching** the balls attracted each other → the charges had *opposite* signs, so the product $Q_1 \\cdot Q_2$ is negative. Coulomb's law gives the magnitude of the product:\n\n$$ F_1 = k \\cdot \\frac{|Q_1 \\cdot Q_2|}{r^2} \\quad\\Rightarrow\\quad |Q_1 \\cdot Q_2| = \\frac{F_1 \\cdot r^2}{k} = \\frac{14.4 \\cdot 10^{-6} \\cdot 0.10^2}{8.99 \\cdot 10^9} = 1.6 \\cdot 10^{-17}\\ \\mathrm{C^2} = 16\\ (\\mathrm{nC})^2 $$\n\nSince the signs are opposite: $Q_1 \\cdot Q_2 = -16\\ (\\mathrm{nC})^2$.\n\n**The system of equations** (in nC) therefore has the sum $6$ and the product $-16$. The numbers $Q_1$ and $Q_2$ are roots of\n\n$$ x^2 - 6x - 16 = 0 \\quad\\Rightarrow\\quad x = \\frac{6 \\pm \\sqrt{36 + 64}}{2} = \\frac{6 \\pm 10}{2} $$\n\nwhich gives $x = 8$ or $x = -2$.\n\n**Answer:** The charges were $+8.0\\ \\mathrm{nC}$ and $-2.0\\ \\mathrm{nC}$.\n\n**General conclusion:** The crucial thing is to read off the *sign* from the direction of the force (attraction → negative product, repulsion → positive product) and to realise that touching gives the mean charge. Then the sum and the product are known, and the charges are the roots of $x^2 - (\\text{sum})x + (\\text{product}) = 0$."
   }
  ]
 },
 "fy1-7.2": {
  "kalla": "246d084fac",
  "data": [
   {
    "level": 1,
    "question": "Two small charged balls have the charges $Q_1 = 8.0\\ \\mathrm{nC}$ and $Q_2 = 5.0\\ \\mathrm{nC}$ and are placed $20\\ \\mathrm{cm}$ from each other. How large is the electric force between them? Coulomb's constant is $k \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$.",
    "answer": {
     "value": 9,
     "unit": "μN"
    },
    "solution": "We set up Coulomb's law:\n\n$$ F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} $$\n\nMeasured values (charges and distance in SI units):\n$$\n\\left[ \\begin{array}{l}\nQ_1 = 8.0\\ \\mathrm{nC} = 8.0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nQ_2 = 5.0\\ \\mathrm{nC} = 5.0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nr = 20\\ \\mathrm{cm} = 0.20\\ \\mathrm{m} \\\\\nk \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ F = 8.99 \\cdot 10^9 \\cdot \\frac{8.0 \\cdot 10^{-9} \\cdot 5.0 \\cdot 10^{-9}}{0.20^2} = 8.99 \\cdot 10^{-6}\\ \\mathrm{N} \\approx 9.0\\ \\mathrm{\\mu N} $$\n\n**Answer:** The force is about $9.0\\ \\mathrm{\\mu N}$.\n\n**General conclusion:** Do not forget to convert nC to C ($10^{-9}$) and cm to m before substituting: one of the most common sources of error in Coulomb tasks is units that have not been converted."
   },
   {
    "level": 1,
    "question": "Two charges $Q_1 = 2.0\\ \\mathrm{nC}$ and $Q_2 = 5.0\\ \\mathrm{nC}$ act on each other with the force $F = 9.0\\ \\mathrm{\\mu N}$. How far apart are they? Answer in cm.",
    "answer": {
     "value": 10,
     "unit": "cm"
    },
    "solution": "We start from Coulomb's law and solve for the distance *r*:\n\n$$ F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} \\quad\\Leftrightarrow\\quad r = \\sqrt{\\frac{k \\cdot Q_1 \\cdot Q_2}{F}} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ_1 = 2.0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nQ_2 = 5.0 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nF = 9.0\\ \\mathrm{\\mu N} = 9.0 \\cdot 10^{-6}\\ \\mathrm{N} \\\\\nk \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ r = \\sqrt{\\frac{8.99 \\cdot 10^9 \\cdot 2.0 \\cdot 10^{-9} \\cdot 5.0 \\cdot 10^{-9}}{9.0 \\cdot 10^{-6}}} = 0.10\\ \\mathrm{m} = 10\\ \\mathrm{cm} $$\n\n**Answer:** The distance is about $10\\ \\mathrm{cm}$.\n\n**General conclusion:** Since the distance is squared in the denominator, we have to take the square root at the end. Solving for *r* is a common extra step compared with just calculating the force directly."
   },
   {
    "level": 1,
    "question": "The charge $Q_1 = 2\\ \\mathrm{nC}$ and the charge $Q_2 = 8\\ \\mathrm{nC}$ act on each other electrically. What is true about the forces on the two charges?",
    "choices": [
     "The force is four times as large on $Q_2$, because that charge is four times as large.",
     "It cannot be determined without knowing the distance between them.",
     "The force is larger on $Q_1$, because it is smaller and therefore easier to affect.",
     "The force is equally large on both charges, but directed in opposite directions."
    ],
    "correct": 3,
    "solution": "According to **Newton's third law**, the force that $Q_1$ exerts on $Q_2$ is exactly as large as the force that $Q_2$ exerts on $Q_1$, but in the opposite direction. It makes no difference that one charge is larger.\n\nThis can also be seen directly in Coulomb's law: in the expression $F = k \\cdot Q_1 \\cdot Q_2 / r^2$ *both* charges appear in the same product, so there is one and the same force value for the pair.\n\n**Answer:** Option D: equally large force on both, in opposite directions.\n\n**General conclusion:** It is the same principle as in gravitation: the Earth pulls on you with the same force as you pull on the Earth, despite the enormous difference in mass. A larger charge does not give a larger force on \"the other party\"."
   },
   {
    "level": 2,
    "question": "Two charged balls act on each other with a certain electric force. The distance between them is doubled at the same time as the charge of one of the balls is tripled. How many times as large is the new force compared with the original one?",
    "answer": {
     "value": 0.75,
     "unit": "times"
    },
    "solution": "We have no measured values and solve the task in general. The original force is\n\n$$ F_1 = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} $$\n\nOne charge is tripled ($Q_1 \\to 3Q_1$) and the distance is doubled ($r \\to 2r$). The new force is\n\n$$ F_2 = k \\cdot \\frac{(3 Q_1) \\cdot Q_2}{(2r)^2} = k \\cdot \\frac{3 \\cdot Q_1 \\cdot Q_2}{4 r^2} = \\frac{3}{4} \\cdot k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} = \\frac{3}{4} F_1 $$\n\n**Answer:** The force becomes $\\dfrac{3}{4} = 0.75$ times as large (that is, smaller than before).\n\n**General conclusion:** The charge increases the force linearly (factor 3), but the distance has a squared effect (factor $2^2 = 4$ in the denominator). The squared dependence on distance \"wins\" here, so the force decreases even though the charge increased."
   },
   {
    "level": 2,
    "question": "A small ball with mass $m = 0.50\\ \\mathrm{g}$ and charge $Q_1 = 30\\ \\mathrm{nC}$ is $5.0\\ \\mathrm{cm}$ from a fixed charge $Q_2 = 40\\ \\mathrm{nC}$. What acceleration does the movable ball have at that instant? Ignore the gravitational force.",
    "answer": {
     "value": 8.6,
     "unit": "m/s²"
    },
    "solution": "We first calculate the electric force with Coulomb's law:\n\n$$ F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ_1 = 30 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nQ_2 = 40 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nr = 5.0\\ \\mathrm{cm} = 0.050\\ \\mathrm{m} \\\\\nk \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}\n\\end{array} \\right]\n$$\n\n$$ F = 8.99 \\cdot 10^9 \\cdot \\frac{30 \\cdot 10^{-9} \\cdot 40 \\cdot 10^{-9}}{0.050^2} = 4.32 \\cdot 10^{-3}\\ \\mathrm{N} $$\n\nThe acceleration is found from **Newton's second law** $F = m \\cdot a$, solved for *a*:\n\n$$ a = \\frac{F}{m} = \\frac{4.32 \\cdot 10^{-3}}{0.50 \\cdot 10^{-3}} = 8.6\\ \\mathrm{m/s^2} $$\n\n**Answer:** The ball has an acceleration of about $8.6\\ \\mathrm{m/s^2}$.\n\n**General conclusion:** The electric force drives the motion, but the acceleration also depends on the mass. Do not forget that the mass in grams must be converted to kilograms ($0.50\\ \\mathrm{g} = 0.50 \\cdot 10^{-3}\\ \\mathrm{kg}$)."
   },
   {
    "level": 2,
    "question": "Three charges lie on a straight line. In the middle is $Q_2 = +4.0\\ \\mathrm{nC}$. At a distance of $2.0\\ \\mathrm{cm}$ to the left of it is $Q_1 = +6.0\\ \\mathrm{nC}$, and at a distance of $3.0\\ \\mathrm{cm}$ to the right is $Q_3 = -5.0\\ \\mathrm{nC}$. Determine the magnitude of the resultant electric force on the middle charge $Q_2$.",
    "answer": {
     "value": 740,
     "unit": "μN"
    },
    "solution": "The middle charge $Q_2$ is acted on by two forces, one from each neighbouring charge. We determine the magnitude and direction of each.\n\n**The force from $Q_1$ (on the left):** $Q_1$ and $Q_2$ are both positive → they repel. So $Q_2$ is pushed **to the right**, away from $Q_1$.\n\n$$ F_1 = k \\cdot \\frac{Q_1 \\cdot Q_2}{r_1^2} = 8.99 \\cdot 10^9 \\cdot \\frac{6.0 \\cdot 10^{-9} \\cdot 4.0 \\cdot 10^{-9}}{0.020^2} = 5.39 \\cdot 10^{-4}\\ \\mathrm{N} $$\n\n**The force from $Q_3$ (on the right):** $Q_2$ is positive and $Q_3$ negative → they attract. So $Q_2$ is pulled **to the right**, towards $Q_3$.\n\n$$ F_3 = k \\cdot \\frac{Q_2 \\cdot Q_3}{r_3^2} = 8.99 \\cdot 10^9 \\cdot \\frac{4.0 \\cdot 10^{-9} \\cdot 5.0 \\cdot 10^{-9}}{0.030^2} = 2.00 \\cdot 10^{-4}\\ \\mathrm{N} $$\n\nBoth forces point **in the same direction** (to the right), so the resultant force is the sum:\n\n$$ F = F_1 + F_3 = 5.39 \\cdot 10^{-4} + 2.00 \\cdot 10^{-4} = 7.39 \\cdot 10^{-4}\\ \\mathrm{N} \\approx 740\\ \\mathrm{\\mu N} $$\n\n**Answer:** The resultant force is about $740\\ \\mathrm{\\mu N}$ (or $0.74\\ \\mathrm{mN}$), directed to the right.\n\n**General conclusion:** In superposition tasks you must first decide the *direction* of each force using the sign rule (like charges repel, opposite charges attract) and then add. Here both pointed in the same direction and were added. Had they pointed in opposite directions you would instead have subtracted, and the larger force would have decided the net direction."
   },
   {
    "level": 3,
    "question": "On a straight line the charge $Q_1 = +4.0\\ \\mathrm{nC}$ is at the origin and the charge $Q_2 = +9.0\\ \\mathrm{nC}$ is at a distance of $50\\ \\mathrm{cm}$ to the right. Where on the line between the charges should a third charge be placed so that it is **not acted on by any resultant electric force**? Give the distance from $Q_1$.",
    "answer": {
     "value": 20,
     "unit": "cm"
    },
    "solution": "The third charge *q* is acted on by a force from each of the others. The net force is zero where the two forces are **equally large and opposite**. Since $Q_1$ and $Q_2$ are both positive, their forces on *q* point in opposite directions somewhere *between* them; that is where the zero point is.\n\nCall the distance from $Q_1$ to the point *x*. The distance to $Q_2$ is then $(d - x)$ where $d = 50\\ \\mathrm{cm}$. Force equilibrium with Coulomb's law (*q* and *k* appear on both sides and cancel):\n\n$$ k \\cdot \\frac{Q_1 \\cdot q}{x^2} = k \\cdot \\frac{Q_2 \\cdot q}{(d-x)^2} \\quad\\Rightarrow\\quad \\frac{Q_1}{x^2} = \\frac{Q_2}{(d-x)^2} $$\n\nWe rearrange and take the square root of both sides:\n\n$$ \\frac{(d-x)^2}{x^2} = \\frac{Q_2}{Q_1} \\quad\\Rightarrow\\quad \\frac{d-x}{x} = \\sqrt{\\frac{Q_2}{Q_1}} = \\sqrt{\\frac{9.0}{4.0}} = 1.5 $$\n\n$$ d - x = 1.5x \\quad\\Rightarrow\\quad d = 2.5x \\quad\\Rightarrow\\quad x = \\frac{50}{2.5} = 20\\ \\mathrm{cm} $$\n\n**Answer:** $20\\ \\mathrm{cm}$ from the smaller charge ($Q_1$).\n\n**General conclusion:** The zero point lies *closer to the smaller charge*: its weaker field needs a shorter distance to catch up with the stronger one. The insight is to set the forces equal and take the square root; the charge *q* and the constant *k* cancel and play no role."
   }
  ]
 },
 "fy1-7.3": {
  "kalla": "f0080d5692",
  "data": [
   {
    "level": 1,
    "question": "A charge of $Q = 12\\ \\mathrm{C}$ passes a cross-section of a conductor during the time $t = 4.0\\ \\mathrm{s}$. How large is the current through the conductor?",
    "answer": {
     "value": 3,
     "unit": "A"
    },
    "solution": "The current is the charge that passes per unit time:\n\n$$ I = \\frac{Q}{t} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ = 12\\ \\mathrm{C} \\\\\nt = 4.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ I = \\frac{12}{4.0} = 3.0\\ \\mathrm{A} $$\n\n**Answer:** The current is $3.0\\ \\mathrm{A}$."
   },
   {
    "level": 1,
    "question": "A current of $I = 0.50\\ \\mathrm{A}$ flows through a lamp for $2.0$ minutes. How much charge has then passed through the lamp? Answer in coulombs.",
    "answer": {
     "value": 60,
     "unit": "C"
    },
    "solution": "We solve for the charge *Q* from the formula for current:\n\n$$ I = \\frac{Q}{t} \\quad\\Leftrightarrow\\quad Q = I \\cdot t $$\n\nMeasured values (time converted to seconds):\n$$\n\\left[ \\begin{array}{l}\nI = 0.50\\ \\mathrm{A} \\\\\nt = 2.0\\ \\mathrm{min} = 2.0 \\cdot 60\\ \\mathrm{s} = 120\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = 0.50 \\cdot 120 = 60\\ \\mathrm{C} $$\n\n**Answer:** The charge is $60\\ \\mathrm{C}$.\n\n**General conclusion:** The time must be in seconds for the answer to be in coulombs. If you forget to convert minutes to seconds, the answer is 60 times too small."
   },
   {
    "level": 1,
    "question": "In the circuit below the current from the battery splits into two branches. The current out of the battery is $I = 0.90\\ \\mathrm{A}$ and the current through the left branch ($R_1$) is $I_1 = 0.55\\ \\mathrm{A}$. How large is the current $I_2$ through the right branch ($R_2$)?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 172 204\" style=\"max-width:172px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"142\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"82\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"90\" y1=\"154\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"66\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"96\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"30\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"142\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"66\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂</text><line x1=\"82\" y1=\"140\" x2=\"82\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"90\" y1=\"146\" x2=\"90\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"86\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "answer": {
     "value": 0.35,
     "unit": "A"
    },
    "solution": "At the junction, **Kirchhoff's first law** applies: the sum of the currents into the point equals the sum of the currents out.\n\nThe whole current *I* from the battery splits into $I_1$ and $I_2$:\n\n$$ I = I_1 + I_2 \\quad\\Leftrightarrow\\quad I_2 = I - I_1 $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nI = 0.90\\ \\mathrm{A} \\\\\nI_1 = 0.55\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ I_2 = 0.90 - 0.55 = 0.35\\ \\mathrm{A} $$\n\n**Answer:** The current through the right branch is $I_2 = 0.35\\ \\mathrm{A}$.\n\n**General conclusion:** The current can never \"disappear\" or \"get stuck\" at a junction: everything that goes in must come out. The branch currents add up to the main current."
   },
   {
    "level": 2,
    "question": "A rechargeable battery is marked $2.0\\ \\mathrm{Ah}$ (ampere-hours). It powers a lamp that draws a current of $0.25\\ \\mathrm{A}$. How long does the battery last before it is discharged? Answer in hours.",
    "answer": {
     "value": 8,
     "unit": "h"
    },
    "solution": "The marking $2.0\\ \\mathrm{Ah}$ means that the battery can deliver the charge $Q = 2.0\\ \\mathrm{Ah}$. We solve for the time *t* from the current formula:\n\n$$ I = \\frac{Q}{t} \\quad\\Leftrightarrow\\quad t = \\frac{Q}{I} $$\n\nHere we can use the charge in Ah and the current in A directly, since $\\mathrm{Ah} / \\mathrm{A} = \\mathrm{h}$:\n\n$$\n\\left[ \\begin{array}{l}\nQ = 2.0\\ \\mathrm{Ah} \\\\\nI = 0.25\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\n$$ t = \\frac{2.0}{0.25} = 8.0\\ \\mathrm{h} $$\n\n**Answer:** The battery lasts $8.0$ hours.\n\n**General conclusion:** The unit ampere-hour is tailor-made for exactly this calculation: a battery of \"X Ah\" delivers a current of 1 A for X hours, or 0.5 A for 2X hours, and so on. You do not need to convert to coulombs if both the charge (Ah) and the current (A) are kept in the same \"system\"."
   },
   {
    "level": 2,
    "question": "A current of $0.50\\ \\mathrm{A}$ flows through a conductor. How many electrons pass a cross-section of the conductor in $1.0\\ \\mathrm{s}$? The elementary charge is $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 3100000000000000000,
     "unit": ""
    },
    "solution": "We first calculate the charge *Q* that passes during the second:\n\n$$ I = \\frac{Q}{t} \\quad\\Leftrightarrow\\quad Q = I \\cdot t = 0.50 \\cdot 1.0 = 0.50\\ \\mathrm{C} $$\n\nThe number of electrons *n* is found by dividing the charge by the charge of the electron $q_e$:\n\n$$ n = \\frac{Q}{q_e} $$\n\n$$\n\\left[ \\begin{array}{l}\nQ = 0.50\\ \\mathrm{C} \\\\\nq_e \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\n$$ n = \\frac{0.50}{1.602 \\cdot 10^{-19}} = 3.12 \\cdot 10^{18}\\ \\text{electrons} \\approx 3.1 \\cdot 10^{18}\\ \\text{electrons} $$\n\n**Answer:** About $3.1 \\cdot 10^{18}$ electrons.\n\n**General conclusion:** Even a fairly modest current corresponds to an enormous number of electrons per second: the charge of a single electron is extremely small."
   },
   {
    "level": 2,
    "question": "A rechargeable battery is marked $2.4\\ \\mathrm{Ah}$. It is completely discharged in exactly one day with a constant current. On average, how many electrons pass through the circuit each second? ($1\\ \\mathrm{Ah} = 3\\,600\\ \\mathrm{C}$, $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$)",
    "answer": {
     "value": 620000000000000000,
     "unit": ""
    },
    "solution": "**Step 1: total charge in coulombs.** The marking $2.4\\ \\mathrm{Ah}$ is converted to coulombs:\n\n$$ Q = 2.4\\ \\mathrm{Ah} = 2.4 \\cdot 3\\,600\\ \\mathrm{C} = 8\\,640\\ \\mathrm{C} $$\n\n**Step 2: the current.** The discharge takes one day, $t = 24 \\cdot 3\\,600\\ \\mathrm{s} = 86\\,400\\ \\mathrm{s}$. The current is\n\n$$ I = \\frac{Q}{t} = \\frac{8\\,640}{86\\,400} = 0.10\\ \\mathrm{A} $$\n\n**Step 3: electrons per second.** In one second the charge $Q_1 = I \\cdot t_1 = 0.10 \\cdot 1.0 = 0.10\\ \\mathrm{C}$ passes. The number of electrons is\n\n$$ n = \\frac{Q_1}{q_e} = \\frac{0.10}{1.602 \\cdot 10^{-19}} = 6.24 \\cdot 10^{17}\\ \\text{electrons} \\approx 6.2 \\cdot 10^{17}\\ \\text{electrons} $$\n\n**Answer:** About $6.2 \\cdot 10^{17}$ electrons per second.\n\n**General conclusion:** The task links three relationships: the unit conversion $\\mathrm{Ah} \\to \\mathrm{C}$, the definition of current $I = Q/t$ and the electron count $n = Q/q_e$. The most common trap is to confuse the *total* charge (the whole discharge) with the charge *per second*."
   },
   {
    "level": 3,
    "question": "The diagram shows the current through a conductor as a function of time. Determine the total charge that has passed a cross-section during the first 10 seconds, and how many electrons that corresponds to. ($q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$)\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">I</tspan> (A)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text></g><path d=\"M 60.0 290.0 L 220.0 82.0 L 460.0 82.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 100000000000000000000,
     "unit": ""
    },
    "solution": "The current is *not* constant, so we cannot use $Q = I \\cdot t$ with a single value of the current. Since $I = \\dfrac{Q}{t}$, the charge corresponds to the **area under** the *I-t* graph, just as the distance is the area under a *v-t* graph.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/></g><path d=\"M 60.0 290.0 L 220.0 82.0 L 220.0 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><path d=\"M 220.0 290.0 L 220.0 82.0 L 460.0 82.0 L 460.0 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">I</tspan> (A)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text></g><path d=\"M 60.0 290.0 L 220.0 82.0 L 460.0 82.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\nWe divide the area into a triangle (0–4 s) and a rectangle (4–10 s):\n\n$$\n\\left[ \\begin{array}{l}\n\\text{Triangle: } \\dfrac{1}{2} \\cdot 4.0 \\cdot 2.0 = 4.0\\ \\mathrm{C} \\\\\n\\text{Rectangle: } 6.0 \\cdot 2.0 = 12\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\n$$ Q = 4.0 + 12 = 16\\ \\mathrm{C} $$\n\nThe number of electrons is then\n\n$$ n = \\frac{Q}{q_e} = \\frac{16}{1.602 \\cdot 10^{-19}} = 9.99 \\cdot 10^{19} \\approx 1.0 \\cdot 10^{20}\\ \\text{electrons} $$\n\n**Answer:** The charge is $16\\ \\mathrm{C}$, which corresponds to about $1.0 \\cdot 10^{20}$ electrons.\n\n**General conclusion:** The trap is to reach for $Q = I \\cdot t$, but with which *I*? When the current varies, the charge is the area under the graph. It is the same principle as distance = area under a *v-t* graph and $\\Delta v$ = area under an *a-t* graph."
   }
  ]
 },
 "fy1-7.4": {
  "kalla": "7fc5dc0d3f",
  "data": [
   {
    "level": 1,
    "question": "A charge $Q = 2.0\\ \\mathrm{C}$ is moved through the voltage $U = 12\\ \\mathrm{V}$. How much electrical energy is converted?",
    "answer": {
     "value": 24,
     "unit": "J"
    },
    "solution": "The relationship between voltage, energy and charge is $U = E/Q$. We solve for the energy *E*:\n\n$$ U = \\frac{E}{Q} \\quad\\Leftrightarrow\\quad E = Q \\cdot U $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ = 2.0\\ \\mathrm{C} \\\\\nU = 12\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ E = 2.0 \\cdot 12 = 24\\ \\mathrm{J} $$\n\n**Answer:** The energy converted is $24\\ \\mathrm{J}$."
   },
   {
    "level": 1,
    "question": "When the charge $Q = 0.50\\ \\mathrm{C}$ is moved between two points, the energy $E = 6.0\\ \\mathrm{J}$ is converted. How large is the voltage between the points?",
    "answer": {
     "value": 12,
     "unit": "V"
    },
    "solution": "Voltage is energy per charge:\n\n$$ U = \\frac{E}{Q} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nE = 6.0\\ \\mathrm{J} \\\\\nQ = 0.50\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U = \\frac{6.0}{0.50} = 12\\ \\mathrm{V} $$\n\n**Answer:** The voltage is $12\\ \\mathrm{V}$.\n\n**General conclusion:** Voltage can be interpreted as \"energy per coulomb\". $1\\ \\mathrm{V} = 1\\ \\mathrm{J/C}$: one volt means that each coulomb of charge carries one joule of energy."
   },
   {
    "level": 1,
    "question": "A charge is moved between the terminals of a $9.0\\ \\mathrm{V}$ battery and the energy $E = 4.5\\ \\mathrm{J}$ is converted. How large was the charge?",
    "answer": {
     "value": 0.5,
     "unit": "C"
    },
    "solution": "We solve for the charge *Q* from the relationship $U = E/Q$:\n\n$$ U = \\frac{E}{Q} \\quad\\Leftrightarrow\\quad Q = \\frac{E}{U} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nE = 4.5\\ \\mathrm{J} \\\\\nU = 9.0\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = \\frac{4.5}{9.0} = 0.50\\ \\mathrm{C} $$\n\n**Answer:** The charge was $0.50\\ \\mathrm{C}$."
   },
   {
    "level": 2,
    "question": "What speed does an electron get when it is accelerated from rest through the voltage $U = 200\\ \\mathrm{V}$? The mass of the electron is $m = 9.11 \\cdot 10^{-31}\\ \\mathrm{kg}$ and its charge $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 8400000,
     "unit": "m/s"
    },
    "solution": "The electrical energy the electron gains ($E = Q \\cdot U$) is converted entirely into kinetic energy ($E_k = m v^2 / 2$):\n\n$$ Q \\cdot U = \\frac{m \\cdot v^2}{2} $$\n\nWe solve for the speed *v*:\n\n$$ v = \\sqrt{\\frac{2 \\cdot Q \\cdot U}{m}} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nQ \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C} \\\\\nU = 200\\ \\mathrm{V} \\\\\nm \\approx 9.11 \\cdot 10^{-31}\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ v = \\sqrt{\\frac{2 \\cdot 1.602 \\cdot 10^{-19} \\cdot 200}{9.11 \\cdot 10^{-31}}} = 8.4 \\cdot 10^6\\ \\mathrm{m/s} $$\n\n**Answer:** The electron gets a speed of about $8.4 \\cdot 10^6\\ \\mathrm{m/s}$.\n\n**General conclusion:** Behind the task lies an energy conversion: electrical energy $\\to$ kinetic energy. Since the speed is squared, you have to take the square root at the end. Note how fast the electron becomes: several million metres per second already at a modest 200 V."
   },
   {
    "level": 2,
    "question": "An electron has been accelerated from rest to the speed $v = 3.0 \\cdot 10^6\\ \\mathrm{m/s}$. Through what voltage has it been accelerated? ($m = 9.11 \\cdot 10^{-31}\\ \\mathrm{kg}$, $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$)",
    "answer": {
     "value": 26,
     "unit": "V"
    },
    "solution": "We assume that the electrical energy has become kinetic energy and this time solve for the voltage *U*:\n\n$$ Q \\cdot U = \\frac{m \\cdot v^2}{2} \\quad\\Leftrightarrow\\quad U = \\frac{m \\cdot v^2}{2 \\cdot Q} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm \\approx 9.11 \\cdot 10^{-31}\\ \\mathrm{kg} \\\\\nv = 3.0 \\cdot 10^6\\ \\mathrm{m/s} \\\\\nQ \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U = \\frac{9.11 \\cdot 10^{-31} \\cdot (3.0 \\cdot 10^6)^2}{2 \\cdot 1.602 \\cdot 10^{-19}} = 25.6\\ \\mathrm{V} \\approx 26\\ \\mathrm{V} $$\n\n**Answer:** The electron has been accelerated through about $26\\ \\mathrm{V}$.\n\n**General conclusion:** This is the reverse of the previous task. Do not forget to square the *whole* speed including the power of ten: $(3.0 \\cdot 10^6)^2 = 9.0 \\cdot 10^{12}$."
   },
   {
    "level": 3,
    "question": "An electron and a proton are both accelerated from rest through **the same** voltage. How many times as fast as the proton does the electron become? The mass of the electron is $m_e = 9.11 \\cdot 10^{-31}\\ \\mathrm{kg}$ and that of the proton $m_p = 1.673 \\cdot 10^{-27}\\ \\mathrm{kg}$. (The particles have charges of equal size, but with opposite signs.)",
    "answer": {
     "value": 43,
     "unit": "times"
    },
    "solution": "Since the particles have equal charge *Q* and are accelerated through the same voltage *U*, they get **the same amount** of kinetic energy:\n\n$$ Q \\cdot U = \\frac{m \\cdot v^2}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{\\frac{2 \\cdot Q \\cdot U}{m}} $$\n\nSince $Q$ and $U$ are the same for both, the speed depends only on the mass: $v \\propto \\dfrac{1}{\\sqrt{m}}$. We form the ratio of the speed of the electron to that of the proton, and the common $2QU$ disappears:\n\n$$ \\frac{v_e}{v_p} = \\frac{\\sqrt{2QU / m_e}}{\\sqrt{2QU / m_p}} = \\sqrt{\\frac{m_p}{m_e}} $$\n\nSubstitution:\n\n$$ \\frac{v_e}{v_p} = \\sqrt{\\frac{1.673 \\cdot 10^{-27}}{9.11 \\cdot 10^{-31}}} = \\sqrt{1\\,836} = 42.8\\ldots \\approx 43 $$\n\n**Answer:** The electron becomes about $43$ times as fast as the proton.\n\n**General conclusion:** The same energy does not give the same speed: the light particle becomes much faster. The trick is to form the ratio *before* substituting values, so that the unknown voltage and charge cancel. Then no value of *U* is needed at all."
   }
  ]
 },
 "fy1-7.5": {
  "kalla": "64cb126b5d",
  "data": [
   {
    "level": 1,
    "question": "A current $I = 0.050\\ \\mathrm{A}$ flows through a resistor with resistance $R = 220\\ \\mathrm{\\Omega}$. How large is the voltage across the resistor?",
    "answer": {
     "value": 11,
     "unit": "V"
    },
    "solution": "We use **Ohm's law**:\n\n$$ U = R \\cdot I $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nR = 220\\ \\mathrm{\\Omega} \\\\\nI = 0.050\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U = 220 \\cdot 0.050 = 11\\ \\mathrm{V} $$\n\n**Answer:** The voltage is $11\\ \\mathrm{V}$."
   },
   {
    "level": 1,
    "question": "The voltage across a lamp is $U = 6.0\\ \\mathrm{V}$ and the current through it is $I = 0.40\\ \\mathrm{A}$. How large is the resistance of the lamp?",
    "answer": {
     "value": 15,
     "unit": "Ω"
    },
    "solution": "We solve for the resistance *R* from Ohm's law:\n\n$$ U = R \\cdot I \\quad\\Leftrightarrow\\quad R = \\frac{U}{I} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 6.0\\ \\mathrm{V} \\\\\nI = 0.40\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ R = \\frac{6.0}{0.40} = 15\\ \\mathrm{\\Omega} $$\n\n**Answer:** The resistance of the lamp is $15\\ \\mathrm{\\Omega}$."
   },
   {
    "level": 1,
    "question": "A resistor of $R = 50\\ \\mathrm{\\Omega}$ is connected to the voltage $U = 12\\ \\mathrm{V}$. How large is the current through the resistor?",
    "answer": {
     "value": 0.24,
     "unit": "A"
    },
    "solution": "We solve for the current *I* from Ohm's law:\n\n$$ U = R \\cdot I \\quad\\Leftrightarrow\\quad I = \\frac{U}{R} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 12\\ \\mathrm{V} \\\\\nR = 50\\ \\mathrm{\\Omega}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ I = \\frac{12}{50} = 0.24\\ \\mathrm{A} $$\n\n**Answer:** The current is $0.24\\ \\mathrm{A}$.\n\n**General conclusion:** Ohm's law can be rearranged in three ways: $U = R \\cdot I$, $R = U/I$ and $I = U/R$. Which form you need depends on what is asked for."
   },
   {
    "level": 2,
    "question": "A copper conductor is $25\\ \\mathrm{m}$ long and has the cross-sectional area $1.5\\ \\mathrm{mm^2}$. The resistivity of copper is $\\rho = 1.7 \\cdot 10^{-8}\\ \\mathrm{\\Omega \\cdot m}$. Determine the resistance of the conductor.",
    "answer": {
     "value": 0.28,
     "unit": "Ω"
    },
    "solution": "The resistance of a conductor depends on the resistivity, the length and the cross-sectional area:\n\n$$ R = \\rho \\cdot \\frac{l}{A} $$\n\nMeasured values (area converted to m²):\n$$\n\\left[ \\begin{array}{l}\n\\rho = 1.7 \\cdot 10^{-8}\\ \\mathrm{\\Omega \\cdot m} \\\\\nl = 25\\ \\mathrm{m} \\\\\nA = 1.5\\ \\mathrm{mm^2} = 1.5 \\cdot 10^{-6}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ R = 1.7 \\cdot 10^{-8} \\cdot \\frac{25}{1.5 \\cdot 10^{-6}} = 0.283\\ \\mathrm{\\Omega} \\approx 0.28\\ \\mathrm{\\Omega} $$\n\n**Answer:** The resistance of the conductor is about $0.28\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** The tricky conversion is the area: $1\\ \\mathrm{mm^2} = 10^{-6}\\ \\mathrm{m^2}$ (not $10^{-3}$!), since $\\mathrm{mm^2} = (10^{-3}\\ \\mathrm{m})^2 = 10^{-6}\\ \\mathrm{m^2}$. Copper has a low resistivity, which is why the resistance is small despite 25 metres of conductor."
   },
   {
    "level": 2,
    "question": "A $10\\ \\mathrm{m}$ long nichrome wire with the cross-sectional area $0.20\\ \\mathrm{mm^2}$ is connected to the voltage $1.5\\ \\mathrm{V}$. How large a current flows through the wire? The resistivity of nichrome is $\\rho = 1.1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}$.",
    "answer": {
     "value": 27,
     "unit": "mA"
    },
    "solution": "We first calculate the resistance of the wire:\n\n$$ R = \\rho \\cdot \\frac{l}{A} $$\n\n$$\n\\left[ \\begin{array}{l}\n\\rho = 1.1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m} \\\\\nl = 10\\ \\mathrm{m} \\\\\nA = 0.20\\ \\mathrm{mm^2} = 0.20 \\cdot 10^{-6}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$ R = 1.1 \\cdot 10^{-6} \\cdot \\frac{10}{0.20 \\cdot 10^{-6}} = 55\\ \\mathrm{\\Omega} $$\n\nThen Ohm's law gives the current:\n\n$$ I = \\frac{U}{R} = \\frac{1.5}{55} = 0.0273\\ \\mathrm{A} \\approx 27\\ \\mathrm{mA} $$\n\n**Answer:** The current is about $27\\ \\mathrm{mA}$ (or $0.027\\ \\mathrm{A}$).\n\n**General conclusion:** The task requires two formulas in a row: first $R = \\rho l / A$ to find the resistance of the wire, then Ohm's law for the current. Nichrome has a high resistivity, which is exactly why it is used in heating wires."
   },
   {
    "level": 2,
    "question": "A heating wire made of nichrome is to have the resistance $R = 24\\ \\mathrm{\\Omega}$. The wire has a circular cross-section with diameter $d = 0.40\\ \\mathrm{mm}$, and the resistivity of nichrome is $\\rho = 1.1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}$. How long must the wire be?",
    "answer": {
     "value": 2.7,
     "unit": "m"
    },
    "solution": "**Step 1: the cross-sectional area.** The wire is circular, so the area is found from the diameter through the radius $r = d/2$:\n\n$$ A = \\pi \\cdot r^2 = \\pi \\cdot \\left(\\frac{d}{2}\\right)^2 = \\pi \\cdot (0.20 \\cdot 10^{-3})^2 = 1.26 \\cdot 10^{-7}\\ \\mathrm{m^2} $$\n\n**Step 2: solve for the length.** We start from the formula for the resistance of a conductor and solve for *l*:\n\n$$ R = \\rho \\cdot \\frac{l}{A} \\quad\\Leftrightarrow\\quad l = \\frac{R \\cdot A}{\\rho} $$\n\n$$\n\\left[ \\begin{array}{l}\nR = 24\\ \\mathrm{\\Omega} \\\\\nA = 1.26 \\cdot 10^{-7}\\ \\mathrm{m^2} \\\\\n\\rho = 1.1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}\n\\end{array} \\right]\n$$\n\n$$ l = \\frac{24 \\cdot 1.26 \\cdot 10^{-7}}{1.1 \\cdot 10^{-6}} = 2.74\\ \\mathrm{m} \\approx 2.7\\ \\mathrm{m} $$\n\n**Answer:** The wire must be about $2.7\\ \\mathrm{m}$ long.\n\n**General conclusion:** There are two traps here. First, the area must be calculated from the *diameter* (halve it to get the radius first, then square). Second, $\\rho l / A = R$ has to be solved for *l*. The diameter $0.40\\ \\mathrm{mm}$ gives the radius $0.20\\ \\mathrm{mm} = 0.20 \\cdot 10^{-3}\\ \\mathrm{m}$."
   },
   {
    "level": 3,
    "question": "A metal wire has the resistance $R_0 = 5.0\\ \\mathrm{\\Omega}$. The wire is drawn out (stretched) to **three times** its original length. The volume of the material is unchanged. How large is the new resistance of the wire?",
    "answer": {
     "value": 45,
     "unit": "Ω"
    },
    "solution": "The naive guess \"three times longer → three times the resistance\" is **wrong**: it misses that the cross-sectional area changes when the wire is stretched.\n\nThe volume $V = A \\cdot l$ is constant. When the length is tripled ($l \\to 3l$), the area must shrink to a third ($A \\to A/3$) for the product $A \\cdot l$ to be unchanged.\n\nSubstitute into the formula for the resistance of a conductor:\n\n$$ R = \\rho \\cdot \\frac{l}{A} \\quad\\Rightarrow\\quad R_\\text{new} = \\rho \\cdot \\frac{3l}{A/3} = 9 \\cdot \\rho \\cdot \\frac{l}{A} = 9 R_0 $$\n\n$$ R_\\text{new} = 9 \\cdot 5.0 = 45\\ \\mathrm{\\Omega} $$\n\n**Answer:** The new resistance is $45\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** When a wire is stretched at constant volume, the resistance changes with the **square** of the length factor: $n$ times longer gives $n^2$ times the resistance. The increase in length and the decrease in area work together: both raise the resistance."
   }
  ]
 },
 "fy1-7.6": {
  "kalla": "3ffad22ec5",
  "data": [
   {
    "level": 1,
    "question": "What type of connection is shown in the diagram?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 324 198\" style=\"max-width:324px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"294\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"148\" x2=\"158\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"166\" y1=\"148\" x2=\"294\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"294\" y1=\"38\" x2=\"294\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"90\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"81.516\" y1=\"29.516\" x2=\"98.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"81.516\" y1=\"46.484\" x2=\"98.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"90\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₁</text><circle cx=\"162\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"153.516\" y1=\"29.516\" x2=\"170.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"153.516\" y1=\"46.484\" x2=\"170.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"162\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₂</text><circle cx=\"234\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"225.516\" y1=\"29.516\" x2=\"242.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"225.516\" y1=\"46.484\" x2=\"242.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"234\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₃</text><line x1=\"158\" y1=\"134\" x2=\"158\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"166\" y1=\"140\" x2=\"166\" y2=\"156\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"162\" y=\"182\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "choices": [
     "Series connection.",
     "Parallel connection.",
     "Complex circuit.",
     "Short circuit."
    ],
    "correct": 0,
    "solution": "All three lamps are in a row in the same wire: there is only **one path** for the current to take. That is the definition of a **series connection**.\n\n**Answer:** Option A: series connection.\n\n**General conclusion:** If any of the three lamps breaks, the whole circuit is broken and all three lamps go out. That is one of the important properties of a series connection, and one of the reasons why old Christmas tree lights were so frustrating: one broken bulb put out the whole string."
   },
   {
    "level": 1,
    "question": "In the diagram below you want to measure the current through the lamp. Where should the ammeter be connected?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 198\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"148\" x2=\"146\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"148\" x2=\"270\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"150\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"141.516\" y1=\"29.516\" x2=\"158.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"141.516\" y1=\"46.484\" x2=\"158.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"150\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₁</text><line x1=\"146\" y1=\"134\" x2=\"146\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"140\" x2=\"154\" y2=\"156\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"182\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "choices": [
     "In series with the lamp (in the same wire as the lamp).",
     "In parallel with the lamp (connected across the lamp).",
     "Directly across the battery's terminals.",
     "It makes no difference where in the circuit it is."
    ],
    "correct": 0,
    "solution": "An ammeter measures the current that flows **through** itself. To measure the current through the lamp, exactly that current must also pass through the ammeter, so it must be connected **in series** with the lamp:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 198\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"148\" x2=\"146\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"148\" x2=\"270\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"106.66666666666666\" cy=\"38\" r=\"13\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"106.66666666666666\" y=\"43\" font-size=\"15\" font-weight=\"600\" fill=\"#0f1620\" text-anchor=\"middle\">A</text><text x=\"106.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">A</text><circle cx=\"195.33333333333331\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"186.8493333333333\" y1=\"29.516\" x2=\"203.81733333333332\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"186.8493333333333\" y1=\"46.484\" x2=\"203.81733333333332\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"195.33333333333331\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₁</text><line x1=\"146\" y1=\"134\" x2=\"146\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"140\" x2=\"154\" y2=\"156\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"182\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>\n\nSo that the ammeter does not affect the current in the circuit, it should have a **low resistance**.\n\n**Answer:** Option A: in series with the lamp.\n\n**General conclusion:** The voltmeter and the ammeter are mirror images: the ammeter is connected in series and should have a low resistance, the voltmeter in parallel and should have a high resistance. Both meters are designed to disturb the circuit as little as possible."
   },
   {
    "level": 1,
    "question": "Three lamps are connected in series to a battery with voltage $U = 9.0\\ \\mathrm{V}$. Across lamp 1 you measure the voltage $U_1 = 2.5\\ \\mathrm{V}$ and across lamp 2 the voltage $U_2 = 3.0\\ \\mathrm{V}$. How large is the voltage $U_3$ across lamp 3?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 324 198\" style=\"max-width:324px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"294\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"148\" x2=\"158\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"166\" y1=\"148\" x2=\"294\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"294\" y1=\"38\" x2=\"294\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"90\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"81.516\" y1=\"29.516\" x2=\"98.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"81.516\" y1=\"46.484\" x2=\"98.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"90\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₁</text><circle cx=\"162\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"153.516\" y1=\"29.516\" x2=\"170.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"153.516\" y1=\"46.484\" x2=\"170.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"162\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₂</text><circle cx=\"234\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"225.516\" y1=\"29.516\" x2=\"242.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"225.516\" y1=\"46.484\" x2=\"242.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"234\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₃</text><line x1=\"158\" y1=\"134\" x2=\"158\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"166\" y1=\"140\" x2=\"166\" y2=\"156\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"162\" y=\"182\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 9.0 V</text></svg>",
    "answer": {
     "value": 3.5,
     "unit": "V"
    },
    "solution": "In a series connection the battery voltage is shared between the lamps:\n\n$$ U = U_1 + U_2 + U_3 $$\n\nSolve for $U_3$:\n\n$$ U_3 = U - U_1 - U_2 $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 9.0\\ \\mathrm{V} \\\\\nU_1 = 2.5\\ \\mathrm{V} \\\\\nU_2 = 3.0\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U_3 = 9.0 - 2.5 - 3.0 = 3.5\\ \\mathrm{V} $$\n\n**Answer:** $U_3 = 3.5\\ \\mathrm{V}$."
   },
   {
    "level": 2,
    "question": "In the circuit below the current from the battery splits into two parallel branches with the resistors $R_1$ and $R_2$. The current through $R_1$ is $I_1 = 0.40\\ \\mathrm{A}$ and the current through $R_2$ is $I_2 = 0.30\\ \\mathrm{A}$. How large is the current $I_3$ through $R_3$?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 204\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"146\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"154\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"59.33333333333333\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"79.33333333333333\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃</text><rect x=\"164.66666666666666\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁</text><line x1=\"128.66666666666666\" y1=\"38\" x2=\"128.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"240.66666666666666\" y1=\"38\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"128.66666666666666\" y1=\"96\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"128.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"240.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"164.66666666666666\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂</text><line x1=\"146\" y1=\"140\" x2=\"146\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"146\" x2=\"154\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "answer": {
     "value": 0.7,
     "unit": "A"
    },
    "solution": "At a junction, **Kirchhoff's first law** applies: the sum of the currents going into a point equals the sum of the currents going out.\n\nAt the left node the currents $I_1$ and $I_2$ from the branches join and continue as $I_3$ through $R_3$:\n\n$$ I_3 = I_1 + I_2 $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nI_1 = 0.40\\ \\mathrm{A} \\\\\nI_2 = 0.30\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ I_3 = 0.40 + 0.30 = 0.70\\ \\mathrm{A} $$\n\n**Answer:** $I_3 = 0.70\\ \\mathrm{A}$.\n\n**General conclusion:** Since $R_3$ is in series with the whole parallel section, **all** the current from the battery passes through $R_3$. It is the same current that the battery delivers: Kirchhoff's first law is just a way of expressing that charge cannot disappear or be created at a junction."
   },
   {
    "level": 2,
    "question": "In the circuit below three lamps are connected in parallel to a battery. What happens to lamp 1 and lamp 2 if lamp 3 breaks?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 156 262\" style=\"max-width:156px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"126\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"212\" x2=\"74\" y2=\"212\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"82\" y1=\"212\" x2=\"126\" y2=\"212\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"212\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"126\" y1=\"38\" x2=\"126\" y2=\"212\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"78\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"29.516\" x2=\"86.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"46.484\" x2=\"86.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"78\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₁</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"126\" y1=\"38\" x2=\"126\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"96\" x2=\"126\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"30\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"126\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"78\" cy=\"96\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"87.516\" x2=\"86.484\" y2=\"104.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"104.484\" x2=\"86.484\" y2=\"87.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"78\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₂</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"126\" y1=\"38\" x2=\"126\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"126\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"78\" cy=\"154\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"145.516\" x2=\"86.484\" y2=\"162.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"162.484\" x2=\"86.484\" y2=\"145.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"78\" y=\"180\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₃</text><line x1=\"74\" y1=\"198\" x2=\"74\" y2=\"226\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"82\" y1=\"204\" x2=\"82\" y2=\"220\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"78\" y=\"246\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "choices": [
     "They go out too, because the whole circuit is broken.",
     "They shine more dimly, because the current from the battery decreases.",
     "They shine more brightly, because the current that went through lamp 3 is redistributed.",
     "They shine unchanged, because they are still connected directly to the battery."
    ],
    "correct": 3,
    "solution": "Each branch in a parallel connection is **connected directly** between the terminals of the battery. The voltage across each lamp is therefore the same as the battery voltage *U*, regardless of what happens in the other branches.\n\nWhen lamp 3 breaks, only the wire in that branch is broken. The voltage and resistance of lamps 1 and 2 are unchanged, so according to Ohm's law the current through them is also unchanged: they **shine exactly as before**.\n\n**Answer:** Option D: they shine unchanged.\n\n**General conclusion:** This is the fundamental difference from a series connection, where one broken lamp puts out the whole circuit. The sockets in a home are connected in parallel for exactly this reason: if one lamp breaks, the lighting in the whole room should not go out. The total current from the battery does decrease, however, since one branch has disappeared."
   },
   {
    "level": 3,
    "question": "Four identical lamps are connected as in the diagram: lamp 1 is alone in the upper branch, and lamps 2, 3 and 4 are in series in the lower branch. Both branches are connected directly between the terminals of the battery.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 276 204\" style=\"max-width:276px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"246\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"134\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"154\" x2=\"246\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"246\" y1=\"38\" x2=\"246\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"138\" cy=\"38\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"129.516\" y1=\"29.516\" x2=\"146.484\" y2=\"46.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"129.516\" y1=\"46.484\" x2=\"146.484\" y2=\"29.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"138\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₁</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"246\" y1=\"38\" x2=\"246\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"96\" x2=\"246\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"30\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"246\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"78\" cy=\"96\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"87.516\" x2=\"86.484\" y2=\"104.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"69.516\" y1=\"104.484\" x2=\"86.484\" y2=\"87.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"78\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₂</text><circle cx=\"138\" cy=\"96\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"129.516\" y1=\"87.516\" x2=\"146.484\" y2=\"104.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"129.516\" y1=\"104.484\" x2=\"146.484\" y2=\"87.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"138\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₃</text><circle cx=\"198\" cy=\"96\" r=\"12\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"189.516\" y1=\"87.516\" x2=\"206.484\" y2=\"104.484\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"189.516\" y1=\"104.484\" x2=\"206.484\" y2=\"87.516\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"198\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">L₄</text><line x1=\"134\" y1=\"140\" x2=\"134\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"142\" y1=\"146\" x2=\"142\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"138\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>\n\n**a)** Which lamp or lamps shine brightest?\n\n**b)** Which lamp or lamps shine most dimly?\n\n**c)** Lamp 3 breaks. What happens to lamp 1?",
    "solution": "**a)** The lamps are identical: each lamp has the same resistance *R*. Since the two branches are in parallel, the same voltage *U* is across both of them.\n\nThe upper branch has only lamp 1: total resistance *R*, current $I_1 = U/R$.\n\nThe lower branch has three lamps in series: total resistance $3R$, current $I_{2{-}4} = U/(3R) = I_1/3$.\n\nSo lamp 1 gets a current three times as large as lamps 2, 3 and 4. Since identical lamps shine more brightly the larger the current they get, **lamp 1 shines brightest**.\n\n**Answer a):** Lamp 1.\n\n**b)** Lamps 2, 3 and 4 are in the same branch and have the same current: they shine equally brightly. That current is a third of the current in lamp 1, so together they shine **most dimly**.\n\n**Answer b):** Lamps 2, 3 and 4 (all equally dimly).\n\n**c)** When lamp 3 breaks, the whole lower branch is broken: no current can flow through lamps 2, 3 and 4 any more. The upper branch is not affected: lamp 1 is still connected directly between the terminals of the battery and gets the same voltage as before. The current through lamp 1 is therefore unchanged, and **lamp 1 shines exactly as before**.\n\n**Answer c):** Lamp 1 shines unchanged.\n\n**General conclusion:** Parallel branches are independent of each other: what happens in one branch does not affect the voltage across the others. If a branch is broken, only that branch's contribution to the total current disappears, but the other branches continue as if nothing had happened. This is why parallel connection is so common in electrical networks: you do not want a broken component to affect the rest."
   }
  ]
 },
 "fy1-7.7": {
  "kalla": "b3bac13e1a",
  "data": [
   {
    "level": 1,
    "question": "Three resistors are connected in series as in the diagram. Determine the equivalent resistance $R_\\mathrm{tot}$ of the circuit.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 324 198\" style=\"max-width:324px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"294\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"148\" x2=\"158\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"166\" y1=\"148\" x2=\"294\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"294\" y1=\"38\" x2=\"294\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"66\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 10 Ω</text><rect x=\"142\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"162\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 15 Ω</text><rect x=\"218\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"238\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 25 Ω</text><line x1=\"158\" y1=\"134\" x2=\"158\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"166\" y1=\"140\" x2=\"166\" y2=\"156\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"162\" y=\"182\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "answer": {
     "value": 50,
     "unit": "Ω"
    },
    "solution": "In a **series connection** the equivalent resistance is the sum of the individual resistances:\n\n$$ R_\\mathrm{tot} = R_1 + R_2 + R_3 $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nR_1 = 10\\ \\mathrm{\\Omega} \\\\\nR_2 = 15\\ \\mathrm{\\Omega} \\\\\nR_3 = 25\\ \\mathrm{\\Omega}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ R_\\mathrm{tot} = 10 + 15 + 25 = 50\\ \\mathrm{\\Omega} $$\n\n**Answer:** The equivalent resistance is $50\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** In a series connection the total resistance is always *larger* than the largest individual resistor: the current is forced through all of them one after the other."
   },
   {
    "level": 1,
    "question": "Two resistors of $12\\ \\mathrm{\\Omega}$ each are connected in parallel as in the diagram. Determine the equivalent resistance.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 172 204\" style=\"max-width:172px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"142\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"82\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"90\" y1=\"154\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"66\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 12 Ω</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"96\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"30\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"142\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"66\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 12 Ω</text><line x1=\"82\" y1=\"140\" x2=\"82\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"90\" y1=\"146\" x2=\"90\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"86\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "answer": {
     "value": 6,
     "unit": "Ω"
    },
    "solution": "In a **parallel connection**, the inverse of the equivalent resistance is the sum of the inverses:\n\n$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{12} + \\frac{1}{12} = \\frac{2}{12} = \\frac{1}{6} $$\n\n$$ R_\\mathrm{tot} = 6.0\\ \\mathrm{\\Omega} $$\n\n**Answer:** The equivalent resistance is $6.0\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** Two *equal* resistors in parallel always give half the resistance. In a parallel connection the total resistance is always *smaller* than the smallest branch: the current has more paths to choose from."
   },
   {
    "level": 1,
    "question": "A $20\\ \\mathrm{\\Omega}$ resistor and a $60\\ \\mathrm{\\Omega}$ resistor are connected in parallel as in the diagram. Determine the equivalent resistance.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 172 204\" style=\"max-width:172px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"142\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"82\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"90\" y1=\"154\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"66\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 20 Ω</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"96\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"30\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"142\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"66\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 60 Ω</text><line x1=\"82\" y1=\"140\" x2=\"82\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"90\" y1=\"146\" x2=\"90\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"86\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "answer": {
     "value": 15,
     "unit": "Ω"
    },
    "solution": "We use the formula for a parallel connection:\n\n$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{20} + \\frac{1}{60} $$\n\nWe use a common denominator (60):\n\n$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{3}{60} + \\frac{1}{60} = \\frac{4}{60} = \\frac{1}{15} $$\n\n$$ R_\\mathrm{tot} = 15\\ \\mathrm{\\Omega} $$\n\n**Answer:** The equivalent resistance is $15\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** Do not forget the last step: the formula gives $1/R_\\mathrm{tot}$, so you have to invert at the end to get $R_\\mathrm{tot}$. A common mistake is to answer $1/15\\ \\mathrm{\\Omega}$."
   },
   {
    "level": 2,
    "question": "An unknown resistor is connected in parallel with a $30\\ \\mathrm{\\Omega}$ resistor. Together they give the equivalent resistance $12\\ \\mathrm{\\Omega}$. How large is the unknown resistor?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 172 204\" style=\"max-width:172px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"142\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"82\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"90\" y1=\"154\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"66\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 30 Ω</text><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"142\" y1=\"38\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"96\" x2=\"142\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"30\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"142\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"66\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"86\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = ?</text><line x1=\"82\" y1=\"140\" x2=\"82\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"90\" y1=\"146\" x2=\"90\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"86\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan></text></svg>",
    "answer": {
     "value": 20,
     "unit": "Ω"
    },
    "solution": "We start from the formula for a parallel connection and solve for the unknown term $1/R_2$:\n\n$$ \\frac{1}{R_\\mathrm{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\quad\\Leftrightarrow\\quad \\frac{1}{R_2} = \\frac{1}{R_\\mathrm{tot}} - \\frac{1}{R_1} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nR_\\mathrm{tot} = 12\\ \\mathrm{\\Omega} \\\\\nR_1 = 30\\ \\mathrm{\\Omega}\n\\end{array} \\right]\n$$\n\nSubstitution (common denominator 60):\n\n$$ \\frac{1}{R_2} = \\frac{1}{12} - \\frac{1}{30} = \\frac{5}{60} - \\frac{2}{60} = \\frac{3}{60} = \\frac{1}{20} $$\n\n$$ R_2 = 20\\ \\mathrm{\\Omega} $$\n\n**Answer:** The unknown resistor is $20\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** Since the total resistance ($12\\ \\mathrm{\\Omega}$) must be smaller than each individual branch, we can conclude straight away that the unknown resistor is larger than $12\\ \\mathrm{\\Omega}$: a good reasonableness check."
   },
   {
    "level": 2,
    "question": "Two resistors $R_1 = 15\\ \\mathrm{\\Omega}$ and $R_2 = 45\\ \\mathrm{\\Omega}$ are connected in series to a battery with voltage $U = 12\\ \\mathrm{V}$. How large is the current out of the battery?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 198\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"148\" x2=\"146\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"148\" x2=\"270\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"148\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"83.33333333333334\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"103.33333333333334\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 15 Ω</text><rect x=\"176.66666666666669\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"196.66666666666669\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 45 Ω</text><line x1=\"146\" y1=\"134\" x2=\"146\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"140\" x2=\"154\" y2=\"156\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"182\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 12 V</text></svg>",
    "answer": {
     "value": 0.2,
     "unit": "A"
    },
    "solution": "We first calculate the equivalent resistance of the circuit. The resistors are in series:\n\n$$ R_\\mathrm{tot} = R_1 + R_2 = 15 + 45 = 60\\ \\mathrm{\\Omega} $$\n\nThe current out of the battery is then found from Ohm's law:\n\n$$ I = \\frac{U}{R_\\mathrm{tot}} = \\frac{12}{60} = 0.20\\ \\mathrm{A} $$\n\n**Answer:** The current out of the battery is $0.20\\ \\mathrm{A}$.\n\n**General conclusion:** Two steps: first determine the total resistance, then use Ohm's law on the *whole* circuit. In a series connection this current is also the same through both resistors."
   },
   {
    "level": 3,
    "question": "Two resistors together give the equivalent resistance $40\\ \\mathrm{\\Omega}$ when connected in series, but only $7.5\\ \\mathrm{\\Omega}$ when connected in parallel. How large are the two resistances?",
    "solution": "We call the resistances $R_1$ and $R_2$ and set up a system of equations from the two conditions.\n\n**Series connection:**\n$$ R_1 + R_2 = 40 \\qquad (1) $$\n\n**Parallel connection:** with the formula $\\dfrac{1}{R_\\mathrm{tot}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} = \\dfrac{R_1 + R_2}{R_1 \\cdot R_2}$ we get $R_\\mathrm{tot} = \\dfrac{R_1 \\cdot R_2}{R_1 + R_2}$, so\n\n$$ \\frac{R_1 \\cdot R_2}{R_1 + R_2} = 7.5 $$\n\nSubstitute $R_1 + R_2 = 40$ from (1):\n\n$$ \\frac{R_1 \\cdot R_2}{40} = 7.5 \\quad\\Leftrightarrow\\quad R_1 \\cdot R_2 = 300 \\qquad (2) $$\n\nWe now have the sum ($40$) and the product ($300$) of the two numbers. They are roots of the quadratic equation\n\n$$ x^2 - 40x + 300 = 0 $$\n\n$$ x = \\frac{40 \\pm \\sqrt{40^2 - 4 \\cdot 300}}{2} = \\frac{40 \\pm \\sqrt{400}}{2} = \\frac{40 \\pm 20}{2} $$\n\nwhich gives $x = 30$ or $x = 10$.\n\n**Answer:** The resistances are $10\\ \\mathrm{\\Omega}$ and $30\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** When you know the *sum* and the *product* of two numbers, they are always the roots of $x^2 - (\\text{sum})x + (\\text{product}) = 0$. Check: $10 + 30 = 40$ ✓ and $\\dfrac{10 \\cdot 30}{40} = \\dfrac{300}{40} = 7.5$ ✓."
   }
  ]
 },
 "fy1-7.8": {
  "kalla": "ee3fbcf052",
  "data": [
   {
    "level": 1,
    "question": "Study the circuit diagram. Which resistors are connected in parallel?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 204\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"146\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"154\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"59.33333333333333\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"79.33333333333333\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 4.0 Ω</text><rect x=\"164.66666666666666\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 12 Ω</text><line x1=\"128.66666666666666\" y1=\"38\" x2=\"128.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"240.66666666666666\" y1=\"38\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"128.66666666666666\" y1=\"96\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"128.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"240.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"164.66666666666666\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 6.0 Ω</text><line x1=\"146\" y1=\"140\" x2=\"146\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"146\" x2=\"154\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 24 V</text></svg>",
    "choices": [
     "$R_1$ and $R_2$.",
     "$R_2$ and $R_3$.",
     "$R_1$, $R_2$ and $R_3$: all three.",
     "None are in parallel; all are in series."
    ],
    "correct": 1,
    "solution": "$R_2$ and $R_3$ are in two separate branches between the same two junctions: the current can choose a path through one *or* the other. That is the definition of a **parallel connection**.\n\n$R_1$, on the other hand, is alone on the main wire *before* the junction, so it is in **series** with the whole parallel section.\n\n**Answer:** Option B: $R_2$ and $R_3$.\n\n**General conclusion:** The trick is to find the junctions (nodes). Components between the *same* pair of nodes are in parallel; components that the current has to pass one after the other are in series."
   },
   {
    "level": 1,
    "question": "In the diagram below, $R_2 = 12\\ \\mathrm{\\Omega}$ and $R_3 = 6.0\\ \\mathrm{\\Omega}$ are connected in parallel. Determine the equivalent resistance $R_{2,3}$ of the parallel section alone.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 204\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"146\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"154\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"59.33333333333333\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"79.33333333333333\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 4.0 Ω</text><rect x=\"164.66666666666666\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 12 Ω</text><line x1=\"128.66666666666666\" y1=\"38\" x2=\"128.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"240.66666666666666\" y1=\"38\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"128.66666666666666\" y1=\"96\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"128.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"240.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"164.66666666666666\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 6.0 Ω</text><line x1=\"146\" y1=\"140\" x2=\"146\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"146\" x2=\"154\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 24 V</text></svg>",
    "answer": {
     "value": 4,
     "unit": "Ω"
    },
    "solution": "We use the formula for a parallel connection on $R_2$ and $R_3$:\n\n$$ \\frac{1}{R_{2,3}} = \\frac{1}{R_2} + \\frac{1}{R_3} = \\frac{1}{12} + \\frac{1}{6.0} = \\frac{1}{12} + \\frac{2}{12} = \\frac{3}{12} = \\frac{1}{4} $$\n\n$$ R_{2,3} = 4.0\\ \\mathrm{\\Omega} $$\n\n**Answer:** The equivalent resistance of the parallel section is $4.0\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** In complex circuits you always start by \"lumping together\" the parallel sections into a single equivalent resistance. Then the circuit can be treated as a simple series connection."
   },
   {
    "level": 1,
    "question": "In the same circuit, the parallel section ($R_2$ and $R_3$) has the equivalent resistance $4.0\\ \\mathrm{\\Omega}$, and it is in series with $R_1 = 4.0\\ \\mathrm{\\Omega}$. Determine the total resistance $R_\\mathrm{tot}$ of the circuit.",
    "answer": {
     "value": 8,
     "unit": "Ω"
    },
    "solution": "The parallel section can now be replaced by a single resistor of $4.0\\ \\mathrm{\\Omega}$, which is in **series** with $R_1$. Resistances in series are added:\n\n$$ R_\\mathrm{tot} = R_1 + R_{2,3} = 4.0 + 4.0 = 8.0\\ \\mathrm{\\Omega} $$\n\n**Answer:** The total resistance of the circuit is $8.0\\ \\mathrm{\\Omega}$.\n\n**General conclusion:** Once the parallel section has been lumped together, the whole circuit becomes a pure series connection: $R_1$ in series with the equivalent resistance."
   },
   {
    "level": 2,
    "question": "Determine the main current *I* out of the battery in the circuit below.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 204\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"146\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"154\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"59.33333333333333\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"79.33333333333333\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 4.0 Ω</text><rect x=\"164.66666666666666\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 12 Ω</text><line x1=\"128.66666666666666\" y1=\"38\" x2=\"128.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"240.66666666666666\" y1=\"38\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"128.66666666666666\" y1=\"96\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"128.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"240.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"164.66666666666666\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 6.0 Ω</text><line x1=\"146\" y1=\"140\" x2=\"146\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"146\" x2=\"154\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 24 V</text></svg>",
    "answer": {
     "value": 3,
     "unit": "A"
    },
    "solution": "**Step 1: the parallel section.** Lump together $R_2$ and $R_3$:\n\n$$ \\frac{1}{R_{2,3}} = \\frac{1}{12} + \\frac{1}{6.0} = \\frac{3}{12} \\quad\\Rightarrow\\quad R_{2,3} = 4.0\\ \\mathrm{\\Omega} $$\n\n**Step 2: the total resistance.** It is in series with $R_1$:\n\n$$ R_\\mathrm{tot} = R_1 + R_{2,3} = 4.0 + 4.0 = 8.0\\ \\mathrm{\\Omega} $$\n\n**Step 3: Ohm's law on the whole circuit.**\n\n$$ I = \\frac{U}{R_\\mathrm{tot}} = \\frac{24}{8.0} = 3.0\\ \\mathrm{A} $$\n\n**Answer:** The main current is $3.0\\ \\mathrm{A}$.\n\n**General conclusion:** The main current is the whole current that flows through $R_1$; it then splits between $R_2$ and $R_3$ at the junction."
   },
   {
    "level": 2,
    "question": "In the circuit below the main current is $I = 3.0\\ \\mathrm{A}$ (through $R_1$). Determine the voltage $U_{2,3}$ across the parallel section.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 204\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"146\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"154\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"59.33333333333333\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"79.33333333333333\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 4.0 Ω</text><rect x=\"164.66666666666666\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 12 Ω</text><line x1=\"128.66666666666666\" y1=\"38\" x2=\"128.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"240.66666666666666\" y1=\"38\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"128.66666666666666\" y1=\"96\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"128.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"240.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"164.66666666666666\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 6.0 Ω</text><line x1=\"146\" y1=\"140\" x2=\"146\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"146\" x2=\"154\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 24 V</text></svg>",
    "answer": {
     "value": 12,
     "unit": "V"
    },
    "solution": "The battery voltage is shared between $R_1$ and the parallel section. We first calculate the voltage across $R_1$ with Ohm's law (the whole main current flows through $R_1$):\n\n$$ U_1 = R_1 \\cdot I = 4.0 \\cdot 3.0 = 12\\ \\mathrm{V} $$\n\nThe rest of the battery voltage is across the parallel section:\n\n$$ U_{2,3} = U - U_1 = 24 - 12 = 12\\ \\mathrm{V} $$\n\n**Answer:** The voltage across the parallel section is $12\\ \\mathrm{V}$.\n\n**General conclusion:** The voltage is \"used up\" along the way. What does not drop across $R_1$ remains across the parallel section. This voltage is also across *both* $R_2$ and $R_3$, since components in parallel have the same voltage."
   },
   {
    "level": 2,
    "question": "Determine the current $I_3$ through the resistor $R_3$ in the circuit below.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 204\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30\" y1=\"38\" x2=\"270\" y2=\"38\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"154\" x2=\"146\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"154\" y1=\"154\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"30\" y1=\"38\" x2=\"30\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"270\" y1=\"38\" x2=\"270\" y2=\"154\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"59.33333333333333\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"79.33333333333333\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 4.0 Ω</text><rect x=\"164.66666666666666\" y=\"30\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"22\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 12 Ω</text><line x1=\"128.66666666666666\" y1=\"38\" x2=\"128.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"240.66666666666666\" y1=\"38\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"128.66666666666666\" y1=\"96\" x2=\"240.66666666666666\" y2=\"96\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"128.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"240.66666666666666\" cy=\"38\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"164.66666666666666\" y=\"88\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"184.66666666666666\" y=\"122\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 6.0 Ω</text><line x1=\"146\" y1=\"140\" x2=\"146\" y2=\"168\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"154\" y1=\"146\" x2=\"154\" y2=\"162\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"150\" y=\"188\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 24 V</text></svg>",
    "answer": {
     "value": 2,
     "unit": "A"
    },
    "solution": "We need to work our way to the voltage across $R_3$ before we can find its current.\n\n**Step 1: the total resistance.** The parallel section: $\\dfrac{1}{R_{2,3}} = \\dfrac{1}{12} + \\dfrac{1}{6.0} = \\dfrac{3}{12}$, so $R_{2,3} = 4.0\\ \\mathrm{\\Omega}$. In series with $R_1$:\n\n$$ R_\\mathrm{tot} = 4.0 + 4.0 = 8.0\\ \\mathrm{\\Omega} $$\n\n**Step 2: the main current.**\n\n$$ I = \\frac{U}{R_\\mathrm{tot}} = \\frac{24}{8.0} = 3.0\\ \\mathrm{A} $$\n\n**Step 3: the voltage across the parallel section.**\n\n$$ U_{2,3} = U - R_1 \\cdot I = 24 - 4.0 \\cdot 3.0 = 12\\ \\mathrm{V} $$\n\n**Step 4: the current through $R_3$.** This voltage is across $R_3$, so Ohm's law gives\n\n$$ I_3 = \\frac{U_{2,3}}{R_3} = \\frac{12}{6.0} = 2.0\\ \\mathrm{A} $$\n\n**Answer:** The current through $R_3$ is $2.0\\ \\mathrm{A}$.\n\n**General conclusion:** Check with Kirchhoff's first law: $I_2 = U_{2,3}/R_2 = 12/12 = 1.0\\ \\mathrm{A}$, and $I_2 + I_3 = 1.0 + 2.0 = 3.0\\ \\mathrm{A} = I$ ✓. The smaller resistor ($R_3$) draws the larger current: the current prefers the \"easiest\" path."
   },
   {
    "level": 3,
    "question": "In the bridge circuit below the voltage across the circuit is $U = 12\\ \\mathrm{V}$. A voltmeter is connected between the points P and Q. What voltage does the voltmeter show?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 218\" style=\"max-width:330px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"46\" y1=\"42\" x2=\"46\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"284\" y1=\"42\" x2=\"284\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"46\" y1=\"42\" x2=\"161\" y2=\"42\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"169\" y1=\"42\" x2=\"284\" y2=\"42\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"161\" y1=\"28\" x2=\"161\" y2=\"56\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"169\" y1=\"34\" x2=\"169\" y2=\"50\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"165\" y=\"26\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 12 V</text><line x1=\"46\" y1=\"110\" x2=\"284\" y2=\"110\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"46\" y1=\"178\" x2=\"284\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"85.5\" y=\"102\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"105.5\" y=\"95\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 50 Ω</text><rect x=\"204.5\" y=\"102\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"224.5\" y=\"95\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 30 Ω</text><rect x=\"85.5\" y=\"170\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"105.5\" y=\"204\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 15 Ω</text><rect x=\"204.5\" y=\"170\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"224.5\" y=\"204\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₄ = 60 Ω</text><line x1=\"165\" y1=\"110\" x2=\"165\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><circle cx=\"165\" cy=\"144\" r=\"13\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"165\" y=\"149\" font-size=\"15\" font-weight=\"600\" fill=\"#0f1620\" text-anchor=\"middle\">V</text><text x=\"187\" y=\"149\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"start\">V</text><circle cx=\"165\" cy=\"110\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"165\" cy=\"178\" r=\"2.6\" fill=\"#0f1620\"/><text x=\"154\" y=\"101\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"end\">P</text><text x=\"154\" y=\"196\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"end\">Q</text></svg>",
    "answer": {
     "value": 5.1,
     "unit": "V"
    },
    "solution": "An ideal voltmeter lets no current through, so the two branches act as *independent voltage dividers*. The circuit **cannot** be simplified with ordinary series/parallel rules: we have to determine the potential at P and Q separately.\n\n**Upper branch** ($R_1$ and $R_2$ in series):\n$$ I_\\text{upper} = \\frac{U}{R_1 + R_2} = \\frac{12}{50 + 30} = 0.15\\ \\mathrm{A} $$\nThe voltage across $R_2$ (from P to the right-hand node) is $U_{R_2} = 0.15 \\cdot 30 = 4.5\\ \\mathrm{V}$. So P is $4.5\\ \\mathrm{V}$ above the right-hand node.\n\n**Lower branch** ($R_3$ and $R_4$ in series):\n$$ I_\\text{lower} = \\frac{U}{R_3 + R_4} = \\frac{12}{15 + 60} = 0.16\\ \\mathrm{A} $$\nThe voltage across $R_4$ (from Q to the right-hand node) is $U_{R_4} = 0.16 \\cdot 60 = 9.6\\ \\mathrm{V}$. Q is $9.6\\ \\mathrm{V}$ above the right-hand node.\n\n**The voltage between P and Q** is the difference between their levels above the common right-hand node:\n\n$$ U_{PQ} = |4.5 - 9.6| = 5.1\\ \\mathrm{V} $$\n\n**Answer:** The voltmeter shows $5.1\\ \\mathrm{V}$.\n\n**General conclusion:** This is a **bridge circuit**. The trap is to try to lump the resistors together in series/parallel, which does not work because P and Q are not the same point. Instead, treat the branches as two separate voltage dividers and compare the potentials at their midpoints."
   }
  ]
 },
 "fy1-7.9": {
  "kalla": "04aaebd1b1",
  "data": [
   {
    "level": 1,
    "question": "An appliance draws the current $I = 2.0\\ \\mathrm{A}$ at the voltage $U = 230\\ \\mathrm{V}$. What electric power does the appliance have?",
    "answer": {
     "value": 460,
     "unit": "W"
    },
    "solution": "The power is found from the relationship\n\n$$ P = U \\cdot I $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 230\\ \\mathrm{V} \\\\\nI = 2.0\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ P = 230 \\cdot 2.0 = 460\\ \\mathrm{W} $$\n\n**Answer:** The power is $460\\ \\mathrm{W}$."
   },
   {
    "level": 1,
    "question": "A resistor of $R = 6.0\\ \\mathrm{\\Omega}$ is connected to the voltage $U = 12\\ \\mathrm{V}$. What power is developed in the resistor?",
    "answer": {
     "value": 24,
     "unit": "W"
    },
    "solution": "Here we know the voltage *U* and the resistance *R*, so we choose the power formula with exactly these quantities:\n\n$$ P = \\frac{U^2}{R} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 12\\ \\mathrm{V} \\\\\nR = 6.0\\ \\mathrm{\\Omega}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ P = \\frac{12^2}{6.0} = \\frac{144}{6.0} = 24\\ \\mathrm{W} $$\n\n**Answer:** The power is $24\\ \\mathrm{W}$.\n\n**General conclusion:** There are three power formulas: $P = U \\cdot I$, $P = R \\cdot I^2$ and $P = U^2/R$. Choose the one that fits the quantities you *have*, and you avoid calculating intermediate steps."
   },
   {
    "level": 1,
    "question": "A current $I = 0.50\\ \\mathrm{A}$ flows through a resistor of $R = 8.0\\ \\mathrm{\\Omega}$. What power is developed in the resistor?",
    "answer": {
     "value": 2,
     "unit": "W"
    },
    "solution": "Here we know the resistance *R* and the current *I*, so we use the power formula with these:\n\n$$ P = R \\cdot I^2 $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nR = 8.0\\ \\mathrm{\\Omega} \\\\\nI = 0.50\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ P = 8.0 \\cdot 0.50^2 = 8.0 \\cdot 0.25 = 2.0\\ \\mathrm{W} $$\n\n**Answer:** The power is $2.0\\ \\mathrm{W}$.\n\n**General conclusion:** Do not forget that the current is to be squared: $0.50^2 = 0.25$, not $0.50$. It is a common mistake."
   },
   {
    "level": 2,
    "question": "An incandescent bulb is marked $60\\ \\mathrm{W}$ and is connected to the voltage $230\\ \\mathrm{V}$. How large a current does the bulb draw?",
    "answer": {
     "value": 0.26,
     "unit": "A"
    },
    "solution": "We solve for the current *I* from the power formula:\n\n$$ P = U \\cdot I \\quad\\Leftrightarrow\\quad I = \\frac{P}{U} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nP = 60\\ \\mathrm{W} \\\\\nU = 230\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ I = \\frac{60}{230} = 0.26\\ \\mathrm{A} $$\n\n**Answer:** The bulb draws about $0.26\\ \\mathrm{A}$.\n\n**General conclusion:** The \"rated power\" applies at the stated rated voltage. A $60\\ \\mathrm{W}$ bulb intended for $230\\ \\mathrm{V}$ therefore draws $0.26\\ \\mathrm{A}$; if it is connected to a lower voltage, both the current and the power change."
   },
   {
    "level": 2,
    "question": "A kettle has the power $2.0\\ \\mathrm{kW}$ and is used for $5.0$ minutes. How much energy does it use? Answer in kilojoules (kJ).",
    "answer": {
     "value": 600,
     "unit": "kJ"
    },
    "solution": "Power is energy per time, $P = E/t$. We solve for the energy *E*:\n\n$$ P = \\frac{E}{t} \\quad\\Leftrightarrow\\quad E = P \\cdot t $$\n\nMeasured values (in SI units):\n$$\n\\left[ \\begin{array}{l}\nP = 2.0\\ \\mathrm{kW} = 2\\,000\\ \\mathrm{W} \\\\\nt = 5.0\\ \\mathrm{min} = 5.0 \\cdot 60\\ \\mathrm{s} = 300\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ E = 2\\,000 \\cdot 300 = 600\\,000\\ \\mathrm{J} = 600\\ \\mathrm{kJ} $$\n\n**Answer:** The kettle uses $600\\ \\mathrm{kJ}$.\n\n**General conclusion:** Power (W) says how fast energy is converted; energy (J) is power multiplied by time. Both the power and the time must be in SI units (W and s) for the answer to be in joules."
   },
   {
    "level": 2,
    "question": "A nichrome heating coil is $5.0\\ \\mathrm{m}$ long and has the cross-sectional area $0.50\\ \\mathrm{mm^2}$. The coil is connected to the voltage $230\\ \\mathrm{V}$. What power is developed in the coil? The resistivity of nichrome is $\\rho = 1.1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m}$.",
    "answer": {
     "value": 4.8,
     "unit": "kW"
    },
    "solution": "**Step 1: the resistance of the coil.** We use the formula for the resistance of a conductor:\n\n$$ R = \\rho \\cdot \\frac{l}{A} $$\n\n$$\n\\left[ \\begin{array}{l}\n\\rho = 1.1 \\cdot 10^{-6}\\ \\mathrm{\\Omega \\cdot m} \\\\\nl = 5.0\\ \\mathrm{m} \\\\\nA = 0.50\\ \\mathrm{mm^2} = 0.50 \\cdot 10^{-6}\\ \\mathrm{m^2}\n\\end{array} \\right]\n$$\n\n$$ R = 1.1 \\cdot 10^{-6} \\cdot \\frac{5.0}{0.50 \\cdot 10^{-6}} = 11\\ \\mathrm{\\Omega} $$\n\n**Step 2: the power.** Now we know the voltage and the resistance:\n\n$$ P = \\frac{U^2}{R} = \\frac{230^2}{11} = 4\\,809\\ \\mathrm{W} \\approx 4.8\\ \\mathrm{kW} $$\n\n**Answer:** The power is about $4.8\\ \\mathrm{kW}$.\n\n**General conclusion:** The task links two sections of the chapter: first the geometry ($R = \\rho l / A$), then the power ($P = U^2/R$). A short, thin nichrome wire gives just the right resistance to develop a large heating power, which is exactly the principle behind heating elements and toasters."
   },
   {
    "level": 3,
    "question": "An immersion heater with resistance $28\\ \\mathrm{\\Omega}$ is connected to the voltage $230\\ \\mathrm{V}$ and lowered into $1.5\\ \\mathrm{litre}$ of water at $20\\ \\mathrm{°C}$. How long does it take to heat the water to $100\\ \\mathrm{°C}$? Assume that all the electrical energy goes to the water. The specific heat capacity of water is $c = 4.18 \\cdot 10^3\\ \\mathrm{J/(kg \\cdot K)}$, and $1.0\\ \\mathrm{litre}$ of water has a mass of $1.0\\ \\mathrm{kg}$.",
    "answer": {
     "value": 270,
     "unit": "s"
    },
    "solution": "Three different relationships must be linked: electric power, energy per time and heat energy.\n\n**Step 1: the power of the immersion heater** (we know *U* and *R*):\n$$ P = \\frac{U^2}{R} = \\frac{230^2}{28} = 1\\,889\\ \\mathrm{W} $$\n\n**Step 2: the energy needed to heat the water** ($Q = m c \\Delta T$ from the chapter on heat):\n$$ Q = m \\cdot c \\cdot \\Delta T = 1.5 \\cdot 4.18 \\cdot 10^3 \\cdot (100 - 20) = 5.02 \\cdot 10^5\\ \\mathrm{J} $$\n\n**Step 3: the time.** Power is energy per time, $P = E/t$, so\n$$ t = \\frac{Q}{P} = \\frac{5.02 \\cdot 10^5}{1\\,889} = 266\\ \\mathrm{s} \\approx 270\\ \\mathrm{s} $$\n\n**Answer:** It takes about $270\\ \\mathrm{s}$ (just over 4 minutes).\n\n**General conclusion:** The task links three different areas: electric power ($P = U^2/R$), the definition of energy ($E = P t$) and heat ($Q = mc\\Delta T$). The bridge between them is that the electrical energy is converted into heat in the water."
   }
  ]
 },
 "fy1-7.10": {
  "kalla": "b8d61a9552",
  "data": [
   {
    "level": 1,
    "question": "A charge $Q = 5.0\\ \\mathrm{nC}$ in an electric field is acted on by the electric force $F = 2.0 \\cdot 10^{-4}\\ \\mathrm{N}$. How strong is the electric field strength at that point?",
    "answer": {
     "value": 40000,
     "unit": "N/C"
    },
    "solution": "Electric field strength is defined as force per unit charge:\n\n$$ \\mathbb{E} = \\frac{F}{Q} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nF = 2.0 \\cdot 10^{-4}\\ \\mathrm{N} \\\\\nQ = 5.0\\ \\mathrm{nC} = 5.0 \\cdot 10^{-9}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ \\mathbb{E} = \\frac{2.0 \\cdot 10^{-4}}{5.0 \\cdot 10^{-9}} = 4.0 \\cdot 10^4\\ \\mathrm{N/C} $$\n\n**Answer:** The field strength is $4.0 \\cdot 10^4\\ \\mathrm{N/C}$.\n\n**General conclusion:** Distinguish between $\\mathbb{E}$ (field strength, unit N/C) and *E* (energy, unit J). They are written with the same letter but are completely different quantities."
   },
   {
    "level": 1,
    "question": "A charge $Q = 2.0\\ \\mathrm{nC}$ is placed in an electric field with field strength $\\mathbb{E} = 3.0 \\cdot 10^4\\ \\mathrm{N/C}$. How large is the electric force on the charge?",
    "answer": {
     "value": 60,
     "unit": "μN"
    },
    "solution": "We solve for the force *F* from the definition of field strength:\n\n$$ \\mathbb{E} = \\frac{F}{Q} \\quad\\Leftrightarrow\\quad F = \\mathbb{E} \\cdot Q $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\mathbb{E} = 3.0 \\cdot 10^4\\ \\mathrm{N/C} \\\\\nQ = 2.0\\ \\mathrm{nC} = 2.0 \\cdot 10^{-9}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ F = 3.0 \\cdot 10^4 \\cdot 2.0 \\cdot 10^{-9} = 6.0 \\cdot 10^{-5}\\ \\mathrm{N} = 60\\ \\mathrm{\\mu N} $$\n\n**Answer:** The force is $60\\ \\mathrm{\\mu N}$ (or $6.0 \\cdot 10^{-5}\\ \\mathrm{N}$).\n\n**General conclusion:** The field strength describes the field *independently* of which charge is placed in it. The force on an actual charge is only found when the field strength is multiplied by the charge."
   },
   {
    "level": 1,
    "question": "Determine the electric field strength at a point $10\\ \\mathrm{cm}$ from the centre of a small ball with the charge $Q = 15\\ \\mathrm{nC}$. Coulomb's constant is $k \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$.",
    "answer": {
     "value": 13000,
     "unit": "N/C",
     "tol": 0.05
    },
    "solution": "The field strength from a charged sphere is found from\n\n$$ \\mathbb{E} = k \\cdot \\frac{Q}{r^2} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nk \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2} \\\\\nQ = 15\\ \\mathrm{nC} = 15 \\cdot 10^{-9}\\ \\mathrm{C} \\\\\nr = 10\\ \\mathrm{cm} = 0.10\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ \\mathbb{E} = 8.99 \\cdot 10^9 \\cdot \\frac{15 \\cdot 10^{-9}}{0.10^2} = 1.3 \\cdot 10^4\\ \\mathrm{N/C} $$\n\n**Answer:** The field strength is about $1.3 \\cdot 10^4\\ \\mathrm{N/C}$.\n\n**General conclusion:** Note the similarity to Coulomb's law, but here only *one* charge appears, since the field strength describes the field at the point before any second charge has been placed there."
   },
   {
    "level": 2,
    "question": "The field strength $5.0\\ \\mathrm{cm}$ from the centre of a charged ball is $1.8 \\cdot 10^5\\ \\mathrm{N/C}$. How large is the charge of the ball?",
    "answer": {
     "value": 50,
     "unit": "nC"
    },
    "solution": "We start from the field strength from a sphere and solve for the charge *Q*:\n\n$$ \\mathbb{E} = k \\cdot \\frac{Q}{r^2} \\quad\\Leftrightarrow\\quad Q = \\frac{\\mathbb{E} \\cdot r^2}{k} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\mathbb{E} = 1.8 \\cdot 10^5\\ \\mathrm{N/C} \\\\\nr = 5.0\\ \\mathrm{cm} = 0.050\\ \\mathrm{m} \\\\\nk \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = \\frac{1.8 \\cdot 10^5 \\cdot 0.050^2}{8.99 \\cdot 10^9} = 5.0 \\cdot 10^{-8}\\ \\mathrm{C} = 50\\ \\mathrm{nC} $$\n\n**Answer:** The charge of the ball is about $50\\ \\mathrm{nC}$.\n\n**General conclusion:** Here you have to solve for *Q* from the formula and remember that the distance is squared: it is $r^2 = 0.050^2 = 0.0025$ that goes in, not $0.050$."
   },
   {
    "level": 2,
    "question": "A small ball has the charge $Q = 20\\ \\mathrm{nC}$. A test charge $q = 3.0\\ \\mathrm{nC}$ is placed at a point $8.0\\ \\mathrm{cm}$ from the ball. How large is the electric force on the test charge?",
    "answer": {
     "value": 84,
     "unit": "μN"
    },
    "solution": "**Step 1: the field strength at the point** (from the charge *Q* of the ball):\n\n$$ \\mathbb{E} = k \\cdot \\frac{Q}{r^2} = 8.99 \\cdot 10^9 \\cdot \\frac{20 \\cdot 10^{-9}}{0.080^2} = 2.81 \\cdot 10^4\\ \\mathrm{N/C} $$\n\n**Step 2: the force on the test charge** (field strength multiplied by test charge):\n\n$$ F = \\mathbb{E} \\cdot q = 2.81 \\cdot 10^4 \\cdot 3.0 \\cdot 10^{-9} = 8.4 \\cdot 10^{-5}\\ \\mathrm{N} = 84\\ \\mathrm{\\mu N} $$\n\n**Answer:** The force on the test charge is about $84\\ \\mathrm{\\mu N}$.\n\n**General conclusion:** Calculating the field strength first and then the force gives the same answer as Coulomb's law directly ($F = k Q q / r^2$), but \"field thinking\" is powerful when several charges contribute, since you then add fields instead of pairing up all the charges."
   },
   {
    "level": 2,
    "question": "Two charges lie on a straight line. The point P lies between them. At a distance of $3.0\\ \\mathrm{cm}$ to the left of P is $Q_1 = +9.0\\ \\mathrm{nC}$, and at a distance of $2.0\\ \\mathrm{cm}$ to the right of P is $Q_2 = -4.0\\ \\mathrm{nC}$. Determine the resultant electric field strength at P.",
    "answer": {
     "value": 180000,
     "unit": "N/C"
    },
    "solution": "Each charge gives rise to a field at P. We determine the magnitude and direction of each.\n\n**The field from $Q_1$ (positive, on the left):** field lines go *out from* plus, so the field at P points **to the right**.\n\n$$ \\mathbb{E}_1 = k \\cdot \\frac{Q_1}{r_1^2} = 8.99 \\cdot 10^9 \\cdot \\frac{9.0 \\cdot 10^{-9}}{0.030^2} = 8.99 \\cdot 10^4\\ \\mathrm{N/C} $$\n\n**The field from $Q_2$ (negative, on the right):** field lines go *into* minus, so the field at P points **to the right** (towards $Q_2$).\n\n$$ \\mathbb{E}_2 = k \\cdot \\frac{Q_2}{r_2^2} = 8.99 \\cdot 10^9 \\cdot \\frac{4.0 \\cdot 10^{-9}}{0.020^2} = 8.99 \\cdot 10^4\\ \\mathrm{N/C} $$\n\nBoth fields point **to the right**, so they are added:\n\n$$ \\mathbb{E} = \\mathbb{E}_1 + \\mathbb{E}_2 = 8.99 \\cdot 10^4 + 8.99 \\cdot 10^4 = 1.8 \\cdot 10^5\\ \\mathrm{N/C} $$\n\n**Answer:** The resultant field strength at P is about $1.8 \\cdot 10^5\\ \\mathrm{N/C}$, directed to the right (towards the negative charge).\n\n**General conclusion:** Between a positive and a negative charge, *both* fields point in the same direction (from plus towards minus), which is why they are added. Deciding the direction with the rule \"out from plus, into minus\" is the whole point of superposition."
   },
   {
    "level": 3,
    "question": "Two equal charges $Q = 5.0\\ \\mathrm{nC}$ are placed at two corners (A and C) of a square with side $4.0\\ \\mathrm{cm}$. Determine the **magnitude** of the electric field strength at the corner B, which is adjacent to both charged corners. ($k \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$)",
    "answer": {
     "value": 40000,
     "unit": "N/C"
    },
    "solution": "Each charge gives a field at B. Since A and C are *neighbouring corners* of B, both are at the distance $4.0\\ \\mathrm{cm}$ (the side of the square) from B, and the two fields are equally large:\n\n$$ \\mathbb{E}_1 = \\mathbb{E}_2 = k \\cdot \\frac{Q}{a^2} = 8.99 \\cdot 10^9 \\cdot \\frac{5.0 \\cdot 10^{-9}}{0.040^2} = 2.81 \\cdot 10^4\\ \\mathrm{N/C} $$\n\n**The directions are perpendicular to each other:** the field from A points along the side A→B, the field from C along the side C→B, and these two sides meet at a right angle at the corner B. The resultant field strength is therefore found with Pythagoras' theorem, not by simple addition:\n\n$$ \\mathbb{E} = \\sqrt{\\mathbb{E}_1^2 + \\mathbb{E}_2^2} = \\mathbb{E}_1 \\cdot \\sqrt{2} = 2.81 \\cdot 10^4 \\cdot \\sqrt{2} = 4.0 \\cdot 10^4\\ \\mathrm{N/C} $$\n\n**Answer:** The field strength at the corner B is about $4.0 \\cdot 10^4\\ \\mathrm{N/C}$.\n\n**General conclusion:** Fields (and forces) are **vectors**: if they do not lie along the same line they must be added geometrically. If they are perpendicular, it is Pythagoras; in other cases you split them into $x$ and $y$ components separately."
   }
  ]
 },
 "fy1-7.11": {
  "kalla": "b81a667389",
  "data": [
   {
    "level": 1,
    "question": "The voltage between two parallel plates a distance $d = 2.0\\ \\mathrm{cm}$ apart is $U = 100\\ \\mathrm{V}$. How strong is the electric field strength between the plates?",
    "answer": {
     "value": 5000,
     "unit": "V/m"
    },
    "solution": "Between two plates the field is uniform and the field strength is given by\n\n$$ \\mathbb{E} = \\frac{U}{d} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 100\\ \\mathrm{V} \\\\\nd = 2.0\\ \\mathrm{cm} = 0.020\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ \\mathbb{E} = \\frac{100}{0.020} = 5.0 \\cdot 10^3\\ \\mathrm{V/m} $$\n\n**Answer:** The field strength is $5.0 \\cdot 10^3\\ \\mathrm{V/m}$.\n\n**General conclusion:** Between plates the field is *uniform*: equally strong everywhere. The unit V/m is equivalent to N/C."
   },
   {
    "level": 1,
    "question": "The field strength between two plates $5.0\\ \\mathrm{cm}$ apart is $3.0 \\cdot 10^4\\ \\mathrm{V/m}$. Determine the voltage between the plates. Answer in kV.",
    "answer": {
     "value": 1.5,
     "unit": "kV"
    },
    "solution": "We solve for the voltage *U*:\n\n$$ \\mathbb{E} = \\frac{U}{d} \\quad\\Leftrightarrow\\quad U = \\mathbb{E} \\cdot d $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\mathbb{E} = 3.0 \\cdot 10^4\\ \\mathrm{V/m} \\\\\nd = 5.0\\ \\mathrm{cm} = 0.050\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U = 3.0 \\cdot 10^4 \\cdot 0.050 = 1\\,500\\ \\mathrm{V} = 1.5\\ \\mathrm{kV} $$\n\n**Answer:** The voltage is $1.5\\ \\mathrm{kV}$ (or $1\\,500\\ \\mathrm{V}$)."
   },
   {
    "level": 1,
    "question": "The voltage between two plates is $U = 600\\ \\mathrm{V}$ and the field strength is $2.0 \\cdot 10^4\\ \\mathrm{V/m}$. How large is the distance between the plates? Answer in cm.",
    "answer": {
     "value": 3,
     "unit": "cm"
    },
    "solution": "We solve for the plate separation *d*:\n\n$$ \\mathbb{E} = \\frac{U}{d} \\quad\\Leftrightarrow\\quad d = \\frac{U}{\\mathbb{E}} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 600\\ \\mathrm{V} \\\\\n\\mathbb{E} = 2.0 \\cdot 10^4\\ \\mathrm{V/m}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ d = \\frac{600}{2.0 \\cdot 10^4} = 0.030\\ \\mathrm{m} = 3.0\\ \\mathrm{cm} $$\n\n**Answer:** The plate separation is $3.0\\ \\mathrm{cm}$."
   },
   {
    "level": 2,
    "question": "The voltage between two plates $4.0\\ \\mathrm{cm}$ apart is $200\\ \\mathrm{V}$. A small charge $Q = 5.0\\ \\mathrm{nC}$ is placed in the field between the plates. How large is the electric force on the charge?",
    "answer": {
     "value": 25,
     "unit": "μN"
    },
    "solution": "**Step 1: the field strength between the plates:**\n\n$$ \\mathbb{E} = \\frac{U}{d} = \\frac{200}{0.040} = 5.0 \\cdot 10^3\\ \\mathrm{V/m} $$\n\n**Step 2: the force on the charge** (field strength multiplied by charge):\n\n$$ F = \\mathbb{E} \\cdot Q = 5.0 \\cdot 10^3 \\cdot 5.0 \\cdot 10^{-9} = 2.5 \\cdot 10^{-5}\\ \\mathrm{N} = 25\\ \\mathrm{\\mu N} $$\n\n**Answer:** The force on the charge is $25\\ \\mathrm{\\mu N}$.\n\n**General conclusion:** In a uniform field the force is equally large *everywhere* between the plates: it does not depend on where the charge is, only on the field strength and the charge."
   },
   {
    "level": 2,
    "question": "A charge $Q = 8.0\\ \\mathrm{nC}$ between two plates $5.0\\ \\mathrm{cm}$ apart is acted on by the electric force $F = 1.2 \\cdot 10^{-4}\\ \\mathrm{N}$. How large is the voltage between the plates?",
    "answer": {
     "value": 750,
     "unit": "V"
    },
    "solution": "**Step 1: the field strength** from the force and the charge:\n\n$$ \\mathbb{E} = \\frac{F}{Q} = \\frac{1.2 \\cdot 10^{-4}}{8.0 \\cdot 10^{-9}} = 1.5 \\cdot 10^4\\ \\mathrm{V/m} $$\n\n**Step 2: the voltage** from the field strength and the plate separation:\n\n$$ U = \\mathbb{E} \\cdot d = 1.5 \\cdot 10^4 \\cdot 0.050 = 750\\ \\mathrm{V} $$\n\n**Answer:** The voltage between the plates is $750\\ \\mathrm{V}$.\n\n**General conclusion:** The task uses two different expressions for the same field strength: $\\mathbb{E} = F/Q$ (the definition) and $\\mathbb{E} = U/d$ (between plates). By calculating $\\mathbb{E}$ from one, you can move on to the other."
   },
   {
    "level": 2,
    "question": "An electron is between two plates $2.0\\ \\mathrm{cm}$ apart with the voltage $500\\ \\mathrm{V}$. The electron is released from rest at the negative plate. What speed does it have when it reaches the positive plate? ($q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$, $m_e = 9.11 \\cdot 10^{-31}\\ \\mathrm{kg}$)",
    "answer": {
     "value": 13000000,
     "unit": "m/s",
     "tol": 0.05
    },
    "solution": "We follow the chain field $\\to$ force $\\to$ acceleration $\\to$ speed.\n\n**Step 1: the field strength:**\n$$ \\mathbb{E} = \\frac{U}{d} = \\frac{500}{0.020} = 2.5 \\cdot 10^4\\ \\mathrm{V/m} $$\n\n**Step 2: the force on the electron:**\n$$ F = \\mathbb{E} \\cdot q_e = 2.5 \\cdot 10^4 \\cdot 1.602 \\cdot 10^{-19} = 4.0 \\cdot 10^{-15}\\ \\mathrm{N} $$\n\n**Step 3: the acceleration** (Newton's second law):\n$$ a = \\frac{F}{m_e} = \\frac{4.0 \\cdot 10^{-15}}{9.11 \\cdot 10^{-31}} = 4.4 \\cdot 10^{15}\\ \\mathrm{m/s^2} $$\n\n**Step 4: the final speed.** The electron accelerates uniformly over the distance $d = 0.020\\ \\mathrm{m}$ from rest. With $v^2 = 2 a d$:\n\n$$ v = \\sqrt{2 a d} = \\sqrt{2 \\cdot 4.4 \\cdot 10^{15} \\cdot 0.020} = 1.3 \\cdot 10^7\\ \\mathrm{m/s} $$\n\n**Answer:** The electron reaches a speed of about $1.3 \\cdot 10^7\\ \\mathrm{m/s}$.\n\n**General conclusion:** You can check this using energy: $q_e U = \\dfrac{1}{2} m_e v^2$ gives the same answer directly, since the whole \"field route\" is just another way of describing that the electrical energy $q_e U$ becomes kinetic energy. The long route shows *why* it works."
   },
   {
    "level": 3,
    "question": "An electron is fired horizontally with the speed $v_0 = 2.0 \\cdot 10^7\\ \\mathrm{m/s}$ midway between two horizontal plates. The plates are $L = 6.0\\ \\mathrm{cm}$ long and $d = 2.0\\ \\mathrm{cm}$ apart, with the voltage $U = 80\\ \\mathrm{V}$ across them. How large is the vertical deflection of the electron when it leaves the plates? ($q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$, $m_e = 9.11 \\cdot 10^{-31}\\ \\mathrm{kg}$)",
    "answer": {
     "value": 3.2,
     "unit": "mm"
    },
    "solution": "This is **projectile motion**: horizontally a constant velocity, vertically an accelerated motion driven by the electric force, just like a horizontal throw in a gravitational field. The two motions are treated separately.\n\n**Vertically: the acceleration.** The field between the plates and the force on the electron:\n$$ \\mathbb{E} = \\frac{U}{d} = \\frac{80}{0.020} = 4\\,000\\ \\mathrm{V/m} $$\n$$ a = \\frac{F}{m_e} = \\frac{\\mathbb{E} \\cdot q_e}{m_e} = \\frac{4\\,000 \\cdot 1.602 \\cdot 10^{-19}}{9.11 \\cdot 10^{-31}} = 7.03 \\cdot 10^{14}\\ \\mathrm{m/s^2} $$\n\n**Horizontally: the time between the plates** (constant velocity $v_0$):\n$$ t = \\frac{L}{v_0} = \\frac{0.060}{2.0 \\cdot 10^7} = 3.0 \\cdot 10^{-9}\\ \\mathrm{s} $$\n\n**Vertical deflection** during this time (starting from rest vertically, $y = \\dfrac{1}{2} a t^2$):\n$$ y = \\frac{1}{2} a t^2 = \\frac{1}{2} \\cdot 7.03 \\cdot 10^{14} \\cdot (3.0 \\cdot 10^{-9})^2 = 3.2 \\cdot 10^{-3}\\ \\mathrm{m} = 3.2\\ \\mathrm{mm} $$\n\n**Answer:** The deflection is about $3.2\\ \\mathrm{mm}$.\n\n**General conclusion:** Since $3.2\\ \\mathrm{mm} < d/2 = 10\\ \\mathrm{mm}$, the electron gets out without hitting a plate. The key is to see the motion as a throw: horizontal and vertical are *independent*, and the time in the field is determined by the horizontal motion. The same principle governs the picture tube in old TV sets and inkjet printers."
   }
  ]
 },
 "fy1-7.12": {
  "kalla": "f4cb11f251",
  "data": [
   {
    "level": 1,
    "question": "In a circuit the potential at point A is $V_A = +12\\ \\mathrm{V}$ and at point B $V_B = -4.0\\ \\mathrm{V}$. How large is the voltage between the points A and B?",
    "answer": {
     "value": 16,
     "unit": "V"
    },
    "solution": "Voltage is the difference in potential between two points, and can never be negative, hence the absolute value:\n\n$$ U = |V_A - V_B| $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nV_A = +12\\ \\mathrm{V} \\\\\nV_B = -4.0\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U = |+12 - (-4.0)| = |16| = 16\\ \\mathrm{V} $$\n\n**Answer:** The voltage between A and B is $16\\ \\mathrm{V}$.\n\n**General conclusion:** Be careful with the double sign: $12 - (-4.0) = 12 + 4.0 = 16$. Voltage is the *difference* in potential: two points can have completely different potentials but still only a modest voltage between them if they are close to each other on the \"potential scale\"."
   },
   {
    "level": 1,
    "question": "Which of the following statements about electric potential is correct?",
    "choices": [
     "The current flows from a point with higher potential to a point with lower potential.",
     "The current flows from a point with lower potential to a point with higher potential.",
     "The potential at an earthed point is always 230 V.",
     "Electric potential and voltage are exactly the same quantity."
    ],
    "correct": 0,
    "solution": "The current flows from **higher** to **lower** potential, just as water flows from a higher to a lower level. The potential is like an \"electrical height\".\n\nThe other options are wrong: an earthed point has the potential **0 V** (not 230 V), and potential has a sign (positive/negative/zero), whereas voltage is the non-negative *difference* between two potentials.\n\n**Answer:** Option A.\n\n**General conclusion:** Potential (*V*) is a property of a *single point* (relative to a zero level), whereas voltage (*U*) is always about *two* points. Voltage $= |V_A - V_B|$."
   },
   {
    "level": 1,
    "question": "The negative terminal of a $9.0\\ \\mathrm{V}$ battery is earthed, so that it has the potential $0\\ \\mathrm{V}$. What potential does the positive terminal then have?",
    "answer": {
     "value": 9,
     "unit": "V"
    },
    "solution": "We start at the earthed negative terminal ($V = 0$) and walk through the battery **from the negative terminal to the positive terminal**, keeping track of the potential. The potential then *increases* by the voltage of the battery:\n\n$$ V_+ = 0 + U = 0 + 9.0 = +9.0\\ \\mathrm{V} $$\n\n**Answer:** The positive terminal has the potential $+9.0\\ \\mathrm{V}$.\n\n**General conclusion:** Going from minus to plus *inside* the battery raises the potential: it is the battery that \"pumps up\" the charges to a higher electric potential."
   },
   {
    "level": 2,
    "question": "In a circuit, point B is earthed, so that $V_B = 0$. Point A is on the other side of a $3.0\\ \\mathrm{\\Omega}$ resistor carrying a current of $4.0\\ \\mathrm{A}$. When you walk from B to A, keeping track of the potential, you go **against** the direction of the current. Determine the potential $V_A$.",
    "answer": {
     "value": 12,
     "unit": "V"
    },
    "solution": "We start at the earthed point B ($V_B = 0$) and go to A. Going through a resistor **against** the current *increases* the potential by the voltage across the resistor $R \\cdot I$ (Ohm's law):\n\n$$ V_A = V_B + R \\cdot I $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nV_B = 0 \\\\\nR = 3.0\\ \\mathrm{\\Omega} \\\\\nI = 4.0\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ V_A = 0 + 3.0 \\cdot 4.0 = +12\\ \\mathrm{V} $$\n\n**Answer:** The potential at A is $+12\\ \\mathrm{V}$.\n\n**General conclusion:** The rule of thumb when walking through a resistor: if you go **against** the current the potential increases, if you go **with** the current it decreases. The size of the change is always $R \\cdot I$."
   },
   {
    "level": 2,
    "question": "In a closed circuit a $2.0\\ \\mathrm{\\Omega}$ resistor and a $4.0\\ \\mathrm{\\Omega}$ resistor are in series together with two batteries: a $12\\ \\mathrm{V}$ battery that drives the current and a $3.0\\ \\mathrm{V}$ battery that opposes it. Determine the current in the circuit.",
    "answer": {
     "value": 1.5,
     "unit": "A"
    },
    "solution": "We go a full lap around the circuit. According to **Kirchhoff's second law**, the sum of all the changes in potential is zero:\n\n$$ \\sum \\Delta V = 0 $$\n\nAlong the lap the potential increases across the driving battery ($+12\\ \\mathrm{V}$), decreases across the opposing battery ($-3.0\\ \\mathrm{V}$) and decreases through both resistors (going with the current). This gives\n\n$$ +12 - 3.0 - 2.0 \\cdot I - 4.0 \\cdot I = 0 $$\n\n$$ 9.0 - 6.0 \\, I = 0 \\quad\\Leftrightarrow\\quad I = \\frac{9.0}{6.0} = 1.5\\ \\mathrm{A} $$\n\n**Answer:** The current in the circuit is $1.5\\ \\mathrm{A}$.\n\n**General conclusion:** When two batteries oppose each other, it is the *net voltage* ($12 - 3.0 = 9.0\\ \\mathrm{V}$) that drives the current through the total resistance. Kirchhoff's second law gives this automatically if you keep track of the signs."
   },
   {
    "level": 2,
    "question": "Three points A, B and C lie along a circuit. Point B is earthed ($V_B = 0$). From B to A you walk through a $4.0\\ \\mathrm{\\Omega}$ resistor **against** the current $2.5\\ \\mathrm{A}$. From B to C you walk through an $8.0\\ \\mathrm{\\Omega}$ resistor **with** the same current $2.5\\ \\mathrm{A}$. Determine the voltage between point A and point C.",
    "answer": {
     "value": 30,
     "unit": "V"
    },
    "solution": "We determine the potential at A and at C separately, starting at the earthed point B.\n\n**The potential at A.** From B you go **against** the current through $4.0\\ \\mathrm{\\Omega}$ → the potential *increases* by $R \\cdot I$:\n\n$$ V_A = 0 + 4.0 \\cdot 2.5 = +10\\ \\mathrm{V} $$\n\n**The potential at C.** From B you go **with** the current through $8.0\\ \\mathrm{\\Omega}$ → the potential *decreases* by $R \\cdot I$:\n\n$$ V_C = 0 - 8.0 \\cdot 2.5 = -20\\ \\mathrm{V} $$\n\n**The voltage between A and C** is the difference in potential (with absolute value):\n\n$$ U = |V_A - V_C| = |+10 - (-20)| = |30| = 30\\ \\mathrm{V} $$\n\n**Answer:** The voltage between A and C is $30\\ \\mathrm{V}$.\n\n**General conclusion:** Even though no *single* component has $30\\ \\mathrm{V}$ across it, the voltage between A and C is still $30\\ \\mathrm{V}$: they are on opposite sides of the earth point, one at $+10\\ \\mathrm{V}$ and one at $-20\\ \\mathrm{V}$. It is the difference in potential that counts, not the value for any single component."
   },
   {
    "level": 3,
    "question": "In the circuit below the right-hand node is earthed ($0\\ \\mathrm{V}$). Determine the voltage between the points P and Q. Hint: first determine the potential at P and at Q by walking from the earth point and keeping track of the potential.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 330 234\" style=\"max-width:330px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"46\" y1=\"42\" x2=\"46\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"284\" y1=\"42\" x2=\"284\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"46\" y1=\"42\" x2=\"161\" y2=\"42\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"169\" y1=\"42\" x2=\"284\" y2=\"42\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"161\" y1=\"28\" x2=\"161\" y2=\"56\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><line x1=\"169\" y1=\"34\" x2=\"169\" y2=\"50\" stroke=\"#0f1620\" stroke-width=\"2.6\"/><text x=\"165\" y=\"26\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">U</tspan> = 24 V</text><line x1=\"46\" y1=\"110\" x2=\"284\" y2=\"110\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"46\" y1=\"178\" x2=\"284\" y2=\"178\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><rect x=\"85.5\" y=\"102\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"105.5\" y=\"95\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₁ = 20 Ω</text><rect x=\"204.5\" y=\"102\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"224.5\" y=\"95\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₂ = 40 Ω</text><rect x=\"85.5\" y=\"170\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"105.5\" y=\"204\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₃ = 40 Ω</text><rect x=\"204.5\" y=\"170\" width=\"40\" height=\"16\" fill=\"#fff\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"224.5\" y=\"204\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">R</tspan>₄ = 20 Ω</text><circle cx=\"165\" cy=\"110\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"165\" cy=\"178\" r=\"2.6\" fill=\"#0f1620\"/><text x=\"154\" y=\"101\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"end\">P</text><text x=\"154\" y=\"196\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"end\">Q</text><line x1=\"284\" y1=\"178\" x2=\"284\" y2=\"192\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"square\"/><line x1=\"273\" y1=\"192\" x2=\"295\" y2=\"192\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"277\" y1=\"196\" x2=\"291\" y2=\"196\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"281\" y1=\"200\" x2=\"287\" y2=\"200\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"284\" y=\"226\" font-size=\"16\" fill=\"#0f1620\" text-anchor=\"middle\">0 V</text></svg>",
    "answer": {
     "value": 8,
     "unit": "V"
    },
    "solution": "The earthed right-hand node has the potential $0\\ \\mathrm{V}$. From there we walk to P and to Q. Both branches have the same battery voltage $24\\ \\mathrm{V}$ across them.\n\n**Upper branch** ($R_1 = 20\\ \\mathrm{\\Omega}$, $R_2 = 40\\ \\mathrm{\\Omega}$ in series):\n$$ I_\\text{upper} = \\frac{24}{20 + 40} = 0.40\\ \\mathrm{A} $$\nFrom the earth point (0 V) through $R_2$ **against** the current up to P → the potential increases:\n$$ V_P = 0 + R_2 \\cdot I_\\text{upper} = 40 \\cdot 0.40 = +16\\ \\mathrm{V} $$\n\n**Lower branch** ($R_3 = 40\\ \\mathrm{\\Omega}$, $R_4 = 20\\ \\mathrm{\\Omega}$ in series):\n$$ I_\\text{lower} = \\frac{24}{40 + 20} = 0.40\\ \\mathrm{A} $$\nFrom the earth point through $R_4$ against the current to Q:\n$$ V_Q = 0 + R_4 \\cdot I_\\text{lower} = 20 \\cdot 0.40 = +8.0\\ \\mathrm{V} $$\n\n**The voltage between P and Q** is the difference in potential:\n$$ U_{PQ} = |V_P - V_Q| = |16 - 8.0| = 8.0\\ \\mathrm{V} $$\n\n**Answer:** The voltage between P and Q is $8.0\\ \\mathrm{V}$ (P is at a higher potential than Q).\n\n**General conclusion:** In a bridge circuit P and Q have different potentials even though the branches have *the same* voltage across them: it is the difference in how the voltage is *divided* in the two branches that gives the voltage between the midpoints. Walking from the earth point keeps track of the signs."
   }
  ]
 },
 "fy1-7.13": {
  "kalla": "b729d82205",
  "data": [
   {
    "level": 1,
    "question": "A Faraday cage (a closed metal enclosure) is placed in an external electric field. What is true about the resultant electric field **inside** the cage?",
    "choices": [
     "The field inside becomes stronger than the external field.",
     "The field inside is as strong as the external field and remains.",
     "The field inside is about half of the external field.",
     "The field inside is zero: the resultant field is cancelled."
    ],
    "correct": 3,
    "solution": "Inside a Faraday cage the resultant electric field is **zero**. The conduction electrons in the metal are redistributed and create their own field that exactly cancels the external field inside the cage.\n\n**Answer:** Option D: the field inside is zero.\n\n**General conclusion:** This is why sensitive electronics can be shielded with a metal enclosure, and why you do not get mobile coverage in a lift or a room with thick metal walls."
   },
   {
    "level": 1,
    "question": "Why are you usually safe inside a car during a thunderstorm?",
    "choices": [
     "The rubber tyres insulate the car from the ground so that the lightning cannot get in.",
     "The car's metal body works as a Faraday cage and keeps the electric field away from the passenger compartment.",
     "The car's metal conducts all the charge away to the engine, where it becomes harmless.",
     "The petrol in the tank absorbs the energy of the lightning."
    ],
    "correct": 1,
    "solution": "The car's metal body works as a **Faraday cage**: the charges spread out over the outside of the body, and inside the passenger compartment the resultant field is zero. The current then flows in the body, not through the passengers.\n\n**Answer:** Option B.\n\n**General conclusion:** The idea that it is due to the rubber tyres is a **common misconception**. The tyres are far too thin to insulate against a lightning bolt that has already travelled kilometres through air: it is the body, not the tyres, that protects you."
   },
   {
    "level": 1,
    "question": "Where do the excess charges collect on a charged, hollow metal cage?",
    "choices": [
     "Evenly distributed through the whole metal material.",
     "On the inside of the cage.",
     "On the outside of the cage.",
     "At the geometric centre of the cage."
    ],
    "correct": 2,
    "solution": "Like charges repel each other and therefore try to get as far away from each other as possible. On a conductor, this means that the excess charges end up on the **outside**.\n\n**Answer:** Option C: on the outside.\n\n**General conclusion:** This is exactly why no field arises inside the cage: the charge sits on the outermost surface, and its contributions inside cancel each other. Objects hung on the inside of the cage are not affected, while objects on the outside are pushed out by the field."
   },
   {
    "level": 2,
    "question": "What is meant by **point discharge**?",
    "choices": [
     "That charges are concentrated in a pointed part of a conductor so that the local field strength becomes so high that the air around the point becomes charged and a discharge occurs.",
     "That a pointed conductor always repels lightning strikes completely.",
     "That a metal point becomes so hot from the current that it melts.",
     "That the charge spreads out evenly and disappears along a pointed conductor."
    ],
    "correct": 0,
    "solution": "At a point the charges are concentrated, which makes the local electric field strength very high. If it becomes strong enough, a **discharge** to the air molecules occurs, which then become charged.\n\n**Answer:** Option A.\n\n**General conclusion:** The same phenomenon is also called **St Elmo's fire** and can be seen as a faint blue glow around mast tops and lightning conductor tips during thunderstorms. It is a corona discharge, in which the air around the tip is ionised and emits light. It is not the same thing as a lightning strike."
   },
   {
    "level": 2,
    "question": "A mobile phone is put in a completely closed metal box and then loses all reception. Which explanation fits best?",
    "choices": [
     "The metal attracts the energy of the radio waves and charges the battery of the phone.",
     "The metal box works as a Faraday cage and shields off the electromagnetic fields from outside.",
     "The metal becomes magnetic and erases the phone's signal.",
     "The phone switches itself off because it is dark in the box."
    ],
    "correct": 1,
    "solution": "The metal box is a **Faraday cage**. The electromagnetic fields (the radio waves) that carry the phone signal cannot penetrate a closed metal enclosure, so the phone loses contact with the base station.\n\n**Answer:** Option B.\n\n**General conclusion:** The same principle is used deliberately in shielded rooms for sensitive measurements and in protective sleeves for contactless bank cards. It is the fields from outside that are shut out, not something that happens *to* the phone itself."
   },
   {
    "level": 3,
    "question": "How is it, physically, that the resultant electric field inside a Faraday cage becomes zero?",
    "choices": [
     "The metal absorbs the external field and converts it into heat.",
     "In principle, the external field can never reach a metal surface.",
     "The metal reflects the field straight back outwards, rather like a mirror reflects light.",
     "The conduction electrons are redistributed so that one side of the cage becomes negative and the other positive, which creates an equally large but opposite field inside that cancels the external field."
    ],
    "correct": 3,
    "solution": "When the external field is applied, the free conduction electrons move **against** the field. One side of the cage then gets an excess of electrons (becomes negative) and the other a deficit (becomes positive). These redistributed charges build up their **own, opposite field** inside the cage. The redistribution continues until the internal field is *exactly as large* as the external one; then they cancel and the resultant field becomes zero.\n\n**Answer:** Option D.\n\n**General conclusion:** This happens almost instantly (at the speed of light) and is called **electrostatic induction**. The point is that the cancellation is not passive \"absorption\" but an active, self-regulating response: the stronger the external field, the more the charges are redistributed, always just enough to make the field inside zero."
   }
  ]
 },
 "fy1-7.14": {
  "kalla": "c76ae5a836",
  "data": [
   {
    "level": 1,
    "question": "Two horizontal plates are $5.0\\ \\mathrm{mm}$ apart and the voltage across them is $1.0\\ \\mathrm{kV}$. How strong is the electric field strength between the plates?",
    "answer": {
     "value": 200000,
     "unit": "V/m"
    },
    "solution": "Between the plates the field is uniform:\n\n$$ \\mathbb{E} = \\frac{U}{d} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nU = 1.0\\ \\mathrm{kV} = 1\\,000\\ \\mathrm{V} \\\\\nd = 5.0\\ \\mathrm{mm} = 5.0 \\cdot 10^{-3}\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ \\mathbb{E} = \\frac{1\\,000}{5.0 \\cdot 10^{-3}} = 2.0 \\cdot 10^5\\ \\mathrm{V/m} $$\n\n**Answer:** The field strength is $2.0 \\cdot 10^5\\ \\mathrm{V/m}$.\n\n**General conclusion:** It is this field that in Millikan's experiment gives the oil drops an upward electric force. Do not forget that $\\mathrm{mm} \\to \\mathrm{m}$ is the factor $10^{-3}$."
   },
   {
    "level": 1,
    "question": "An oil drop hovers in equilibrium in an electric field with field strength $\\mathbb{E} = 4.0 \\cdot 10^5\\ \\mathrm{V/m}$. The mass of the drop is $m = 2.0 \\cdot 10^{-14}\\ \\mathrm{kg}$. How large is the charge of the drop? ($g = 9.82\\ \\mathrm{N/kg}$)",
    "answer": {
     "value": 4.9e-19,
     "unit": "C"
    },
    "solution": "Since the drop hovers, the upward electric force must be as large as the downward gravitational force:\n\n$$ F_\\mathrm{e} = F_\\mathrm{G} \\quad\\Leftrightarrow\\quad Q \\cdot \\mathbb{E} = m \\cdot g $$\n\nWe solve for the charge *Q*:\n\n$$ Q = \\frac{m \\cdot g}{\\mathbb{E}} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 2.0 \\cdot 10^{-14}\\ \\mathrm{kg} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\n\\mathbb{E} = 4.0 \\cdot 10^5\\ \\mathrm{V/m}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = \\frac{2.0 \\cdot 10^{-14} \\cdot 9.82}{4.0 \\cdot 10^5} = 4.9 \\cdot 10^{-19}\\ \\mathrm{C} $$\n\n**Answer:** The charge of the drop is about $4.9 \\cdot 10^{-19}\\ \\mathrm{C}$.\n\n**General conclusion:** Millikan's whole method is based on this balance of forces: when the drop stands still we know that $F_\\mathrm{e} = F_\\mathrm{G}$, and then the charge can be calculated."
   },
   {
    "level": 1,
    "question": "An oil drop in Millikan's experiment has the charge $Q = 4.8 \\cdot 10^{-19}\\ \\mathrm{C}$. How many excess electrons does the drop have? The elementary charge is $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "The number of electrons *n* is found by dividing the charge of the drop by the elementary charge:\n\n$$ n = \\frac{Q}{q_e} = \\frac{4.8 \\cdot 10^{-19}}{1.602 \\cdot 10^{-19}} = 2.99\\ldots \\approx 3\\ \\text{electrons} $$\n\n**Answer:** The drop has $3$ excess electrons.\n\n**General conclusion:** The answer is (almost) a whole number, which is exactly what Millikan discovered. The charge is always a whole multiple of the elementary charge $1.602 \\cdot 10^{-19}\\ \\mathrm{C}$, never something \"in between\"."
   },
   {
    "level": 2,
    "question": "A voltage of $1.5\\ \\mathrm{kV}$ is applied between two horizontal plates $4.0\\ \\mathrm{mm}$ apart. An oil drop with mass $m = 1.8 \\cdot 10^{-14}\\ \\mathrm{kg}$ hovers in equilibrium between the plates. Determine the charge of the drop. ($g = 9.82\\ \\mathrm{N/kg}$)",
    "answer": {
     "value": 4.7e-19,
     "unit": "C"
    },
    "solution": "At equilibrium the electric force and the gravitational force are equally large. With $\\mathbb{E} = U/d$ the balance of forces becomes:\n\n$$ F_\\mathrm{e} = F_\\mathrm{G} \\quad\\Leftrightarrow\\quad Q \\cdot \\frac{U}{d} = m \\cdot g $$\n\nWe solve for the charge *Q*:\n\n$$ Q = \\frac{m \\cdot g \\cdot d}{U} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 1.8 \\cdot 10^{-14}\\ \\mathrm{kg} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nd = 4.0\\ \\mathrm{mm} = 4.0 \\cdot 10^{-3}\\ \\mathrm{m} \\\\\nU = 1.5\\ \\mathrm{kV} = 1\\,500\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ Q = \\frac{1.8 \\cdot 10^{-14} \\cdot 9.82 \\cdot 4.0 \\cdot 10^{-3}}{1\\,500} = 4.7 \\cdot 10^{-19}\\ \\mathrm{C} $$\n\n**Answer:** The charge of the drop is about $4.7 \\cdot 10^{-19}\\ \\mathrm{C}$.\n\n**General conclusion:** The formula $Q = m g d / U$ is just the balance of forces $Q \\mathbb{E} = mg$ with $\\mathbb{E}$ replaced by $U/d$. So you do not need to calculate the field strength separately, but it works just as well to do it in two steps."
   },
   {
    "level": 2,
    "question": "A voltage of $2.0\\ \\mathrm{kV}$ is applied between two horizontal plates $5.0\\ \\mathrm{mm}$ apart. An oil drop with mass $m = 1.3 \\cdot 10^{-14}\\ \\mathrm{kg}$ hovers in equilibrium. How many excess electrons does the drop have? ($g = 9.82\\ \\mathrm{N/kg}$, $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$)",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "solution": "**Step 1: the charge of the drop** from the balance of forces $Q \\cdot U/d = m g$:\n\n$$ Q = \\frac{m \\cdot g \\cdot d}{U} = \\frac{1.3 \\cdot 10^{-14} \\cdot 9.82 \\cdot 5.0 \\cdot 10^{-3}}{2\\,000} = 3.2 \\cdot 10^{-19}\\ \\mathrm{C} $$\n\n**Step 2: the number of electrons:**\n\n$$ n = \\frac{Q}{q_e} = \\frac{3.2 \\cdot 10^{-19}}{1.602 \\cdot 10^{-19}} = 1.99\\ldots \\approx 2\\ \\text{electrons} $$\n\n**Answer:** The drop has $2$ excess electrons.\n\n**General conclusion:** That the answer comes out so close to a whole number is no coincidence: it is the whole point of the experiment. The charge of the drop *must* be a whole number of elementary charges."
   },
   {
    "level": 2,
    "question": "An oil drop with mass $m = 3.3 \\cdot 10^{-15}\\ \\mathrm{kg}$ hovers in equilibrium between two horizontal plates $6.0\\ \\mathrm{mm}$ apart. The drop has 2 excess electrons. What voltage is there across the plates? ($g = 9.82\\ \\mathrm{N/kg}$, $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$)",
    "answer": {
     "value": 610,
     "unit": "V"
    },
    "solution": "**Step 1: the charge of the drop.** With 2 excess electrons,\n\n$$ Q = n \\cdot q_e = 2 \\cdot 1.602 \\cdot 10^{-19} = 3.204 \\cdot 10^{-19}\\ \\mathrm{C} $$\n\n**Step 2: the balance of forces, solved for the voltage.** At equilibrium $F_\\mathrm{e} = F_\\mathrm{G}$, that is, $Q \\cdot \\dfrac{U}{d} = m \\cdot g$. We solve for *U*:\n\n$$ U = \\frac{m \\cdot g \\cdot d}{Q} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 3.3 \\cdot 10^{-15}\\ \\mathrm{kg} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nd = 6.0\\ \\mathrm{mm} = 6.0 \\cdot 10^{-3}\\ \\mathrm{m} \\\\\nQ = 3.204 \\cdot 10^{-19}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\nSubstitution:\n\n$$ U = \\frac{3.3 \\cdot 10^{-15} \\cdot 9.82 \\cdot 6.0 \\cdot 10^{-3}}{3.204 \\cdot 10^{-19}} = 607\\ \\mathrm{V} \\approx 610\\ \\mathrm{V} $$\n\n**Answer:** The voltage across the plates is about $610\\ \\mathrm{V}$.\n\n**General conclusion:** This is the experiment \"in reverse\": instead of measuring the voltage and calculating the charge, we start from a known charge (2 electrons) and ask what voltage is needed for equilibrium. The key is to first convert the number of electrons into a charge with $Q = n \\cdot q_e$."
   },
   {
    "level": 3,
    "question": "An oil drop hovers in equilibrium between two horizontal plates $8.0\\ \\mathrm{mm}$ apart with the voltage $5.0\\ \\mathrm{kV}$. The drop has 4 excess electrons. The density of the oil is $\\rho = 900\\ \\mathrm{kg/m^3}$. Determine the radius of the oil drop. Assume that the drop is spherical ($V = \\dfrac{4}{3}\\pi r^3$). ($q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$, $g = 9.82\\ \\mathrm{N/kg}$)",
    "answer": {
     "value": 2.2,
     "unit": "μm"
    },
    "solution": "**Step 1: the charge of the drop** (4 elementary charges):\n$$ Q = 4 \\cdot q_e = 4 \\cdot 1.602 \\cdot 10^{-19} = 6.41 \\cdot 10^{-19}\\ \\mathrm{C} $$\n\n**Step 2: the mass of the drop from the equilibrium.** When hovering, the electric force balances the gravitational force, and $\\mathbb{E} = U/d$:\n$$ Q \\cdot \\frac{U}{d} = m \\cdot g \\quad\\Rightarrow\\quad m = \\frac{Q \\cdot U}{d \\cdot g} = \\frac{6.41 \\cdot 10^{-19} \\cdot 5\\,000}{0.0080 \\cdot 9.82} = 4.08 \\cdot 10^{-14}\\ \\mathrm{kg} $$\n\n**Step 3: the radius from the mass and density.** The mass is density multiplied by the volume of the sphere:\n$$ m = \\rho \\cdot \\frac{4}{3}\\pi r^3 \\quad\\Rightarrow\\quad r = \\sqrt[3]{\\frac{3m}{4\\pi\\rho}} $$\n$$ r = \\sqrt[3]{\\frac{3 \\cdot 4.08 \\cdot 10^{-14}}{4\\pi \\cdot 900}} = \\sqrt[3]{1.08 \\cdot 10^{-17}} = 2.2 \\cdot 10^{-6}\\ \\mathrm{m} = 2.2\\ \\mathrm{\\mu m} $$\n\n**Answer:** The radius of the oil drop is about $2.2\\ \\mathrm{\\mu m}$.\n\n**General conclusion:** The task combines Millikan's equilibrium, the field between plates *and* the relationship between mass, density and the volume of a sphere, and in the end requires a cube root. It was precisely by determining the size of the drop (from its falling time) that Millikan could find its mass and thereby the elementary charge."
   }
  ]
 },
 "fy1-8.1": {
  "kalla": "740b453ab3",
  "data": [
   {
    "level": 1,
    "question": "Two spaceships are approaching each other, each with the speed $0.60c$. One ship sends a light pulse towards the other. With what speed does the receiving ship measure the light pulse?",
    "choices": [
     "$1.2c$: the speeds of the ships ($0.60c + 0.60c$) are added to that of the light.",
     "$1.6c$: the ship's own speed ($0.60c$) is added to that of the light ($c$).",
     "$c$: the speed of light is the same regardless of how the source and observer move.",
     "$0.60c$: the light is slowed down to the speed of the ships."
    ],
    "correct": 2,
    "solution": "The speed of light in a vacuum is **always** $c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$, regardless of how the light source or the observer moves. So the receiving ship measures the light pulse as $c$, neither more nor less.\n\n**Answer:** Option C: $c$.\n\n**General conclusion:** This is the fundamental postulate of the theory of relativity and was confirmed by the Michelson–Morley experiment. Velocities are not \"added\" in the usual way when light is involved; otherwise the answer would have been $1.2c$, which is wrong. It is precisely the constancy of $c$ that forces time dilation and length contraction."
   },
   {
    "level": 1,
    "question": "A spacecraft moves past the Earth with the speed $0.60c$. A process on board takes $t_0 = 10\\ \\mathrm{s}$ (proper time). How long does the same process take as seen from the Earth? ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 12.5,
     "unit": "s"
    },
    "solution": "The time as seen from outside is found from the time dilation formula:\n\n$$ t = \\frac{t_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}} $$\n\nHere $t_0$ is the proper time (on board) and $v = 0.60c$. Since $v$ is given as a fraction of $c$, $c$ cancels:\n\n$$\n\\left[ \\begin{array}{l}\nt_0 = 10\\ \\mathrm{s} \\\\\n\\dfrac{v^2}{c^2} = (0.60)^2 = 0.36\n\\end{array} \\right]\n$$\n\n$$ t = \\frac{10}{\\sqrt{1 - 0.36}} = \\frac{10}{\\sqrt{0.64}} = \\frac{10}{0.80} = 12.5\\ \\mathrm{s} $$\n\n**Answer:** The process takes $12.5\\ \\mathrm{s}$ as seen from the Earth.\n\n**General conclusion:** The outside observer always measures a *longer* time ($t > t_0$): \"moving clocks run slow\". The proper time $t_0$ is the shortest possible and is measured by whoever moves along with the process."
   },
   {
    "level": 1,
    "question": "How much energy corresponds to the mass $1.0\\ \\mathrm{g}$ according to Einstein's relationship $E = m \\cdot c^2$? ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 90000000000000,
     "unit": "J"
    },
    "solution": "We substitute into $E = m \\cdot c^2$:\n\n$$\n\\left[ \\begin{array}{l}\nm = 1.0\\ \\mathrm{g} = 1.0 \\cdot 10^{-3}\\ \\mathrm{kg} \\\\\nc \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}\n\\end{array} \\right]\n$$\n\n$$ E = 1.0 \\cdot 10^{-3} \\cdot (2.998 \\cdot 10^8)^2 = 9.0 \\cdot 10^{13}\\ \\mathrm{J} $$\n\n**Answer:** The energy is about $9.0 \\cdot 10^{13}\\ \\mathrm{J}$.\n\n**General conclusion:** Since $c^2$ is an enormous number, even a tiny mass corresponds to a gigantic energy: $9 \\cdot 10^{13}\\ \\mathrm{J}$ is enough to supply an electrically heated detached house (about 25 000 kWh per year) with electricity for about a thousand years. This is the principle behind nuclear power and the energy production of the Sun."
   },
   {
    "level": 2,
    "question": "A spacecraft is $120\\ \\mathrm{m}$ long when measured at rest. How long is the spacecraft as seen from the Earth when it passes with the speed $0.80c$? ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 72,
     "unit": "m"
    },
    "solution": "The length in the direction of motion shrinks according to the length contraction formula:\n\n$$ l = l_0 \\cdot \\sqrt{1 - \\frac{v^2}{c^2}} $$\n\nwhere $l_0 = 120\\ \\mathrm{m}$ is the rest length and $v = 0.80c$:\n\n$$\n\\left[ \\begin{array}{l}\nl_0 = 120\\ \\mathrm{m} \\\\\n\\dfrac{v^2}{c^2} = (0.80)^2 = 0.64\n\\end{array} \\right]\n$$\n\n$$ l = 120 \\cdot \\sqrt{1 - 0.64} = 120 \\cdot \\sqrt{0.36} = 120 \\cdot 0.60 = 72\\ \\mathrm{m} $$\n\n**Answer:** The spacecraft is $72\\ \\mathrm{m}$ long as seen from the Earth.\n\n**General conclusion:** The contraction happens **only in the direction of motion**: the width and height of the spacecraft are unchanged. Someone *on board*, on the other hand, always measures the rest length $120\\ \\mathrm{m}$; nobody on board notices that anything has shrunk."
   },
   {
    "level": 2,
    "question": "A proton has the rest mass $m_0 = 1.67 \\cdot 10^{-27}\\ \\mathrm{kg}$. What is the (relativistic) mass of the proton when it has been accelerated to the speed $0.80c$? ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 2.8e-27,
     "unit": "kg"
    },
    "solution": "The mass as seen from outside grows according to\n\n$$ m = \\frac{m_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}} $$\n\nWith $v = 0.80c$:\n\n$$\n\\left[ \\begin{array}{l}\nm_0 = 1.67 \\cdot 10^{-27}\\ \\mathrm{kg} \\\\\n\\dfrac{v^2}{c^2} = (0.80)^2 = 0.64\n\\end{array} \\right]\n$$\n\n$$ m = \\frac{1.67 \\cdot 10^{-27}}{\\sqrt{1 - 0.64}} = \\frac{1.67 \\cdot 10^{-27}}{0.60} = 2.8 \\cdot 10^{-27}\\ \\mathrm{kg} $$\n\n**Answer:** The mass of the proton becomes about $2.8 \\cdot 10^{-27}\\ \\mathrm{kg}$, just under twice the rest mass.\n\n**General conclusion:** The fact that the mass increases with speed is exactly why no object with rest mass can reach $c$: the closer to $c$, the larger the mass and the more force is needed to accelerate further; at $v = c$ the mass would become infinite. The effect has been confirmed in particle accelerators."
   },
   {
    "level": 3,
    "question": "A muon is created high up in the atmosphere and moves straight down towards the ground with the speed $0.995c$. The mean lifetime of the muon is $t_0 = 2.2\\ \\mathrm{\\mu s}$ (proper time, measured in the muon's own frame). How far does the muon travel in the **ground's** frame of reference before it decays, on average? ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 6.6,
     "unit": "km"
    },
    "solution": "The crucial thing is to know *which* time should be used in which frame of reference; this is where most people go wrong.\n\n**The naive (incorrect) calculation** treats $2.2\\ \\mathrm{\\mu s}$ as if it applied in the ground's frame:\n\n$$ d_\\text{naive} = v \\cdot t_0 = 0.995 \\cdot 2.998 \\cdot 10^8 \\cdot 2.2 \\cdot 10^{-6} \\approx 660\\ \\mathrm{m} $$\n\nThen the muon would never reach the ground (it is formed several kilometres up). But $2.2\\ \\mathrm{\\mu s}$ is the **proper time**, the muon's *own* clock. In the ground's frame the muon's clock runs slow, so the process takes longer:\n\n$$ t = \\frac{t_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}} = \\frac{2.2 \\cdot 10^{-6}}{\\sqrt{1 - 0.995^2}} = \\frac{2.2 \\cdot 10^{-6}}{\\sqrt{0.009975}} = \\frac{2.2 \\cdot 10^{-6}}{0.0999} = 2.2 \\cdot 10^{-5}\\ \\mathrm{s} $$\n\nThe distance in the ground's frame is then\n\n$$ d = v \\cdot t = 0.995 \\cdot 2.998 \\cdot 10^8 \\cdot 2.2 \\cdot 10^{-5} \\approx 6\\,600\\ \\mathrm{m} = 6.6\\ \\mathrm{km} $$\n\n**Answer:** The muon travels about $6.6\\ \\mathrm{km}$, ten times further than the naive calculation, enough to reach the ground.\n\n**General conclusion:** The same result is obtained from the muon's *own* frame through **length contraction**: there the muon lives only $2.2\\ \\mathrm{\\mu s}$, but the distance down to the ground is contracted by the same factor (about 10), so $6.6\\ \\mathrm{km}$ shrinks to $\\approx 660\\ \\mathrm{m}$, which the muon has time to cover. Both frames of reference agree that the muon reaches the ground; they only disagree about *why* (stretched time versus shrunk distance). That muons from the atmosphere really are detected at ground level is one of the strongest pieces of experimental evidence for the theory of relativity."
   }
  ]
 },
 "fy1-9.1": {
  "kalla": "026897b3fa",
  "data": [
   {
    "level": 1,
    "question": "The protons in an atomic nucleus are positively charged and ought to repel each other. Which force nevertheless holds the nucleus together?",
    "choices": [
     "The strong nuclear force.",
     "The gravitational force between the nucleons.",
     "The electromagnetic force.",
     "The inertial force from the rotation of the nucleus."
    ],
    "correct": 0,
    "solution": "The **strong nuclear force** (the strong interaction) holds protons and neutrons together in the nucleus. It is much stronger than the electric repulsion, but acts only over extremely short distances (about $10^{-15}\\ \\mathrm{m}$).\n\n**Answer:** Option A: the strong nuclear force.\n\n**General conclusion:** Gravity between such small masses is vanishingly weak, and the electromagnetic force *pushes* the protons apart. The fact that the strong force has such a short range means that really large nuclei become unstable and decay: there, the repulsion \"wins\" over distance."
   },
   {
    "level": 1,
    "question": "Uranium-238 has the atomic number $Z = 92$. How many neutrons are there in the nucleus?",
    "answer": {
     "value": 146,
     "unit": ""
    },
    "solution": "The mass number *A* is the total number of nucleons (protons + neutrons), and the atomic number *Z* is the number of protons. The number of neutrons is the difference:\n\n$$ N = A - Z = 238 - 92 = 146 $$\n\n**Answer:** The nucleus has $146$ neutrons.\n\n**General conclusion:** In the notation $_{Z}^{A}\\mathrm{X}$ the mass number is at the top and the atomic number at the bottom. The number of neutrons is rarely written out; it is always calculated as $A - Z$."
   },
   {
    "level": 1,
    "question": "What characterises two **isotopes** of the same element?",
    "choices": [
     "The same number of protons but different numbers of neutrons.",
     "The same number of neutrons but different numbers of protons.",
     "Different numbers of protons and different numbers of electrons.",
     "The same mass number but different atomic numbers."
    ],
    "correct": 0,
    "solution": "Isotopes of an element have **the same atomic number** *Z* (the same number of protons; otherwise it would be a different element) but **different mass numbers** *A*, since they have different numbers of neutrons.\n\n**Answer:** Option A.\n\n**General conclusion:** Hydrogen, for example, has three isotopes: protium ($^1\\mathrm{H}$, 0 neutrons), deuterium ($^2\\mathrm{H}$, 1 neutron) and tritium ($^3\\mathrm{H}$, 2 neutrons), all with $Z = 1$."
   },
   {
    "level": 2,
    "question": "An atomic nucleus contains 26 protons and 30 neutrons. What is the mass number of the nucleus?",
    "answer": {
     "value": 56,
     "unit": ""
    },
    "solution": "The mass number is the total number of nucleons:\n\n$$ A = (\\text{number of protons}) + (\\text{number of neutrons}) = 26 + 30 = 56 $$\n\n**Answer:** The mass number is $56$.\n\n**General conclusion:** The atomic number $Z = 26$ also reveals the element: it is **iron** (Fe). The nucleus is written $_{26}^{56}\\mathrm{Fe}$. This particular nucleus is among the most stable there are."
   },
   {
    "level": 2,
    "question": "How large is the total positive electric charge in an iron nucleus, which has 26 protons? The elementary charge is $1.602 \\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 4.2e-18,
     "unit": "C"
    },
    "solution": "Each proton carries one elementary charge, so the charge of the nucleus is the number of protons multiplied by the elementary charge:\n\n$$ Q = Z \\cdot q_e $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nZ = 26 \\\\\nq_e \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C}\n\\end{array} \\right]\n$$\n\n$$ Q = 26 \\cdot 1.602 \\cdot 10^{-19} = 4.2 \\cdot 10^{-18}\\ \\mathrm{C} $$\n\n**Answer:** The charge of the nucleus is about $4.2 \\cdot 10^{-18}\\ \\mathrm{C}$.\n\n**General conclusion:** The neutrons do not contribute, since they are uncharged. It is the atomic number *Z* (the number of protons) alone that determines the charge of the nucleus."
   },
   {
    "level": 3,
    "question": "Two protons in an atomic nucleus are $2.0\\ \\mathrm{fm}$ ($2.0 \\cdot 10^{-15}\\ \\mathrm{m}$) from each other. How large is the electric repulsion between them? ($k \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2}$, $q_e = 1.602 \\cdot 10^{-19}\\ \\mathrm{C}$)",
    "answer": {
     "value": 58,
     "unit": "N"
    },
    "solution": "The protons both have the charge $q_e$. The electric force is given by Coulomb's law:\n\n$$ F = k \\cdot \\frac{q_e^2}{r^2} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nk \\approx 8.99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2 / C^2} \\\\\nq_e \\approx 1.602 \\cdot 10^{-19}\\ \\mathrm{C} \\\\\nr = 2.0 \\cdot 10^{-15}\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ F = 8.99 \\cdot 10^9 \\cdot \\frac{(1.602 \\cdot 10^{-19})^2}{(2.0 \\cdot 10^{-15})^2} = 58\\ \\mathrm{N} $$\n\n**Answer:** The repulsion is about $58\\ \\mathrm{N}$.\n\n**General conclusion:** Think how incredibly large that force is: $58\\ \\mathrm{N}$ (like lifting a 6 kg parcel) between **two individual protons**! This is exactly why there *must* be an even stronger force holding the nucleus together: the **strong nuclear force**. This task shows quantitatively why it is needed: the electric repulsion at nuclear distances is enormous."
   }
  ]
 },
 "fy1-9.2": {
  "kalla": "36d231f749",
  "data": [
   {
    "level": 1,
    "question": "The nucleus of helium-3 has the mass defect $\\Delta m = 0.00829\\ \\mathrm{u}$. Calculate the binding energy of the nucleus. Answer in MeV. ($1\\ \\mathrm{u} = 931.49\\ \\mathrm{MeV}$)",
    "answer": {
     "value": 7.7,
     "unit": "MeV"
    },
    "solution": "The mass defect corresponds to the binding energy. With the conversion factor $1\\ \\mathrm{u} = 931.49\\ \\mathrm{MeV}$ we can go directly from the mass defect in u to the energy in MeV:\n\n$$ E = \\Delta m \\cdot 931.49 = 0.00829 \\cdot 931.49 = 7.72\\ \\mathrm{MeV} $$\n\n**Answer:** The binding energy is about $7.7\\ \\mathrm{MeV}$.\n\n**General conclusion:** The factor $931.49\\ \\mathrm{MeV/u}$ comes from $E = mc^2$ applied to $1\\ \\mathrm{u}$; it saves you the step of converting to kg and joules when calculating with nuclear masses."
   },
   {
    "level": 1,
    "question": "A nuclear reaction releases the energy $2.5\\ \\mathrm{MeV}$. How many joules is that? ($1\\ \\mathrm{eV} = 1.602 \\cdot 10^{-19}\\ \\mathrm{J}$)",
    "answer": {
     "value": 4e-13,
     "unit": "J"
    },
    "solution": "We convert megaelectronvolts to joules. $1\\ \\mathrm{MeV} = 10^6\\ \\mathrm{eV}$, and each eV is $1.602 \\cdot 10^{-19}\\ \\mathrm{J}$:\n\n$$ E = 2.5 \\cdot 10^6 \\cdot 1.602 \\cdot 10^{-19} = 4.0 \\cdot 10^{-13}\\ \\mathrm{J} $$\n\n**Answer:** The energy is about $4.0 \\cdot 10^{-13}\\ \\mathrm{J}$.\n\n**General conclusion:** The electronvolt is a handy unit for the tiny energies of individual particles and nuclei; otherwise the number of joules becomes impractically small."
   },
   {
    "level": 1,
    "question": "A nucleus has the mass defect $\\Delta m = 5.0 \\cdot 10^{-30}\\ \\mathrm{kg}$. Calculate the binding energy in joules. ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 4.5e-13,
     "unit": "J"
    },
    "solution": "The binding energy is found from Einstein's relationship with the mass defect in kilograms:\n\n$$ E = \\Delta m \\cdot c^2 = 5.0 \\cdot 10^{-30} \\cdot (2.998 \\cdot 10^8)^2 = 4.5 \\cdot 10^{-13}\\ \\mathrm{J} $$\n\n**Answer:** The binding energy is about $4.5 \\cdot 10^{-13}\\ \\mathrm{J}$.\n\n**General conclusion:** This is the same thing as in the previous task, but without the shortcut: when the mass defect is already in kg you use $E = \\Delta m c^2$ directly. If you convert the answer to MeV you get $\\approx 2.8\\ \\mathrm{MeV}$."
   },
   {
    "level": 2,
    "question": "The nucleus of helium-4 consists of 2 protons and 2 neutrons. Calculate the binding energy of the nucleus in MeV.\n$$\n\\left[ \\begin{array}{l}\nm_\\text{proton} = 1.00728\\ \\mathrm{u} \\\\\nm_\\text{neutron} = 1.00866\\ \\mathrm{u} \\\\\nm_\\text{nucleus}(\\mathrm{He}\\text{-}4) = 4.00150\\ \\mathrm{u} \\\\\n1\\ \\mathrm{u} = 931.49\\ \\mathrm{MeV}\n\\end{array} \\right]\n$$",
    "answer": {
     "value": 28.3,
     "unit": "MeV"
    },
    "solution": "We compare the mass of the free building blocks with the mass of the assembled nucleus.\n\n**The mass of the building blocks:**\n$$ m_\\text{particles} = 2 \\cdot 1.00728 + 2 \\cdot 1.00866 = 4.03188\\ \\mathrm{u} $$\n\n**The mass defect** (the building blocks minus the nucleus):\n$$ \\Delta m = m_\\text{particles} - m_\\text{nucleus} = 4.03188 - 4.00150 = 0.03038\\ \\mathrm{u} $$\n\n**The binding energy:**\n$$ E = \\Delta m \\cdot 931.49 = 0.03038 \\cdot 931.49 = 28.3\\ \\mathrm{MeV} $$\n\n**Answer:** The binding energy is about $28.3\\ \\mathrm{MeV}$.\n\n**General conclusion:** The assembled nucleus has *less* mass than its separate building blocks: the \"missing\" mass has become binding energy. This is the energy that would be needed to pull the nucleus completely apart."
   },
   {
    "level": 2,
    "question": "A nucleus with mass number $A = 56$ has the total binding energy $492\\ \\mathrm{MeV}$. Calculate the binding energy **per nucleon**.",
    "answer": {
     "value": 8.8,
     "unit": "MeV"
    },
    "solution": "The binding energy per nucleon is the total binding energy divided by the number of nucleons (= the mass number):\n\n$$ \\frac{E}{A} = \\frac{492}{56} = 8.79\\ \\mathrm{MeV/nucleon} $$\n\n**Answer:** The binding energy per nucleon is about $8.8\\ \\mathrm{MeV/nucleon}$.\n\n**General conclusion:** The binding energy *per nucleon* is a better measure of how stable a nucleus is than the total binding energy. It reaches its maximum (about $8.8\\ \\mathrm{MeV}$) right around iron ($A = 56$), which is why both fusion of light nuclei and fission of heavy nuclei release energy: both move \"towards iron\"."
   },
   {
    "level": 3,
    "question": "The Sun radiates energy with the power $P = 3.8 \\cdot 10^{26}\\ \\mathrm{W}$. How much mass is converted into energy in the Sun each second? ($c \\approx 2.998 \\cdot 10^8\\ \\mathrm{m/s}$)",
    "answer": {
     "value": 4200000000,
     "unit": "kg/s"
    },
    "solution": "Power is energy per time, so the energy radiated during one second is\n\n$$ E = P \\cdot t = 3.8 \\cdot 10^{26} \\cdot 1.0 = 3.8 \\cdot 10^{26}\\ \\mathrm{J} $$\n\nThat energy comes from mass that has been converted according to $E = m c^2$. We solve for the mass:\n\n$$ m = \\frac{E}{c^2} = \\frac{3.8 \\cdot 10^{26}}{(2.998 \\cdot 10^8)^2} = 4.2 \\cdot 10^9\\ \\mathrm{kg} $$\n\n**Answer:** The Sun converts about $4.2 \\cdot 10^9\\ \\mathrm{kg}$ of mass into energy each second.\n\n**General conclusion:** That is just over four million tonnes per second, but the Sun is so enormously massive that it still lasts for billions of years. The insight is to combine the definition of power ($P = E/t$) with the mass–energy relationship ($E = mc^2$): the loss of mass per unit time becomes $m/t = P/c^2$."
   }
  ]
 },
 "fy1-9.3": {
  "kalla": "f4a1aae419",
  "data": [
   {
    "level": 1,
    "question": "In which decay does the nucleus emit a helium nucleus ($_2^4\\mathrm{He}$)?",
    "choices": [
     "α decay.",
     "β⁻ decay.",
     "β⁺ decay.",
     "γ decay."
    ],
    "correct": 0,
    "solution": "In **α decay** a helium nucleus $_2^4\\mathrm{He}$ (two protons and two neutrons) is emitted. The mass number then decreases by 4 and the atomic number by 2.\n\n**Answer:** Option A: α decay.\n\n**General conclusion:** In β decay an electron or a positron is emitted (the mass number is unchanged), and in γ decay a photon (neither the mass number nor the atomic number changes)."
   },
   {
    "level": 1,
    "question": "Polonium-210 has the atomic number $Z = 84$ and undergoes α decay. What **mass number** does the daughter nucleus have?",
    "answer": {
     "value": 206,
     "unit": ""
    },
    "solution": "In α decay $_2^4\\mathrm{He}$ is emitted, so the mass number decreases by 4:\n\n$$ _{84}^{210}\\mathrm{Po} \\rightarrow {_{82}^{206}}\\mathrm{Pb} + {_2^4}\\mathrm{He} $$\n\n$$ A_\\text{daughter} = 210 - 4 = 206 $$\n\n**Answer:** The daughter nucleus has the mass number $206$.\n\n**General conclusion:** At the same time the atomic number decreases by 2 ($84 \\to 82$), so the daughter nucleus is lead-206. Always check that the mass number *and* the atomic number balance on both sides of the arrow."
   },
   {
    "level": 1,
    "question": "In β⁻ decay a neutron is converted into a proton (plus an electron and a neutrino). How does the atomic number *Z* change?",
    "choices": [
     "It increases by 1.",
     "It decreases by 1.",
     "It decreases by 2.",
     "It is unchanged."
    ],
    "correct": 0,
    "solution": "In β⁻ decay a neutron becomes a proton. The number of protons then increases by 1, so **the atomic number increases by 1**. The mass number *A* is unchanged (a nucleon just changes type).\n\n$$ _Z^A\\mathrm{X} \\rightarrow {_{Z+1}^{A}}\\mathrm{Y} + {_{-1}^{0}}\\mathrm{e} + \\nu $$\n\n**Answer:** Option A: it increases by 1.\n\n**General conclusion:** In β⁺ decay it is the other way round: a proton becomes a neutron, so the atomic number *decreases* by 1."
   },
   {
    "level": 2,
    "question": "Sodium-22 has the atomic number $Z = 11$ and undergoes β⁺ decay. What **atomic number** does the daughter nucleus have?",
    "answer": {
     "value": 10,
     "unit": ""
    },
    "solution": "In β⁺ decay a proton is converted into a neutron, so the atomic number decreases by 1 (the mass number is unchanged):\n\n$$ _{11}^{22}\\mathrm{Na} \\rightarrow {_{10}^{22}}\\mathrm{Ne} + {_1^0}\\mathrm{e} + \\nu $$\n\n$$ Z_\\text{daughter} = 11 - 1 = 10 $$\n\n**Answer:** The daughter nucleus has the atomic number $10$ (neon).\n\n**General conclusion:** Checking the balance: mass number $22 = 22 + 0$ ✓, atomic number $11 = 10 + 1 + 0$ ✓ (the positron counts as charge $+1$). The balancing is the whole point of decay equations."
   },
   {
    "level": 2,
    "question": "Radium-226 undergoes α decay to radon-222. Calculate the energy released in the decay. Answer in MeV.\n$$\n\\left[ \\begin{array}{l}\nm(\\mathrm{Ra}\\text{-}226) = 226.02541\\ \\mathrm{u} \\\\\nm(\\mathrm{Rn}\\text{-}222) = 222.01758\\ \\mathrm{u} \\\\\nm(\\mathrm{He}\\text{-}4) = 4.00260\\ \\mathrm{u} \\\\\n1\\ \\mathrm{u} = 931.49\\ \\mathrm{MeV}\n\\end{array} \\right]\n$$",
    "answer": {
     "value": 4.9,
     "unit": "MeV"
    },
    "solution": "The energy released comes from the mass defect, the difference between the mass of the parent nucleus and the combined mass of the products:\n\n$$ \\Delta m = m(\\mathrm{Ra}) - \\big(m(\\mathrm{Rn}) + m(\\mathrm{He})\\big) $$\n\n$$ \\Delta m = 226.02541 - (222.01758 + 4.00260) = 0.00523\\ \\mathrm{u} $$\n\nThe energy is found with the conversion factor:\n\n$$ E = 0.00523 \\cdot 931.49 = 4.87\\ \\mathrm{MeV} \\approx 4.9\\ \\mathrm{MeV} $$\n\n**Answer:** About $4.9\\ \\mathrm{MeV}$ is released.\n\n**General conclusion:** In α and γ decay you can use the atomic masses directly, since the number of electrons balances (here 88 on the left = 86 + 2 on the right). In β decay the number of electrons changes, and then you have to be more careful with the electron masses."
   },
   {
    "level": 3,
    "question": "Uranium-238 ($Z = 92$) decays in a long chain of α and β⁻ decays and finally ends up as the stable nucleus lead-206 ($Z = 82$). How many α decays and how many β⁻ decays take place in total in the whole chain?",
    "solution": "This cannot be solved step by step without knowing each intermediate step. Instead, we set up two equations, one for the mass number and one for the atomic number, and use the fact that only α decays change the mass number.\n\n**The mass number** is changed only by α decays (each α decreases *A* by 4; β⁻ does not change *A*). Total decrease:\n\n$$ \\Delta A = 238 - 206 = 32 \\quad\\Rightarrow\\quad 4 \\cdot n_\\alpha = 32 \\quad\\Rightarrow\\quad n_\\alpha = 8 $$\n\n**The atomic number** is changed by both: each α decreases *Z* by 2, each β⁻ increases *Z* by 1. Total change:\n\n$$ \\Delta Z = 82 - 92 = -10 $$\n$$ -2 \\cdot n_\\alpha + 1 \\cdot n_\\beta = -10 $$\n\nSubstitute $n_\\alpha = 8$:\n\n$$ -16 + n_\\beta = -10 \\quad\\Rightarrow\\quad n_\\beta = 6 $$\n\n**Answer:** The chain contains $8$ α decays and $6$ β⁻ decays.\n\n**General conclusion:** The key is to **decouple the two unknowns**: the mass number depends *only* on the number of α decays, so $n_\\alpha$ can be solved on its own first. Then the atomic number gives $n_\\beta$. This is the real decay chain of uranium-238, which ends in lead by way of radium and radon."
   }
  ]
 },
 "fy1-9.4": {
  "kalla": "6bd89116ec",
  "data": [
   {
    "level": 1,
    "question": "A radioactive sample has the activity $800\\ \\mathrm{Bq}$ and the half-life $8.0$ days. What is the activity after $24$ days?",
    "answer": {
     "value": 100,
     "unit": "Bq"
    },
    "solution": "The time $24$ days corresponds to $24 / 8.0 = 3$ half-lives. The law of activity gives\n\n$$ A = A_0 \\cdot 0.5^{\\,t / T_{1/2}} = 800 \\cdot 0.5^{\\,24/8.0} = 800 \\cdot 0.5^{3} = 800 \\cdot 0.125 = 100\\ \\mathrm{Bq} $$\n\n**Answer:** The activity is $100\\ \\mathrm{Bq}$.\n\n**General conclusion:** After each half-life the activity is halved: $800 \\to 400 \\to 200 \\to 100$. When the time is a *whole* number of half-lives, you can halve your way there in your head."
   },
   {
    "level": 1,
    "question": "A radioactive isotope has the half-life $T_{1/2} = 5.0\\ \\mathrm{s}$. Calculate the decay constant *λ*.",
    "answer": {
     "value": 0.14,
     "unit": "1/s"
    },
    "solution": "The decay constant is related to the half-life by\n\n$$ \\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0.693}{5.0} = 0.14\\ \\mathrm{s^{-1}} $$\n\n**Answer:** The decay constant is about $0.14\\ \\mathrm{s^{-1}}$.\n\n**General conclusion:** The shorter the half-life, the larger the decay constant: the sample decays faster. $\\ln 2 \\approx 0.693$."
   },
   {
    "level": 1,
    "question": "What **proportion** of a radioactive sample remains after $4$ half-lives? Answer in per cent.",
    "answer": {
     "value": 6.25,
     "unit": "%"
    },
    "solution": "After each half-life, half remains. After 4 half-lives:\n\n$$ \\frac{N}{N_0} = 0.5^{4} = 0.0625 = 6.25\\ \\% $$\n\n**Answer:** About $6.25\\ \\%$ remains.\n\n**General conclusion:** The halvings give $100 \\to 50 \\to 25 \\to 12.5 \\to 6.25\\ \\%$. After only 10 half-lives just a thousandth remains ($0.5^{10} \\approx 0.001$); this is why the carbon-14 method runs out at around 50 000 years."
   },
   {
    "level": 2,
    "question": "A sample of caesium-137 ($T_{1/2} = 30\\ \\mathrm{years}$) has an activity of $2.0\\ \\mathrm{MBq}$ today. What will the activity be in $50$ years?",
    "answer": {
     "value": 0.63,
     "unit": "MBq"
    },
    "solution": "Here the time is not a whole number of half-lives, so we use the law of activity directly:\n\n$$ A = A_0 \\cdot 0.5^{\\,t / T_{1/2}} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nA_0 = 2.0\\ \\mathrm{MBq} \\\\\nt = 50\\ \\mathrm{years} \\\\\nT_{1/2} = 30\\ \\mathrm{years}\n\\end{array} \\right]\n$$\n\n$$ A = 2.0 \\cdot 0.5^{\\,50/30} = 2.0 \\cdot 0.5^{1.667} = 2.0 \\cdot 0.315 = 0.63\\ \\mathrm{MBq} $$\n\n**Answer:** The activity is about $0.63\\ \\mathrm{MBq}$.\n\n**General conclusion:** The exponent $t/T_{1/2}$ does not have to be a whole number: the calculator handles $0.5^{1.667}$. However, the time and the half-life must be given in *the same* unit (here years), otherwise the exponent will be wrong."
   },
   {
    "level": 2,
    "question": "A radioactive sample has the activity $1.0 \\cdot 10^6\\ \\mathrm{Bq}$ and the decay constant $\\lambda = 2.0 \\cdot 10^{-8}\\ \\mathrm{s^{-1}}$. How many radioactive nuclei does the sample contain?",
    "answer": {
     "value": 50000000000000,
     "unit": ""
    },
    "solution": "The activity is proportional to the number of nuclei: $A = \\lambda \\cdot N$. We solve for the number of nuclei *N*:\n\n$$ N = \\frac{A}{\\lambda} = \\frac{1.0 \\cdot 10^6}{2.0 \\cdot 10^{-8}} = 5.0 \\cdot 10^{13}\\ \\text{nuclei} $$\n\n**Answer:** The sample contains about $5.0 \\cdot 10^{13}$ radioactive nuclei.\n\n**General conclusion:** The activity ($10^6$ decays per second) feels high, but since each individual nucleus decays so rarely ($\\lambda$ is tiny), an enormous number of nuclei is needed to give that activity."
   },
   {
    "level": 2,
    "question": "A radioactive sample has the activity $5\\,000\\ \\mathrm{Bq}$. Exactly $8.0$ hours later the activity has fallen to $1\\,400\\ \\mathrm{Bq}$. Determine the half-life of the sample.",
    "answer": {
     "value": 4.4,
     "unit": "h"
    },
    "solution": "The law of activity applies, but now it is the half-life $T_{1/2}$ that is unknown and sits in the exponent, so we have to take logarithms.\n\n$$ A = A_0 \\cdot 0.5^{\\,t / T_{1/2}} \\quad\\Rightarrow\\quad \\frac{A}{A_0} = 0.5^{\\,t / T_{1/2}} $$\n\nSubstitute the measured values:\n\n$$ \\frac{1\\,400}{5\\,000} = 0.280 = 0.5^{\\,8.0 / T_{1/2}} $$\n\nTake the logarithm of both sides (lg = log₁₀) and use the logarithm law $\\lg(a^x) = x \\lg a$:\n\n$$ \\lg 0.280 = \\frac{8.0}{T_{1/2}} \\cdot \\lg 0.5 $$\n\nSolve for $T_{1/2}$:\n\n$$ T_{1/2} = \\frac{8.0 \\cdot \\lg 0.5}{\\lg 0.280} = \\frac{8.0 \\cdot (-0.301)}{-0.553} = 4.4\\ \\mathrm{h} $$\n\n**Answer:** The half-life is about $4.4$ hours.\n\n**General conclusion:** When the unknown quantity sits in the exponent, substitution is not enough: you have to take logarithms. Reasonableness check: the activity went from 5000 to 1400 Bq (just under a third left) in 8 hours, which is just under two half-lives ($0.5^{1.8} \\approx 0.29$), which fits with $T_{1/2} \\approx 4.4\\ \\mathrm{h}$."
   },
   {
    "level": 3,
    "question": "A cobalt-60 radiation source has the activity $8.0 \\cdot 10^9\\ \\mathrm{Bq}$. How many **grams** of cobalt-60 does the source contain? Cobalt-60 has the half-life $T_{1/2} = 5.27\\ \\mathrm{years}$ and the molar mass $60\\ \\mathrm{g/mol}$. ($N_\\mathrm{A} = 6.022 \\cdot 10^{23}\\ \\mathrm{mol^{-1}}$, $1\\ \\mathrm{year} = 3.156 \\cdot 10^7\\ \\mathrm{s}$)",
    "answer": {
     "value": 0.00019,
     "unit": "g"
    },
    "solution": "The activity gives *decays per second*, but the question is about a *mass*. The bridge goes through the number of atomic nuclei: activity → number of nuclei → amount of substance → mass. It is not one calculation step but a chain of three relationships.\n\n**Step 1: the decay constant** (the half-life must be in seconds):\n$$ T_{1/2} = 5.27 \\cdot 3.156 \\cdot 10^7 = 1.663 \\cdot 10^8\\ \\mathrm{s} $$\n$$ \\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0.693}{1.663 \\cdot 10^8} = 4.17 \\cdot 10^{-9}\\ \\mathrm{s^{-1}} $$\n\n**Step 2: the number of radioactive nuclei** from $A = \\lambda N$:\n$$ N = \\frac{A}{\\lambda} = \\frac{8.0 \\cdot 10^9}{4.17 \\cdot 10^{-9}} = 1.92 \\cdot 10^{18}\\ \\text{nuclei} $$\n\n**Step 3: the mass** using Avogadro's constant and the molar mass:\n$$ m = \\frac{N}{N_\\mathrm{A}} \\cdot M = \\frac{1.92 \\cdot 10^{18}}{6.022 \\cdot 10^{23}} \\cdot 60 = 1.9 \\cdot 10^{-4}\\ \\mathrm{g} $$\n\n**Answer:** The source contains about $1.9 \\cdot 10^{-4}\\ \\mathrm{g}$ (about $0.19\\ \\mathrm{mg}$) of cobalt-60.\n\n**General conclusion:** The striking result is how **small** a mass gives such a high activity: just under a fifth of a milligram decays eight billion times per second. What makes the task advanced is not any single formula but *linking* nuclear physics (activity, half-life) with the chemistry concept of amount of substance (Avogadro's constant). A common trap is forgetting to convert the half-life to seconds before calculating $\\lambda$."
   }
  ]
 },
 "fy1-9.5": {
  "kalla": "3b414d3a1b",
  "data": [
   {
    "level": 1,
    "question": "A body tissue with mass $2.0\\ \\mathrm{kg}$ absorbs the radiation energy $0.80\\ \\mathrm{J}$. Calculate the absorbed dose.",
    "answer": {
     "value": 0.4,
     "unit": "Gy"
    },
    "solution": "The absorbed dose is the absorbed energy per kilogram of tissue:\n\n$$ D = \\frac{E}{m} = \\frac{0.80}{2.0} = 0.40\\ \\mathrm{Gy} $$\n\n**Answer:** The absorbed dose is $0.40\\ \\mathrm{Gy}$.\n\n**General conclusion:** $1\\ \\mathrm{Gy} = 1\\ \\mathrm{J/kg}$. The limit for acute radiation sickness is at about $1\\ \\mathrm{Gy}$."
   },
   {
    "level": 1,
    "question": "A person receives the absorbed dose $0.20\\ \\mathrm{Gy}$ from α radiation, which has the quality factor $Q = 20$. Calculate the equivalent dose.",
    "answer": {
     "value": 4,
     "unit": "Sv"
    },
    "solution": "The equivalent dose takes into account how harmful the type of radiation is through the quality factor *Q*:\n\n$$ H = D \\cdot Q = 0.20 \\cdot 20 = 4.0\\ \\mathrm{Sv} $$\n\n**Answer:** The equivalent dose is $4.0\\ \\mathrm{Sv}$.\n\n**General conclusion:** α radiation is very harmful *inside* the body ($Q = 20$), whereas β and γ radiation have $Q = 1$. The same absorbed dose (Gy) therefore gives an equivalent dose (Sv) 20 times as large for α as for γ."
   },
   {
    "level": 1,
    "question": "Which type of ionising radiation has the **lowest penetrating power** and is stopped by just a sheet of paper or by clothing?",
    "choices": [
     "α radiation.",
     "β radiation.",
     "γ radiation.",
     "All three are stopped equally easily."
    ],
    "correct": 0,
    "solution": "**α radiation** (helium nuclei) has the lowest penetrating power and is stopped by a sheet of paper or clothing. It is therefore relatively harmless *outside* the body, but dangerous if you inhale or swallow an α source, since it then deposits all its energy in a small area.\n\n**Answer:** Option A: α radiation.\n\n**General conclusion:** The penetrating power increases in the order α < β < γ. β is stopped by thin metal, while γ requires thick lead."
   },
   {
    "level": 2,
    "question": "A person with mass $70\\ \\mathrm{kg}$ receives the absorbed dose $2.0\\ \\mathrm{mGy}$. How much radiation energy has the person absorbed in total?",
    "answer": {
     "value": 0.14,
     "unit": "J"
    },
    "solution": "We solve for the energy *E* from the formula for absorbed dose:\n\n$$ D = \\frac{E}{m} \\quad\\Leftrightarrow\\quad E = D \\cdot m $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nD = 2.0\\ \\mathrm{mGy} = 2.0 \\cdot 10^{-3}\\ \\mathrm{Gy} \\\\\nm = 70\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$ E = 2.0 \\cdot 10^{-3} \\cdot 70 = 0.14\\ \\mathrm{J} $$\n\n**Answer:** The person has absorbed about $0.14\\ \\mathrm{J}$.\n\n**General conclusion:** The amount of energy is surprisingly small in joules: the danger of radiation lies not in the amount of heat but in the fact that it *ionises* and damages DNA at the molecular level."
   },
   {
    "level": 2,
    "question": "A person receives the equivalent dose $8.0\\ \\mathrm{mSv}$ from α radiation, which has the quality factor $Q = 20$. How large was the absorbed dose?",
    "answer": {
     "value": 0.4,
     "unit": "mGy"
    },
    "solution": "We solve for the absorbed dose *D* from the formula for equivalent dose:\n\n$$ H = D \\cdot Q \\quad\\Leftrightarrow\\quad D = \\frac{H}{Q} = \\frac{8.0\\ \\mathrm{mSv}}{20} = 0.40\\ \\mathrm{mGy} $$\n\n**Answer:** The absorbed dose was $0.40\\ \\mathrm{mGy}$.\n\n**General conclusion:** Since $Q = 20$ for α, a small absorbed dose (Gy) is enough to give a relatively large equivalent dose (Sv). Had it been γ radiation ($Q = 1$), the absorbed and equivalent doses would have had the same numerical value."
   },
   {
    "level": 3,
    "question": "A person (mass $60\\ \\mathrm{kg}$) ingests an α source with the activity $5\\,000\\ \\mathrm{Bq}$. Each α particle has the energy $5.0\\ \\mathrm{MeV}$, and all the energy is absorbed in the body. How large an **equivalent dose** does the person receive in one hour? ($Q = 20$ for α, $1\\ \\mathrm{eV} = 1.602 \\cdot 10^{-19}\\ \\mathrm{J}$)",
    "answer": {
     "value": 4.8,
     "unit": "μSv"
    },
    "solution": "We have to build our way from the activity to an absorbed energy, then to a dose and finally to the equivalent dose.\n\n**Step 1: the number of decays in one hour.** The activity is $5\\,000$ decays per second:\n\n$$ n = A \\cdot t = 5\\,000 \\cdot 3\\,600 = 1.8 \\cdot 10^7\\ \\text{decays} $$\n\n**Step 2: the total absorbed energy.** Each α particle carries $5.0\\ \\mathrm{MeV} = 5.0 \\cdot 10^6 \\cdot 1.602 \\cdot 10^{-19} = 8.01 \\cdot 10^{-13}\\ \\mathrm{J}$:\n\n$$ E = n \\cdot E_\\alpha = 1.8 \\cdot 10^7 \\cdot 8.01 \\cdot 10^{-13} = 1.44 \\cdot 10^{-5}\\ \\mathrm{J} $$\n\n**Step 3: the absorbed dose:**\n\n$$ D = \\frac{E}{m} = \\frac{1.44 \\cdot 10^{-5}}{60} = 2.4 \\cdot 10^{-7}\\ \\mathrm{Gy} $$\n\n**Step 4: the equivalent dose:**\n\n$$ H = D \\cdot Q = 2.4 \\cdot 10^{-7} \\cdot 20 = 4.8 \\cdot 10^{-6}\\ \\mathrm{Sv} = 4.8\\ \\mathrm{\\mu Sv} $$\n\n**Answer:** The person receives an equivalent dose of about $4.8\\ \\mathrm{\\mu Sv}$.\n\n**General conclusion:** The task links three areas: activity (decays per second), energy conversion (MeV → J) and radiation dose ($D = E/m$, $H = DQ$). What makes α radiation so insidious *inside* the body is exactly that each particle leaves all its energy in the tissue and that $Q = 20$."
   }
  ]
 }
});
