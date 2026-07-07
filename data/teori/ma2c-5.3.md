---
id: ma2c-5.3
title: Exponentialekvationer och tiologaritmer
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.3'
---

# Exponentialekvationer och tiologaritmer

Kom ihåg: ett tal kan skrivas med basen 10 enligt

$$
a = 10^{\lg a} \qquad \text{där } a > 0
$$

För att lösa exponentialekvationer med hjälp av tiologaritmer använder
vi principen att om två potenser med samma bas är lika, så måste också
deras exponenter vara lika. Exempelvis, om $2^x = 2^7$, så måste
$x = 7$.

::: tips "Lösa exponentialekvationer med tiologaritmer"
1. Skriv om båda led med basen 10 enligt principen $a = 10^{\lg a}$.
2. Förenkla med potenslagarna.
3. Sätt exponenterna lika och lös ekvationen.
:::

En ekvation där variabeln finns i logaritmen, t.ex. $\lg x = 3$, kallas
**logaritmekvation**. Dessa löser vi enklast genom att skriva om
ekvationen från logaritmform till potensform och sedan lösa ekvationen
enligt tidigare metoder.

::: tips "Lösa logaritmekvationer"
$$
\lg x = a \ \text{(logaritmform)} \iff 10^a = x \ \text{(potensform)}
$$

Omskrivning från logaritmform till potensform med ord: "10 upphöjt
till det som står i högra ledet är lika med det vi har logaritmen
för."
:::

::: exempel "Exempel 1 — Lös ekvationerna"
**Lös ekvationerna nedan. Svara exakt och med två decimaler.<br>a) $10^x = 53$&emsp;&emsp;b) $2^x = 37$&emsp;&emsp;c) $5 \cdot 3^{2x} - 4 = 31$**

**a)** Vi skriver om HL till basen 10 och sätter sedan exponenterna
lika:

$$
10^x = 10^{\lg 53}
$$

$$
x = \lg 53 \approx 1{,}72
$$

(Om du direkt från ekvationen $10^x = 53$ ser att $x = \lg 53$,
utifrån definitionen, går det bra att skriva det direkt, utan
mellanled.)

**Svar:** $x = \lg 53 \approx 1{,}72$

**b)** Vi skriver om båda led till basen 10 och förenklar med
potenslagarna:

$$
\left(10^{\lg 2}\right)^x = 10^{\lg 37}
$$

$$
10^{x \cdot \lg 2} = 10^{\lg 37}
$$

Vi kan nu sätta exponenterna lika och får

$$
x \cdot \lg 2 = \lg 37
$$

Division med lg 2 i båda led ger

$$
x = \frac{\lg 37}{\lg 2} \approx 5{,}21
$$

**Svar:** $x = \dfrac{\lg 37}{\lg 2} \approx 5{,}21$

**c)** Vi börjar med att lösa ut potensen $3^{2x}$. Vi adderar 4 till
båda led och dividerar sedan med 5:

$$
5 \cdot 3^{2x} = 35
$$

$$
3^{2x} = 7
$$

Skriver om båda led till basen 10 och förenklar med potenslagarna:

$$
\left(10^{\lg 3}\right)^{2x} = 10^{\lg 7}
$$

$$
10^{2x \cdot \lg 3} = 10^{\lg 7}
$$

Sätter exponenterna lika och löser ekvationen:

$$
2x \cdot \lg 3 = \lg 7
$$

$$
x = \frac{\lg 7}{2 \cdot \lg 3} \approx 0{,}89
$$

**Svar:** $x = \dfrac{\lg 7}{2 \cdot \lg 3} \approx 0{,}89$
:::

::: exempel "Exempel 2 — Lös logaritmekvationerna"
**Lös<br>a) $\lg x = 3$&emsp;&emsp;b) $\lg 5x = 2{,}7$**

**a)** Vi skriver om ekvationen till potensform. "10 upphöjt till det
som står i högra ledet, ska bli det vi har logaritmen för."

$$
10^3 = x
$$

$$
x = 1\,000
$$

(Om du direkt från ekvationen ser att $x = 1\,000$ eftersom
$\lg 1\,000 = 3$, går det bra att skriva det direkt, utan mellanled.)

**Svar:** $x = 1\,000$

**b)** Vi skriver om ekvationen till potensform:

$$
10^{2{,}7} = 5x
$$

Division med 5 i båda led ger

$$
x = \frac{10^{2{,}7}}{5} \approx 100{,}24
$$

**Svar:** $x \approx 100{,}24$
:::
