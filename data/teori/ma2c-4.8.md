---
id: ma2c-4.8
title: Likformiga trianglar
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.8'
---

# Likformiga trianglar

Trianglar med samma form kallas **likformiga trianglar** och är ett
specialfall av likformiga månghörningar. Precis som för likformiga
månghörningar gäller att likformiga trianglar kan vara olika stora,
vridna olika mycket och spegelvända. Precis som för likformiga
månghörningar gäller även att i likformiga trianglar är motsvarande
vinklar lika stora och sidförhållandet mellan motsvarande sidor är
lika.

Skillnaden är att för att bestämma om två trianglar är likformiga
räcker det att undersöka **ETT** av villkoren för vinklar och
sidförhållanden (för månghörningar med mer än tre hörn behövde vi
undersöka både vinklar och sidförhållanden).

::: tips "Likformiga trianglar"
Två trianglar är likformiga om

- motsvarande vinklar är lika stora **ELLER**
- förhållandet mellan motsvarande sidor är lika

Tecknet ~ betyder "är likformig med". "Triangeln ABC är likformig med
triangeln DEF" kan alltså skrivas $\triangle ABC \sim \triangle DEF$.
:::

Det räcker att undersöka om två vinklar är lika för att säga att två
trianglar är likformiga (eftersom den tredje vinkeln då måste vara
samma, på grund av vinkelsumman i trianglar).

::: exempel "Exempel 1 — Jämför vinklarna"
**Är trianglarna likformiga?**

::: figur
<svg viewBox="36 16 548 82" width="548" height="82" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Två långsmala, likformiga trianglar: triangeln A B C med vinklarna 128 grader vid A och 12 grader vid C, och den större triangeln D E F med vinklarna 40 grader vid E och 12 grader vid F."><polygon points="80.7,37.9 50.4,69.3 215,52" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="79" y="30" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="46" y="82" font-size="12" text-anchor="middle" fill="#1f2530">B</text><text x="222" y="56" font-size="12" text-anchor="start" fill="#1f2530">C</text><path d="M 90.6,38.9 A 10 10 0 0 1 73.8,45.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="100" y="55" font-size="10" text-anchor="middle" fill="#1f2530">128°</text><path d="M 66.3,67.6 A 16 16 0 0 0 61.5,57.8" fill="none" stroke="#1f2530" stroke-width="1"/><text x="77.4" y="59.5" font-size="10" text-anchor="middle" fill="#1f2530">40°</text><path d="M 179.2,55.8 A 36 36 0 0 1 179.2,48.2" fill="none" stroke="#1f2530" stroke-width="1"/><text x="157" y="55.5" font-size="10" text-anchor="middle" fill="#1f2530">12°</text><polygon points="398.9,41.1 362.6,78.8 560,58" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="397" y="34" font-size="12" text-anchor="middle" fill="#1f2530">D</text><text x="356" y="91" font-size="12" text-anchor="middle" fill="#1f2530">E</text><text x="567" y="62" font-size="12" text-anchor="start" fill="#1f2530">F</text><path d="M 408.8,42.1 A 10 10 0 0 1 392,48.3" fill="none" stroke="#1f2530" stroke-width="1"/><text x="430" y="61.5" font-size="10" text-anchor="middle" fill="#1f2530">128°</text><path d="M 378.5,77.1 A 16 16 0 0 0 373.7,67.3" fill="none" stroke="#1f2530" stroke-width="1"/><text x="389.6" y="69" font-size="10" text-anchor="middle" fill="#1f2530">40°</text><path d="M 524.2,61.8 A 36 36 0 0 1 524.2,54.2" fill="none" stroke="#1f2530" stroke-width="1"/><text x="502" y="61.5" font-size="10" text-anchor="middle" fill="#1f2530">12°</text></svg>
:::

Vi undersöker motsvarande vinklar.

I $\triangle ABC$: $A = 128°$ och $C = 12°$ är givna, så

$$
B = 180° - 128° - 12° = 40° \quad \text{(vinkelsumma i triangel)}
$$

I $\triangle DEF$: $E = 40°$ och $F = 12°$ är givna, så

$$
D = 180° - 12° - 40° = 128° \quad \text{(vinkelsumma i triangel)}
$$

Motsvarande vinklar ($A = D = 128°$, $B = E = 40°$ och $C = F = 12°$)
är lika stora, så trianglarna är likformiga:
$\triangle ABC \sim \triangle DEF$.

**Svar:** Ja
:::

::: exempel "Exempel 2 — Jämför sidförhållandena"
**Är trianglarna likformiga?**

::: figur
<svg viewBox="4 0 260 130" width="260" height="130" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Två rätvinkliga trianglar: A B C med sidorna 2,7, 3,6 och 4,5 centimeter, och den spegelvända D E F med sidorna 4,5, 6,0 och 7,5 centimeter."><polygon points="20,110 74,110 74,38" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="16" y="124" font-size="11" text-anchor="middle" fill="#1f2530">A</text><text x="78" y="124" font-size="11" text-anchor="middle" fill="#1f2530">B</text><text x="78" y="34" font-size="11" text-anchor="middle" fill="#1f2530">C</text><text x="47" y="124" font-size="10" text-anchor="middle" fill="#1f2530">2,7</text><text x="82" y="78" font-size="10" text-anchor="start" fill="#1f2530">3,6</text><text x="38" y="70" font-size="10" text-anchor="end" fill="#1f2530">4,5</text><polygon points="128,110 218,110 128,14" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="124" y="124" font-size="11" text-anchor="middle" fill="#1f2530">D</text><text x="223" y="124" font-size="11" text-anchor="middle" fill="#1f2530">E</text><text x="124" y="10" font-size="11" text-anchor="middle" fill="#1f2530">F</text><text x="173" y="124" font-size="10" text-anchor="middle" fill="#1f2530">4,5</text><text x="122" y="66" font-size="10" text-anchor="end" fill="#1f2530">6,0</text><text x="182" y="60" font-size="10" text-anchor="start" fill="#1f2530">7,5</text><text x="258" y="24" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

Vi undersöker sidförhållandena.

$$
\frac{AB}{DE} = \frac{2{,}7}{4{,}5} = 0{,}6
$$

$$
\frac{BC}{DF} = \frac{3{,}6}{6{,}0} = 0{,}6 \quad \text{(observera att högra triangeln är spegelvänd)}
$$

$$
\frac{AC}{EF} = \frac{4{,}5}{7{,}5} = 0{,}6
$$

Sidförhållandena är lika (0,6), alltså är trianglarna likformiga.

**Svar:** Ja
:::

::: exempel "Exempel 3 — Flaggstången"
**Alva ska bestämma höjden hos en flaggstång en solig sommardag. Hon är
1,60 meter lång och får en skugga som är 1,20 meter. Hon mäter sedan
längden på flaggstångens skugga till 6,75 meter. Hur hög är
flaggstången?**

Eftersom flaggstången och Alva träffas under samma vinkel av solens
strålar måste vinkeln som bildas mot höjden vara lika i båda trianglar.
Båda trianglar har dessutom en rät vinkel. Vi ritar en skiss över
flaggstången och Alva.

::: figur
<svg viewBox="6 6 268 128" width="268" height="128" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Två rätvinkliga trianglar: en stor med den lodräta sidan x och basen 6,75 meter, och en liten med den lodräta sidan 1,60 meter och basen 1,20 meter."><polygon points="30,14 30,110 138,110" fill="none" stroke="#1f2530" stroke-width="1.6"/><rect x="30" y="99" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1"/><text x="22" y="66" font-size="11" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="84" y="124" font-size="10" text-anchor="middle" fill="#1f2530">6,75</text><polygon points="196,74 196,110 223,110" fill="none" stroke="#1f2530" stroke-width="1.6"/><rect x="196" y="103" width="7" height="7" fill="none" stroke="#1f2530" stroke-width="1"/><text x="190" y="96" font-size="10" text-anchor="end" fill="#1f2530">1,60</text><text x="210" y="124" font-size="10" text-anchor="middle" fill="#1f2530">1,20</text><text x="272" y="16" font-size="11" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

Trianglarna har alltså två vinklar som är lika stora och därför måste
de vara likformiga. Eftersom sidförhållandena då är lika gäller

$$
\frac{x}{1{,}60} = \frac{6{,}75}{1{,}20}
$$

Vi multiplicerar båda led med 1,60 och får

$$
x = \frac{6{,}75}{1{,}20} \cdot 1{,}60 = 9{,}00
$$

**Svar:** 9,00 meter
:::
