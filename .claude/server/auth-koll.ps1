# Inloggningskollen: provar i förväg att claude.exe fortfarande är inloggad,
# så att ett utgånget konto upptäcks timmar INNAN jobben ska posta, i stället
# för när de redan har misslyckats.
#
# Körs av den schemalagda uppgiften "Fysiklabbet inloggningskoll" (07:30,
# 11:30, 17:45 och 23:00, före nyheten 03:15, lunchinläggen 12:03 och
# kvällsinläggen 18:33). Registrering: installera-auth-koll.ps1.
#
# Ett enda kort anrop ("Svara bara: ok") med samma claude.exe och samma
# nyckel (claude-token.ps1) som jobben. Svarar den med ett inloggningsfel
# larmar some-notis.ps1 med Windows-notis och e-post (högst ett mejl per
# dygn). Den mejlar också två veckor innan den långlivade nyckeln går ut.
# Infört 2026-10-31, efter två dygn utan inlägg.

$ErrorActionPreference = 'Continue'
$logDir = Join-Path $PSScriptRoot 'logg'
$logFil = Join-Path $logDir 'auth-koll.log'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }
function Logga($txt) {
    Add-Content -Path $logFil -Value ("[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $txt) -Encoding utf8
}
. (Join-Path $PSScriptRoot 'some-notis.ps1')

$claude = 'C:\Users\sam_s\AppData\Local\Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
if (-not (Test-Path $claude)) {
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    if ($cmd) { $claude = $cmd.Source } else {
        Logga 'FEL: claude.exe hittas inte.'
        SkickaEpostlarm 'claude-saknas' 'claude.exe hittas inte' 'Inloggningskollen hittar inte claude.exe på BOSGAME (varken WinGet-sökvägen eller PATH). Alla schemalagda jobb faller tills det är rättat; troligen har en uppdatering flyttat programmet.' $logDir | Out-Null
        exit 1
    }
}

$env:TELEGRAM_STATE_DIR = Join-Path $env:TEMP 'telegram-ingen-kanal'
Set-Location (Split-Path (Split-Path $PSScriptRoot -Parent) -Parent)
. (Join-Path $PSScriptRoot 'claude-token.ps1')   # langlivad nyckel, se filen
$ut = & $claude -p 'Svara bara: ok' --max-turns 1 2>&1 | Out-String
$kod = $LASTEXITCODE
if (LarmaVidInloggningsfel 'Inloggningskollen' $ut $logDir) {
    Logga "LARM: inloggningsfel ($($ut.Trim()))"
} elseif ($kod -ne 0) {
    Logga "Oklart svar (exit $kod): $($ut.Trim())"
} else {
    Logga "OK ($($ut.Trim()))"
}

# Påminnelse innan den långlivade nyckeln går ut
$utgarFil = Join-Path $env:USERPROFILE '.claude\nyhetsjobb-token-utgar.txt'
if (Test-Path $utgarFil) {
    try {
        $utgar = [datetime]::ParseExact((Get-Content $utgarFil -Raw).Trim(), 'yyyy-MM-dd', $null)
        $dagar = ($utgar - (Get-Date).Date).Days
        if ($dagar -le 14) {
            SkickaEpostlarm 'nyckel-utgar' "claude-nyckeln går ut om $dagar dagar" "Den långlivade nyckeln som de schemalagda jobben använder går ut $($utgar.ToString('yyyy-MM-dd')). Skapa en ny i Kommandotolken på BOSGAME med `"$claude`" setup-token, lägg nyckeln i C:\Users\sam_s\.claude\nyhetsjobb-token.txt och det nya utgångsdatumet i nyhetsjobb-token-utgar.txt." $logDir | Out-Null
            Logga "Nyckeln går ut om $dagar dagar - påminnelse skickad."
        }
    } catch { Logga "Kunde inte läsa utgångsdatumet: $_" }
}
exit 0
