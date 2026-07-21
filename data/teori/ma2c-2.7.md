---
id: ma2c-2.7
title: Problemlösning med andragradsekvationer
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.7'
---

# Problemlösning med andragradsekvationer

Vid problemlösning är det ofta bra att följa nedanstående procedur.

::: tips "Problemlösning"
1. **Tolka problemet.** Definiera införda variabler och rita vid behov
   figur.
2. **Ställ upp en eller flera ekvationer.**
3. **Lös ekvationen eller ekvationssystemet.** Använd lämplig metod.
4. **Tolka svaret.** Vad stod variablerna för? Är svaret rimligt? Kan
   någon lösning bortses?
:::

::: exempel "Exempel 1 — Differens och produkt"
**Två positiva tal har differensen 21 och produkten 1 080. Vilka är
talen?**

**1. Vi inför och definierar variabler.**

- $x$ = det mindre talet
- $y$ = det större talet

**2. Vi ställer upp ett ekvationssystem.** Eftersom vi har **två**
obekanta, måste vi ställa upp **två** ekvationer:

$$
\begin{cases}
y - x = 21 & (1) \\
x \cdot y = 1\,080 & (2)
\end{cases}
$$

**3. Vi löser ekvationssystemet.** Vi löser ut $y$ från ekvation (1)
och får

$$
y = 21 + x \qquad (3)
$$

Vi använder substitutionsmetoden och sätter in $y = 21 + x$ i (2):

$$
x(21 + x) = 1\,080
$$

Vi utvecklar VL och löser sedan ekvationen med *pq*-formeln:

$$
21x + x^2 = 1\,080
$$

$$
x^2 + 21x - 1\,080 = 0
$$

$$
x = -\frac{21}{2} \pm \sqrt{\left(\frac{21}{2}\right)^2 + 1\,080}
$$

$$
x = -10{,}5 \pm \sqrt{1\,190{,}25} = -10{,}5 \pm 34{,}5
$$

$$
x_1 = -10{,}5 - 34{,}5 = -45
$$

$$
x_2 = -10{,}5 + 34{,}5 = 24
$$

**4. Vi tolkar svaret.** Eftersom $x$ skulle vara ett positivt tal kan
lösningen $x_1 = -45$ bortses. Alltså gäller $x = 24$. Insättning av
$x = 24$ i (3) ger

$$
y = 21 + 24 = 45
$$

Kontroll: $45 - 24 = 21$ och $24 \cdot 45 = 1\,080$. Stämmer!

**Svar:** Talen är 24 och 45.
:::

::: exempel "Exempel 2 — Rektangelns omkrets"
**En rektangel har arean $1\,215\ \mathrm{cm}^2$. Den ena sidan är 18 cm kortare
än den andra. Vilken är rektangelns omkrets?**

**1. Vi ritar figur och inför variabler.** Sidorna blir $x$ cm
respektive $(x - 18)$ cm.

::: figur
<svg viewBox="24 6 268 158" width="268" height="158" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rektangel med basen x centimeter och höjden x minus 18 centimeter."><rect x="30" y="24" width="180" height="110" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="120" y="156" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="220" y="84" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan> − 18</text><text x="290" y="18" font-size="12" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

**2. Omkretsen $O$ är då**

$$
O = x + x + (x - 18) + (x - 18)
$$

$$
O = 4x - 36
$$

**3. Vi behöver hitta $x$. Vi utnyttjar arean!**

$$
x(x - 18) = 1\,215
$$

$$
x^2 - 18x = 1\,215
$$

$$
x^2 - 18x - 1\,215 = 0
$$

*pq*-formeln ger

$$
x = 9 \pm \sqrt{9^2 + 1\,215} = 9 \pm \sqrt{1\,296} = 9 \pm 36
$$

$$
x_1 = 9 - 36 = -27
$$

$$
x_2 = 9 + 36 = 45
$$

**4. Vi tolkar svaret.** En sträcka kan inte vara negativ så lösningen
$x = -27$ kan bortses. Alltså gäller $x = 45$ cm.

Insättning av $x = 45$ cm i formeln för omkretsen $O = 4x - 36$ ger

$$
O = 4 \cdot 45 - 36 = 180 - 36 = 144\ \mathrm{cm}
$$

**Svar:** 144 cm
:::
