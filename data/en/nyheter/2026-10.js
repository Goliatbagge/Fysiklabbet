/* Engelsk översättning av nyheter (2026-10). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('nyheter', {
 "2026-10-18-rontgenblixtar-pa-attosekunder": {
  "kalla": "7508b52b85",
  "data": {
   "title": "X-ray flashes lasting 300 attoseconds break an intensity record",
   "deck": "At the X-ray laser European XFEL near Hamburg, researchers have gathered X-ray pulses lasting about 300 attoseconds into a spot so small that a human hair is several hundred times wider. The intensity was about seven times higher than anyone had previously reached with such short pulses of hard X-rays, and a copper foil showed that the value holds up.",
   "imageAlt": "An experiment room full of equipment: a long metal tube runs diagonally across the picture towards a wall covered in red, blue and green cables, measuring instruments and a yellow robot arm.",
   "imageCredit": "Photo: Olaf Kosinsky (CC BY-SA 3.0 DE), via Wikimedia Commons",
   "tags": [
    "atomic physics",
    "x-rays",
    "attosecond",
    "free-electron laser",
    "undulator",
    "intensity",
    "power",
    "photon energy",
    "stimulated emission",
    "electron shell",
    "optics",
    "european xfel"
   ],
   "larare": {
    "moment": [
     {
      "label": "Power",
      "href": "katalog.html?id=fy1-4.5"
     },
     {
      "label": "Electromagnetic waves and light",
      "href": "katalog.html?id=fy2-4.1"
     },
     {
      "label": "The Bohr model and energy levels",
      "href": "katalog.html?id=fy2-4.8"
     }
    ],
    "fragor": [
     "A pulse with an energy of 45 microjoules lasts 300 attoseconds. What power does that correspond to during the pulse, and why can such a small amount of energy still have such a large effect?",
     "The researchers did not measure the length of the pulse directly but calculated it from the width of the spectrum. What assumption does that require, and how would the result be affected if the assumption does not hold?",
     "The copper foil showed that the intensity was high enough because the signal stopped increasing. Why might that be stronger evidence than simply calculating the intensity from energy, time and area?"
    ]
   },
   "body": [
    {
     "type": "p",
     "html": "The electrons in an atom move on a timescale of attoseconds, billionths of a billionth of a second. Anyone who wants to see what they are doing therefore needs a flash of light that is just as short. For the flash to image atoms it also needs a wavelength about the size of the atoms themselves, and that means hard X-rays. Getting both at once, with enough light in every flash, is one of the hardest goals in X-ray physics."
    },
    {
     "type": "p",
     "html": "Now an international team at the X-ray laser European XFEL in Schenefeld, near Hamburg, has taken a big step. They have produced X-ray pulses lasting about 300&nbsp;attoseconds and gathered them into a spot only 180 by 330&nbsp;nanometres. There the intensity reached about 2&nbsp;·&nbsp;10<sup>20</sup>&nbsp;watts per square centimetre. The result is published in the journal <em>Optica</em>, and the experiment was carried out in April 2026."
    },
    {
     "type": "quote",
     "html": "This is a world record in intensity and fluence for a hard-X-ray attosecond pulse.",
     "cite": "Ichiro Inoue, University of Tokyo, first author of the study"
    },
    {
     "type": "h2",
     "text": "Electrons that weave their way along"
    },
    {
     "type": "p",
     "html": "European XFEL is a free-electron laser. Electrons are accelerated to an energy of 14&nbsp;GeV, very close to the speed of light, and sent into an undulator: a long row of magnets whose poles alternate in direction. The magnetic field forces the electrons to zigzag their way along, and every time they are deflected they emit X-rays."
    },
    {
     "type": "image",
     "src": "nyheter/bilder/2026-10-18-rontgenblixtar-pa-attosekunder-2.jpg",
     "alt": "A long, shiny metal beam standing on edge in a workshop hall, strapped with yellow bands and wooden battens. A yellow warning sign for a strong magnetic field is fixed to the beam.",
     "caption": "One of the undulators for European XFEL before it was installed in the tunnel. Inside are magnets whose poles alternate in direction along the whole beam.",
     "credit": "Photo: Dirtsc (CC BY-SA 3.0), via Wikimedia Commons"
    },
    {
     "type": "p",
     "html": "Normally the pulses last a few femtoseconds, thousands of attoseconds. Here the accelerator was instead run in a mode where a very short slice of the electron bunch carries a particularly high current and produces almost all of the radiation. The photons had an energy of 10&nbsp;keV, which corresponds to a wavelength of $\\lambda = \\dfrac{h \\cdot c}{E} \\approx 0.12\\ \\mathrm{nm}$, about the size of an atom."
    },
    {
     "type": "p",
     "html": "The length of the pulse could not be timed directly. Instead the researchers measured the spectrum of every pulse and picked out the pulses that had only a single peak, 13.7&nbsp;per cent of 74&nbsp;000 pulses. A short pulse must contain a certain spread of photon energies, and the shorter the pulse, the wider the spread. The spectrum was about 6&nbsp;eV wide, and assuming the pulse is as short as that width allows, the length comes out at about 300&nbsp;attoseconds."
    },
    {
     "type": "h2",
     "text": "Four bounces off two mirrors"
    },
    {
     "type": "p",
     "html": "X-rays cannot be focused with an ordinary lens, because almost every material lets them straight through. Instead mirrors are used that the radiation only grazes, at a very shallow angle. The team used a mirror system from Japan with two extremely precisely polished mirrors, in which every pulse bounces four times: twice off the mirror that focuses vertically and twice off the one that focuses horizontally."
    },
    {
     "type": "p",
     "html": "At the focus the pulses had an average energy of 45&nbsp;microjoules. That sounds small, but the energy is delivered in only 300&nbsp;attoseconds. The power during the pulse is therefore about $P = \\dfrac{E}{t} = \\dfrac{45 \\cdot 10^{-6}\\ \\mathrm{J}}{300 \\cdot 10^{-18}\\ \\mathrm{s}} = 1.5 \\cdot 10^{11}\\ \\mathrm{W}$, or 150&nbsp;gigawatts. Dividing the power by the area of the spot, $I = \\dfrac{P}{A}$, gives an intensity of about 2.5&nbsp;·&nbsp;10<sup>20</sup>&nbsp;watts per square centimetre. Both the pulse and the spot are strongest in the middle and weaker towards the edges, and when the researchers take that into account the peak intensity comes out slightly lower, at 2.1&nbsp;·&nbsp;10<sup>20</sup>&nbsp;W/cm². That is about seven times more than the previous best value for attosecond pulses of hard X-rays, which was 3&nbsp;·&nbsp;10<sup>19</sup>&nbsp;W/cm²."
    },
    {
     "type": "h2",
     "text": "The copper foil that confirmed the value"
    },
    {
     "type": "p",
     "html": "A calculated intensity is only as good as the measurements of energy, time and spot size behind it. The researchers therefore wanted to see the intensity at work, and aimed the pulses at a copper foil 20&nbsp;micrometres thick. The X-rays knock electrons out of the innermost shell of the copper atoms. When another electron then drops down and fills the gap, a new X-ray photon is emitted, with an energy characteristic of copper."
    },
    {
     "type": "p",
     "html": "Normally this happens in all directions. But if enough atoms have a gap at the same time, a photon passing one of them can make it emit an identical photon in the same direction. The signal is amplified like an avalanche in the forward direction, much as in a laser. The phenomenon is called amplified spontaneous emission, and it only starts at about 10<sup>19</sup>&nbsp;W/cm²."
    },
    {
     "type": "quote",
     "html": "It is almost magical to see this happening. Normal fluorescence goes in all directions, regardless of the direction of the incoming beam. But when the ASE threshold is crossed, you see the light cone starting to condense into the forward direction.",
     "cite": "Anders Madsen, group leader at the MID instrument where the experiment took place"
    },
    {
     "type": "p",
     "html": "The decisive part was what happened when the pulses got even stronger. Up to about 20&nbsp;microjoules the signal grew exponentially, but above 50&nbsp;microjoules it stopped increasing. A likely explanation is that the pulse then has time to knock an inner electron out of practically every copper atom in the spot before the atoms have emitted their photons, so there are no more atoms left to amplify. The researchers calculated that such saturation should set in at about 1.7&nbsp;·&nbsp;10<sup>20</sup>&nbsp;W/cm². The 50-microjoule pulses correspond to 2.3&nbsp;·&nbsp;10<sup>20</sup>&nbsp;W/cm², so the two values agree well."
    },
    {
     "type": "h2",
     "text": "Getting there before the damage"
    },
    {
     "type": "p",
     "html": "X-ray flashes this intense destroy whatever they hit. The point of attosecond pulses is that the measurement can be finished before the electrons in the sample have had time to react, and so before the damage has happened. That could give sharper images of molecules and crystals, and opens the way to experiments in which the X-rays do not just observe the electrons but also steer them, for example in a chemical reaction."
    },
    {
     "type": "p",
     "html": "The mirror system in the experiment was on loan from Japan. European XFEL expects to receive its own at the beginning of 2027, and then more research groups can start using the short, intense pulses."
    },
    {
     "type": "fact",
     "title": "Did you know?",
     "items": [
      "In 300&nbsp;attoseconds light travels only about 90&nbsp;nanometres. The pulse is therefore shorter than the focal spot is wide.",
      "The facility is about 3.4&nbsp;kilometres long, and in this experiment the X-ray pulses still had almost a kilometre to travel from the undulator to the experiment station.",
      "The study has 44&nbsp;authors from countries including Japan, Germany and the USA."
     ]
    }
   ]
  }
 }
});
