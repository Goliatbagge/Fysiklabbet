# Kör det dagliga Facebook-jobbet: startar en headless Claude Code-session
# som följer .claude/commands/fb-daglig.md (dagens fysiknyhet + ev.
# lanseringsinlägg på sidan facebook.com/fysiklabbet).
#
# Körs av den schemalagda uppgiften "Fysiklabbet Facebook-inlagg"
# (07:33 varje dag, endast när användaren är inloggad — Chrome med
# Claude-utökningen måste finnas i den interaktiva sessionen).
# Registrering: se installera-fb-task.ps1 i samma mapp.
#
# Behörigheter: sessionen får ENDAST de verktyg som räknas upp i
# --allowedTools nedan (webbläsarverktygen, läsning, git log samt
# skrivning av loggfilen). Ingen generell bypass.

$ErrorActionPreference = 'Continue'
$repo   = 'C:\claude\Fysiklabbet'
$logDir = Join-Path $repo '.claude\server\logg'
$logFil = Join-Path $logDir 'fb-daglig.log'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }

function Logga($txt) {
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $logFil -Value "[$stamp] $txt" -Encoding utf8
}

Logga '--- fb-daglig startar ---'

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
$ut = & $claude -p '/fb-daglig' --allowedTools $verktyg 2>&1 | Out-String
Logga $ut.Trim()
Logga "--- fb-daglig klar (exit $LASTEXITCODE) ---"
exit $LASTEXITCODE
