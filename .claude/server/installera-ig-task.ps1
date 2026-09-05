# Registrerar den schemalagda uppgiften "Fysiklabbet Instagram-inlagg":
# kör ig-daglig.ps1 varje dag vid lunch 13:18 (efter Facebook-jobbet
# 13:03), endast när användaren är inloggad. Kör en gång per maskin.
# -Avinstallera tar bort uppgiften.
# (Tidshistorik: 07:48 → 19:48 2026-08-27 → 13:18 2026-09-05, samma
# beslut som Facebook-jobbet — se installera-fb-task.ps1.)

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
$trigger = New-ScheduledTaskTrigger -Daily -At 13:18
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask -TaskName $namn -Action $action -Trigger $trigger `
    -Settings $settings -Principal $principal -Force | Out-Null
Write-Host "Uppgiften '$namn' registrerad (13:18 dagligen, interaktiv)."
