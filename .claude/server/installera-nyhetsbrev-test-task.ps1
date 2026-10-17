# Registrerar den schemalagda uppgiften "Fysiklabbet nyhetsbrev testmejl":
# kör nyhetsbrev-test.ps1 varje lördag 08:15, efter molnroutinens deadline
# 08.00 för veckans utkast. Endast när användaren är inloggad (Chrome med
# Claude-utökningen krävs, inloggad på emailoctopus.com). StartWhenAvailable: är datorn avstängd
# eller i viloläge tas körningen igen när den vaknar.
# Kör en gång per maskin. -Avinstallera tar bort uppgiften.

param([switch]$Avinstallera)

$namn = 'Fysiklabbet nyhetsbrev testmejl'

if ($Avinstallera) {
    Unregister-ScheduledTask -TaskName $namn -Confirm:$false
    Write-Host "Uppgiften '$namn' borttagen."
    return
}

$skript = Join-Path $PSScriptRoot 'nyhetsbrev-test.ps1'
$dolt = Join-Path $PSScriptRoot 'kor-dolt.vbs'
$action = New-ScheduledTaskAction -Execute 'wscript.exe' `
    -Argument "//B //Nologo `"$dolt`" powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$skript`""
$trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Saturday -At 08:15
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 90)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask -TaskName $namn -Action $action -Trigger $trigger `
    -Settings $settings -Principal $principal -Force | Out-Null
Write-Host "Uppgiften '$namn' registrerad (lördagar 08:15, interaktiv)."
