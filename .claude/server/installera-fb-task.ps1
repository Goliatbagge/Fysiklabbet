# Registrerar den schemalagda uppgiften "Fysiklabbet Facebook-inlagg":
# kör fb-daglig.ps1 varje dag vid lunch 13:03, endast när användaren är
# inloggad (interaktivt — Chrome med Claude-utökningen krävs).
# (Tidshistorik: 07:33 fram till 2026-08-27, sedan 19:33 som kvällstest,
# och från 2026-09-05 13:03 på användarens uttryckliga önskemål:
# fysiknyheten vid lunch, sajtnyheter/tips på kvällen — lanseringsjobbet
# tog över kvällstiden, se installera-lansering-tasks.ps1.)
# Kör en gång per maskin. -Avinstallera tar bort uppgiften.

param([switch]$Avinstallera)

$namn = 'Fysiklabbet Facebook-inlagg'

if ($Avinstallera) {
    Unregister-ScheduledTask -TaskName $namn -Confirm:$false
    Write-Host "Uppgiften '$namn' borttagen."
    return
}

$skript = Join-Path $PSScriptRoot 'fb-daglig.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$skript`""
$trigger = New-ScheduledTaskTrigger -Daily -At 13:03
# StartWhenAvailable: missad körning (datorn i viloläge) tas igen när den vaknar.
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask -TaskName $namn -Action $action -Trigger $trigger `
    -Settings $settings -Principal $principal -Force | Out-Null
Write-Host "Uppgiften '$namn' registrerad (13:03 dagligen, interaktiv)."
