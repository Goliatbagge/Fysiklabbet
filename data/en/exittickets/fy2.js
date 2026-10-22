/* Engelsk översättning av exittickets (fy2). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "fy2-1.1": {
  "kalla": "291f088fed",
  "data": [
   {
    "question": "What is meant by the lever arm $l$ of a force, with respect to a pivot?",
    "choices": [
     "The perpendicular (shortest) distance between the line of action of the force and the pivot",
     "The distance along the force's own direction up to the pivot",
     "The size of the force divided by the mass of the object",
     "The length of the circular arc that the object moves along"
    ],
    "correct": 0,
    "why": [
     "This is the definition of the lever arm: the perpendicular distance between the line of action of the force and the pivot.",
     "The lever arm is not measured along the force's own direction. A force pointing straight at the pivot has a lever arm of 0, even if the distance along the force's direction is large.",
     "Moment is not about mass but about the relationship $M = F \\cdot l$ between force and lever arm.",
     "That describes a distance in circular motion rather than the lever arm of a force."
    ]
   },
   {
    "question": "What is the SI unit of the moment $M$?",
    "choices": [
     "N",
     "Nm",
     "N/m",
     "J"
    ],
    "correct": 1,
    "why": [
     "N (newton) is the unit of force, not of moment.",
     "A moment is a force times a lever arm, which gives the unit Nm.",
     "N/m would correspond to force divided by distance, which is not how moment is defined.",
     "J (joule) is the unit of energy and work. Even though Nm has the same dimensions as J, the units are kept apart: moment is measured in Nm."
    ]
   },
   {
    "question": "A force of 20 N acts perpendicular to a handle, 0.50 m from the pivot. How large is the moment?",
    "choices": [
     "$0.025\\ \\mathrm{Nm}$",
     "$40\\ \\mathrm{Nm}$",
     "$10\\ \\mathrm{Nm}$",
     "$20.5\\ \\mathrm{Nm}$"
    ],
    "correct": 2,
    "why": [
     "You get this if you divide the lever arm by the force ($l/F$) instead of multiplying them.",
     "You get this if you divide the force by the lever arm ($F/l$) instead of multiplying them.",
     "$M = F \\cdot l = 20 \\cdot 0.50 = 10\\ \\mathrm{Nm}$.",
     "It looks as if 20 and 0.50 have been added instead of multiplied."
    ]
   },
   {
    "question": "A moment is given as $M = -6.0\\ \\mathrm{Nm}$. What does the negative sign mean?",
    "choices": [
     "That the force points downwards",
     "That the lever arm is negative",
     "That the turning is anticlockwise",
     "That the turning is clockwise"
    ],
    "correct": 3,
    "why": [
     "The sign of the moment says nothing about the force's own direction in space, only about the direction of turning.",
     "The lever arm is by definition a distance and cannot be negative. The sign of $M$ comes from the direction of turning instead.",
     "A positive (not negative) moment corresponds to anticlockwise turning.",
     "By convention, a negative moment corresponds to clockwise turning."
    ]
   },
   {
    "question": "What is required for rotational equilibrium about a pivot?",
    "choices": [
     "That the anticlockwise moment is equal to the clockwise moment",
     "That all the forces acting on the object are equal in size",
     "That only a single force acts on the object",
     "That the lever arm of every force is zero"
    ],
    "correct": 0,
    "why": [
     "This is exactly the principle of moments: $M_1 = M_2$, where the anticlockwise and clockwise moments cancel each other out.",
     "The forces themselves do not need to be equal. It is their moments (force times lever arm) that must balance each other.",
     "Rotational equilibrium is about several moments balancing each other, not about only one force acting.",
     "If all the lever arms were zero, no moment would arise at all. That is not the same thing as equilibrium between two opposing moments."
    ]
   },
   {
    "question": "A person of 80 kg sits 1.0 m from the pivot on a seesaw. How far from the pivot must a person of 20 kg sit on the other side for rotational equilibrium?",
    "choices": [
     "$0.25\\ \\mathrm{m}$",
     "$4.0\\ \\mathrm{m}$",
     "$1.0\\ \\mathrm{m}$",
     "$2.0\\ \\mathrm{m}$"
    ],
    "correct": 1,
    "why": [
     "You get this if you turn the mass ratio upside down ($20/80 \\cdot 1.0$) instead of setting up $m_1 \\cdot l_1 = m_2 \\cdot l_2$ correctly.",
     "Rotational equilibrium gives $m_1 \\cdot l_1 = m_2 \\cdot l_2 \\Leftrightarrow l_2 = \\dfrac{80 \\cdot 1.0}{20} = 4.0\\ \\mathrm{m}$.",
     "This would only be true if the two people had the same mass, which they do not.",
     "This is too small: the lighter person must sit further away, not closer, to make up for their smaller mass."
    ]
   }
  ]
 },
 "fy2-1.2": {
  "kalla": "06df4dbf6f",
  "data": [
   {
    "question": "A plank lies at rest on two trestles. Why may the pivot be chosen freely when the principle of moments is set up?",
    "choices": [
     "The lever arms are equally long wherever the pivot is placed",
     "The moments are always zero for a plank lying at rest",
     "The plank does not rotate about any point at all, so the moments cancel out about every point",
     "The gravitational force drops out of the calculation wherever the pivot is placed"
    ],
    "correct": 2,
    "why": [
     "The lever arms change when the pivot is moved. What saves the balance is force equilibrium: every lever arm changes by the same amount, and since the upward forces together are equal to the downward force, the same amount of moment is added on both sides.",
     "Each individual moment can be large. It is the anticlockwise total that equals the clockwise total, not each moment on its own that is zero.",
     "A plank at rest rotates neither about the supports, nor about the centre of gravity, nor about any other point. Rotational equilibrium therefore holds about every point, and we choose the one that needs the least calculation.",
     "The gravitational force only drops out if the pivot is placed at the centre of gravity. About every other point it has a lever arm and gives a moment."
    ]
   },
   {
    "question": "How large a moment does a force give if its line of action passes through the pivot?",
    "choices": [
     "Zero: the lever arm is 0",
     "As large as the force in newtons",
     "It depends on the direction of the force",
     "Infinitely large"
    ],
    "correct": 0,
    "why": [
     "The lever arm is the distance from the pivot to the line of action of the force. If the line passes through the pivot, the lever arm is 0 and $M = F \\cdot l = 0$.",
     "Moment and force are different quantities: the moment depends on both the force and the lever arm, and here the lever arm is 0.",
     "No. As long as the line of action passes through the pivot, the lever arm is 0 whichever way the force points.",
     "On the contrary: the moment becomes zero, not infinite."
    ]
   },
   {
    "question": "A plank rests on two supports, P and Q. Both $F_\\mathrm{P}$ and $F_\\mathrm{Q}$ are unknown, and you are to calculate $F_\\mathrm{Q}$ using the principle of moments. Where do you choose the pivot?",
    "choices": [
     "At P: then the unknown force $F_\\mathrm{P}$ drops out of the equation",
     "At Q: then the force you are looking for drops out of the equation",
     "Always at the centre of gravity",
     "It makes no difference, the calculation is equally simple everywhere"
    ],
    "correct": 0,
    "why": [
     "When there is no natural pivot, it may be chosen freely. If you choose P, $F_\\mathrm{P}$ gets a lever arm of 0 and drops out, leaving only one unknown, $F_\\mathrm{Q}$.",
     "Then $F_\\mathrm{Q}$ drops out instead, exactly the force you wanted to calculate, and you are left with the other unknown force.",
     "If you choose the centre of gravity, only the gravitational force drops out (which you can already calculate from $m \\cdot g$). Both unknown forces remain.",
     "The pivot may be chosen freely, but the calculation is not equally hard: the right choice eliminates an unknown force."
    ]
   },
   {
    "question": "A plank lies on two trestles. The centre of gravity is closer to the left trestle. Which trestle carries the larger share of the plank's weight?",
    "choices": [
     "The left one",
     "The right one",
     "They always carry exactly the same",
     "It cannot be decided without knowing the mass of the plank"
    ],
    "correct": 0,
    "why": [
     "The closer a supporting force is to the centre of gravity, the larger the share of the weight it carries.",
     "It is the other way round: the support furthest from the centre of gravity carries the smaller share.",
     "An equal share only applies when the centre of gravity is midway between the supports.",
     "The mass decides how large the total weight is, but the sharing between the supports is decided by the position of the centre of gravity."
    ]
   },
   {
    "question": "A uniform plank has a mass of 20 kg and lies with its centre of gravity midway between two trestles. Roughly how large a force does each trestle push upwards with?",
    "choices": [
     "Roughly 98 N",
     "Roughly 196 N",
     "Roughly 49 N",
     "Roughly 20 N"
    ],
    "correct": 0,
    "why": [
     "The gravitational force is $F_\\mathrm{G} = 20 \\cdot 9.82 \\approx 196\\ \\mathrm{N}$, and when the centre of gravity is midway between the supports they carry half each: about 98 N.",
     "196 N is the whole gravitational force. It is shared between the two supports, so each trestle carries half.",
     "49 N would be a quarter of the weight, but there are only two supports, not four.",
     "20 is the mass in kilograms, not a force in newtons. The gravitational force is $m \\cdot g \\approx 196\\ \\mathrm{N}$, and each support carries half."
    ]
   },
   {
    "question": "A plank is at rest on two supports. The gravitational force on the plank is 200 N and the right support pushes upwards with 120 N. How large a force does the left support give?",
    "choices": [
     "80 N",
     "120 N",
     "200 N",
     "320 N"
    ],
    "correct": 0,
    "why": [
     "The plank is at rest, so force equilibrium holds: the upward forces together must equal the downward gravitational force. $(200 - 120)\\ \\mathrm{N} = 80\\ \\mathrm{N}$.",
     "Then the upward forces would total $240\\ \\mathrm{N}$, more than the gravitational force, and the plank would not be in equilibrium.",
     "The supports share the weight: the left support only carries what is left once the right one has taken its 120 N.",
     "The upward forces should total 200 N, not 320 N. The left support gives the difference $200 - 120 = 80\\ \\mathrm{N}$."
    ]
   }
  ]
 },
 "fy2-1.3": {
  "kalla": "fe1895c8e5",
  "data": [
   {
    "question": "A block is slowly tilted more and more. When does it topple?",
    "choices": [
     "When the centre of gravity ends up outside the pivot (the base of support)",
     "At exactly 45° of tilt, whatever its shape",
     "When the normal force becomes larger than the gravitational force",
     "As soon as the centre of gravity moves sideways"
    ],
    "correct": 0,
    "why": [
     "Just as in the toppling demonstration: when the vertical line through the centre of gravity passes outside the pivot, outside the base of support, the block topples.",
     "The critical angle depends on the block's shape: a low, wide block can take far more than 45°, a tall, narrow one far less.",
     "The normal force and the gravitational force are equal in size as long as the block stands on the surface. It is the position of the centre of gravity that decides whether it topples.",
     "The centre of gravity moves sideways as soon as the block is tilted. It only topples when the plumb line through the centre of gravity ends up outside the base of support."
    ]
   },
   {
    "question": "A ball lies at the bottom of a bowl. If it is disturbed slightly, it rolls back. What type of equilibrium is this, and why?",
    "choices": [
     "Neutral equilibrium: the ball can lie anywhere in the bowl",
     "Unstable equilibrium: the disturbance is increased by the gravitational force",
     "Stable equilibrium: the centre of gravity rises when the ball is disturbed, and the gravitational force turns the ball back",
     "Stable equilibrium: the normal force from the bowl is larger than the gravitational force"
    ],
    "correct": 2,
    "why": [
     "No: in the bowl, the equilibrium is only at the bottom. Only on a flat surface does the ball stay wherever it ends up, and that is neutral equilibrium.",
     "That describes a ball on a hill: there the centre of gravity is lowered whichever way the ball rolls, and the disturbance grows. In the bowl it is the other way round.",
     "To leave the bottom, the ball has to go up the wall of the bowl. The centre of gravity rises, and the gravitational force drives it back towards the lowest position. That is stable equilibrium.",
     "The type of equilibrium is right, but the reason is wrong: the forces are equal in size when the ball lies still. What matters is that the centre of gravity rises when it is disturbed."
    ]
   },
   {
    "question": "What is an object's base of support?",
    "choices": [
     "The surface of the object that is in contact with the ground",
     "The area enclosed by the object's points of contact with the ground",
     "The whole surface of the ground",
     "The area directly below the centre of gravity"
    ],
    "correct": 1,
    "why": [
     "Nearly, but a chair stands steadily even though only four small leg ends touch the floor. The base of support is the whole quadrilateral between the legs, not just the contact surfaces.",
     "The base of support is the area enclosed by the points of contact: for a chair, the whole quadrilateral between the four legs. The object stays standing as long as the plumb line through the centre of gravity falls inside it.",
     "The ground can be as large as you like without the object standing more steadily. It is the object's own points of contact that decide.",
     "Where the plumb line through the centre of gravity falls decides whether the object topples, but the base of support is something the object has wherever its centre of gravity is."
    ]
   },
   {
    "question": "Four blocks of different shapes are tilted until they topple. Which kind of block can take the largest angle of tilt?",
    "choices": [
     "The tall, narrow one",
     "They all topple at the same angle if they have the same mass",
     "The one with the largest mass",
     "The low, wide one"
    ],
    "correct": 3,
    "why": [
     "On the contrary: a tall, narrow block has its centre of gravity high up, and the plumb line soon falls outside the narrow base of support, so it topples at a small angle already.",
     "The angle is determined by the shape, $\\tan \\alpha = \\dfrac{b}{h}$, not by the mass. A wide, low block can take the most.",
     "The mass does not affect the toppling angle: the gravitational force grows, but so does the restoring moment. The shape decides: $\\tan \\alpha = \\dfrac{b}{h}$.",
     "Right: the toppling angle satisfies $\\tan \\alpha = \\dfrac{b}{h}$, so a large width and a small height give the largest angle."
    ]
   },
   {
    "question": "A construction of two forks in a cork balances stably on the tip of a needle. What is the secret?",
    "choices": [
     "The friction between the needle and the surface holds the construction in place",
     "The combined centre of gravity of the construction lies below the point of support",
     "The forks make the construction so light that the gravitational force can be neglected",
     "The tip of the needle gives the construction a wide base of support"
    ],
    "correct": 1,
    "why": [
     "Friction cannot explain the balance: the construction can rock and even spin without falling. It is the position of the centre of gravity that makes the equilibrium stable.",
     "The heavy handles of the forks hang downwards and outwards and pull the combined centre of gravity down below the point of support. Any tilt then raises the centre of gravity, and the gravitational force turns the construction back.",
     "The construction has quite a lot of mass, and it is exactly the gravitational force that turns it back towards the equilibrium position when the centre of gravity lies below the point of support.",
     "The base of support is in practice a single point. Even so, the equilibrium is stable, because the centre of gravity lies below the point of support."
    ]
   }
  ]
 },
 "fy2-1.4": {
  "kalla": "0a9c959cbf",
  "data": [
   {
    "question": "What is the time it takes for a periodic motion to repeat itself once, for example the time for one complete revolution, called?",
    "choices": [
     "Frequency",
     "Angular velocity",
     "Amplitude",
     "Period"
    ],
    "correct": 3,
    "why": [
     "Frequency is the number of repetitions per second, not the time for one repetition.",
     "Angular velocity describes how fast the angle changes, not the time for one complete revolution.",
     "Amplitude does not appear in this lesson on period and frequency. It is a different concept, linked to the size of an oscillation.",
     "The period $T$ is exactly the time it takes for the motion to repeat itself once."
    ]
   },
   {
    "question": "What is the SI unit of frequency $f$?",
    "choices": [
     "Hz",
     "s",
     "rad/s",
     "m/s"
    ],
    "correct": 0,
    "why": [
     "Hertz (Hz) is the SI unit of frequency, equivalent to 1/s.",
     "The second is the unit of the period $T$, not of frequency.",
     "rad/s is the unit of angular velocity ω, a different quantity.",
     "m/s is the unit of speed and velocity, not of frequency."
    ]
   },
   {
    "question": "A circular motion has a frequency of 5.0 Hz. What is the period $T$?",
    "choices": [
     "$5.0\\ \\mathrm{s}$",
     "$0.20\\ \\mathrm{s}$",
     "$2.5\\ \\mathrm{s}$",
     "$50\\ \\mathrm{s}$"
    ],
    "correct": 1,
    "why": [
     "This is the value of the frequency, not the period: the period is given by $1/f$.",
     "$T = \\dfrac{1}{f} = \\dfrac{1}{5.0} = 0.20\\ \\mathrm{s}$.",
     "You get this if you accidentally divide the frequency by 2 instead of calculating $1/f$.",
     "You get this if you multiply the frequency by 10, $10 \\cdot 5.0 = 50$, instead of calculating $1/f$."
    ]
   },
   {
    "question": "How is the angle 1 radian defined?",
    "choices": [
     "The angle of one complete revolution divided by 4",
     "The angle corresponding to 1° in degrees",
     "The angle whose circular arc is as long as the radius of the circle",
     "The angle between any two radii in a circle"
    ],
    "correct": 2,
    "why": [
     "One complete revolution divided by 4 is 90°, which is not the same as 1 radian (≈57.3°).",
     "1 radian corresponds to about 57.3°, not 1°.",
     "This is the definition: if the circular arc is as long as the radius, the angle at the centre is 1 radian.",
     "The angle between any two radii can be anything at all. The radian is specifically linked to the length of the arc compared with the radius."
    ]
   },
   {
    "question": "How many radians correspond to 180°?",
    "choices": [
     "$\\dfrac{\\pi}{2}$",
     "$2\\pi$",
     "$\\dfrac{\\pi}{4}$",
     "$\\pi$"
    ],
    "correct": 3,
    "why": [
     "$\\dfrac{\\pi}{2}$ rad corresponds to 90°, not 180°.",
     "$2\\pi$ rad corresponds to one complete revolution, that is 360°.",
     "$\\dfrac{\\pi}{4}$ rad corresponds to 45°.",
     "Since $360^{\\circ} = 2\\pi$, it follows that $180^{\\circ} = \\pi$."
    ]
   },
   {
    "question": "An object moves in a circular path with radius 0.50 m and angular velocity 2.0 rad/s. What is its speed?",
    "choices": [
     "$1.0\\ \\mathrm{m/s}$",
     "$4.0\\ \\mathrm{m/s}$",
     "$0.25\\ \\mathrm{m/s}$",
     "$2.5\\ \\mathrm{m/s}$"
    ],
    "correct": 0,
    "why": [
     "$v = \\omega \\cdot r = 2.0 \\cdot 0.50 = 1.0\\ \\mathrm{m/s}$.",
     "You get this if you accidentally divide $\\omega$ by $r$ instead of multiplying.",
     "You get this if you mix up the formula and calculate $r/\\omega$ instead of $\\omega \\cdot r$.",
     "This does not agree with $v = \\omega \\cdot r$ for the given values."
    ]
   }
  ]
 },
 "fy2-1.5": {
  "kalla": "a2765dea27",
  "data": [
   {
    "question": "Why is a resultant force needed for an object to move in a circular path at constant speed?",
    "choices": [
     "Because the speed keeps decreasing in a circular path",
     "Because the velocity keeps changing direction, and Newton's first law says that a change of direction requires a resultant force",
     "Because the circular path itself produces a force towards the centre",
     "Because air friction always points towards the centre"
    ],
    "correct": 1,
    "why": [
     "The speed (the magnitude of the velocity) is constant by definition in this reasoning. It is the direction that changes.",
     "According to Newton's first law, an object otherwise carries on straight ahead at constant velocity. Since the path is curved, the direction of the velocity must change, and that requires a resultant force.",
     "A path cannot produce a force by itself. The force comes from, for example, a string, friction or gravity.",
     "Air resistance is no general explanation: the centripetal force can just as well come from tension, the normal force or gravity, with no air involved at all."
    ]
   },
   {
    "question": "What is the centripetal force $F_\\mathrm{C}$?",
    "choices": [
     "A completely separate, extra force that is always present in circular motion in addition to the other forces",
     "A force that only exists in the orbits of satellites",
     "The resultant force, directed towards the centre of the circle, which can be made up of, for example, tension, friction, the normal force or the gravitational force",
     "The force that opposes the motion and reduces the speed"
    ],
    "correct": 2,
    "why": [
     "The centripetal force is not a separate force of its own: it is the resultant of the forces already acting on the object.",
     "Centripetal force applies to all circular motion, not only satellites: for example a mass on a string or a car in a bend.",
     "This agrees with the lesson: the centripetal force is the resultant of forces such as tension, friction, the normal force or the gravitational force, directed towards the centre.",
     "The centripetal force does not reduce the speed (it is perpendicular to the direction of motion). It only changes the direction."
    ]
   },
   {
    "question": "An object moves in a circular path with speed 4.0 m/s and radius 2.0 m. What is the centripetal acceleration $a_\\mathrm{C}$?",
    "choices": [
     "$2.0\\ \\mathrm{m/s^2}$",
     "$16\\ \\mathrm{m/s^2}$",
     "$0.50\\ \\mathrm{m/s^2}$",
     "$8.0\\ \\mathrm{m/s^2}$"
    ],
    "correct": 3,
    "why": [
     "You get this if you accidentally divide $v$ by $r$ instead of using $v^2/r$.",
     "This is $v^2$ without dividing by the radius.",
     "You get this if you mix up the formula and calculate $\\dfrac{r}{v} = \\dfrac{2.0}{4.0} = 0.50$.",
     "$a_\\mathrm{C} = \\dfrac{v^2}{r} = \\dfrac{4.0^2}{2.0} = \\dfrac{16}{2.0} = 8.0\\ \\mathrm{m/s^2}$."
    ]
   },
   {
    "question": "In which direction does the centripetal force always point?",
    "choices": [
     "In towards the centre of the circular path",
     "Tangentially along the path, in the direction of motion",
     "Straight outwards, away from the centre",
     "Always straight down, whatever the path"
    ],
    "correct": 0,
    "why": [
     "By definition, the centripetal force points in towards the centre of the circular path: it is what bends the motion into a circle.",
     "It is the velocity, not the centripetal force, that points tangentially along the path.",
     "An outward force would make the object leave the circular path instead of bending in towards it.",
     "The direction is not a fixed one such as \"down\": it always points towards the centre, wherever the object is on the circle."
    ]
   },
   {
    "question": "A passenger in a car turning sharply feels pressed outwards in the seat. How is this explained correctly?",
    "choices": [
     "A real force, the centrifugal force, pushes the passenger outwards",
     "The passenger's inertia makes them \"want\" to carry on straight ahead while the car turns in under and around them; centrifugal force is a fictitious force, not a real one",
     "The friction between the tyres and the road causes the feeling",
     "It is because the car's speed suddenly increases in the bend"
    ],
    "correct": 1,
    "why": [
     "According to the lesson, centrifugal force is an imaginary force: it does not exist as a real force from outside.",
     "According to Newton's first law, the passenger's body \"wants\" to carry on straight ahead because of its inertia. When the car turns, it therefore feels like an outward force, although it is really the car curving in towards the passenger.",
     "The friction between the tyres and the road is rather what provides the car's centripetal force, not the passenger's feeling.",
     "The feeling arises even when the speed is constant: it is the change of direction (the turn) that causes it, not an increase in speed."
    ]
   },
   {
    "question": "A mass of 0.50 kg moves in a circular path with radius 1.0 m and speed 2.0 m/s. What is the centripetal force?",
    "choices": [
     "$0.50\\ \\mathrm{N}$",
     "$4.0\\ \\mathrm{N}$",
     "$2.0\\ \\mathrm{N}$",
     "$1.0\\ \\mathrm{N}$"
    ],
    "correct": 2,
    "why": [
     "This is just the numerical value of the mass. The speed and the radius have not been included: $F_\\mathrm{C} = \\dfrac{m \\cdot v^2}{r}$.",
     "This is $v^2$ without multiplying by the mass and dividing by the radius.",
     "$F_\\mathrm{C} = \\dfrac{m \\cdot v^2}{r} = \\dfrac{0.50 \\cdot 2.0^2}{1.0} = \\dfrac{2.0}{1.0} = 2.0\\ \\mathrm{N}$.",
     "You get this if you forget to square the speed $v$."
    ]
   }
  ]
 },
 "fy2-1.6": {
  "kalla": "2033ee1eaf",
  "data": [
   {
    "question": "Which two physical principles are combined in the worked example of the fatal swing?",
    "choices": [
     "Moment and momentum",
     "Newton's third law and pressure",
     "Circular motion (centripetal force) and the principle of conservation of energy",
     "Wave motion and interference"
    ],
    "correct": 2,
    "why": [
     "Moment is not mentioned in this example: it is about forces in a circular path, not about turning.",
     "Newton's third law and pressure do not appear in this example.",
     "The example combines centripetal force (circular motion) at the lowest and highest points of the path with the principle of conservation of energy to find the speed.",
     "Wave motion and interference do not belong in this mechanics example."
    ]
   },
   {
    "question": "Which forces act on the swing seat at the lowest point of the path?",
    "choices": [
     "Only the gravitational force",
     "Only the normal force",
     "The gravitational force and the frictional force",
     "The gravitational force downwards and the tension in the rope upwards"
    ],
    "correct": 3,
    "why": [
     "If only the gravitational force acted, there would be no resultant force upwards towards the centre, and the swing could not follow the circular path.",
     "There is no normal force here: the swing seat hangs from a rope, it does not rest on a surface.",
     "Friction plays no part in this idealised example of a swing on a rope.",
     "At the lowest point, the gravitational force $F_\\mathrm{G}$ acts downwards and the tension $F_\\mathrm{S}$ in the rope acts upwards."
    ]
   },
   {
    "question": "Why must the tension $F_\\mathrm{S}$ be larger than the gravitational force $F_\\mathrm{G}$ at the lowest point of the swing?",
    "choices": [
     "Because the centripetal force points upwards towards the centre and is the resultant of $F_\\mathrm{S}$ and $F_\\mathrm{G}$",
     "Because the rope always weighs more than the person",
     "Because air friction pulls downwards",
     "That is not true: in reality $F_\\mathrm{S}$ is smaller than $F_\\mathrm{G}$ at the lowest point"
    ],
    "correct": 0,
    "why": [
     "The centripetal force points towards the centre of the circle (upwards at the lowest point). Since it is the resultant $F_\\mathrm{S} - F_\\mathrm{G}$, $F_\\mathrm{S}$ must be larger than $F_\\mathrm{G}$ to give a net force upwards.",
     "The rope's own weight is not included in this idealised model: it is the person's mass that determines the forces.",
     "Air resistance is not included in this example.",
     "This is wrong: precisely because the centripetal force must point towards the centre (upwards), $F_\\mathrm{S} > F_\\mathrm{G}$ is required, not the other way round."
    ]
   },
   {
    "question": "How is the velocity at the lowest point of the swing found in this example?",
    "choices": [
     "By measuring the speed directly with a speedometer",
     "With the principle of conservation of energy: the potential energy lost by the centre of gravity is converted into kinetic energy",
     "With the principle of moments $M_1 = M_2$",
     "By assuming that the speed is the same as at the highest point"
    ],
    "correct": 1,
    "why": [
     "No measurement appears in the worked example: the velocity is found theoretically.",
     "The potential energy $E_p = m \\cdot g \\cdot h$ as the centre of gravity \"falls\" is converted into kinetic energy $E_k = \\dfrac{1}{2} m v^2$, which gives the speed at the lowest point.",
     "The principle of moments is not used in this example: it belongs to the section on moments.",
     "The speed is not the same in the two positions: the swing is fastest at the lowest point and (in part b) slowest at the highest point."
    ]
   },
   {
    "question": "In the limiting case in the upper part of the path, just as the rope is about to stop being taut, what holds?",
    "choices": [
     "The tension is at its largest",
     "The speed is zero",
     "The tension is zero and the centripetal force is provided by the gravitational force alone",
     "The gravitational force is zero"
    ],
    "correct": 2,
    "why": [
     "Exactly in the limiting case, the tension is at its minimum (zero), not its maximum.",
     "The swing still has a speed at the upper point: the speed needed for the rope only just not to go slack, not zero.",
     "In the limiting case $F_\\mathrm{S} = 0$, so the whole centripetal force comes from the gravitational force alone: $F_\\mathrm{C} = F_\\mathrm{G}$.",
     "The gravitational force is always present (it depends only on mass and $g$). It is the tension that becomes zero, not the gravitational force."
    ]
   },
   {
    "question": "Which force provides the centripetal force for a satellite orbiting the Earth in a circular orbit?",
    "choices": [
     "The frictional force from the thin remaining air",
     "The gravitational force from the Earth",
     "The thrust from the satellite's rocket engines",
     "The magnetic force from the Earth's magnetic field"
    ],
    "correct": 1,
    "why": [
     "Air resistance at orbital altitude is vanishingly small, and it also points against the motion, not in towards the centre of the Earth.",
     "The only force acting on the satellite is the gravitational force from the Earth, directed in towards the centre of the Earth. That is what provides the centripetal force and keeps the satellite in orbit.",
     "A satellite in a stable circular orbit needs no engines at all: it falls freely around the Earth.",
     "The magnetic force on an ordinary satellite is completely negligible compared with the gravitational force."
    ]
   },
   {
    "question": "Two satellites, one light and one heavy, move in the same circular orbit around the Earth. What can be said about their speeds?",
    "choices": [
     "The heavy one must have a higher speed, since it is pulled harder towards the Earth",
     "The light one must have a higher speed, since it is easier to accelerate",
     "It depends on the shape and size of the satellites",
     "They have the same speed, since the satellite's own mass cancels out of the equation $F_C = F_G$"
    ],
    "correct": 3,
    "why": [
     "The gravitational force on the heavy satellite is indeed larger, but so is the centripetal force required, in exactly the same proportion.",
     "Inertia and the gravitational force grow equally with mass, so the effects cancel out.",
     "Shape and size only affect air resistance, which is negligible at orbital altitude, not the condition for a circular orbit.",
     "When $\\dfrac{m v^2}{r} = G \\cdot \\dfrac{m \\cdot m_j}{r^2}$ is set up, the satellite's mass $m$ cancels from both sides. The speed in a given orbit depends only on the orbit radius and the Earth's mass."
    ]
   }
  ]
 },
 "fy2-1.7": {
  "kalla": "8a63559c40",
  "data": [
   {
    "question": "What characterises a conical pendulum?",
    "choices": [
     "The pendulum swings back and forth in a plane, just like an ordinary pendulum",
     "The pendulum bob stands still while the string rotates about its own axis",
     "The pendulum has two strings instead of one",
     "The pendulum bob moves round in a horizontal circle while the string forms a cone"
    ],
    "correct": 3,
    "why": [
     "That describes an ordinary (plane) pendulum, not a conical pendulum.",
     "In a conical pendulum, the bob itself moves in a circular path: it does not stand still.",
     "A conical pendulum has only one string, which forms a cone as the bob moves round.",
     "This is the definition of a conical pendulum: the bob moves in a horizontal circle while the string traces out a cone."
    ]
   },
   {
    "question": "Which formula gives the period $T$ of a conical pendulum with pendulum length $l$ and angle of deflection α?",
    "choices": [
     "$T = 2\\pi \\sqrt{\\dfrac{l \\cdot \\cos \\alpha}{g}}$",
     "$T = 2\\pi \\sqrt{\\dfrac{l}{g \\cdot \\cos \\alpha}}$",
     "$T = 2\\pi \\sqrt{\\dfrac{g}{l \\cdot \\cos \\alpha}}$",
     "$T = 2\\pi \\cdot l \\cdot \\cos \\alpha \\cdot g$"
    ],
    "correct": 0,
    "why": [
     "This is the correct formula for the period of a conical pendulum.",
     "This has $\\cos \\alpha$ in the wrong place: it should be in the numerator together with $l$, not in the denominator.",
     "This has $g$ and $l \\cdot \\cos \\alpha$ swapped compared with the correct formula.",
     "The formula contains a square root, not just a plain product."
    ]
   },
   {
    "question": "What does the angle α represent in the formula for a conical pendulum?",
    "choices": [
     "The angle between the string and the horizontal circular path",
     "The angle of deflection between the string and the vertical (the vertical line through the point of suspension)",
     "The angle between the gravitational force and the tension",
     "The angle the circular path sweeps out in one second"
    ],
    "correct": 1,
    "why": [
     "α is not measured from the horizontal path but from the vertical line through the point of suspension.",
     "According to the lesson, α is the angle of deflection from the vertical: the angle between the string and the vertical line.",
     "The gravitational force points straight down and the tension along the string up towards the point of suspension, so the angle between them is $180^\\circ - \\alpha$, not α. The angle of deflection α is measured between the string and the vertical line.",
     "What is described is rather related to the angular velocity, not to the angle of deflection α."
    ]
   },
   {
    "question": "What happens to the period $T$ of a conical pendulum if the angle of deflection α increases (with $l$ and $g$ unchanged)?",
    "choices": [
     "T increases, since a larger angle means a longer circular path",
     "T is unaffected by α",
     "T decreases, since $\\cos \\alpha$ decreases when α increases",
     "T becomes negative"
    ],
    "correct": 2,
    "why": [
     "A longer circular path is offset by the pendulum also moving faster at a larger deflection. According to the formula, the net effect is that $T$ decreases, not increases.",
     "α affects $T$ directly through the factor $\\cos \\alpha$ in the formula, so the period is not unaffected.",
     "Since $\\cos \\alpha$ decreases as α grows (towards 90°), the expression under the square root also decreases, and so does $T$.",
     "A time cannot be negative: $\\cos \\alpha$ is positive for all angles between 0° and 90°."
    ]
   },
   {
    "question": "Which of these quantities does NOT appear in the formula for the period of a conical pendulum?",
    "choices": [
     "The pendulum length $l$",
     "The acceleration due to gravity $g$",
     "The angle of deflection α",
     "The mass $m$ of the pendulum bob"
    ],
    "correct": 3,
    "why": [
     "The pendulum length $l$ is part of the formula.",
     "The acceleration due to gravity $g$ is part of the formula.",
     "The angle of deflection α is part of the formula, through $\\cos \\alpha$.",
     "The mass $m$ is not in the formula $T = 2\\pi\\sqrt{l \\cos\\alpha / g}$: the period does not depend on the weight of the pendulum bob."
    ]
   },
   {
    "question": "In the derivation of the formula for a conical pendulum, two force equations are set up: $F_\\mathrm{S} \\cdot \\cos \\alpha = m \\cdot g$ vertically and $F_\\mathrm{S} \\cdot \\sin \\alpha = \\dfrac{4\\pi^{2} \\cdot m \\cdot r}{T^{2}}$ horizontally. Why is one equation divided by the other?",
    "choices": [
     "Because both the tension $F_\\mathrm{S}$ and the mass $m$ then cancel",
     "Because the period $T$ then disappears from the equation",
     "Because the acceleration due to gravity $g$ then cancels",
     "Because the angle α then disappears from the equation"
    ],
    "correct": 0,
    "why": [
     "The division puts $F_\\mathrm{S}$ and $m$ in both the numerator and the denominator, so they cancel. What remains is a relationship between α, $r$, $g$ and $T$ that can be rewritten as the formula for the period.",
     "The period $T$ is exactly the quantity the derivation is meant to solve for: it must remain after the division.",
     "The acceleration due to gravity $g$ is only in one of the equations and therefore remains in the combined expression.",
     "The angle remains after the division, as $\\dfrac{\\sin \\alpha}{\\cos \\alpha}$ on the left-hand side."
    ]
   },
   {
    "question": "A conical pendulum can be used to determine the acceleration due to gravity $g$, as in the example of the flying cow. Which quantities do you need to measure?",
    "choices": [
     "The mass $m$ and the radius of the path $r$",
     "The speed $v$ and the tension $F_\\mathrm{S}$",
     "The height $h$ of the path below the attachment point and the period $T$",
     "The angle α and the mass $m$"
    ],
    "correct": 2,
    "why": [
     "The mass and the radius cancel out of the formula and do not need to be measured.",
     "Neither the speed nor the tension is measured. They only appear in the intermediate steps of the derivation.",
     "Since $h = l \\cos \\alpha$, we get $g = \\dfrac{4\\pi^{2} h}{T^{2}}$, so it is enough to measure the height below the attachment point and the time for one revolution.",
     "The mass cancels out, and the angle does not need to be measured since the height $h$ replaces $l \\cos \\alpha$."
    ]
   }
  ]
 },
 "fy2-1.8": {
  "kalla": "af39a18a20",
  "data": [
   {
    "question": "If air resistance is neglected, how do the velocity and the acceleration in the *x*-direction behave during projectile motion?",
    "choices": [
     "The velocity is constant and the acceleration is zero",
     "The velocity increases linearly and the acceleration is constant and equal to $g$",
     "The velocity decreases linearly to zero",
     "Both the velocity and the acceleration are zero"
    ],
    "correct": 0,
    "why": [
     "Since no forces act in the *x*-direction (without air resistance), $a_\\mathrm{x} = 0$, which gives a constant velocity $v_\\mathrm{x}$.",
     "This describes the motion in the *y*-direction instead, where the acceleration due to gravity $g$ acts.",
     "The velocity in the *x*-direction neither decreases nor increases: it is constant throughout the projectile motion.",
     "The object does move in the *x*-direction (otherwise it would not be projectile motion): the velocity is constant but not zero."
    ]
   },
   {
    "question": "Which expression gives the velocity in the *y*-direction, $v_\\mathrm{y}$, at time $t$ in projectile motion with initial velocity $v_0$ and angle of elevation α?",
    "choices": [
     "$v_\\mathrm{y} = v_0 \\cdot \\cos \\alpha$",
     "$v_\\mathrm{y} = v_0 \\cdot \\sin \\alpha - g \\cdot t$",
     "$v_\\mathrm{y} = v_0 \\cdot \\sin \\alpha + g \\cdot t$",
     "$v_\\mathrm{y} = g \\cdot t$"
    ],
    "correct": 1,
    "why": [
     "This expression has no time dependence and also describes the (constant) velocity component in the *x*-direction, not the *y*-direction.",
     "The initial velocity in the *y*-direction is $v_0 \\cdot \\sin \\alpha$, and since $a_\\mathrm{y} = -g$ the velocity decreases by $g \\cdot t$ over time.",
     "The sign in front of $g \\cdot t$ should be minus, not plus, since the acceleration due to gravity slows down the upward motion.",
     "This expression is missing the contribution from the initial velocity $v_0 \\cdot \\sin \\alpha$."
    ]
   },
   {
    "question": "A ball is thrown with an initial velocity of 10 m/s at an angle of 60° to the ground. What is the x-component of the velocity, $v_\\mathrm{x}$? (Hint: $\\cos 60^{\\circ} = 0.50$.)",
    "choices": [
     "$10\\ \\mathrm{m/s}$",
     "$8.7\\ \\mathrm{m/s}$",
     "$5.0\\ \\mathrm{m/s}$",
     "$0.50\\ \\mathrm{m/s}$"
    ],
    "correct": 2,
    "why": [
     "This is the whole initial velocity $v_0$, without multiplying by $\\cos 60^{\\circ}$.",
     "This corresponds to $v_0 \\cdot \\sin 60^{\\circ}$ (the y-component), not the x-component.",
     "$v_\\mathrm{x} = v_0 \\cdot \\cos \\alpha = 10 \\cdot 0.50 = 5.0\\ \\mathrm{m/s}$.",
     "This is just the value of $\\cos 60^{\\circ}$ without multiplying by $v_0$."
    ]
   },
   {
    "question": "What is the greatest height an object reaches during projectile motion called?",
    "choices": [
     "Range",
     "Elevation height",
     "Top speed",
     "Maximum height"
    ],
    "correct": 3,
    "why": [
     "The range is the horizontal distance the throw covers, not the height.",
     "\"Elevation height\" does not appear in the lesson: the angle of elevation is instead the launch angle α.",
     "\"Top speed\" is not a concept used here: the speed is actually at its lowest (only $v_\\mathrm{x}$ is left) at the highest point.",
     "The greatest height in projectile motion is called the maximum height, $y_{\\max}$."
    ]
   },
   {
    "question": "What is the horizontal distance covered by projectile motion (from launch to landing at the same level) called?",
    "choices": [
     "Range",
     "Maximum height",
     "Period",
     "Lever arm"
    ],
    "correct": 0,
    "why": [
     "The horizontal distance covered by projectile motion is called the range, $x_{\\max}$.",
     "The maximum height is the greatest height, a vertical quantity, not the horizontal distance.",
     "The period belongs to periodic motion such as rotation or oscillation, not to the length of a projectile's path.",
     "The lever arm is a concept from moments, not from projectile motion."
    ]
   },
   {
    "question": "A ball is thrown at a speed of 20 m/s and lands in the same horizontal plane it was thrown from. If air resistance is neglected, what speed does it have just as it lands?",
    "choices": [
     "$0\\ \\mathrm{m/s}$, since the speed always becomes zero on landing",
     "$20\\ \\mathrm{m/s}$: the same speed as at launch",
     "It depends only on the height the ball was thrown from",
     "Always greater than the launch speed, since the gravitational force increases the speed"
    ],
    "correct": 1,
    "why": [
     "The speed is not zero on landing: the ball still has both a horizontal and a vertical velocity component.",
     "When start and finish are in the same horizontal plane, the final velocity is as large as the initial velocity, because of the symmetry of the parabolic path.",
     "The throw already starts and ends at the same level (that is the premise of the question): there is no further difference in height for the speed to depend on.",
     "The gravitational force only changes $v_\\mathrm{y}$, not $v_\\mathrm{x}$. The symmetrical path makes the speed on landing exactly the same as at launch, not greater."
    ]
   },
   {
    "question": "Two identical balls leave the edge of a table at the same instant. One is pushed out horizontally at a speed of 3 m/s, the other is dropped straight down. Ignore air resistance. Which ball hits the floor first?",
    "choices": [
     "The one that is dropped, since it only moves downwards",
     "The one that is pushed out, since it has a higher speed",
     "It depends on the height of the table",
     "They hit the floor at the same time"
    ],
    "correct": 3,
    "why": [
     "The fact that the dropped ball only moves downwards does not make it fall faster. In the *y*-direction both balls have the same acceleration $g$ and the same initial velocity, zero.",
     "The higher speed is entirely in the *x*-direction and does not affect the motion in the *y*-direction. The pushed ball lands further away, but not sooner.",
     "The height of the table decides how long the fall takes, but the time is equally long for both balls whatever the height.",
     "The motion in the *y*-direction is the same for both: a free fall from rest, and the time of fall depends only on the height. The initial velocity in the *x*-direction does not change the time of fall."
    ]
   }
  ]
 },
 "fy2-1.9": {
  "kalla": "953328b122",
  "data": [
   {
    "question": "Why is a numerical method needed to calculate a throw **with** air resistance?",
    "choices": [
     "Air resistance is so small that it cannot be measured",
     "Air resistance depends on the speed, so the acceleration keeps changing and the formulas for constant acceleration do not apply",
     "With air resistance, the velocity in the *x*-direction is constant, but not in the *y*-direction",
     "The formulas for projectile motion only apply to throws straight up"
    ],
    "correct": 1,
    "why": [
     "Air resistance can be large, for a shuttlecock even larger than the gravitational force. The problem is not its size but that it changes during the throw.",
     "The formulas for projectile motion require constant acceleration. Air resistance depends on the speed, and the speed keeps changing, so the acceleration changes too. Instead, the motion is calculated in small time steps.",
     "It is the other way round: with air resistance the ball is slowed down in the *x*-direction too, so the velocity in the *x*-direction is no longer constant.",
     "The formulas for projectile motion apply to all angles, but only if the acceleration is constant, that is without air resistance."
    ]
   },
   {
    "question": "How is the position in the *y*-direction calculated in the next step with the step method?",
    "choices": [
     "$y_{n+1} = y_n + a_{y,n} \\cdot \\Delta t$",
     "$y_{n+1} = v_{y,n} \\cdot \\Delta t$",
     "$y_{n+1} = y_n \\cdot v_{y,n} \\cdot \\Delta t$",
     "$y_{n+1} = y_n + v_{y,n} \\cdot \\Delta t$"
    ],
    "correct": 3,
    "why": [
     "The acceleration times the time step is the change in **velocity**, not in position.",
     "The old position is missing here. The velocity times the time step is only the **change** in position during the step.",
     "The new position should be the old position **plus** the change, not times.",
     "New value = old value + the change. The position changes by the velocity at the start of the step times the time step, $\\Delta y = v_{y,n} \\cdot \\Delta t$."
    ]
   },
   {
    "question": "A simulation with the step method gives a range of 10.57 m with the time step 0.1 s. The exact range is 9.78 m. Roughly what range does the simulation give with the time step 0.05 s?",
    "choices": [
     "10.2 m",
     "10.6 m",
     "9.8 m",
     "11.4 m"
    ],
    "correct": 0,
    "why": [
     "The error is 10.57 − 9.78 = 0.79 m. For the step method, the error is roughly halved when the time step is halved, so the error becomes about 0.40 m and the range about 10.2 m.",
     "A shorter time step gives a smaller error, so the result changes and comes closer to the exact value.",
     "The error decreases, but does not disappear completely. With half the time step it becomes roughly half as large.",
     "A shorter time step gives a **smaller** error, not a larger one. The range 11.4 m belongs to the time step 0.2 s."
    ]
   },
   {
    "question": "A ball with air resistance is on its way **down**, so that $v_y$ is negative. How does air resistance affect the acceleration in the *y*-direction, $a_y = -g - \\dfrac{k \\cdot v \\cdot v_y}{m}$?",
    "choices": [
     "Air resistance makes the acceleration in the *y*-direction more negative, so the ball falls faster",
     "Air resistance only affects the motion in the *x*-direction",
     "The term $-\\dfrac{k \\cdot v \\cdot v_y}{m}$ becomes positive, so air resistance slows the fall",
     "The acceleration becomes exactly $-g$ because air resistance and the gravitational force cancel each other out"
    ],
    "correct": 2,
    "why": [
     "That applies on the way **up**, when $v_y$ is positive. On the way down, air resistance points upwards, against the motion.",
     "Air resistance points opposite to the velocity and therefore has a component in both directions.",
     "When $v_y$ is negative, $-\\dfrac{k \\cdot v \\cdot v_y}{m}$ becomes positive. Air resistance points upwards, against the motion, and slows the fall.",
     "The acceleration is only $-g$ without air resistance. If air resistance and the gravitational force cancel each other out, the acceleration becomes zero instead."
    ]
   }
  ]
 },
 "fy2-2.1": {
  "kalla": "8954896c55",
  "data": [
   {
    "question": "Which relationship describes Hooke's law for a spring?",
    "choices": [
     "$F = m \\cdot a$",
     "$F = k \\cdot \\Delta l$",
     "$F = \\dfrac{k}{\\Delta l}$",
     "$F = k^{2} \\cdot \\Delta l$"
    ],
    "correct": 1,
    "why": [
     "This is Newton's second law: the relationship between resultant force, mass and acceleration. It does not describe the spring force.",
     "Hooke's law says that the force loading (or exerted by) a spring is proportional to the extension $\\Delta l$, with the spring constant *k* as the constant of proportionality.",
     "If the force were inversely proportional to the extension, a small stretch would give an enormous force, which is completely wrong compared with how a spring behaves.",
     "The spring constant *k* only appears to the first power in Hooke's law, not squared."
    ]
   },
   {
    "question": "What is the SI unit of the spring constant *k*?",
    "choices": [
     "N/m",
     "N",
     "J",
     "m/N"
    ],
    "correct": 0,
    "why": [
     "The spring constant gives how many newtons are needed per metre of extension, so the unit is N/m. The larger *k*, the \"stiffer\" the spring.",
     "N is the unit of force *F*, but the spring constant *k* describes how the force relates to the extension, so newtons per metre are needed.",
     "J (joule) is the unit of work and energy, not of spring constant.",
     "This is the unit upside down. With that unit, a large spring constant would mean that the spring stretches a lot for a small force, exactly the opposite of what a \"stiff\" spring does."
    ]
   },
   {
    "question": "What does the minus sign in the formula $F_R = -k \\cdot y$ show for a mass oscillating on a spring?",
    "choices": [
     "That the spring force only exists when the spring is compressed, not when it is stretched",
     "That the spring constant *k* is a negative number",
     "That the force always points towards the equilibrium position, opposite to the displacement",
     "That energy losses make the force decrease over time"
    ],
    "correct": 2,
    "why": [
     "The spring force acts both when stretched and when compressed: the minus sign is about the direction of the force, not about the state of the spring.",
     "The spring constant *k* is always a positive number: it is the direction of the force relative to the displacement that is negative.",
     "The minus sign shows that $F_\\mathrm{R}$ points in the opposite direction to the displacement *y*: the force always pulls the mass back towards the equilibrium position, whichever way it has been pulled out.",
     "The formula $F_R = -k \\cdot y$ applies to the undamped, idealised oscillation and says nothing about energy losses."
    ]
   },
   {
    "question": "In which position of a mass oscillating on a spring is the speed greatest?",
    "choices": [
     "At the turning points",
     "Halfway between a turning point and the equilibrium position",
     "It is the same in all positions",
     "At the equilibrium position"
    ],
    "correct": 3,
    "why": [
     "At the turning points the speed is actually 0: the mass stops for an instant before turning back.",
     "The speed increases gradually all the way to the equilibrium position, so it is not greatest halfway.",
     "The speed clearly varies during the oscillation: it is greatest at the equilibrium position and 0 at the turning points.",
     "At the equilibrium position the resultant force is 0, so nothing slows the motion there: the speed is then at its greatest."
    ]
   },
   {
    "question": "A mass with a weight of 4.0 N is hung on a spring, which extends by 0.20 m. What is the spring constant?",
    "choices": [
     "0.80 N/m",
     "20 N/m",
     "4.2 N/m",
     "200 N/m"
    ],
    "correct": 1,
    "why": [
     "You get this if you multiply force and extension instead of dividing: $k = \\dfrac{F}{\\Delta l}$, not $F \\cdot \\Delta l$.",
     "With Hooke's law, $k = \\dfrac{F}{\\Delta l} = \\dfrac{4.0}{0.20} = 20$ N/m.",
     "This does not agree with the division $\\dfrac{4.0}{0.20}$: check the calculation again.",
     "You get this if you accidentally divide by 0.020 m instead of 0.20 m: check where the decimal point goes."
    ]
   },
   {
    "question": "What is an undamped oscillation called that continues unchanged between the same two turning points, without energy losses?",
    "choices": [
     "Damped oscillation",
     "Resonance oscillation",
     "Longitudinal oscillation",
     "Harmonic oscillation"
    ],
    "correct": 3,
    "why": [
     "A damped oscillation is, on the contrary, an oscillation where the amplitude decreases because of energy losses, for example as heat.",
     "Resonance is about an oscillation being amplified by an external force with the right frequency, not about the oscillation being undamped.",
     "Longitudinal describes how a wave travels (in the direction of motion), not whether an oscillation is damped or not.",
     "A harmonic oscillation is an undamped, periodic oscillation that continues between the same turning points with unchanged amplitude."
    ]
   }
  ]
 },
 "fy2-2.2": {
  "kalla": "79dfab1608",
  "data": [
   {
    "question": "In which position of a spring oscillation is the potential energy greatest?",
    "choices": [
     "At the turning points",
     "At the equilibrium position",
     "Halfway between the equilibrium position and a turning point",
     "It is always the same, whatever the position"
    ],
    "correct": 0,
    "why": [
     "At the turning points the mass is furthest from the equilibrium position and stands still for an instant, so all the energy of the oscillation is potential energy there.",
     "At the equilibrium position the potential energy is actually 0: that is where the kinetic energy is greatest instead.",
     "The potential energy increases gradually all the way out to the turning point, so it is not greatest halfway.",
     "The energy constantly shifts between potential energy and kinetic energy during the oscillation: only the total energy is constant."
    ]
   },
   {
    "question": "Which formula gives the oscillation energy for an oscillation with amplitude *A*?",
    "choices": [
     "$E = k \\cdot A$",
     "$E = \\dfrac{k \\cdot A^{2}}{2}$",
     "$E = \\dfrac{k \\cdot A}{2}$",
     "$E = 2 \\cdot k \\cdot A^{2}$"
    ],
    "correct": 1,
    "why": [
     "The amplitude should be squared in the formula, and the result should be halved: otherwise the unit joule does not come out right.",
     "The oscillation energy is given by $E = \\dfrac{k \\cdot A^{2}}{2}$, the same form as the area of the triangle in an *F*-Δ*l* graph.",
     "The amplitude *A* should be squared ($A^2$), not to the first power: otherwise the calculation does not agree with the area method in the derivation.",
     "Here the factor 2 is in the wrong place: it should be in the denominator (division by 2), not a multiplication."
    ]
   },
   {
    "question": "What can be said about the energy of a mass oscillating on a spring as it passes the equilibrium position?",
    "choices": [
     "All the energy is potential energy",
     "The energy is shared equally between potential energy and kinetic energy",
     "All the energy is kinetic energy",
     "There is no energy in the system at that moment"
    ],
    "correct": 2,
    "why": [
     "It is exactly the other way round: at the equilibrium position the potential energy is 0.",
     "The sharing is not equal in this particular position: at the equilibrium position the energy is entirely kinetic energy.",
     "At the equilibrium position the mass moves fastest. The potential energy is measured from the equilibrium position and is 0 there, so all the energy is kinetic energy.",
     "The total mechanical energy is constant (if we ignore losses): it is still there, just in a different form."
    ]
   },
   {
    "question": "A spring with spring constant 10 N/m is pulled out 0.20 m. How large is the oscillation energy at this turning point?",
    "choices": [
     "1.0 J",
     "2.0 J",
     "0.020 J",
     "0.20 J"
    ],
    "correct": 3,
    "why": [
     "You get this if you forget to square the amplitude, but $A^2$ must be calculated before multiplying by *k*.",
     "You get this if you neither square the amplitude nor divide by 2: $10 \\cdot 0.20 = 2.0$.",
     "That is ten times too small. Check the decimals: $0.20^{2} = 0.040$, and $\\dfrac{10 \\cdot 0.040}{2} = 0.20$.",
     "With $E = \\dfrac{k \\cdot A^{2}}{2} = \\dfrac{10 \\cdot 0.20^{2}}{2} = 0.20$ J, the calculation is right."
    ]
   },
   {
    "question": "Why does the work done in pulling out a spring correspond to the area of a triangle in an *F*-Δ*l* graph, and not the area of a rectangle?",
    "choices": [
     "Because the spring constant *k* decreases during the stretching",
     "Because the work only depends on how fast you pull the spring",
     "Because the force *F* increases in proportion to the extension instead of being constant",
     "Because energy losses make the graph curved"
    ],
    "correct": 2,
    "why": [
     "The spring constant *k* is constant for a given spring: that is exactly why the graph is a straight line.",
     "The work depends on force and distance, not on how fast you pull: the shape of the graph is not changed by the pulling speed.",
     "The force grows linearly with the extension according to Hooke's law ($F = k \\cdot \\Delta l$), so the graph is a straight line through the origin. The area under it is a triangle, not a rectangle (which would have required a constant force).",
     "The graph $F = k \\cdot \\Delta l$ is a straight line because we ignore energy losses in this idealised model."
    ]
   },
   {
    "question": "Two identical springs, each with spring constant *k*, are connected in parallel and carry a mass together. What is the resultant spring constant?",
    "choices": [
     "$\\dfrac{k}{2}$",
     "$2 \\cdot k$",
     "$k$",
     "$k^{2}$"
    ],
    "correct": 1,
    "why": [
     "That is what you get with a series connection, where each spring carries the whole weight and the pair extends twice as much.",
     "In parallel, the springs share the weight and extend only half as much, so $k_\\mathrm{R} = 2 \\cdot k$.",
     "The pair is stiffer than a single spring, since each spring only carries half the weight.",
     "In parallel the spring constants are added, not multiplied. The unit N/m would also come out wrong."
    ]
   }
  ]
 },
 "fy2-2.3": {
  "kalla": "97b09969c4",
  "data": [
   {
    "question": "What is a harmonic oscillation?",
    "choices": [
     "An oscillation whose frequency keeps increasing",
     "An oscillation that only occurs in springs",
     "An oscillation where the amplitude always decreases",
     "An undamped, periodic oscillation along a straight line"
    ],
    "correct": 3,
    "why": [
     "The frequency of a harmonic oscillation is constant: it neither increases nor decreases over time.",
     "Harmonic oscillation is a general type of motion: it also describes, for example, the projection of circular motion, not only springs.",
     "An oscillation with decreasing amplitude is a damped oscillation, the opposite of a harmonic (undamped) oscillation.",
     "A harmonic oscillation is defined as an undamped, periodic oscillation along a straight line, just like an idealised spring oscillation without energy losses."
    ]
   },
   {
    "question": "A harmonic oscillation can be described as...",
    "choices": [
     "The projection of circular motion onto a line",
     "A random motion with no pattern",
     "A motion with constant velocity",
     "A motion that only happens in the vertical direction"
    ],
    "correct": 0,
    "why": [
     "The demonstration with the spinning bicycle wheel shows that a harmonic oscillation is the same as the projection of uniform circular motion onto a straight line.",
     "On the contrary, a harmonic oscillation is very regular and predictable, described by a sine function.",
     "The velocity varies during the oscillation: it is greatest at the equilibrium position and 0 at the turning points, so it is not constant.",
     "A harmonic oscillation can happen along any straight line, not only vertically."
    ]
   },
   {
    "question": "Which relationship describes the displacement *y* as a function of the time *t* in a harmonic oscillation?",
    "choices": [
     "$y = \\omega \\cdot A \\cdot \\cos(\\omega \\cdot t)$",
     "$y = A \\cdot \\omega \\cdot t$",
     "$y = A \\cdot \\sin(\\omega \\cdot t)$",
     "$y = -\\omega^{2} \\cdot A \\cdot \\sin(\\omega \\cdot t)$"
    ],
    "correct": 2,
    "why": [
     "This expression describes the velocity *v*, not the displacement *y*.",
     "The displacement does not vary linearly with time: it follows a sine curve, not a straight line.",
     "The displacement (the position) is given by $y = A \\cdot \\sin(\\omega \\cdot t)$: it varies sinusoidally between $-A$ and $+A$.",
     "This expression describes the acceleration *a*, not the displacement."
    ]
   },
   {
    "question": "What can be said about the velocity and the acceleration at the turning points of a harmonic oscillation?",
    "choices": [
     "The velocity is at its maximum and the acceleration is 0",
     "The velocity is 0 and the acceleration is at its maximum",
     "Both the velocity and the acceleration are 0",
     "Both the velocity and the acceleration are at their maximum"
    ],
    "correct": 1,
    "why": [
     "This describes the equilibrium position instead: there the velocity is at its maximum and the acceleration is 0.",
     "At the turning points the motion has changed direction, so the velocity is momentarily 0, while the restoring force (and therefore the acceleration) is at its greatest.",
     "The acceleration is actually greatest at the turning points, not 0: that is where the restoring force is greatest.",
     "Velocity and acceleration are never at their maximum at the same time in a harmonic oscillation: they are always out of phase with each other."
    ]
   },
   {
    "question": "Which expression gives the angular velocity ω of a mass oscillating on a spring with spring constant *k* and mass *m*?",
    "choices": [
     "$\\omega = \\sqrt{\\dfrac{m}{k}}$",
     "$\\omega = \\dfrac{k}{m}$",
     "$\\omega = k \\cdot m$",
     "$\\omega = \\sqrt{\\dfrac{k}{m}}$"
    ],
    "correct": 3,
    "why": [
     "The fraction under the square root is upside down here: it should be *k* divided by *m*, not the other way round.",
     "The square root is missing: without it the unit (rad/s) does not come out right.",
     "This expression has neither a square root nor a division: it is wrong both in its dimensions and in its form.",
     "The angular velocity of a mass on a spring is given by $\\omega = \\sqrt{\\dfrac{k}{m}}$: a stiffer spring (larger *k*) or a lighter mass (smaller *m*) gives faster oscillation."
    ]
   },
   {
    "question": "An oscillation is described by $y = 0.15 \\sin(10t)$ (SI units). What is the amplitude?",
    "choices": [
     "0.15 m",
     "10 m",
     "1.5 m",
     "10 cm"
    ],
    "correct": 0,
    "why": [
     "Comparing with $y = A \\cdot \\sin(\\omega \\cdot t)$ shows directly that the amplitude is the number in front of the sine function: $A = 0.15$ m.",
     "10 is the angular velocity ω in the unit rad/s, not the amplitude.",
     "1.5 m/s is the maximum speed $v_{\\max} = \\omega \\cdot A$, not the amplitude.",
     "The amplitude is 0.15 m, which corresponds to 15 cm, not 10 cm."
    ]
   }
  ]
 },
 "fy2-2.4": {
  "kalla": "8d57c38b7a",
  "data": [
   {
    "question": "What affects the period of a mass oscillating on a spring?",
    "choices": [
     "Only the mass and the spring constant",
     "Only the amplitude of the oscillation",
     "The mass, the spring constant and the amplitude",
     "Only the spring constant"
    ],
    "correct": 0,
    "why": [
     "The period $T = 2\\pi \\sqrt{\\dfrac{m}{k}}$ depends only on the mass *m* and the spring constant *k*, not on how far the spring is pulled out.",
     "The amplitude does not affect the period at all: an oscillation with a large or a small amplitude takes equally long.",
     "The amplitude is actually not in the formula $T = 2\\pi \\sqrt{\\dfrac{m}{k}}$: only the mass and the spring constant are.",
     "The mass *m* must also be in the formula, not only the spring constant *k*."
    ]
   },
   {
    "question": "Which formula gives the period *T* of a mass *m* hanging on a spring with spring constant *k*?",
    "choices": [
     "$T = 2\\pi \\sqrt{\\dfrac{k}{m}}$",
     "$T = \\dfrac{1}{2\\pi} \\sqrt{\\dfrac{m}{k}}$",
     "$T = 2\\pi \\cdot \\dfrac{m}{k}$",
     "$T = 2\\pi \\sqrt{\\dfrac{m}{k}}$"
    ],
    "correct": 3,
    "why": [
     "The fraction under the square root is upside down: it should be mass divided by spring constant, not the other way round.",
     "The factor $2\\pi$ should multiply, not divide.",
     "The square root is missing in this expression.",
     "The period is given by $T = 2\\pi \\sqrt{\\dfrac{m}{k}}$: a heavier mass gives a longer period, a stiffer spring (larger *k*) gives a shorter period."
    ]
   },
   {
    "question": "If you double the spring constant *k* and keep the same mass, what happens to the period?",
    "choices": [
     "It becomes twice as long",
     "It stays the same",
     "It becomes shorter, but not half as long",
     "It becomes exactly half as long"
    ],
    "correct": 2,
    "why": [
     "A larger spring constant gives faster oscillation (a shorter period), not a longer one: check that you have not mixed up *k* and *m*.",
     "The spring constant *k* is under the square root in the formula, so changing *k* certainly affects the period.",
     "Since *k* is under a square root, the new period is $T_2 = T_1 / \\sqrt{2} \\approx 0.71 \\cdot T_1$: shorter, but not exactly half.",
     "The period decreases by a factor of $\\sqrt{2}$, not by a factor of 2: it is easy to forget that *k* is under a square root."
    ]
   },
   {
    "question": "A mass of 0.50 kg hangs on a spring with spring constant 2.0 N/m. Roughly how long is the period? (Use $\\pi \\approx 3.14$.)",
    "choices": [
     "0.25 s",
     "3.1 s",
     "1.0 s",
     "6.3 s"
    ],
    "correct": 1,
    "why": [
     "This is the ratio $m/k = 0.25$ under the square root, but do not forget to take the square root and then multiply by $2\\pi$.",
     "With $T = 2\\pi \\sqrt{\\dfrac{0.50}{2.0}} = 2\\pi \\sqrt{0.25} = 2\\pi \\cdot 0.50 \\approx 3.1$ s, the calculation is right.",
     "This is the square root of $m/k$ ($\\sqrt{0.25} = 0.50$), but the factor $2\\pi$ is missing from the calculation.",
     "This is twice the right answer: check whether you have multiplied by $4\\pi$ instead of $2\\pi$."
    ]
   },
   {
    "question": "What can you do to change the period of a mass hanging on a given spring?",
    "choices": [
     "Change the mass hanging on the spring",
     "Change the amplitude of the oscillation",
     "Pull the spring out further before releasing it",
     "Move the spring to a place with a different acceleration due to gravity"
    ],
    "correct": 0,
    "why": [
     "Since $T = 2\\pi \\sqrt{\\dfrac{m}{k}}$, the period depends on the mass: hanging a different mass on the same spring changes the period.",
     "The amplitude does not affect the period of an (ideal) spring oscillation.",
     "How far you pull the spring out only determines the amplitude, not the period.",
     "The acceleration due to gravity *g* affects the period of a pendulum, but it does not appear at all in the formula for a spring oscillation."
    ]
   }
  ]
 },
 "fy2-2.5": {
  "kalla": "652ea5d3f4",
  "data": [
   {
    "question": "What affects the period of a simple pendulum at small angles of deflection?",
    "choices": [
     "The pendulum length and the mass of the pendulum bob",
     "Only the mass of the pendulum bob",
     "The pendulum length and the angle of deflection",
     "Only the pendulum length and the acceleration due to gravity"
    ],
    "correct": 3,
    "why": [
     "The mass does not affect the period at all: a heavy and a light pendulum bob of the same length swing equally fast.",
     "The mass does not appear in the formula for the period (it cancels in the derivation), and the pendulum length must be included too.",
     "At small angles of deflection the period does not depend on the angle: that is a condition for the formula to apply.",
     "According to $T = 2\\pi \\sqrt{\\dfrac{l}{g}}$, the period depends only on the pendulum length *l* and the acceleration due to gravity *g*, not on the mass."
    ]
   },
   {
    "question": "Which formula gives the period of a simple pendulum at small angles of deflection?",
    "choices": [
     "$T = 2\\pi \\sqrt{\\dfrac{l}{g}}$",
     "$T = 2\\pi \\sqrt{\\dfrac{g}{l}}$",
     "$T = 2\\pi \\cdot \\dfrac{l}{g}$",
     "$T = \\dfrac{2\\pi}{\\sqrt{l \\cdot g}}$"
    ],
    "correct": 0,
    "why": [
     "The period of a simple pendulum at small angles of deflection is given by $T = 2\\pi \\sqrt{\\dfrac{l}{g}}$.",
     "The fraction under the square root is upside down: the pendulum length should be in the numerator and the acceleration due to gravity in the denominator.",
     "The square root is missing in this expression.",
     "In this expression *l* and *g* appear as a product under the square root, in the denominator, which does not agree with the correct formula."
    ]
   },
   {
    "question": "From where to where is the pendulum length *l* measured?",
    "choices": [
     "From the floor to the bottom edge of the pendulum bob",
     "From the attachment point to the middle of the string",
     "From the attachment point to the centre of gravity of the pendulum bob",
     "From the turning point of the pendulum to its equilibrium position"
    ],
    "correct": 2,
    "why": [
     "The floor has nothing to do with how the pendulum is suspended: the length is measured from the attachment point.",
     "It is the whole length to the centre of gravity of the bob that counts, not just to the midpoint of the string.",
     "The pendulum length is measured from the attachment point (the suspension) to the centre of gravity of the swinging body.",
     "That describes the amplitude (the deflection) of the oscillation instead, not the length of the pendulum."
    ]
   },
   {
    "question": "Why does the formula $T = 2\\pi \\sqrt{\\dfrac{l}{g}}$ only apply to small angles of deflection?",
    "choices": [
     "Because the mass of the string becomes too large at large angles",
     "Because the restoring force is only proportional to the displacement at small angles; otherwise the motion stops being harmonic",
     "Because the acceleration due to gravity *g* changes at large angles",
     "Because the mass of the pendulum increases at large angles"
    ],
    "correct": 1,
    "why": [
     "The mass of the string is assumed to be negligible at any angle: that is a separate condition, not linked to the size of the angle.",
     "The derivation relies on the distance *d* being almost as long as the arc *y*, which is only true at small angles. At larger angles the restoring force stops being proportional to the displacement, and the oscillation is no longer harmonic.",
     "The acceleration due to gravity *g* is constant and does not depend on the pendulum's angle of deflection.",
     "The mass of the pendulum is not changed by the angle of deflection."
    ]
   },
   {
    "question": "A pendulum has a length of 2.45 m. Roughly how long is the period? (Use $g = 9.82$ m/s² and $\\pi \\approx 3.14$.)",
    "choices": [
     "0.50 s",
     "1.6 s",
     "3.1 s",
     "6.3 s"
    ],
    "correct": 2,
    "why": [
     "This is the result of $\\sqrt{l/g}$ ($\\sqrt{0.25} = 0.50$), but the factor $2\\pi$ is missing.",
     "This does not agree with the calculation: check that you have taken the square root of $l/g$ before multiplying by $2\\pi$.",
     "With $T = 2\\pi \\sqrt{\\dfrac{2.45}{9.82}} = 2\\pi \\sqrt{0.25} = 2\\pi \\cdot 0.50 \\approx 3.1$ s, the calculation is right.",
     "This is twice the right answer: check whether you have multiplied by $4\\pi$ instead of $2\\pi$."
    ]
   }
  ]
 },
 "fy2-2.6": {
  "kalla": "885b3b1188",
  "data": [
   {
    "question": "What is the frequency of a system's free oscillation called?",
    "choices": [
     "Resonant frequency",
     "Overtone frequency",
     "Natural frequency",
     "Disturbance frequency"
    ],
    "correct": 2,
    "why": [
     "Resonance is a phenomenon that occurs when something oscillates at the same frequency as the natural frequency: it is not the name of the natural frequency itself.",
     "Overtones are a different concept, not the same as the natural frequency of a free oscillation.",
     "A system's free oscillation (without outside influence) happens at its natural frequency.",
     "This is not an established term in this context."
    ]
   },
   {
    "question": "What is it called when a system oscillates at a frequency set by an external periodic force?",
    "choices": [
     "Forced oscillation",
     "Free oscillation",
     "Resonance oscillation",
     "Harmonic oscillation"
    ],
    "correct": 0,
    "why": [
     "When an external periodic force makes the system oscillate at a certain frequency, it is called a forced oscillation: for example the membrane in a loudspeaker.",
     "A free oscillation, on the other hand, happens without any external force, at the system's natural frequency.",
     "Resonance is a special case that occurs when the driving frequency happens to match the natural frequency: it is not the name of the type of oscillation itself.",
     "Harmonic oscillation describes the shape of the motion (sinusoidal), not whether it is driven by an external force or not."
    ]
   },
   {
    "question": "Which relationship holds between the natural frequency *f* and the period *T*?",
    "choices": [
     "$f = T$",
     "$f = \\dfrac{1}{T}$",
     "$f = 2T$",
     "$f = T^{2}$"
    ],
    "correct": 1,
    "why": [
     "Frequency and period are not the same number: they are each other's reciprocals.",
     "The frequency is the number of oscillations per second, which is the reciprocal of the period: $f = \\dfrac{1}{T}$.",
     "This relationship does not work dimensionally: frequency and period are reciprocals of each other, and no factor of 2 is involved.",
     "Squaring the period does not give the frequency: the relationship is a simple reciprocal, $f = 1/T$."
    ]
   },
   {
    "question": "What is the growth of an oscillation's amplitude called that happens when energy is supplied at the right moment, at the same frequency as the natural frequency?",
    "choices": [
     "Interference",
     "Damping",
     "Overtones",
     "Resonance"
    ],
    "correct": 3,
    "why": [
     "Interference is a different wave phenomenon (when two or more waves meet and combine), not linked to a single oscillation growing at the right frequency.",
     "Damping is the opposite: a process where the amplitude decreases because of energy losses.",
     "Overtones are about additional patterns of oscillation at higher frequencies, not about amplification at the natural frequency.",
     "Resonance occurs when energy is supplied in step with the system's natural frequency, which makes the amplitude grow more and more. A classic example is a swing pushed in the right rhythm."
    ]
   }
  ]
 },
 "fy2-2.7": {
  "kalla": "eaa4745819",
  "data": [
   {
    "question": "What is a single oscillation in a medium called?",
    "choices": [
     "A wave",
     "A period",
     "A pulse",
     "An amplitude"
    ],
    "correct": 2,
    "why": [
     "A wave arises when several pulses are sent out one after another at a certain frequency: a single oscillation is called a pulse.",
     "The period is a measure of time (the time for one complete oscillation), not the name of a single oscillation.",
     "A single oscillation in a medium is called a pulse.",
     "The amplitude is the maximum displacement of the oscillation, not the name of a single oscillation itself."
    ]
   },
   {
    "question": "Which statement correctly describes the difference between a transverse and a longitudinal wave?",
    "choices": [
     "In a transverse wave the medium moves perpendicular to the direction of travel; in a longitudinal wave the medium moves in the same direction as the wave travels",
     "In a transverse wave matter is carried along with the wave; in a longitudinal wave only energy is carried",
     "Transverse waves can only occur in water, longitudinal waves only in air",
     "The only difference is that longitudinal waves are faster"
    ],
    "correct": 0,
    "why": [
     "That is exactly the difference: in a transverse wave (for example on a string) each part of the medium moves perpendicular to the direction the wave travels, whereas in a longitudinal wave (for example sound) the medium moves back and forth in the same direction as the wave travels, as alternating compressions and rarefactions.",
     "Neither type of wave carries matter in the direction of travel: both carry only energy.",
     "Both types of wave can occur in several different media: sound waves (longitudinal) are most common in air, but transverse waves exist on strings and in solid materials, among other places.",
     "The speed depends on the medium and the physical conditions: there is no general rule that longitudinal waves are always faster."
    ]
   },
   {
    "question": "What is the distance between two consecutive wave crests called?",
    "choices": [
     "Amplitude",
     "Frequency",
     "Phase",
     "Wavelength"
    ],
    "correct": 3,
    "why": [
     "The amplitude is the maximum displacement of the oscillation from the equilibrium position, not the distance between two crests.",
     "The frequency gives the number of oscillations per second (Hz), not a distance.",
     "Phase describes where in the oscillation cycle a point is (for example whether two points oscillate in phase or in antiphase), not a distance.",
     "The wavelength, written λ, is the distance from one maximum (crest) to the next and has the SI unit metre."
    ]
   },
   {
    "question": "What does a wave carry, if not matter?",
    "choices": [
     "Nothing at all",
     "Energy",
     "Mass",
     "Only information, no physical quantity"
    ],
    "correct": 1,
    "why": [
     "A wave certainly carries something: energy travels with the wave, even though the matter is not moved along.",
     "A wave does not move matter in the direction of travel, but it carries energy: for example sound energy or radiant energy.",
     "Mass is not moved along with a wave: what is carried is energy.",
     "The transport of energy is a physical quantity, not just abstract information."
    ]
   },
   {
    "question": "Which relationship gives the wave speed *v*?",
    "choices": [
     "$v = \\lambda \\cdot T$",
     "$v = \\dfrac{f}{\\lambda}$",
     "$v = f \\cdot \\lambda$",
     "$v = \\dfrac{T}{\\lambda}$"
    ],
    "correct": 2,
    "why": [
     "Here the relationship between wavelength and period is wrong: it should be a quotient, $\\lambda / T$, not a product.",
     "This expression combines frequency and wavelength the wrong way: the correct relationship is a product, $f \\cdot \\lambda$, not a quotient.",
     "The wave speed is given by $v = \\dfrac{\\lambda}{T} = f \\cdot \\lambda$: since $T = 1/f$, the two forms express the same relationship.",
     "The fraction is upside down: it should be the wavelength divided by the period, $\\lambda / T$, not the other way round."
    ]
   },
   {
    "question": "A wave has a frequency of 5.0 Hz and a wavelength of 2.0 m. What is the wave speed?",
    "choices": [
     "2.5 m/s",
     "0.40 m/s",
     "7.0 m/s",
     "10 m/s"
    ],
    "correct": 3,
    "why": [
     "You get this if you divide the frequency by the wavelength instead of multiplying them.",
     "You get this if you divide the wavelength by the frequency instead of multiplying them.",
     "You get this if you add the frequency and the wavelength instead of multiplying them.",
     "With $v = f \\cdot \\lambda = 5.0 \\cdot 2.0 = 10$ m/s, the calculation is right."
    ]
   }
  ]
 },
 "fy2-2.8": {
  "kalla": "d2a7eb612a",
  "data": [
   {
    "question": "What happens to a crest that is reflected at a fixed end?",
    "choices": [
     "It bounces back as a trough (the wave is turned upside down).",
     "It bounces back as a crest, unchanged.",
     "It is transmitted completely and not reflected at all.",
     "The amplitude doubles on reflection."
    ],
    "correct": 0,
    "why": [
     "At a fixed end, that point is forced to stand still, which turns the incoming crest upside down so that it comes back as a trough.",
     "It is at a free end that a crest comes back as a crest: at a fixed end the wave is instead turned upside down into a trough.",
     "A pulse that meets a fixed end is reflected (bounces back); it is not transmitted further because the end cannot move.",
     "Reflection at a fixed end changes the wave's orientation (up or down), not its amplitude."
    ]
   },
   {
    "question": "What happens to a crest that is reflected at a free end?",
    "choices": [
     "It bounces back as a trough.",
     "It bounces back as a crest, upright.",
     "It is completely absorbed by the end.",
     "The wavelength of the wave is halved on reflection."
    ],
    "correct": 1,
    "why": [
     "A crest becoming a trough happens at a fixed end, not at a free end.",
     "At a free end, the end can move freely, so the crest comes back upright as a crest.",
     "The wave is reflected at the free end instead of disappearing.",
     "Reflection does not change the wavelength, only the wave's orientation (up or down)."
    ]
   },
   {
    "question": "A pulse in a denser medium (for example a heavy spring) meets a less dense medium (a light spring). What can be said about the transmitted and the reflected pulse?",
    "choices": [
     "Transmitted shortened, reflected inverted.",
     "Transmitted unchanged, no reflection occurs.",
     "Transmitted lengthened, reflected upright.",
     "Transmitted lengthened, reflected inverted."
    ],
    "correct": 2,
    "why": [
     "It is the other way round: from a denser to a less dense medium the transmitted pulse is lengthened. A shortened transmitted pulse belongs instead to the transition from a less dense to a denser medium.",
     "Both transmission and reflection happen at the same time when a pulse meets a medium of different density.",
     "From a denser to a less dense medium the pulse is transmitted lengthened, and the reflected part comes back upright.",
     "The reflected pulse is upright in this case: an inverted reflection happens instead at the transition from a less dense to a denser medium."
    ]
   },
   {
    "question": "Two pulses on a string meet. At a certain point, one pulse has the displacement $3.0\\ \\mathrm{cm}$ and the other $-2.0\\ \\mathrm{cm}$ at the same time. What is the resulting displacement according to the principle of superposition?",
    "choices": [
     "$5.0\\ \\mathrm{cm}$",
     "$-5.0\\ \\mathrm{cm}$",
     "$6.0\\ \\mathrm{cm}$",
     "$1.0\\ \\mathrm{cm}$"
    ],
    "correct": 3,
    "why": [
     "That would be the result if both displacements had the same sign; here one of them is negative.",
     "That would be the result of taking the difference with the wrong sign: the principle of superposition adds the displacements directly, with their signs.",
     "Multiplying gives $3.0 \\cdot (-2.0) = -6.0$, and multiplication is the wrong operation anyway. The principle of superposition adds the displacements with their signs.",
     "The principle of superposition says that the resulting displacement is the sum of the individual displacements: $3.0 + (-2.0) = 1.0\\ \\mathrm{cm}$."
    ]
   },
   {
    "question": "How does active noise cancellation in headphones work?",
    "choices": [
     "A microphone picks up the surrounding sound and the headphone sends out an inverted wave that cancels the sound by superposition.",
     "The headphones filter out all high frequencies mechanically with a physical filter.",
     "The headphones amplify all incoming sound so that the background noise is no longer perceived as disturbing.",
     "The headphones send out exactly the same sound wave as the surroundings, but with a lower amplitude."
    ],
    "correct": 0,
    "why": [
     "The electronic circuit creates a wave that is inverted compared with the incoming sound; according to the principle of superposition the sum of the waves is zero, which is perceived as silence.",
     "Noise cancellation works electronically through superposition of waves, not with a physical mechanical filter.",
     "Amplifying the sound would make it even more audible, not quieter.",
     "A lower amplitude of the same wave would only make the sound weaker, not cancel it: the inverted wave (in antiphase) is needed for the displacements to cancel each other out."
    ]
   }
  ]
 },
 "fy2-2.9": {
  "kalla": "65b9e58679",
  "data": [
   {
    "question": "What are the points in a standing wave called that always stay at their zero position, with amplitude 0?",
    "choices": [
     "Antinodes",
     "Nodes",
     "Wavefronts",
     "Source points"
    ],
    "correct": 1,
    "why": [
     "Antinodes are instead the points with maximum amplitude, midway between the nodes.",
     "Nodes are points that do not move at all: the amplitude there is zero.",
     "Wavefronts are a concept used for water waves, for example, not for stationary points on a string.",
     "Source points do not describe the phenomenon: the fixed points in a standing wave are called nodes."
    ]
   },
   {
    "question": "What can be said about energy transport in a standing wave?",
    "choices": [
     "The energy is carried evenly along the whole string, just as in an ordinary travelling wave.",
     "The energy is carried only towards the nodes, where it disappears.",
     "No energy is carried through the medium: instead it is concentrated at the antinodes.",
     "The energy is carried only in the direction of the original wave, never back."
    ],
    "correct": 2,
    "why": [
     "In a standing wave the energy is not carried along the string at all: that is exactly what distinguishes it from an ordinary travelling wave.",
     "The nodes have zero amplitude and no motion; the energy is concentrated at the antinodes instead, not at the nodes.",
     "In standing waves no energy is carried through the medium: it is concentrated at the antinodes, where the amplitude and the motion are greatest.",
     "A standing wave arises from two waves travelling in opposite directions at the same time, so there is no single direction of energy transport."
    ]
   },
   {
    "question": "Which relationship holds between the distance between two neighbouring nodes and the wavelength λ in a standing wave on a string?",
    "choices": [
     "The distance is one whole wavelength λ.",
     "The distance is a quarter of a wavelength λ/4.",
     "The distance depends on the tension in the string and cannot be given in terms of λ.",
     "The distance is half a wavelength λ/2."
    ],
    "correct": 3,
    "why": [
     "One whole wavelength is the distance between two nodes that are two steps apart (antinode-node-antinode-node-antinode), not between two neighbouring nodes.",
     "A quarter of a wavelength is the distance between a node and a neighbouring antinode, not between two nodes.",
     "The relationship λ/2 holds whatever the tension: the tension instead affects the wave speed and therefore which frequency gives a particular wavelength.",
     "Both between two neighbouring nodes and between two neighbouring antinodes, the distance is always half a wavelength, λ/2."
    ]
   },
   {
    "question": "A string oscillates with three antinodes (the second overtone). Which relationship holds between the length $l$ of the string and the wavelength λ?",
    "choices": [
     "$l = \\dfrac{3\\lambda}{2}$",
     "$l = \\dfrac{\\lambda}{2}$",
     "$l = \\lambda$",
     "$l = 2\\lambda$"
    ],
    "correct": 0,
    "why": [
     "Three antinodes mean three half wavelengths along the string: $l = 3 \\cdot \\dfrac{\\lambda}{2} = \\dfrac{3\\lambda}{2}$.",
     "That relationship applies to the fundamental with a single antinode, not to three antinodes.",
     "That relationship applies to the first overtone with two antinodes, not to three antinodes.",
     "The length of the string corresponds to only three half wavelengths, not two whole ones: that would require four antinodes."
    ]
   },
   {
    "question": "A string oscillates in its fundamental (one antinode) with a wavelength of $2.0\\ \\mathrm{m}$ and a frequency of $10\\ \\mathrm{Hz}$. What is the wave speed?",
    "choices": [
     "$5.0\\ \\mathrm{m/s}$",
     "$20\\ \\mathrm{m/s}$",
     "$0.20\\ \\mathrm{m/s}$",
     "$12\\ \\mathrm{m/s}$"
    ],
    "correct": 1,
    "why": [
     "You get this if you divide the frequency by the wavelength instead of multiplying them according to $v = f \\cdot \\lambda$.",
     "According to $v = f \\cdot \\lambda$, $v = 10 \\cdot 2.0 = 20\\ \\mathrm{m/s}$.",
     "You get this if you mix up the formula and divide the wavelength by the frequency.",
     "This does not agree with the formula $v = f \\cdot \\lambda$: it looks like a sum (10 + 2.0) instead of a product."
    ]
   }
  ]
 },
 "fy2-2.10": {
  "kalla": "6fa09288d7",
  "data": [
   {
    "question": "What type of wave motion is sound?",
    "choices": [
     "Transverse",
     "Electromagnetic",
     "Longitudinal",
     "Standing"
    ],
    "correct": 2,
    "why": [
     "Sound is longitudinal: the particles oscillate in the direction the wave travels, not perpendicular to it as in a transverse wave.",
     "Electromagnetic waves (such as light) need no medium and differ from sound, which is a mechanical wave motion in a material.",
     "Sound arises from variations in density in a material, and the particles move back and forth in the same direction as the wave: that defines a longitudinal wave.",
     "A standing wave describes a resulting wave pattern from two waves travelling in opposite directions, not the basic nature of sound."
    ]
   },
   {
    "question": "Roughly what is the speed of sound in air?",
    "choices": [
     "$34\\ \\mathrm{m/s}$",
     "$3\\,400\\ \\mathrm{m/s}$",
     "$300\\,000\\,000\\ \\mathrm{m/s}$",
     "$340\\ \\mathrm{m/s}$"
    ],
    "correct": 3,
    "why": [
     "That is a power of ten too low: the speed of sound in air is about ten times this.",
     "That is a power of ten too high for air, although it may fit better for the speed in some solid materials.",
     "That is the speed of light in a vacuum, a completely different quantity from the speed of sound.",
     "The speed of sound in air is about $340\\ \\mathrm{m/s}$, which corresponds to roughly 1 kilometre in 3 seconds."
    ]
   },
   {
    "question": "Which of the following is true about the speed of sound in different materials?",
    "choices": [
     "$v_\\text{solid} > v_\\text{liquid} > v_\\text{gas}$",
     "$v_\\text{gas} > v_\\text{liquid} > v_\\text{solid}$",
     "$v_\\text{solid} > v_\\text{gas} > v_\\text{liquid}$",
     "The speed of sound is the same in all materials as long as the temperature is the same."
    ],
    "correct": 0,
    "why": [
     "The more tightly the particles are coupled, the faster the sound travels: that is why the speed is greatest in solids and lowest in gases.",
     "It is the other way round: solids conduct sound fastest, not gases.",
     "Liquids conduct sound faster than gases, so an order with gas before liquid is not right.",
     "The material matters a great deal: the tighter the coupling between the particles, the faster the sound. That is why you hear a train sooner through the rail than through the air."
    ]
   },
   {
    "question": "Where do antinodes and nodes occur in a pipe?",
    "choices": [
     "Nodes at open ends, antinodes at closed ends.",
     "Antinodes at open ends, nodes at closed ends.",
     "Antinodes at both open and closed ends.",
     "Nodes at both open and closed ends."
    ],
    "correct": 1,
    "why": [
     "It is the other way round: at an open end the air can oscillate with maximum freedom (antinode), while at a closed end it cannot oscillate at all (node).",
     "At an open end the air can move freely, which gives maximum amplitude (antinode); at a closed end the air cannot oscillate, which gives zero amplitude (node).",
     "Antinodes only occur at open ends: at closed ends the air is forced to stand still, which gives nodes instead.",
     "Nodes only occur at closed ends: at open ends the air can oscillate freely, which gives antinodes instead."
    ]
   },
   {
    "question": "In an open pipe (both ends open) sounding its fundamental, which relationship holds between the length $l$ of the pipe and the wavelength λ?",
    "choices": [
     "$l = \\dfrac{\\lambda}{4}$",
     "$l = \\lambda$",
     "$l = \\dfrac{\\lambda}{2}$",
     "$l = 2\\lambda$"
    ],
    "correct": 2,
    "why": [
     "That relationship applies to the fundamental in a half-open pipe, not in an open pipe.",
     "That relationship applies to the first overtone (three antinodes and two nodes) in an open pipe, not to the fundamental.",
     "The fundamental of an open pipe has an antinode at each end and a node in the middle, which corresponds to half a wavelength along the length of the pipe: $l = \\dfrac{\\lambda}{2}$.",
     "The length of the pipe in the fundamental is shorter than one whole wavelength: such a long pipe compared with λ would require more antinodes."
    ]
   },
   {
    "question": "A half-open pipe has a length of $0.50\\ \\mathrm{m}$ and sounds its fundamental ($n=1$). The formula is $l = \\dfrac{(2n-1)\\cdot\\lambda}{4}$. What is the wavelength?",
    "choices": [
     "$0.50\\ \\mathrm{m}$",
     "$0.25\\ \\mathrm{m}$",
     "$1.0\\ \\mathrm{m}$",
     "$2.0\\ \\mathrm{m}$"
    ],
    "correct": 3,
    "why": [
     "That is the length of the pipe, which is what you get if you forget the factor 4 in the formula.",
     "You get this if you mix up $l$ and λ directly without solving for λ in the formula.",
     "You get this with the relationship for an open pipe, $l = \\dfrac{\\lambda}{2}$. For a half-open pipe in the fundamental, $l = \\dfrac{\\lambda}{4}$.",
     "With $n=1$, $l = \\dfrac{\\lambda}{4}$, so $\\lambda = 4 \\cdot l = 4 \\cdot 0.50 = 2.0\\ \\mathrm{m}$."
    ]
   }
  ]
 },
 "fy2-2.11": {
  "kalla": "614a529f84",
  "data": [
   {
    "question": "What is the SI unit of sound intensity $I$?",
    "choices": [
     "$\\mathrm{W/m^{2}}$",
     "dB",
     "W",
     "Hz"
    ],
    "correct": 0,
    "why": [
     "Sound intensity is defined as power per area, which gives the unit watts per square metre, $\\mathrm{W/m^{2}}$.",
     "The decibel (dB) is the unit of sound level $L$, a different (logarithmic) quantity calculated from the intensity.",
     "The watt (W) is the unit of power $P$, one of the quantities in the formula for intensity, but not the intensity itself.",
     "The hertz (Hz) is the unit of frequency, a completely different quantity from sound intensity."
    ]
   },
   {
    "question": "Which relationship holds for the sound intensity from a point source with power $P$ at distance $r$?",
    "choices": [
     "$I = P \\cdot 4\\pi \\cdot r^{2}$",
     "$I = \\dfrac{P}{4\\pi \\cdot r^{2}}$",
     "$I = \\dfrac{4\\pi \\cdot r^{2}}{P}$",
     "$I = \\dfrac{P}{2\\pi \\cdot r}$"
    ],
    "correct": 1,
    "why": [
     "Multiplying by the area would give an unreasonably large intensity at a large distance; the intensity should instead decrease with distance.",
     "The sound spreads evenly over a spherical surface with area $4\\pi \\cdot r^{2}$, so the intensity is found by dividing the power by this area.",
     "It is the power that should be divided by the area, not the other way round.",
     "The area of a sphere is $4\\pi \\cdot r^{2}$, not $2\\pi \\cdot r$: that formula does not have the right geometry for a point source radiating in all directions."
    ]
   },
   {
    "question": "Which relationship defines the sound level $L$ in decibels?",
    "choices": [
     "$L = 10 \\cdot \\lg\\!\\left(I \\cdot I_0\\right)$",
     "$L = \\dfrac{I}{I_0}$",
     "$L = 10 \\cdot \\lg\\!\\left(\\dfrac{I}{I_0}\\right)$",
     "$L = \\dfrac{\\lg I}{10}$"
    ],
    "correct": 2,
    "why": [
     "The sound level is based on the ratio between $I$ and $I_0$, not on their product.",
     "That ratio lacks the logarithmic conversion that makes the decibel scale match perceived loudness better.",
     "The sound level is defined as ten times the base-10 logarithm of the ratio between the intensity $I$ and the threshold of hearing $I_0$.",
     "The logarithm should be taken of the ratio $I/I_0$, not of $I$ alone, and the result should then be multiplied, not divided, by 10."
    ]
   },
   {
    "question": "An increase in sound level of about $3\\ \\mathrm{dB}$ corresponds roughly to what?",
    "choices": [
     "A tenfold increase in the sound intensity.",
     "No change in the sound intensity.",
     "A halving of the sound intensity.",
     "A doubling of the sound intensity."
    ],
    "correct": 3,
    "why": [
     "A tenfold increase in intensity corresponds instead to an increase of 10 dB, not 3 dB.",
     "A change in dB always corresponds to a change in intensity, since the dB scale is a logarithmic representation of the intensity.",
     "A halving of the intensity corresponds instead to a decrease of about 3 dB, not an increase.",
     "Since $10 \\cdot \\lg 2 \\approx 3$, an increase of 3 dB corresponds to a doubling of the sound intensity."
    ]
   },
   {
    "question": "Roughly which sound level corresponds to the human threshold of pain?",
    "choices": [
     "$120\\ \\mathrm{dB}$",
     "$30\\ \\mathrm{dB}$",
     "$60\\ \\mathrm{dB}$",
     "$100\\ \\mathrm{dB}$"
    ],
    "correct": 0,
    "why": [
     "The threshold of pain, where sound turns into pain, is at about $120\\ \\mathrm{dB}$ (corresponding to an intensity of 1 W/m²).",
     "That is a very quiet level, roughly the background noise in a quiet room, far below the threshold of pain.",
     "That corresponds roughly to a conversation at close range, a normal sound level, not the threshold of pain.",
     "That is a high sound level, but it is still below the threshold of pain. The intensity is only a hundredth of that at the threshold of pain."
    ]
   },
   {
    "question": "A point source sends out a power of $4\\pi\\ \\mathrm{W}$ evenly in all directions. What sound intensity is measured at a distance of $1.0\\ \\mathrm{m}$? (Formula: $I = \\dfrac{P}{4\\pi \\cdot r^{2}}$)",
    "choices": [
     "$4\\pi\\ \\mathrm{W/m^{2}}$",
     "$1.0\\ \\mathrm{W/m^{2}}$",
     "$0.25\\ \\mathrm{W/m^{2}}$",
     "$16\\pi^{2}\\ \\mathrm{W/m^{2}}$"
    ],
    "correct": 1,
    "why": [
     "That is the power $P$, not the intensity you are looking for: the area in the denominator makes the factors $4\\pi$ cancel.",
     "With $P = 4\\pi\\ \\mathrm{W}$ and $r = 1.0\\ \\mathrm{m}$, $I = \\dfrac{4\\pi}{4\\pi \\cdot 1.0^{2}} = 1.0\\ \\mathrm{W/m^{2}}$.",
     "You get this if you only let $\\pi$ cancel and forget that the factor 4 is also in both the numerator and the denominator. All of $4\\pi$ cancels, so $I = 1.0\\ \\mathrm{W/m^{2}}$.",
     "You get this if you accidentally multiply $P$ by the area instead of dividing."
    ]
   }
  ]
 },
 "fy2-2.12": {
  "kalla": "65e1248918",
  "data": [
   {
    "question": "Roughly within which frequency range can the human ear perceive sound?",
    "choices": [
     "$2\\ \\mathrm{Hz}$ to $2\\,000\\ \\mathrm{Hz}$",
     "$200\\ \\mathrm{Hz}$ to $200\\,000\\ \\mathrm{Hz}$",
     "$20\\ \\mathrm{Hz}$ to $20\\,000\\ \\mathrm{Hz}$",
     "$20\\,000\\ \\mathrm{Hz}$ to $200\\,000\\ \\mathrm{Hz}$"
    ],
    "correct": 2,
    "why": [
     "That range is a power of ten too low at both ends compared with the range humans can hear.",
     "The lower limit is a power of ten too high: humans can hear down to 20 Hz, not only down to 200 Hz.",
     "The human ear can normally perceive frequencies between about 20 Hz and 20 000 Hz.",
     "That range lies entirely within (and above) the ultrasound region, far above what the ear can normally perceive."
    ]
   },
   {
    "question": "What is sound with a frequency above $20\\,000\\ \\mathrm{Hz}$ called?",
    "choices": [
     "Infrasound",
     "Supersonic sound",
     "Treble sound",
     "Ultrasound"
    ],
    "correct": 3,
    "why": [
     "Infrasound is instead sound with a frequency below 20 Hz, at the opposite end of the scale.",
     "Supersonic normally refers to speeds above the speed of sound, not to high frequencies.",
     "Treble sound is not an established physics term for high frequencies in this context.",
     "Sound above 20 000 Hz, outside the range humans can hear, is called ultrasound and is used, among other things, in prenatal scans."
    ]
   },
   {
    "question": "What is sound with a frequency below $20\\ \\mathrm{Hz}$ called?",
    "choices": [
     "Infrasound",
     "Ultrasound",
     "Bass sound",
     "Undertones"
    ],
    "correct": 0,
    "why": [
     "Sound below 20 Hz, below the human threshold of hearing, is called infrasound and is generated, for example, by earthquakes and ventilation fans.",
     "Ultrasound is instead above 20 000 Hz, at the opposite end of the scale.",
     "Bass sound is not an established physics term for frequencies below 20 Hz.",
     "Undertones is not the established term for frequencies below the threshold of hearing: the correct term is infrasound."
    ]
   },
   {
    "question": "What is the Doppler effect?",
    "choices": [
     "That the speed of sound in air increases with temperature.",
     "That the perceived frequency changes when the source and the receiver move relative to each other.",
     "That sound cannot travel through a vacuum.",
     "That high notes have a longer wavelength than low notes."
    ],
    "correct": 1,
    "why": [
     "It is true that temperature affects the speed of sound, but that is not what the Doppler effect describes.",
     "The Doppler effect means that the frequency a receiver perceives changes depending on the relative motion between the source and the receiver.",
     "That sound needs a medium and cannot travel through a vacuum is a separate property of sound waves, not the Doppler effect.",
     "High notes actually have a shorter wavelength than low notes (since $v = f \\cdot \\lambda$ with constant $v$): that has nothing directly to do with the Doppler effect."
    ]
   },
   {
    "question": "An ambulance with its siren on drives past a person standing still. How does the person perceive the frequency while the ambulance is approaching and while it is moving away?",
    "choices": [
     "The same frequency all the time, since the person is standing still.",
     "A lower frequency while it approaches, a higher one while it moves away.",
     "A higher frequency while it approaches, a lower one while it moves away.",
     "The frequency keeps increasing whatever the direction."
    ],
    "correct": 2,
    "why": [
     "It is the relative motion between the source and the receiver that determines the Doppler effect: it is enough for the ambulance to move, the person does not have to.",
     "It is the other way round: an observer in front of an approaching sound source perceives a higher frequency, not a lower one.",
     "An observer in front of the source (which the ambulance is approaching) perceives a higher frequency, and an observer it leaves behind perceives a lower frequency.",
     "The frequency cannot keep increasing: it is higher while the ambulance approaches and lower after it has passed."
    ]
   },
   {
    "question": "What causes a sonic boom?",
    "choices": [
     "A sound wave being reflected repeatedly off the ground.",
     "The frequency dropping below the human threshold of hearing.",
     "Two sound waves with exactly the same frequency meeting in phase.",
     "An object passing the speed of sound and catching up with its own sound waves."
    ],
    "correct": 3,
    "why": [
     "Repeated reflection off the ground describes an echo, not the phenomenon behind a sonic boom.",
     "A sonic boom is not about the frequency becoming too low to hear, but about a powerful sound pressure building up.",
     "What is described is constructive interference, a different phenomenon from what causes a sonic boom.",
     "When an object moves faster than sound, it catches up with the sound waves it has sent out, which are squeezed together into a powerful pressure wave: a sonic boom."
    ]
   }
  ]
 },
 "fy2-2.13": {
  "kalla": "9ac1317266",
  "data": [
   {
    "question": "What type of wave source produces circular water waves?",
    "choices": [
     "A point source, for example a point dipped into the water.",
     "A straight, linear wave source moving back and forth.",
     "Only waves caused by wind can become circular.",
     "A wave source that extends infinitely in one direction."
    ],
    "correct": 0,
    "why": [
     "A point source sends out pulses radially in all directions, which gives circular wavefronts.",
     "A linear (straight) wave source produces plane waves instead, with straight, parallel wavefronts.",
     "Wind can produce waves of different kinds, but it is the shape of the source (point or line) that decides whether the waves become circular or plane.",
     "A source that extends infinitely in one direction gives straight, plane wavefronts, not circular ones."
    ]
   },
   {
    "question": "What does the law of reflection say for water waves?",
    "choices": [
     "The angle of incidence is always twice the angle of reflection.",
     "The angle of incidence is equal to the angle of reflection.",
     "The angle of reflection depends on the wavelength of the wave.",
     "The angles are measured from the plane of the reflecting surface, not from the normal."
    ],
    "correct": 1,
    "why": [
     "The law of reflection says that the angles are exactly equal, not that one is twice the other.",
     "The law of reflection ($i = r$) says that the angle of incidence is equal to the angle of reflection, both measured from the normal.",
     "The angle of reflection is determined by the angle of incidence, not directly by the wavelength.",
     "The angles are measured from the normal (a line perpendicular to the reflecting surface), not from the plane of the surface itself."
    ]
   },
   {
    "question": "What happens to the wavelength and speed of a water wave when it goes from deeper to shallower water?",
    "choices": [
     "Both increase.",
     "The wavelength increases but the speed decreases.",
     "Both decrease.",
     "Both stay the same."
    ],
    "correct": 2,
    "why": [
     "On moving into shallower water the wave is slowed down: both the speed and the wavelength decrease, they do not increase.",
     "The wavelength decreases together with the speed when the wave is slowed down in shallower water; it does not increase.",
     "The wave is refracted towards the normal and slowed down in shallower water, which makes both the speed and the wavelength decrease.",
     "Something does change: it is exactly this change in speed and wavelength that makes the wave refract and change direction."
    ]
   },
   {
    "question": "Which quantity stays constant when a water wave is refracted between different depths?",
    "choices": [
     "The wavelength",
     "The wave speed",
     "The amplitude",
     "The frequency"
    ],
    "correct": 3,
    "why": [
     "The wavelength changes with depth: it decreases in shallower water and increases in deeper water.",
     "The speed changes with depth, just like the wavelength: that is why refraction happens at all.",
     "The amplitude is not mentioned as a conserved quantity in refraction: what stays constant is the frequency.",
     "The frequency is determined by the source that creates the wave and does not change when the wave enters a region of different depth, even though the speed and wavelength change."
    ]
   },
   {
    "question": "Which relationship describes the law of refraction for water waves?",
    "choices": [
     "$\\dfrac{\\sin i}{\\sin b} = \\dfrac{v_1}{v_2} = \\dfrac{\\lambda_1}{\\lambda_2}$",
     "$\\sin i \\cdot \\sin b = v_1 \\cdot v_2$",
     "$\\dfrac{\\sin i}{\\sin b} = \\dfrac{v_2}{v_1}$",
     "$i - b = \\dfrac{\\lambda_1}{\\lambda_2}$"
    ],
    "correct": 0,
    "why": [
     "The law of refraction says that the ratio between the sines of the angle of incidence and the angle of refraction is equal to the ratio between the speeds, which in turn is equal to the ratio between the wavelengths in the two media.",
     "The law of refraction is based on a ratio between the sines, not a product of them.",
     "The ratio between the speeds should be $v_1/v_2$, not the other way round, $v_2/v_1$.",
     "The relationship involves ratios between the quantities, not a difference between the angles."
    ]
   },
   {
    "question": "A wave with a speed of $6.0\\ \\mathrm{m/s}$ in deep water moves into shallower water where the speed is $3.0\\ \\mathrm{m/s}$. The angle of incidence is such that $\\sin i = 0.80$. What is $\\sin b$?",
    "choices": [
     "$1.6$",
     "$0.40$",
     "$0.80$",
     "$0.20$"
    ],
    "correct": 1,
    "why": [
     "That value is larger than 1 and cannot be the sine of an angle: it suggests that the ratio $v_1/v_2$ has been turned upside down.",
     "According to the law of refraction, $\\sin b = \\sin i \\cdot \\dfrac{v_2}{v_1} = 0.80 \\cdot \\dfrac{3.0}{6.0} = 0.40$.",
     "That is the same value as $\\sin i$: it would mean that the angle does not change at all on refraction, which is only true if the speeds are equal.",
     "You get this if you accidentally divide by the wrong speed ratio (for example a quarter instead of a half)."
    ]
   }
  ]
 },
 "fy2-2.14": {
  "kalla": "9654b038c1",
  "data": [
   {
    "question": "What is the phenomenon called when waves bend at the edges of an opening?",
    "choices": [
     "Interference",
     "Refraction",
     "Diffraction",
     "Reflection"
    ],
    "correct": 2,
    "why": [
     "Interference describes how waves affect each other when they meet, not how a single wave bends at an opening.",
     "Refraction is the change of direction that happens when a wave moves between different media (for example different depths), not bending at an opening.",
     "Diffraction is exactly the phenomenon where a wave bends at the edges of an obstacle or an opening, as if the opening became a new wave source.",
     "Reflection means that a wave bounces back off an obstacle, not that it bends round an opening."
    ]
   },
   {
    "question": "What are lines called where two waves meet in antiphase and cancel each other out?",
    "choices": [
     "Antinodal lines",
     "Wavefronts",
     "Lines of symmetry",
     "Nodal lines"
    ],
    "correct": 3,
    "why": [
     "Antinodal lines are instead where the waves meet in phase and reinforce each other as much as possible.",
     "Wavefronts describe the shape of the wave at a given moment, not where the interference is destructive.",
     "Lines of symmetry is not an established term in this context.",
     "On nodal lines a crest from one source always meets a trough from the other (antiphase), which gives destructive interference and zero amplitude."
    ]
   },
   {
    "question": "What is it called when two waves reinforce each other as much as possible?",
    "choices": [
     "Constructive interference",
     "Destructive interference",
     "Diffraction",
     "Refraction"
    ],
    "correct": 0,
    "why": [
     "When waves meet in phase and reinforce each other as much as possible, it is called constructive interference.",
     "Destructive interference is the opposite: the waves then cancel each other out instead of reinforcing each other.",
     "Diffraction is about waves bending at an opening or an obstacle, not about how two waves reinforce each other.",
     "Refraction is the change of direction when a wave moves between media, a different phenomenon from interference between two waves."
    ]
   },
   {
    "question": "Which condition holds for the path difference $\\Delta s$ on an antinodal line (constructive interference)?",
    "choices": [
     "$\\Delta s = \\left(n + \\dfrac{1}{2}\\right) \\cdot \\lambda$",
     "$\\Delta s = n \\cdot \\lambda$",
     "$\\Delta s = 2n \\cdot \\lambda$",
     "$\\Delta s = \\sqrt{n} \\cdot \\lambda$"
    ],
    "correct": 1,
    "why": [
     "That condition applies instead to nodal lines (destructive interference), where the waves meet in antiphase.",
     "On an antinodal line the waves meet in phase, which happens when the path difference is a whole number of wavelengths: $\\Delta s = n \\cdot \\lambda$.",
     "Requiring even multiples of λ is too strict: odd whole numbers ($n=1,3,5,\\ldots$) also give constructive interference with the correct condition.",
     "The condition for constructive interference is linear in $n$, not a square root of $n$."
    ]
   },
   {
    "question": "Which condition holds for the path difference $\\Delta s$ on a nodal line (destructive interference)?",
    "choices": [
     "$\\Delta s = n \\cdot \\lambda$",
     "$\\Delta s = 2n \\cdot \\lambda$",
     "$\\Delta s = \\left(n + \\dfrac{1}{2}\\right) \\cdot \\lambda$",
     "$\\Delta s = \\sqrt{n} \\cdot \\lambda$"
    ],
    "correct": 2,
    "why": [
     "That condition applies instead to antinodal lines (constructive interference), where the waves meet in phase.",
     "Requiring even multiples of λ does not describe destructive interference correctly.",
     "On a nodal line the waves meet in antiphase, which happens when the path difference is a whole number of wavelengths plus a half: $\\Delta s = \\left(n + \\dfrac{1}{2}\\right) \\cdot \\lambda$.",
     "The condition for destructive interference is linear in $n$ (plus a half), not a square root of $n$."
    ]
   },
   {
    "question": "A point lies on a nodal line. The distance to one loudspeaker is $12.0\\ \\mathrm{m}$ and to the other $10.5\\ \\mathrm{m}$. This is the zeroth nodal line ($n=0$). What is the wavelength λ? (Hint: $\\Delta s = \\left(n+\\dfrac{1}{2}\\right)\\lambda$)",
    "choices": [
     "$1.5\\ \\mathrm{m}$",
     "$0.75\\ \\mathrm{m}$",
     "$6.0\\ \\mathrm{m}$",
     "$3.0\\ \\mathrm{m}$"
    ],
    "correct": 3,
    "why": [
     "That is the path difference $\\Delta s$ itself, not the wavelength you are looking for.",
     "You get this if you mix up $\\Delta s$ and λ and divide the wrong way.",
     "That would correspond to $\\Delta s = \\dfrac{\\lambda}{4}$, but the zeroth nodal line requires $\\Delta s = \\dfrac{\\lambda}{2}$.",
     "With $n=0$, $\\Delta s = \\dfrac{1}{2}\\lambda$, so $\\lambda = 2 \\cdot \\Delta s = 2 \\cdot 1.5 = 3.0\\ \\mathrm{m}$."
    ]
   }
  ]
 },
 "fy2-3.1": {
  "kalla": "6c532e41f0",
  "data": [
   {
    "question": "According to the lesson, what determines the direction of the magnetic field at a given point?",
    "choices": [
     "The direction in which the south end of a compass needle points",
     "The distance to the nearest magnet",
     "The direction in which the north end of a compass needle points",
     "The velocity of a charge at the point"
    ],
    "correct": 2,
    "why": [
     "The direction of the field is defined not by the south end but by the north end of the compass: that is the end that points in the direction of the field.",
     "The distance affects how strong the field is, not which direction it points in.",
     "A small compass placed in the field lines up so that its north end points in the direction of the field. That is the very definition of the field's direction at the point.",
     "The velocity of a charge determines the magnetic force on that particular charge (covered in a later section), but it does not define the direction of the field at a point."
    ]
   },
   {
    "question": "A bar magnet with a north end and a south end is cut in half. What happens?",
    "choices": [
     "You get two new, shorter magnets, each with its own north end and south end",
     "One piece becomes an isolated north end and the other an isolated south end",
     "The magnetism disappears completely because the magnet is destroyed",
     "Only the piece that already had the north end keeps its magnetic properties"
    ],
    "correct": 0,
    "why": [
     "Magnetic poles always come in pairs. If a magnet is cut in the middle, two shorter magnets are formed, each with its own north end and south end, just as in the demonstration with the broken bar magnet.",
     "It is never possible to make a magnet with only one pole (a magnetic monopole). Instead, when the magnet is cut, a new pole of the opposite kind forms at the break on both pieces.",
     "The magnetism does not disappear when the magnet is cut: both pieces stay magnetic, just shorter.",
     "Both pieces have magnetic properties after the cut, not just the one that already had a pole of a particular kind."
    ]
   },
   {
    "question": "Which rule describes how magnetic poles affect each other?",
    "choices": [
     "Like poles attract each other, unlike poles repel",
     "All poles attract each other regardless of type",
     "Poles only affect each other when in direct contact",
     "Like poles repel each other, unlike poles attract each other"
    ],
    "correct": 3,
    "why": [
     "This is the opposite of the actual rule: like poles repel each other, while unlike poles attract each other.",
     "Poles do not attract each other regardless of type: two north ends (or two south ends) repel each other.",
     "Magnetic forces act at a distance, just like gravity and electric forces. The poles do not need to be in contact to affect each other.",
     "Just as for electric charge, like magnetic poles (N–N or S–S) repel each other, while unlike poles (N–S) attract each other."
    ]
   },
   {
    "question": "How are the field lines of the magnetic field around a bar magnet drawn?",
    "choices": [
     "They leave the south end and enter the north end",
     "They leave the north end and enter the south end",
     "They form straight lines right through the magnet without bending",
     "They only appear between two separate magnets, not around a single magnet"
    ],
    "correct": 1,
    "why": [
     "The direction is the other way round: the field lines leave the north end, not the south end.",
     "Outside the magnet the field lines run from the north end to the south end, just as in the figure with the bar magnet. Inside the magnet they close from south to north, so every field line is a closed curve.",
     "The field lines bend in large arcs between the poles. They do not run straight through the magnet as straight lines.",
     "A single magnet has its own pattern of field lines, which outside the magnet runs from its north end to its south end. Two magnets are not needed for field lines to exist."
    ]
   },
   {
    "question": "What do field lines that are closer together in a figure of a magnetic field indicate?",
    "choices": [
     "That the field is weaker there",
     "That the temperature of the magnet is higher there",
     "That the field is stronger there",
     "That the field lines are drawn incorrectly"
    ],
    "correct": 2,
    "why": [
     "It is the other way round: the closer together the field lines are, the stronger the field, not weaker.",
     "The density of the field lines shows the strength of the field. It has nothing to do with the temperature of the magnet.",
     "The closer together the field lines, the stronger the magnetic field. That is the whole point of drawing field lines with varying density.",
     "Field lines packed closely near the poles are drawn correctly: this reflects the fact that the field is strongest there."
    ]
   }
  ]
 },
 "fy2-3.2": {
  "kalla": "dda7fee21b",
  "data": [
   {
    "question": "What did Hans Christian Ørsted's experiment with a compass needle near a current-carrying conductor show?",
    "choices": [
     "That the deflection of the compass needle depends only on the Earth's magnetic field",
     "That a current-carrying conductor produces a magnetic field that can deflect a compass needle",
     "That only permanent magnets can create magnetic fields",
     "That the current in a conductor does not affect magnetic fields"
    ],
    "correct": 1,
    "why": [
     "The deflection of the compass needle in the experiment was caused precisely by the current in the conductor creating a field of its own, not only by the Earth's magnetic field.",
     "Ørsted discovered that a current-carrying conductor creates a magnetic field around it, which made the compass needle turn away from its usual north–south direction.",
     "On the contrary, the experiment showed that a current-carrying conductor (not only permanent magnets) also creates a magnetic field.",
     "The experiment showed exactly the opposite: the current in the conductor produced a clear magnetic field that affected the compass needle."
    ]
   },
   {
    "question": "In the right-hand thumb rule for the field around a straight conductor, what do the thumb and the fingers of the right hand represent?",
    "choices": [
     "The thumb the direction of the field, the fingers the direction of the current",
     "The thumb the direction of the force, the fingers the direction of the current",
     "The thumb and the fingers both represent the direction of the current",
     "The thumb the direction of the current, the fingers the direction of the field"
    ],
    "correct": 3,
    "why": [
     "It is the other way round: the thumb corresponds to the direction of the current, and the fingers show the direction of the field around the conductor.",
     "The direction of the force is found with a different rule (for charges and conductors in a field, in a later section). For the field around a straight conductor, the thumb rule is only about current and field.",
     "The thumb and the fingers do not represent the same thing: the thumb is the direction of the current and the fingers show how the field wraps around the conductor.",
     "The thumb of the right hand corresponds to the direction of the current, and the fingers, gripping the conductor, show the direction of the magnetic field around it."
    ]
   },
   {
    "question": "What is the SI unit of the magnetic flux density *B*?",
    "choices": [
     "T (tesla)",
     "N (newton)",
     "V (volt)",
     "A (ampere)"
    ],
    "correct": 0,
    "why": [
     "Magnetic flux density is denoted *B* and measured in tesla (T). Even 1 T is a very strong magnetic field.",
     "The newton (N) is the unit of force, not of magnetic flux density.",
     "The volt (V) is the unit of voltage (and induced voltage), not of magnetic flux density.",
     "The ampere (A) is the unit of electric current, not of the strength of the magnetic field."
    ]
   },
   {
    "question": "How is it shown in a figure that a vector (for example a current or a field) points straight into the paper?",
    "choices": [
     "A dot in a circle",
     "A double arrow",
     "A cross in a circle",
     "An arrow pointing straight up"
    ],
    "correct": 2,
    "why": [
     "A dot in a circle means the opposite: the vector points straight out of the paper, towards the viewer.",
     "A double arrow is not used as notation for a direction into or out of the plane.",
     "A cross in a circle represents the feathers of an arrow seen from behind, so the vector points straight into the paper, away from the viewer.",
     "An arrow pointing straight up shows a direction in the surface of the plane itself, not perpendicular into or out of it."
    ]
   },
   {
    "question": "According to the relationship $B = k \\cdot \\dfrac{I}{d}$, what happens to the magnetic flux density if the distance *d* to the conductor is doubled while the current stays the same?",
    "choices": [
     "*B* is doubled",
     "*B* is halved",
     "*B* becomes four times as large",
     "*B* is not affected"
    ],
    "correct": 1,
    "why": [
     "*B* is inversely proportional to the distance *d*: if *d* is doubled, *B* is halved, not doubled.",
     "Since *B* is inversely proportional to *d* in the formula $B = k \\cdot \\dfrac{I}{d}$, doubling the distance halves the flux density.",
     "The relationship is simply inverse (not inverse square) in the distance, so *B* becomes half as large, not a quarter or four times as large.",
     "The distance *d* is in the denominator of the formula, so it definitely affects the size of *B*."
    ]
   },
   {
    "question": "A straight conductor carries the current *I* = 5.0 A. Calculate the magnetic flux density at the distance *d* = 0.10 m from the conductor ($k = 2 \\cdot 10^{-7}$ T·m/A).",
    "choices": [
     "$1.0\\ \\mathrm{\\mu T}$",
     "$100\\ \\mathrm{\\mu T}$",
     "$0.10\\ \\mathrm{\\mu T}$",
     "$10\\ \\mathrm{\\mu T}$"
    ],
    "correct": 3,
    "why": [
     "This corresponds to a calculation where the distance was mistakenly taken as 1.0 m instead of 0.10 m.",
     "This is ten times too large. A common source of error is handling the powers of ten incorrectly in the calculation.",
     "This is a hundred times too small compared with the correct answer.",
     "$B = k \\cdot \\dfrac{I}{d} = 2 \\cdot 10^{-7} \\cdot \\dfrac{5.0}{0.10} = 1.0 \\cdot 10^{-5}\\ \\mathrm{T} = 10\\ \\mathrm{\\mu T}$."
    ]
   }
  ]
 },
 "fy2-3.3": {
  "kalla": "11e1115cdc",
  "data": [
   {
    "question": "What is formed when a current-carrying conductor is shaped into a circle?",
    "choices": [
     "A solenoid",
     "A loop",
     "A transformer",
     "A permanent magnet"
    ],
    "correct": 1,
    "why": [
     "A solenoid is a long straight coil made of many wound turns. A single circular conductor is instead called a loop.",
     "A circular current-carrying conductor is called a loop. The fields from the different parts of the loop combine and become stronger inside the loop.",
     "A transformer is a completely different component, built from coils around a common core, not a single loop.",
     "A permanent magnet is made of a ferromagnetic material that keeps its magnetism, not a current loop."
    ]
   },
   {
    "question": "What is a long, straight coil called, and how is the magnetic field inside it described?",
    "choices": [
     "A loop; the field is strongest at the edges",
     "A generator; the field varies strongly inside",
     "A solenoid; the field is uniform (equally strong everywhere) inside",
     "A toroid; the field is zero inside"
    ],
    "correct": 2,
    "why": [
     "A loop is a single turn of a conductor, not a long straight coil with many turns, and the field inside a long coil is described as uniform, not strongest at the edges.",
     "A generator is a completely different device that converts kinetic energy into electrical energy, not the name of a type of coil.",
     "A long straight coil is called a solenoid, and the magnetic field inside it is regarded as uniform: equally strong everywhere.",
     "A toroid is a ring-shaped coil, and the field inside a solenoid is not zero. On the contrary, it is strengthened by all the turns together."
    ]
   },
   {
    "question": "In the thumb rule for a coil, what do the fingers and the thumb of the right hand correspond to?",
    "choices": [
     "The fingers the direction of the current around the coil, the thumb the direction of the field through the coil",
     "The thumb the direction of the current, the fingers the direction of the field",
     "Both represent the direction of the current",
     "The fingers give the strength of the field, the thumb gives the current"
    ],
    "correct": 0,
    "why": [
     "For a coil you let the fingers follow the direction of the current around the turns of the coil, and the thumb then points in the direction of the field through the coil. This is the reverse of the thumb rule for a straight conductor.",
     "That is the reverse of the thumb rule for a straight conductor. For a coil it is the fingers that show the direction of the current and the thumb that shows the field.",
     "The thumb and the fingers represent different things in this rule: the fingers show the direction of the current and the thumb the direction of the field.",
     "The rule is about directions, not about reading off the strength of the field or the current."
    ]
   },
   {
    "question": "In the formula $B = \\mu_0 \\cdot \\dfrac{n \\cdot I}{l}$ for a solenoid, what does *n* represent?",
    "choices": [
     "The length of the coil",
     "The current through the coil",
     "The permeability of free space",
     "The number of turns in the coil"
    ],
    "correct": 3,
    "why": [
     "The length of the coil is denoted *l* in the formula, not *n*.",
     "The current through the coil is denoted *I*, not *n*.",
     "The permeability of free space is denoted $\\mu_0$ and is a constant, not the same thing as *n*.",
     "*n* is the number of turns in the coil. According to the formula, more turns give a stronger field."
    ]
   },
   {
    "question": "A coil with 100 turns and length 0.50 m carries a current of 2.0 A. Approximately how large is the magnetic flux density inside the coil ($\\mu_0 = 4\\pi \\cdot 10^{-7}$ T·m/A)?",
    "choices": [
     "$0.050\\ \\mathrm{mT}$",
     "$0.50\\ \\mathrm{mT}$",
     "$5.0\\ \\mathrm{mT}$",
     "$50\\ \\mathrm{mT}$"
    ],
    "correct": 1,
    "why": [
     "This is ten times too small compared with the correct answer.",
     "$B = \\mu_0 \\cdot \\dfrac{n \\cdot I}{l} = 4\\pi \\cdot 10^{-7} \\cdot \\dfrac{100 \\cdot 2.0}{0.50} \\approx 5.0 \\cdot 10^{-4}\\ \\mathrm{T} = 0.50\\ \\mathrm{mT}$.",
     "This is ten times too large compared with the correct answer.",
     "This is a hundred times too large. Check that the length is converted to metres and that the number of turns has not been counted twice."
    ]
   }
  ]
 },
 "fy2-3.4": {
  "kalla": "aa94143440",
  "data": [
   {
    "question": "According to the reasoning in the section, why must a magnetic field exert a force on a moving charge?",
    "choices": [
     "Because all magnetic fields contain electric charge",
     "Because of Newton's first law of inertia",
     "Because of Newton's third law: if a moving charge (current) exerts a force on a magnet, the magnet must also exert an equal and opposite force on the moving charge",
     "Because charges always move in circles in magnetic fields"
    ],
    "correct": 2,
    "why": [
     "Magnetic fields do not consist of electric charge. They arise around magnets and current-carrying conductors, but the field itself is not charged.",
     "Newton's first law says that bodies stay in motion or at rest if no force acts on them. It does not explain why fields and charges affect each other mutually.",
     "Since current-carrying conductors (moving charges) exert a force on magnets, Newton's third law means the magnet must also exert an equal and opposite force on the moving charges.",
     "The fact that charges can move in circular paths in a magnetic field is a consequence of the magnetic force, not the reason the force exists."
    ]
   },
   {
    "question": "In the right-hand rule for the magnetic force on a charge, what do the thumb, the index finger and the middle finger correspond to?",
    "choices": [
     "The thumb the force, the index finger the current, the middle finger the field",
     "The thumb the direction of the current, the index finger the direction of the field, the middle finger the direction of the force",
     "The thumb the direction of the field, the index finger the direction of the force, the middle finger the direction of the current",
     "All three fingers correspond to the direction of the field from different angles"
    ],
    "correct": 1,
    "why": [
     "The order is wrong: the thumb corresponds to the direction of the current, not the force.",
     "The thumb corresponds to the direction of the current *I*, the index finger to the direction of the magnetic field *B*, and the middle finger to the direction of the force *F*. The three are held perpendicular to each other.",
     "The fingers have swapped places compared with the correct rule: it is the thumb that shows the current, not the field.",
     "The three fingers represent three different quantities (current, field, force), not the same field seen from different directions."
    ]
   },
   {
    "question": "A negatively charged particle moves to the right in a magnetic field. Which direction should the \"current direction\" (the thumb) be given when applying the right-hand rule?",
    "choices": [
     "To the right, the same direction as the particle",
     "Upwards, perpendicular to the motion",
     "The direction does not matter for negative charges",
     "To the left, opposite to the particle's motion"
    ],
    "correct": 3,
    "why": [
     "That only applies to positive charges. For a negative charge the current direction is opposite to the direction of motion.",
     "The current direction should follow the line of the charge's motion (forwards or backwards), not an arbitrary perpendicular direction.",
     "The sign of the charge does decide which way the thumb should point: it matters a great deal.",
     "For a negative charge the current direction is opposite to the direction of motion, so if the particle moves to the right, the thumb should point to the left."
    ]
   },
   {
    "question": "Which formula describes the magnetic force on a charged particle moving perpendicular to a magnetic field?",
    "choices": [
     "$F = q \\cdot v \\cdot B$",
     "$F = B \\cdot I \\cdot l$",
     "$F = k \\cdot \\dfrac{I}{d}$",
     "$F = m \\cdot a$"
    ],
    "correct": 0,
    "why": [
     "The force on a single charge in a magnetic field is given by $F = q \\cdot v \\cdot B$, where *q* is the charge, *v* the velocity and *B* the flux density.",
     "That formula gives the force on a whole current-carrying conductor (later section), not on a single charged particle.",
     "That formula calculates the flux density around a straight conductor, not the force on a charge.",
     "That is Newton's second law for force and acceleration in general, not a specific formula for magnetic force."
    ]
   },
   {
    "question": "Calculate the magnetic force on a proton ($q \\approx 1.602 \\cdot 10^{-19}$ C) moving at the speed $1.0 \\cdot 10^{6}$ m/s perpendicular to a magnetic field of 0.10 T.",
    "choices": [
     "$1.6 \\cdot 10^{-13}\\ \\mathrm{N}$",
     "$1.6 \\cdot 10^{-19}\\ \\mathrm{N}$",
     "$1.6 \\cdot 10^{-14}\\ \\mathrm{N}$",
     "$1.6 \\cdot 10^{-15}\\ \\mathrm{N}$"
    ],
    "correct": 2,
    "why": [
     "This is ten times too large. Check the powers of ten in the multiplication.",
     "This is just the value of the charge itself, $q \\approx 1.602 \\cdot 10^{-19}$ C. The speed and the field strength have not been included.",
     "$F = q \\cdot v \\cdot B = 1.602 \\cdot 10^{-19} \\cdot 1.0 \\cdot 10^{6} \\cdot 0.10 \\approx 1.6 \\cdot 10^{-14}\\ \\mathrm{N}$.",
     "This is ten times too small. Check the powers of ten in the multiplication."
    ]
   },
   {
    "question": "What is the approximate value of the elementary charge (for example on a proton or an electron)?",
    "choices": [
     "$1.602 \\cdot 10^{-23}\\ \\mathrm{C}$",
     "$1.602 \\cdot 10^{-19}\\ \\mathrm{C}$",
     "$9.109 \\cdot 10^{-31}\\ \\mathrm{C}$",
     "$6.626 \\cdot 10^{-34}\\ \\mathrm{C}$"
    ],
    "correct": 1,
    "why": [
     "The power of ten is wrong: the elementary charge is of the order of $10^{-19}$ C, not $10^{-23}$ C.",
     "The elementary charge, the charge on a single electron or proton, is $q \\approx 1.602 \\cdot 10^{-19}$ C.",
     "This value ($9.109 \\cdot 10^{-31}$) is the mass of the electron in kilograms, not its charge in coulombs.",
     "This value ($6.626 \\cdot 10^{-34}$) is the Planck constant, a completely different quantity from quantum physics."
    ]
   }
  ]
 },
 "fy2-3.5": {
  "kalla": "eb4046b146",
  "data": [
   {
    "question": "Which formula gives the force on a straight current-carrying conductor in a magnetic field?",
    "choices": [
     "$F = q \\cdot v \\cdot B$",
     "$F = k \\cdot \\dfrac{I_1 \\cdot I_2 \\cdot l}{d}$",
     "$F = m \\cdot a$",
     "$F = B \\cdot I \\cdot l$"
    ],
    "correct": 3,
    "why": [
     "That formula gives the force on a single charged particle, not on a whole current-carrying conductor.",
     "That formula gives the force between two parallel current-carrying conductors, not the force on a single conductor in an external field.",
     "That is Newton's second law in general, not the specific formula for the force on a conductor in a magnetic field.",
     "The force on a current-carrying conductor in a magnetic field is given by $F = B \\cdot I \\cdot l$, where *B* is the flux density, *I* the current and *l* the length of the conductor."
    ]
   },
   {
    "question": "According to the derivation in the section, how is the formula $F = B \\cdot I \\cdot l$ obtained from $F = q \\cdot v \\cdot B$?",
    "choices": [
     "By substituting $Q = I \\cdot \\Delta t$ and $v = \\dfrac{l}{\\Delta t}$ into $F = q \\cdot v \\cdot B$, which gives $F = I \\cdot l \\cdot B$",
     "By assuming that all the charges in the conductor are stationary",
     "By multiplying both sides by Newton's second law",
     "By dividing away the time completely without replacing it"
    ],
    "correct": 0,
    "why": [
     "By writing the total charge as $Q = I \\cdot \\Delta t$ and the velocity as $v = \\dfrac{l}{\\Delta t}$, and substituting these into $F = q \\cdot v \\cdot B$, $\\Delta t$ cancels and what remains is $F = I \\cdot l \\cdot B$.",
     "On the contrary, the derivation relies on the charges moving through the conductor with a velocity *v*. Otherwise there would be no current at all.",
     "The derivation uses algebraic substitution of expressions for *Q* and *v*, not Newton's second law.",
     "The time $\\Delta t$ cancels naturally through the substitution, but it is replaced by the expressions for charge and velocity along the way. It does not disappear for no reason."
    ]
   },
   {
    "question": "What does the section point out about the symbols *I* (current) and *l* (length)?",
    "choices": [
     "That it is an unsolvable mathematical problem that makes the formula useless",
     "That you must never use the letter *l* for length in physics",
     "That you should find a way of writing in which the letters *I* and *l* are clearly distinguishable, since they are easily confused",
     "That this is only a problem in handwritten text, never in printed textbooks"
    ],
    "correct": 2,
    "why": [
     "There is no mathematical problem with the formula itself, only a risk of mixing up what the letters *I* and *l* look like when you write by hand.",
     "The section does not tell you to stop using *l* for length, only to write it so that it is clearly distinguishable from *I*.",
     "A capital *I* (current) and a lower-case *l* (length) can look very similar when written by hand, so the section encourages a way of writing in which you can clearly tell them apart.",
     "The problem mainly concerns handwriting, where the letter shapes are most easily mixed up."
    ]
   },
   {
    "question": "Two parallel current-carrying conductors carry current in the same direction. What kind of force arises between them?",
    "choices": [
     "Always repulsive, regardless of the direction of the current",
     "Attractive, because the currents flow in the same direction",
     "Always zero if the conductors are parallel",
     "Dependent only on the length of the conductors, not on the direction of the current"
    ],
    "correct": 1,
    "why": [
     "The force is not always repulsive: its direction depends on whether the currents flow in the same direction or in opposite directions.",
     "When the currents in two parallel conductors flow in the same direction, the force between them is attractive, as the example in the section shows.",
     "The force is zero only if no current flows. Otherwise there is always a force between parallel current-carrying conductors.",
     "The length of the conductors only affects the size of the force, while the relative direction of the currents decides whether the force is attractive or repulsive."
    ]
   },
   {
    "question": "Which principle explains why the force on the left conductor is equal in size and opposite in direction to the force on the right conductor?",
    "choices": [
     "Coulomb's law",
     "Lenz's law",
     "Ohm's law",
     "Newton's third law (action and reaction)"
    ],
    "correct": 3,
    "why": [
     "Coulomb's law describes the force between electric charges at rest, not the force between current-carrying conductors.",
     "Lenz's law is about the direction of induction (a later section), not about action and reaction between conductors.",
     "Ohm's law describes the relationship between voltage, current and resistance, not forces between conductors.",
     "Newton's third law says that for every force there is an equal and opposite reaction force, so the force on one conductor is equal in size and opposite in direction to the force on the other."
    ]
   },
   {
    "question": "A straight conductor of length 0.50 m lies perpendicular to a magnetic field of 0.20 T and carries a current of 4.0 A. Calculate the force on the conductor.",
    "choices": [
     "$0.40\\ \\mathrm{N}$",
     "$4.0\\ \\mathrm{N}$",
     "$0.040\\ \\mathrm{N}$",
     "$0.80\\ \\mathrm{N}$"
    ],
    "correct": 0,
    "why": [
     "$F = B \\cdot I \\cdot l = 0.20 \\cdot 4.0 \\cdot 0.50 = 0.40\\ \\mathrm{N}$.",
     "This is ten times too large. Check that all three factors are multiplied correctly.",
     "This is ten times too small compared with the correct answer.",
     "This corresponds to a calculation where the length was forgotten by mistake, for example just $0.20 \\cdot 4.0 = 0.80$."
    ]
   }
  ]
 },
 "fy2-3.6": {
  "kalla": "cf4e156a28",
  "data": [
   {
    "question": "According to the lesson, why does the Earth's magnetic field arise?",
    "choices": [
     "Radiation from the Sun ionises the Earth's atmosphere",
     "Molten, charged metal in the Earth's interior swirls and creates the field",
     "The Earth's motion around the Sun creates the field",
     "The Moon's gravity induces currents in the Earth's crust"
    ],
    "correct": 1,
    "why": [
     "Ionisation of the atmosphere is connected with the aurora, not with the origin of the Earth's magnetic field itself.",
     "In the Earth's outer core there is molten metal full of charges. It flows around because the core is hotter further in (convection), and the Earth's rotation organises the motion so that the currents form the Earth's magnetic field.",
     "It is the Earth's rotation about its own axis that contributes to the swirling motion in the Earth's interior, not its motion around the Sun.",
     "The Moon's gravity causes the tides, but that is not the explanation for how the Earth's magnetic field arises."
    ]
   },
   {
    "question": "Why is the Earth's northern magnetic pole said to be in fact a south end?",
    "choices": [
     "Because it is located at the geographic South Pole",
     "Because it was discovered by a scientist in the southern hemisphere",
     "It is just a confusing name with no physical basis",
     "Because the north end of a compass needle (which is attracted to south ends) points towards it"
    ],
    "correct": 3,
    "why": [
     "The northern magnetic pole is located near the geographic North Pole (today in the Arctic Ocean, heading towards Siberia), not at the South Pole.",
     "Who discovered the pole has no bearing on what kind of magnetic pole it is.",
     "The name has a clear physical basis: it follows from the way unlike poles attract each other.",
     "Since unlike poles attract each other, and the north end of a compass needle points towards the northern magnetic pole, that pole must in fact be a south end."
    ]
   },
   {
    "question": "What is the angle between the northern magnetic pole and the geographic North Pole, seen from a given place, called?",
    "choices": [
     "Declination",
     "Inclination",
     "Precession",
     "Refraction"
    ],
    "correct": 0,
    "why": [
     "The angular deviation between magnetic north and geographic north is called declination.",
     "Inclination is instead the angle that the Earth's magnetic field makes with the ground.",
     "Precession is a different physical phenomenon (for example in spinning tops or the slow turning of the Earth's axis), not what is described here.",
     "Refraction is the bending of light when it passes from one medium to another, a completely different concept from optics."
    ]
   },
   {
    "question": "What is the angle that the Earth's magnetic field makes with the ground called, and what is its approximate value at the equator?",
    "choices": [
     "Declination; 90°",
     "Inclination; 90°",
     "Inclination; 0°",
     "Declination; 0°"
    ],
    "correct": 2,
    "why": [
     "The phenomenon is called inclination, not declination, and 90° applies at the magnetic poles, not at the equator.",
     "The angle has the right name (inclination), but the value 90° applies at the magnetic poles, where the field points straight down or up, not at the equator.",
     "The angle between the field and the ground is called inclination, and at the equator the field is horizontal (parallel to the ground), so $i = 0^\\circ$.",
     "The phenomenon is called inclination, not declination. Declination is about the north direction, not the angle to the ground."
    ]
   },
   {
    "question": "Which two components is the Earth's magnetic field often split into?",
    "choices": [
     "A north and a south component",
     "A horizontal component $B_\\mathrm{jh}$ and a vertical component $B_\\mathrm{jv}$",
     "An electric and a magnetic component",
     "A declination and an inclination component"
    ],
    "correct": 1,
    "why": [
     "The field is not split up by compass points in that way, but by direction relative to the ground.",
     "The field is split into a horizontal component $B_\\mathrm{jh}$, which pulls the compass needle towards north, and a vertical component $B_\\mathrm{jv}$, which pulls the needle towards or away from the ground.",
     "Both components are magnetic. The Earth's magnetic field is not split into an electric and a magnetic part.",
     "Declination and inclination are angles that describe the direction of the field, not names of the field's components."
    ]
   },
   {
    "question": "Why is the protection against charged particles, for example from the Sun, weaker near the magnetic poles, which gives rise to the aurora there?",
    "choices": [
     "The atmosphere is thinner there",
     "The Sun is closest to the Earth at the poles",
     "There the direction of the field is roughly parallel to the motion of the charged particles, so the field does not deflect them as effectively",
     "The magnetic field is strongest there and repels the particles completely"
    ],
    "correct": 2,
    "why": [
     "The thickness of the atmosphere does not vary in a way that would explain the difference in aurora between the poles and the equator.",
     "The Earth's distance to the Sun is in practice the same wherever you are on Earth, so it does not explain the difference between the poles and the equator.",
     "Near the poles the direction of the field is roughly parallel to the motion of the incoming charged particles, so the magnetic force does not deflect them as effectively. They then get down into the atmosphere and excite oxygen and nitrogen atoms, which emit light when they return to their ground state: the aurora.",
     "The field does not repel the particles completely at the poles. On the contrary, the protection is weaker there, which is exactly why the aurora is seen there."
    ]
   }
  ]
 },
 "fy2-3.7": {
  "kalla": "85c3b8a643",
  "data": [
   {
    "question": "What is needed for a current to be induced when a magnet is near a coil?",
    "choices": [
     "That the magnet and the coil are at rest relative to each other",
     "That the coil is made of copper and no other material",
     "That the magnet or the coil moves relative to the other (relative motion)",
     "That the current in the coil is already switched on before the magnet approaches"
    ],
    "correct": 2,
    "why": [
     "According to the demonstration, a stationary magnet in a stationary coil gives no reading at all: relative motion is needed.",
     "Which conducting material the coil is made of does not matter for the principle of induction described here.",
     "The demonstration shows that a current is induced only when the magnet and the coil move relative to each other. If both are still, there is no reading.",
     "In this kind of demonstration the coil has no current of its own to begin with: it is precisely the induced current that is measured."
    ]
   },
   {
    "question": "What is the voltage that arises when a conductor moves in a magnetic field called?",
    "choices": [
     "Coulomb voltage",
     "Induced voltage (emf), denoted *e*",
     "Capacitive voltage",
     "Reactive voltage"
    ],
    "correct": 1,
    "why": [
     "Coulomb voltage is not a concept used here. Coulomb's law is about the force between charges at rest.",
     "The voltage that arises when a conductor moves in a magnetic field is called induced voltage or emf (electromotive force) and is denoted *e*.",
     "Capacitive voltage is connected with capacitors, not with a voltage induced by motion in a conductor.",
     "Reactive voltage is not a concept introduced in this section."
    ]
   },
   {
    "question": "Which relationship applies to the induced voltage in a straight conductor when *l*, *v* and *B* are perpendicular to each other?",
    "choices": [
     "$e = l \\cdot v \\cdot B$",
     "$e = B \\cdot I \\cdot l$",
     "$e = q \\cdot v \\cdot B$",
     "$e = k \\cdot \\dfrac{I}{d}$"
    ],
    "correct": 0,
    "why": [
     "The law of induction for a straight conductor gives $e = l \\cdot v \\cdot B$, where *l* is the length of the conductor, *v* its velocity and *B* the flux density.",
     "That formula gives the force on a current-carrying conductor in a magnetic field, not the induced voltage.",
     "That formula ($F = q \\cdot v \\cdot B$) gives the magnetic force on a single charge, not a voltage.",
     "That formula gives the flux density around a straight conductor, not an induced voltage."
    ]
   },
   {
    "question": "In the derivation of the law of induction, the electric force $F_\\mathrm{e}$ is set equal to the magnetic force $F_\\mathrm{m}$ at equilibrium. What happens to the motion of the electrons in the conductor when this equilibrium is reached?",
    "choices": [
     "The electrons accelerate further",
     "The electrons change direction permanently",
     "The conductor loses all its charge",
     "The motion of the electrons stops because the forces cancel each other out"
    ],
    "correct": 3,
    "why": [
     "When $F_\\mathrm{e} = F_\\mathrm{m}$, the net force on the electrons is zero, so they do not accelerate any further.",
     "The electrons do not change direction. They simply stop moving along the conductor when the forces balance each other.",
     "The conductor does not lose any charge overall. It is only a redistribution of electrons between the ends of the conductor that gives rise to the voltage.",
     "When the electric force becomes as large as the magnetic force, there is force equilibrium, and the motion of the electrons along the conductor stops."
    ]
   },
   {
    "question": "A conductor moves along its own length (parallel to itself) through a magnetic field, instead of perpendicular to itself. How large is the induced voltage?",
    "choices": [
     "The same as if the conductor had moved perpendicular to itself",
     "0 V, because the electrons then move along the conductor and not across it",
     "Always at its maximum, regardless of the direction of motion",
     "It depends only on the field strength, not on the direction of motion"
    ],
    "correct": 1,
    "why": [
     "The voltage is not the same: it is precisely the direction of the motion relative to the conductor that decides whether a voltage is induced at all.",
     "If the conductor moves along its own length, the magnetic force on the electrons is perpendicular to the conductor. No force acts along the conductor, so the electrons do not collect at one end, and the induced voltage is 0 V.",
     "The voltage is not always at its maximum. In this special case it is zero instead.",
     "The direction of motion matters a great deal: if the conductor moves parallel to itself, no voltage at all is induced, whatever the field strength."
    ]
   },
   {
    "question": "A conductor of length 0.50 m moves at the speed 2.0 m/s perpendicular through a magnetic field of 0.10 T (*l*, *v* and *B* are perpendicular to each other). Calculate the induced voltage.",
    "choices": [
     "$1.0\\ \\mathrm{V}$",
     "$0.010\\ \\mathrm{V}$",
     "$0.10\\ \\mathrm{V}$",
     "$10\\ \\mathrm{V}$"
    ],
    "correct": 2,
    "why": [
     "This is ten times too large compared with the correct answer.",
     "This is ten times too small compared with the correct answer.",
     "$e = l \\cdot v \\cdot B = 0.50 \\cdot 2.0 \\cdot 0.10 = 0.10\\ \\mathrm{V}$.",
     "This is a hundred times too large. Check that all three values are multiplied with the right powers of ten."
    ]
   }
  ]
 },
 "fy2-3.8": {
  "kalla": "ca495fdd49",
  "data": [
   {
    "question": "What does Lenz's law say about the direction of an induced current?",
    "choices": [
     "It is always directed so that it strengthens the cause of its creation",
     "It is always directed so that it opposes the cause of its creation",
     "It depends only on the resistance of the circuit, not on the cause of the induction",
     "It changes direction randomly regardless of the cause"
    ],
    "correct": 1,
    "why": [
     "This is the other way round. If an induced current strengthened its own cause, the induction could keep increasing by itself without limit. Lenz's law says the opposite.",
     "That is exactly what Lenz's law says: the induced current gets a direction such that the cause of its creation is opposed, for example by braking a motion.",
     "The resistance decides the size of the current through Ohm's law, but it is the cause of the induction (the motion or the change in flux) that decides the direction of the current.",
     "The direction of the current is determined uniquely by the direction of the cause, not by chance."
    ]
   },
   {
    "question": "A conductor 0.50 m long moves at the speed 4.0 m/s perpendicular through a magnetic field with flux density 0.10 T. How large is the induced emf $e$?",
    "choices": [
     "$0.020\\ \\mathrm{V}$",
     "$2.0\\ \\mathrm{V}$",
     "$0.20\\ \\mathrm{V}$",
     "$20\\ \\mathrm{V}$"
    ],
    "correct": 2,
    "why": [
     "This comes from mistakenly reading the speed as 0.40 m/s instead of 4.0 m/s.",
     "This corresponds to multiplying only $l$ and $v$ ($0.50 \\cdot 4.0 = 2.0$) and forgetting the flux density $B$.",
     "With $e = l \\cdot v \\cdot B$ we get $e = 0.50 \\cdot 4.0 \\cdot 0.10 = 0.20\\ \\mathrm{V}$.",
     "This comes from mistakenly reading the flux density as 10 T instead of 0.10 T."
    ]
   },
   {
    "question": "An induced emf of 0.30 V drives a current through a circuit with resistance 0.50 Ω. How large is the current $I$?",
    "choices": [
     "$0.60\\ \\mathrm{A}$",
     "$0.15\\ \\mathrm{A}$",
     "$1.7\\ \\mathrm{A}$",
     "$6.0\\ \\mathrm{A}$"
    ],
    "correct": 0,
    "why": [
     "Ohm's law gives $I = \\dfrac{e}{R} = \\dfrac{0.30}{0.50} = 0.60\\ \\mathrm{A}$.",
     "This is what you get if $e$ and $R$ are multiplied instead of divided: $0.30 \\cdot 0.50 = 0.15$.",
     "This is what you get if the numerator and denominator swap places in the division: $\\dfrac{0.50}{0.30} \\approx 1.7$.",
     "This is ten times too large. Check the decimal point in the division."
    ]
   },
   {
    "question": "A straight conductor of length 0.20 m carries a current of 5.0 A perpendicular to a magnetic field with flux density 2.0 T. How large is the magnetic force on the conductor?",
    "choices": [
     "$0.40\\ \\mathrm{N}$",
     "$1.0\\ \\mathrm{N}$",
     "$10\\ \\mathrm{N}$",
     "$2.0\\ \\mathrm{N}$"
    ],
    "correct": 3,
    "why": [
     "This is what you get if the current $I$ is forgotten and only $B \\cdot l = 2.0 \\cdot 0.20$ is calculated.",
     "This is what you get if the flux density $B$ is forgotten and only $I \\cdot l = 5.0 \\cdot 0.20$ is calculated.",
     "This is what you get if the length of the conductor $l$ is forgotten and only $B \\cdot I = 2.0 \\cdot 5.0$ is calculated.",
     "With $F = B \\cdot I \\cdot l$ we get $F = 2.0 \\cdot 5.0 \\cdot 0.20 = 2.0\\ \\mathrm{N}$."
    ]
   },
   {
    "question": "In the demonstration with Thomson's ring, a loose aluminium ring is launched when the current in the coil is switched on. Why is an identical plastic ring not affected in the same way?",
    "choices": [
     "Plastic is magnetic and is attracted down towards the coil instead of being pushed upwards",
     "Plastic does not conduct electricity, so no induced current, and therefore no opposing magnetic field, can form in the ring",
     "Plastic has a much lower density than aluminium and is therefore too light to be affected",
     "The plastic ring melts immediately from the heat of the coil before it has time to move"
    ],
    "correct": 1,
    "why": [
     "Plastic is neither magnetic nor electrically conducting and is not attracted by the field of the coil.",
     "Since plastic does not conduct electricity, no induced current can arise in the ring. Without an induced current no opposing magnetic field forms either, so the ring is neither repelled nor launched.",
     "A lower density would make the ring easier to move, not harder, but that is not the reason it stays still.",
     "The experiment is about a short current pulse, not heating. The plastic ring is simply not affected at all, because it does not conduct electricity."
    ]
   }
  ]
 },
 "fy2-3.9": {
  "kalla": "4e65eb0fcd",
  "data": [
   {
    "question": "What is the difference between magnetic flux $\\Phi$ and magnetic flux density $B$?",
    "choices": [
     "They are the same quantity, just different symbols for the same thing depending on the context",
     "$\\Phi$ gives the number of flux lines through an area, while $B$ gives how close together the flux lines are",
     "The units are the other way round: $\\Phi$ is measured in tesla (T) and $B$ is measured in weber (Wb)",
     "$\\Phi$ describes the direction of the field, while $B$ describes the strength of the field"
    ],
    "correct": 1,
    "why": [
     "They are two different quantities with different units (Wb and T respectively) and different meanings. They cannot be used interchangeably.",
     "Magnetic flux $\\Phi$ is the number of flux lines passing through an area, while the flux density $B$ is how close together the flux lines are.",
     "It is the other way round: $\\Phi$ is measured in weber (Wb) and $B$ is measured in tesla (T).",
     "It is the flux density $B$ that is a vector with direction and magnitude, while the flux $\\Phi$ is a scalar quantity calculated from an area."
    ]
   },
   {
    "question": "What is the SI unit of magnetic flux $\\Phi$?",
    "choices": [
     "Tesla (T)",
     "Volt (V)",
     "Weber (Wb)",
     "Ampere (A)"
    ],
    "correct": 2,
    "why": [
     "The tesla is the unit of magnetic flux density $B$, not of magnetic flux.",
     "The volt is the unit of voltage, for example the induced emf $e$.",
     "Magnetic flux $\\Phi$ has the SI unit weber (Wb).",
     "The ampere is the unit of electric current, a completely different quantity."
    ]
   },
   {
    "question": "An area of 0.50 m² is perpendicular to a magnetic field with flux density 0.20 T. How large is the magnetic flux through the area?",
    "choices": [
     "$0.10\\ \\mathrm{Wb}$",
     "$0.70\\ \\mathrm{Wb}$",
     "$2.5\\ \\mathrm{Wb}$",
     "$1.0\\ \\mathrm{Wb}$"
    ],
    "correct": 0,
    "why": [
     "With $\\Phi = B \\cdot A_\\perp$ we get $\\Phi = 0.20 \\cdot 0.50 = 0.10\\ \\mathrm{Wb}$.",
     "This is what you get if $B$ and $A$ are added instead of multiplied: $0.20 + 0.50 = 0.70$.",
     "This is what you get if the area is divided by the flux density instead of multiplied: $\\dfrac{0.50}{0.20} = 2.5$.",
     "This comes from mistakenly reading the area as 5.0 m² instead of 0.50 m²."
    ]
   },
   {
    "question": "What does the minus sign in the law of induction $e = -\\dfrac{\\Delta \\Phi}{\\Delta t}$ represent?",
    "choices": [
     "That the voltage is always negative in practice and can never be measured as positive",
     "That the magnetic flux always decreases with time",
     "That the formula only applies when the current is decreasing",
     "That the induced current, according to Lenz's law, always opposes the change that causes it"
    ],
    "correct": 3,
    "why": [
     "The sign of $e$ depends on the chosen reference direction and can be both positive and negative. It says nothing about an absolute sign in reality.",
     "The flux can both increase and decrease. The minus sign is not about the direction in which the flux itself changes but about how the current reacts to it.",
     "The law of induction applies just as well when the flux increases as when it decreases.",
     "The minus sign is the law of induction's way of expressing Lenz's law: the induced voltage or current is directed so that it opposes the change in flux that causes it."
    ]
   },
   {
    "question": "The magnetic flux in a coil with 100 turns increases uniformly by 0.020 Wb in 2.0 s. What is the magnitude of the induced voltage?",
    "choices": [
     "$1.0\\ \\mathrm{V}$",
     "$0.010\\ \\mathrm{V}$",
     "$2.0\\ \\mathrm{V}$",
     "$10\\ \\mathrm{V}$"
    ],
    "correct": 0,
    "why": [
     "With $e = N \\cdot \\dfrac{\\Delta \\Phi}{\\Delta t}$ the magnitude is $e = 100 \\cdot \\dfrac{0.020}{2.0} = 1.0\\ \\mathrm{V}$.",
     "This is what you get if the number of turns $N$ is forgotten and only $\\dfrac{\\Delta \\Phi}{\\Delta t} = \\dfrac{0.020}{2.0}$ is calculated.",
     "This is what you get if you forget to divide by the time and only calculate $N \\cdot \\Delta \\Phi = 100 \\cdot 0.020$.",
     "This comes from mistakenly reading the change in flux as 0.20 Wb instead of 0.020 Wb."
    ]
   },
   {
    "question": "In a $\\Phi$–$t$ graph the flux increases uniformly from 0 to 8.0 mWb during the first 4.0 seconds and then stays constant. What is the magnitude of the induced voltage during the first 4.0 seconds?",
    "choices": [
     "$32\\ \\mathrm{mV}$",
     "$0.50\\ \\mathrm{mV}$",
     "$2.0\\ \\mathrm{mV}$",
     "$0\\ \\mathrm{V}$"
    ],
    "correct": 2,
    "why": [
     "This is what you get if the change in flux and the time are multiplied instead of divided: $8.0 \\cdot 4.0 = 32$.",
     "This is what you get if the quotient is taken the wrong way round: $\\dfrac{4.0}{8.0} = 0.50$.",
     "The slope of the graph gives $e = \\dfrac{\\Delta \\Phi}{\\Delta t} = \\dfrac{8.0\\ \\mathrm{mWb}}{4.0\\ \\mathrm{s}} = 2.0\\ \\mathrm{mV}$.",
     "On the contrary, the flux is changing during exactly these four seconds. Only afterwards, when the flux is constant, does the induced voltage become zero."
    ]
   }
  ]
 },
 "fy2-3.10": {
  "kalla": "9c686f325f",
  "data": [
   {
    "question": "What is the maximum instantaneous value of an alternating voltage called, and which symbol is used?",
    "choices": [
     "Effective voltage, denoted $U$",
     "Instantaneous voltage, denoted $u$",
     "Peak voltage, denoted $\\hat{u}$",
     "Mains voltage, denoted $U_0$"
    ],
    "correct": 2,
    "why": [
     "The effective voltage $U$ is a kind of average value for the alternating voltage, not the maximum instantaneous value.",
     "The instantaneous voltage $u$ (lower-case letter) gives the voltage at any given moment, not specifically the maximum value.",
     "The maximum instantaneous value is called the peak voltage and is written with a circumflex, $\\hat{u}$, read \"u-peak\".",
     "The symbol $U_0$ is not used in this context. Peak values are instead marked with a circumflex ($\\hat{u}$, $\\hat{\\imath}$)."
    ]
   },
   {
    "question": "The Swedish electricity grid has a frequency of 50 Hz. What is the angular velocity $\\omega$?",
    "choices": [
     "$100\\pi\\ \\mathrm{rad/s}$",
     "$50\\pi\\ \\mathrm{rad/s}$",
     "$25\\pi\\ \\mathrm{rad/s}$",
     "$200\\pi\\ \\mathrm{rad/s}$"
    ],
    "correct": 0,
    "why": [
     "With $\\omega = 2\\pi \\cdot f$ we get $\\omega = 2\\pi \\cdot 50 = 100\\pi\\ \\mathrm{rad/s}$.",
     "This is what you get if you forget the factor 2 and only calculate $\\pi \\cdot 50$.",
     "This is what you get if the frequency is halved by mistake before it is substituted: $2\\pi \\cdot 25$.",
     "This is what you get if the frequency is doubled by mistake before substitution: $2\\pi \\cdot 100$."
    ]
   },
   {
    "question": "An AC voltage source has the effective value 100 V. Approximately how large is the peak voltage $\\hat{u}$ ($\\sqrt{2} \\approx 1.4$)?",
    "choices": [
     "$\\approx 71\\ \\mathrm{V}$",
     "$100\\ \\mathrm{V}$",
     "$\\approx 200\\ \\mathrm{V}$",
     "$\\approx 140\\ \\mathrm{V}$"
    ],
    "correct": 3,
    "why": [
     "This is what you get if you divide by $\\sqrt{2}$ instead of multiplying: $\\dfrac{100}{\\sqrt{2}} \\approx 71$.",
     "The effective value $U$ and the peak value $\\hat{u}$ are different quantities: they are not equal.",
     "This is what you get if you use the factor 2 instead of $\\sqrt{2} \\approx 1.4$.",
     "With $\\hat{u} = \\sqrt{2} \\cdot U$ we get $\\hat{u} = \\sqrt{2} \\cdot 100 \\approx 140\\ \\mathrm{V}$."
    ]
   },
   {
    "question": "Which expression describes how the instantaneous voltage $u$ varies with time in a simple AC generator?",
    "choices": [
     "$u = \\hat{u} \\cdot \\cos(\\omega t)$",
     "$u = \\hat{u} \\cdot \\sin(\\omega t)$",
     "$u = U \\cdot \\sin(\\omega t)$",
     "$u = \\hat{u} \\cdot \\omega \\cdot t$"
    ],
    "correct": 1,
    "why": [
     "The derivation gives a sine function, not a cosine function, because the emf is proportional to $\\sin(\\omega t)$ (it is obtained as the derivative of the flux's $\\cos(\\omega t)$).",
     "The instantaneous voltage in a simple AC generator is given by $u = \\hat{u} \\cdot \\sin(\\omega t)$.",
     "The effective value $U$ must not be confused with the peak value $\\hat{u}$ in this expression.",
     "The voltage varies sinusoidally with time, not linearly."
    ]
   },
   {
    "question": "Why is a voltage induced in the rotating loop of an AC generator?",
    "choices": [
     "The magnetic flux through the loop changes all the time, because the loop's area perpendicular to the field changes as it rotates",
     "The loop is charged up electrostatically by the poles of the magnet",
     "The current in the loop creates its own flux, which strengthens itself without limit",
     "The flux is constant, but the resistance of the loop changes periodically"
    ],
    "correct": 0,
    "why": [
     "Since $\\Phi = B \\cdot A \\cdot \\cos\\alpha$ and the angle $\\alpha$ changes continuously as the loop rotates, the flux varies with time, which according to the law of induction induces a voltage.",
     "Induction is caused by a changing magnetic flux, not by electrostatic charging.",
     "Such self-strengthening would break the principle of conservation of energy. Instead it is the change in the external field through the loop, caused by the rotation, that gives rise to the induction.",
     "The resistance of the loop is not changed by the rotation. It is the area perpendicular to the field that varies."
    ]
   },
   {
    "question": "What is the frequency of the alternating voltage in the Swedish electricity grid?",
    "choices": [
     "$60\\ \\mathrm{Hz}$",
     "$230\\ \\mathrm{Hz}$",
     "$50\\ \\mathrm{Hz}$",
     "$100\\ \\mathrm{Hz}$"
    ],
    "correct": 2,
    "why": [
     "60 Hz is the frequency of the American electricity grid, not the Swedish one.",
     "230 is often confused with the Swedish mains voltage (230 V), but it is not the frequency.",
     "The Swedish electricity grid has the frequency 50 Hz (and the effective mains voltage 230 V).",
     "100 Hz is twice the actual frequency."
    ]
   }
  ]
 },
 "fy2-3.11": {
  "kalla": "ce1c5a1e21",
  "data": [
   {
    "question": "Which coil in a transformer is connected to the input (incoming) voltage?",
    "choices": [
     "The primary coil",
     "The secondary coil",
     "The iron core",
     "Neither of the coils: the voltage is connected directly to the circuit to be powered"
    ],
    "correct": 0,
    "why": [
     "The primary coil is the coil that is connected to the input voltage, for example the 230 V of the wall socket.",
     "The secondary coil is instead the coil in which the new voltage is induced and is connected to the device to be powered.",
     "The iron core links the coils magnetically but is not a coil itself and is not connected to the voltage source.",
     "The whole point of a transformer is that the voltage is first induced via the primary coil, not that it bypasses it."
    ]
   },
   {
    "question": "Which relationship holds between the number of turns and the voltage in a transformer?",
    "choices": [
     "$\\dfrac{N_1}{N_2} = \\dfrac{U_2}{U_1}$",
     "$\\dfrac{N_1}{N_2} = \\dfrac{U_1}{U_2}$",
     "$N_1 \\cdot U_1 = N_2 \\cdot U_2$",
     "$\\dfrac{N_1}{U_1} = \\dfrac{N_2}{U_2}$"
    ],
    "correct": 1,
    "why": [
     "The quotient on the right-hand side is upside down: it should be $\\dfrac{U_1}{U_2}$, not $\\dfrac{U_2}{U_1}$.",
     "The ratio of the numbers of turns equals the ratio of the voltages: $\\dfrac{N_1}{N_2} = \\dfrac{U_1}{U_2}$.",
     "This is an incorrect rearrangement: the correct cross product is $N_1 \\cdot U_2 = N_2 \\cdot U_1$.",
     "The turns and the voltage of the same coil should not be paired up like this: it is the ratios between the coils that are equal."
    ]
   },
   {
    "question": "A transformer is to step the voltage down from 120 V to 12 V. If the secondary coil has 100 turns, how many turns does the primary coil have?",
    "choices": [
     "$10\\ \\mathrm{turns}$",
     "$100\\ \\mathrm{turns}$",
     "$12\\,000\\ \\mathrm{turns}$",
     "$1\\,000\\ \\mathrm{turns}$"
    ],
    "correct": 3,
    "why": [
     "This is what you get if the quotient $\\dfrac{U_1}{U_2}$ is taken the wrong way round: $100 \\cdot \\dfrac{12}{120} = 10$.",
     "This is only true if the voltage does not change at all between the coils, which contradicts the transformer stepping the voltage down.",
     "This is what you get if you forget to divide by $U_2$ and only calculate $N_2 \\cdot U_1 = 100 \\cdot 120$.",
     "With $N_1 = N_2 \\cdot \\dfrac{U_1}{U_2}$ we get $N_1 = 100 \\cdot \\dfrac{120}{12} = 1\\,000\\ \\mathrm{turns}$."
    ]
   },
   {
    "question": "Why does the current decrease when the voltage is stepped up in a transformer?",
    "choices": [
     "The transformer uses up energy, which makes both the voltage and the current decrease",
     "The more turns a coil has, the greater its resistance, which always lowers the current",
     "The power $P = U \\cdot I$ is (apart from losses) the same in the primary and secondary coils, so an increase in $U$ must give a decrease in $I$",
     "The current is not affected by the transformer, only the voltage changes"
    ],
    "correct": 2,
    "why": [
     "An ideal transformer uses up practically no energy: the power in is the same as the power out.",
     "The number of turns itself decides the voltage ratio, not the resistance of the coil, and that is not the reason the current changes.",
     "Since the power is unchanged ($P_1 = P_2$) and $P = U \\cdot I$, the current must decrease in the same proportion as the voltage increases.",
     "On the contrary, the current ratio $\\dfrac{N_1}{N_2} = \\dfrac{I_2}{I_1}$ shows that the current changes just as the voltage does, only inversely."
    ]
   },
   {
    "question": "A transformer has $N_1 : N_2 = 5 : 1$. If the current in the primary coil is 2.0 A, how large is the current in the secondary coil?",
    "choices": [
     "$10\\ \\mathrm{A}$",
     "$0.40\\ \\mathrm{A}$",
     "$2.0\\ \\mathrm{A}$",
     "$5.0\\ \\mathrm{A}$"
    ],
    "correct": 0,
    "why": [
     "With $\\dfrac{N_1}{N_2} = \\dfrac{I_2}{I_1}$ we get $I_2 = \\dfrac{N_1}{N_2} \\cdot I_1 = 5 \\cdot 2.0 = 10\\ \\mathrm{A}$.",
     "This is what you get if the quotient is taken the wrong way round: $I_2 = \\dfrac{I_1}{5} = \\dfrac{2.0}{5}$.",
     "This is only true if the current is unchanged, which contradicts the fact that the voltage (and therefore the current) changes in the transformer.",
     "This is what you get if you just copy the turns ratio (5) without multiplying by $I_1$."
    ]
   },
   {
    "question": "Why is electricity often transmitted at high voltage in power lines, despite the safety risks?",
    "choices": [
     "High voltage makes the electrons move faster so that they arrive sooner",
     "For the same power the current is lower at high voltage, which reduces the energy losses in the lines",
     "High voltage requires thinner cables regardless of the current, which saves material",
     "High voltage converts more of the electrical energy directly into light in the lines"
    ],
    "correct": 1,
    "why": [
     "The drift speed of the electrons in a conductor does not depend on the voltage in that way, and it is not the reason high voltages are used for transmitting electricity.",
     "Since $P = U \\cdot I$, a higher voltage gives a lower current for a given power, which reduces the heat losses in the resistance of the lines.",
     "The thickness of the cable is decided by the current, not by the voltage alone. A lower current (at high voltage) allows thinner cables, but it is the current and not the voltage itself that is decisive.",
     "Electrical energy in power lines is converted into unwanted heat through the resistance, not into light."
    ]
   }
  ]
 },
 "fy2-3.12": {
  "kalla": "61dbedf92c",
  "data": [
   {
    "question": "What is the function of a velocity selector?",
    "choices": [
     "It measures the mass of particles directly without needing to know the velocity",
     "It filters out charged particles with a particular velocity, determined by the strengths of the electric and magnetic fields",
     "It accelerates all particles to the same final speed regardless of their initial velocity",
     "It separates particles by their charge, regardless of velocity"
    ],
    "correct": 1,
    "why": [
     "It is the mass spectrometer (which builds on the velocity selector) that determines the mass, and it first needs to know the velocity.",
     "Only particles with the velocity $v = \\dfrac{\\mathbb{E}}{B}$ pass straight through the velocity selector. The others are deflected and get stuck.",
     "The velocity selector does not accelerate the particles. It only filters out those that already have the right velocity.",
     "The filtering is by velocity, not directly by the size of the charge."
    ]
   },
   {
    "question": "In a velocity selector, particles pass straight through when two forces are exactly equal in size. Which forces are these?",
    "choices": [
     "The electric force $F_\\mathrm{e}$ and the magnetic force $F_\\mathrm{m}$",
     "The gravitational force $F_G$ and the electric force $F_\\mathrm{e}$",
     "The centripetal force and the gravitational force $F_G$",
     "The magnetic force $F_\\mathrm{m}$ and the frictional force"
    ],
    "correct": 0,
    "why": [
     "Particles pass straight through when the upward electric force $F_\\mathrm{e} = q \\cdot \\mathbb{E}$ is equal in size to the downward magnetic force $F_\\mathrm{m} = q \\cdot v \\cdot B$.",
     "The gravitational force on a single charged particle (for example an electron) is negligible compared with the electric and magnetic forces.",
     "Centripetal force only becomes relevant in the circular path of the mass spectrometer, not in the velocity selector itself, where the path is straight.",
     "Friction does not apply to a particle moving freely in a vacuum between the plates."
    ]
   },
   {
    "question": "A velocity selector has the electric field $4.0 \\cdot 10^3$ V/m and the magnetic flux density 0.20 T. Which velocity is selected?",
    "choices": [
     "$8.0 \\cdot 10^{2}\\ \\mathrm{m/s}$",
     "$2.0 \\cdot 10^{2}\\ \\mathrm{m/s}$",
     "$2.0 \\cdot 10^{3}\\ \\mathrm{m/s}$",
     "$2.0 \\cdot 10^{4}\\ \\mathrm{m/s}$"
    ],
    "correct": 3,
    "why": [
     "This is what you get if $\\mathbb{E}$ and $B$ are multiplied instead of divided: $4.0 \\cdot 10^3 \\cdot 0.20 = 8.0 \\cdot 10^2$.",
     "This comes from mistakenly reading the flux density as 20 T instead of 0.20 T.",
     "This comes from mistakenly reading the field strength as $4.0 \\cdot 10^2$ V/m instead of $4.0 \\cdot 10^3$ V/m.",
     "With $v = \\dfrac{\\mathbb{E}}{B}$ we get $v = \\dfrac{4.0 \\cdot 10^3}{0.20} = 2.0 \\cdot 10^{4}\\ \\mathrm{m/s}$."
    ]
   },
   {
    "question": "Which formula is used to determine the mass of a particle with a mass spectrometer?",
    "choices": [
     "$m = \\dfrac{v \\cdot r}{q \\cdot B}$",
     "$m = q \\cdot B \\cdot r \\cdot v$",
     "$m = \\dfrac{q \\cdot B \\cdot r}{v}$",
     "$m = \\dfrac{q \\cdot v}{B \\cdot r}$"
    ],
    "correct": 2,
    "why": [
     "Here $v$ and $q \\cdot B$ have swapped places compared with the correct expression $m = \\dfrac{q \\cdot B \\cdot r}{v}$.",
     "Here all the quantities are multiplied, but the velocity $v$ should be in the denominator, not a factor in the numerator.",
     "The mass spectrometer's formula for the mass is $m = \\dfrac{q \\cdot B \\cdot r}{v}$.",
     "Here $v$ has swapped places with $B$ and $r$ compared with the correct expression $m = \\dfrac{q \\cdot B \\cdot r}{v}$."
    ]
   },
   {
    "question": "Which force acts as the centripetal force when a particle moves in the circular path in a mass spectrometer?",
    "choices": [
     "The electric force $F_\\mathrm{e}$",
     "The magnetic force $F_\\mathrm{m}$",
     "The gravitational force $F_G$",
     "A combination of electric and magnetic force in equal parts"
    ],
    "correct": 1,
    "why": [
     "In the circular path of the mass spectrometer there is no electric field left: the particle has already left the plates of the velocity selector.",
     "After the velocity selector the particle is affected only by the magnetic field, and the magnetic force $F_\\mathrm{m} = q \\cdot v \\cdot B$ then provides the centripetal force that bends the path into a circle.",
     "The gravitational force on a charged particle is negligible compared with the magnetic force in this context.",
     "The electric field only exists in the velocity selector, not in the part of the mass spectrometer where the path is bent."
    ]
   }
  ]
 },
 "fy2-3.13": {
  "kalla": "aa05ec7163",
  "data": [
   {
    "question": "What are eddy currents?",
    "choices": [
     "Circulating induced currents that, according to Lenz's law, oppose the cause of their creation, for example a motion or a change in flux",
     "Currents that always flow in a straight line through a conductor",
     "Currents that only arise in superconductors at very low temperatures",
     "Currents that strengthen the motion or change in flux that causes them"
    ],
    "correct": 0,
    "why": [
     "Eddy currents are precisely circulating (\"swirling\") induced currents that, according to Lenz's law, oppose their own cause.",
     "The name \"eddy current\" comes from the current circulating in eddies, not flowing straight through a conductor.",
     "Eddy currents arise in ordinary metals (for example aluminium and copper) at room temperature, not only in superconductors.",
     "According to Lenz's law, eddy currents always oppose the cause of their creation; they never strengthen it."
    ]
   },
   {
    "question": "In the demonstration with the aluminium pendulum swinging through a magnetic field, the pendulum is strongly braked. What happens when the pendulum is replaced by an identical pendulum with slots (cut into it)?",
    "choices": [
     "The braking becomes stronger, because the slots increase the resistance of the whole plate",
     "No difference is noticed, because the magnetic field is unchanged",
     "The braking effect decreases, because the eddy currents can no longer circulate as freely",
     "The pendulum accelerates instead of being braked, because the direction of the current is reversed"
    ],
    "correct": 2,
    "why": [
     "On the contrary, the slots stop the currents from circulating freely, which decreases (not increases) the braking effect.",
     "The magnetic field is indeed unchanged, but the slots change the pendulum's ability to form free eddy currents, which gives a clearly noticeable difference.",
     "The slots break up the closed paths that the eddy currents would otherwise circulate in, so the braking force becomes smaller.",
     "Lenz's law means that the induced current always opposes the motion and never strengthens it, so the pendulum cannot accelerate because of this."
    ]
   },
   {
    "question": "Which of the following is an example of a desired application of eddy currents?",
    "choices": [
     "Heating of the core in a transformer, which wastes energy",
     "The induction hob, which heats the bottom of the cooking pot by means of eddy currents",
     "Heating of the iron core in an electric motor, which lowers its efficiency",
     "Interference in electronic measuring instruments caused by external magnetic fields"
    ],
    "correct": 1,
    "why": [
     "Eddy currents in a transformer core are an unwanted energy loss, not an intended application.",
     "The induction hob is an example of a desired application: eddy currents in the bottom of the cooking pot produce exactly the heat you want.",
     "Eddy currents in the iron core of an electric motor are an unwanted loss that lowers the efficiency.",
     "Interference in measuring instruments is an unwanted side effect, not a deliberate use."
    ]
   },
   {
    "question": "Why must a saucepan be made of a magnetic material to work on an induction hob?",
    "choices": [
     "Magnetic materials conduct heat better and therefore get hotter",
     "The induction hob needs a magnetic saucepan so that it does not get hot itself",
     "Non-magnetic saucepans melt because of the high frequency",
     "The metal must be able to \"sense\" the rapidly alternating magnetic field so that strong eddy currents are induced in the bottom of the pot"
    ],
    "correct": 3,
    "why": [
     "The thermal conductivity of the metal is not the reason: it is about the field being able to induce currents in the material.",
     "On the contrary, the hob works by making the bottom of the saucepan itself hot through the eddy currents, not the hob.",
     "The frequency (around 50 kHz) is not high enough to melt metal. The problem with a non-magnetic saucepan is instead that it heats up too little.",
     "Eddy currents are induced in all metals, but in a magnetic material the alternating field is concentrated and the currents are confined to a thin layer in the bottom, so they produce a lot of heat. Hysteresis also contributes. In a saucepan made of aluminium, for example, the heating is too weak."
    ]
   },
   {
    "question": "A metal plate moves through a magnetic field and eddy currents are induced in it. What effect does this have on the motion of the plate?",
    "choices": [
     "The eddy currents accelerate the plate in the direction of motion",
     "The eddy currents create a magnetic field that brakes the motion of the plate",
     "The eddy currents have no effect on the motion of the plate, only on its temperature",
     "The eddy currents make the plate rotate about its own axis"
    ],
    "correct": 1,
    "why": [
     "According to Lenz's law, the magnetic field of the induced current always opposes the motion and never strengthens it.",
     "The induced eddy currents create a magnetic field that, according to Lenz's law, opposes the motion of the plate through the field, which brakes it.",
     "The braking is a direct mechanical effect on the motion (a force), not just heating.",
     "The effect is a braking force along the line of motion, not a torque that causes rotation."
    ]
   }
  ]
 },
 "fy2-3.14": {
  "kalla": "bd15e90cc2",
  "data": [
   {
    "question": "What is the phenomenon called in which a current-carrying conductor placed in a magnetic field gets a voltage perpendicular to the direction of the current?",
    "choices": [
     "The Hall effect",
     "The law of induction",
     "Lenz's law",
     "The eddy current effect"
    ],
    "correct": 0,
    "why": [
     "The phenomenon in which a current-carrying conductor in a magnetic field gets a voltage perpendicular to the direction of the current is called the Hall effect, and the voltage is called the Hall voltage.",
     "The law of induction describes how a voltage is induced by a change in flux, a different relationship from the one that gives rise to the Hall voltage.",
     "Lenz's law is about the direction of induced currents, not about the voltage that arises across a current-carrying plate in a magnetic field.",
     "Eddy currents are circulating currents in a material, a different phenomenon from the transverse voltage produced by the Hall effect."
    ]
   },
   {
    "question": "Which relationship gives the Hall voltage $U$ in a magnetic field meter, expressed in terms of the electrons' velocity $v$, the width of the plate $d$ and the flux density $B$?",
    "choices": [
     "$U = \\dfrac{v \\cdot B}{d}$",
     "$U = v \\cdot d \\cdot B$",
     "$U = \\dfrac{d}{v \\cdot B}$",
     "$U = v + d + B$"
    ],
    "correct": 1,
    "why": [
     "Here you divide by $d$ instead of multiplying by it.",
     "The Hall voltage is given by $U = v \\cdot d \\cdot B$, where $v$ is the electrons' velocity, $d$ the width of the plate and $B$ the flux density.",
     "This is a completely inverted quotient compared with the correct expression.",
     "The quantities should be multiplied, not added. They also have different units, so a sum would not be physically meaningful."
    ]
   },
   {
    "question": "In a Hall effect sensor, a certain voltage $U$ arises across the edges of the plate when:",
    "choices": [
     "the current through the plate has stopped completely",
     "the magnetic field is directed parallel to the direction of the current",
     "equilibrium has been reached between the magnetic force $F_\\mathrm{m}$ and the electric force $F_\\mathrm{e}$ on the electrons",
     "the width of the plate $d$ is zero"
    ],
    "correct": 2,
    "why": [
     "Without a current through the plate there would be no moving charges to deflect, and no Hall voltage would arise at all.",
     "If the field were parallel to the direction of the current, the electrons would not be affected by any sideways magnetic force, and no Hall voltage would form.",
     "The Hall voltage arises when the electrons, which are at first deflected sideways by the magnetic force, charge up the edges until the electric force balances the magnetic force.",
     "A width of zero is physically unreasonable for a real plate and gives no meaningful condition for the voltage."
    ]
   },
   {
    "question": "The magnetic field meter has measured the Hall voltage $U$ and knows the electrons' velocity $v$ and the width of the plate $d$. How is the magnetic flux density $B$ calculated?",
    "choices": [
     "$B = \\dfrac{U}{v}$",
     "$B = \\dfrac{U}{d}$",
     "$B = U \\cdot v \\cdot d$",
     "$B = \\dfrac{U}{v \\cdot d}$"
    ],
    "correct": 3,
    "why": [
     "This corresponds to forgetting the width of the plate $d$ in the denominator.",
     "This corresponds to forgetting the electrons' velocity $v$ in the denominator.",
     "This is what you get if the numerator and denominator swap places, that is, if you multiply instead of divide.",
     "Solving $U = v \\cdot d \\cdot B$ for $B$ gives $B = \\dfrac{U}{v \\cdot d}$."
    ]
   }
  ]
 },
 "fy2-4.1": {
  "kalla": "ec01269bb5",
  "data": [
   {
    "question": "What is it that oscillates in an electromagnetic wave, and in which directions do the oscillations point?",
    "choices": [
     "Only the electric field oscillates; the magnetic field is constant.",
     "The electric field and the density of the air oscillate together.",
     "The electric and the magnetic field oscillate in phase, perpendicular to each other and to the direction of propagation.",
     "The electric and magnetic field oscillate in antiphase (180° phase difference) and are parallel to the direction of propagation."
    ],
    "correct": 2,
    "why": [
     "Both the electric and the magnetic field oscillate. Neither of them is constant.",
     "An electromagnetic wave does not need a medium such as air to propagate; it is the fields, not the density of the air, that oscillate.",
     "The electric and magnetic field oscillate in phase and perpendicular both to each other and to the direction in which the wave propagates, just as in the figure in the lesson.",
     "The fields oscillate in phase (not in antiphase) and are perpendicular to the direction of propagation (not parallel to it)."
    ]
   },
   {
    "question": "Which relationship holds between the frequency *f* of light, its wavelength *λ* and the speed of light *c*?",
    "choices": [
     "$f = \\lambda \\cdot c$",
     "$f = \\dfrac{c}{\\lambda}$",
     "$\\lambda = f \\cdot c$",
     "$f = c - \\lambda$"
    ],
    "correct": 1,
    "why": [
     "Multiplying *c* and *λ* does not give a frequency. Try putting in the units (m/s times m does not give 1/s).",
     "The frequency of light is given by $f = \\dfrac{c}{\\lambda}$, just as in the lesson.",
     "This does not describe the relationship between wavelength, frequency and speed correctly. Put in the units and you will see that it does not work.",
     "Frequency and wavelength cannot meaningfully be subtracted from the speed of light. The relationship is a quotient, not a difference."
    ]
   },
   {
    "question": "Which of the following types of radiation has the shortest wavelength (and therefore the highest energy)?",
    "choices": [
     "Radio waves",
     "Infrared light",
     "Visible light",
     "Ultraviolet light"
    ],
    "correct": 3,
    "why": [
     "Radio waves have the longest wavelength of the options and therefore the lowest energy.",
     "Infrared light has a longer wavelength (and lower energy) than visible light.",
     "Visible light has a shorter wavelength than infrared but a longer wavelength than ultraviolet.",
     "Ultraviolet light has the shortest wavelength of the options and therefore the highest energy. A shorter wavelength always gives a higher energy."
    ]
   },
   {
    "question": "A torch shines with the power 2.0 W spread evenly over a surface with the area 4.0 m². What is the light intensity on the surface?",
    "choices": [
     "2.0 W/m²",
     "0.5 W/m²",
     "8.0 W/m²",
     "0.25 W/m²"
    ],
    "correct": 1,
    "why": [
     "This is just the power *P* of the torch. Remember that the intensity is found by dividing the power by the area of the surface, not just by reading off *P*.",
     "The light intensity is given by $I = \\dfrac{P}{A} = \\dfrac{2.0}{4.0} = 0.5$ W/m².",
     "This is what you get if you multiply the power by the area by mistake instead of dividing.",
     "Check the calculation: 2.0 divided by 4.0 gives 0.5, not 0.25."
    ]
   },
   {
    "question": "If the distance to a point source of light is doubled, what happens to the light intensity?",
    "choices": [
     "It is halved.",
     "It is quadrupled.",
     "It decreases to a quarter.",
     "It is unchanged."
    ],
    "correct": 2,
    "why": [
     "The intensity depends on the square of the distance, not linearly on it, so it decreases by more than a half.",
     "The intensity decreases when the distance increases. It does not increase.",
     "Since $I = \\dfrac{P}{4\\pi \\cdot r^{2}}$, doubling *r* gives an area four times as large, and so an intensity a quarter as large.",
     "The intensity depends strongly on the distance. It changes a lot when *r* changes."
    ]
   }
  ]
 },
 "fy2-4.2": {
  "kalla": "4edbdc86e1",
  "data": [
   {
    "question": "What characterises coherent light?",
    "choices": [
     "Light of mixed wavelengths, like the light from an incandescent bulb.",
     "Light of the same wavelength and in phase, like the light from a laser.",
     "Light of the same wavelength but not necessarily in phase.",
     "Light that consists only of red light."
    ],
    "correct": 1,
    "why": [
     "That describes incoherent light instead.",
     "Coherent light has the same wavelength and is in phase, which is typical of laser light.",
     "In the lesson this is called monochromatic light instead.",
     "The colour (wavelength) on its own does not decide whether the light is coherent. It is about phase, not about which colour it is."
    ]
   },
   {
    "question": "What happens to the diffraction (the bending of the light) when a slit is made narrower?",
    "choices": [
     "No difference: the width of the slit does not affect the bending.",
     "The narrower the slit, the less the light bends.",
     "The narrower the slit, the more the light bends.",
     "Light stops behaving like a wave at narrow slits."
    ],
    "correct": 2,
    "why": [
     "On the contrary, the width of the slit clearly affects the bending (the diffraction).",
     "It is the other way round: a narrower slit gives more bending, not less.",
     "The narrower the slit, the greater the diffraction (the bending) at the edges.",
     "Diffraction is precisely evidence that light behaves like a wave, not the opposite."
    ]
   },
   {
    "question": "Which is the grating formula for calculating the directions in which light is reinforced by a grating?",
    "choices": [
     "$n \\cdot \\lambda = d \\cdot \\sin\\alpha_n$",
     "$n \\cdot d = \\lambda \\cdot \\sin\\alpha_n$",
     "$\\lambda = n \\cdot d \\cdot \\sin\\alpha_n$",
     "$n \\cdot \\lambda = \\dfrac{d}{\\sin\\alpha_n}$"
    ],
    "correct": 0,
    "why": [
     "This is the grating formula, just as in the lesson: $n \\cdot \\lambda = d \\cdot \\sin\\alpha_n$.",
     "Here *d* and *λ* have swapped places compared with the correct formula.",
     "This puts an extra factor *n* in front of the wavelength that does not belong there.",
     "*d* should be multiplied by $\\sin\\alpha_n$, not divided by it."
    ]
   },
   {
    "question": "What is the grating constant?",
    "choices": [
     "The number of slits in the grating.",
     "The distance between each slit in the grating.",
     "The angle to the first-order maximum.",
     "The wavelength of the light through the grating."
    ],
    "correct": 1,
    "why": [
     "That describes the number of slits, not the grating constant.",
     "The grating constant is precisely the distance between each slit, written *d* in the grating formula.",
     "That is the angle of deviation $\\alpha_n$, not the grating constant.",
     "The wavelength is written *λ* and is a separate quantity, distinct from the grating constant."
    ]
   },
   {
    "question": "A grating has the slit spacing $d = 2.0 \\cdot 10^{-6}$ m. The first-order maximum ($n = 1$) forms at the angle of deviation $30^\\circ$. Find the wavelength of the light.",
    "choices": [
     "500 nm",
     "2000 nm",
     "1000 nm",
     "0.5 nm"
    ],
    "correct": 2,
    "why": [
     "This is half the correct answer, as if you had multiplied by $\\sin 30^\\circ = 0.5$ twice. With $n = 1$, $\\lambda = d \\cdot \\sin 30^\\circ = 2.0 \\cdot 10^{-6} \\cdot 0.5 = 1.0 \\cdot 10^{-6}\\ \\mathrm{m}$.",
     "This is what you get if you forget to multiply by $\\sin 30^\\circ = 0.5$ and just use *d* as it is.",
     "From the grating formula $\\lambda = \\dfrac{d \\cdot \\sin\\alpha_n}{n} = \\dfrac{2.0 \\cdot 10^{-6} \\cdot 0.5}{1} = 1.0 \\cdot 10^{-6}$ m $= 1000$ nm.",
     "Here the unit conversion from metres to nanometres has gone wrong (a factor $10^{9}$ too small)."
    ]
   }
  ]
 },
 "fy2-4.3": {
  "kalla": "a24767145a",
  "data": [
   {
    "question": "What characterises an object that is a perfect black body?",
    "choices": [
     "An object that reflects all incoming radiation.",
     "An object that absorbs all incoming radiation.",
     "An object that neither absorbs nor emits energy.",
     "An object that only emits infrared radiation."
    ],
    "correct": 1,
    "why": [
     "It is the other way round: a mirror-like surface that reflects everything is the opposite of a perfect black body.",
     "A perfect black body absorbs all incoming radiation, whatever the wavelength.",
     "A perfect black body both absorbs and (if it is warm) emits energy very effectively.",
     "The type of radiation emitted depends on the temperature, not on whether the body is a perfect black body."
    ]
   },
   {
    "question": "How is an object's ability to absorb radiation related to its ability to emit radiation?",
    "choices": [
     "A body with a high ability to absorb always has a low ability to emit.",
     "The ability to absorb and the ability to emit are completely unrelated.",
     "A body with a high ability to absorb also has a high ability to emit.",
     "Only shiny, light surfaces have a high ability to emit."
    ],
    "correct": 2,
    "why": [
     "According to the lesson it is the other way round: they are related positively, not negatively.",
     "On the contrary, they are linked: good absorption also means good emission.",
     "A surface that is good at absorbing radiation is also good at emitting it.",
     "It is the other way round: matt, dark surfaces have the highest ability to emit, not shiny, light ones."
    ]
   },
   {
    "question": "Which relationship is described by Wien's displacement law?",
    "choices": [
     "$\\lambda_\\mathrm{max} \\cdot T = 2.8978 \\cdot 10^{-3}$ m·K",
     "$\\lambda_\\mathrm{max} + T = 2.8978 \\cdot 10^{-3}$ m·K",
     "$\\dfrac{\\lambda_\\mathrm{max}}{T} = 2.8978 \\cdot 10^{-3}$ m·K",
     "$\\lambda_\\mathrm{max} \\cdot T^{2} = 2.8978 \\cdot 10^{-3}$ m·K"
    ],
    "correct": 0,
    "why": [
     "This is Wien's displacement law, just as in the lesson: the product of $\\lambda_\\mathrm{max}$ and *T* is constant.",
     "The relationship is a product, not a sum, of $\\lambda_\\mathrm{max}$ and *T*.",
     "The relationship is a product, not a quotient. Otherwise a higher temperature would give a longer peak wavelength, which is wrong.",
     "The temperature should not be squared in Wien's law. It is the Stefan–Boltzmann law that contains $T^{4}$."
    ]
   },
   {
    "question": "If the temperature of a black body is doubled, how does the emittance $M$ change according to the Stefan–Boltzmann law?",
    "choices": [
     "It doubles.",
     "It quadruples.",
     "It becomes 16 times as large.",
     "It is unchanged."
    ],
    "correct": 2,
    "why": [
     "The emittance depends on $T^{4}$, not linearly on *T*, so doubling the temperature gives more than a doubling.",
     "Quadrupling corresponds to $T^{2}$, but the Stefan–Boltzmann law has $T^{4}$.",
     "According to $M = \\sigma \\cdot T^{4}$, doubling *T* gives an emittance that is $2^{4} = 16$ times as large.",
     "The emittance depends strongly on the temperature. It changes a lot when *T* changes."
    ]
   },
   {
    "question": "How does the wavelength with the highest emittance, $\\lambda_\\mathrm{max}$, change when the temperature of a black body increases?",
    "choices": [
     "$\\lambda_\\mathrm{max}$ increases with the temperature.",
     "$\\lambda_\\mathrm{max}$ decreases with the temperature.",
     "$\\lambda_\\mathrm{max}$ does not depend on the temperature.",
     "$\\lambda_\\mathrm{max}$ is always zero."
    ],
    "correct": 1,
    "why": [
     "It is the other way round: a hotter body has its peak at a shorter wavelength, not a longer one.",
     "The higher the temperature, the shorter the peak wavelength, just as the graph in the lesson shows and as Wien's law describes.",
     "Wien's displacement law shows precisely that $\\lambda_\\mathrm{max}$ depends on the temperature.",
     "$\\lambda_\\mathrm{max}$ is a definite, positive value at every temperature. It is never zero for a body with a given temperature."
    ]
   }
  ]
 },
 "fy2-4.4": {
  "kalla": "ca37546f1a",
  "data": [
   {
    "question": "How is the refractive index *n* of a substance defined?",
    "choices": [
     "$n = \\dfrac{v}{c}$",
     "$n = c \\cdot v$",
     "$n = \\dfrac{c}{v}$",
     "$n = c - v$"
    ],
    "correct": 2,
    "why": [
     "This is the refractive index upside down. It should be the speed of light in a vacuum divided by the speed in the substance, not the other way round.",
     "Multiplying *c* and *v* does not give the dimensionless number that the refractive index should be.",
     "The refractive index is defined as $n = \\dfrac{c}{v}$, the ratio of the speed of light in a vacuum to the speed in the substance.",
     "A difference between two speeds does not give the dimensionless number that the refractive index is."
    ]
   },
   {
    "question": "What does it mean that a medium has a higher refractive index than another?",
    "choices": [
     "A medium with a lower refractive index is optically denser.",
     "A medium with a higher refractive index is optically denser.",
     "Optical density has nothing to do with the refractive index.",
     "All transparent media are equally optically dense."
    ],
    "correct": 1,
    "why": [
     "It is the other way round: a lower refractive index means optically less dense, not denser.",
     "The higher the refractive index, the optically denser the medium. For example, glass ($n = 1.52$) is denser than water ($n = 1.33$).",
     "The refractive index is precisely the number that decides how optically dense a medium is.",
     "Different media have different refractive indices, for example water 1.33 and diamond 2.42, and so they are not equally optically dense."
    ]
   },
   {
    "question": "Which formula is the law of refraction for light (Snell's law)?",
    "choices": [
     "$n_1 \\cdot \\sin i = n_2 \\cdot \\sin b$",
     "$n_1 \\cdot \\sin b = n_2 \\cdot \\sin i$",
     "$n_1 + \\sin i = n_2 + \\sin b$",
     "$\\sin i = \\sin b$"
    ],
    "correct": 0,
    "why": [
     "This is Snell's law, just as in the lesson: $n_1 \\cdot \\sin i = n_2 \\cdot \\sin b$.",
     "Here the angle of incidence *i* and the angle of refraction *b* have swapped places in the formula.",
     "The relationship between refractive indices and angles consists of products, not sums.",
     "This only holds if $n_1 = n_2$. Otherwise the angles are different, which is the whole point of refraction."
    ]
   },
   {
    "question": "A ray of light passes from an optically less dense medium (for example air) into an optically denser medium (for example glass). How is the ray refracted?",
    "choices": [
     "The light is refracted away from the normal.",
     "The light is refracted towards the normal.",
     "The light continues completely straight without changing direction.",
     "The light is totally reflected and not refracted at all."
    ],
    "correct": 1,
    "why": [
     "It is the other way round when the light enters a denser medium: it is refracted towards the normal, not away from it.",
     "A ray of light passing from an optically less dense to an optically denser medium is refracted towards the normal, for example from air to glass.",
     "The light only continues straight through if the angle of incidence is $0^\\circ$.",
     "The light is both refracted and partly reflected at the boundary. It does not disappear completely into the reflection."
    ]
   },
   {
    "question": "A ray of light passes from air ($n_1 = 1.0$) into water ($n_2 = 1.33$) with an angle of incidence such that $\\sin i = 0.665$. What is $\\sin b$?",
    "choices": [
     "0.884",
     "1.33",
     "0.332",
     "0.5"
    ],
    "correct": 3,
    "why": [
     "This is what you get if you happen to multiply $n_2$ by $\\sin i$ instead of dividing by $n_2$.",
     "$\\sin b$ can never be greater than 1, so this answer is not physically reasonable.",
     "This is half of $\\sin i$, as if you had divided by 2 instead of by $n_2 = 1.33$. The right value is $\\dfrac{1.0 \\cdot 0.665}{1.33} = 0.5$.",
     "From Snell's law: $\\sin b = \\dfrac{n_1 \\cdot \\sin i}{n_2} = \\dfrac{1.0 \\cdot 0.665}{1.33} = 0.5$."
    ]
   }
  ]
 },
 "fy2-4.5": {
  "kalla": "f16a928d46",
  "data": [
   {
    "question": "Why can the photoelectric effect not be explained just by thinking of light as a wave?",
    "choices": [
     "Because strong visible light ought to be able to knock out electrons if light were only a wave, and that is not observed.",
     "Because UV light has too low a frequency to be a wave.",
     "Because waves cannot travel through a vacuum.",
     "Because electrons cannot be affected by electromagnetic fields."
    ],
    "correct": 0,
    "why": [
     "If light were only a wave, strong (energetic) visible light ought to be able to knock out electrons just like UV light, but that does not happen. It takes photons with a high enough energy per photon.",
     "On the contrary, UV light has a high frequency (short wavelength) compared with visible light.",
     "Electromagnetic waves travel perfectly well through a vacuum. That is exactly how sunlight reaches the Earth.",
     "Electrons are indeed affected by electromagnetic fields. That is the basis of the whole phenomenon."
    ]
   },
   {
    "question": "Which formula gives the energy of a photon?",
    "choices": [
     "$E = h \\cdot f$",
     "$E = \\dfrac{h}{f}$",
     "$E = h + f$",
     "$E = f - h$"
    ],
    "correct": 0,
    "why": [
     "The energy of the photon is given by $E = h \\cdot f$ (or, equivalently, $E = \\dfrac{h \\cdot c}{\\lambda}$).",
     "The relationship between the Planck constant and the frequency is a product, not a quotient.",
     "Energy, constant and frequency are related by multiplication, not addition.",
     "A difference between the constant *h* and the frequency *f* does not give a meaningful energy."
    ]
   },
   {
    "question": "What is the work function?",
    "choices": [
     "The energy an electron has after leaving the metal surface.",
     "The energy needed for an electron to be able to leave the metal surface.",
     "The total energy of the photon before the collision.",
     "The momentum of the electron that is knocked out."
    ],
    "correct": 1,
    "why": [
     "That describes the kinetic energy $E_\\mathrm{k}$ of the electron after it has left the surface instead.",
     "The work function $W_\\mathrm{u}$ is precisely the energy needed for the electron to be able to leave the metal surface.",
     "The total energy of the photon is $h \\cdot f$, which is shared between the work function and the kinetic energy of the electron.",
     "Momentum and energy are different quantities. The work function is an energy, not a momentum."
    ]
   },
   {
    "question": "What is conserved in Compton scattering, when a photon collides with an electron?",
    "choices": [
     "Only the energy is conserved, not the momentum.",
     "Only the momentum is conserved, not the energy.",
     "Both the momentum and the kinetic energy are conserved, as in a perfectly elastic collision.",
     "Neither the energy nor the momentum is conserved, since the photon has no mass."
    ],
    "correct": 2,
    "why": [
     "Both energy and momentum are conserved in Compton scattering, not just the energy.",
     "Both momentum and kinetic energy are conserved, not just the momentum.",
     "In Compton scattering both the momentum and the kinetic energy are conserved, just as in a perfectly elastic collision between billiard balls.",
     "Even though the photon has no mass it still has momentum, and both conservation laws still apply."
    ]
   },
   {
    "question": "What is an electronvolt (eV)?",
    "choices": [
     "An SI unit of power.",
     "Another name for the mass of the electron.",
     "A practical unit of energy, where $1\\ \\mathrm{eV} = 1.602 \\cdot 10^{-19}$ J.",
     "A unit of electric charge."
    ],
    "correct": 2,
    "why": [
     "Power is measured in watts (W), not electronvolts.",
     "The mass of the electron is measured in kilograms (kg), not electronvolts.",
     "The electronvolt (eV) is a practical unit of energy for very small energies, defined as $1\\ \\mathrm{eV} = 1.602 \\cdot 10^{-19}$ J.",
     "Electric charge is measured in coulombs (C), not electronvolts."
    ]
   },
   {
    "question": "A photon with the energy 3.0 eV hits a metal surface with the work function 2.0 eV and knocks out an electron. What kinetic energy does the electron get?",
    "choices": [
     "5.0 eV",
     "2.0 eV",
     "6.0 eV",
     "1.0 eV"
    ],
    "correct": 3,
    "why": [
     "This is what you get if you add the energy of the photon and the work function instead of subtracting them.",
     "This is just the work function. Remember to work out the difference between the energy of the photon and the work function.",
     "This is what you get if you double the work function by mistake.",
     "From the formula $h \\cdot f = W_\\mathrm{u} + E_\\mathrm{k}$ we get $E_\\mathrm{k} = h \\cdot f - W_\\mathrm{u} = 3.0 - 2.0 = 1.0$ eV."
    ]
   }
  ]
 },
 "fy2-4.6": {
  "kalla": "28941865e3",
  "data": [
   {
    "question": "What does de Broglie's hypothesis say?",
    "choices": [
     "Only photons have wave properties.",
     "All particles, not just photons, have wave properties.",
     "Only electrons have wave properties, no other particles.",
     "Wave properties apply only to macroscopic objects such as balls and cars."
    ],
    "correct": 1,
    "why": [
     "De Broglie's point was exactly the opposite: that wave properties are not unique to photons.",
     "According to de Broglie's hypothesis all particles, for example electrons, protons and neutrons, have a wavelength.",
     "The hypothesis applies to all particles, not just electrons. Electrons are, however, the easiest particles in which to observe wave properties, because they are so light.",
     "It is the other way round: the wave properties are negligible for macroscopic objects but noticeable for very small particles."
    ]
   },
   {
    "question": "Which formula describes the de Broglie wavelength of a particle?",
    "choices": [
     "$\\lambda = \\dfrac{h}{m \\cdot v}$",
     "$\\lambda = h \\cdot m \\cdot v$",
     "$\\lambda = \\dfrac{m \\cdot v}{h}$",
     "$\\lambda = h + m \\cdot v$"
    ],
    "correct": 0,
    "why": [
     "The de Broglie wavelength is given by $\\lambda = \\dfrac{h}{m \\cdot v}$, just as in the lesson.",
     "The relationship between the Planck constant and the momentum $m \\cdot v$ is a quotient, not a product.",
     "This is the formula upside down: *h* should be in the numerator, not $m \\cdot v$.",
     "The Planck constant and the momentum are related by division, not addition."
    ]
   },
   {
    "question": "What did the double-slit experiment with electrons show, when the electrons were sent through the slits one at a time?",
    "choices": [
     "That electrons always pass through exactly one of the slits, like particles.",
     "That electrons only behave like waves when they are sent in large groups at the same time.",
     "That an interference pattern appears even when the electrons are sent one at a time, as if each electron interferes with itself.",
     "That electrons have no wave properties at all."
    ],
    "correct": 2,
    "why": [
     "If that were true, the pattern on the screen would be two lines, not an interference pattern.",
     "The interference pattern appears even if the electrons are sent one at a time, not only in groups.",
     "The experiment showed that the interference pattern appears even with one electron at a time, which is interpreted as the electron passing through both slits at once, like a wave.",
     "On the contrary, the experiment showed clear wave properties of electrons through the interference pattern."
    ]
   },
   {
    "question": "Why do we not notice the wave properties of macroscopic objects such as balls and cars?",
    "choices": [
     "Because the de Broglie wavelength becomes negligibly small compared with the size of the object when the mass and the speed are large.",
     "Because large objects have no momentum.",
     "Because the Planck constant is different for large and small objects.",
     "Because light cannot be reflected off large objects."
    ],
    "correct": 0,
    "why": [
     "The larger the mass and the speed, the smaller $\\lambda = \\dfrac{h}{m \\cdot v}$ becomes. For a tennis ball the wavelength is unimaginably much smaller than the ball itself.",
     "All moving objects have momentum $p = m \\cdot v$, whatever their size.",
     "The Planck constant *h* is a universal constant of nature, the same for all objects.",
     "Light certainly is reflected off large objects. That is why we can see them, but it has nothing to do with the de Broglie wavelength."
    ]
   },
   {
    "question": "A particle with the mass $m = 6.626 \\cdot 10^{-27}$ kg moves with the speed $v = 1000$ m/s. Find the de Broglie wavelength of the particle.",
    "choices": [
     "$1.0 \\cdot 10^{-4}$ m",
     "$6.626 \\cdot 10^{-24}$ m",
     "$1.0 \\cdot 10^{-10}$ m",
     "$1.0 \\cdot 10^{4}$ m"
    ],
    "correct": 2,
    "why": [
     "Check the power of ten: $10^{-34}$ divided by $10^{-24}$ gives $10^{-10}$, not $10^{-4}$.",
     "This is just the denominator $m \\cdot v$. Do not forget to divide *h* by this product instead of just copying it.",
     "$\\lambda = \\dfrac{h}{m \\cdot v} = \\dfrac{6.626 \\cdot 10^{-34}}{6.626 \\cdot 10^{-27} \\cdot 1000} = \\dfrac{6.626 \\cdot 10^{-34}}{6.626 \\cdot 10^{-24}} = 1.0 \\cdot 10^{-10}$ m.",
     "The sign of the exponent has gone wrong. Check the calculation again."
    ]
   }
  ]
 },
 "fy2-4.7": {
  "kalla": "0ff8dd1154",
  "data": [
   {
    "question": "Which of the following light sources gives a continuous spectrum?",
    "choices": [
     "Neon signs",
     "Sodium street lamps",
     "Incandescent bulbs",
     "Mercury lamps in sunbeds"
    ],
    "correct": 2,
    "why": [
     "Neon signs give a discrete spectrum, because the light comes from individual atoms in a low-pressure gas.",
     "Sodium lamps, like neon, give a discrete emission spectrum from an atomic gas.",
     "In an incandescent bulb a filament is heated and gives off light of all wavelengths: a continuous spectrum.",
     "Mercury lamps also give a discrete spectrum, not a continuous one."
    ]
   },
   {
    "question": "Why does every element have a unique characteristic spectrum?",
    "choices": [
     "Because every element has a unique mass.",
     "Because all atoms emit exactly the same wavelengths.",
     "Because the speed of light differs between different elements.",
     "Because the electrons jump between exactly the energy levels that are unique to the atoms of that element."
    ],
    "correct": 3,
    "why": [
     "The mass on its own does not decide which wavelengths are emitted. The energy levels do.",
     "On the contrary, the point is that every element has its own unique spectrum, not the same as all the others.",
     "The speed of light in a vacuum is always the same, whichever element emits the light.",
     "Every element has unique energy levels, and it is the jumps between them that give the characteristic spectrum, like a fingerprint."
    ]
   },
   {
    "question": "What characterises an absorption spectrum?",
    "choices": [
     "A continuous spectrum with dark lines at the wavelengths the gas has absorbed.",
     "A spectrum with only black lines and no light at all.",
     "The same thing as an emission spectrum.",
     "A spectrum that only appears in a vacuum without any gas."
    ],
    "correct": 0,
    "why": [
     "An absorption spectrum appears when light of all wavelengths passes through a gas that absorbs certain specific wavelengths, which show up as dark lines in an otherwise continuous spectrum.",
     "An absorption spectrum is still mainly bright (continuous) but with dark lines at certain wavelengths. It is not completely black.",
     "The emission spectrum shows bright lines on a black background, while the absorption spectrum shows dark lines on a bright background: opposite patterns, but at the same wavelengths.",
     "On the contrary, an atomic gas that the light passes through is needed for an absorption spectrum to appear."
    ]
   },
   {
    "question": "What does the fact that the Sun's spectrum has dark lines that coincide with the spectral lines of hydrogen show?",
    "choices": [
     "That the Sun only emits red light.",
     "That the Sun's atmosphere contains hydrogen, since the dark lines coincide with the spectral lines of hydrogen.",
     "That the Sun contains no hydrogen at all.",
     "That the Sun is a perfect black body without spectral lines."
    ],
    "correct": 1,
    "why": [
     "The Sun emits a broad spectrum of wavelengths. The dark lines are just narrow gaps in an otherwise continuous spectrum.",
     "The dark lines in the Sun's spectrum, for example at 656 nm, coincide exactly with the spectral lines of hydrogen, which reveals that the Sun's atmosphere contains hydrogen.",
     "On the contrary, the dark lines show that there is hydrogen in the Sun's atmosphere, absorbing light at exactly those wavelengths.",
     "The Sun shows clear (dark) spectral lines in its otherwise almost continuous spectrum."
    ]
   }
  ]
 },
 "fy2-4.8": {
  "kalla": "af245fd67d",
  "data": [
   {
    "question": "What happens when an electron in an atom is de-excited?",
    "choices": [
     "An electron absorbs a photon and jumps to a higher orbit.",
     "An electron falls to an orbit with lower energy and a photon is emitted.",
     "The nucleus emits a photon.",
     "The electron leaves the atom completely."
    ],
    "correct": 1,
    "why": [
     "That describes excitation, the opposite of de-excitation.",
     "In de-excitation the electron moves to an orbit with lower energy, and a photon is emitted with an energy equal to the decrease in potential energy.",
     "It is the electron, not the nucleus, that emits the photon in de-excitation.",
     "That describes ionisation, not de-excitation."
    ]
   },
   {
    "question": "Which relationship holds for the energy of a photon emitted in a quantum jump between the energy levels $E_n$ and $E_m$?",
    "choices": [
     "$h \\cdot f = E_n - E_m$",
     "$h \\cdot f = E_n + E_m$",
     "$h \\cdot f = E_n \\cdot E_m$",
     "$h \\cdot f = \\dfrac{E_n}{E_m}$"
    ],
    "correct": 0,
    "why": [
     "The energy of the photon in a quantum jump is given by the difference between the energy levels: $h \\cdot f = E_n - E_m$.",
     "The relationship is a difference, not a sum, between the two energy levels.",
     "The energy levels should be subtracted, not multiplied by each other.",
     "The energy levels should be subtracted, not divided by each other."
    ]
   },
   {
    "question": "How large is the ionisation energy of the hydrogen atom, counted from the ground state?",
    "choices": [
     "0 eV",
     "1.0 eV",
     "13.6 eV",
     "656 eV"
    ],
    "correct": 2,
    "why": [
     "The ionisation limit is chosen as the zero level, but the ionisation energy itself (counted from the ground state) is not zero.",
     "This is far too little. The ionisation energy of hydrogen is considerably larger.",
     "For the hydrogen atom the ionisation energy is 13.6 eV: the energy needed to lift the electron from the ground state ($n = 1$) to the ionisation limit.",
     "This is far too much. 656 nm is instead a wavelength in the Balmer series, not an energy in eV."
    ]
   },
   {
    "question": "Which statement about the Lyman, Balmer and Paschen series in the spectrum of the hydrogen atom is true?",
    "choices": [
     "The Lyman series gives visible light because it ends at $n = 2$.",
     "The Balmer series gives visible light because it ends at $n = 2$.",
     "The Paschen series gives ultraviolet radiation because it ends at $n = 1$.",
     "All three series give exactly the same wavelengths."
    ],
    "correct": 1,
    "why": [
     "The Lyman series ends at $n = 1$ and gives ultraviolet radiation, not visible light.",
     "The Balmer series ends at $n = 2$ and gives the jumps that correspond to visible light, for example the red line at 656 nm.",
     "The Paschen series ends at $n = 3$ and gives infrared radiation, not ultraviolet.",
     "The three series correspond to different energy differences and therefore give completely different wavelengths."
    ]
   },
   {
    "question": "Use the formula $E_n \\approx -\\dfrac{13.6}{n^{2}}$ eV to find the energy of the second energy level of the hydrogen atom ($n = 2$).",
    "choices": [
     "−6.8 eV",
     "−1.7 eV",
     "−13.6 eV",
     "−3.4 eV"
    ],
    "correct": 3,
    "why": [
     "This is what you get if you divide by 2 instead of by $n^{2} = 4$.",
     "This is too small in magnitude. Check that you divide 13.6 by $2^{2} = 4$, not by a larger number.",
     "This is the energy of the ground state ($n = 1$), not of $n = 2$.",
     "$E_2 = -\\dfrac{13.6}{2^{2}} = -\\dfrac{13.6}{4} = -3.4$ eV."
    ]
   }
  ]
 },
 "fy2-5.1": {
  "kalla": "24cac5912b",
  "data": [
   {
    "question": "What is the difference between a solar system and a galaxy?",
    "choices": [
     "A solar system contains several different galaxies within it",
     "They are the same thing, just two different names for exactly the same phenomenon",
     "A solar system is a star with its planets; a galaxy is hundreds of billions of stars",
     "A galaxy is smaller and simpler in structure than a solar system"
    ],
    "correct": 2,
    "why": [
     "It is the other way round: a galaxy contains hundreds of billions of solar systems, not a solar system several galaxies.",
     "They are not the same thing. A galaxy is enormously much larger and contains countless solar systems.",
     "A solar system is a single star with its planets, while a galaxy such as the Milky Way contains hundreds of billions of stars, almost all of them with solar systems of their own.",
     "On the contrary, a galaxy is enormously much larger than a solar system; a whole solar system is just one of an unimaginable number of dots in the galaxy."
    ]
   },
   {
    "question": "What does the unit light year measure?",
    "choices": [
     "The speed of light",
     "An angle between stars",
     "A length of time: how long light exists",
     "A distance: the distance light travels in one year"
    ],
    "correct": 3,
    "why": [
     "The speed of light is $3.00 \\cdot 10^{8}\\ \\mathrm{m/s}$, a speed. That is not the same thing as a light year, which is a distance.",
     "An angle between stars is measured with parallax instead (see section 5.2), a different concept.",
     "Despite the word \"year\" in the name, a light year is not a measure of time but the distance light manages to travel in that time.",
     "A light year is the distance light travels in one year, about $9.5 \\cdot 10^{15}\\ \\mathrm{m}$: almost 10 trillion kilometres."
    ]
   },
   {
    "question": "The Solar System is about 0.001 light years across and the Milky Way about 100 000 light years across. Roughly how many times larger is the Milky Way?",
    "choices": [
     "A hundred million times",
     "A hundred times",
     "Ten thousand times",
     "A billion times"
    ],
    "correct": 0,
    "why": [
     "$100\\,000 / 0.001 = 100\\,000\\,000$, that is a hundred million: exactly the quotient that gives the correct answer.",
     "Far too low. The quotient $100\\,000/0.001$ is much larger than a hundred.",
     "Still too low. The quotient gives a hundred million, not ten thousand.",
     "Somewhat too high. The quotient gives a hundred million, not a billion."
    ]
   },
   {
    "question": "What is at the centre of the Milky Way?",
    "choices": [
     "A white dwarf star",
     "The Earth and the Solar System",
     "The Andromeda Galaxy",
     "A supermassive black hole (Sagittarius A*)"
    ],
    "correct": 3,
    "why": [
     "A white dwarf is the final stage of a lighter star such as our Sun (see section 5.5), not what is at the centre of the galaxy.",
     "The Solar System lies out in one of the spiral arms, about 27 000 light years from the centre, not in the middle.",
     "The Andromeda Galaxy is a separate galaxy in the Local Group, not something at the centre of the Milky Way.",
     "At the centre of the Milky Way is the supermassive black hole Sagittarius A*, with a mass of about 4 million solar masses."
    ]
   },
   {
    "question": "Which two galaxies are the heaviest members of the Local Group, and what will happen to them?",
    "choices": [
     "The Milky Way and Laniakea: they will merge within a hundred years",
     "The Milky Way and Andromeda: they will merge in a few billion years",
     "Andromeda and Sagittarius A*: they will push each other away",
     "The Milky Way and the Local Group: they are the same thing"
    ],
    "correct": 1,
    "why": [
     "Laniakea is not a galaxy but the supercluster that the Local Group belongs to. It cannot \"merge\" with the Milky Way in that way.",
     "The Milky Way and Andromeda are the two heaviest galaxies in the Local Group, and they are approaching each other and will merge in about 4–5 billion years.",
     "Sagittarius A* is the black hole at the centre of the Milky Way, not a galaxy of its own that could push Andromeda away.",
     "The Local Group is the group of just over 50 galaxies that the Milky Way belongs to, not a single galaxy."
    ]
   }
  ]
 },
 "fy2-5.2": {
  "kalla": "a02f90e95c",
  "data": [
   {
    "question": "What is parallax?",
    "choices": [
     "The bending of light around very heavy masses in space",
     "The difference between a sidereal and a synodic orbital period",
     "The apparent shift of an object against the background when the observer moves",
     "The angle between the Sun and a star seen from the Earth at a given time"
    ],
    "correct": 2,
    "why": [
     "That describes gravitational lensing, not parallax.",
     "That is the difference between a sidereal and a synodic month (see section 5.3), a completely different concept.",
     "Parallax is precisely the apparent shift against the background. Try it yourself by closing one eye at a time while looking at a finger.",
     "That is close, but the parallax angle is measured specifically from the shift against background stars from the Earth's two positions, not as the angle to the Sun."
    ]
   },
   {
    "question": "What is the approximate value of an astronomical unit (AU)?",
    "choices": [
     "$9.5 \\cdot 10^{15}\\ \\mathrm{m}$",
     "$3.00 \\cdot 10^{8}\\ \\mathrm{m}$",
     "$3.26\\ \\mathrm{m}$",
     "$1.50 \\cdot 10^{11}\\ \\mathrm{m}$"
    ],
    "correct": 3,
    "why": [
     "That is a light year, not an astronomical unit. A light year is about 63 000 times longer than an AU.",
     "That is the speed of light in m/s, not a distance.",
     "That is the number of light years in a parsec, a pure conversion factor, not a distance in metres.",
     "An astronomical unit is the Earth's mean distance from the Sun, $1.50 \\cdot 10^{11}\\ \\mathrm{m}$ (about 150 million km)."
    ]
   },
   {
    "question": "Which relationship is used to calculate the distance $r$ to a star (in parsecs) from the parallax angle $p$ (in arcseconds)?",
    "choices": [
     "$r = \\dfrac{1}{p}$",
     "$r = p$",
     "$r = 2p$",
     "$r = p^{2}$"
    ],
    "correct": 0,
    "why": [
     "If $r$ is in parsecs and $p$ in arcseconds, all the conversion factors disappear, and what is left is exactly $r = 1/p$.",
     "The relationship is not a simple equality: a smaller $p$ should give a larger distance, not the same number.",
     "The base of the triangle is 1 AU (not 2 AU) when $r$ is in parsecs and $p$ in arcseconds, so the factor 2 does not belong in the formula.",
     "The formula is based on the angle being small, not on the distance varying with the square of the parallax."
    ]
   },
   {
    "question": "The parallax of a star is measured as 0.50 arcseconds. How far away is the star, in parsecs?",
    "choices": [
     "0.50 pc",
     "5.0 pc",
     "2.0 pc",
     "20 pc"
    ],
    "correct": 2,
    "why": [
     "That is the parallax angle itself, not the distance. The distance is found from $r = 1/p$, not by just reading off $p$.",
     "That would be right if the parallax were 0.20 arcseconds instead, but here $p = 0.50$.",
     "$r = 1/p = 1/0.50 = 2.0\\ \\mathrm{pc}$.",
     "Calculating the wrong way (for example dividing 1 by 0.050 instead of 0.50) gives a number that is far too large. The right way is $r = 1/0.50 = 2.0\\ \\mathrm{pc}$."
    ]
   },
   {
    "question": "One arcsecond is what fraction of a degree?",
    "choices": [
     "$\\dfrac{1}{60}$ degree",
     "$\\dfrac{1}{3\\,600}$ degree",
     "$\\dfrac{1}{100}$ degree",
     "60 degrees"
    ],
    "correct": 1,
    "why": [
     "That is an arcminute, which is $1/60$ degree. An arcsecond is smaller than that.",
     "A degree is divided into 60 arcminutes and each arcminute into 60 arcseconds, so there are $3\\,600$ arcseconds per degree. One arcsecond is therefore $1/3\\,600$ degree.",
     "Degrees are not divided into hundredths in this way. The division is into sixtieths (minutes and seconds), not hundredths.",
     "60 degrees is sixty times larger than a whole degree, far from an arcsecond, which is a fraction of a degree."
    ]
   },
   {
    "question": "Why does the parallax method only work for relatively nearby stars when it is measured from the Earth's surface?",
    "choices": [
     "The stars move too fast to be photographed in time",
     "The light from distant stars does not arrive within half a year",
     "The parallax angle becomes larger for distant stars, which makes them harder to measure",
     "The Earth's atmosphere disturbs the measurements so that small angles cannot be measured reliably"
    ],
    "correct": 3,
    "why": [
     "The stars' proper motion is not the reason. The problem is measuring the small parallax angle accurately.",
     "The travel time of the light does not affect the parallax measurement. It is about angular resolution, not about whether the light arrives.",
     "On the contrary, the parallax angle becomes smaller the further away the star is, and it is exactly the very small angles that are hard to measure.",
     "The atmosphere blurs the image so that the very smallest angles cannot be measured reliably; that is why ground-based parallax only reaches about 100 parsecs (roughly 300 light years), while satellites such as Gaia reach much further."
    ]
   }
  ]
 },
 "fy2-5.3": {
  "kalla": "2649cb00d9",
  "data": [
   {
    "question": "Why do we see the phases of the Moon?",
    "choices": [
     "The Moon has its own light, which varies in strength from night to night",
     "The Earth's shadow falls on the Moon to a different extent each night",
     "The Moon rotates about its own axis at different speeds from month to month",
     "We see different parts of the Moon's always sunlit half, depending on where the Moon is in its orbit"
    ],
    "correct": 3,
    "why": [
     "The Moon has no light of its own. Everything we see is reflected sunlight.",
     "That describes a lunar eclipse, an unusual special case, not the ordinary change of phases that happens every month.",
     "The Moon's rotation is instead locked to its orbit around the Earth (the same side always faces us) and does not cause the change of phases.",
     "The half of the Moon facing the Sun is always lit. How much of that lit half we see depends on where in its orbit the Moon is."
    ]
   },
   {
    "question": "What characterises a full moon?",
    "choices": [
     "The whole side facing the Earth is lit",
     "The Moon cannot be seen at all",
     "Only the left half is lit",
     "A thin crescent can be seen on the right"
    ],
    "correct": 0,
    "why": [
     "At full moon the whole side of the Moon that faces the Earth is lit by the Sun.",
     "That describes a new moon, the opposite of a full moon.",
     "That describes the third quarter, one of the intermediate phases.",
     "That describes a waxing crescent, at the beginning of the growing phase."
    ]
   },
   {
    "question": "Which statement about the Moon's orbital period is true?",
    "choices": [
     "The sidereal month (relative to the fixed stars) is 29.5 days; the synodic month (new moon to new moon) is 27.3 days",
     "Both are exactly 27.3 days",
     "The sidereal month is 27.3 days and the synodic month 29.5 days, because the Earth has moved on around the Sun",
     "The synodic month is always exactly twice as long as the sidereal month"
    ],
    "correct": 2,
    "why": [
     "The numbers are swapped. The sidereal month (relative to the fixed stars) is the shorter of the two, 27.3 days.",
     "They are not equally long. The synodic month (29.5 days) is longer because the Earth has moved on around the Sun in the meantime.",
     "Since the Earth has moved along its orbit during the Moon's lap, the Moon has to go a little more than one full lap to end up in the same position relative to the Sun. That is why the synodic month (29.5 days) is longer than the sidereal month (27.3 days).",
     "29.5 days is not twice 27.3 days. The difference is due to the Earth's motion around the Sun, not a simple factor of 2."
    ]
   },
   {
    "question": "If there is a new moon today, in roughly how many days will the next new moon be?",
    "choices": [
     "About 7 days",
     "About 30 days",
     "About 1 day",
     "About 365 days"
    ],
    "correct": 1,
    "why": [
     "Seven days is about a quarter of the cycle, for example the time between new moon and first quarter, not a whole cycle.",
     "The synodic month (new moon to new moon) is about 29.5 days, that is roughly 30 days.",
     "That is far too short. A whole lunar cycle takes almost a month, not a day.",
     "A whole year is far too long. The Moon goes through about twelve cycles of phases in a year."
    ]
   },
   {
    "question": "What is needed for a solar eclipse to be able to happen?",
    "choices": [
     "A full moon, with the Earth lying midway between the Sun and the Moon",
     "That the Moon's orbit and the Earth's orbit around the Sun lie in exactly the same plane",
     "A new moon, with the Moon between the Earth and the Sun, almost exactly on the Sun–Earth line",
     "That the Moon is in its third quarter at that moment"
    ],
    "correct": 2,
    "why": [
     "That describes the condition for a lunar eclipse, not a solar eclipse.",
     "On the contrary, the Moon's orbit is tilted by about 5° to the Earth's orbit around the Sun; if the orbits lay in exactly the same plane, eclipses would instead happen every month.",
     "In a solar eclipse the Moon lies between the Earth and the Sun (new moon) and casts its shadow on the Earth, which only happens when all three lie almost exactly in a straight line.",
     "The third quarter is a completely different phase (a half moon on its way towards new moon) and gives no eclipse."
    ]
   },
   {
    "question": "You are in the Moon's **penumbra** during a solar eclipse. What do you see?",
    "choices": [
     "Part of the Sun's disc is hidden: a partial eclipse",
     "The Sun's disc is completely covered and the corona can be seen",
     "A shining ring around a black lunar disc",
     "Nothing at all; the sky looks completely normal"
    ],
    "correct": 0,
    "why": [
     "In the penumbra, light from part of the Sun's disc gets through, so the Moon only hides part of the Sun. The eclipse is partial.",
     "A total eclipse can only be seen in the umbra, the narrow band where no direct sunlight at all gets through.",
     "A ring is seen in an annular eclipse, when the tip of the umbra does not reach all the way to the Earth's surface, not in the penumbra.",
     "Something certainly happens: part of the Sun's disc is hidden. The change in light is, however, often so small that you do not notice it without looking through eclipse glasses."
    ]
   },
   {
    "question": "Why does the Moon glow copper-red during a **total lunar eclipse**?",
    "choices": [
     "The Moon's surface glows from the heat of the Earth's shadow",
     "Red sunlight is refracted in the Earth's atmosphere and bent into the umbra, while blue light is scattered away",
     "The Moon reflects the light from the Earth's fires and cities",
     "The Earth's magnetic field deflects the blue light from the Sun"
    ],
    "correct": 1,
    "why": [
     "On the contrary, the lunar surface quickly becomes colder in the shadow, and it is far too cold to glow from its own heat.",
     "Sunlight grazing the edge of the Earth is refracted in the atmosphere and bent into the umbra. On the way, the short-wavelength (blue) light is scattered away by Rayleigh scattering, so the light that reaches the Moon is red: in practice, the light from all the Earth's sunrises and sunsets at the same time.",
     "City lights and fires are vanishingly faint compared with sunlight and are nowhere near enough to light up the Moon.",
     "Magnetic fields only affect charged particles, not light. The colour is due to refraction and scattering in the atmosphere."
    ]
   },
   {
    "question": "In the northern hemisphere the Moon looks like a D (lit on the right side). What does that mean?",
    "choices": [
     "The Moon is waxing towards full moon",
     "It is full moon",
     "The Moon is waning towards new moon",
     "It is new moon"
    ],
    "correct": 0,
    "why": [
     "A D-shaped light on the right side is exactly the rule of thumb for a waxing Moon on its way to full moon.",
     "At full moon the whole visible side is lit, not just the right side as in a D shape.",
     "On the contrary, a D means that the Moon is waxing. A C-shaped light (left side) is instead the sign of a waning Moon.",
     "At new moon no lit part can be seen at all, while the D shape shows part of the Moon already lit."
    ]
   }
  ]
 },
 "fy2-5.4": {
  "kalla": "9ee8eb79fe",
  "data": [
   {
    "question": "What causes the sky to be blue and the sunset to be red?",
    "choices": [
     "Refraction of light in water droplets in the air, in the same way as in a rainbow",
     "That the surface temperature of the Sun itself actually changes between day and night",
     "Rayleigh scattering of sunlight in the atmosphere, which scatters short-wavelength (blue) light much more than long-wavelength (red) light",
     "Absorption of red light by the ozone layer high up in the atmosphere"
    ],
    "correct": 2,
    "why": [
     "Refraction in water droplets creates rainbows, a different phenomenon from the constant colour of the sky.",
     "The surface temperature of the Sun, and therefore its spectrum, does not change during the day. What changes instead is the path of the light through the atmosphere.",
     "Rayleigh scattering makes short wavelengths (blue) scatter in all directions so that the sky turns blue, while only the red light gets through unscattered at sunset.",
     "The ozone layer mainly absorbs ultraviolet radiation, not what gives the sky its blue colour."
    ]
   },
   {
    "question": "According to which relationship does the probability $\\sigma$ of Rayleigh scattering depend on the wavelength $\\lambda$?",
    "choices": [
     "$\\sigma \\propto \\lambda$",
     "$\\sigma \\propto \\lambda^{2}$",
     "$\\sigma \\propto \\dfrac{1}{\\lambda}$",
     "$\\sigma \\propto \\dfrac{1}{\\lambda^{4}}$"
    ],
    "correct": 3,
    "why": [
     "A directly proportional relationship would mean that long wavelengths (red) are scattered the most. In fact it is the other way round.",
     "A square dependence is too weak. The actual scattering falls off much more steeply as the wavelength increases.",
     "The dependence is steeper than that: it is the fourth power of the wavelength in the denominator, not just the first power.",
     "The scattering is roughly proportional to $1/\\lambda^{4}$, which means that short wavelengths (blue, violet) are scattered much more than long ones (red)."
    ]
   },
   {
    "question": "According to the lesson, roughly how much more is violet light (400 nm) scattered than red light (700 nm)?",
    "choices": [
     "About 2 times more",
     "About 10 times more",
     "About 100 times more",
     "Equally much"
    ],
    "correct": 1,
    "why": [
     "The difference is larger than a factor of 2. The fourth-power dependence makes the effect much stronger.",
     "$(700/400)^{4} \\approx 9.4$, that is roughly a tenfold difference.",
     "A hundred times is an overestimate. The calculation gives roughly a tenfold difference, not a hundredfold one.",
     "The wavelengths differ a lot (400 nm against 700 nm), and since the scattering depends on $1/\\lambda^{4}$ the difference is anything but equal."
    ]
   },
   {
    "question": "Why does the sky look blue and not violet, even though violet light is scattered even more?",
    "choices": [
     "The Sun emits less violet light to begin with, and the eye is more sensitive to blue",
     "Violet light never gets down through the atmosphere",
     "Violet light has a longer wavelength than blue and is therefore scattered less",
     "The atmosphere contains no molecules that scatter violet light"
    ],
    "correct": 0,
    "why": [
     "The Sun's spectrum contains less violet light from the start, and the eye perceives it more weakly, so the net result is a blue rather than a violet sky.",
     "Violet light does actually get down. The only problem is that there is less of it and that the eye perceives it more weakly.",
     "On the contrary, violet has a shorter wavelength than blue, which according to $1/\\lambda^{4}$ means that it is scattered even more, not less.",
     "The same gas molecules that scatter blue light also scatter violet. The issue lies in the Sun's spectrum and the eye's sensitivity, not in the composition of the atmosphere."
    ]
   },
   {
    "question": "Why does the Sun turn red near the horizon but look white high in the sky?",
    "choices": [
     "The Sun is actually much cooler in the morning and evening than in the middle of the day",
     "Near the horizon thick clouds block everything except the red light",
     "The Earth's rotation about its own axis changes the Sun's spectrum near the horizon",
     "Near the horizon the sunlight passes along a much longer path through the atmosphere, so more blue and green light is scattered away"
    ],
    "correct": 3,
    "why": [
     "The surface temperature of the Sun (about 5 800 K) does not change during the day. It is the length of the path through the atmosphere that changes.",
     "Clouds are not needed for the phenomenon. Even a clear sky gives a red sunset, since it is the long path through the air that does the trick.",
     "The Earth's rotation only moves the Sun's position in the sky. It does not change the spectrum the Sun emits.",
     "At the horizon the path through the air is many times longer than at the zenith, so almost all the blue and much of the green light is scattered away before the light reaches us, and what is left is the red."
    ]
   },
   {
    "question": "Roughly how many more air masses does sunlight pass through at the horizon compared with straight overhead (the zenith)?",
    "choices": [
     "About 2 times as much",
     "About 10 times as much",
     "About 38 times as much",
     "No difference at all"
    ],
    "correct": 2,
    "why": [
     "The difference is much larger than a factor of 2. At the horizon the path through the atmosphere is many times longer.",
     "Ten times is too low. The path can be up to about 38 air masses at the horizon.",
     "At the zenith the air mass is 1, but near the horizon the sunlight may have to pass through up to about 38 air masses.",
     "There is a big difference: at the zenith the air mass is 1 and at the horizon up to about 38, which is crucial for the change in colour."
    ]
   }
  ]
 },
 "fy2-5.5": {
  "kalla": "f62629960b",
  "data": [
   {
    "question": "Why is a black hole called \"black\"?",
    "choices": [
     "It is full of invisible dark matter that absorbs all light",
     "It sucks in all the light in the universe",
     "It has no mass at all and is therefore invisible to telescopes",
     "Gravity is so strong that not even light can get out from inside a certain boundary"
    ],
    "correct": 3,
    "why": [
     "Dark matter is a different phenomenon and has no direct connection with why a black hole looks black.",
     "A black hole only affects its immediate surroundings through gravity. It does not suck in all the light in the whole universe.",
     "On the contrary, a black hole has an enormous amount of mass, packed into an extremely small volume.",
     "Nothing, not even light, can get out from inside the event horizon, and so no radiation reaches us from there. That is why it looks black."
    ]
   },
   {
    "question": "Which formula describes the escape velocity $v_\\mathrm{f}$ from a celestial body with mass $M$ at the distance $r$ from its centre?",
    "choices": [
     "$v_\\mathrm{f} = \\dfrac{2GM}{r}$",
     "$v_\\mathrm{f} = \\sqrt{\\dfrac{2GM}{r}}$",
     "$v_\\mathrm{f} = \\dfrac{GM}{r^{2}}$",
     "$v_\\mathrm{f} = \\sqrt{GMr}$"
    ],
    "correct": 1,
    "why": [
     "The square root is missing. Without the root the unit is not even a speed (m/s).",
     "If you set the kinetic energy equal to the work done by gravity on the way out, you get exactly $v_\\mathrm{f} = \\sqrt{2GM/r}$.",
     "That is instead the form of the gravitational field strength (m/s²), a completely different quantity from escape velocity.",
     "The radius should be in the denominator under the root, not a factor in the numerator. Otherwise the escape velocity would wrongly increase with greater distance."
    ]
   },
   {
    "question": "What happens to the escape velocity if the same mass is squeezed into a smaller radius?",
    "choices": [
     "It increases",
     "It decreases",
     "It is unchanged",
     "It becomes zero"
    ],
    "correct": 0,
    "why": [
     "Since $v_\\mathrm{f} = \\sqrt{2GM/r}$, the escape velocity increases when $r$ decreases: a smaller radius gives stronger gravity near the surface.",
     "On the contrary, according to the formula the escape velocity decreases if $r$ increases, not if $r$ decreases.",
     "The formula clearly shows that the escape velocity depends on $r$, so it cannot be unchanged when $r$ changes.",
     "The escape velocity increases towards infinity as $r$ approaches zero (for a fixed $M$), instead of becoming zero."
    ]
   },
   {
    "question": "If the mass $M$ of a black hole is doubled, what happens to the Schwarzschild radius $r_\\mathrm{s}$?",
    "choices": [
     "It is halved",
     "It is unchanged",
     "It doubles",
     "It quadruples"
    ],
    "correct": 2,
    "why": [
     "That would be the case if the relationship were inversely proportional to $M$, but $r_\\mathrm{s}$ increases with $M$; it does not decrease.",
     "$r_\\mathrm{s}$ depends directly on $M$ according to the formula $r_\\mathrm{s} = \\dfrac{2GM}{c^{2}}$, so doubling the mass does affect the radius.",
     "Since $r_\\mathrm{s} = \\dfrac{2GM}{c^{2}}$ is directly proportional to the mass $M$, $r_\\mathrm{s}$ doubles when $M$ doubles.",
     "Quadrupling would apply if $r_\\mathrm{s}$ depended on $M^{2}$, but the relationship is linear in $M$."
    ]
   },
   {
    "question": "What decides whether the core of a dying star becomes a white dwarf, a neutron star or a black hole?",
    "choices": [
     "What colour the star had already when it was born",
     "How many billion years the star has already been shining",
     "The star's distance from the centre of the Milky Way",
     "How much mass is left in the collapsing remnant"
    ],
    "correct": 3,
    "why": [
     "The colour only reflects the surface temperature, not which final stage the stellar remnant ends up in.",
     "The lifetime is certainly linked to the mass of the star, but it is the mass of the remnant left after the collapse that directly decides the final stage.",
     "Where in the galaxy the star is does not affect its fate. It is the mass that decides.",
     "Lighter stellar remnants become white dwarfs; heavier ones result in a supernova that leaves behind either a neutron star or, if the remnant is heavy enough, a black hole."
    ]
   },
   {
    "question": "How was the existence of black holes confirmed directly for the first time?",
    "choices": [
     "By photographing one directly with an ordinary optical telescope",
     "By detecting gravitational waves from two merging black holes (LIGO, 2015)",
     "By measuring the Schwarzschild radius directly on site with a tape measure",
     "By radio signals that black holes are claimed to send out on their own"
    ],
    "correct": 1,
    "why": [
     "A black hole cannot be seen in ordinary light. The first image (2019) showed instead the glowing gas around the hole, not the hole itself, and came after the LIGO discovery.",
     "In 2015 LIGO detected, for the first time, ripples in spacetime from two merging black holes, which directly confirmed that they exist.",
     "The Schwarzschild radius is far too small and inaccessible to be measured with a tape measure. It is calculated from the mass instead.",
     "A black hole does not itself emit any radiation. It is instead the surrounding hot gas (the accretion disc) that can reveal its presence."
    ]
   }
  ]
 },
 "fy2-5.6": {
  "kalla": "422cd79834",
  "data": [
   {
    "question": "What is needed for a still cloud of hydrogen gas to start collapsing and form a star?",
    "choices": [
     "That the cloud gradually becomes warmer by itself",
     "That the cloud's own internal gas pressure increases too much",
     "That the cloud starts rotating much faster than before",
     "That some disturbance (for example a shock wave from a supernova) makes part of the cloud dense enough for gravity to take over"
    ],
    "correct": 3,
    "why": [
     "A higher temperature would increase the gas pressure and make collapse harder, not easier. Collapse is instead favoured by the cloud being cold.",
     "A higher internal pressure works against collapse rather than favouring it. Gravity has to win over the pressure instead.",
     "Rotation tends to prevent collapse straight in towards the centre (matter gathers in a disc). That is not what starts the collapse.",
     "As long as the cloud is undisturbed there is a balance between pressure and gravity; a disturbance that makes part of the cloud dense enough lets gravity take over, and the collapse begins."
    ]
   },
   {
    "question": "Why does a collapsing gas cloud get warmer?",
    "choices": [
     "Potential energy is converted into kinetic energy as the gas falls inwards, just as in a bicycle pump",
     "Chemical reactions between the different gas molecules release heat",
     "The Sun's radiation heats the cloud from outside over a long time",
     "The cloud captures and stores heat from surrounding stars"
    ],
    "correct": 0,
    "why": [
     "When the gas falls inwards its potential energy is converted into kinetic energy and heat: the same principle as when the air in a bicycle pump is heated by compression.",
     "It is not a chemical reaction. The heating is purely a result of the work done by gravity on the gas.",
     "The cloud is often far from any stars at all. The heat comes from inside, from the work done by gravity itself, not from outside.",
     "It is not about captured external heat. The conversion of potential energy into kinetic energy (and so into heat) happens inside the collapsing cloud itself."
    ]
   },
   {
    "question": "At roughly what temperature in the core does hydrogen fusion start in a protostar?",
    "choices": [
     "1 million K",
     "10 million K",
     "10 000 K",
     "10 billion K"
    ],
    "correct": 1,
    "why": [
     "One million kelvin is not enough. Fusion needs the even higher temperature of about 10 million kelvin.",
     "When the temperature in the core reaches about 10 million kelvin, the hydrogen nuclei start fusing into helium.",
     "10 000 K is far too low. Even the surface of an ordinary star is close to that temperature, and the core has to get much hotter to ignite fusion.",
     "10 billion kelvin is a large overestimate. Fusion in the cores of ordinary stars starts already at about 10 million kelvin."
    ]
   },
   {
    "question": "What does the reaction $4\\ {}^{1}_{1}\\mathrm{H} \\longrightarrow {}^{4}_{2}\\mathrm{He} + \\text{energy}$ describe?",
    "choices": [
     "Splitting of a heavy atomic nucleus inside a nuclear reactor on Earth",
     "Decay of a radioactive helium nucleus back into hydrogen",
     "Four hydrogen nuclei join together into a helium nucleus, and the mass difference is released as energy",
     "A collision between two whole protostars in space"
    ],
    "correct": 2,
    "why": [
     "That describes splitting (fission), the opposite of the fusion that happens in the core of a star.",
     "The arrow points the wrong way for that statement: it is hydrogen that joins together into helium, not helium that decays into hydrogen.",
     "Four protons (hydrogen) join together into a helium nucleus that weighs slightly less than the four protons together, and the mass difference is released as energy according to $E = mc^{2}$.",
     "The reaction happens inside the core of a single star, between atomic nuclei, not as a collision between whole stars."
    ]
   },
   {
    "question": "What is meant by a star being in \"hydrostatic equilibrium\"?",
    "choices": [
     "That the star is standing completely still somewhere in space",
     "That the star always contains exactly as much hydrogen as helium",
     "That the star's temperature is always constant and equal to 10 million kelvin",
     "That the outward pressure (gas pressure and radiation pressure, kept up by fusion) exactly balances the inward pull of gravity"
    ],
    "correct": 3,
    "why": [
     "The equilibrium is about forces inside the star, not about the star being stationary in space. Stars move around the centre of the galaxy like all other celestial bodies.",
     "The proportions of hydrogen and helium change gradually during the star's life. The equilibrium is instead about a balance of forces, not about the proportions of the elements.",
     "A temperature of about 10 million kelvin applies roughly in the core when fusion starts, but the equilibrium refers to the balance between pressure and gravity, not to a particular temperature.",
     "As long as the outward gas pressure and radiation pressure, kept up by the heat from fusion, exactly balance the inward pull of gravity, the star stops shrinking. It is this hydrostatic equilibrium that keeps the Sun stable for about 10 billion years."
    ]
   },
   {
    "question": "Why does a heavy star (over 10 solar masses) live a shorter time than a star like the Sun, even though it has more fuel?",
    "choices": [
     "It actually has less fuel available than the Sun",
     "Heavy stars actually live longer, not shorter",
     "It uses up its fuel so much faster that it still runs out sooner",
     "It cools down faster and stops fusing"
    ],
    "correct": 2,
    "why": [
     "On the contrary, a heavier star has more fuel than the Sun, but it still does not last long.",
     "According to the lesson, heavy stars only live a few million years, while a star like the Sun lives about 10 billion years: much shorter, not longer.",
     "A heavy star burns its hydrogen enormously much faster than a lighter star, and despite the larger supply of fuel it still runs out first.",
     "It is not cooling that ends a heavy star's life early. It simply burns its fuel at a furious rate."
    ]
   }
  ]
 }
});
