# =====================================================================
#  Registrerar Windows-uppgiften som kor daglig-nyhet.ps1 vid inloggning.
#  Kor en gang:  powershell -ExecutionPolicy Bypass -File installera-task.ps1
#  Avinstallera: schtasks /Delete /TN "Fysiklabbet daglig nyhet" /F
# =====================================================================

$TaskName = 'Fysiklabbet daglig nyhet'
$Script   = 'C:\claude\Fysiklabbet\.claude\nyheter\daglig-nyhet.ps1'

$Run = 'powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "{0}"' -f $Script

# /SC ONLOGON = vid inloggning. /DELAY = vanta 3 min sa natverket hunnit upp.
# /RL LIMITED = kor med vanliga rattigheter (ingen admin-prompt).
schtasks /Create /TN $TaskName /TR $Run /SC ONLOGON /DELAY 0003:00 /RL LIMITED /F

if ($LASTEXITCODE -eq 0) {
    Write-Output ''
    Write-Output "OK - uppgiften '$TaskName' ar registrerad och kors vid varje inloggning."
    Write-Output "Logg hamnar i .claude\nyheter\logg\<datum>.log"
} else {
    Write-Output "Misslyckades (kod $LASTEXITCODE)."
}
