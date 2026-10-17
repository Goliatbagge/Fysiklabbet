# Skickar testmejlet med veckans nyhetsbrevsutkast till användaren på
# lördagsmorgonen (stående önskemål 2026-10-17). Utkastet skrivs av
# molnroutinen "Nyhetsbrevsutkast — lördag morgon" (deadline 08.00), som
# saknar Gmail — därför sker utskicket här, på datorn.
#
# 1. node .claude/nyhetsbrev/testmejl.js hämtar söndagens utkast ur
#    origin/main och gör om det till ett testmejl i %TEMP%.
#    Saknas utkastet: nytt försök var tionde minut, högst sex gånger.
# 2. En headless Claude-session (/nyhetsbrev-testmejl) skickar det med
#    Gmail-kopplingen till användarens egen adress.
#
# Körs av den schemalagda uppgiften "Fysiklabbet nyhetsbrev testmejl"
# (lördagar 08:15), se installera-nyhetsbrev-test-task.ps1.
# Ett testmejl per utkast: en markörfil i logg-mappen hindrar dubbletter.
#
# Behörigheter: sessionen får ENDAST Gmail-verktyget send_message,
# ToolSearch och Read.

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

# Rör inte Telegram-kanalen (se fb-daglig.ps1).
$env:TELEGRAM_STATE_DIR = Join-Path $env:TEMP 'telegram-ingen-kanal'

$claude = 'C:\Users\sam_s\AppData\Local\Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
if (-not (Test-Path $claude)) {
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    if ($cmd) { $claude = $cmd.Source } else { Logga 'FEL: claude.exe hittas inte.'; exit 1 }
}

$verktyg = @(
    'mcp__claude_ai_Gmail__send_message'
    'ToolSearch'
    'Read'
) -join ','

$ut = & $claude -p '/nyhetsbrev-testmejl' --allowedTools $verktyg 2>&1 | Out-String
Logga $ut.Trim()
if ($ut -match 'SKICKAT\s+\S+') {
    Set-Content -Path $markor -Value (Get-Date -Format 's') -Encoding utf8
    Logga '--- testmejl skickat ---'
    exit 0
}
Logga '--- FEL: testmejlet skickades inte ---'
exit 1
