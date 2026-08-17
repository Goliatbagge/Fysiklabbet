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

## Öppna punkter

1. **Ta reda på varför `mcp__claude-in-chrome__*` saknas i den schemalagda
   sessionen.** Diagnoser att börja med:
   ```powershell
   claude mcp list
   claude -p 'Lista med ToolSearch alla verktyg vars namn börjar med mcp__claude-in-chrome. Svara bara med namnen, eller INGA.' --allowedTools 'ToolSearch'
   ```
   Ger den andra verktygsnamn när den körs för hand, men inte från den
   schemalagda uppgiften, sitter skillnaden i sessionskontexten — troligen
   att Claude in Chrome-tillägget måste vara aktivt anslutet och att en
   headless bakgrundssession inte får den anslutningen. Testa i så fall att
   köra samma kommando från en schemalagd uppgift för att bekräfta.
2. **Överväg Meta Graph API i stället för webbläsarstyrning.** Graph API kan
   posta till Facebook-sidor och Instagram Business-konton utan Chrome, utan
   tillägg och utan inloggad session — då kan jobbet flyttas till en GitHub
   Action och blir helt oberoende av BOSGAME. Kräver en Meta-utvecklarapp,
   sidtoken och att Instagram-kontot är ett företagskonto. Bedömningen efter
   17 augusti är att detta troligen är den rätta långsiktiga lösningen,
   eftersom webbläsarvägen ser ut att vara ostabil just i automatiserat läge.
3. **Luckan vakten inte täcker:** startar datorn om efter en
   Windows-uppdatering och ingen loggar in, kör varken jobben eller vakten
   (alla tre är registrerade `LogonType Interactive`). Slå på Windows
   inställning för automatisk återinloggning efter uppdatering, eller flytta
   publiceringen till Graph API enligt punkt 2.
