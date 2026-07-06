---
id: ma1c-5.6
title: Produktregeln
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.6'
---

# Produktregeln

::: kuriosa "Kuriosa — Kortleken"
När du blandar en kortlek så kan du vara tämligen säker på att ordningen
som korten hamnar i är fullständigt unik i hela den mänskliga historien.
Det finns ca $8 \cdot 10^{67}$ sätt att blanda en kortlek eller mer exakt
$52 \cdot 51 \cdot 50 \cdot 49 \cdot \ldots \cdot 3 \cdot 2 \cdot 1$
(utläses "52 fakultet" och skrivs "52!") = 80 658 175 170 943 878 571 660
636 856 403 766 975 289 505 440 883 277 824 000 000 000 000 möjliga
kombinationer.

Detta tal är så stort att även om vi blandade kortleken en gång per sekund
från Big bang så hade universum hunnit gå under innan vi nått en chans på
miljarden att få upp samma sekvens av kort. Antal möjliga blandningar
motsvarar lika många atomer som i 600 biljarder jordklot. Eller: Tänk dig
att vi har en biljon människor. Det är 10 gånger så många människor som
någonsin har levt på jorden. Ge dem en kortlek var. Sedan ger du dem
instruktionen att blanda sina kortlekar en biljon gånger i sekunden i en
biljon år. Sedan låter vi detta utspela sig i en biljon civilisationer i
vårt universum. Om du nu tar en kortlek och blandar den, så är det bara
40 % chans att den är likadan som någon av de kombinationer som har
blandats i detta påhittade universum. Så när du blandar en kortlek kan du
vara tämligen säker på att den kombinationen, från första till sista
kortet, aldrig någonsin har uppstått i en tidigare blandning.
:::

När en kombination av händelser sker kan vi beräkna sannolikheten för
kombinationen genom att multiplicera sannolikheterna för de enskilda
händelserna genom **produktregeln**.

Om sannolikheten för en händelse

- *inte* påverkas av händelsen innan har vi en **oberoende händelse**.
  T.ex. sannolikheten att slå en sexa vid ett kast med tärning är
  $\frac{1}{6}$. Sannolikheten för att slå en sexa nästa gång med
  tärningen är fortfarande $\frac{1}{6}$ ("slumpen har inget minne").
  Kast med tärningar är alltså oberoende händelser.
- påverkas av händelsen innan har vi en **beroende händelse**. T.ex.
  sannolikheten att dra ett hjärter ur en kortlek är $\frac{13}{52}$. Om
  jag lägger undan kortet ("utan återläggning"), så är sannolikheten att
  dra ytterligare ett hjärter ur kortleken $\frac{12}{51}$ (12 hjärter är
  kvar av 51 kort totalt). Sannolikheten att dra ett hjärter har ändrats!
  Att dra kort utan återläggning är alltså beroende händelser.

::: exempel "Exempel 1 — Två sexor i rad"
**Vad är sannolikheten att slå två sexor i rad med tärning?**

Kasten är oberoende — multiplicera sannolikheterna:

$$
P(\text{två sexor}) = P(\text{sexa}) \cdot P(\text{sexa})
= \frac{1}{6} \cdot \frac{1}{6} = \frac{1}{36}
$$

**Svar:** $\dfrac{1}{36}$
:::

::: exempel "Exempel 2 — Yatzy!"
**Vad är sannolikheten att slå fem sexor vid ett kast med fem tärningar?
Yatzy!**

$$
P(\text{fem sexor}) = P(\text{sexa}) \cdot P(\text{sexa}) \cdot P(\text{sexa}) \cdot P(\text{sexa}) \cdot P(\text{sexa})
= \left(\frac{1}{6}\right)^5 = \frac{1^5}{6^5} = \frac{1}{7\,776}
\approx 0{,}00013 = 0{,}013\ \%
$$

**Svar:** 0,013 %
:::

::: exempel "Exempel 3 — Kulor med och utan återläggning"
**I en skål ligger 6 röda och 4 blå kulor. Vad är sannolikheten att dra
två blå kulor<br>a) med återläggning?&emsp;&emsp;b) utan återläggning?**

**a)** Med återläggning påverkas inte sannolikheterna av föregående
händelser:

$$
P(\text{två blå}) = P(\text{blå}) \cdot P(\text{blå})
= \frac{4}{10} \cdot \frac{4}{10} = \frac{16}{100} = 0{,}16 = 16\ \%
$$

**Svar:** 16 %

**b)** Utan återläggning påverkas sannolikheterna av föregående
händelser. Efter att vi har dragit en blå kula (4 på 10) finns bara 3 blå
kulor kvar av 9 kulor totalt. Så sannolikheten att dra en blå kula andra
gången är alltså $\frac{3}{9}$:

$$
P(\text{två blå}) = P(\text{blå}) \cdot P(\text{blå})
= \frac{4}{10} \cdot \frac{3}{9} = \frac{12}{90} = \frac{2}{15}
\approx 0{,}13 = 13\ \%
$$

**Svar:** 13 %
:::
