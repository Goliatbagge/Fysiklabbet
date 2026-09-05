# Kör det dagliga Instagram-jobbet: startar en headless Claude Code-session
# som följer .claude/commands/ig-daglig.md (dagens fysiknyhet på
# Fysiklabbets Instagram-konto; lanseringsinlägg sköts av
# kvällsjobbet ig-lansering.ps1 kl 19:48).
#
# Körs av den schemalagda uppgiften "Fysiklabbet Instagram-inlagg"
# (13:18 varje dag, efter Facebook-jobbet 13:03; endast när användaren är
# inloggad — Chrome med Claude-utökningen krävs).
# Registrering: se installera-ig-task.ps1 i samma mapp.

$ErrorActionPreference = 'Continue'
$repo   = 'C:\claude\Fysiklabbet'
$logDir = Join-Path $repo '.claude\server\logg'
$logFil = Join-Path $logDir 'ig-daglig.log'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }

function Logga($txt) {
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $logFil -Value "[$stamp] $txt" -Encoding utf8
}

Logga '--- ig-daglig startar ---'

if (-not (Get-Process chrome -ErrorAction SilentlyContinue)) {
    Logga 'Chrome kör inte - startar (minimerat).'
    Start-Process 'chrome.exe' -WindowStyle Minimized
    Start-Sleep -Seconds 20
}

$claude = 'C:\Users\sam_s\AppData\Local\Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
if (-not (Test-Path $claude)) {
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
$ut = & $claude --chrome -p '/ig-daglig' --allowedTools $verktyg 2>&1 | Out-String
Logga $ut.Trim()
$exitKod = $LASTEXITCODE
# Larma DIREKT vid inloggningsfel (se some-notis.ps1) - vaktens omkoerning
# senare samma dag faller annars paa samma sak utan att naagon hunnit logga in.
. (Join-Path $PSScriptRoot 'some-notis.ps1')
if (LarmaVidInloggningsfel 'Instagram-nyhet' $ut $logDir) { Logga 'LARM: inloggningsfel - Windows-notis visad, SOME-LARM.txt uppdaterad.' }
Logga "--- ig-daglig klar (exit $exitKod) ---"
exit $exitKod
