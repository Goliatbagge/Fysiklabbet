# Vakt för de dagliga sociala medie-jobben (Facebook 07:33, Instagram 07:48):
# kontrollerar att dagens inlägg faktiskt loggats i .claude/facebook/logg.md,
# kör annars om jobben (riskfritt — jobben läser samma logg och hoppar själva
# över det som redan postats) och LARMAR om det fortfarande saknas efteråt.
# Bakgrund: 2026-08-17 uteblev både Facebook- och Instagram-inlägget utan att
# någon märkte det förrän på eftermiddagen — BOSGAME står på dygnet runt, så
# en miss beror på något ihållande (utloggad session efter Windows-uppdatering,
# Chrome-utökningen inte ansluten, flyttad claude.exe) och behöver synas.
#
# Körs av den schemalagda uppgiften "Fysiklabbet SoMe-vakt" (09:30 och 14:00
# varje dag, endast när användaren är inloggad — samma krav som jobben själva:
# Chrome med Claude-utökningen). Registrering: installera-some-vakt.ps1.
#
# Larmkanaler när något saknas även efter omkörning:
#   1. Windows-notis (toast) i den inloggade sessionen.
#   2. Larmfilen .claude/server/logg/SOME-LARM.txt — skrivs med orsak och
#      slutet av körloggarna. Att filen FINNS betyder "olöst larm"; vakten
#      raderar den så snart allt är postat igen.
#   3. Rad i some-vakt.log.
# OBS: är ingen användare inloggad startar vakten inte alls (Interactive) —
# det syns i Schemaläggaren som "kunde inte starta". Den luckan täcks inte
# härifrån; logga in igen efter omstarter (eller slå på Windows automatiska
# återinloggning efter uppdatering).

$ErrorActionPreference = 'Continue'
$repo     = 'C:\claude\Fysiklabbet'
$logDir   = Join-Path $repo '.claude\server\logg'
$logFil   = Join-Path $logDir 'some-vakt.log'
$larmFil  = Join-Path $logDir 'SOME-LARM.txt'
$someLogg = Join-Path $repo '.claude\facebook\logg.md'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }

function Logga($txt) {
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $logFil -Value "[$stamp] $txt" -Encoding utf8
}

# Dagens avsnitt i den delade publiceringsloggen: raderna från dagens rubrik
# ("## 2026-08-17") till filslutet. Rubriken matchas på RADENS BÖRJAN — inte
# som fritext någonstans i filen: datumet förekommer även inuti artikel-id:n
# och bildvägar ("nyheter/bilder/2026-08-17-….jpg"), och en fritextsökning
# hade då klippt sektionen mitt i en rad och tappat raderna före den.
function DagensSektion {
    if (-not (Test-Path $someLogg)) { return @() }
    $rader = @(Get-Content $someLogg -Encoding utf8)
    $idag  = Get-Date -Format 'yyyy-MM-dd'
    $start = -1
    for ($i = 0; $i -lt $rader.Count; $i++) {
        if ($rader[$i] -match "^\s*#*\s*$idag\b") { $start = $i }
    }
    if ($start -lt 0) { return @() }
    return $rader[$start..($rader.Count - 1)]
}

# Ett jobb räknas som avklarat först när dess NYHETSRAD för i dag säger att
# något faktiskt hänt: "postad …" eller "ingen artikel i dag".
# Två fällor som loggen från 2026-08-17 avslöjade:
#   1. Agenten skriver en rad även när den MISSLYCKAS ("nyhet: FEL kl 07:33
#      (Chrome-verktygen saknades)"). Att bara leta efter en rad hade alltså
#      lästs som ett lyckat inlägg — vakten hade tigit still vid exakt det
#      fel den finns till för att fånga. Därför krävs ordet "postad".
#      Samma nyckelord som agenternas eget dubbelpostningsskydd använder.
#   2. Lanseringsrader ("lansering: postad …", "ig-lansering: postad …") får
#      INTE räknas som dagens nyhetsinlägg — därför ankras prefixen till
#      radens början: "nyhet:" för Facebook, "ig-nyhet:" för Instagram.
function JobbStatus {
    $fb = $false
    $ig = $false
    foreach ($rad in (DagensSektion)) {
        $r = $rad.Trim()
        if (($r -notmatch '(?i)postad') -and ($r -notmatch '(?i)ingen artikel')) { continue }
        if     ($r -match '(?i)^ig-?nyhet\s*:') { $ig = $true }
        elseif ($r -match '(?i)^nyhet\s*:')     { $fb = $true }
    }
    [pscustomobject]@{ fb = $fb; ig = $ig }
}

# Skydd mot dubbelkörning: om jobbets körlogg har en "startar"-rad utan
# efterföljande "klar" och starten är färskare än 35 min antas jobbet
# fortfarande köra (uppgifternas tidsgräns är 30 min) — då väntar vakten
# till nästa trigger i stället för att starta en parallell session.
function JobbetKorJustNu($jobbLoggFil) {
    if (-not (Test-Path $jobbLoggFil)) { return $false }
    $senasteStart = $null
    $senasteKlar  = $null
    foreach ($rad in (Get-Content $jobbLoggFil -Tail 60 -Encoding utf8)) {
        if ($rad -match '^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]') {
            $t = [datetime]::ParseExact($Matches[1], 'yyyy-MM-dd HH:mm:ss', $null)
            if     ($rad -match 'startar ---') { $senasteStart = $t }
            elseif ($rad -match 'klar \(exit') { $senasteKlar  = $t }
        }
    }
    if ($senasteStart -and (-not $senasteKlar -or $senasteKlar -lt $senasteStart)) {
        return ((Get-Date) - $senasteStart).TotalMinutes -lt 35
    }
    return $false
}

function VisaNotis($titel, $text) {
    try {
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        $mall = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent(
            [Windows.UI.Notifications.ToastTemplateType]::ToastText02)
        $texter = $mall.GetElementsByTagName('text')
        $texter.Item(0).AppendChild($mall.CreateTextNode($titel)) | Out-Null
        $texter.Item(1).AppendChild($mall.CreateTextNode($text)) | Out-Null
        # PowerShells registrerade AppUserModelID — krävs för att notisen ska visas.
        $appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show(
            [Windows.UI.Notifications.ToastNotification]::new($mall))
    } catch {
        Logga "Kunde inte visa Windows-notis: $_"
    }
}

function SistaRaderna($fil, $antal = 15) {
    if (Test-Path $fil) { (Get-Content $fil -Tail $antal -Encoding utf8) -join "`r`n" }
    else { "(loggfilen $fil finns inte)" }
}

Logga '--- some-vakt startar ---'

# Före 08:00 har jobben inte haft sin chans än — gör inget (händer bara vid
# manuell körning; de schemalagda triggrarna ligger 09:30 och 14:00).
if ((Get-Date).TimeOfDay -lt [timespan]'08:00') {
    Logga 'Klockan är före 08:00 - jobben har inte kört än. Avvaktar.'
    exit 0
}

$status = JobbStatus
if ($status.fb -and $status.ig) {
    Logga 'Facebook och Instagram är loggade för i dag - allt väl.'
    if (Test-Path $larmFil) { Remove-Item $larmFil; Logga 'Larmfilen rensad.' }
    exit 0
}

# Något saknas — kör om de jobb som inte är loggade (om de inte redan kör).
$jobb = @(
    @{ namn = 'Facebook';  klart = $status.fb; skript = 'fb-daglig.ps1'; logg = 'fb-daglig.log' }
    @{ namn = 'Instagram'; klart = $status.ig; skript = 'ig-daglig.ps1'; logg = 'ig-daglig.log' }
)
$vantarPaKorning = $false
foreach ($j in $jobb) {
    if ($j.klart) { continue }
    $jobbLogg = Join-Path $logDir $j.logg
    if (JobbetKorJustNu $jobbLogg) {
        Logga "$($j.namn)-jobbet verkar köra just nu - avvaktar till nästa kontroll."
        $vantarPaKorning = $true
        continue
    }
    $skript = Join-Path $PSScriptRoot $j.skript
    Logga "$($j.namn)-raden saknas för i dag - kör om $($j.skript)."
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $skript
    Logga "$($j.namn)-omkörningen avslutad (exit $LASTEXITCODE)."
}

# Kontrollera igen efter omkörningarna.
$status = JobbStatus
if ($status.fb -and $status.ig) {
    Logga 'Omkörningen löste det - allt postat/loggat nu.'
    if (Test-Path $larmFil) { Remove-Item $larmFil; Logga 'Larmfilen rensad.' }
    exit 0
}
if ($vantarPaKorning -and (($status.fb -or (JobbetKorJustNu (Join-Path $logDir 'fb-daglig.log'))) -and
                           ($status.ig -or (JobbetKorJustNu (Join-Path $logDir 'ig-daglig.log'))))) {
    Logga 'Jobb pågår fortfarande - inget larm, nästa trigger följer upp.'
    exit 0
}

# Fortfarande inte klart — larma.
$saknas = @()
if (-not $status.fb) { $saknas += 'Facebook' }
if (-not $status.ig) { $saknas += 'Instagram' }
$vad = $saknas -join ' och '
Logga "LARM: $vad saknar dagens rad även efter omkörning."

$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
@"
LARM $stamp — dagens inlägg saknas: $vad

Vakten hittade ingen rad för i dag i .claude\facebook\logg.md och en
omkörning hjälpte inte. Vanliga orsaker: Chrome-utökningen inte ansluten,
inte inloggad på Facebook/Instagram som Fysiklabbet, eller claude.exe
som inte hittas efter en uppdatering.

Felsök: läs sluten på körloggarna nedan, kör sedan jobbet för hand i
C:\claude\Fysiklabbet med  claude -p '/fb-daglig'  respektive  '/ig-daglig'.
Den här filen raderas automatiskt av vakten när allt är postat igen.

=== slutet av fb-daglig.log ===
$(SistaRaderna (Join-Path $logDir 'fb-daglig.log'))

=== slutet av ig-daglig.log ===
$(SistaRaderna (Join-Path $logDir 'ig-daglig.log'))
"@ | Set-Content -Path $larmFil -Encoding utf8

VisaNotis 'Fysiklabbet: inlägg saknas!' "Dagens $vad-inlägg är inte postat trots omkörning. Se SOME-LARM.txt i .claude\server\logg."
exit 1
