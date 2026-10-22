# Översätta pennlösningarnas text

Pennlösningarna (`::: handskrift`, scener i `handskrift.js`,
`data/np/*-penna.js`, `data/ovningar-penna/*.js`) ritar sin text som
handstil. I engelskt läge slår `tillBmp()` i `handskrift.js` upp HELA varje
sträng i ordlistan och gör decimalkomma till decimalpunkt. Layouten räknas på
den engelska strängen.

Läs `.claude/i18n/RIKTLINJER.md` och `.claude/i18n/termlista.md` först.

## Arbetsgång

1. Hämta strängarna som saknar översättning, för en grupp:
   `node .claude/i18n/handskrift-strangar.js --saknas --grupp fy1 > <scratch>/fy1.json`
   Grupp = kurs för teoriscener (fy1, fy2, ma1c …), `np-<prov>` för provens,
   `ov-<avsnitt>` för övningarnas. Utdata: `{grupp: {scen: [strängar]}}`,
   i den ordning scenen skriver dem — läs dem som en löpande lösning.
2. För sammanhanget: läs den engelska teorin för avsnittet där scenen
   används (`data/teori/en/<id>.md`, sök på `typ: <scen>`) och scenens
   layoutfunktion i `handskrift.js` (sök på scennamnet i `SCENES`).
   Pennlösningen och textlösningen ska använda samma ord, samma beteckningar
   (även ordindex: om textlösningen skriver `F_\text{air}` skriver pennan
   `F_air`) och samma svar.
3. Skriv `data/en/handskrift/<grupp>.js`:
   ```js
   /* Pennlösningar, engelska: <grupp>. Nyckel = svensk sträng exakt som scenen skriver den. */
   I18N.add({
     'Varifrån kommer 3,6?': 'Where does 3.6 come from?',
     'Svar: 25 m/s': 'Answer: 25 m/s',
     …
   });
   ```
   Nyckeln är strängen EXAKT som utdata visar (decimalkomma och allt). I
   översättningen gäller decimalpunkt (komma görs om automatiskt för tal som
   står kvar, men skriv rätt själv). Behåll pennans egen syntax: `^` för
   exponent, `_` för index, specialtecken som `𝔼`, `↶`, `√`, `·`, `−`.
   Ordindex efter `_` skrivs tecken för tecken: `F_l_u_f_t` → `F_a_i_r`.
   En sträng som är identisk på engelska (bara formel) behöver inte stå med.
   Om samma svenska sträng förekommer i flera scener med olika betydelse:
   välj den vanligaste; ordlistan är gemensam.
4. `node .claude/i18n/bygg-manifest.js`.
5. **Längden.** En engelsk rad är ofta längre. Kör
   `EN=1 node .claude/verify-handskrift.js <scen> …` för dina scener (utan
   argument: alla). Fel om bläck hamnar utanför arket, i inställningsrutans
   zon eller i pilzonen till höger, eller om tankebubblor skymmer text.
   Kortare formulering löser nästan alltid felet — ändra aldrig layouten i
   `handskrift.js` för engelskans skull. Saknade glyfer (ett tecken som inte
   finns i GLYPHS) rapporteras också: undvik sådana tecken (till exempel
   typografiska citattecken ’ ” — använd raka ' ").
6. Granska två–tre scener i webbläsaren:
   `http://localhost:8000/katalog.html?id=<avsnitt>&lang=en`.

## Stil i pennlösningar

- Rubriker säger vad som görs och varför ("Solve for y in the first
  equation"), som på svenska.
- `Svar:` → `Answer:`, med stor bokstav efter (`Answer: About 1 760 people`).
- Tankebubblor: korta, i första person ("I substitute x = 4 here").
- Inga tankstreck som pausmarkör.
