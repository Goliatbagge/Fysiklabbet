---
id: ma3c-3.3
title: Mer om derivatan av potensfunktioner
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.3'
---

# Mer om derivatan av potensfunktioner

Sedan tidigare har vi visat att $f(x) = x^n$ har derivatan
$f'(x) = nx^{n-1}$ där $n$ är ett positivt heltal. Vi undersöker om
deriveringsregeln gäller även för exponenter som inte är positiva heltal —
vi börjar med exponenter som inte är heltal alls.

::: härledning "Derivatan för $f(x) = x^{1/2}$, dvs. för $f(x) = \sqrt{x}$, med derivatans definition"
Om den vanliga regeln (multiplicera ner exponenten och minska den med 1)
gäller även för denna typ av funktion ska

$$
f'(x) = \frac{1}{2}x^{-1/2} = \frac{1}{2x^{1/2}} = \frac{1}{2\sqrt{x}}
$$

Vi undersöker om det verkligen är så med derivatans definition.

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{\sqrt{x+h} - \sqrt{x}}{h}
$$

Vi förlänger bråket med konjugatet till täljaren för att bli av med
rottecknen.

$$
f'(x) = \lim_{h \to 0} \frac{(\sqrt{x+h} - \sqrt{x})(\sqrt{x+h} + \sqrt{x})}{h(\sqrt{x+h} + \sqrt{x})} = \lim_{h \to 0} \frac{x + h - x}{h(\sqrt{x+h} + \sqrt{x})}
$$

$$
= \lim_{h \to 0} \frac{h}{h(\sqrt{x+h} + \sqrt{x})} = \lim_{h \to 0} \frac{1}{\sqrt{x+h} + \sqrt{x}} = \frac{1}{\sqrt{x} + \sqrt{x}} = \frac{1}{2\sqrt{x}}
$$

De enkla deriveringsreglerna gäller alltså även för annat än
heltalsexponenter!
:::

Vi undersöker sedan om deriveringsregeln gäller för exponenter som är
**negativa**.

::: härledning "Derivatan för $f(x) = x^{-1}$, dvs. för $f(x) = \dfrac{1}{x}$, med derivatans definition"
Om den vanliga regeln gäller även för denna funktion ska
$f'(x) = -x^{-2}$, dvs. $f'(x) = -\dfrac{1}{x^2}$.

Vi undersöker om det verkligen är så med derivatans definition.

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{\dfrac{1}{x+h} - \dfrac{1}{x}}{h}
$$

Vi förlänger bråken i täljaren med varandras nämnare för att få liknämnigt
och förenklar.

$$
f'(x) = \lim_{h \to 0} \frac{\dfrac{x}{x(x+h)} - \dfrac{x+h}{x(x+h)}}{h} = \lim_{h \to 0} \frac{\dfrac{x - (x+h)}{x(x+h)}}{h} = \lim_{h \to 0} \frac{\dfrac{-h}{x(x+h)}}{h}
$$

$$
= \lim_{h \to 0} \frac{-h}{h \cdot x(x+h)} = \lim_{h \to 0} \frac{-1}{x(x+h)} = \frac{-1}{x \cdot x} = -\frac{1}{x^2}
$$

De enkla deriveringsreglerna gäller alltså även för negativa exponenter!
:::

## Potensregeln för alla reella exponenter

Båda undersökningarna ovan bekräftar samma sak: den enkla deriverings-
regeln — multiplicera ner exponenten och minska den med 1 — gäller inte
bara för positiva heltalsexponenter, utan för **alla** reella exponenter.

::: formel "Derivatan av potensfunktioner"
Derivatan av

$$
f(x) = x^a
$$

är

$$
f'(x) = ax^{a-1}
$$

för alla reella tal $a$ (om $x > 0$).
:::

För att kunna använda regeln måste uttrycket skrivas om som en ren potens
$x^a$ innan vi deriverar — variabler under ett rottecken eller i en nämnare
räknas alltså om till en potens med bråk- eller negativ exponent först.

::: tips "Derivera variabler under rottecknet eller i nämnaren"
Om vi ska derivera en funktion som innehåller variabler (t.ex. $x$) under
rottecknet eller i en nämnare gör vi det enklast genom att

1. skriva om termen som en potens och förenkla,
2. och sedan derivera som vanligt.
:::

::: formel "Derivera uttryck med variabeln i både täljare och nämnare"
När vi har variabeln, t.ex. $x$, i både täljare och nämnare deriverar vi
funktionen enklast genom att dela upp bråket i flera termer och sedan
derivera termvis.
:::

::: exempel "Exempel 1 — Derivera potensuttryck"
**Derivera**

$$
\text{a)}\ f(x) = \frac{3}{x} \qquad
\text{b)}\ f(x) = \frac{1}{5x} \qquad
\text{c)}\ f(x) = \frac{4x - 7}{x}
$$

$$
\text{d)}\ f(x) = \sqrt{x} + \sqrt[3]{x} \qquad
\text{e)}\ f(x) = x\sqrt{x} \qquad
\text{f)}\ f(x) = \frac{8}{\sqrt{x}}
$$

**a)** Vi har variabeln i nämnaren och skriver därför först om
funktionsuttrycket som en potens.

$$
f(x) = \frac{3}{x} = \frac{3}{x^1} = 3x^{-1}
$$

Därefter deriverar vi "som vanligt" genom att multiplicera ner exponenten
och minska den med 1.

$$
f'(x) = -3x^{-2} = -\frac{3}{x^2}
$$

**Svar:** $f'(x) = -3x^{-2}$ eller $f'(x) = -\dfrac{3}{x^2}$

**b)** Vi har återigen $x$ i nämnaren. Vi "flyttar upp" $x$ till täljaren
samtidigt som vi byter tecken på exponenten (femman ska vara kvar i
nämnaren). Sedan kan vi derivera som vanligt.

$$
f(x) = \frac{1}{5x} = \frac{1}{5x^1} = \frac{x^{-1}}{5}
$$

$$
f'(x) = \frac{-x^{-2}}{5} = -\frac{1}{5x^2}
$$

**Svar:** $f'(x) = -\dfrac{x^{-2}}{5}$ eller $f'(x) = -\dfrac{1}{5x^2}$

**c)** Nu har vi $x$ i både täljare och nämnare. Vi delar upp bråket i två
termer och förenklar.

$$
f(x) = \frac{4x - 7}{x} = \frac{4x}{x} - \frac{7}{x} = 4 - 7x^{-1}
$$

Nu deriverar vi term för term.

$$
f'(x) = -7 \cdot (-1)x^{-2} = 7x^{-2} = \frac{7}{x^2}
$$

**Svar:** $f'(x) = 7x^{-2}$ eller $f'(x) = \dfrac{7}{x^2}$

**d)** Vi skriver först om rötterna som potenser. Sedan deriverar vi som
vanligt.

$$
f(x) = \sqrt{x} + \sqrt[3]{x} = x^{1/2} + x^{1/3}
$$

$$
f'(x) = \frac{1}{2}x^{-1/2} + \frac{1}{3}x^{-2/3} = \frac{1}{2x^{1/2}} + \frac{1}{3x^{2/3}} = \frac{1}{2\sqrt{x}} + \frac{1}{3\sqrt[3]{x^2}}
$$

**Svar:** $f'(x) = \dfrac{x^{-1/2}}{2} + \dfrac{x^{-2/3}}{3}$ eller
$f'(x) = \dfrac{1}{2\sqrt{x}} + \dfrac{1}{3\sqrt[3]{x^2}}$

**e)** Vi börjar med att skriva $\sqrt{x} = x^{1/2}$ och sedan förenkla med
potenslagarna.

$$
f(x) = x \cdot x^{1/2} = x^1 \cdot x^{1/2} = x^{1 + 1/2} = x^{3/2}
$$

Därefter deriverar vi som vanligt.

$$
f'(x) = \frac{3}{2}x^{3/2 - 1} = \frac{3}{2}x^{1/2} = \frac{3}{2}\sqrt{x} = \frac{3\sqrt{x}}{2}
$$

**Svar:** $f'(x) = \dfrac{3}{2}x^{1/2}$ eller $f'(x) = \dfrac{3\sqrt{x}}{2}$

**f)** Vi skriver först om roten som en potens.

$$
f(x) = \frac{8}{x^{1/2}}
$$

Vi flyttar sedan upp $x^{1/2}$ från nämnaren samtidigt som vi byter tecken
på exponenten.

$$
f(x) = 8x^{-1/2}
$$

Därefter deriverar vi med de vanliga deriveringsreglerna.

$$
f'(x) = -\frac{1}{2} \cdot 8x^{-3/2} = -4x^{-3/2} = -\frac{4}{x^{3/2}} = -\frac{4}{x \cdot x^{1/2}} = -\frac{4}{x\sqrt{x}}
$$

**Svar:** $f'(x) = -4x^{-3/2}$ eller $f'(x) = -\dfrac{4}{x\sqrt{x}}$
:::
