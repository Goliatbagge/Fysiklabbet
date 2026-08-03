# =====================================================================
#  Fysiklabbet - registrerar den lokala utvecklingsservern som en
#  schemalagd uppgift, sa att http://localhost:8000 alltid ar igang.
#
#  EN uppgift, "Fysiklabbet dev-server", med tva triggrar:
#    ONLOGON + 30 s          - servern ar uppe direkt efter inloggning
#    var 5:e minut, for evigt - vakthund: startar om servern om den dott
#                               (kraschat, dodats av ett verktyg, eller
#                               stangts av en omstart av Python)
#
#  Vakten (dev-server-vakt.ps1) gor INGENTING om servern redan svarar, sa
#  femminuters-triggern kostar nastan inget och ger aldrig tva servrar.
#  Darfor behovs ingen evighetsprocess som Schemalaggaren maste halla liv i.
#
#  Kor en gang:
#    powershell -ExecutionPolicy Bypass -File installera-server-task.ps1
#  Annan port:
#    powershell -ExecutionPolicy Bypass -File installera-server-task.ps1 -Port 8080
#  Ta bort:
#    powershell -ExecutionPolicy Bypass -File installera-server-task.ps1 -Avinstallera
#
#  Kraver INTE administratorsrattigheter (uppgiften registreras i den
#  inloggade anvandarens kontext, RunLevel Limited).
# =====================================================================

param(
    [int]$Port    = 8000,
    [string]$Namn = 'Fysiklabbet dev-server',
    [int]$Minuter = 5,
    [switch]$Lokal,
    [switch]$Avinstallera
)

# Servern oppnas mot hemmanatverket som standard (telefon, surfplatta).
# -Lokal begransar den till 127.0.0.1 igen.
$Natverk = -not $Lokal

$ErrorActionPreference = 'Stop'

# --- Avinstallation -------------------------------------------------
if ($Avinstallera) {
    try {
        Unregister-ScheduledTask -TaskName $Namn -Confirm:$false
        Write-Output "Borttagen: $Namn"
    } catch {
        Write-Output "Fanns inte: $Namn"
    }
    Write-Output "Servern som redan kor stoppas inte. Gor det med:"
    Write-Output "  powershell -ExecutionPolicy Bypass -File `"$PSScriptRoot\dev-server-vakt.ps1`" -Stoppa"
    return
}

# --- Sokvagar harleds ur skriptets egen plats, aldrig hardkodade -----
# Skriptet ligger i <repo>\.claude\server\ -> tva niva upp ar repo-roten.
$Repo   = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$Script = Join-Path $PSScriptRoot 'dev-server-vakt.ps1'

if (-not (Test-Path $Script)) {
    Write-Output "AVBRUTET: hittar inte $Script"
    exit 1
}
if (-not (Test-Path (Join-Path $Repo 'index.html'))) {
    Write-Output "AVBRUTET: $Repo ser inte ut som Fysiklabbet-repot (index.html saknas)."
    exit 1
}

Write-Output "Repo:   $Repo"
Write-Output "Skript: $Script"
Write-Output "Port:   $Port"
Write-Output ''

$Argument = '-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "{0}" -Port {1}' -f $Script, $Port
if ($Natverk) { $Argument += ' -Natverk' }

$Action = New-ScheduledTaskAction -Execute 'powershell.exe' `
                                  -Argument $Argument `
                                  -WorkingDirectory $Repo

# Kor som den inloggade anvandaren, utan admin-hojning.
# $env:USERDOMAIN duger INTE: i en SSH-session ar den 'WORKGROUP', och
# 'WORKGROUP\namn' gar inte att sla upp till nagot SID -> registreringen
# faller pa "ingen mappning mellan kontonamn och sakerhets-ID".
# WindowsIdentity ger alltid ratt form: MASKIN\anvandare.
$KontoNamn = [Security.Principal.WindowsIdentity]::GetCurrent().Name

$Principal = New-ScheduledTaskPrincipal -UserId $KontoNamn `
                                        -LogonType Interactive `
                                        -RunLevel Limited

# ExecutionTimeLimit 10 min: vakten ar klar pa nagra sekunder. Sjalva servern
# ar en FRISTAENDE process som lever vidare efter att uppgiften avslutats -
# tidsgransen gäller alltsa bara vakten, inte servern.
# IgnoreNew: femminuters-triggern staplar aldrig instanser pa varandra.
$Settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 10) `
    -MultipleInstances IgnoreNew `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -DontStopOnIdleEnd

# --- Trigger 1: vid inloggning --------------------------------------
# -User MASTE anges. Utan den blir triggern "vid vilken anvandares inloggning
# som helst", vilket kraver administratorsrattigheter -> "Atkomst nekad".
$TriggerLogon = New-ScheduledTaskTrigger -AtLogOn -User $KontoNamn
$TriggerLogon.Delay = 'PT30S'

# --- Trigger 2: vakthund var femte minut, utan slutdatum -------------
# Duration maste sattas till tom strang for "pa obestamd tid" - anger man
# en tidsrymd slutar uppgiften kora nar den lopt ut, och servern skulle
# tyst sluta starta om sig sjalv nagon gang i framtiden.
$TriggerVakt = New-ScheduledTaskTrigger -Once -At (Get-Date).Date `
                                        -RepetitionInterval (New-TimeSpan -Minutes $Minuter)
$TriggerVakt.Repetition.Duration = ''
$TriggerVakt.Repetition.StopAtDurationEnd = $false

Register-ScheduledTask -TaskName $Namn `
                       -Action $Action -Trigger @($TriggerLogon, $TriggerVakt) `
                       -Principal $Principal -Settings $Settings `
                       -Description "Haller den lokala utvecklingsservern (.claude\dev-server.py) igang pa http://localhost:$Port. Startar vid inloggning och kontrolleras var $($Minuter):e minut." `
                       -Force | Out-Null

Write-Output "OK  $Namn - vid inloggning + var $($Minuter):e minut"

# --- Kontroll: slapper brandvaggen in hemmanatverket? ----------------
# Windows blockerar inkommande anslutningar tyst - servern kor, men
# telefonen far bara "kan inte na sidan". Regeln maste skapas EN gang i ett
# administrators-PowerShell; det har skriptet kraver ingen hojning och
# skapar den darfor inte sjalvt, utan skriver bara ut vad som saknas.
if ($Natverk) {
    $RegelNamn = "Fysiklabbet dev-server (TCP $Port)"
    $blockerar = @(Get-NetFirewallApplicationFilter |
                   Where-Object { $_.Program -like '*python*' } | Get-NetFirewallRule |
                   Where-Object { $_.Direction -eq 'Inbound' -and $_.Action -eq 'Block' }).Count

    if ((Get-NetFirewallRule -DisplayName $RegelNamn -ErrorAction SilentlyContinue) -and $blockerar -eq 0) {
        Write-Output "OK  Brandvaggen slapper in hemmanatverket."
    } else {
        Write-Output ''
        Write-Output 'BRANDVAGGEN SLAPPER INTE IN NATVERKET AN.'
        if ($blockerar -gt 0) {
            Write-Output ("  ({0} blockera-regel(er) for python finns - de vinner over allt annat.)" -f $blockerar)
        }
        Write-Output 'Kor EN gang i ett PowerShell startat som administrator:'
        Write-Output ("  powershell -ExecutionPolicy Bypass -File `"{0}\oppna-brandvagg.ps1`"" -f $PSScriptRoot)
        Write-Output ''
    }

    # Regeln galler bara Private-natverk. Ar anslutningen klassad som Public
    # slapps inget in, hur ratt regeln an ser ut.
    Get-NetConnectionProfile -ErrorAction SilentlyContinue |
        Where-Object { $_.IPv4Connectivity -ne 'Disconnected' -and $_.NetworkCategory -ne 'Private' } |
        ForEach-Object {
            Write-Output ("VARNING: natverket '{0}' ar {1}, inte Private - regeln galler da inte." -f $_.Name, $_.NetworkCategory)
            Write-Output ("  Atgard (admin): Set-NetConnectionProfile -InterfaceIndex {0} -NetworkCategory Private" -f $_.InterfaceIndex)
        }
}

# --- Starta direkt, sa att servern ar uppe nu ------------------------
Start-ScheduledTask -TaskName $Namn
Start-Sleep -Seconds 6

Get-ScheduledTask -TaskName $Namn |
    ForEach-Object {
        $info = $_ | Get-ScheduledTaskInfo
        [PSCustomObject]@{
            Uppgift      = $_.TaskName
            Tillstand    = $_.State
            SenasteKord  = $info.LastRunTime
            NastaKorning = $info.NextRunTime
        }
    } | Format-Table -AutoSize | Out-String | Write-Output

& powershell -NoProfile -ExecutionPolicy Bypass -File $Script -Port $Port -Status

Write-Output ''
Write-Output "Logg: .claude\server\logg\vakt.log"
Write-Output "Stoppa tillfalligt:  powershell -File `"$Script`" -Stoppa"
$OmStart = "powershell -File `"$Script`" -Starta_om"
if ($Natverk) { $OmStart += ' -Natverk' }
Write-Output "Starta om:           $OmStart"
