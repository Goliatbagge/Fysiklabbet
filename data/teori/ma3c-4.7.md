---
id: ma3c-4.7
title: Extremvärdesproblem med digitalt hjälpmedel
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.7'
---

# Extremvärdesproblem med digitalt hjälpmedel

När vi löser extremvärdesproblem med derivata gör vi en **algebraisk
lösning**: vi ställer upp en formel, deriverar, sätter derivatan lika med
noll och löser ut den obekanta variabeln. Vi kan även lösa
extremvärdesproblem med **digitala hjälpmedel**, t.ex. Geogebra. Då ritar
vi i stället upp grafen för den funktion som ska optimeras och läser av
eventuella extrempunkter direkt i grafen — utan att derivera för hand.

::: tips "Så löser du ett extremvärdesproblem grafiskt i Geogebra"
1. Ställ upp en formel för den storhet som ska optimeras (t.ex. en volym eller en area).
2. Utnyttja ett bivillkor för att uttrycka storheten som en funktion av **en enda** variabel.
3. Skriv in funktionen i Geogebras inmatningsfält och anpassa koordinataxlarna så att den intressanta delen av grafen syns.
4. Använd verktyget **Extrempunkt** och klicka på grafen.
5. Läs av koordinaterna: $x$-koordinaten ger värdet på den variabel som efterfrågas, $y$-koordinaten ger själva det optimerade värdet.
:::

Metoden fungerar på precis samma typ av problem som den algebraiska
metoden, men kräver ingen derivering för hand. Nackdelen är att vi bara
får ett avläst, avrundat värde — inte ett exakt uttryck.

::: exempel "Exempel 1 — Optimera en cylindervolym grafiskt"
**En cylinder ska tillverkas där summan av höjden och diametern ska vara
50 cm. Vilken radie ska cylindern ha för att den ska få så stor volym som
möjligt?**

Eftersom volymen ska optimeras ställer vi upp formeln för volymen hos en
cylinder.

$$
V = \pi r^2 h \qquad (1)
$$

Volymen beror av två variabler, radien $r$ och höjden $h$. För att vi ska
kunna optimera volymen måste vi uttrycka den i **en enda variabel**. Vi
utnyttjar att summan av höjden och diametern ska vara 50 cm. Kom ihåg att
diametern $d = 2r$, vilket ger

$$
h + 2r = 50
$$

Vi löser ut $h$ och får

$$
h = 50 - 2r
$$

Vi sätter in $h = 50 - 2r$ i formel (1), vilket ger

$$
V = \pi r^2(50 - 2r) = 50\pi r^2 - 2\pi r^3
$$

Vi har nu skrivit volymen $V$ som en funktion av den enda variabeln $r$:

$$
V(r) = 50\pi r^2 - 2\pi r^3
$$

Vi skriver in $V(r) = 50\pi r^2 - 2\pi r^3$ i inmatningsfältet i Geogebra
och anpassar koordinataxlarna med panoreringsverktyget så att grafens topp
syns. Grafen är en tredjegradskurva som stiger från origo upp till ett
maximum och sedan avtar mot allt mer negativa värden.

Vi använder därefter verktyget **Extrempunkt** och klickar på grafen.
Eftersom det är radien (den oberoende variabeln) som efterfrågas läser vi
av $x$-koordinaten för extrempunkten. Geogebra markerar punkten $B$ och
visar

$$
B = (16.66667, 14544.41043)
$$

(Geogebra visar decimaltal med punkt som decimaltecken, inte komma.)
$x$-koordinaten ger radien och $y$-koordinaten anger samtidigt den
maximala volymen i cm³. Vi ser att maximal volym fås vid radien
$r = 16{,}666\ldots \approx 16{,}7$ cm.

Även vid en grafisk lösning bör man kontrollera att svaret är rimligt: här
måste $0 < r < 25$ gälla, eftersom höjden $h = 50 - 2r$ annars blir
negativ. Radien $r \approx 16{,}7$ cm ligger inom detta intervall, så
svaret är rimligt.

**Svar:** $r \approx 16{,}7$ cm
:::
