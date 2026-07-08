---
id: ma3c-6.3
title: Trigonometriska ekvationer
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.3'
---

# Trigonometriska ekvationer

Ekvationer med de trigonometriska funktionerna sinus, cosinus och tangens
kallas **trigonometriska ekvationer**.

::: formel "Lösa trigonometriska ekvationer med enhetscirkeln"
Om vi ska lösa ekvationen

$$
\sin v = a
$$

drar vi linjen $y = a$ (vågrätt) och avläser vinklarna där linjen skär
enhetscirkeln.

Om vi i stället ska lösa ekvationen

$$
\cos v = a
$$

drar vi linjen $x = a$ (lodrätt) och avläser vinklarna där linjen skär
enhetscirkeln (se figurerna nedan).
:::

::: figur
<svg viewBox="12 4 250 242" width="250" height="242" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med en vågrät linje vid y = 0,5 som skär cirkeln i två punkter. Vinklarna räknat moturs från positiva x-axeln är 30 grader och 150 grader."><circle cx="128" cy="128" r="88" fill="none" stroke="#2563c9" stroke-width="1.8"/><line x1="16" y1="128" x2="236" y2="128" stroke="#1f2530" stroke-width="1.4"/><polygon points="244,128 236,123.5 236,132.5" fill="#1f2530"/><line x1="128" y1="240" x2="128" y2="16" stroke="#1f2530" stroke-width="1.4"/><polygon points="128,8 123.5,16 132.5,16" fill="#1f2530"/><line x1="45" y1="84" x2="210" y2="84" stroke="#c8324a" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="128" y1="128" x2="204.2" y2="84" stroke="#1f2530" stroke-width="1.6"/><line x1="128" y1="128" x2="51.8" y2="84" stroke="#1f2530" stroke-width="1.6"/><path d="M154,128 A26,26 0 0 0 150.5,115" fill="none" stroke="#1f2530" stroke-width="1.4"/><path d="M86,128 A42,42 0 0 1 91.6,107" fill="none" stroke="#4a7d3a" stroke-width="1.4"/><circle cx="204.2" cy="84" r="3" fill="#c8324a"/><circle cx="51.8" cy="84" r="3" fill="#c8324a"/><text x="168.6" y="117" font-size="13" fill="#1f2530">30°</text><text x="72.0" y="113" font-size="13" text-anchor="end" fill="#4a7d3a">150°</text><text x="250" y="133" font-size="13" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="136" y="18" font-size="13" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="214" y="79" font-size="13" fill="#c8324a"><tspan font-style="italic">y</tspan> = 0,5</text></svg>

Vi löser $\sin v = 0{,}5$ genom att dra en vågrät linje vid $y = 0{,}5$.
Linjen skär enhetscirkeln i två punkter, vid $v_1 = 30^\circ$ och
$v_2 = 150^\circ$.
:::

::: figur
<svg viewBox="12 4 250 242" width="250" height="242" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Enhetscirkeln med en lodrät linje vid x = 0,5 som skär cirkeln i två punkter. Vinklarna räknat från positiva x-axeln är 60 grader och 300 grader."><circle cx="128" cy="128" r="88" fill="none" stroke="#2563c9" stroke-width="1.8"/><line x1="16" y1="128" x2="236" y2="128" stroke="#1f2530" stroke-width="1.4"/><polygon points="244,128 236,123.5 236,132.5" fill="#1f2530"/><line x1="128" y1="240" x2="128" y2="16" stroke="#1f2530" stroke-width="1.4"/><polygon points="128,8 123.5,16 132.5,16" fill="#1f2530"/><line x1="172" y1="46" x2="172" y2="210" stroke="#c8324a" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="128" y1="128" x2="172" y2="51.8" stroke="#1f2530" stroke-width="1.6"/><line x1="128" y1="128" x2="172" y2="204.2" stroke="#1f2530" stroke-width="1.6"/><path d="M154,128 A26,26 0 0 0 141,105.5" fill="none" stroke="#1f2530" stroke-width="1.4"/><path d="M170,128 A42,42 0 0 1 149,164.4" fill="none" stroke="#4a7d3a" stroke-width="1.4"/><circle cx="172" cy="51.8" r="3" fill="#c8324a"/><circle cx="172" cy="204.2" r="3" fill="#c8324a"/><text x="164.4" y="103" font-size="13" fill="#1f2530">60°</text><text x="178.2" y="161" font-size="13" fill="#4a7d3a">300°</text><text x="250" y="133" font-size="13" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="136" y="18" font-size="13" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="178" y="34" font-size="13" fill="#c8324a"><tspan font-style="italic">x</tspan> = 0,5</text></svg>

Vi löser $\cos v = 0{,}5$ genom att dra en lodrät linje vid $x = 0{,}5$.
Linjen skär enhetscirkeln i två punkter, vid $v_1 = 60^\circ$ och
$v_2 = 300^\circ$.
:::

Observera att vi i intervallet $0^\circ \leq v \leq 360^\circ$ oftast får
**två lösningar**. Egentligen finns det oändligt många lösningar, eftersom
vi kan lägga till hur många multipler av $360^\circ$ som helst till varje
lösning. I den här kursen håller vi oss vanligtvis till lösningar i
intervallet $0^\circ \leq v \leq 360^\circ$.

Eftersom enhetscirkelns radie är 1 kan varken $\sin v$ eller $\cos v$ anta
värden utanför intervallet $[-1, 1]$. Om $|a| > 1$ hamnar linjen $y = a$
(eller $x = a$) helt utanför cirkeln, och ekvationen saknar då lösning.

När vi löser en trigonometrisk ekvation med räknare ger räknaren bara den
minsta lösningen, $v_1$. För att få den andra lösningen $v_2$ i intervallet
$0^\circ \leq v \leq 360^\circ$ måste vi räkna ut den för hand. För sinus
gäller $v_2 = 180^\circ - v_1$. För cosinus gäller $v_2 = 360^\circ - v_1$.
Kontrollera gärna mot exemplen ovan.

::: tips "Lösa trigonometriska ekvationer med räknare"
1. Lös ut den trigonometriska funktionen.
2. Lös ekvationen som vanligt, med inversa funktioner.
3. Ta fram den andra lösningen. För en ekvation med
   - sinus gäller $v_2 = 180^\circ - v_1$
   - cosinus gäller $v_2 = 360^\circ - v_1$
:::

::: exempel "Exempel 1 — Sinus och cosinus för vinklar på enhetscirkeln"
**Använd enhetscirkeln för att bestämma<br>a) $\sin 90^\circ$&emsp;&emsp;b) $\cos 180^\circ$.**

**a)** Vi utgår från den positiva $x$-axeln och roterar $90^\circ$ moturs.
Då hamnar vi högst upp på enhetscirkeln, i punkten $(0, 1)$. Sinus
motsvarar $y$-koordinaten, så

$$
\sin 90^\circ = 1
$$

**Svar:** 1

**b)** Vi roterar i stället $180^\circ$ moturs och hamnar då längst till
vänster på enhetscirkeln, i punkten $(-1, 0)$. Cosinus motsvarar
$x$-koordinaten, så

$$
\cos 180^\circ = -1
$$

**Svar:** $-1$
:::

::: exempel "Exempel 2 — Närmevärden med enhetscirkeln"
**Använd enhetscirkeln för att bestämma ett närmevärde till<br>a) $\sin 45^\circ$&emsp;&emsp;b) $\cos 220^\circ$.**

**a)** Vi sätter en punkt på enhetscirkelns rand vid $45^\circ$. $\sin
45^\circ$ motsvarar $y$-koordinaten här, och avläst mot $y$-axeln ger det
ungefär 0,7.

**Svar:** 0,7

**b)** Vi sätter en punkt på enhetscirkelns rand vid $220^\circ$. $\cos
220^\circ$ motsvarar $x$-koordinaten här, och avläst mot $x$-axeln ger det
ungefär $-0,8$.

**Svar:** $-0,8$
:::

::: exempel "Exempel 3 — Lös trigonometriska ekvationer med enhetscirkeln"
**Använd enhetscirkeln för att lösa ekvationerna nedan i intervallet
$0^\circ \leq v \leq 360^\circ$.<br>a) $\sin v = 0{,}4$&emsp;&emsp;b) $\cos v = 1{,}5$**

**a)** Eftersom sinus motsvarar $y$-koordinaten drar vi en vågrät linje vid
$y = 0{,}4$. Linjen skär enhetscirkeln vid ungefär $20^\circ$ och
$160^\circ$.

**Svar:** $20^\circ$ och $160^\circ$

**b)** Eftersom cosinus motsvarar $x$-koordinaten drar vi en lodrät linje
vid $x = 1{,}5$. Linjen hamnar helt utanför enhetscirkeln (radien är ju bara
1), så ekvationen saknar lösning.

**Svar:** Lösning saknas.
:::

::: exempel "Exempel 4 — Lös en trigonometrisk ekvation med räknare"
**Lös ekvationen $4\cos v + 3{,}28 = 6{,}58$ med räknare. Ange lösningarna i
intervallet $0^\circ \leq v \leq 360^\circ$.**

Vi löser först ut den trigonometriska funktionen $\cos v$.

$$
4\cos v + 3{,}28 - 3{,}28 = 6{,}58 - 3{,}28
$$

$$
4\cos v = 3{,}3
$$

$$
\frac{4\cos v}{4} = \frac{3{,}3}{4}
$$

$$
\cos v = 0{,}825
$$

Sedan bestämmer vi vinkeln $v$ med den inversa funktionen.

$$
v_1 = \cos^{-1}(0{,}825) = 34{,}411\ldots^\circ \approx 34{,}4^\circ
$$

Den andra lösningen får vi genom sambandet $\cos(360^\circ - v) = \cos v$,
dvs. genom att dra bort vinkeln från $360^\circ$.

$$
v_2 = 360^\circ - 34{,}411\ldots^\circ = 325{,}588\ldots^\circ \approx 325{,}6^\circ
$$

**Svar:** $v_1 = 34{,}4^\circ$ och $v_2 = 325{,}6^\circ$
:::
