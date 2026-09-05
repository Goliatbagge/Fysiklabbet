# Registrerar de schemalagda uppgifterna för kvällens lanseringsinlägg
# (uttryckligt önskemål 2026-09-05: fysiknyheten vid lunch, sajtnyheter
# och tips senare på dagen — lanseringarna bytte därför plats med
# nyhetsjobben, som nu ligger 13:03/13:18; 2026-08-18 till 2026-09-05
# låg lanseringarna på lunchen):
#
#   "Fysiklabbet Facebook-lansering"   19:33  (fb-lansering.ps1)
#   "Fysiklabbet Instagram-lansering"  19:48  (ig-lansering.ps1)
#
# Endast när användaren är inloggad (interaktivt — Chrome med
# Claude-utökningen krävs). Kör en gång per maskin.
# -Avinstallera tar bort båda uppgifterna.

param([switch]$Avinstallera)

$uppgifter = @(
    @{ namn = 'Fysiklabbet Facebook-lansering';  skript = 'fb-lansering.ps1'; tid = '19:33' }
    @{ namn = 'Fysiklabbet Instagram-lansering'; skript = 'ig-lansering.ps1'; tid = '19:48' }
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
