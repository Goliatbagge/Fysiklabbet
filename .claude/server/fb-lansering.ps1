# Kör Facebook-lanseringsjobbet: startar en headless Claude Code-session
# som följer .claude/commands/fb-lansering.md (ev. inlägg om större
# lanseringar på sajten, på sidan facebook.com/fysiklabbet).
#
# Körs av den schemalagda uppgiften "Fysiklabbet Facebook-lansering"
# (19:33 varje dag, endast när användaren är inloggad — Chrome med
# Claude-utökningen måste finnas i den interaktiva sessionen).
# Registrering: se installera-lansering-tasks.ps1 i samma mapp.
#
# Sedan 2026-09-05 ligger nyhetsjobbet fb-daglig.ps1 på lunchen (13:03)
# och lanseringen här på kvällen — användarens uttryckliga önskemål:
# fysiknyheten vid lunch, sajtnyheter och tips senare på dagen. (27 aug
# till 5 sep var ordningen den omvända; dessförinnan låg nyheten på
# morgonen och lanseringen på lunchen.)

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
$ut = & $claude --chrome -p '/fb-lansering' --allowedTools $verktyg 2>&1 | Out-String
Logga $ut.Trim()
$exitKod = $LASTEXITCODE
# Larma DIREKT vid inloggningsfel (se some-notis.ps1) - vaktens omkoerning
# senare samma dag faller annars paa samma sak utan att naagon hunnit logga in.
. (Join-Path $PSScriptRoot 'some-notis.ps1')
if (LarmaVidInloggningsfel 'Facebook-lansering' $ut $logDir) { Logga 'LARM: inloggningsfel - Windows-notis visad, SOME-LARM.txt uppdaterad.' }
Logga "--- fb-lansering klar (exit $exitKod) ---"
exit $exitKod
