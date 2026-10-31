# Skickar testmejlet med veckans nyhetsbrevsutkast till användaren på
# lördagsmorgonen (stående önskemål 2026-10-17). Utkastet skrivs av
# molnroutinen "Nyhetsbrevsutkast — lördag morgon" (deadline 08.00), som
# saknar Chrome — därför sker testet här, på datorn.
#
# 1. node .claude/nyhetsbrev/testmejl.js kontrollerar att söndagens utkast
#    finns på origin/main. Saknas det: nytt försök var tionde minut, högst
#    sex gånger.
# 2. En headless Claude-session med Chrome (/nyhetsbrev-testmejl) lägger upp
#    kampanjen i EmailOctopus och trycker på "Send as test". Den schemalägger
#    aldrig. (Gmail-kopplingen prövades först men tar bort alla bilder.)
#
# Körs av den schemalagda uppgiften "Fysiklabbet nyhetsbrev testmejl"
# (lördagar 08:15), se installera-nyhetsbrev-test-task.ps1.
# Ett testmejl per utkast: en markörfil i logg-mappen hindrar dubbletter.
#
# Behörigheter: sessionen får ENDAST webbläsarverktygen, läsning, de
# kontroller brev-till-octopus kör (verifieraren, curl, grep, git log) och
# skrivning i nyhetsbrevsloggen. Ingen generell bypass.

$ErrorActionPreference = 'Continue'
$repo   = 'C:\claude\Fysiklabbet'
$logDir = Join-Path $repo '.claude\server\logg'
$logFil = Join-Path $logDir 'nyhetsbrev-test.log'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }

function Logga($txt) {
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $logFil -Value "[$stamp] $txt" -Encoding utf8
}

Logga '--- nyhetsbrev-test startar ---'
Set-Location $repo

$info = $null
for ($forsok = 1; $forsok -le 7; $forsok++) {
    $ut = & node .claude/nyhetsbrev/testmejl.js 2>&1 | Out-String
    $kod = $LASTEXITCODE
    if ($kod -eq 0) { $info = $ut.Trim() | ConvertFrom-Json; break }
    Logga "Försök ${forsok}: $($ut.Trim()) (exit $kod)"
    if ($kod -ne 2 -or $forsok -eq 7) { Logga '--- avbrutet, inget testmejl skickat ---'; exit 1 }
    Start-Sleep -Seconds 600
}

$markor = Join-Path $logDir "nyhetsbrev-test-$($info.datum).skickat"
if (Test-Path $markor) { Logga "Testmejl för $($info.datum) redan skickat - gör ingenting."; exit 0 }
Logga "Utkast $($info.datum): $($info.amne)"

# Chrome måste vara igång för att Claude-in-Chrome-utökningen ska svara.
if (-not (Get-Process chrome -ErrorAction SilentlyContinue)) {
    Logga 'Chrome kör inte - startar (minimerat).'
    Start-Process 'chrome.exe' -WindowStyle Minimized
    Start-Sleep -Seconds 20
}

# Rör inte Telegram-kanalen (se fb-daglig.ps1).
$env:TELEGRAM_STATE_DIR = Join-Path $env:TEMP 'telegram-ingen-kanal'

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
    'Edit(.claude/nyhetsbrev/logg.md)'
    'Bash(node .claude/verify-nyhetsbrev.js:*)'
    'Bash(curl:*)'
    'Bash(grep:*)'
    'Bash(git log:*)'
) -join ','

# --chrome är obligatoriskt: utan flaggan får en headless session aldrig
# Chrome-verktygen, oavsett --allowedTools.
. (Join-Path $PSScriptRoot 'claude-token.ps1')   # langlivad nyckel, se filen
$ut = & $claude --chrome -p "/nyhetsbrev-testmejl $($info.datum)" --allowedTools $verktyg 2>&1 | Out-String
Logga $ut.Trim()
. (Join-Path $PSScriptRoot 'some-notis.ps1')
if (LarmaVidInloggningsfel 'Nyhetsbrevets testmejl' $ut $logDir) { Logga 'LARM: inloggningsfel.' }
# -cmatch, inte -match: -match bryr sig inte om skiftläge, och "inget
# testmejl skickat" i en felrapport räknades som lyckat (2026-10-17).
if ($ut -cmatch '(?m)^TESTMEJL SKICKAT' -and $ut -cnotmatch '(?m)^FEL:') {
    Set-Content -Path $markor -Value (Get-Date -Format 's') -Encoding utf8
    Logga '--- testmejl skickat ---'
    exit 0
}
Logga '--- FEL: testmejlet skickades inte ---'
exit 1
