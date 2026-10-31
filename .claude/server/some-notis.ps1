# Gemensam Windows-notis för de sociala medie-jobben. Dot-sourcas av
# fb-daglig.ps1, ig-daglig.ps1, fb-lansering.ps1 och ig-lansering.ps1.
#
# Bakgrund (2026-09-05): den 1 september föll både fb-daglig och ig-daglig
# på "Failed to authenticate: OAuth session expired and could not be
# refreshed", och SoMe-vaktens omkörning kl 21:00 föll på exakt samma sak.
# Ingen människa fick veta något förrän vakten larmade sent på kvällen, och
# då var det för sent att logga in och rädda dagens inlägg. Därför larmar
# jobben numera SJÄLVA, direkt när claude.exe svarar med ett
# inloggningsfel, så att den som sitter vid datorn hinner köra
# `claude login` (eller logga in i Chrome-utökningen) före vaktens
# omkörning.
#
# OBS teckenkodning: filen sparas med UTF-8 BOM, annars läser Windows
# PowerShell 5.1 å/ä/ö som skräptecken i notistexten.

function VisaNotis($titel, $text) {
    try {
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        $mall = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent(
            [Windows.UI.Notifications.ToastTemplateType]::ToastText02)
        $texter = $mall.GetElementsByTagName('text')
        $texter.Item(0).AppendChild($mall.CreateTextNode($titel)) | Out-Null
        $texter.Item(1).AppendChild($mall.CreateTextNode($text)) | Out-Null
        # PowerShells registrerade AppUserModelID - krävs för att notisen ska visas.
        $appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell1.0\powershell.exe'
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show(
            [Windows.UI.Notifications.ToastNotification]::new($mall))
        return $true
    } catch {
        return $false
    }
}

# Känner igen ett inloggningsfel i claude.exe:s utskrift och larmar direkt:
# Windows-notis + rad i larmfilen SOME-LARM.txt (samma fil som vakten
# använder; vakten raderar den när dagens inlägg är på plats igen).
# Returnerar $true om ett inloggningsfel upptäcktes.
function LarmaVidInloggningsfel($jobbNamn, $utskrift, $loggDir) {
    if ($utskrift -notmatch 'Failed to authenticate|OAuth session expired|Not logged in|Please run /login|Invalid authentication') {
        return $false
    }
    $stamp   = Get-Date -Format 'yyyy-MM-dd HH:mm'
    $larmFil = Join-Path $loggDir 'SOME-LARM.txt'
    $text    = "LARM $stamp - $jobbNamn kunde inte logga in (claude.exe: OAuth-sessionen utgången). Kör 'claude login' i en terminal, eller logga in i Chrome-utökningen, så att vaktens omkörning lyckas."
    Add-Content -Path $larmFil -Value $text -Encoding utf8
    VisaNotis 'Fysiklabbet: inloggningen har gått ut!' "$jobbNamn kunde inte logga in. Kör 'claude login' nu, annars uteblir dagens inlägg." | Out-Null
    SkickaEpostlarm 'inloggning' 'claude.exe är utloggad' (InloggningsText $jobbNamn) $loggDir | Out-Null
    return $true
}

function InloggningsText($jobbNamn) {
    $exe = 'C:\Users\sam_s\AppData\Local\Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
    return @"
$jobbNamn kunde inte logga in: claude.exe svarade "OAuth session expired". Så länge det gäller postas inget på Facebook eller Instagram, och dagens nyhet och nyhetsbrevets testmejl uteblir också.

Logga in igen i Kommandotolken på BOSGAME:

    "$exe" auth login

Jobben använder i första hand den långlivade nyckeln i C:\Users\sam_s\.claude\nyhetsjobb-token.txt (se .claude/server/claude-token.ps1). Har den gått ut eller blivit ogiltig: kör "$exe" setup-token och spara den nya nyckeln i filen (bara nyckeln, en rad).

Inlägg som uteblivit postas inte i efterhand av sig själva. Loggarna ligger i .claude\server\logg\.
"@
}

# E-postlarm via GitHub (arbetsflödet .github/workflows/nyhetsjobb-larm.yml,
# samma som nyhetsjobbet använder): datorn
# startar arbetsflödet med gh, som öppnar ett ärende som github-actions och
# nämner ägaren, och GitHub mejlar. Infört 2026-10-31, efter att jobben varit
# utloggade i två dygn utan att någon märkt det: Windows-notisen syns bara
# för den som sitter vid datorn.
# Högst ett mejl per $nyckel och dygn (markörfil i loggmappen), så att fem
# jobb som faller på samma sak inte ger fem mejl.
function SkickaEpostlarm($nyckel, $rubrik, $text, $loggDir) {
    $markor = Join-Path $loggDir ("epostlarm-{0}-{1}.skickat" -f $nyckel, (Get-Date -Format 'yyyy-MM-dd'))
    if (Test-Path $markor) { return $false }
    $gh = (Get-Command gh -ErrorAction SilentlyContinue).Source
    if (-not $gh) { $gh = 'C:\Program Files\GitHub CLI\gh.exe' }
    try {
        $ut = & $gh workflow run nyhetsjobb-larm.yml --repo Goliatbagge/Fysiklabbet --ref main -f "rubrik=Fysiklabbet-larm $(Get-Date -Format 'yyyy-MM-dd'): $rubrik" -f "text=$text" 2>&1 | Out-String
        if ($LASTEXITCODE -eq 0) {
            Set-Content -Path $markor -Value (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') -Encoding utf8
            return $true
        }
        Add-Content -Path (Join-Path $loggDir 'SOME-LARM.txt') -Value "E-postlarmet kunde inte skickas (gh): $($ut.Trim())" -Encoding utf8
    } catch {
        Add-Content -Path (Join-Path $loggDir 'SOME-LARM.txt') -Value "E-postlarmet kunde inte skickas: $_" -Encoding utf8
    }
    return $false
}
