# Ger de schemalagda jobben en långlivad inloggning för claude.exe.
# Dot-sourcas av alla skript som kör claude.exe headless (fb-/ig-daglig,
# fb-/ig-lansering, nyhetsbrev-test, some-rapport och auth-koll), direkt
# före anropet.
#
# Bakgrund: jobben använde claude.exe:s vanliga OAuth-inloggning, som ibland
# inte går att förnya ("OAuth session expired and could not be refreshed").
# Det stoppade alla inlägg 1 september och 29–31 oktober 2026. En nyckel från
# `claude.exe setup-token` gäller i ett år och påverkas inte av det.
#
# Nyckeln ligger UTANFÖR repot, i en fil som bara användaren kan läsa:
#   C:\Users\sam_s\.claude\nyhetsjobb-token.txt
# Det är samma fil som nyhetsjobbet (..\nyheter\daglig-nyhet.ps1) läser:
# EN nyckel för alla jobb. Filen innehåller bara nyckeln (en rad). Saknas filen används den vanliga
# inloggningen som förut. Sätt INTE nyckeln som en global miljövariabel:
# då tar den över även i Claude-appen.
#
# Utgångsdatumet (ett år efter setup-token) skrivs i
#   C:\Users\sam_s\.claude\nyhetsjobb-token-utgar.txt  (YYYY-MM-DD)
# så att auth-koll.ps1 kan mejla en påminnelse två veckor i förväg.

$tokenFil = Join-Path $env:USERPROFILE '.claude\nyhetsjobb-token.txt'
if (Test-Path $tokenFil) {
    $nyckel = (Get-Content $tokenFil -Raw).Trim()
    if ($nyckel) { $env:CLAUDE_CODE_OAUTH_TOKEN = $nyckel }
}
