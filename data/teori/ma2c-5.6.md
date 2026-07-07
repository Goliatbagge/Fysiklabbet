---
id: ma2c-5.6
title: Logaritmer med andra baser
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.6'
---

# Logaritmer med andra baser

Ekvationen $10^x = 16$ kan lösas med hjälp av "10-logaritmen för 16"
som skrivs $x = \lg 16$.

På motsvarande sätt kan ekvationen $2^x = 16$ lösas med "2-logaritmen
för 16" som skrivs $x = \log_2 16$.

::: formel "Generella logaritmer"
Ekvationen $a^x = b$ har lösningen

$$
x = \log_a b
$$
:::

De tidigare logaritmlagarna och sambanden gäller även för andra baser
än 10. På samma sätt som att $10^{\lg 3} = 3$ gäller att
$7^{\log_7 3} = 3$ och $5^{\log_5 12} = 12$ och så vidare.

("10-logaritmen" kan även skrivas $\log_{10}$, men eftersom den är så
vanlig används det förkortade skrivsättet "lg".)

::: exempel "Exempel 1 — Lös med generell logaritm"
**Lös $3^x = 25$.**

Enligt definitionen av generella logaritmer är lösningen "3-logaritmen
för 25":

$$
x = \log_3 25
$$

**Svar:** $x = \log_3 25$
:::

::: exempel "Exempel 2 — Bestäm utan räknare"
**Bestäm utan räknare<br>a) $\log_2 16$&emsp;&emsp;b) $\log_3 9$**

**a)** $\log_2 16$ kan tolkas "vad 2 ska upphöjas till för att bli
16". Då $2^4 = 16$ gäller $\log_2 16 = 4$.

**Svar:** 4

**b)** $\log_3 9$ kan tolkas "vad 3 ska upphöjas till för att bli 9".
Då $3^2 = 9$ gäller $\log_3 9 = 2$.

**Svar:** 2
:::

::: exempel "Exempel 3 — Skriv som en potens"
**Skriv 24 som en potens med basen 3.**

Talet som 3 ska upphöjas till för att bli 24 är (per definition)
$\log_3 24$. Alltså gäller

$$
3^{\log_3 24} = 24
$$

**Svar:** $3^{\log_3 24}$
:::
