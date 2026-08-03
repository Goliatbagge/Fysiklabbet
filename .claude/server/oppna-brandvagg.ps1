# =====================================================================
#  Fysiklabbet - slapper in hemmanatverket till utvecklingsservern.
#
#  Kors EN gang, i ett PowerShell startat som ADMINISTRATOR:
#    powershell -ExecutionPolicy Bypass -File oppna-brandvagg.ps1
#
#  Tva saker behovs for att telefonen ska na http://<datorns IP>:8000
#    1) En inkommande tillat-regel for porten. Begransad till Private-
#       profilen och LocalSubnet: bara hemmanatverket, aldrig ett kafe-wifi
#       eller internet.
#    2) Att de blockera-regler for python som Windows skapat nar en
#       brandvaggsruta en gang avfardats med "Avbryt" tas bort. En
#       blockera-regel VINNER alltid over en tillat-regel, sa utan det har
#       steget svarar servern lokalt men aldrig ut mot natverket - och
#       ingenting ser trasigt ut.
#
#  Angra:  powershell -ExecutionPolicy Bypass -File oppna-brandvagg.ps1 -Stang
# =====================================================================

param(
    [int]$Port = 8000,
    [switch]$Stang
)

$ErrorActionPreference = 'Stop'
$RegelNamn = "Fysiklabbet dev-server (TCP $Port)"

$admin = ([Security.Principal.WindowsPrincipal] `
          [Security.Principal.WindowsIdentity]::GetCurrent()
         ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $admin) {
    Write-Output 'AVBRUTET: kor det har skriptet som administrator.'
    Write-Output 'Windows-menyn -> skriv "powershell" -> hoger-klick -> "Kor som administrator".'
    exit 1
}

# --- Angra ------------------------------------------------------------
if ($Stang) {
    try {
        Remove-NetFirewallRule -DisplayName $RegelNamn
        Write-Output "Borttagen: $RegelNamn"
    } catch {
        Write-Output "Fanns inte: $RegelNamn"
    }
    exit 0
}

# --- 1) Ta bort blockera-reglerna for python --------------------------
$blockerade = Get-NetFirewallApplicationFilter |
    Where-Object { $_.Program -like '*python*' } |
    Get-NetFirewallRule |
    Where-Object { $_.Direction -eq 'Inbound' -and $_.Action -eq 'Block' }

if ($blockerade) {
    foreach ($r in $blockerade) {
        Remove-NetFirewallRule -Name $r.Name
        Write-Output ("Tog bort blockera-regel: {0} ({1})" -f $r.DisplayName, $r.Profile)
    }
} else {
    Write-Output 'Inga blockera-regler for python - bra.'
}

# --- 2) Tillat porten pa hemmanatverket -------------------------------
if (Get-NetFirewallRule -DisplayName $RegelNamn -ErrorAction SilentlyContinue) {
    Write-Output "Fanns redan: $RegelNamn"
} else {
    New-NetFirewallRule -DisplayName $RegelNamn `
                        -Description 'Fysiklabbets lokala utvecklingsserver, nabar fran hemmanatverket.' `
                        -Direction Inbound -Action Allow -Protocol TCP `
                        -LocalPort $Port -Profile Private -RemoteAddress LocalSubnet | Out-Null
    Write-Output "Skapad: $RegelNamn (Private + LocalSubnet)"
}

# --- Kvittens ---------------------------------------------------------
$ip = (Get-NetIPAddress -AddressFamily IPv4 |
       Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
       Select-Object -First 1 -ExpandProperty IPAddress)

Write-Output ''
Write-Output "Prova nu fran telefonen:  http://$($ip):$Port"
Write-Output "Eller med datornamnet:    http://$($env:COMPUTERNAME.ToLower()):$Port"
