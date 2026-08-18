# Vakt för de dagliga sociala medie-jobben — nyhetsinläggen på morgonen
# (Facebook 07:33, Instagram 07:48) och lanseringsjobben på eftermiddagen
# (Facebook 13:03, Instagram 13:18; lanseringar postas medvetet senare än
# nyheten så att den inte puttas ner, önskemål 2026-08-18):
# kontrollerar att dagens rader faktiskt loggats i .claude/facebook/logg.md,
# kör annars om jobben (riskfritt — jobben läser samma logg och hoppar själva
# över det som redan postats) och LARMAR om det fortfarande saknas efteråt.
# Lanseringsjobben kontrolleras först från 13:30 (14:00-triggern) — före dess
# har de inte haft sin chans. Ett lanseringsjobb är "klart" även när det
# loggat att ingen lansering fanns; det som bevakas är att KÖRNINGEN skett.
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
#      radens början: "nyhet:" för Facebook, "ig-nyhet:" för Instagram,
#      "lansering:"/"ig-lansering:" för eftermiddagsjobben.
# Godkända statusar per jobb (fälla 1 gäller alla — kräv ett positivt ord):
#   nyhet/ig-nyhet:        "postad" eller "ingen artikel"
#   lansering/ig-lansering: "postad", eller "ingen" DIREKT efter kolonet
#                          ("lansering: ingen ny lansering") — ett FEL-
#                          meddelande som råkar innehålla ordet "ingen"
#                          ("FEL … ingen Chrome") ska inte räknas som klart.
function JobbStatus {
    $fb  = $false
    $ig  = $false
    $fbL = $false
    $igL = $false
    foreach ($rad in (DagensSektion)) {
        $r = $rad.Trim()
        if ($r -match '(?i)^ig-lansering\s*:') {
            if ($r -match '(?i)postad' -or $r -match '(?i)^ig-lansering\s*:\s*ingen') { $igL = $true }
        } elseif ($r -match '(?i)^lansering\s*:') {
            if ($r -match '(?i)postad' -or $r -match '(?i)^lansering\s*:\s*ingen') { $fbL = $true }
        } elseif ($r -match '(?i)^ig-?nyhet\s*:') {
            if ($r -match '(?i)postad' -or $r -match '(?i)ingen artikel') { $ig = $true }
        } elseif ($r -match '(?i)^nyhet\s*:') {
            if ($r -match '(?i)postad' -or $r -match '(?i)ingen artikel') { $fb = $true }
        }
    }
    [pscustomobject]@{ fb = $fb; ig = $ig; fbL = $fbL; igL = $igL }
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

# Jobben som bevakas. Lanseringsjobben (13:03/13:18) tas med först från
# 13:30 — före dess har de inte haft sin chans, och 09:30-triggern ska
# inte köra dem i förtid (då postades lanseringen på förmiddagen igen,
# precis det schemaflytten skulle bort från).
$jobb = @(
    @{ namn = 'Facebook-nyhet';  falt = 'fb'; skript = 'fb-daglig.ps1'; logg = 'fb-daglig.log'; kommando = '/fb-daglig' }
    @{ namn = 'Instagram-nyhet'; falt = 'ig'; skript = 'ig-daglig.ps1'; logg = 'ig-daglig.log'; kommando = '/ig-daglig' }
)
if ((Get-Date).TimeOfDay -ge [timespan]'13:30') {
    $jobb += @{ namn = 'Facebook-lansering';  falt = 'fbL'; skript = 'fb-lansering.ps1'; logg = 'fb-lansering.log'; kommando = '/fb-lansering' }
    $jobb += @{ namn = 'Instagram-lansering'; falt = 'igL'; skript = 'ig-lansering.ps1'; logg = 'ig-lansering.log'; kommando = '/ig-lansering' }
}

$status = JobbStatus
$olosta = @($jobb | Where-Object { -not $status.($_.falt) })
if ($olosta.Count -eq 0) {
    Logga "Alla bevakade jobb ($(($jobb | ForEach-Object { $_.namn }) -join ', ')) är loggade för i dag - allt väl."
    if (Test-Path $larmFil) { Remove-Item $larmFil; Logga 'Larmfilen rensad.' }
    exit 0
}

# Något saknas — kör om de jobb som inte är loggade (om de inte redan kör).
foreach ($j in $olosta) {
    $jobbLogg = Join-Path $logDir $j.logg
    if (JobbetKorJustNu $jobbLogg) {
        Logga "$($j.namn)-jobbet verkar köra just nu - avvaktar till nästa kontroll."
        continue
    }
    $skript = Join-Path $PSScriptRoot $j.skript
    Logga "$($j.namn)-raden saknas för i dag - kör om $($j.skript)."
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $skript
    Logga "$($j.namn)-omkörningen avslutad (exit $LASTEXITCODE)."
}

# Kontrollera igen efter omkörningarna.
$status = JobbStatus
$olosta = @($jobb | Where-Object { -not $status.($_.falt) })
if ($olosta.Count -eq 0) {
    Logga 'Omkörningen löste det - allt postat/loggat nu.'
    if (Test-Path $larmFil) { Remove-Item $larmFil; Logga 'Larmfilen rensad.' }
    exit 0
}
$pagaende = @($olosta | Where-Object { JobbetKorJustNu (Join-Path $logDir $_.logg) })
if ($pagaende.Count -eq $olosta.Count) {
    Logga 'Jobb pågår fortfarande - inget larm, nästa trigger följer upp.'
    exit 0
}

# Fortfarande inte klart — larma.
$vad = ($olosta | ForEach-Object { $_.namn }) -join ' och '
Logga "LARM: $vad saknar dagens rad även efter omkörning."

$kommandon  = ($olosta | ForEach-Object { "claude -p '$($_.kommando)'" }) -join '  respektive  '
$loggUtdrag = ($olosta | ForEach-Object {
    "=== slutet av $($_.logg) ===`r`n$(SistaRaderna (Join-Path $logDir $_.logg))"
}) -join "`r`n`r`n"
$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
@"
LARM $stamp — dagens inlägg saknas: $vad

Vakten hittade ingen rad för i dag i .claude\facebook\logg.md och en
omkörning hjälpte inte. Vanliga orsaker: Chrome-utökningen inte ansluten,
inte inloggad på Facebook/Instagram som Fysiklabbet, eller claude.exe
som inte hittas efter en uppdatering.

Felsök: läs sluten på körloggarna nedan, kör sedan jobbet för hand i
C:\claude\Fysiklabbet med  $kommandon.
Den här filen raderas automatiskt av vakten när allt är postat igen.

$loggUtdrag
"@ | Set-Content -Path $larmFil -Encoding utf8

VisaNotis 'Fysiklabbet: inlägg saknas!' "Dagens $vad är inte postat/loggat trots omkörning. Se SOME-LARM.txt i .claude\server\logg."
exit 1
