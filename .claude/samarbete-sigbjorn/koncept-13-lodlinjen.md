# Koncept 13: Lodlinjen (bokens 4.1 Likevekt, Fysiklabbet fy2-1.3)

Status: **godkänt och byggt** (2026-10-27), väntar på Sams test

Arbetsnamn: **Tyngdpunktsjakten**, filen `fysik2-lodlinjen-app.html`. Den länkas
som en fjärde simulering på fy2-1.3 Stabilitet (`href4`, se nedan), eller som
`href3` på fy1-… om Sam hellre vill ha den i nivå 1. Den inbäddade
simuleringen `lodlinje` i teorin står kvar. Den här sidan är den fristående
versionen, som Sigbjørn kan länka till, och den går längre: fler former,
former där tyngdpunkten ligger utanför materialet och ett prov på nålspetsen.

## Vad eleven ska förstå

Ur fy2-1.3:

1. **Tyngdpunkten** är punkten där hela tyngdkraften $F_G$ kan anses angripa,
   och **lodlinjen** är den lodräta linjen genom den.
2. **Ett föremål som hänger fritt i en punkt stannar med tyngdpunkten rakt
   under upphängningspunkten.** Annars ger $F_G$ ett kraftmoment kring
   spiken som vrider tillbaka föremålet.
3. **Två lodlinjer från två upphängningspunkter korsar varandra i
   tyngdpunkten.** Det är det klassiska sättet att hitta den.
4. **Tyngdpunkten behöver inte ligga i materialet.** I en ring, en
   hästsko eller ett L ligger den i luften.

## Beteckningar

Som i fy2-1.3: tyngdpunkt, lodlinje, $F_G$, upphängningspunkt och
vridningspunkt. Hävarmen för $F_G$ kring spiken betecknas $l_G$ och
kraftmomentet *M* med pilbeteckning (moturs och medurs), som i fy2-1.1 och
fy2-1.2. Färger som i teorins figurer: tyngdpunkten grön, lodlinjen
streckad.

## Koncept

En skiva av papp hänger i en spik på en anslagstavla av kork, med ett lod i
samma spik. Skivan har några hål längs kanten.

### Läge 1: Hitta tyngdpunkten

- **Häng upp och släpp:** eleven drar i skivan och släpper. Den svänger som en
  fysisk pendel (med dämpning) och stannar med tyngdpunkten rakt under
  spiken. Medan den svänger visas $F_G$ och hävarmen $l_G$ som en
  måttlinje, så att man ser varför den vrids tillbaka.
- **Rita av lodet:** en blyertslinje ritas på skivan längs lodets snöre.
- **Byt hål:** skivan hängs i nästa hål. Efter två linjer syns korsningen,
  och den tredje linjen går genom samma punkt. Det är kontrollen.
- **Tyngdpunkten är dold** tills två linjer är ritade (kan slås på).

### Former

1. Oregelbunden skiva (som i teorin)
2. **L-formad skiva**: tyngdpunkten hamnar utanför materialet
3. **Ring eller hästsko**: tyngdpunkten i hålet
4. **Sverigekartan**: var ligger Sveriges tyngdpunkt? (Den klassiska
   pappskivemetoden ger en punkt nära Ånge, som kallas Sveriges geografiska
   mittpunkt.)
5. **Rita en egen form**: eleven klickar ut hörnen i en polygon.

### Läge 2: Nålspetsen

När tyngdpunkten är hittad läggs skivan på en nålspets. Ligger nålen under
tyngdpunkten balanserar skivan. Annars tippar den åt det håll där
tyngdpunkten ligger. Det knyter lodlinjen till stödytan och vältningen i
resten av fy2-1.3. För ringen och L:et går det inte, eftersom det inte finns
något material under tyngdpunkten. Det är en bra fråga till eleven.

### Färdiga försök

1. **Två hål räcker:** den oregelbundna skivan, två linjer.
2. **Tredje linjen som kontroll.**
3. **L-formen:** korsningen hamnar utanför skivan.
4. **Hästskon:** tyngdpunkten i luften.
5. **Sverigekartan.**

### Gissa-läge

- **Var ligger tyngdpunkten?** En ny form visas. Eleven klickar där hen tror
  att tyngdpunkten ligger, sedan hängs formen upp i två hål och avståndet
  till rätt punkt mäts. Poäng efter hur nära det blev.

## 2D eller 3D

**2D.** Skivan är platt och hänger mot en vägg; en framvy är tydligast.

## Hur den skiljer sig från andra

Lodlinjemetoden finns som enkla animationer, men sällan med riktig
pendelrörelse, kraftmomentet som förklaring, former där tyngdpunkten ligger
i luften och ett prov på nålspetsen som visar att punkten verkligen är den
rätta.

## Öppna frågor till Sam

1. **Var ska den ligga?** fy2-1.3 har redan tre simuleringar (gaffelbalansen,
   dubbelkonen, vältningen). En fjärde kräver att katalogen och
   avsnittsraden klarar `href4`, som i dag bara finns till och med `href3`.
   Förslag: bygg in stöd för `href4` (avsnittsraden, sökindexet och
   verifierarna). Alternativ: lägg den på fy1-3.11, som är samma avsnitt i
   nivå 1, men där räknas den som en kopia (`delad`) och avsnittsraden
   hoppar över den.
2. **Sverigekartan:** förslag ja. Den gör uppgiften konkret och har en rolig
   historia, men konturen måste ritas från en fri källa.
3. **Rita en egen form:** förslag ja, som sista form.
