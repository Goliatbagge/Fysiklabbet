# Registrerar den schemalagda uppgiften "Fysiklabbet SoMe-rapport":
# kör some-rapport.ps1 den FÖRSTA dagen i varje månad kl 10:03, endast
# när användaren är inloggad (Chrome med Claude-utökningen krävs).
# Kör en gång per maskin. -Avinstallera tar bort uppgiften.
#
# OBS: New-ScheduledTaskTrigger i PowerShell 5.1 saknar månadstrigger,
# därför registreras uppgiften via schtasks.exe (/sc monthly /d 1) och
# kompletteras sedan med StartWhenAvailable via Set-ScheduledTask, så en
# missad körning (datorn avstängd den 1:a) tas igen när den vaknar.

param([switch]$Avinstallera)

$namn = 'Fysiklabbet SoMe-rapport'

if ($Avinstallera) {
    schtasks.exe /delete /tn $namn /f | Out-Null
    Write-Host "Uppgiften '$namn' borttagen."
    return
}

$skript = Join-Path $PSScriptRoot 'some-rapport.ps1'
$kommando = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$skript`""

schtasks.exe /create /f /tn $namn /tr $kommando /sc monthly /d 1 /st 10:03 | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Host "FEL: schtasks misslyckades (exit $LASTEXITCODE)."; exit 1 }

# StartWhenAvailable + rimlig tidsgräns (rapporten läser två kanaler).
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 45)
Set-ScheduledTask -TaskName $namn -Settings $settings | Out-Null

Write-Host "Uppgiften '$namn' registrerad (den 1:a varje månad kl 10:03, interaktiv)."
