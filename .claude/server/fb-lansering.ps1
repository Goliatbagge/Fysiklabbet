# Kör Facebook-lanseringsjobbet: startar en headless Claude Code-session
# som följer .claude/commands/fb-lansering.md (ev. inlägg om större
# lanseringar på sajten, på sidan facebook.com/fysiklabbet).
#
# Körs av den schemalagda uppgiften "Fysiklabbet Facebook-lansering"
# (13:03 varje dag, endast när användaren är inloggad — Chrome med
# Claude-utökningen måste finnas i den interaktiva sessionen).
# Registrering: se installera-lansering-tasks.ps1 i samma mapp.
#
# Jobbet ligger medvetet på eftermiddagen: morgonjobbet fb-daglig.ps1
# (07:33) postar dagens fysiknyhet, och ett lanseringsinlägg direkt
# efter puttade tidigare ner nyheten från sidans topp.

$ErrorActionPreference = 'Continue'
$repo   = 'C:\claude\Fysiklabbet'
$logDir = Join-Path $repo '.claude\server\logg'
$logFil = Join-Path $logDir 'fb-lansering.log'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }

function Logga($txt) {
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $logFil -Value "[$stamp] $txt" -Encoding utf8
}

Logga '--- fb-lansering startar ---'

# Chrome måste vara igång för att Claude-in-Chrome-utökningen ska svara.
if (-not (Get-Process chrome -ErrorAction SilentlyContinue)) {
    Logga 'Chrome kör inte - startar (minimerat).'
    Start-Process 'chrome.exe' -WindowStyle Minimized
    Start-Sleep -Seconds 20
}

$claude = 'C:\Users\sam_s\AppData\Local\Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
if (-not (Test-Path $claude)) {
    # Winget-sökvägen kan ändras vid uppdatering - falla tillbaka på PATH.
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    if ($cmd) { $claude = $cmd.Source } else { Logga 'FEL: claude.exe hittas inte.'; exit 1 }
}

$verktyg = @(
    'mcp__claude-in-chrome__*'
    'ToolSearch'
    'Read'
    'Grep'
    'Glob'
    'Edit(.claude/facebook/logg.md)'
    'Bash(git log:*)'
) -join ','

Set-Location $repo
$ut = & $claude -p '/fb-lansering' --allowedTools $verktyg 2>&1 | Out-String
Logga $ut.Trim()
Logga "--- fb-lansering klar (exit $LASTEXITCODE) ---"
exit $LASTEXITCODE
