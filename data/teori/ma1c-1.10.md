---
id: ma1c-1.10
title: Prioriteringsregler
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.10'
---

# Prioriteringsregler

::: härledning "Introduktion"
Beräkningen $5 + 2 \cdot 3$ ger olika svar beroende på i vilken ordning man
räknar.

Om vi först räknar ut $5 + 2$ får vi

$$
\mathbf{5 + 2} \cdot 3 = \mathbf{7} \cdot 3 = 21
$$

Om vi i stället räknar ut $2 \cdot 3$ först får vi

$$
5 + \mathbf{2 \cdot 3} = 5 + 6 = 11
$$

Eftersom svaren blir olika spelar ordningen på räkneoperationerna roll.
:::

Regler för vilka beräkningar man ska utföra först kallas
**prioriteringsregler**.

::: formel "Prioriteringsregler"
1. **Parenteser** — ( )
2. **Potenser** — $a^b$
3. **Multiplikation och division** — $\cdot$ och /
4. **Addition och subtraktion** — + och −
:::

Den korrekta uträkningen för exemplet ovan är alltså att först beräkna
multiplikationen, så

$$
5 + 2 \cdot 3 = 5 + 6 = 11
$$

::: kuriosa "Mattedjävulen"
"Mattedjävulen" är en bild för att komma ihåg prioriteringsreglerna. Läs
den uppifrån och ner!

::: figur
<svg viewBox="10 2 415 164" width="415" height="164" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Mattedjävulen: ett ansikte byggt av räknesymboler. Hornen är parenteser, ögonen är upphöjt-tecken, kinderna är en multiplikationspunkt och ett divisionsstreck, munnen är ett plustecken och hakan ett minustecken. Bredvid listas ordningen: parenteser, potenser, multiplikation och division, addition, subtraktion."><circle cx="90" cy="98" r="60" fill="#4fb8bd"/><path d="M60,48 C48,36 46,20 56,8" fill="none" stroke="#c0397c" stroke-width="5" stroke-linecap="round"/><path d="M120,48 C132,36 134,20 124,8" fill="none" stroke="#c0397c" stroke-width="5" stroke-linecap="round"/><polyline points="60,84 71,70 82,84" fill="none" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="98,84 109,70 120,84" fill="none" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="64" cy="106" r="5" fill="#c0397c"/><line x1="100" y1="112" x2="118" y2="92" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/><line x1="76" y1="130" x2="104" y2="130" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/><line x1="90" y1="116" x2="90" y2="144" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/><line x1="78" y1="152" x2="102" y2="152" stroke="#c0397c" stroke-width="4.5" stroke-linecap="round"/><text x="400" y="28" font-size="14" text-anchor="end" fill="#1f2530">Parenteser</text><rect x="410" y="18" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="400" y="60" font-size="14" text-anchor="end" fill="#1f2530">Potenser</text><rect x="410" y="50" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="400" y="92" font-size="14" text-anchor="end" fill="#1f2530">Multiplikation och division</text><rect x="410" y="82" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="400" y="124" font-size="14" text-anchor="end" fill="#1f2530">Addition</text><rect x="410" y="114" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="400" y="156" font-size="14" text-anchor="end" fill="#1f2530">Subtraktion</text><rect x="410" y="146" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.2"/></svg>

Hornen är parenteser, ögonen potenser, kinderna multiplikation och
division, munnen addition och hakan subtraktion.
:::
:::

Nu är det också dags att gå igenom några viktiga begrepp, nämligen vad
delarna heter vid olika räknesätt. Lär dig dessa utantill!

::: formel "Räknesättens delar"
| Räknesätt | Delarna | Svar | Exempel |
| --- | --- | --- | --- |
| Addition | term + term | summa | $3 + 2 = 5$ |
| Subtraktion | term − term | differens | $5 - 2 = 3$ |
| Multiplikation | faktor · faktor | produkt | $3 \cdot 4 = 12$ |
| Division | $\dfrac{\text{täljare}}{\text{nämnare}}$ | kvot | $12/4 = 3$ |
:::

::: exempel "Exempel 1 — Räkna i rätt ordning"
**Beräkna<br>a) $5 \cdot (3 + 6)$&emsp;&emsp;b) $8 \cdot 10 - (4 \cdot 2 - 3)$&emsp;&emsp;c) $9 \cdot 5 - (10 - 7)^2$&emsp;&emsp;d) $\dfrac{15}{5 - 2}$**

**a)** Beräkna parentesen först:

$$
5 \cdot (3 + 6) = 5 \cdot 9 = 45
$$

**Svar:** 45

**b)** Multiplikationen i parentesen först, sedan parentesen, sedan
multiplikationen och till sist differensen:

$$
8 \cdot 10 - (4 \cdot 2 - 3) = 8 \cdot 10 - (8 - 3) = 8 \cdot 10 - 5 = 80 - 5 = 75
$$

**Svar:** 75

**c)** Parentesen först, sedan potensen, sedan multiplikationen och till
sist differensen:

$$
9 \cdot 5 - (10 - 7)^2 = 9 \cdot 5 - 3^2 = 9 \cdot 5 - 9 = 45 - 9 = 36
$$

**Svar:** 36

**d)** I divisioner finns "osynliga" parenteser. Man kan tänka sig att det
är en parentes kring täljaren och nämnaren — nämnaren beräknas först:

$$
\frac{15}{5 - 2} = \frac{15}{(5 - 2)} = \frac{15}{3} = 5
$$

**Svar:** 5
:::
