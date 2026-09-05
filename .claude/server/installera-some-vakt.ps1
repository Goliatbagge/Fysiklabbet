# Registrerar den schemalagda uppgiften "Fysiklabbet SoMe-vakt": kör
# some-vakt.ps1 kl 14:00 och 21:00 varje dag, endast när användaren är
# inloggad (vakten kan behöva köra om Facebook-/Instagram-jobben, och de
# kräver Chrome med Claude-utökningen i den interaktiva sessionen).
# 14:00 kontrollerar lanseringsjobben (13:03/13:18), 21:00 kontrollerar
# även nyhetsjobben (19:33/19:48 sedan schemaflytten 2026-08-27).
# Kör en gång per maskin. -Avinstallera tar bort uppgiften.

param([switch]$Avinstallera)

$namn = 'Fysiklabbet SoMe-vakt'

if ($Avinstallera) {
    Unregister-ScheduledTask -TaskName $namn -Confirm:$false
    Write-Host "Uppgiften '$namn' borttagen."
    return
}

$skript = Join-Path $PSScriptRoot 'some-vakt.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$skript`""
# Två kontroller per dag: en strax efter lunchjobben och en efter kvällsjobben.
$triggers = @(
    (New-ScheduledTaskTrigger -Daily -At 14:00),
    (New-ScheduledTaskTrigger -Daily -At 21:00)
)
# 75 min: vakten kan behöva köra om båda jobben (30 min-gräns vardera).
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 75)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask -TaskName $namn -Action $action -Trigger $triggers `
    -Settings $settings -Principal $principal -Force | Out-Null
Write-Host "Uppgiften '$namn' registrerad (14:00 och 21:00 dagligen, interaktiv)."
