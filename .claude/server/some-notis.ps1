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
    return $true
}
