---
id: ma2c-5.S
title: Sammanfattning
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.S'
---

# Sammanfattning — Logaritmer

Det här kapitlet handlade om potens- och exponentialekvationer och hur
logaritmer används för att lösa dem algebraiskt. Du har mött
tiologaritmen som en ny räkneoperation, de tre logaritmlagarna och hur
de kan bevisas, samt hur logaritmer används i verkliga tillämpningar
som ränta och värdeförändring. Du ska efter kapitlet kunna skilja på
potens- och exponentialekvationer, lösa båda typerna algebraiskt med
logaritmer, hantera logaritmekvationer och räkna med logaritmer i
andra baser än 10.

## Begrepp att kunna

- **potensekvation**: ekvation där variabeln står i basen ($x^n = a$);
  löses med potenslagar eller rotuttryck.
- **exponentialekvation**: ekvation där variabeln står i exponenten
  ($a^x = b$); löses grafiskt eller algebraiskt med logaritmer.
- **potensfunktion ($y = C \cdot x^a$)**: generell form för en
  funktion där variabeln $x$ är i basen.
- **exponentialfunktion ($y = C \cdot a^x$)**: generell form för
  exponentiell förändring; $C$ är startvärdet och $a$ är
  förändringsfaktorn.
- **förändringsfaktor ($a$)**: talet varje steg multipliceras med;
  $a > 1$ ger ökning, $0 < a < 1$ ger minskning.
- **tiologaritm ($\lg$)**: det tal 10 ska upphöjas till för att bli
  ett visst tal $a$; $\lg a = x \iff 10^x = a$.
- **logaritmform och potensform**: två likvärdiga sätt att skriva
  samma samband, $\lg x = a \iff 10^a = x$.
- **logaritmekvation**: ekvation där variabeln står i logaritmen
  (till exempel $\lg x = 3$); löses genom omskrivning till potensform.
- **logaritmlagarna**: tre räkneregler för summa, differens och
  potens av logaritmer.
- **generell logaritm ($\log_a b$)**: lösningen till ekvationen
  $a^x = b$ för en valfri bas $a > 0$.

## Formler

::: formel "Kapitlets formler"
**Exponentiell förändring — modell**

$$
y = C \cdot a^x
$$

där

- $y$ = värdet efter $x$ förändringar
- $C$ = startvärdet
- $a$ = förändringsfaktorn
- $x$ = antal förändringar (ofta tid)

**Tiologaritm — definition**

$$
a = 10^x \iff x = \lg a \qquad \text{där } a > 0
$$

**Skriva ett tal med basen 10**

$$
a = 10^{\lg a} \qquad \text{där } a > 0
$$

**Logaritmform och potensform**

$$
\lg x = a \iff 10^a = x
$$

**Logaritmlagarna**

$$
\lg x + \lg y = \lg xy
$$

$$
\lg x - \lg y = \lg \frac{x}{y}
$$

$$
\lg x^p = p \cdot \lg x
$$

där $x > 0$ och $y > 0$.

**Generella logaritmer**

$$
a^x = b \iff x = \log_a b
$$
:::

## Viktiga samband och metoder

- Avgör först om variabeln står i **basen** (potensekvation,
  $x^n = a$) eller i **exponenten** (exponentialekvation, $a^x = b$)
  — det avgör vilken lösningsmetod som ska användas.
- En potensekvation med **jämn exponent** har två lösningar, en
  positiv och en negativ ($\pm$ framför roten/lösningen); en udda
  exponent ger bara en lösning.
- **Metod 1 för exponentialekvationer:** skriv om båda led till basen
  10 (till exempel $2 = 10^{\lg 2}$), förenkla med potenslagarna och sätt
  exponenterna lika.
- **Metod 2 (snabbare):** logaritmera båda led direkt (sätt $\lg$
  framför hela uttrycket) och använd tredje logaritmlagen för att
  multiplicera ner exponenten.
- En **logaritmekvation** (variabeln i logaritmen) löses genom att
  skriva om från logaritmform till potensform:
  $\lg x = a \iff 10^a = x$.
- Har ekvationen **flera logaritmtermer**, samla dem till en enda
  logaritm med logaritmlagarna innan logaritmfunktionen stryks från
  båda led.
- Alla samband gäller bara för $x > 0$ och $y > 0$ — man kan aldrig ta
  logaritmen av ett negativt tal eller av noll.
- Vid tillämpningar (ränta, befolkningstillväxt, värdeökning) räknas
  förändringsfaktorn $a$ ut ur en given procentsats: en ökning med
  $p\ \%$ ger $a = 1 + \dfrac{p}{100}$, en minskning ger
  $a = 1 - \dfrac{p}{100}$.
- Ett svar med en logaritm kvar i sig (till exempel $x = \lg 53$) är ett
  **exakt** svar — avrunda bara till decimaler när uppgiften ber om
  det.
- Alla logaritmlagarna och sambanden med basen 10 gäller likadant för
  **andra baser** ($\log_a b$) — bara basen i potensen byts ut.

## Inför provet

- Kan du skilja på en potensekvation och en exponentialekvation genom
  att avgöra om variabeln står i basen eller i exponenten?
- Vet du varför en potensekvation med jämn exponent har två lösningar,
  en positiv och en negativ?
- Kan du definitionen av tiologaritmen, $a = 10^x \iff x = \lg a$?
- Kan du skriva om ett tal med basen 10, $a = 10^{\lg a}$, och
  förklara varför $a$ måste vara större än 0?
- Kan du lösa en exponentialekvation genom att skriva om båda led till
  basen 10 och sätta exponenterna lika?
- Kan du lösa en exponentialekvation snabbare genom att logaritmera
  båda led och använda tredje logaritmlagen?
- Kan du lösa en logaritmekvation genom att skriva om den från
  logaritmform till potensform?
- Kan du alla tre logaritmlagarna utantill och använda dem för att
  förenkla eller samla logaritmuttryck?
- Kan du bevisa (härleda) någon av logaritmlagarna med hjälp av
  sambandet $a = 10^{\lg a}$?
- Kan du lösa en ekvation med flera logaritmtermer genom att samla dem
  till en enda logaritm innan du stryker $\lg$?
- Kan du ställa upp och lösa en tillämpning med modellen
  $y = C \cdot a^x$, till exempel ränta eller värdeökning?
- Kan du lösa ekvationer med andra baser än 10, till exempel $3^x = 25$, med
  hjälp av generella logaritmer $\log_a b$?
