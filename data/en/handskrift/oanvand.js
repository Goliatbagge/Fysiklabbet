/* Pennlösningar, engelska: oanvand (scener som ingen genomgång använder just nu).
   Nyckel = svensk sträng exakt som scenen skriver den. */
I18N.add({
  // hage
  'Mur': 'Wall',
  'basen': 'the base',
  'höjden': 'the height',
  'Svar: ': 'Answer: ',
  'Svar: 450 m^2': 'Answer: 450 m^2',
  // kalkylranta
  'a) Förändringsfaktor': 'a) Change factor',
  'ff=1+0,035=1,035': 'cf=1+0.035=1.035',
  'År 1': 'Year 1',
  'År 2': 'Year 2',
  'År 8': 'Year 8',
  'Svar: 39 504,27 kr': 'Answer: 39 504.27 kr',
  'b) 40 000 kr, 3,5 %': 'b) 40 000 kr, 3.5 %',
  'Svar: 52 672,36 kr': 'Answer: 52 672.36 kr',
  'c) 40 000 kr, 4,5 %': 'c) 40 000 kr, 4.5 %',
  'Svar: 56 884,02 kr': 'Answer: 56 884.02 kr',
  // arligtsparande
  'Insättning 1': 'Deposit 1',
  'Insättning 2': 'Deposit 2',
  'Insättning 3': 'Deposit 3',
  'Insättning 10': 'Deposit 10',
  'Svar: 56 794,24 kr': 'Answer: 56 794.24 kr',
  // stupet
  'a) Sträcka vid konstant acceleration': 'a) Distance at constant acceleration',
  'Svar: 60 m': 'Answer: 60 m',
  'b) Hastighet vid konstant acceleration': 'b) Velocity at constant acceleration',
  'Tiden ur sträckformeln': 'The time from the distance formula',
  ' eller ': ' or ',
  'Tillbaka i hastighetsformeln': 'Back into the velocity formula',
  'Svar: −36 m/s (36 m/s nedåt)': 'Answer: −36 m/s (36 m/s downwards)'
});

/* Tankebubblor (enBubblor i handskrift.js) */
I18N.add({
  // linjegraf
  "Jag gör en värdetabell ¦ och väljer några ¦ *x*-värden kring 0.":
    "I make a table of values ¦ and choose some ¦ *x*-values around 0.",
  "*x*-axeln måste rymma −3 till 3, ¦ *y*-axeln NaN till NaN.":
    "The *x*-axis must fit −3 to 3, ¦ the *y*-axis NaN to NaN.",
  "Raden med *x* = −3 och *y* = NaN ¦ ger punkten (−3, NaN).":
    "The row with *x* = −3 and *y* = NaN ¦ gives the point (−3, NaN).",
  "Punkterna ligger på en rät linje. ¦ Jag drar den med linjalen.":
    "The points lie on a straight line. ¦ I draw it with the ruler.",
  // hage
  "Först ritar jag en figur! ¦ Muren blir hagens ena sida. ¦ Där behövs inget stängsel.":
    "First I draw a figure! ¦ The wall is one side. ¦ No fence is needed there.",
  "Stängslet räcker till tre sidor: ¦ *x* + *x* + (60 − 2*x*) = 60 meter.":
    "The fence covers three sides: ¦ *x* + *x* + (60 − 2*x*) = 60 metres.",
  "Rektangelns area: ¦ basen · höjden":
    "Rectangle area: ¦ base · height",
  "Distributiva lagen: *x* multipliceras ¦ med båda termerna!":
    "Distributive law: *x* is multiplied ¦ by both terms!",
  "Största arean? Derivera ¦ och sätt *A'*(*x*) = 0!":
    "Max area? Differentiate ¦ and set *A'*(*x*) = 0!",
  "Vågskålsmetoden: addera 4*x* ¦ och dela sedan båda leden med 4.":
    "Balance method: add 4*x* ¦ and then divide both sides by 4.",
  "Hur stor är arean då? ¦ In med *x* = 15 i *A*(*x*)!":
    "How big is the area then? ¦ Put *x* = 15 into *A*(*x*)!",
  "Max eller min? Kolla tecknet på ¦ andraderivatan: negativt = max!":
    "Max or min? Check the sign of ¦ the 2nd derivative: minus = max!",
  // kalkylranta
  "Kalkylarket gör en enda sak ¦ per rad: multiplicerar med ¦ förändringsfaktorn. 3,5 % ¦ ökning ger faktorn 1,035.":
    "The spreadsheet does one thing ¦ per row: multiplies by the ¦ change factor. A 3.5 % ¦ rise gives the factor 1.035.",
  "Cellen =B2*$B$12 betyder ¦ just detta: förra årets ¦ belopp gånger faktorn.":
    "The cell =B2*$B$12 means ¦ exactly this: last year's ¦ amount times the factor.",
  "Efter 8 rader har beloppet ¦ multiplicerats med 1,035 ¦ åtta gånger. Det är samma ¦ sak som faktorn upphöjd ¦ till 8.":
    "After 8 rows the amount has ¦ been multiplied by 1.035 ¦ eight times. That is the ¦ same as the factor to ¦ the power 8.",
  "I b) ändras bara ¦ insättningen i cell B2. ¦ Faktorn står kvar.":
    "In b) only the deposit ¦ in cell B2 changes. ¦ The factor stays.",
  "I c) är det i stället räntan ¦ som ändras: 4,5 % ger ¦ faktorn 1,045.":
    "In c) it is the interest rate ¦ that changes instead: 4.5 % ¦ gives the factor 1.045.",
  "Rimligt: högre ränta ger mer ¦ pengar än i b), på precis ¦ samma tid.":
    "Reasonable: a higher rate gives ¦ more money than in b), in ¦ exactly the same time.",
  // arligtsparande
  "Den första insättningen har ¦ inte hunnit växa än.":
    "The first deposit has not ¦ had time to grow yet.",
  "Nu händer TVÅ saker: de ¦ gamla pengarna växer med ¦ 2,8 %, och 5 000 kr till ¦ sätts in.":
    "Now TWO things happen: the ¦ old money grows by ¦ 2.8 %, and 5 000 kr more ¦ is paid in.",
  "Samma rad igen, men nu på ¦ de 10 140 kr som redan ¦ finns på kontot.":
    "Same row again, but now on ¦ the 10 140 kr already ¦ in the account.",
  "Exakt samma rad upprepas ner ¦ till insättning 10. Det är ¦ det fyllnadshandtaget gör ¦ åt oss i kalkylarket.":
    "Exactly the same row repeats ¦ down to deposit 10. That is ¦ what the fill handle does ¦ for us in the spreadsheet.",
  // stupet
  "Ritar stupet, kompisarna som ¦ släpper stenen och stenens väg ¦ rakt ner till botten.":
    "I draw the cliff, the friends ¦ dropping the stone and its path ¦ straight down to the bottom.",
  "Stenen SLÄPPS, så ¦ starthastigheten är noll. Jag ¦ väljer uppåt som positiv ¦ riktning och söker sträckan *s*.":
    "The stone is DROPPED, so the ¦ initial velocity is zero. I ¦ take upwards as positive ¦ and look for the distance *s*.",
  "Accelerationen är konstant ¦ under hela fallet, så jag ¦ använder sträckformeln.":
    "The acceleration is constant ¦ during the whole fall, so I ¦ use the distance formula.",
  "Uppåt är positivt, så ¦ tyngdaccelerationen NEDÅT får ¦ minustecken.":
    "Upwards is positive, so ¦ the acceleration DOWNWARDS gets ¦ a minus sign.",
  "Nu sätter jag in värdena ur ¦ klammern i formeln.":
    "Now I put the values from ¦ the bracket into the formula.",
  "Minustecknet betyder att stenen ¦ hamnade NEDANFÖR kanten. Först ¦ nu avrundar jag: tiden 3,5 s har ¦ två värdesiffror.":
    "The minus sign means the stone ¦ ended up BELOW the edge. Only ¦ now do I round: the time 3.5 s has ¦ two significant figures.",
  "60 meter är som ett hus på ¦ tjugo våningar. Ett stup i ¦ fjällen, rimligt!":
    "60 metres is like a house of ¦ twenty storeys. A mountain ¦ cliff, reasonable!",
  "Frågan gäller hastigheten vid ¦ nedslaget, så jag börjar med ¦ hastighetsformeln.":
    "The question is about the speed ¦ on impact, so I start with ¦ the velocity formula.",
  "Starthastigheten 12 m/s och ¦ accelerationen vet jag, men ¦ tiden i luften saknas. Den får ¦ jag ur sträckformeln.":
    "I know the start speed 12 m/s ¦ and the acceleration, but not ¦ the time in the air. I get it ¦ from the distance formula.",
  "Sträckan tar jag oavrundad ur ¦ a), med minustecken: botten ¦ ligger under kanten. Kastet ¦ uppåt ger positiv starthastighet.":
    "I take the distance unrounded ¦ from a), with a minus sign: the ¦ bottom is below the edge. Throwing ¦ up gives a positive start speed.",
  "Jag räknar ut −9,82 delat med 2 ¦ så att ekvationen blir enklare ¦ att skriva in.":
    "I work out −9.82 divided by 2 ¦ so the equation is easier ¦ to type in.",
  "En andragradsekvation med *t* ¦ som obekant! Den löser jag med ¦ ett digitalt hjälpmedel, i ¦ CAS-läget.":
    "A quadratic equation with *t* ¦ as the unknown! I solve it with ¦ a digital tool, in ¦ CAS mode.",
  "Den negativa tiden ligger FÖRE ¦ kastet. Den lösningen ¦ förkastas.":
    "The negative time lies BEFORE ¦ the throw. That solution ¦ is rejected.",
  "Nu har jag tiden. Tillbaka till ¦ hastighetsformeln, som jag ¦ började med.":
    "Now I have the time. Back to ¦ the velocity formula, which I ¦ started with.",
  "Tiden tar jag oavrundad från ¦ raden ovan, de andra värdena ¦ är samma som förut.":
    "I take the time unrounded from ¦ the row above; the other values ¦ are the same as before.",
  "Först nu avrundar jag. Både ¦ 12 m/s och 3,5 s har två ¦ värdesiffror, så svaret får två.":
    "Only now do I round. Both ¦ 12 m/s and 3.5 s have two ¦ sig. figs, so the answer has two.",
  "Stenen i a) landade med 9,82·3,5, ¦ ungefär 34 m/s. Den här får ¦ dessutom fart av kastet, så lite ¦ mer är rimligt. Minus: nedåt.":
    "The stone in a) landed at 9.82·3.5, ¦ about 34 m/s. This one also gets ¦ speed from the throw, so a bit ¦ more is reasonable. Minus: down.",
});
