# Registrerar den schemalagda uppgiften "Fysiklabbet Instagram-inlagg":
# kör ig-daglig.ps1 varje kväll 19:48 (efter Facebook-jobbet 19:33),
# endast när användaren är inloggad. Kör en gång per maskin.
# -Avinstallera tar bort uppgiften.
# (Flyttad från 07:48 → 19:48 2026-08-27, samma statistikbeslut som
# Facebook-jobbet — se installera-fb-task.ps1.)

param([switch]$Avinstallera)

$namn = 'Fysiklabbet Instagram-inlagg'

if ($Avinstallera) {
    Unregister-ScheduledTask -TaskName $namn -Confirm:$false
    Write-Host "Uppgiften '$namn' borttagen."
    return
}

$skript = Join-Path $PSScriptRoot 'ig-daglig.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$skript`""
$trigger = New-ScheduledTaskTrigger -Daily -At 19:48
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask -TaskName $namn -Action $action -Trigger $trigger `
    -Settings $settings -Principal $principal -Force | Out-Null
Write-Host "Uppgiften '$namn' registrerad (19:48 dagligen, interaktiv)."
