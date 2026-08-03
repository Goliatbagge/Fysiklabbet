# =====================================================================
#  Fysiklabbet - registrerar den dagliga nyhetsuppgiften.
#
#  Avsedd for en maskin som star pa DYGNET RUNT: uppgiften utloses pa
#  KLOCKSLAG varje natt, inte bara vid inloggning. Den gamla ONLOGON-
#  varianten kordes i praktiken aldrig pa en maskin som star pa hela
#  tiden - dar sker ju ingen ny inloggning.
#
#  Tva uppgifter registreras:
#    "<Namn>"          DAILY <Tid>      - huvudkorningen
#    "<Namn> (start)"  ONLOGON + 5 min  - skyddsnat efter omstart
#                                         (stromavbrott, Windows Update)
#
#  Skriptets egna sparrar (dygnskoll mot data/nyheter.js, max 2 forsok
#  per dygn, lasfil) gor det ofarligt att ha bada triggrarna: tva
#  korningar samma dygn kan aldrig ge tva artiklar.
#
#  Kor en gang:
#    powershell -ExecutionPolicy Bypass -File installera-task.ps1
#  Annat klockslag:
#    powershell -ExecutionPolicy Bypass -File installera-task.ps1 -Tid 04:00
#  Ta bort:
#    powershell -ExecutionPolicy Bypass -File installera-task.ps1 -Avinstallera
#
#  Kraver INTE administratorsrattigheter (uppgifterna registreras i den
#  inloggade anvandarens kontext, RunLevel Limited).
# =====================================================================

param(
    [string]$Tid  = '03:15',
    [string]$Namn = 'Fysiklabbet daglig nyhet',
    [switch]$Avinstallera
)

$ErrorActionPreference = 'Stop'

$NamnStart = "$Namn (start)"

# --- Avinstallation -------------------------------------------------
if ($Avinstallera) {
    foreach ($n in @($Namn, $NamnStart)) {
        try {
            Unregister-ScheduledTask -TaskName $n -Confirm:$false
            Write-Output "Borttagen: $n"
        } catch {
            Write-Output "Fanns inte: $n"
        }
    }
    return
}

# --- Sokvagar harleds ur skriptets egen plats, aldrig hardkodade -----
# Skriptet ligger i <repo>\.claude\nyheter\ -> tva niva upp ar repo-roten.
$Repo   = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$Script = Join-Path $PSScriptRoot 'daglig-nyhet.ps1'

if (-not (Test-Path $Script)) {
    Write-Output "AVBRUTET: hittar inte $Script"
    exit 1
}
if (-not (Test-Path (Join-Path $Repo 'data\nyheter.js'))) {
    Write-Output "AVBRUTET: $Repo ser inte ut som Fysiklabbet-repot (data\nyheter.js saknas)."
    exit 1
}

Write-Output "Repo:   $Repo"
Write-Output "Skript: $Script"
Write-Output ''

# --- Gemensamma delar -----------------------------------------------
$Argument = '-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "{0}"' -f $Script

$Action = New-ScheduledTaskAction -Execute 'powershell.exe' `
                                  -Argument $Argument `
                                  -WorkingDirectory $Repo

# Kor som den inloggade anvandaren, utan admin-hojning. Interactive kravs
# for att Claude Code ska na sin inloggning, git sina credentials och
# headless Chrome en riktig session.
# $env:USERDOMAIN duger INTE. I en interaktiv session ar den maskinnamnet, men
# i en SSH-session ar den 'WORKGROUP' - och 'WORKGROUP\namn' gar inte att sla
# upp till nagot SID, sa Register-ScheduledTask faller pa "Det har inte gjorts
# nagon mappning mellan kontonamn och sakerhets-ID".
# WindowsIdentity ger alltid ratt form: MASKIN\anvandare.
$KontoNamn = [Security.Principal.WindowsIdentity]::GetCurrent().Name

$Principal = New-ScheduledTaskPrincipal -UserId $KontoNamn `
                                        -LogonType Interactive `
                                        -RunLevel Limited

# ExecutionTimeLimit 1 h: en hangd korning dodas av Schemalaggaren i stallet
# for att ligga och tugga CPU hela dygnet.
# StartWhenAvailable: var maskinen avstangd vid klockslaget (stromavbrott)
# kors uppgiften sa snart den ar igang igen.
# IgnoreNew: startar aldrig en andra instans ovanpa en pagaende.
$Settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Hours 1) `
    -MultipleInstances IgnoreNew `
    -RestartCount 2 `
    -RestartInterval (New-TimeSpan -Minutes 30) `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -DontStopOnIdleEnd

# --- 1) Huvudkorning: dagligen pa klockslag -------------------------
$TriggerDaily = New-ScheduledTaskTrigger -Daily -At $Tid

Register-ScheduledTask -TaskName $Namn `
                       -Action $Action -Trigger $TriggerDaily `
                       -Principal $Principal -Settings $Settings `
                       -Description "Skapar dagens fysiknyhet via Claude Code och pushar till GitHub. Kors $Tid varje natt." `
                       -Force | Out-Null
Write-Output "OK  $Namn - dagligen $Tid"

# --- 2) Skyddsnat: vid inloggning efter omstart ----------------------
# -User MASTE anges. Utan den blir triggern "vid vilken anvandares inloggning
# som helst", vilket kraver administratorsrattigheter -> "Atkomst nekad".
$TriggerLogon = New-ScheduledTaskTrigger -AtLogOn -User $KontoNamn
$TriggerLogon.Delay = 'PT5M'

Register-ScheduledTask -TaskName $NamnStart `
                       -Action $Action -Trigger $TriggerLogon `
                       -Principal $Principal -Settings $Settings `
                       -Description 'Skyddsnat: kor dagens nyhet efter omstart om nattens korning missades. Idempotent - gor inget om dagens artikel redan finns.' `
                       -Force | Out-Null
Write-Output "OK  $NamnStart - 5 min efter inloggning"

# --- Kvittens --------------------------------------------------------
Write-Output ''
Get-ScheduledTask -TaskName $Namn, $NamnStart |
    ForEach-Object {
        $info = $_ | Get-ScheduledTaskInfo
        [PSCustomObject]@{
            Uppgift   = $_.TaskName
            Tillstand = $_.State
            NastaKorning = $info.NextRunTime
        }
    } | Format-Table -AutoSize | Out-String | Write-Output

Write-Output "Logg hamnar i .claude\nyheter\logg\<datum>.log"
Write-Output "Testkor nu:  Start-ScheduledTask -TaskName '$Namn'"
