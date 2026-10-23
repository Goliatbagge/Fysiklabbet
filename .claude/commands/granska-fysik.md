# Granska fysik i simulering

Använd denna command för att granska en simulering. Fysiken granskas av `fysikexpert`, pedagogiken av `pedagog`. Kör de två agenterna parallellt och slå ihop deras rapporter.

## Argument
- `$ARGUMENTS` - Filnamn på simuleringen att granska (t.ex. `fysik1-arkimedes.html`)

## Granskning

### 1. Fysikalisk korrekthet (`fysikexpert`)
- Är formler och härledningar korrekta och giltiga i situationen?
- Stämmer enheter, dimensioner och tecken?
- Är beräkningar och simuleringens modell rätt implementerade (integration, energiprincipen, randfall)?
- Fysikexpertens utslag (RÄTT / RÄTTA FÖRST / FEL I GRUNDEN) tas med i rapporten.

Punkterna 2–4 granskas av `pedagog`.

### 2. Pedagogisk kvalitet
- Är förklaringen begriplig för gymnasieelever?
- Finns det tillräcklig kontext?
- Är variabelnamn tydliga?

### 3. Interaktivitet
- Kan eleven utforska fenomenet?
- Ger kontrollerna meningsfulla variationer?
- Visas resultat på ett pedagogiskt sätt?

### 4. Svenska konventioner
- Kommatecken som decimalavskiljare?
- Korrekta svenska termer?
- SI-enheter?

## Rapport

Ge en strukturerad rapport med:
1. **Sammanfattning**: Övergripande bedömning
2. **Styrkor**: Vad som är bra
3. **Förbättringar**: Konkreta förslag
4. **Kritiska fel**: Saker som måste åtgärdas

Fråga om användaren vill att du genomför förslagen.
