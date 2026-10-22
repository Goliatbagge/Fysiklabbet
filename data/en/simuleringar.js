/* data/en/simuleringar.js — engelska namn, beskrivningar och sökord för
 * window.SIM_NAMES (data/simuleringar.js). Laddas av I18N.overlay('simuleringar')
 * när sidan visas på engelska. Strängposter byts ut; i listor matchas posterna
 * på index: name och desc byts, engelska kw läggs TILL de svenska. */
(function () {
    var S = window.SIM_NAMES;
    if (!S) return;
    var EN = {
 "fysik1-densitet-app.html": "Density",
 "fysik1-vektoraddition-app.html": "Vector addition",
 "fysik1-stracka-tid-app.html": "Position–time graph",
 "fysik1-tyngdfaktor-jorden.html": [
  {
   "name": "Free fall in a vacuum",
   "desc": "A rose petal and a coin in two glass tubes: pump out the air and watch them fall equally fast.",
   "kw": [
    "forces",
    "gravitational field strength",
    "acceleration due to gravity",
    "free fall",
    "vacuum",
    "air resistance",
    "air pump",
    "glass tube",
    "coin",
    "galileo",
    "feather"
   ]
  },
  {
   "name": "Acceleration due to gravity on Earth",
   "desc": "How the acceleration due to gravity g varies between the equator and the poles on a rotating Earth in 3D.",
   "kw": [
    "forces",
    "gravitational field strength",
    "acceleration due to gravity",
    "gravity",
    "earth",
    "equator",
    "pole",
    "latitude"
   ]
  }
 ],
 "fysik1-hastighet-tid-app.html": "Velocity–time graph",
 "fysik1-acceleration-tid-app.html": "Acceleration–time graph",
 "fysik1-rorelsediagram.html": "Motion graphs",
 "fysik1-newtons-forsta-app.html": "Newton's first law",
 "fysik1-newtons-andra-app.html": "Newton's second law",
 "fysik1-newtons-tredje-app.html": [
  {
   "name": "The fire extinguisher in space",
   "desc": "Action and reaction: steer an astronaut with a fire extinguisher in space.",
   "kw": [
    "forces",
    "third law",
    "action",
    "reaction",
    "reaction force",
    "space",
    "rocket",
    "fire extinguisher",
    "recoil",
    "impulse",
    "mechanics"
   ]
  },
  {
   "name": "The fly in the beaker",
   "desc": "A fly takes off inside a beaker on a sensitive balance: does the reading change? Follow the downwash of air, the reading on the balance and the momentum, in real time and in slow motion.",
   "kw": [
    "forces",
    "third law",
    "action",
    "reaction",
    "fly",
    "beaker",
    "balance",
    "scales",
    "reading",
    "momentum",
    "lift",
    "hover",
    "downwash",
    "vacuum",
    "lid",
    "free fall",
    "mechanics"
   ]
  }
 ],
 "fysik1-newtons-gravitationslag.html": "Newton's law of gravitation",
 "fysik1-hiss-app.html": "Forces in a lift",
 "fysik1-berg-och-dalbana.html": "Roller coaster (conservation of energy)",
 "fysik1-tryck-pa-app.html": "Pressure and pressure force",
 "fysik1-magdeburgska-halvklot.html": "The Magdeburg hemispheres",
 "fysik1-flytkraft-app.html": [
  {
   "name": "Float or sink",
   "desc": "Drag objects from the lab bench into the aquarium, read the buoyancy chart and guess whether they float, hover or sink.",
   "kw": [
    "buoyancy",
    "buoyant force",
    "upthrust",
    "archimedes",
    "density",
    "liquid",
    "water",
    "float",
    "sink",
    "hover",
    "displaced",
    "guess",
    "aquarium",
    "mass",
    "volume"
   ]
  },
  {
   "name": "Archimedes' principle",
   "desc": "Lower a stone on a spring balance into an overflow can: the loss in weight is exactly the weight of the displaced water.",
   "kw": [
    "archimedes",
    "archimedes principle",
    "buoyancy",
    "buoyant force",
    "upthrust",
    "spring balance",
    "newton meter",
    "displaced water",
    "density",
    "liquid",
    "overflow can",
    "loss of weight",
    "tension"
   ]
  }
 ],
 "fysik1-tryck.html": "The ideal gas law",
 "fysik1-varme-app.html": "Heating and cooling",
 "fysik1-influens.html": [
  {
   "name": "Electrostatic induction",
   "desc": "How a neutral aluminium can is attracted by a charged rod.",
   "kw": [
    "electricity",
    "charge",
    "induction",
    "electrostatic induction",
    "electrostatics",
    "charged rod",
    "aluminium can",
    "attraction",
    "static electricity"
   ]
  },
  {
   "name": "The Van de Graaff generator",
   "desc": "Charge the dome in 3D: sparks to an earthed sphere, flying aluminium cake cases and hair standing on end.",
   "kw": [
    "electricity",
    "charge",
    "van de graaff generator",
    "spark",
    "discharge",
    "earthing",
    "hair standing on end",
    "static electricity",
    "electrostatics"
   ]
  }
 ],
 "fysik1-coulombs-lag.html": "Coulomb's law",
 "fysik1-ellara-app.html": "Electric circuits",
 "fysik1-serie-parallell.html": "Series and parallel circuits",
 "fysik1-kirchhoffs-lag.html": "Kirchhoff's first law",
 "fysik1-elektriska-falt.html": "Electric fields",
 "fysik1-faradays-bur.html": "Faraday cage",
 "fysik1-sonderfall.html": "Radioactive decay",
 "fysik1-massdefekt.html": "Mass defect and binding energy",
 "fysik1-halveringstid.html": "Half-life",
 "fysik1-stralning-genomtranglighet.html": "Penetrating power of radiation",
 "fysik2-cirkular-rorelse-app.html": [
  {
   "name": "Circular motion",
   "desc": "A car on a circular track seen from above, a race track with a wide and a tight bend, a car in a loop and a car over a crest and through a dip. Show the real forces or the centripetal force (the resultant), velocity, centripetal acceleration and radius, find the critical speed at which the car makes it round the loop or leaves the crest, and lower the friction until the car carries straight on.",
   "kw": [
    "motion",
    "forces",
    "circular motion",
    "circular path",
    "centripetal force",
    "centripetal acceleration",
    "crest",
    "critical speed",
    "friction",
    "bend"
   ]
  },
  {
   "name": "Sparkler in an electric screwdriver",
   "desc": "Light a sparkler fixed in an electric screwdriver, in the dark: the sparks leave the circle along the tangent, just as Newton's first law says. With a speed slider, slow motion and sound.",
   "kw": [
    "motion",
    "circular motion",
    "circular path",
    "sparkler",
    "sparks",
    "electric screwdriver",
    "drill",
    "tangential",
    "newtons first law",
    "inertia"
   ]
  },
  {
   "name": "Sponge in a spin dryer",
   "desc": "A wet sponge in a rotating spin-dryer drum seen from directly above: the water droplets leave the circle along the tangent, following Newton's first law.",
   "kw": [
    "motion",
    "circular motion",
    "circular path",
    "spin dryer",
    "centrifuge",
    "sponge",
    "water droplets",
    "tangential",
    "newtons first law",
    "inertia"
   ]
  }
 ],
 "fysik2-kraftmoment-app.html": [
  {
   "name": "The seesaw: equilibrium of moments",
   "desc": "Place weights on a seesaw, drag them and see when the anticlockwise moment balances the clockwise moment (M = F · l).",
   "kw": [
    "forces",
    "torque",
    "moment of a force",
    "lever arm",
    "lever",
    "seesaw",
    "equilibrium",
    "principle of moments",
    "clockwise",
    "anticlockwise"
   ]
  },
  {
   "name": "The spanner and the lever arm",
   "desc": "Move the point where the force acts along the handle, turn the force a full revolution and watch the lever arm (the perpendicular distance to the line of action) change in real time. Will the stiff nut come loose?",
   "kw": [
    "forces",
    "torque",
    "moment of a force",
    "lever arm",
    "spanner",
    "wrench",
    "nut",
    "line of action",
    "perpendicular distance"
   ]
  }
 ],
 "fysik2-brada-tva-stod-app.html": [
  {
   "name": "The plank on two trestles",
   "desc": "Drag the load and the supports and see the support forces F_P and F_Q live. Choose the pivot freely (at a support its lever arm becomes 0) and solve for the other force with the principle of moments, and watch the plank tip over when the centre of gravity passes a support.",
   "kw": [
    "forces",
    "torque",
    "principle of moments",
    "equilibrium",
    "plank",
    "trestle",
    "support",
    "support force",
    "pivot",
    "centre of gravity",
    "tipping"
   ]
  }
 ],
 "fysik2-gaffelbalans-app.html": [
  {
   "name": "The fork balance",
   "desc": "The classic balancing trick in 3D: two forks in a cork balance on a needle point against the narrow edge of a coin standing on its edge. Give it a nudge, change the angle of the forks and see why it is so easy: the centre of gravity ends up below the point of support.",
   "kw": [
    "forces",
    "torque",
    "centre of gravity",
    "point of support",
    "stability",
    "stable equilibrium",
    "balance",
    "forks",
    "cork",
    "coin",
    "balancing trick"
   ]
  },
  {
   "name": "The double cone that rolls uphill",
   "desc": "The classic demonstration in 3D: a double cone is released at the low end of a V-shaped track and rolls towards the high end, yet the centre of gravity sinks all the way, because the contact points move out towards the tips of the cone as the rails spread apart. Compare with the cylinder that rolls downhill, change the slope and find the limit where the illusion breaks.",
   "kw": [
    "forces",
    "centre of gravity",
    "double cone",
    "cone",
    "rolls uphill",
    "uphill",
    "rails",
    "slope",
    "stability"
   ]
  }
 ],
 "fysik2-satellitbana-app.html": "Satellite in orbit",
 "fysik2-konisk-pendel.html": "Conical pendulum",
 "fysik2-rorelse-app.html": "Oblique projectile",
 "fysik2-svangningar-jamforelse.html": [
  {
   "name": "Comparing oscillations",
   "desc": "Sinusoidal motion, amplitude, period and frequency.",
   "kw": [
    "waves",
    "oscillation",
    "comparison",
    "compare oscillations",
    "pendulum",
    "mass on a spring",
    "simple harmonic motion",
    "amplitude",
    "frequency"
   ]
  },
  {
   "name": "The wheel and the spring",
   "desc": "A lamp shines on a spinning bicycle wheel, and the shadow of a peg on the wheel moves up and down on the wall in exactly the same rhythm as a mass on a spring. See how a harmonic oscillation is the projection of circular motion, and how the graph becomes a sine curve.",
   "kw": [
    "waves",
    "oscillation",
    "harmonic oscillation",
    "simple harmonic motion",
    "circular motion",
    "projection",
    "bicycle wheel",
    "shadow",
    "sine curve"
   ]
  },
  {
   "name": "The wheel and the spring in 3D",
   "desc": "The same experiment in 3D: a bicycle wheel with a peg spins in the light from a lamp, and the shadow on the wall follows the mass on the spring. Turn the camera freely and see the wheel from the lamp's point of view, as the light sees it.",
   "kw": [
    "waves",
    "oscillation",
    "harmonic oscillation",
    "simple harmonic motion",
    "circular motion",
    "projection",
    "bicycle wheel",
    "shadow",
    "lamp"
   ]
  },
  {
   "name": "Position, velocity and acceleration",
   "desc": "A mass oscillates on a spring while the graphs for position, velocity and acceleration are drawn one below the other. Drag time back and forth and see that the velocity is zero at the turning points, where the acceleration is greatest.",
   "kw": [
    "waves",
    "oscillation",
    "harmonic oscillation",
    "position",
    "displacement",
    "velocity",
    "graphs",
    "turning points",
    "phase"
   ]
  }
 ],
 "fysik2-hookes-lag-app.html?lage=kopplade": "Combined springs",
 "fysik2-pendel-app.html": "Simple pendulum",
 "fysik2-resonans-app.html": "Resonance (driven oscillation)",
 "fysik2-staende-vag-app.html": "Standing wave on a string",
 "fysik2-vagsimulator.html": "Wave simulator",
 "fysik2-stavmagnet-app.html": [
  {
   "name": "The magnetic field of a bar magnet",
   "desc": "The magnetic field around a bar magnet in 2D and 3D: drag the magnet over a board of compass needles, sprinkle iron filings and rotate the field pattern freely in space.",
   "kw": [
    "electromagnetism",
    "magnetic field",
    "bar magnet",
    "permanent magnet",
    "field lines",
    "compass needles",
    "iron filings",
    "north pole",
    "south pole"
   ]
  },
  {
   "name": "Attraction and repulsion",
   "desc": "Two bar magnets on a lab bench: turn the poles, release the magnets and see when the magnetic force overcomes friction. Like poles repel, unlike poles attract.",
   "kw": [
    "electromagnetism",
    "magnetic force",
    "attraction",
    "attract",
    "repel",
    "like poles",
    "unlike poles",
    "bar magnet",
    "friction"
   ]
  }
 ],
 "fysik2-magnetfalt-app.html": "Magnetic field around a straight conductor",
 "fysik2-jordmagnetiska-faltet.html": "The Earth's magnetic field",
 "fysik2-magnetiskt-flode.html": "Magnetic flux",
 "fysik2-vaxelstromsgenerator.html": "AC generator",
 "fysik2-virvelstrommar-app.html": [
  {
   "name": "Eddy currents in a pendulum",
   "desc": "An aluminium pendulum swings through a magnetic field and is slowed down by induced eddy currents. Adjust the flux density, switch off the electromagnet in the middle of a swing and change to a slotted plate.",
   "kw": [
    "electromagnetism",
    "eddy current",
    "eddy currents",
    "induction",
    "lenzs law",
    "magnetic braking",
    "pendulum",
    "electromagnet",
    "slotted plate"
   ]
  },
  {
   "name": "The magnet in the copper tube",
   "desc": "Drop two identical magnets at the same time, one through a copper tube and one through a plastic tube, and see the difference: the eddy currents in the copper wall brake the magnet so that it sinks at constant speed, until it leaves the mouth of the tube and falls freely for the last bit. Watch the currents swirl round the tube and the magnetic field they create inside it, show the forces, set up each tube separately and compare the speeds in the v–t graph.",
   "kw": [
    "electromagnetism",
    "eddy current",
    "eddy currents",
    "induction",
    "lenzs law",
    "copper tube",
    "plastic tube",
    "falling magnet",
    "magnetic braking",
    "terminal velocity",
    "constant speed"
   ]
  }
 ],
 "fysik2-em-stralning.html": "Electromagnetic radiation",
 "fysik2-dubbelspalt.html": "The double-slit experiment",
 "fysik2-wiens-lag.html": "Wien's displacement law",
 "fysik2-brytning-app.html": "The law of refraction",
 "fysik2-fotoelektrisk-effekt.html": "The photoelectric effect",
 "fysik2-spektrallinjer.html": "Spectral lines",
 "fysik2-energinivaer.html": "Energy levels in the hydrogen atom",
 "fysik2-manens-faser.html": [
  {
   "name": "Phases of the Moon",
   "desc": "The position of the Moon in its orbit gives the different phases of the Moon.",
   "kw": [
    "astronomy",
    "moon",
    "phases of the moon",
    "moon phases",
    "new moon",
    "full moon",
    "half moon",
    "crescent",
    "orbit",
    "earth",
    "sun"
   ]
  },
  {
   "name": "Solar eclipse",
   "desc": "A total solar eclipse seen from Earth: the partial phase, Baily's beads, the diamond ring and the corona.",
   "kw": [
    "astronomy",
    "solar eclipse",
    "eclipse",
    "moon",
    "sun",
    "corona",
    "totality",
    "chromosphere",
    "prominence",
    "bailys beads",
    "diamond ring",
    "shadow",
    "annular",
    "partial",
    "angular diameter"
   ]
  }
 ],
 "fysik2-solens-farg.html": "The colour of the Sun",
 "fysik2-neutronstjarna.html": "The neutron star to scale"
};
    Object.keys(EN).forEach(function (h) {
        var v = S[h], e = EN[h];
        if (v == null) return;
        if (typeof v === 'string' || typeof e === 'string') { if (typeof v === 'string') S[h] = typeof e === 'string' ? e : e.name; return; }
        if (!Array.isArray(v) || !Array.isArray(e)) return;
        v.forEach(function (post, i) {
            var p = e[i];
            if (!p) return;
            if (typeof post === 'string') { v[i] = p.name; return; }
            if (p.name) post.name = p.name;
            if (p.desc) post.desc = p.desc;
            if (p.kw) post.kw = (post.kw || []).concat(p.kw);
        });
    });
})();
