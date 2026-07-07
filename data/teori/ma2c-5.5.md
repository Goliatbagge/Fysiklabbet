---
id: ma2c-5.5
title: Tillämpningar av logaritmer
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.5'
---

# Tillämpningar av logaritmer

Kom ihåg 1:

::: tips "Modell vid exponentiell förändring"
Vid tillämpningar där något förändras exponentiellt eller t.ex. med en
viss procent varje år ställer vi upp en modell på formen

$$
y = C \cdot a^x
$$

där

- $y$ = nya värdet
- $C$ = startvärdet
- $a$ = förändringsfaktorn
- $x$ = antalet förändringar (ofta tid)
:::

Kom ihåg 2:

::: tips "Lösa exponentialekvationer med tredje logaritmlagen"
1. Logaritmera båda led i ekvationen (sätt lg framför båda uttrycken).
2. Multiplicera ner exponenten, enligt tredje logaritmlagen, och lös
   sedan som vanligt.
:::

::: exempel "Exempel 1 — Sparkontot"
**Du sätter in 10 000 kr på ett konto med årsräntan 2,3 %. Hur lång tid
tar det tills du har över 12 000 kr på kontot?**

Vi har något som växer procentuellt/exponentiellt, så vi ställer upp
formeln

$$
y = C \cdot a^x
$$

I detta fall är

- $y = 12\,000$ (nya värdet)
- $C = 10\,000$ (startvärdet)
- $a = 1{,}023$ (förändringsfaktorn som motsvarar en ökning med
  2,3 %)

Insättning i formeln ovan ger

$$
12\,000 = 10\,000 \cdot 1{,}023^x
$$

Vi dividerar båda led med 10 000, logaritmerar och löser ekvationen:

$$
1{,}2 = 1{,}023^x
$$

$$
\lg 1{,}2 = \lg 1{,}023^x
$$

$$
\lg 1{,}2 = x \cdot \lg 1{,}023
$$

Division med lg 1,023 i båda led ger

$$
x = \frac{\lg 1{,}2}{\lg 1{,}023} \approx 8{,}02
$$

Eftersom räntan betalas ut i slutet av varje år kommer inte beloppet
att växa över 12 000 kr förrän efter 9 år.

**Svar:** Efter 9 år.
:::
