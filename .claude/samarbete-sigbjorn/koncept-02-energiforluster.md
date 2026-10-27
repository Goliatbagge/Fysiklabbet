# Koncept 2: Förlust av mekanisk energi (bokens 5.5, Fysiklabbet fy1-4.9)

Status: **väntar på Sams godkännande** (2026-10-27)

Arbetsnamn: **Klossbanan**, filen `fysik1-energiforluster-app.html`, länkad
som `href` på fy1-4.9 Arbete med friktion. Simuleringen är del två i samma
serie som Arbetsbänken, med samma joulebrickor, energifack och färger, så att
eleven känner igen sig.

## Vad eleven ska förstå

Ur fy1-4.9 och de vanligaste missuppfattningarna:

1. Friktionen gör om mekanisk energi till värme: $E_v = F_f \cdot s$, där *s*
   är den **verkliga sträckan längs underlaget**, inte höjdskillnaden.
2. Den mekaniska energin $E_p + E_k$ minskar, men **ingen energi försvinner**.
   Summan av mekanisk energi och värme är hela tiden densamma.
3. Med friktion krävs **mer** arbete för samma höjdvinst: $W = \Delta E_p + E_v$.
4. Friktionskraften beror på normalkraften. På en lutning är
   $F_N = m \cdot g \cdot \cos \alpha$, så en meter i backen ger mindre värme än en
   meter på planen.
5. Massan stryks bort: en tung och en lätt kloss med samma friktionstal stannar
   på samma ställe, eftersom både lägesenergin och friktionen är proportionella
   mot *m*.

## Beteckningar (synkas med fy1-4.9)

$E_p$, $E_k$, $E_v$ (friktionsvärme), $F_f = \mu \cdot F_N$, *s*, *h*, *α* för
lutningsvinkeln och *W* för arbetet. Enheten J, som i Arbetsbänken.

## Koncept

### Scenen: en klossbana på labbänken

En bana i trä på labbänken, sedd från sidan: en ramp till vänster, en plan
sträcka i mitten och en ramp till höger, som en låg U-bana. På banan glider en
träkloss. Den plana sträckan har **utbytbara remsor** som läggs i banan: blank
plast, trä, filt och sandpapper, med var sitt friktionstal. Eleven drar klossen
uppför rampen till önskad höjd (en höjdskala på stativet visar *h*) och
släpper.

### Centerpiece: värmekameran

En knapp slår på **värmekameran**. Scenen tonas ned och banan visas i
falskfärg som en riktig IR-kamera: där klossen har glidit lyser underlaget,
mer ju mer värme som avgetts per meter. Det gör tre saker synliga direkt:

- Värmen hamnar **längs vägen** klossen glidit, inte i höjden. Ett spår som är
  dubbelt så långt lyser dubbelt så länge.
- På planen glöder spåret starkare än i backen, eftersom normalkraften och
  därmed friktionen är större där. Glöden per meter är $F_f$.
- Glider klossen fram och tillbaka i U-banan blir spåret starkare för varje
  passage, medan höjden den når minskar.

Under scenen finns samma energifack som i Arbetsbänken: **lägesenergi,
rörelseenergi och värme**. Joulebrickorna flyttas mellan facken medan klossen
glider: från lägesenergi till rörelseenergi i backen, och från rörelseenergi
till värme på sandpapperet. En linje ovanför facken visar den totala energin,
och den rör sig aldrig. Bredvid facken finns en **energi–läge-graf** där
$E_p$, $E_k$ och $E_{\text{mek}} = E_p + E_k$ ritas mot sträckan längs banan.
$E_{\text{mek}}$ sjunker bara där det finns friktion, och lutningen på den
kurvan är just $F_f$.

### Två lägen

1. **Släpp klossen** (energiförlust): klossen släpps från höjden *h* och
   glider tills den stannar. Den når lägre på andra sidan, och till slut blir
   allt värme.
2. **Dra uppför** (arbete med friktion, som exempel 1 i fy1-4.9): handen och
   dynamometern från Arbetsbänken drar klossen uppför rampen med jämn fart.
   Arbetsrutan fylls och brickorna fördelas på lägesenergi och värme:
   $W = \Delta E_p + E_v$. Jämfört med samma lyft utan friktion syns direkt hur
   mycket mer arbete det krävs.

### Fysiken

Klossen glider längs banan, med $F_f = \mu \cdot F_N$ och
$F_N = m \cdot g \cdot \cos \alpha$ på varje del. Övergångarna mellan ramp och
plan är rundade så att farten inte hoppar. Står klossen still på en lutning
glider den bara om $\tan \alpha > \mu$, med samma friktionstal för vila och
glidning som i kursen. Motorn bokför energin exakt i varje steg, och ett
Node-test kontrollerar att $E_p + E_k + E_v$ är konstant, att
stoppsträckan på planen blir $s = h / \mu$ efter en friktionsfri ramp, och att
massan inte påverkar var klossen stannar.

### Färdiga försök

1. **Utan friktion:** klossen når samma höjd på andra sidan, om och om igen.
2. **Sandpapper på planen:** klossen stannar på planen.
3. **Fram och tillbaka:** filt på planen; klossen pendlar och tappar höjd
   varje gång, och värmespåret växer.
4. **Tung och lätt kloss:** 0,5 kg och 2 kg från samma höjd stannar på samma
   ställe (förra försöket syns som spöke).
5. **Längre väg, samma höjd:** en flackare ramp ger längre glidsträcka och mer
   värme innan klossen når planen.
6. **Dra uppför med och utan friktion:** samma höjd, olika arbete.

### Gissa-läge: "Var stannar klossen?"

Eleven får höjd, friktionstal och banans mått, sätter ut en flagga på banan där
hen tror att klossen stannar, och släpper sedan klossen. Poängen beror på hur
nära flaggan klossen stannar. Den första nivån har en friktionsfri ramp och en
sträv plan, så att $s = h / \mu$ räcker. Den andra nivån har friktion även i
backen, och eleven måste räkna med $F_N = m \cdot g \cdot \cos \alpha$ där.

## 2D eller 3D

**2D.** Banan, höjden och sträckorna ska läsas av i ett plan, och
värmekameran blir tydligast som en profil sedd från sidan.

## Hur den skiljer sig från PhET

PhET:s Energy Skate Park har en skateboardåkare och stapeldiagram, och den
termiska energin är en stapel bland andra. Klossbanan är ett labbförsök med
utbytbara remsor. Den visar **var** värmen hamnar med en värmekamera, och
energin flyttas som samma joulebrickor som i Arbetsbänken.

## Öppna frågor till Sam

1. Ska U-banan ha två ramper (klossen kan pendla), eller räcker en ramp och en
   plan sträcka? Förslag: två ramper. Pendlingen är det som visar att höjden
   minskar för varje passage.
2. Ska läget Dra uppför finnas med, eller hör det hemma bara i Arbetsbänken?
   Förslag: med, eftersom $W = \Delta E_p + E_v$ är kärnan i fy1-4.9.
