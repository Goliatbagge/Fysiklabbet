# =====================================================================
#  Fysiklabbet - registrerar nyhetsjobbets schemalagda uppgifter.
#
#  Rutinen sedan 2026-10-25: pa natten skrivs MORGONDAGENS nyhet (ett dygn i
#  forvag) och mejlas till agaren, som hinner godkanna den under dagen.
#  Svaren lases fem ganger om dagen. Samma nattkorning ar ocksa skyddsnat
#  for dagens artikel (se filhuvudet i daglig-nyhet.ps1).
#
#  Fyra uppgifter registreras (lagena idag och imorgon gor samma sak, sa
#  att tva uppgifter tacker natten oberoende av varandra):
#    "<Namn> imorgon"  DAILY <ImorgonTider> - nattkorning + omforsok
#    "<Namn> svar"     DAILY <SvarTider>    - laser agarens mejlsvar
#    "<Namn>"          DAILY <Tid> + <OmforsokTid> - nattkorning (reserv)
#    "<Namn> (start)"  ONLOGON + 5 min      - efter omstart
#
#  Alla pekar pa daglig-nyhet.ps1 i DEN HAR arbetskatalogen. Kor skriptet
#  fran nyhetsjobbets egen worktree (C:\claude\Fysiklabbet-nyhetsjobb), inte
#  fran den gemensamma arbetskatalogen - annars kor jobbet pa den gren som
#  en interaktiv session rakar ha utcheckad.
#
#  Kor en gang:
#    powershell -ExecutionPolicy Bypass -File installera-task.ps1
#  Ta bort:
#    powershell -ExecutionPolicy Bypass -File installera-task.ps1 -Avinstallera
#
#  Kraver INTE administratorsrattigheter (uppgifterna registreras i den
#  inloggade anvandarens kontext, RunLevel Limited).
# =====================================================================

param(
    [string]$Tid             = '03:15',
    [string]$OmforsokTid     = '07:15',
    [string[]]$ImorgonTider  = @('03:20', '07:20', '13:15'),
    [string[]]$SvarTider     = @('07:45', '11:45', '15:45', '19:15', '22:15'),
    [string]$Namn            = 'Fysiklabbet daglig nyhet',
    [switch]$Avinstallera
)

$ErrorActionPreference = 'Stop'

$NamnStart   = "$Namn (start)"
$NamnImorgon = "$Namn imorgon"
$NamnSvar    = "$Namn svar"
$AllaNamn    = @($Namn, $NamnStart, $NamnImorgon, $NamnSvar)

if ($Avinstallera) {
    foreach ($n in $AllaNamn) {
        try { Unregister-ScheduledTask -TaskName $n -Confirm:$false; Write-Output "Borttagen: $n" }
        catch { Write-Output "Fanns inte: $n" }
    }
    return
}

# Sokvagar harleds ur skriptets egen plats, aldrig hardkodade.
$Repo   = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$Script = Join-Path $PSScriptRoot 'daglig-nyhet.ps1'
$Dolt   = Join-Path $Repo '.claude\server\kor-dolt.vbs'

foreach ($f in @($Script, $Dolt, (Join-Path $Repo 'data\nyheter.js'))) {
    if (-not (Test-Path $f)) { Write-Output "AVBRUTET: hittar inte $f"; exit 1 }
}
$Gren = (& git -C $Repo rev-parse --abbrev-ref HEAD 2>$null)
if ($Gren -ne 'nyhetsjobb') {
    Write-Output "VARNING: $Repo star pa grenen '$Gren', inte 'nyhetsjobb'."
    Write-Output 'Uppgifterna ska peka pa nyhetsjobbets egen worktree. Fortsatter anda.'
}

Write-Output "Repo:   $Repo"
Write-Output "Skript: $Script"
Write-Output ''

function Ny-Atgard([string]$Lage) {
    # Via kor-dolt.vbs (wscript): powershell.exe -WindowStyle Hidden blinkar
    # anda till med ett svart konsolfonster vid varje korning.
    $arg = '//B //Nologo "{0}" powershell.exe -NoProfile -ExecutionPolicy Bypass -File "{1}" -Lage {2}' -f $Dolt, $Script, $Lage
    return New-ScheduledTaskAction -Execute 'wscript.exe' -Argument $arg -WorkingDirectory $Repo
}

# Kor som den inloggade anvandaren, utan admin-hojning. Interactive kravs
# for att Claude Code ska na sin inloggning och git sina credentials.
# WindowsIdentity ger alltid ratt form MASKIN\anvandare ($env:USERDOMAIN
# blir 'WORKGROUP' i en SSH-session och gar inte att sla upp).
$KontoNamn = [Security.Principal.WindowsIdentity]::GetCurrent().Name
$Principal = New-ScheduledTaskPrincipal -UserId $KontoNamn -LogonType Interactive -RunLevel Limited

# 2 h: en artikel med utgivarens granskning tar ofta 30-60 min, och en
# andring efter agarens svar kan krava en ny granskning.
# StartWhenAvailable: var maskinen avstangd vid klockslaget kors uppgiften
# sa snart den ar igang igen. IgnoreNew: aldrig tva instanser samtidigt.
$Settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
    -MultipleInstances IgnoreNew `
    -StartWhenAvailable `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -DontStopOnIdleEnd

function Registrera([string]$TaskNamn, [string]$Lage, $Triggers, [string]$Beskrivning) {
    Register-ScheduledTask -TaskName $TaskNamn -Action (Ny-Atgard $Lage) -Trigger $Triggers `
        -Principal $Principal -Settings $Settings -Description $Beskrivning -Force | Out-Null
    Write-Output "OK  $TaskNamn"
}

Registrera $NamnImorgon 'imorgon' @($ImorgonTider | ForEach-Object { New-ScheduledTaskTrigger -Daily -At $_ }) `
    ("Nattkorning: skyddsnat for dagens nyhet, sedan morgondagens nyhet (dold av datumgrinden till midnatt) och ett granskningsmejl till agaren. " + ($ImorgonTider -join ', ') + '.')

Registrera $NamnSvar 'svar' @($SvarTider | ForEach-Object { New-ScheduledTaskTrigger -Daily -At $_ }) `
    ("Laser agarens svar pa granskningsmejlen och gor andringarna. " + ($SvarTider -join ', ') + '.')

Registrera $Namn 'idag' @(
    (New-ScheduledTaskTrigger -Daily -At $Tid),
    (New-ScheduledTaskTrigger -Daily -At $OmforsokTid)) `
    "Nattkorning (reserv till '$NamnImorgon'): skyddsnat for dagens nyhet, sedan morgondagens nyhet for granskning. $Tid, omforsok $OmforsokTid."

# -User MASTE anges, annars kraver logon-triggern administratorsratt.
$TriggerLogon = New-ScheduledTaskTrigger -AtLogOn -User $KontoNamn
$TriggerLogon.Delay = 'PT5M'
Registrera $NamnStart 'idag' $TriggerLogon `
    'Skyddsnat efter omstart: gor inget om dagens artikel redan finns.'

Write-Output ''
Get-ScheduledTask -TaskName $AllaNamn | ForEach-Object {
    $info = $_ | Get-ScheduledTaskInfo
    [PSCustomObject]@{ Uppgift = $_.TaskName; Tillstand = $_.State; NastaKorning = $info.NextRunTime }
} | Format-Table -AutoSize | Out-String | Write-Output

Write-Output 'Logg hamnar i .claude\nyheter\logg\<datum>.log i nyhetsjobbets worktree.'
