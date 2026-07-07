---
id: ma2c-6.7
title: Olika regressionsmodeller
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.7'
---

# Olika regressionsmodeller

I förra genomgången såg vi hur vi kunde ta fram ett linjärt samband
genom att anpassa en rät linje efter punkter. Det finns andra samband
som inte är linjära och vi kan ta fram många av dessa på liknande sätt.

För att veta vilken modell som passar bäst utifrån givna punkter kan
det vara bra att känna till några kännetecken för utseendet hos olika
funktioner.

| Funktion | Form | Kännetecken |
| --- | --- | --- |
| Linjär | $y = kx + m$ | Rät linje. Ökningen eller minskningen är lika stor överallt. |
| Exponentiell | $y = Ca^x$ | Liten ökning i början och stor ökning i slutet ELLER stor minskning i början och liten minskning i slutet. |
| Potens | $y = Cx^a$ | Kurva som vänder och går genom origo. |
| Polynom | $y = ax^2 + bx + c$ (grad 2) | Kurva som vänder, inte nödvändigtvis genom origo. |

::: figur
<svg viewBox="0 0 540 120" width="540" height="120" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Fyra typkurvor: en rät linje, en exponentialkurva som stiger allt brantare, en potenskurva som vänder i origo och en parabel som vänder utan att gå genom origo."><line x1="8" y1="90" x2="120" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="14" y1="96" x2="14" y2="8" stroke="#1f2530" stroke-width="1.2"/><line x1="20" y1="82" x2="112" y2="18" stroke="#2563c9" stroke-width="1.8"/><text x="64" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Linjär</text><line x1="143" y1="90" x2="255" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="149" y1="96" x2="149" y2="8" stroke="#1f2530" stroke-width="1.2"/><path d="M 152,84 Q 225,76 245,14" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="199" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Exponentiell</text><line x1="278" y1="90" x2="390" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="290" y1="96" x2="290" y2="8" stroke="#1f2530" stroke-width="1.2"/><path d="M 290,90 Q 345,90 378,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><circle cx="290" cy="90" r="2.4" fill="#2563c9"/><text x="334" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Potens</text><line x1="413" y1="90" x2="525" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="419" y1="96" x2="419" y2="8" stroke="#1f2530" stroke-width="1.2"/><path d="M 428,20 Q 470,132 516,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="469" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Polynom</text></svg>
:::

Ibland är det svårt att avgöra vilken modell som passar bäst. Det kan
t.ex. vara svårt att se om punkterna anpassas bäst av en exponential-
eller en potensfunktion. Potens- och polynomfunktioner kan vara ännu
svårare att skilja åt eftersom de dessutom ibland kan sammanfalla
($y = x^2$ är både en potensfunktion och en polynomfunktion).

För att avgöra vilken kurvanpassning som är bäst kan vi utnyttja
korrelationskoefficientens kvadrat, $r^2$. $r^2$-värdet ligger mellan 0
(ingen korrelation alls) och 1 (perfekt korrelation). Så ju närmare 1
som $r^2$-värdet ligger desto bättre anpassad är kurvan. För att ta
fram $r^2$-värdet matar vi, som vanligt, in värdena i Geogebras
kalkylblad, klickar på knappen "Visa statistik" och läser av
$r^2$-värdet i tabellen.

::: exempel "Exempel 1 — Världens befolkning"
**Världens befolkning vid några olika årtal redovisas i tabellen
nedan.**

| År | Befolkning (miljarder) |
| --- | --- |
| 1920 | 1,912 |
| 1930 | 2,070 |
| 1940 | 2,307 |
| 1950 | 2,536 |
| 1960 | 3,032 |
| 1970 | 3,692 |
| 1980 | 4,434 |
| 1990 | 5,321 |
| 2000 | 6,145 |
| 2010 | 6,922 |
| 2020 | 7,794 |

**Skapa ett spridningsdiagram och ta fram en regressionsmodell som är<br>a) linjär&emsp;&emsp;b) exponentiell&emsp;&emsp;c) Vilken av modellerna beskriver sambandet bäst?**

**a)** Vi matar in värdena i Geogebras kalkylblad (tänk på att
decimaltal skrivs med punkt), markerar värdena, klickar på "blå
staplar" och väljer *Tvåvariabels regressionsanalys*. Ett
spridningsdiagram erhålls.

Vi väljer regressionsmodell *Linjär* och läser av ekvationen:
$y = 0{,}0612x - 116{,}3385$.

**Svar:** $y = 0{,}061x - 120$

**b)** Vi skiftar regressionsmodell i rullistan till *Exponentiell
C·aˣ* och läser av ekvationen.

**Svar:** $y = 0 \cdot 1{,}0153^x$

(Startvärdet $C = 0$ i modellen är orealistiskt, men Geogebra skriver
inte ut alla decimaler för tal nära 0.)

**c)** För att avgöra vilken av modellerna som beskriver sambandet bäst
tittar vi på vilken kurva som ligger bäst anpassad efter punkterna. I
detta fall är det lätt att se att exponentialfunktionen passar
punkterna bättre och därmed är bäst.

Om vi vill vara säkra kan vi jämföra modellernas $r^2$-värden. Vi
klickar på knappen "Visa statistik" och läser av vid $R^2$ för
respektive modell:

- Linjär: $r^2 = 0{,}954$
- Exponentiell: $r^2 = 0{,}9933$

Eftersom $r^2$-värdet ligger närmast 1 för exponentialfunktionen är
denna bäst.

**Svar:** Exponentiella modellen är bäst.
:::
