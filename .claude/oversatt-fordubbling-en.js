// Bygger den engelska versionen utkast/doubling.html ur den svenska
// utkast/fordubbling.html. Kör: node .claude/oversatt-fordubbling-en.js
//
// SAMS KRAV: den svenska och den engelska versionen ska alltid vara synkade.
// Ändra bara i fordubbling.html och kör sedan skriptet. Redigera aldrig
// doubling.html för hand. Varje par nedan måste hittas i den svenska filen,
// annars avbryter skriptet (då har den svenska texten ändrats och paret ska
// uppdateras). Efter översättningen letar skriptet efter kvarvarande svensk
// text utanför kommentarer och avbryter om det hittar någon.
//
// Engelska talkonventioner: decimalpunkt och tusentalskomma (10,000 kr; 1.06).

const fs = require('fs');
const path = require('path');
const KALLA = path.join(__dirname, '..', 'utkast', 'fordubbling.html');
const MAL = path.join(__dirname, '..', 'utkast', 'doubling.html');
const R = String.raw;
const N = ' ';

// [svenska, engelska]. Ordningen spelar roll: längre och mer specifika först.
const PAR = [
  // ---------- head ----------
  [R`<html lang="sv">`, R`<html lang="en">`],
  [R`<title>Hur lång tid tar det att fördubbla pengarna? Undersökning — Fysiklabbet</title>`, R`<title>How long does it take to double your money? — Fysiklabbet</title>`],
  [R`<meta name="description" content="Undersök ränta på ränta steg för steg: gissa först, laborera med belopp och räntesats, svara direkt på sidan och hitta en egen regel för fördubblingstiden. Matematik nivå 1c, kapitel 3.">`,
   R`<meta name="description" content="Explore compound interest step by step: guess first, experiment with deposit and interest rate, answer directly on the page and find your own rule for the doubling time. Upper secondary mathematics.">`],
  [R`<link rel="canonical" href="https://fysiklabbet.se/utkast/fordubbling.html">`, R`<link rel="canonical" href="https://fysiklabbet.se/utkast/doubling.html">`],
  [R`<!--
  fordubbling.html:`, R`<!--
  doubling.html: ENGELSK VERSION, GENERERAD. Redigera inte den här filen.
  Ändra i fordubbling.html och kör node .claude/oversatt-fordubbling-en.js.

  fordubbling.html:`],

  // ---------- decimalpunkt ----------
  // Sifferrutor (type="number") visar webbläsarens decimaltecken, alltså
  // komma i en svensk webbläsare. De två rutorna med decimaler blir textrutor
  // på engelska, så att talen alltid skrivs med punkt (lasTal läser båda).
  [R`.reglage input[type=number] {`, R`.reglage input[type=number], .reglage input[inputmode=decimal] {`],
  [R`<input id="b-r" type="number" min="0.1" max="100" step="0.1">`, R`<input id="b-r" type="text" inputmode="decimal" autocomplete="off">`],
  [R`<input id="b-m" type="number" min="1.1" max="1000" step="0.1">`, R`<input id="b-m" type="text" inputmode="decimal" autocomplete="off">`],

  // ---------- toppen ----------
  [R`title="Till genomgången 3.4 på Fysiklabbet"`, R`title="Fysiklabbet"`],
  [R`aria-label="Delar"`, R`aria-label="Parts"`],
  [R`href="doubling.html" hreflang="en" lang="en" title="English version" aria-label="English version">`, R`href="fordubbling.html" hreflang="sv" lang="sv" title="Svensk version" aria-label="Svensk version">`],
  [R`<span class="txt">English</span></a>`, R`<span class="txt">Svenska</span></a>`],
  [R`aria-label="Helskärm"`, R`aria-label="Full screen"`],
  [R`<span class="txt">Helskärm</span>`, R`<span class="txt">Full screen</span>`],

  // ---------- start ----------
  [R`<p class="delmarke">Matematik nivå 1c <span>· 3.4 Sparande och ränteberäkningar · Undersökning</span></p>`, R`<p class="delmarke">Mathematics <span>· Savings and compound interest · Investigation</span></p>`],
  [R`<h1>Hur lång tid tar det att <em>fördubbla</em> pengarna?</h1>`, R`<h1>How long does it take to <em>double</em> your money?</h1>`],
  [R`<p class="prompt">Ni sätter in pengar på ett sparkonto, och de växer med ränta på ränta. Ta reda på hur lång tid det tar innan beloppet har fördubblats, och om det finns en regel som gör att ni kan räkna ut det i huvudet.</p>`,
   R`<p class="prompt">You put money in a savings account, and it grows with compound interest. Find out how long it takes before the amount has doubled, and whether there is a rule that lets you work it out in your head.</p>`],
  [R`>Vilka arbetar tillsammans?</label>`, R`>Who is working together?</label>`],
  [R`placeholder="Era namn"`, R`placeholder="Your names"`],
  [R`data-gaTill="gissa">Börja</button>`, R`data-gaTill="gissa">Start</button>`],
  [R`<span>Arbeta i par</span><span>Cirka 60 minuter</span><span>Svaren sparas i webbläsaren</span>`, R`<span>Work in pairs</span><span>About 60 minutes</span><span>Answers are saved in the browser</span>`],

  // ---------- gissa ----------
  [R`data-del="Gissa"`, R`data-del="Guess"`],
  [R`<p class="delmarke">Del 1 <span>· Gissa först · 5 min</span></p>`, R`<p class="delmarke">Part 1 <span>· Guess first · 5 min</span></p>`],
  [R`<h2>Vad tror ni?</h2>`, R`<h2>What do you think?</h2>`],
  [R`<p class="prompt">Svara utan hjälpmedel. Det finns inga fel gissningar. När ni går vidare låses gissningarna, och Räntelabbet öppnas.</p>`,
   R`<p class="prompt">Answer without any tools. There are no wrong guesses. When you move on, your guesses are locked and the Interest Lab opens.</p>`],
  [R`<span>Ni sätter in 10&nbsp;000&nbsp;kr med 6&nbsp;% ränta per år. Hur många år tar det innan ni har 20&nbsp;000&nbsp;kr?</span>`,
   R`<span>You deposit 10,000&nbsp;kr at 6&nbsp;% interest per year. How many years does it take before you have 20,000&nbsp;kr?</span>`],
  [R`aria-label="Gissning i år"><span>år</span>`, R`aria-label="Guess in years"><span>years</span>`],
  [R`placeholder="Hur tänkte ni?" aria-label="Hur tänkte ni?"`, R`placeholder="How did you think?" aria-label="How did you think?"`],
  [R`<span>Om ni i stället sätter in 50&nbsp;000&nbsp;kr med samma ränta, hur lång tid tar det då att fördubbla?</span>`,
   R`<span>If you deposit 50,000&nbsp;kr instead, at the same rate, how long does it take to double?</span>`],
  [R`aria-label="Fråga 2"`, R`aria-label="Question 2"`],
  [R`value="längre tid" data-spara> Längre tid`, R`value="longer" data-spara> Longer`],
  [R`value="kortare tid" data-spara> Kortare tid`, R`value="shorter" data-spara> Shorter`],
  [R`value="lika lång tid" data-spara> Lika lång tid`, R`value="the same time" data-spara> The same time`],
  [R`<span>Om räntan i stället är 12&nbsp;%, hur lång tid tar det jämfört med vid 6&nbsp;%?</span>`, R`<span>If the rate is 12&nbsp;% instead, how long does it take compared with 6&nbsp;%?</span>`],
  [R`aria-label="Fråga 3"`, R`aria-label="Question 3"`],
  [R`value="halva tiden" data-spara> Halva tiden`, R`value="half the time" data-spara> Half the time`],
  [R`value="mer än halva tiden" data-spara> Mer än halva tiden`, R`value="more than half the time" data-spara> More than half the time`],
  [R`value="mindre än halva tiden" data-spara> Mindre än halva tiden`, R`value="less than half the time" data-spara> Less than half the time`],

  // ---------- belopp ----------
  [R`data-del="Undersök"`, R`data-del="Explore"`],
  [R`<p class="delmarke">Del 2 <span>· Undersök i Räntelabbet</span></p>`, R`<p class="delmarke">Part 2 <span>· Explore in the Interest Lab</span></p>`],
  [R`<h2>Samma ränta, <em>olika</em> belopp</h2>`, R`<h2>Same rate, <em>different</em> deposits</h2>`],
  [R`<p class="prompt">Ställ in beloppet i Räntelabbet och leta upp det första året då staplarna når den streckade linjen, alltså dubbla insättningen.</p>`,
   R`<p class="prompt">Set the deposit in the Interest Lab and find the first year in which the bars reach the dashed line, that is, double the deposit.</p>`],
  [R`Räntelabbet är förberett: 10&nbsp;000&nbsp;kr och 6&nbsp;%</div>`, R`The Interest Lab is set up: 10,000&nbsp;kr and 6&nbsp;%</div>`],
  [R`<span class="qn">4</span><span>Fyll i tabellen.</span>`, R`<span class="qn">4</span><span>Fill in the table.</span>`],
  [R`<th>Insatt belopp</th><th>Räntesats</th><th>Fördubblat efter</th>`, R`<th>Deposit</th><th>Interest rate</th><th>Doubled after</th>`],
  [R`<td>10&nbsp;000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="10 000 kr, 6 %, år"`, R`<td>10,000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="10,000 kr, 6 %, years"`],
  [R`<td>50&nbsp;000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="50 000 kr, 6 %, år"`, R`<td>50,000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="50,000 kr, 6 %, years"`],
  [R`<td>5&nbsp;000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="5 000 kr, 6 %, år"`, R`<td>5,000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="5,000 kr, 6 %, years"`],
  [R`<td>100&nbsp;000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="100 000 kr, 6 %, år"`, R`<td>100,000&nbsp;kr</td><td>6&nbsp;%</td><td><input type="text" inputmode="numeric" aria-label="100,000 kr, 6 %, years"`],
  [R`>Kontrollera</button>`, R`>Check</button>`],

  // ---------- varför ----------
  [R`<p class="delmarke">Del 2 <span>· Förklara</span></p>`, R`<p class="delmarke">Part 2 <span>· Explain</span></p>`],
  [R`<h2><em>Varför</em> spelar beloppet ingen roll?</h2>`, R`<h2><em>Why</em> doesn't the deposit matter?</h2>`],
  [R`<p class="prompt">Titta på den grönmarkerade rutan i Räntelabbet, <b>Hur många gånger större?</b> Varje år multipliceras beloppet med förändringsfaktorn 1,06. Efter 12 år har det alltså multiplicerats med 1,06 tolv gånger, och rutan visar vad det blir.</p>`,
   R`<p class="prompt">Look at the box marked in green in the Interest Lab, <b>How many times larger?</b> Every year the amount is multiplied by the growth factor 1.06. After 12 years it has been multiplied by 1.06 twelve times, and the box shows what that gives.</p>`],
  [R`<p class="prompt" style="margin-bottom:8px">Ändra nu insatt belopp i Räntelabbet flera gånger. Titta i rutan efter varje ändring:</p>`,
   R`<p class="prompt" style="margin-bottom:8px">Now change the deposit in the Interest Lab several times. Look at the box after each change:</p>`],
  [R`<li>Ändras talet 2,0122, alltså hur många gånger större beloppet har blivit?</li>`, R`<li>Does the number 2.0122 change, that is, how many times larger the amount has become?</li>`],
  [R`<li>Ändras kronorna på raden <b>Beloppet</b> längst ner i rutan?</li>`, R`<li>Do the kronor on the line <b>Amount</b> at the bottom of the box change?</li>`],
  [R`<li>Har beloppet fördubblats efter 12 år, oavsett hur mycket ni satte in?</li>`, R`<li>Has the amount doubled after 12 years, no matter how much you deposited?</li>`],
  [R`Räntelabbet är förberett: 6&nbsp;% och 12 år</div>`, R`The Interest Lab is set up: 6&nbsp;% and 12 years</div>`],
  [R`<span>Vad lägger ni märke till? Förklara med förändringsfaktorn varför det blir så.</span>`, R`<span>What do you notice? Use the growth factor to explain why.</span>`],
  [R`placeholder="Skriv er förklaring" aria-label="Fråga 5"`, R`placeholder="Write your explanation" aria-label="Question 5"`],
  [R`<summary>Ledtråd</summary><div>Om ni sätter in <i>K</i> kronor, vad är beloppet efter <i>n</i> år? Vad ska det vara lika med när beloppet har fördubblats?</div>`,
   R`<summary>Hint</summary><div>If you deposit <i>K</i> kronor, what is the amount after <i>n</i> years? What should it equal when the amount has doubled?</div>`],
  [R`<summary>Jämför med en förklaring</summary><div>Efter <i>n</i> år är beloppet <span class="formel">K · 1,06<sup>n</sup></span>. Beloppet har fördubblats när <span class="formel">K · 1,06<sup>n</sup> = 2K</span>. Dela båda sidorna med <i>K</i>: <span class="formel">1,06<sup>n</sup> = 2</span>. Startbeloppet <i>K</i> har försvunnit ur ekvationen, så fördubblingstiden beror bara på förändringsfaktorn, alltså på räntan.</div>`,
   R`<summary>Compare with an explanation</summary><div>After <i>n</i> years the amount is <span class="formel">K · 1.06<sup>n</sup></span>. The amount has doubled when <span class="formel">K · 1.06<sup>n</sup> = 2K</span>. Divide both sides by <i>K</i>: <span class="formel">1.06<sup>n</sup> = 2</span>. The deposit <i>K</i> has disappeared from the equation, so the doubling time depends only on the growth factor, that is, on the interest rate.</div>`],

  // ---------- räntor ----------
  [R`<h2>Samma belopp, <em>olika</em> räntor</h2>`, R`<h2>Same deposit, <em>different</em> rates</h2>`],
  [R`<p class="prompt">Nu räcker inte hela år. Ni ska hitta tiden med en decimal.</p>`, R`<p class="prompt">Whole years are not enough now. Find the time to one decimal place.</p>`],
  [R`<li>Ställ in räntesatsen och hitta det första hela året då beloppet når målet.</li>`, R`<li>Set the interest rate and find the first whole year in which the amount reaches the target.</li>`],
  [R`<li>Klicka på den raden och välj steget <b>0,1 år</b>. Kalkylarket visar då tiondels år runt raden. Med pilarna ‹ och › flyttar ni ett år i taget.</li>`,
   R`<li>Click that row and choose the step <b>0.1 years</b>. The spreadsheet then shows tenths of a year around the row. The arrows ‹ and › move one year at a time.</li>`],
  [R`<li>Leta upp den första tiondelen då beloppet når målet.</li>`, R`<li>Find the first tenth in which the amount reaches the target.</li>`],
  [R`Räntelabbet visar kalkylarket med 4&nbsp;%</div>`, R`The Interest Lab shows the spreadsheet at 4&nbsp;%</div>`],
  [R`<span class="qn">6</span><span>Fyll i tabellen.</span>`, R`<span class="qn">6</span><span>Fill in the table.</span>`],
  [R`<span class="qn">8</span><span>Fyll i tabellen.</span>`, R`<span class="qn">8</span><span>Fill in the table.</span>`],
  [R`<th>Räntesats (%)</th><th>Fördubblingstid (år, en decimal)</th><th>Räntesats · tid</th>`, R`<th>Interest rate (%)</th><th>Doubling time (years, one decimal)</th><th>Rate · time</th>`],
  [R`<th>Räntesats (%)</th><th>Tredubblingstid (år, en decimal)</th><th>Räntesats · tid</th>`, R`<th>Interest rate (%)</th><th>Tripling time (years, one decimal)</th><th>Rate · time</th>`],
  [R` %, år till tredubbling"`, R` %, years to triple"`],
  [R` %, år"`, R` %, years"`],
  [R`<label for="q6n">Räntesats · tid hamnar nära heltalet</label>`, R`<label for="q6n">Rate · time ends up close to the whole number</label>`],

  // ---------- låga räntor ----------
  [R`data-del="Kalkylark"`, R`data-del="Spreadsheet"`],
  [R`<p class="delmarke">Del 3 <span>· Låga räntor i kalkylarket</span></p>`, R`<p class="delmarke">Part 3 <span>· Low rates in the spreadsheet</span></p>`],
  [R`<h2>När det tar <em>lång</em> tid</h2>`, R`<h2>When it takes a <em>long</em> time</h2>`],
  [R`<p class="prompt">Vid låga räntor tar det många år. Klicka på en rad i kalkylarket för att se formeln: varje rad är raden ovanför gånger förändringsfaktorn. Om målet inte nås, öka <b>Visa år</b>.</p>`,
   R`<p class="prompt">At low rates it takes many years. Click a row in the spreadsheet to see the formula: each row is the row above times the growth factor. If the target is not reached, increase <b>Show years</b>.</p>`],
  [R`Räntelabbet är förberett: kalkylarket, 2&nbsp;% och 80&nbsp;år</div>`, R`The Interest Lab is set up: spreadsheet, 2&nbsp;% and 80&nbsp;years</div>`],
  [R`<span>Skriv uttrycket för beloppet efter <i>n</i> år om ni sätter in <i>K</i> kronor med räntan 2&nbsp;%.</span>`, R`<span>Write the expression for the amount after <i>n</i> years if you deposit <i>K</i> kronor at 2&nbsp;% interest.</span>`],
  [R`<label for="q7u">Beloppet =</label>`, R`<label for="q7u">Amount =</label>`],
  [R`placeholder="till exempel K · …"`, R`placeholder="for example K · …"`],
  [R`<summary>Jämför</summary><div>Förändringsfaktorn är 1,02, så beloppet efter <i>n</i> år är <span class="formel">K · 1,02<sup>n</sup></span>.</div>`,
   R`<summary>Compare</summary><div>The growth factor is 1.02, so the amount after <i>n</i> years is <span class="formel">K · 1.02<sup>n</sup></span>.</div>`],

  // ---------- mönstret ----------
  [R`<p class="delmarke">Del 3 <span>· Mönstret</span></p>`, R`<p class="delmarke">Part 3 <span>· The pattern</span></p>`],
  [R`<h2>Ser ni <em>talet</em>?</h2>`, R`<h2>Can you see the <em>number</em>?</h2>`],
  [R`<p class="prompt">Här är er kolumn <b>räntesats · tid</b> från alla mätningar hittills.</p>`, R`<p class="prompt">Here is your column <b>rate · time</b> from all your measurements so far.</p>`],
  [R`<span>Ta med alla mätningar, även de låga räntorna. Vilket heltal hamnar <b>räntesats · tid</b> nära?</span>`, R`<span>Include all measurements, also the low rates. Which whole number does <b>rate · time</b> end up close to?</span>`],
  [R`<span>Ungefär</span><input id="q9" class="stort-tal" type="text" inputmode="numeric" data-spara aria-label="Talet">`, R`<span>About</span><input id="q9" class="stort-tal" type="text" inputmode="numeric" data-spara aria-label="The number">`],

  // ---------- regeln ----------
  [R`data-del="Regel"`, R`data-del="Rule"`],
  [R`<p class="delmarke">Del 4 <span>· Formulera en regel · 10 min</span></p>`, R`<p class="delmarke">Part 4 <span>· Formulate a rule · 10 min</span></p>`],
  [R`<h2>Er <em>egen</em> regel</h2>`, R`<h2>Your <em>own</em> rule</h2>`],
  [R`<div class="koppling-rubrik">Det här kom ni fram till på förra sidan</div>`, R`<div class="koppling-rubrik">This is what you found on the previous page</div>`],
  [R`<b>räntesats · fördubblingstid</b> ≈`, R`<b>rate · doubling time</b> ≈`],
  [R`<p class="koppling-text">Men ni vill kunna räkna ut <b>fördubblingstiden</b>. Hur får ni fördubblingstiden ensam? Vad ska ni göra med räntesatsen?</p>`,
   R`<p class="koppling-text">But you want to be able to work out the <b>doubling time</b>. How do you get the doubling time on its own? What should you do with the interest rate?</p>`],
  [R`<span>Skriv er regel.</span>`, R`<span>Write your rule.</span>`],
  [R`<span>Fördubblingstiden ≈</span><input id="q10" class="stort-tal" type="text" inputmode="numeric" data-spara aria-label="Talet i regeln"><span>/ räntesatsen</span>`,
   R`<span>Doubling time ≈</span><input id="q10" class="stort-tal" type="text" inputmode="numeric" data-spara aria-label="The number in the rule"><span>/ interest rate</span>`],
  [R`<summary>Ledtråd</summary><div>Tänk på ett exempel. Om 6 · fördubblingstid = 72, hur räknar ni ut fördubblingstiden? Gör samma sak med vilken räntesats som helst.</div>`,
   R`<summary>Hint</summary><div>Think of an example. If 6 · doubling time = 72, how do you work out the doubling time? Do the same with any interest rate.</div>`],
  [R`<summary>Varför just 72?</summary><div>Era värden för räntesats · tid ligger mellan ungefär 70 och 73. Man brukar välja 72 eftersom det går jämnt att dela med 2, 3, 4, 6, 8, 9 och 12. Då blir det lätt att räkna i huvudet: 72 / 6 = 12 år.</div>`,
   R`<summary>Why 72?</summary><div>Your values for rate · time lie between about 70 and 73. People usually choose 72 because it can be divided evenly by 2, 3, 4, 6, 8, 9 and 12. That makes it easy to calculate in your head: 72 / 6 = 12 years.</div>`],
  [R`<span>Testa regeln vid 24&nbsp;% ränta. Ni behöver tiden med en decimal, precis som i del 2.</span>`, R`<span>Test your rule at 24&nbsp;% interest. You need the time to one decimal place, just like in Part 2.</span>`],
  [R`<li>Ställ in 24&nbsp;% i Räntelabbet, till exempel med knappen <b>Hög ränta: 24&nbsp;%</b>.</li>`, R`<li>Set 24&nbsp;% in the Interest Lab, for example with the button <b>High rate: 24&nbsp;%</b>.</li>`],
  [R`<li>Välj <b>Kalkylark</b> och hitta det första hela året då beloppet når målet. Klicka på den raden.</li>`, R`<li>Choose <b>Spreadsheet</b> and find the first whole year in which the amount reaches the target. Click that row.</li>`],
  [R`<li>Välj steget <b>0,1 år</b> och leta upp den första tiondelen då målet nås.</li>`, R`<li>Choose the step <b>0.1 years</b> and find the first tenth in which the target is reached.</li>`],
  [R`<span>Regeln säger</span><strong id="q11regel">–</strong><span>år.</span>`, R`<span>The rule says</span><strong id="q11regel">–</strong><span>years.</span>`],
  [R`<label for="q11">Räntelabbet visar</label><input id="q11" type="text" inputmode="decimal" data-spara placeholder="_,_" style="width:90px;text-align:right"><span>år <b>(en decimal)</b></span>`,
   R`<label for="q11">The Interest Lab shows</label><input id="q11" type="text" inputmode="decimal" data-spara placeholder="_._" style="width:90px;text-align:right"><span>years <b>(one decimal)</b></span>`],
  [R`placeholder="När fungerar regeln bra, och när fungerar den sämre?" aria-label="När fungerar regeln bra?"`, R`placeholder="When does the rule work well, and when does it work less well?" aria-label="When does the rule work well?"`],
  [R`<summary>Jämför</summary><div>Regeln fungerar bra för låga räntor, ungefär 2 till 10&nbsp;%. Där hamnar räntesats · tid mellan 70 och 73. Vid 24&nbsp;% säger regeln 3 år, men det tar 3,2 år, så räntesats · tid blir 77. Ju högre ränta, desto sämre stämmer regeln.</div>`,
   R`<summary>Compare</summary><div>The rule works well for low rates, about 2 to 10&nbsp;%. There rate · time lies between 70 and 73. At 24&nbsp;% the rule says 3 years, but it takes 3.2 years, so rate · time is 77. The higher the rate, the worse the rule fits.</div>`],

  // ---------- ekvationer ----------
  [R`data-del="Ekvationer"`, R`data-del="Equations"`],
  [R`<p class="delmarke">Del 5 <span>· Från ränta till ekvationer · 15 min</span></p>`, R`<p class="delmarke">Part 5 <span>· From interest to equations · 15 min</span></p>`],
  [R`<h2>Svåra ekvationer <em>i huvudet</em></h2>`, R`<h2>Hard equations <em>in your head</em></h2>`],
  [R`<div class="koppling-rubrik">Ett verktyg ni redan har</div>`, R`<div class="koppling-rubrik">A tool you already have</div>`],
  [R`1,06<sup>x</sup> = 2 &nbsp;⇒&nbsp; x ≈ 72 / 6 = <span>12</span>`, R`1.06<sup>x</sup> = 2 &nbsp;⇒&nbsp; x ≈ 72 / 6 = <span>12</span>`],
  [R`<p class="koppling-text">Förändringsfaktorn 1,06 betyder räntan 6&nbsp;%, och <b>= 2</b> betyder en fördubbling. Då ger 72-regeln svaret i huvudet. Räntelabbet visar 11,9, så huvudräkningen kommer mycket nära.</p>`,
   R`<p class="koppling-text">The growth factor 1.06 means the interest rate 6&nbsp;%, and <b>= 2</b> means doubling. So the rule of 72 gives the answer in your head. The Interest Lab shows 11.9, so mental arithmetic gets very close.</p>`],
  [R`<span>Lös ekvationerna i huvudet med 72-regeln. Kontrollera sedan i Räntelabbet och skriv svaret med en decimal.</span>`, R`<span>Solve the equations in your head with the rule of 72. Then check in the Interest Lab and write the answer to one decimal place.</span>`],
  [R`<th>Ekvation</th><th>I huvudet: x ≈</th><th>Räntelabbet: x ≈ (en decimal)</th>`, R`<th>Equation</th><th>In your head: x ≈</th><th>Interest Lab: x ≈ (one decimal)</th>`],
  [R`<th>Ekvation</th><th>Antal fördubblingar</th><th>I huvudet: x ≈</th><th>Räntelabbet: x ≈ (en decimal)</th>`, R`<th>Equation</th><th>Number of doublings</th><th>In your head: x ≈</th><th>Interest Lab: x ≈ (one decimal)</th>`],
  [R`data-f="1,02" data-ekv="1,02^x = 2"><td><span class="formel">1,02<sup>x</sup> = 2</span>`, R`data-f="1.02" data-ekv="1.02^x = 2"><td><span class="formel">1.02<sup>x</sup> = 2</span>`],
  [R`data-f="1,08" data-ekv="1,08^x = 2"><td><span class="formel">1,08<sup>x</sup> = 2</span>`, R`data-f="1.08" data-ekv="1.08^x = 2"><td><span class="formel">1.08<sup>x</sup> = 2</span>`],
  [R`data-f="1,09" data-ekv="1,09^x = 2"><td><span class="formel">1,09<sup>x</sup> = 2</span>`, R`data-f="1.09" data-ekv="1.09^x = 2"><td><span class="formel">1.09<sup>x</sup> = 2</span>`],
  [R`data-f="1,08" data-ekv="1,08^x = 4"><td><span class="formel">1,08<sup>x</sup> = 4</span>`, R`data-f="1.08" data-ekv="1.08^x = 4"><td><span class="formel">1.08<sup>x</sup> = 4</span>`],
  [R`data-f="1,08" data-ekv="1,08^x = 16"><td><span class="formel">1,08<sup>x</sup> = 16</span>`, R`data-f="1.08" data-ekv="1.08^x = 16"><td><span class="formel">1.08<sup>x</sup> = 16</span>`],
  [R`aria-label="1,02 upphöjt till x = 2, i huvudet"`, R`aria-label="1.02 to the power of x = 2, in your head"`],
  [R`aria-label="1,02 upphöjt till x = 2, Räntelabbet"`, R`aria-label="1.02 to the power of x = 2, Interest Lab"`],
  [R`aria-label="1,08 upphöjt till x = 2, i huvudet"`, R`aria-label="1.08 to the power of x = 2, in your head"`],
  [R`aria-label="1,08 upphöjt till x = 2, Räntelabbet"`, R`aria-label="1.08 to the power of x = 2, Interest Lab"`],
  [R`aria-label="1,09 upphöjt till x = 2, i huvudet"`, R`aria-label="1.09 to the power of x = 2, in your head"`],
  [R`aria-label="1,09 upphöjt till x = 2, Räntelabbet"`, R`aria-label="1.09 to the power of x = 2, Interest Lab"`],
  [R`aria-label="1,08 upphöjt till x = 4, antal fördubblingar"`, R`aria-label="1.08 to the power of x = 4, number of doublings"`],
  [R`aria-label="1,08 upphöjt till x = 4, i huvudet"`, R`aria-label="1.08 to the power of x = 4, in your head"`],
  [R`aria-label="1,08 upphöjt till x = 4, Räntelabbet"`, R`aria-label="1.08 to the power of x = 4, Interest Lab"`],
  [R`aria-label="1,08 upphöjt till x = 16, antal fördubblingar"`, R`aria-label="1.08 to the power of x = 16, number of doublings"`],
  [R`aria-label="1,08 upphöjt till x = 16, i huvudet"`, R`aria-label="1.08 to the power of x = 16, in your head"`],
  [R`aria-label="1,08 upphöjt till x = 16, Räntelabbet"`, R`aria-label="1.08 to the power of x = 16, Interest Lab"`],
  [R`data-etikett="i huvudet x ≈"`, R`data-etikett="in your head x ≈"`],
  [R`data-etikett="Räntelabbet x ≈"`, R`data-etikett="Interest Lab x ≈"`],
  [R`data-etikett="fördubblingar"`, R`data-etikett="doublings"`],
  [R`<summary>Ledtråd</summary><div>Vilken räntesats ger förändringsfaktorn 1,02? Dela sedan 72 med räntesatsen. I Räntelabbet ställer ni in samma räntesats och målet 2 gånger insättningen, och zoomar in med steget 0,1 år.</div>`,
   R`<summary>Hint</summary><div>Which interest rate gives the growth factor 1.02? Then divide 72 by the interest rate. In the Interest Lab you set the same interest rate and the target 2 times the deposit, and zoom in with the step 0.1 years.</div>`],
  [R`<span>Bygg vidare. Nu ska beloppet bli 4 och 16 gånger så stort. Hur många fördubblingar är det? Lös ekvationerna i huvudet och kontrollera i Räntelabbet.</span>`,
   R`<span>Take it further. Now the amount should become 4 and 16 times as large. How many doublings is that? Solve the equations in your head and check in the Interest Lab.</span>`],
  [R`<summary>Ledtråd</summary><div>Om man dubblar 1 får man 2, och dubblar man igen får man 4. Hur många gånger ska man dubbla för att få 16? Varje fördubbling vid 8&nbsp;% tar ungefär 72 / 8 år.</div>`,
   R`<summary>Hint</summary><div>If you double 1 you get 2, and if you double again you get 4. How many times do you have to double to get 16? Each doubling at 8&nbsp;% takes about 72 / 8 years.</div>`],
  [R`<p class="prompt">Ekvationen <span class="formel">1,06<sup>x</sup> = 2</span> ställer samma fråga som ni har undersökt: hur många gånger <i>x</i> ska man multiplicera med förändringsfaktorn 1,06 för att få 2?</p>`,
   R`<p class="prompt">The equation <span class="formel">1.06<sup>x</sup> = 2</span> asks the same question that you have explored: how many times <i>x</i> do you have to multiply by the growth factor 1.06 to get 2?</p>`],
  [R`<span>Försök först lösa <span class="formel">1,06<sup>x</sup> = 2</span> med de metoder ni har lärt er hittills. Vad händer?</span>`, R`<span>First try to solve <span class="formel">1.06<sup>x</sup> = 2</span> with the methods you have learned so far. What happens?</span>`],
  [R`aria-label="Fråga 12"`, R`aria-label="Question 12"`],

  // ---------- reflektera ----------
  [R`data-del="Reflektera"`, R`data-del="Reflect"`],
  [R`<p class="delmarke">Del 6 <span>· Reflektera · 5 min</span></p>`, R`<p class="delmarke">Part 6 <span>· Reflect · 5 min</span></p>`],
  [R`<h2>Vad gjorde <em>verktyget</em>, och vad gjorde ni?</h2>`, R`<h2>What did the <em>tool</em> do, and what did you do?</h2>`],
  [R`<span>Vad kunde ni göra med Räntelabbet som ni inte hade kunnat göra för hand?</span>`, R`<span>What could you do with the Interest Lab that you could not have done by hand?</span>`],
  [R`aria-label="Fråga 16"`, R`aria-label="Question 16"`],
  [R`<span>Vad hjälpte Räntelabbet <b>inte</b> med? Vad behövde ni förstå själva?</span>`, R`<span>What did the Interest Lab <b>not</b> help you with? What did you need to understand yourselves?</span>`],
  [R`aria-label="Fråga 15"`, R`aria-label="Question 15"`],

  // ---------- utmaning ----------
  [R`data-del="Utmaning"`, R`data-del="Challenge"`],
  [R`<p class="delmarke">Utmaning</p>`, R`<p class="delmarke">Challenge</p>`],
  [R`<h2><em>Tredubbla</em> pengarna</h2>`, R`<h2><em>Triple</em> your money</h2>`],
  [R`Räntelabbets mål är nu tredubbla beloppet</div>`, R`The Interest Lab's target is now three times the deposit</div>`],
  [R`<span>Hur lång tid tar det att tredubbla pengarna?</span>`, R`<span>How long does it take to triple your money?</span>`],
  [R`<span>Finns det en tredubblingsregel på samma sätt? Vilket tal ska stå i den?</span>`, R`<span>Is there a tripling rule in the same way? Which number should it contain?</span>`],
  [R`aria-label="Fråga 18"`, R`aria-label="Question 18"`],

  // ---------- klart ----------
  [R`data-del="Klart"`, R`data-del="Done"`],
  [R`<p class="delmarke">Klart</p>`, R`<p class="delmarke">Done</p>`],
  [R`<h2>Det här kom ni <em>fram till</em></h2>`, R`<h2>This is what you <em>found</em></h2>`],
  [R`<p class="prompt">Svaren finns kvar i den här webbläsaren. Inget har skickats någonstans. Kopiera svaren och klistra in dem där er lärare vill ha dem, eller skriv ut.</p>`,
   R`<p class="prompt">Your answers stay in this browser. Nothing has been sent anywhere. Copy your answers and paste them where your teacher wants them, or print the page.</p>`],
  [R`id="kopiera">Kopiera mina svar</button>`, R`id="kopiera">Copy my answers</button>`],
  [R`id="skriv-ut">Skriv ut</button>`, R`id="skriv-ut">Print</button>`],
  [R`id="borja-om">Börja om</button>`, R`id="borja-om">Start again</button>`],
  [R`hidden>Radera alla svar? <button class="knapp" type="button" id="borja-om-ja">Ja, radera</button><button class="knapp" type="button" id="borja-om-nej">Avbryt</button>`,
   R`hidden>Delete all answers? <button class="knapp" type="button" id="borja-om-ja">Yes, delete</button><button class="knapp" type="button" id="borja-om-nej">Cancel</button>`],

  // ---------- Räntelabbet ----------
  [R`<h3>Räntelabbet</h3>`, R`<h3>Interest Lab</h3>`],
  [R`aria-label="Färdiga försök"`, R`aria-label="Ready-made experiments"`],
  [R`>10&nbsp;000&nbsp;kr, 6&nbsp;%</button>`, R`>10,000&nbsp;kr, 6&nbsp;%</button>`],
  [R`>50&nbsp;000&nbsp;kr, 6&nbsp;%</button>`, R`>50,000&nbsp;kr, 6&nbsp;%</button>`],
  [R`>Dubbla räntan: 12&nbsp;%</button>`, R`>Double the rate: 12&nbsp;%</button>`],
  [R`>Låg ränta: 2&nbsp;%</button>`, R`>Low rate: 2&nbsp;%</button>`],
  [R`>Hög ränta: 24&nbsp;%</button>`, R`>High rate: 24&nbsp;%</button>`],
  [R`<label for="b-k">Insatt belopp</label>`, R`<label for="b-k">Deposit</label>`],
  [R`aria-label="Insatt belopp, reglage"`, R`aria-label="Deposit, slider"`],
  [R`<label for="b-r">Räntesats</label>`, R`<label for="b-r">Interest rate</label>`],
  [R`aria-label="Räntesats, reglage"`, R`aria-label="Interest rate, slider"`],
  [R`<label for="b-n">Visa år</label>`, R`<label for="b-n">Show years</label>`],
  [R`aria-label="Antal år som visas, reglage"`, R`aria-label="Number of years shown, slider"`],
  [R`step="1"> <span class="enhet">år</span>`, R`step="1"> <span class="enhet">years</span>`],
  [R`<label for="b-m">Mål</label>`, R`<label for="b-m">Target</label>`],
  [R`<span class="enhet">gånger insättningen</span>`, R`<span class="enhet">times the deposit</span>`],
  [R`aria-label="Visning"`, R`aria-label="View"`],
  [R`id="vy-kalkyl" aria-pressed="false">Kalkylark</button>`, R`id="vy-kalkyl" aria-pressed="false">Spreadsheet</button>`],
  [R`aria-label="Stapeldiagram över beloppet år för år"`, R`aria-label="Bar chart of the amount year by year"`],
  [R`<span>Steg</span>`, R`<span>Step</span>`],
  [R`aria-pressed="true">1 år</button>`, R`aria-pressed="true">1 year</button>`],
  [R`aria-pressed="false">0,1 år</button>`, R`aria-pressed="false">0.1 years</button>`],
  [R`aria-label="Ett år tidigare"`, R`aria-label="One year earlier"`],
  [R`<label>från år <input`, R`<label>from year <input`],
  [R`aria-label="Ett år senare"`, R`aria-label="One year later"`],
  [R`<th>A: År</th><th>B: Belopp (kr)</th>`, R`<th>A: Year</th><th>B: Amount (kr)</th>`],
  [R`<div><h4>Gissa först</h4><p>Räntelabbet öppnas när ni har svarat på del 1.</p><button class="knapp prim" type="button" data-gaTill="gissa">Till del 1</button></div>`,
   R`<div><h4>Guess first</h4><p>The Interest Lab opens when you have answered Part 1.</p><button class="knapp prim" type="button" data-gaTill="gissa">To Part 1</button></div>`],

  // ---------- foten ----------
  [R`</svg> Tillbaka`, R`</svg> Back`],
  [R`aria-label="Visa"`, R`aria-label="Show"`],
  [R`data-vy="uppgift" aria-pressed="true">Uppgiften</button>`, R`data-vy="uppgift" aria-pressed="true">Task</button>`],
  [R`data-vy="bank" aria-pressed="false">Räntelabbet</button>`, R`data-vy="bank" aria-pressed="false">Interest Lab</button>`],
  [R`<span id="nasta-txt">Nästa</span>`, R`<span id="nasta-txt">Next</span>`],

  // ---------- skript: talformat ----------
  [R`var NYCKEL = 'fysiklabbet.fordubbling.v1';`, R`var NYCKEL = 'fysiklabbet.doubling.v1';`],
  [`var heltal = delar[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, '${N}');\n    return delar.length > 1 ? heltal + ',' + delar[1] : heltal;`,
   `var heltal = delar[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n    return delar.length > 1 ? heltal + '.' + delar[1] : heltal;`],
  [R`function fmtKort(n) { return fmtNum(n, 2).replace(/,00$/, ''); }`, R`function fmtKort(n) { return fmtNum(n, 2).replace(/\.00$/, ''); }`],
  [R`function fmtEn(n) { return fmtNum(n, 1).replace(/,0$/, ''); }`, R`function fmtEn(n) { return fmtNum(n, 1).replace(/\.0$/, ''); }`],
  [R`return s.replace('.', ',');
  }`, R`return s;
  }`],

  // ---------- skript: texter ----------
  [R`$('nasta-txt').textContent = s.dataset.skarm === 'start' ? 'Börja' : s.dataset.skarm === 'gissa' && !svar.last ? 'Lås gissningarna' : 'Nästa';`,
   R`$('nasta-txt').textContent = s.dataset.skarm === 'start' ? 'Start' : s.dataset.skarm === 'gissa' && !svar.last ? 'Lock my guesses' : 'Next';`],
  [R`if (svar.last) ut.textContent = 'Gissningarna är låsta. Ni ser dem igen på sista sidan, bredvid det ni kom fram till.';
    else ut.textContent = paminn ? 'Svara på fråga 1, 2 och 3 innan ni går vidare.' : 'När ni går vidare låses gissningarna.';`,
   R`if (svar.last) ut.textContent = 'Your guesses are locked. You will see them again on the last page, next to what you found.';
    else ut.textContent = paminn ? 'Answer questions 1, 2 and 3 before you move on.' : 'When you move on, your guesses are locked.';`],
  [R`t4: 'Rätt. Alla belopp fördubblas under år 12. Startbeloppet spelar ingen roll. På nästa sida förklarar ni varför.',
        t6: 'Rätt. Titta på kolumnen räntesats · tid och skriv in heltalet nedan.',
        t8: 'Rätt. Lägg märke till 2 %: efter 35 år är beloppet 1,9999 gånger insättningen, så fördubblingen sker precis efter 35 år.',
        t14: 'Rätt. Jämför räntesats · tid med fördubblingen. Vilket tal hamnar ni nära nu?'`,
   R`t4: 'Correct. Every deposit doubles during year 12. The deposit does not matter. On the next page you explain why.',
        t6: 'Correct. Look at the column rate · time and type the whole number below.',
        t8: 'Correct. Notice 2 %: after 35 years the amount is 1.9999 times the deposit, so the doubling happens just after 35 years.',
        t14: 'Correct. Compare rate · time with the doubling. Which number do you end up close to now?'`],
  [R`? 'Rätt. 72-regeln ger 36, 9 och 8 i huvudet, och Räntelabbet visar ungefär 35,0, 9,0 och 8,0. Huvudräkningen kommer nära, särskilt vid låga räntor.'
        : 'Rätt. 4 är två fördubblingar och 16 är fyra. Varje fördubbling tar ungefär 9 år, så x ≈ 2 · 9 = 18 och x ≈ 4 · 9 = 36. Räntelabbet visar 18,0 och 36,0. I Matematik 2 lär ni er logaritmer, som ger exakta svar.';`,
   R`? 'Correct. The rule of 72 gives 36, 9 and 8 in your head, and the Interest Lab shows about 35.0, 9.0 and 8.0. Mental arithmetic gets close, especially at low rates.'
        : 'Correct. 4 is two doublings and 16 is four. Each doubling takes about 9 years, so x ≈ 2 · 9 = 18 and x ≈ 4 · 9 = 36. The Interest Lab shows 18.0 and 36.0. Later you will learn logarithms, which give exact answers.';`],
  [R`? 'Hur många gånger ska man dubbla 1 för att få ' + mal + '? Prova: 1, 2, 4, …'
        : felTyp === 'h'
        ? 'Inte riktigt i huvudräkningen på den röda raden. Vilken räntesats ger förändringsfaktorn ' + f + '? Använd sedan 72-regeln: x ≈ 72 / räntesatsen' + (felRad.dataset.fordubblingar ? ', för varje fördubbling.' : '.')
        : 'Inte riktigt i Räntelabbet på den röda raden. Ställ in räntan ' + r + ' % och målet ' + mal + ' gånger insättningen, och zooma in med steget 0,1 år.';`,
   R`? 'How many times do you have to double 1 to get ' + mal + '? Try: 1, 2, 4, …'
        : felTyp === 'h'
        ? 'Not quite in the mental arithmetic on the red row. Which interest rate gives the growth factor ' + f + '? Then use the rule of 72: x ≈ 72 / interest rate' + (felRad.dataset.fordubblingar ? ', for each doubling.' : '.')
        : 'Not quite in the Interest Lab on the red row. Set the interest rate ' + r + ' % and the target ' + mal + ' times the deposit, and zoom in with the step 0.1 years.';`],
  [R`ut.textContent = 'Det röda är det första hela året. Klicka på den raden i kalkylarket, välj steget 0,1 år och leta upp tiondelen då målet nås.';`,
   R`ut.textContent = 'The red one is the first whole year. Click that row in the spreadsheet, choose the step 0.1 years and find the tenth in which the target is reached.';`],
  [R`ut.textContent = 'Inte riktigt på den röda raden. Ställ in ' + fmtKort(k) + ' kr och ' + felRad.dataset.r + ' % i Räntelabbet, och leta efter det första ' + (decimal ? 'året' : 'hela året') + ' då beloppet är minst ' + fmtKort(k * mal) + ' kr.' + (decimal ? ' Zooma sedan in med steget 0,1 år.' : ' Kalkylarket hjälper.');`,
   R`ut.textContent = 'Not quite on the red row. Set ' + fmtKort(k) + ' kr and ' + felRad.dataset.r + ' % in the Interest Lab, and look for the first ' + (decimal ? 'year' : 'whole year') + ' in which the amount is at least ' + fmtKort(k * mal) + ' kr.' + (decimal ? ' Then zoom in with the step 0.1 years.' : ' The spreadsheet helps.');`],
  [R`ut.textContent = 'Fyll i ' + (tomma === 1 ? 'den tomma rutan' : 'de tomma rutorna') + ' först.';`, R`ut.textContent = 'Fill in ' + (tomma === 1 ? 'the empty box' : 'the empty boxes') + ' first.';`],
  [R`ut.textContent = 'Skriv ett heltal först.'; return; }`, R`ut.textContent = 'Type a whole number first.'; return; }`],
  [R`ut.textContent = 'Ja, alla hamnar mellan ungefär 70 och 73. Håller det även för låga räntor? Det tar ni reda på i nästa del.'; }`, R`ut.textContent = 'Yes, they all end up between about 70 and 73. Does that hold for low rates too? You find out in the next part.'; }`],
  [R`ut.textContent = 'Titta igen på kolumnen räntesats · tid. Fyll i alla rader och kontrollera tabellen först.'; }`, R`ut.textContent = 'Look at the column rate · time again. Fill in every row and check the table first.'; }`],
  [R`ut.textContent = 'Skriv ett tal först.'; return; }`, R`ut.textContent = 'Type a number first.'; return; }`],
  [R`ut.textContent = 'Ja. Räntesats · tid hamnar mellan ungefär 70 och 73. Regeln som bygger på det kallas 72-regeln.'; }`, R`ut.textContent = 'Yes. Rate · time ends up between about 70 and 73. The rule based on this is called the rule of 72.'; }`],
  [R`ut.textContent = 'Titta igen på korten ovan. Vilket tal hamnar de flesta nära?'; }`, R`ut.textContent = 'Look at the cards above again. Which number are most of them close to?'; }`],
  [R`ut.textContent = 'Pröva regeln vid 6 %: ' + fmtKort(c) + ' / 6 = ' + fmtKort(regel) + ' år. I tabellen fick ni ' + fmtEn(matt) + ' år. ' +
      (nara ? 'Det stämmer bra.' : 'Det stämmer inte. Titta på talet i rutan ovan och tänk på ledtråden.');`,
   R`ut.textContent = 'Try the rule at 6 %: ' + fmtKort(c) + ' / 6 = ' + fmtKort(regel) + ' years. In the table you got ' + fmtEn(matt) + ' years. ' +
      (nara ? 'That fits well.' : 'That does not fit. Look at the number in the box above and think about the hint.');`],
  [R`ut.textContent = 'Skriv vad Räntelabbet visar först.'; return; }`, R`ut.textContent = 'Type what the Interest Lab shows first.'; return; }`],
  [R`ut.textContent = 'Rätt, det tar ungefär 3,2 år. Räntesats · tid blir 24 · 3,2 ≈ 77, alltså en bit från 72.';`, R`ut.textContent = 'Correct, it takes about 3.2 years. Rate · time is 24 · 3.2 ≈ 77, some way from 72.';`],
  [R`ut.textContent = '4 är det första hela året. Klicka på raden för år 4, välj steget 0,1 år och leta upp tiondelen.'; }`, R`ut.textContent = '4 is the first whole year. Click the row for year 4, choose the step 0.1 years and find the tenth.'; }`],
  [R`ut.textContent = 'Inte riktigt. Leta i kalkylarket efter första året då beloppet når 20 000 kr, och zooma sedan in med steget 0,1 år.'; }`, R`ut.textContent = 'Not quite. Look in the spreadsheet for the first year in which the amount reaches 20,000 kr, then zoom in with the step 0.1 years.'; }`],
  [R`$('nasta-txt').textContent = svar.last ? 'Nästa' : 'Lås gissningarna';`, R`$('nasta-txt').textContent = svar.last ? 'Next' : 'Lock my guesses';`],
  [R`return '<div class="kort"><div class="rubrik">' + k.r + ' % · ' + fmtEn(k.t) + ' år</div><div class="varde">' + fmtEn(k.r * k.t) + '</div><p><b>räntesats · tid</b></p></div>';
    }).join('') : '<div class="kort"><p>Fyll i tabellerna i del 2 och 3 först, så samlas resultaten här.</p></div>';`,
   R`return '<div class="kort"><div class="rubrik">' + k.r + ' % · ' + fmtEn(k.t) + ' years</div><div class="varde">' + fmtEn(k.r * k.t) + '</div><p><b>rate · time</b></p></div>';
    }).join('') : '<div class="kort"><p>Fill in the tables in Parts 2 and 3 first, and the results are collected here.</p></div>';`],
  [R`kort.push('<div class="kort"><div class="rubrik">Er gissning, 6&nbsp;%</div><div class="varde">' + (isNaN(g) ? '–' : fmtKort(g)) + ' <small>år</small></div><p>Det tar ' + fmtEn(exaktTid(6, 2)) + ' år att fördubbla pengarna, alltså under år 12.</p></div>');
    kort.push('<div class="kort"><div class="rubrik">Spelar beloppet roll?</div><div class="varde">Nej</div><p>Ni gissade ' + (svar.g2 || 'inget') + '. Alla belopp fördubblas under år 12 vid 6&nbsp;%.</p></div>');
    kort.push('<div class="kort"><div class="rubrik">Er regel</div><div class="varde">' + (isNaN(c) ? '–' : fmtKort(c)) + ' <small>/ räntesatsen</small></div><p>72-regeln: fördubblingstiden ≈ 72 / räntesatsen.</p></div>');
    kort.push('<div class="kort"><div class="rubrik">Testet vid 24&nbsp;%</div><div class="varde">' + (isNaN(b) ? '–' : fmtKort(b)) + ' <small>år</small></div><p>Regeln säger 3 år, men det tar 3,2 år. Regeln passar bäst för låga räntor.</p></div>');`,
   R`kort.push('<div class="kort"><div class="rubrik">Your guess, 6&nbsp;%</div><div class="varde">' + (isNaN(g) ? '–' : fmtKort(g)) + ' <small>years</small></div><p>It takes ' + fmtEn(exaktTid(6, 2)) + ' years to double the money, that is, during year 12.</p></div>');
    kort.push('<div class="kort"><div class="rubrik">Does the deposit matter?</div><div class="varde">No</div><p>You guessed ' + (svar.g2 || 'nothing') + '. Every deposit doubles during year 12 at 6&nbsp;%.</p></div>');
    kort.push('<div class="kort"><div class="rubrik">Your rule</div><div class="varde">' + (isNaN(c) ? '–' : fmtKort(c)) + ' <small>/ interest rate</small></div><p>The rule of 72: doubling time ≈ 72 / interest rate.</p></div>');
    kort.push('<div class="kort"><div class="rubrik">The test at 24&nbsp;%</div><div class="varde">' + (isNaN(b) ? '–' : fmtKort(b)) + ' <small>years</small></div><p>The rule says 3 years, but it takes 3.2 years. The rule fits best for low rates.</p></div>');`],
  [R`(' + bank.n + ' faktorer)';`, R`(' + bank.n + ' factors)';`],
  [R`$('kedja').innerHTML = '<span class="kedja-rubrik">Hur många gånger större?</span>Förändringsfaktor <b>' + fs + '</b>. Efter ' + bank.n + ' år har beloppet multiplicerats med<div class="rad">' + kedja + ' = <span class="p">' + fmtNum(p, 4) + '</span></div>Beloppet: '`,
   R`$('kedja').innerHTML = '<span class="kedja-rubrik">How many times larger?</span>Growth factor <b>' + fs + '</b>. After ' + bank.n + ' years the amount has been multiplied by<div class="rad">' + kedja + ' = <span class="p">' + fmtNum(p, 4) + '</span></div>Amount: '`],
  [R`(bank.mal === 2 ? 'dubbla beloppet' : bank.mal === 3 ? 'tredubbla beloppet' : fmtKort(bank.mal) + ' gånger insättningen')`, R`(bank.mal === 2 ? 'double the deposit' : bank.mal === 3 ? 'three times the deposit' : fmtKort(bank.mal) + ' times the deposit')`],
  [R`'font-family': 'DM Sans, sans-serif' }, 'år'));`, R`'font-family': 'DM Sans, sans-serif' }, 'year'));`],
  [R`$('avlasning').textContent = 'År ' + a + ': ' + fmtNum(v[i], 2) + ' kr, alltså ' + fmtNum(v[i] / bank.k, 4) + ' gånger insättningen.';`, R`$('avlasning').textContent = 'Year ' + a + ': ' + fmtNum(v[i], 2) + ' kr, that is, ' + fmtNum(v[i] / bank.k, 4) + ' times the deposit.';`],
  [R`$('kalkyl-mal').textContent = 'Mål: ' + fmtKort(bank.k * bank.mal) + ' kr';`, R`$('kalkyl-mal').textContent = 'Target: ' + fmtKort(bank.k * bank.mal) + ' kr';`],
  [R`if (bank.vald == null) $('avlasning').textContent = bank.vy === 'diagram' ? 'Peka eller tryck på en stapel för att läsa av beloppet.'
      : bank.steg < 1 ? 'Tiondels år från år ' + bank.fran + ' till ' + (bank.fran + 2) + '. Leta upp den första raden där beloppet når målet.'
      : 'Klicka på en rad för att se formeln. Klicka sedan på steget 0,1 år för att se tiondelar runt raden.';`,
   R`if (bank.vald == null) $('avlasning').textContent = bank.vy === 'diagram' ? 'Point at or tap a bar to read the amount.'
      : bank.steg < 1 ? 'Tenths of a year from year ' + bank.fran + ' to ' + (bank.fran + 2) + '. Find the first row in which the amount reaches the target.'
      : 'Click a row to see the formula. Then click the step 0.1 years to see tenths around the row.';`],
  [R`if (fin && x > bank.fran + 2) notis.textContent = 'Beloppet når inte målet före år ' + (bank.fran + 2) + '. Gå till senare år med pilen ›, eller skriv ett annat år.';
    else if (fin && x < bank.fran) notis.textContent = 'Beloppet har redan nått målet vid år ' + bank.fran + '. Gå till tidigare år med pilen ‹, eller skriv ett annat år.';
    else if (!fin && behov > bank.n) notis.textContent = 'Beloppet når inte målet inom ' + bank.n + ' år. Öka Visa år' + (behov > 150 ? ', eller välj en högre ränta.' : '.');`,
   R`if (fin && x > bank.fran + 2) notis.textContent = 'The amount does not reach the target before year ' + (bank.fran + 2) + '. Go to later years with the arrow ›, or type another year.';
    else if (fin && x < bank.fran) notis.textContent = 'The amount has already reached the target at year ' + bank.fran + '. Go to earlier years with the arrow ‹, or type another year.';
    else if (!fin && behov > bank.n) notis.textContent = 'The amount does not reach the target within ' + bank.n + ' years. Increase Show years' + (behov > 150 ? ', or choose a higher rate.' : '.');`],

  // ---------- skript: kopiera svaren ----------
  [R`var rad = ['Hur lång tid tar det att fördubbla pengarna?', 'Namn: ' + (namn.value || ''), ''];
    rad.push('Fråga 1 (gissning): ' + ($('g1').value || '') + ' år. ' + ($('g1t').value || ''));
    rad.push('Fråga 2: ' + (svar.g2 || '') + '. Fråga 3: ' + (svar.g3 || ''));`,
   R`var rad = ['How long does it take to double your money?', 'Names: ' + (namn.value || ''), ''];
    rad.push('Question 1 (guess): ' + ($('g1').value || '') + ' years. ' + ($('g1t').value || ''));
    rad.push('Question 2: ' + (svar.g2 || '') + '. Question 3: ' + (svar.g3 || ''));`],
  [R`(tr.querySelector('input').value || '') + ' år');`, R`(tr.querySelector('input').value || '') + ' years');`],
  [R`tab('t4', 'Fråga 4');
    rad.push('Fråga 5: ' + $('q5').value);
    tab('t6', 'Fråga 6');
    rad.push('  Räntesats · tid hamnar nära: ' + $('q6n').value);
    rad.push('Fråga 7: Beloppet = ' + $('q7u').value);
    tab('t8', 'Fråga 8');
    rad.push('Fråga 9: ungefär ' + $('q9').value);
    rad.push('Fråga 10: Fördubblingstiden ≈ ' + $('q10').value + ' / räntesatsen');
    rad.push('Fråga 11: Räntelabbet visar ' + $('q11').value + ' år vid 24 %. ' + $('q11t').value);
    rad.push('Fråga 12: ' + $('q12').value);
    tab('t13', 'Fråga 13 (ekvationer med 72-regeln)');
    tab('t13p', 'Fråga 14 (fyra och sexton gånger så stort)');
    rad.push('Fråga 15: ' + $('q12v').value);
    rad.push('Fråga 16: ' + $('q13').value);
    tab('t14', 'Fråga 17 (tredubbling)');
    rad.push('Fråga 18: ' + $('q15').value);`,
   R`tab('t4', 'Question 4');
    rad.push('Question 5: ' + $('q5').value);
    tab('t6', 'Question 6');
    rad.push('  Rate · time ends up close to: ' + $('q6n').value);
    rad.push('Question 7: Amount = ' + $('q7u').value);
    tab('t8', 'Question 8');
    rad.push('Question 9: about ' + $('q9').value);
    rad.push('Question 10: Doubling time ≈ ' + $('q10').value + ' / interest rate');
    rad.push('Question 11: The Interest Lab shows ' + $('q11').value + ' years at 24 %. ' + $('q11t').value);
    rad.push('Question 12: ' + $('q12').value);
    tab('t13', 'Question 13 (equations with the rule of 72)');
    tab('t13p', 'Question 14 (four and sixteen times as large)');
    rad.push('Question 15: ' + $('q12v').value);
    rad.push('Question 16: ' + $('q13').value);
    tab('t14', 'Question 17 (tripling)');
    rad.push('Question 18: ' + $('q15').value);`],
  [R`function klart() { st.textContent = 'Svaren är kopierade.'; }`, R`function klart() { st.textContent = 'Your answers have been copied.'; }`],
  [R`st.textContent = 'Kopieringen misslyckades. Skriv ut sidan i stället.';`, R`st.textContent = 'Copying failed. Print the page instead.';`],
];

const ra = fs.readFileSync(KALLA, 'utf8');
const CRLF = ra.includes('\r\n');
let s = ra.replace(/\r\n/g, '\n');
const saknas = [];
for (const [sv, en] of PAR) {
  if (!s.includes(sv)) { saknas.push(sv.slice(0, 90)); continue; }
  s = s.split(sv).join(en);
}
if (saknas.length) {
  console.error('Hittade inte ' + saknas.length + ' svenska texter (har fordubbling.html ändrats?):');
  saknas.forEach(t => console.error('  - ' + t.replace(/\n/g, ' ')));
  process.exit(1);
}

// Kvarvarande svenska utanför kommentarer?
const utanKommentarer = s
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\s\/\/ .*$/gm, '');
const misstankt = /[åäöÅÄÖ]|\b(och|eller|inte|Rätt|Kontrollera|Ledtråd|Jämför|Nästa|Steg|Visa|Fråga|Räntesats|Belopp|beloppet|räntan|ränta)\b/;
const rader = utanKommentarer.split('\n');
const traffar = [];
rader.forEach((r, i) => {
  // Identifierare i koden (svenska variabelnamn och id) får vara kvar.
  const synligt = r
    .replace(/\b(id|for|class|name|data-[a-z-]+)="[^"]*"/g, '')
    .replace(/\$\('[^']*'\)/g, '')
    .replace(/'#[^']*'/g, '');
  const kod = /^\s*(var|function|if|else|for|return|\}|\{|svar\.|bank\.|\[|document|\$|rader|kort|tr\.|el\.|ut\.|v\.|g\.|par\.|ORD)/.test(synligt);
  const strangar = (synligt.match(/'[^']*'/g) || []).join(' ');
  const text = kod ? strangar : synligt.replace(/<[^>]+>/g, ' ');
  if (misstankt.test(text)) traffar.push((i + 1) + ': ' + r.trim().slice(0, 140));
});
if (traffar.length) {
  console.error('Svensk text kvar i den engelska versionen:');
  traffar.forEach(t => console.error('  ' + t));
  process.exit(1);
}
fs.writeFileSync(MAL, CRLF ? s.replace(/\n/g, '\r\n') : s);
console.log('Skrev ' + path.relative(process.cwd(), MAL) + ' (' + PAR.length + ' översatta texter).');
