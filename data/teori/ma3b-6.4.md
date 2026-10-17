---
id: ma3b-6.4
title: Geometrisk summa
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.4'
---

# Geometrisk summa

I de förra avsnitten har vi bestämt enskilda element i geometriska
talföljder, till exempel hur mycket ett belopp har vuxit efter ett visst
antal år. Ofta vill man i stället veta hur mycket **alla elementen blir
tillsammans**. Sätter du in pengar på ett sparkonto varje år är det just
summan av alla insättningarna, med ränta, som står på kontot till slut.

En summa av elementen i en geometrisk talföljd kallas en **geometrisk
summa**. Summan av de $n$ första elementen betecknas $s_n$.

::: kuriosa "Schackbrädet och riskornen"
Enligt en gammal berättelse fick schackspelets uppfinnare önska sig en
belöning av kungen. Han bad om ett riskorn på brädets första ruta, två
korn på den andra, fyra på den tredje och så vidare, med dubbelt så
många korn på varje ny ruta. Kungen tyckte att det lät som en blygsam
önskan. Ett schackbräde har 64 rutor, så antalet korn blir

$$
1 + 2 + 4 + 8 + \ldots + 2^{63}
$$

Det är en geometrisk summa med kvoten 2. Med formeln nedan blir summan
$2^{64} - 1$, vilket är ungefär $1{,}8 \cdot 10^{19}$ korn. Det är
hundratals gånger mer ris än vad hela världen skördar på ett år.
:::

::: formel "Geometrisk summa"
Summan av de $n$ första elementen i en geometrisk talföljd är

$$
s_n = a_1 + a_1 \cdot k + a_1 \cdot k^2 + \ldots + a_1 \cdot k^{n-1} = \frac{a_1(k^n - 1)}{k - 1}
$$

där

- $s_n$ = summa av de $n$ första elementen
- $a_1$ = första element
- $k$ = kvot ($k \neq 1$)
- $n$ = antal termer

::: härledning "Härledning — formeln för geometrisk summa"
Vi skriver ut summan, term för term:

$$
s_n = a_1 + a_1 k + a_1 k^2 + \ldots + a_1 k^{n-1} \tag{1}
$$

Vi multiplicerar båda led med kvoten $k$. Varje term flyttar då ett steg
uppåt i talföljden:

$$
k \cdot s_n = a_1 k + a_1 k^2 + \ldots + a_1 k^{n-1} + a_1 k^n \tag{2}
$$

Nästan alla termer finns i båda summorna. Bara $a_1$ i (1) och
$a_1 k^n$ i (2) saknar en partner. Därför försvinner alla de andra
termerna när vi subtraherar (1),
$s_n = a_1 + a_1 k + \ldots + a_1 k^{n-1}$, från (2):

$$
k \cdot s_n - s_n = a_1 k^n - a_1
$$

Vi bryter ut $s_n$ i vänsterledet och $a_1$ i högerledet:

$$
s_n(k - 1) = a_1(k^n - 1)
$$

Till sist dividerar vi båda led med $k - 1$. Det går eftersom
$k \neq 1$, och då är $k - 1 \neq 0$:

$$
s_n = \frac{a_1(k^n - 1)}{k - 1}
$$
:::
:::

Är kvoten mindre än 1 blir både täljaren och nämnaren negativa, men
kvoten mellan dem blir ändå positiv. Formeln fungerar alltså för alla
kvoter utom $k = 1$. (Är $k = 1$ är alla termer lika med $a_1$, och då
är summan helt enkelt $n \cdot a_1$.)

::: tips "Så hittar du $a_1$, $k$ och $n$ i en summa"
1. $a_1$ är summans första term.
2. Kvoten $k$ får du genom att dividera en term med termen före, till
   exempel $k = \dfrac{a_2}{a_1}$.
3. $n$ är antalet termer. Står den sista termen skriven som
   $a_1 \cdot k^{n-1}$ är exponenten $n - 1$, så antalet termer är
   **exponenten plus 1**. Står den sista termen som ett tal löser du
   ekvationen $a_1 \cdot k^{n-1} = \text{sista termen}$.
:::

::: exempel "Exempel 1 — Bestäm summan"
**Bestäm<br>a) summan $3 + 6 + 12 + \ldots + 3 \cdot 2^{9}$<br>b) summan av de 8 första elementen i den geometriska talföljden $200,\ 100,\ 50,\ \ldots$**

::: handskrift
typ: geosumma
:::

::: textlosning
**a)** Första termen är $a_1 = 3$. Kvoten är $k = \dfrac{6}{3} = 2$.
Den sista termen $3 \cdot 2^9$ är $a_n = a_1 \cdot k^{n-1}$, så
$n - 1 = 9$. Summan har alltså $n = 10$ termer. Insättning i
$s_n = \dfrac{a_1(k^n - 1)}{k - 1}$ ger

$$
s_{10} = \frac{3(2^{10} - 1)}{2 - 1} = \frac{3 \cdot 1\,023}{1} = 3\,069
$$

**Svar:** 3 069

**b)** Första elementet är $a_1 = 200$ och kvoten är
$k = \dfrac{100}{200} = 0{,}5$. Vi ska summera $n = 8$ element.

$$
s_8 = \frac{200(0{,}5^8 - 1)}{0{,}5 - 1} = \frac{-199{,}21875}{-0{,}5} = 398{,}4375
$$

Både täljaren och nämnaren är negativa, så summan blir positiv, precis
som den ska när alla termer är positiva.

**Svar:** 398,4375
:::
:::

::: exempel "Exempel 2 — Hur många termer?"
**Summan $5 + 15 + 45 + \ldots + 98\,415$ är en geometrisk summa.<br>a) Hur många termer har summan?<br>b) Bestäm summan.**

::: handskrift
typ: geotermer
:::

::: textlosning
**a)** Första termen är $a_1 = 5$ och kvoten är $k = \dfrac{15}{5} = 3$.
Den sista termen är $a_n = 5 \cdot 3^{n-1}$, och den ska vara 98 415:

$$
5 \cdot 3^{n-1} = 98\,415
$$

Vi dividerar båda led med 5:

$$
3^{n-1} = 19\,683
$$

Den obekanta står i exponenten, så vi logaritmerar båda led och flyttar
ned exponenten med logaritmlagen:

$$
\lg 3^{n-1} = \lg 19\,683
$$

$$
(n - 1) \cdot \lg 3 = \lg 19\,683
$$

Vi dividerar båda led med $\lg 3$:

$$
n - 1 = \frac{\lg 19\,683}{\lg 3} = 9
$$

Vi adderar 1 till båda led:

$$
n = 10
$$

**Svar:** 10 termer

**b)** Nu vet vi att $a_1 = 5$, $k = 3$ och $n = 10$. Insättning i
$s_n = \dfrac{a_1(k^n - 1)}{k - 1}$ ger

$$
s_{10} = \frac{5(3^{10} - 1)}{3 - 1} = \frac{5 \cdot 59\,048}{2} = 147\,620
$$

**Svar:** 147 620
:::
:::

## Regelbundet sparande

Anta att du sätter in 5 000 kr på ett sparkonto **i slutet av varje år**,
och att räntan är 2,8 %. Förändringsfaktorn är då 1,028. Varje insättning
växer med ränta från den dag den sätts in. Den första insättningen görs i
slutet av år 1 och hinner växa i 9 år, fram till slutet av år 10. Den
sista insättningen görs i slutet av år 10 och hinner inte växa alls.
Figuren nedan visar hur länge varje insättning växer.

::: figur
<svg viewBox="-73.3 -4 400.9 190" width="664" height="315" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tidslinje över tio år. Insättningarna 1, 2, 3, 9 och 10 görs i slutet av år 1, 2, 3, 9 och 10. En pil från varje insättning till år 10 visar hur länge den växer: insättning 1 blir 5 000 gånger 1,028 upphöjt till 9, insättning 2 blir 5 000 gånger 1,028 upphöjt till 8, och den sista insättningen, 5 000 kr, hinner inte växa alls."><line x1="250" y1="2" x2="250" y2="150" stroke="#1f2530" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/><text x="-6" y="18" font-size="11" text-anchor="end" fill="#1f2530">Insättning 1</text><line x1="52" y1="14" x2="242" y2="14" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,14 241,10.4 241,17.6" fill="#2b5ca8"/><circle cx="52" cy="14" r="3.2" fill="#1f2530"/><text x="258" y="18" font-size="11" fill="#1f2530">5&#160;000 · 1,028<tspan dy="-5" font-size="8">9</tspan></text><text x="-6" y="40" font-size="11" text-anchor="end" fill="#1f2530">Insättning 2</text><line x1="74" y1="36" x2="242" y2="36" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,36 241,32.4 241,39.6" fill="#2b5ca8"/><circle cx="74" cy="36" r="3.2" fill="#1f2530"/><text x="258" y="40" font-size="11" fill="#1f2530">5&#160;000 · 1,028<tspan dy="-5" font-size="8">8</tspan></text><text x="-6" y="62" font-size="11" text-anchor="end" fill="#1f2530">Insättning 3</text><line x1="96" y1="58" x2="242" y2="58" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,58 241,54.4 241,61.6" fill="#2b5ca8"/><circle cx="96" cy="58" r="3.2" fill="#1f2530"/><text x="258" y="62" font-size="11" fill="#1f2530">5&#160;000 · 1,028<tspan dy="-5" font-size="8">7</tspan></text><circle cx="162" cy="74" r="1.3" fill="#1f2530"/><circle cx="162" cy="80" r="1.3" fill="#1f2530"/><circle cx="162" cy="86" r="1.3" fill="#1f2530"/><text x="-6" y="108" font-size="11" text-anchor="end" fill="#1f2530">Insättning 9</text><line x1="228" y1="104" x2="242" y2="104" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,104 241,100.4 241,107.6" fill="#2b5ca8"/><circle cx="228" cy="104" r="3.2" fill="#1f2530"/><text x="258" y="108" font-size="11" fill="#1f2530">5&#160;000 · 1,028</text><text x="-6" y="130" font-size="11" text-anchor="end" fill="#1f2530">Insättning 10</text><circle cx="250" cy="126" r="3.2" fill="#1f2530"/><text x="258" y="130" font-size="11" fill="#1f2530">5&#160;000</text><line x1="30" y1="150" x2="264" y2="150" stroke="#1f2530" stroke-width="1.4"/><polygon points="272,150 262,145.5 262,154.5" fill="#1f2530"/><line x1="30" y1="147" x2="30" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="166" font-size="11" text-anchor="middle" fill="#1f2530">0</text><line x1="52" y1="147" x2="52" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="52" y="166" font-size="11" text-anchor="middle" fill="#1f2530">1</text><line x1="74" y1="147" x2="74" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="74" y="166" font-size="11" text-anchor="middle" fill="#1f2530">2</text><line x1="96" y1="147" x2="96" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="96" y="166" font-size="11" text-anchor="middle" fill="#1f2530">3</text><line x1="118" y1="147" x2="118" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="118" y="166" font-size="11" text-anchor="middle" fill="#1f2530">4</text><line x1="140" y1="147" x2="140" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="140" y="166" font-size="11" text-anchor="middle" fill="#1f2530">5</text><line x1="162" y1="147" x2="162" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="162" y="166" font-size="11" text-anchor="middle" fill="#1f2530">6</text><line x1="184" y1="147" x2="184" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="184" y="166" font-size="11" text-anchor="middle" fill="#1f2530">7</text><line x1="206" y1="147" x2="206" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="206" y="166" font-size="11" text-anchor="middle" fill="#1f2530">8</text><line x1="228" y1="147" x2="228" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="228" y="166" font-size="11" text-anchor="middle" fill="#1f2530">9</text><line x1="250" y1="147" x2="250" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="250" y="166" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="272" y="181" font-size="11" text-anchor="end" fill="#1f2530">År</text></svg>

Varje pil visar hur många år insättningen växer fram till slutet av år 10.
:::

Direkt efter den tionde insättningen är behållningen summan av alla
insättningarnas värden. Vi skriver den med den sista insättningen först:

$$
5\,000 + 5\,000 \cdot 1{,}028 + 5\,000 \cdot 1{,}028^2 + \ldots + 5\,000 \cdot 1{,}028^9
$$

Det är en geometrisk summa. Första termen är $a_1 = 5\,000$, kvoten är
förändringsfaktorn $k = 1{,}028$, och antalet termer är $n = 10$, en term
för varje insättning.

::: tips "Regelbundet sparande: håll koll på tidpunkterna"
1. Antalet termer $n$ är lika med **antalet insättningar**.
2. Kvoten $k$ är **förändringsfaktorn**, till exempel $1{,}028$ för
   2,8 % ränta.
3. Första termen $a_1$ är det som den **sista** insättningen har vuxit
   till. Görs den sista insättningen samma dag som du räknar ut
   behållningen har den inte vuxit alls, och då är $a_1$ lika med
   insättningen.
4. Görs insättningarna i **början** av varje år och du räknar ut
   behållningen i slutet av sista året, har varje insättning vuxit ett
   år till. Då är $a_1 = \text{insättningen} \cdot k$.
:::

::: exempel "Exempel 3 — Sparkontot"
**Elin sätter in 5 000 kr på ett sparkonto i slutet av varje år. Räntan är 2,8 %.<br>a) Hur mycket finns på kontot direkt efter den tionde insättningen?<br>b) Hur mycket hade funnits på kontot i slutet av det tionde året om Elin i stället hade satt in pengarna i början av varje år?**

::: handskrift
typ: geosparkonto
:::

::: textlosning
**a)** Behållningen är summan av de tio insättningarnas värden, med den
sista insättningen först (se figuren ovan):

$$
5\,000 + 5\,000 \cdot 1{,}028 + \ldots + 5\,000 \cdot 1{,}028^9
$$

Det är en geometrisk summa med $a_1 = 5\,000$, $k = 1{,}028$ och
$n = 10$. Insättning i $s_n = \dfrac{a_1(k^n - 1)}{k - 1}$ ger

$$
s_{10} = \frac{5\,000(1{,}028^{10} - 1)}{1{,}028 - 1} = 56\,794{,}242\ldots \approx 56\,794{,}24
$$

Samma svar fick vi när vi räknade ut behållningen år för år i ett
kalkylblad i Matematik nivå 1b.

**Svar:** 56 794,24 kr

**b)** Nu sätts varje insättning in ett år tidigare. Den sista
insättningen görs i början av år 10 och hinner växa i ett år, så den har
vuxit till

$$
5\,000 \cdot 1{,}028 = 5\,140
$$

Alla de andra insättningarna har också vuxit ett år mer än i a). Summan
är fortfarande geometrisk, med $a_1 = 5\,140$, $k = 1{,}028$ och
$n = 10$:

$$
s_{10} = \frac{5\,140(1{,}028^{10} - 1)}{1{,}028 - 1} = 58\,384{,}481\ldots \approx 58\,384{,}48
$$

Det är 1 590,24 kr mer än i a). Pengarna har ju fått växa ett år
längre.

**Svar:** 58 384,48 kr
:::
:::

::: exempel "Exempel 4 — Hur länge måste Elin spara?"
**Elin fortsätter att sätta in 5 000 kr i slutet av varje år, med räntan 2,8 %. Hur många insättningar behövs för att behållningen direkt efter den sista insättningen ska bli minst 100 000 kr?**

::: handskrift
typ: geospartid
:::

::: textlosning
Efter $n$ insättningar är behållningen en geometrisk summa med
$a_1 = 5\,000$, $k = 1{,}028$ och $n$ termer. Vi tar reda på när den är
lika med 100 000 kr:

$$
\frac{5\,000(1{,}028^n - 1)}{1{,}028 - 1} = 100\,000
$$

Nämnaren är $1{,}028 - 1 = 0{,}028$. Vi multiplicerar båda led med
0,028:

$$
5\,000(1{,}028^n - 1) = 2\,800
$$

Vi dividerar båda led med 5 000:

$$
1{,}028^n - 1 = 0{,}56
$$

Vi adderar 1 till båda led:

$$
1{,}028^n = 1{,}56
$$

Den obekanta står i exponenten, så vi logaritmerar båda led och flyttar
ned exponenten med logaritmlagen:

$$
\lg 1{,}028^n = \lg 1{,}56
$$

$$
n \cdot \lg 1{,}028 = \lg 1{,}56
$$

Vi dividerar båda led med $\lg 1{,}028$:

$$
n = \frac{\lg 1{,}56}{\lg 1{,}028} = 16{,}10\ldots
$$

Antalet insättningar måste vara ett heltal. Efter 16 insättningar har
behållningen ännu inte nått 100 000 kr, så det behövs en insättning
till. Vi kontrollerar:

$$
s_{16} = \frac{5\,000(1{,}028^{16} - 1)}{1{,}028 - 1} \approx 99\,209
$$

$$
s_{17} = \frac{5\,000(1{,}028^{17} - 1)}{1{,}028 - 1} \approx 106\,987
$$

**Svar:** 17 insättningar
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Geometrisk summa"
- Summan av elementen i en geometrisk talföljd.
- $s_n$ är summan av de $n$ första elementen.
- Formeln gäller för alla kvoter utom $k = 1$:
  $s_n = \dfrac{a_1(k^n - 1)}{k - 1}$.
:::

::: sampunkt "Hitta $a_1$, $k$ och $n$"
- $a_1$ är första termen.
- $k = \dfrac{a_2}{a_1}$, en term delad med termen före.
- $n$ är antalet termer: exponenten i sista termen **plus 1**.
:::

::: sampunkt "Okänt antal termer"
- Sätt sista termen lika med $a_1 \cdot k^{n-1}$, eller summan lika med
  formeln.
- Lös ut potensen och logaritmera båda led.
- Antalet termer är ett heltal: avrunda åt rätt håll.
:::

::: sampunkt "Regelbundet sparande"
- Behållningen är en geometrisk summa med $k$ = förändringsfaktorn.
- $n$ = antalet insättningar.
- $a_1$ = det som den sista insättningen har vuxit till.
- Insättning i början av året: varje insättning växer ett år till.
:::
:::
