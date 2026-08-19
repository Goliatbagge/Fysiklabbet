# Överlämning: de dagliga Facebook- och Instagram-inläggen

Arbetsanteckning från en molnsession 2026-08-17, skriven för att en lokal
session på BOSGAME ska kunna fortsätta utan att något går förlorat.
**Radera filen när de öppna punkterna längst ned är avklarade.**

## Vad som hände

Den 17 augusti 2026 uteblev både Facebook- och Instagram-inlägget om dagens
nyhetsartikel. Artikeln (`2026-08-17-gluonknuten-i-protonen`) publicerades
som den skulle kl 03:27 — det var bara inläggen om den som aldrig gick ut.
Användaren postade dem i efterhand manuellt under dagen.

Missen märktes inte förrän på eftermiddagen. Det var det egentliga
problemet: ett uteblivet inlägg syntes ingenstans.

## Grundorsaken (fastställd, INTE åtgärdad)

Schemaläggningen fungerade felfritt. `Get-ScheduledTaskInfo` för
"Fysiklabbet Facebook-inlagg" visade `LastRunTime 2026-08-17 07:33:01`,
`LastTaskResult 0`, `NumberOfMissedRuns 0`. Datorn var på, användaren
inloggad, uppgiften startade och Claude-sessionen kördes.

Felet låg inne i sessionen. Ur `.claude/server/logg/fb-daglig.log`:

> **Men webbläsarverktygen saknas i sessionen.** Rutinen kräver
> Chrome-MCP-verktygen (`claude-in-chrome`: tabs, navigate, computer m.fl.),
> och de finns inte bland tillgängliga verktyg — ToolSearch hittar inga
> webbläsarverktyg alls. Utan dem går det inte att öppna facebook.com och
> posta, och säkerhetsreglerna säger då: avbryt utan att posta.

Agenten gjorde alltså rätt — den vägrade posta i blindo. Men `mcp__claude-in-chrome__*`
saknades i den schemalagda (headless) sessionen, trots att `--allowedTools`
i `fb-daglig.ps1` tillåter dem. Att tillåta ett verktyg är inte samma sak
som att MCP-anslutningen finns.

På de körningar loggen visar har det schemalagda jobbet aldrig postat via
webbläsaren: 16 augusti hoppade det över (redan postat den dagen), 17 augusti
föll det på verktygen. Antagandet är därför att headless-läget systematiskt
saknar tilläggets anslutning — inte att det är ett engångsfel.

## Vad som är gjort

En vakt som upptäcker och larmar: `.claude/server/some-vakt.ps1`, registrerad
som den schemalagda uppgiften "Fysiklabbet SoMe-vakt" (09:30 och 14:00
dagligen, interaktiv) via `installera-some-vakt.ps1`. Vid varje körning:

1. Läser dagens avsnitt i `.claude/facebook/logg.md`.
2. Saknas Facebooks eller Instagrams nyhetsrad körs respektive jobb om
   (`fb-daglig.ps1` / `ig-daglig.ps1`) — riskfritt, eftersom agenterna själva
   hoppar över det som redan är postat. Ett jobb som redan verkar köra
   lämnas i fred.
3. Saknas raden fortfarande efteråt: **larm** — Windows-notis plus
   `.claude/server/logg/SOME-LARM.txt` med orsak och slutet av körloggarna.
   Larmfilen raderas automatiskt när allt är postat igen.

Vakten löser alltså *synligheten*, inte grundorsaken: en omkörning träffar
samma vägg så länge Chrome-verktygen saknas. Den kommer däremot att larma
samma förmiddag i stället för att felet upptäcks av en slump.

## Två fällor i loggformatet som vakten fick lära sig

Båda hittades i den riktiga loggen och är åtgärdade i `some-vakt.ps1` — de
gäller vem som helst som skriver kod mot `.claude/facebook/logg.md`:

1. **Agenten skriver en rad även när den misslyckas**
   (`nyhet: FEL kl 07:33 (Chrome-verktygen saknades…)`). Att bara kontrollera
   att en rad finns läser alltså ett misslyckande som ett lyckat inlägg.
   Kräv ordet **postad** — samma nyckelord som agenternas eget
   dubbelpostningsskydd i `fb-daglig.md`/`ig-daglig.md` bygger på.
   Konventionen `FEL … — ÅTGÄRDAT: postad …` räknas som postad, vilket
   stämmer: inlägget gick ju ut till slut.
2. **Datumet står även inuti artikel-id:n och bildvägar**
   (`nyheter/bilder/2026-08-17-….jpg`). En fritextsökning efter dagens datum
   klipper därför dagens sektion mitt i en rad. Matcha rubriken på radens
   början.

Dessutom: `lansering:`/`ig-lansering:`-rader är inte dagens nyhetsinlägg och
får inte räknas som ett.

**Postar någon manuellt utanför agenterna måste loggen få en rad**, annars
tror vakten att inget är gjort och kör om jobben.

## Åtgärdat 2026-08-19

Grundorsaken var enkel när den väl syntes: **jobbskripten startade Claude
utan flaggan `--chrome`.** `claude -p` kopplar aldrig in Chrome-tillägget av
sig självt, och `--allowedTools` hjälper inte — att tillåta ett verktyg är
inte att koppla in MCP-anslutningen. Flaggan är nu inlagd i alla fyra
jobbskripten, och samma skript postade dagens inlägg skarpt samma dag.

Samtidigt hittades två fel i skyddsnätet, båda åtgärdade:

- **Vakten läste ett misslyckande som ett lyckat inlägg.** Den sökte
  fritext efter ordet "postad" var som helst i raden, och morgonens
  FEL-rader nämnde ordet i sin egen felbeskrivning. Kl 09:30 loggade
  vakten "allt väl" medan ingenting var postat. Statusen läses nu ur
  radens början (`^postad`), med `RÄTTAD: postad` som enda undantag. Se
  kommentaren över `JobbStatus`.
- **Lanseringsuppgifterna var aldrig registrerade** i Schemaläggaren —
  `installera-lansering-tasks.ps1` hade inte körts på maskinen, så
  13:03/13:18 inträffade aldrig och lanseringarna kördes bara indirekt av
  vakten kl 14:00. Båda uppgifterna är nu registrerade.

## Öppna punkter

1. **Överväg Meta Graph API i stället för webbläsarstyrning.** Graph API kan
   posta till Facebook-sidor och Instagram Business-konton utan Chrome, utan
   tillägg och utan inloggad session — då kan jobbet flyttas till en GitHub
   Action och blir helt oberoende av BOSGAME. Kräver en Meta-utvecklarapp,
   sidtoken och att Instagram-kontot är ett företagskonto. Bedömningen efter
   17 augusti är att detta troligen är den rätta långsiktiga lösningen,
   eftersom webbläsarvägen ser ut att vara ostabil just i automatiserat läge.
2. **Luckan vakten inte täcker:** startar datorn om efter en
   Windows-uppdatering och ingen loggar in, kör varken jobben eller vakten
   (alla är registrerade `LogonType Interactive`). Slå på Windows
   inställning för automatisk återinloggning efter uppdatering, eller flytta
   publiceringen till Graph API enligt punkt 1.
3. **Facebooks Publicera-knapp fryser återkommande** i renderaren
   (2026-08-17, -18 och -19): första klicket går aldrig ut. Agenten
   hanterar det redan — verifierar i omladdad vy att inget publicerats och
   postar om — men felet är så pass regelbundet att det bör vägas in om
   Graph API-frågan tas upp.
