# Registrerar den schemalagda uppgiften "Fysiklabbet inloggningskoll":
# kör auth-koll.ps1 dagligen 07:30, 11:30, 17:45 och 23:00, endast när
# användaren är inloggad (samma villkor som SoMe-jobben). Missade körningar
# tas igen när datorn vaknar. Kör en gång per maskin; -Avinstallera tar bort
# uppgiften.

param([switch]$Avinstallera)

$namn = 'Fysiklabbet inloggningskoll'
if ($Avinstallera) {
    Unregister-ScheduledTask -TaskName $namn -Confirm:$false -ErrorAction SilentlyContinue
    Write-Host "Uppgiften '$namn' borttagen."
    return
}

$skript = Join-Path $PSScriptRoot 'auth-koll.ps1'
# Via kor-dolt.vbs (wscript): -WindowStyle Hidden blinkar ändå till med ett svart konsolfönster.
$dolt = Join-Path $PSScriptRoot 'kor-dolt.vbs'
$action = New-ScheduledTaskAction -Execute 'wscript.exe' `
    -Argument "//B //Nologo `"$dolt`" powershell.exe -NoProfile -ExecutionPolicy Bypass -File `"$skript`""
$triggers = @('07:30', '11:30', '17:45', '23:00') | ForEach-Object { New-ScheduledTaskTrigger -Daily -At $_ }
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 10)
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

Register-ScheduledTask -TaskName $namn -Action $action -Trigger $triggers -Settings $settings `
    -Principal $principal -Force | Out-Null
Write-Host "Uppgiften '$namn' registrerad (07:30, 11:30, 17:45 och 23:00)."
