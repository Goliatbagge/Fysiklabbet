---
id: ma3c-2.4
title: Använda derivata
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.4'
---

# Använda derivata

## Tolka derivata

Sedan tidigare har vi konstaterat att derivatan grafiskt står för en grafs
lutning i en viss punkt (eller tangentens lutning i en viss punkt).

Vid tillämpningar inom t.ex. naturvetenskap eller ekonomi står derivatan för
någon form av **förändringshastighet vid en tidpunkt**. Enheten för
derivatan fås genom att ta "enheten för funktionen" per "enheten för
variabeln".

::: exempel "Exempel 1 — Tolka derivatan"
**En bil färdas $s(t)$ km på $t$ timmar. Tolka<br>
a) $s(2) = 120$&emsp;&emsp;b) $s'(2) = 90$**

**a)** $s$ står för sträckan i kilometer (120 km). $t$ står för tiden i
timmar (2 timmar).

**Svar:** Efter 2 timmar har bilen färdats 120 km.

**b)** Enheten för derivatan är "enheten för funktionen" per "enheten för
variabeln". Enheten för funktionen $s(t)$ är km. Enheten för variabeln $t$
är timme. $s'$ motsvarar alltså km/h.

$s'$ står för momentanhastigheten (90 km/h). $t$ står för tidpunkten (2
timmar).

**Svar:** Efter 2 timmar färdas bilen med hastigheten 90 km/h.
:::

## Beräkna derivata med Geogebra

Vi kan beräkna en derivata med symbolhanterande hjälpmedel, t.ex. Geogebra.
Vi definierar då en funktion genom att skriva $f(x) = \ldots$ i
inmatningsfältet och sedan beräkna derivatan genom att skriva $f'(a)$ för
den punkt $x = a$ vi är intresserade av.

::: härledning "OBS — decimaltecken i Geogebra"
I Geogebras inmatningsfält används punkt `.` som decimaltecken, inte komma.
Talet $0{,}3$ skrivs alltså som `0.3` när du matar in en funktion.
:::

::: exempel "Exempel 2 — Beräkna derivata med Geogebra"
**En vårdag ges temperaturen $f(x)$ °C av formeln $f(x) = 0{,}3x^2 - 5$, där
$x$ är tiden i timmar efter 6.00.<br>
a) Beräkna $f'(5)$ med symbolhanterande hjälpmedel.&emsp;&emsp;b) Tolka
svaret i a) med ord.**

**a)** I Geogebras inmatningsfält skriver vi

$$
f(x) = 0.3x^2 - 5
$$

och trycker Enter. I inmatningsfältet under skriver vi sedan $f'(5)$ och
trycker Enter. Vi får då svaret 3. Alltså är $f'(5) = 3$.

**Svar:** $f'(5) = 3$

**b)** Vi hade att $f'(5) = 3$. Enheten för $f$ är °C och enheten för $x$
är h. Enheten på derivatan är alltså °C/h.

Vi tolkar alltså $f'(5) = 3$ som "efter 5 timmar ökar temperaturen med 3
°C/h". Eftersom tiden räknas från klockan 6.00 kan vi också formulera det
som att "klockan 11.00 ökar temperaturen med 3 °C/h".

**Svar:** Efter 5 timmar (klockan 11.00) ökar temperaturen med 3 °C/h.
:::
