# Koncept 4: Sammansatta system (bokens 3.7, Fysiklabbet fy1-3.10)

Status: **väntar på Sams godkännande** (2026-10-27)

Arbetsnamn: **Trissbordet**, filen `fysik1-trissor-app.html`, länkad som
`href` på fy1-3.10 Trissor. Fjärde delen i serien, med samma labbänk,
dynamometer och kraftpilar som Arbetsbänken.

## Vad eleven ska förstå

Ur fy1-3.10 och de vanligaste missuppfattningarna:

1. **Accelerationen ur hela systemet:** se de sammankopplade föremålen som en
   kropp. $F_R$ är de yttre krafterna längs rörelsen och massan är allihop
   tillsammans, $a = \dfrac{F_R}{m_\text{tot}}$.
2. **Spännkraften ur ett enda föremål:** frilägg en vikt och använd *bara dess*
   massa, $F_S = F_R + F_{G1}$. Det är den vanligaste missen.
3. **Spännkraften är lika stor i hela snöret**, och den hamnar alltid mellan de
   två tyngderna. Den är *inte* lika med den hängande viktens tyngd när
   systemet accelererar.
4. **Inre och yttre krafter:** snörets krafter på delarna tar ut varandra när
   man ser på hela systemet, men inte när man ser på en del. Vilka krafter som
   räknas beror på var man drar systemgränsen.

## Beteckningar (synkas med fy1-3.10)

$F_S$ (spännkraft), $F_{G1}$, $F_{G3}$, $F_R$, $m_1$, $m_3$, $m_\text{tot}$,
*a*, *g*. Friktion $F_f = \mu \cdot F_N$ som i Arbetsbänken.

## Koncept

### Scenen: ett trissbord i labbet

Ett labbord med trissor som klämts fast i kanterna, vikter med krok och en
vagn. En **dynamometer sitter kopplad i snöret**, så att spännkraften går att
läsa av direkt, precis som man gör i labbet. Det ger simuleringens viktigaste
överraskning: när systemet släpps visar dynamometern *mindre* än den hängande
viktens tyngd.

Fyra uppställningar:

1. **Två vikter över två trissor** (exakt som exempel 1 i fy1-3.10: 1,0 kg och
   3,0 kg, snöret över bordet).
2. **Atwoods maskin:** två vikter över en trissa i ett stativ.
3. **Vagn på bordet och en hängande vikt:** med valbar friktion. Vagnen kan
   stå still om friktionen är stor nog.
4. **Vagn mellan två hängande vikter:** tre föremål och två snören med olika
   spännkraft.

### Centerpiece: systemgränsen

Eleven klickar på ett föremål, eller väljer "hela systemet", och en
**streckad systemgräns** ritas runt det som valts. Bara de krafter som
korsar gränsen, de **yttre** krafterna, ritas för fullt och skalenligt. Snörets
krafter *inne i* systemet tonas ned och märks som inre krafter som tar ut
varandra.

- Med hela systemet valt syns direkt att $F_R = F_{G3} - F_{G1}$ och att massan
  är $m_\text{tot}$. Spännkraften har försvunnit ur räkningen.
- Med en vikt vald dyker spännkraften upp som yttre kraft, och
  formelkortet växlar till $F_R = F_S - F_{G1}$ med bara den viktens massa.
- En **kraftstapel** bredvid scenen jämför $F_S$ med de två tyngderna och visar
  att spännkraften alltid ligger mellan dem.

### Rörelsen

Föremålen släpps från vila och accelererar tills en vikt når golvet eller en
trissa. Avläsningen visar *a*, *v* och dynamometerns värde. En
**ljusgrind** under den fallande vikten mäter farten vid golvet, så att man
kan kontrollera $v^2 = 2 \cdot a \cdot s$ (kopplingen till kapitlet om
rörelse). Ultrarapid finns som i de andra simuleringarna.

### Färdiga försök

1. **Exempel 1 i genomgången:** 1,0 kg och 3,0 kg.
2. **Lika tunga vikter:** ingen acceleration, och dynamometern visar *m* · *g*.
3. **Nästan lika tunga:** en mycket liten acceleration, som Atwood använde för
   att mäta *g*.
4. **Tung vagn, lätt vikt:** liten acceleration och en spännkraft nära
   viktens tyngd.
5. **Friktionen håller emot:** vagnen står still trots den hängande vikten.
6. **Tre föremål:** två snören med olika spännkraft.

### Gissa-läge

- **Vad visar dynamometern?** Eleven får massorna och räknar ut spännkraften
  innan systemet släpps. Det vanligaste felsvaret (den hängande viktens
  tyngd) och felet att räkna med hela systemets massa får var sin förklaring.
- **Hur stor blir accelerationen?** Med friktion som andra nivå.

## 2D eller 3D

**2D.** Systemgränsen, kraftpilarna och snörets riktningar ska läsas av i ett
plan.

## Hur den skiljer sig från PhET

PhET har ingen simulering som är byggd kring sammansatta system och
systemgränser. Trissbordet gör valet av system till själva handlingen: klicka
på ett föremål eller på hela systemet och se vilka krafter som räknas. Det har
en dynamometer i snöret som visar att spännkraften inte är den hängande viktens
tyngd.

## Öppna frågor till Sam

1. Ska uppställning 4 (vagn mellan två vikter) vara med, eller räcker tre?
   Förslag: med, eftersom den visar att olika snören kan ha olika spännkraft.
2. Ska trissornas massa och friktion alltid försummas, som i genomgången?
   Förslag: ja, och det står i texten under scenen.
