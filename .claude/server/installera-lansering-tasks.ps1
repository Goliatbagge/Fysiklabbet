# Registrerar de schemalagda uppgifterna för eftermiddagens
# lanseringsinlägg (uttryckligt önskemål 2026-08-18: lanseringar ska
# inte posta direkt efter morgonens nyhetsinlägg utan senare på dagen):
#
#   "Fysiklabbet Facebook-lansering"   13:03  (fb-lansering.ps1)
#   "Fysiklabbet Instagram-lansering"  13:18  (ig-lansering.ps1)
#
# Endast när användaren är inloggad (interaktivt — Chrome med
# Claude-utökningen krävs). Kör en gång per maskin.
# -Avinstallera tar bort båda uppgifterna.

param([switch]$Avinstallera)

$uppgifter = @(
    @{ namn = 'Fysiklabbet Facebook-lansering';  skript = 'fb-lansering.ps1'; tid = '13:03' }
    @{ namn = 'Fysiklabbet Instagram-lansering'; skript = 'ig-lansering.ps1'; tid = '13:18' }
)

if ($Avinstallera) {
    foreach ($u in $uppgifter) {
        Unregister-ScheduledTask -TaskName $u.namn -Confirm:$false -ErrorAction SilentlyContinue
        Write-Host "Uppgiften '$($u.namn)' borttagen."
    }
    return
}

foreach ($u in $uppgifter) {
    $skript = Join-Path $PSScriptRoot $u.skript
    $action = New-ScheduledTaskAction -Execute 'powershell.exe' `
        -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$skript`""
    $trigger = New-ScheduledTaskTrigger -Daily -At $u.tid
    # StartWhenAvailable: missad körning (datorn i viloläge) tas igen när den vaknar.
    $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable `
        -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
    $principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive

    Register-ScheduledTask -TaskName $u.namn -Action $action -Trigger $trigger `
        -Settings $settings -Principal $principal -Force | Out-Null
    Write-Host "Uppgiften '$($u.namn)' registrerad ($($u.tid) dagligen, interaktiv)."
}
