# =====================================================================
#  Fysiklabbet - vakt for den lokala utvecklingsservern.
#
#  Ser till att .claude\dev-server.py alltid lyssnar pa http://localhost:8000
#  sa att andringar kan provas i webblasaren utan att pushas. Kors av
#  Windows Schemalaggaren vid inloggning och sedan var femte minut (se
#  installera-server-task.ps1) - varje korning ar snabb och gor INGET om
#  servern redan svarar.
#
#  Manuellt:
#    powershell -ExecutionPolicy Bypass -File dev-server-vakt.ps1            # starta vid behov
#    powershell -ExecutionPolicy Bypass -File dev-server-vakt.ps1 -Status    # bara kolla
#    powershell -ExecutionPolicy Bypass -File dev-server-vakt.ps1 -Stoppa    # stoppa servern
#    powershell -ExecutionPolicy Bypass -File dev-server-vakt.ps1 -Starta_om # tvinga omstart
#
#  Loggar till .claude\server\logg\vakt.log (starter/fel, inte varje koll).
#  Serverns egen utskrift hamnar i logg\server-ut.log / server-fel.log.
# =====================================================================

param(
    [int]$Port = 8000,
    [switch]$Natverk,
    [switch]$Status,
    [switch]$Stoppa,
    [switch]$Starta_om
)

# -Natverk: lyssna pa alla granssnitt sa att sidan gar att na fran telefon
# och surfplatta i hemmanatverket. Utan flaggan syns servern bara lokalt.
$Adress = if ($Natverk) { '0.0.0.0' } else { '127.0.0.1' }

# Native-kommandon skriver info till stderr; 'Stop' skulle da kasta fel.
$ErrorActionPreference = 'Continue'

# Repo-roten harleds ur skriptets egen plats (<repo>\.claude\server\) sa att
# samma skript fungerar pa vilken maskin och sokvag som helst.
if ($PSScriptRoot) { $Repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent }
else               { $Repo = 'C:\claude\Fysiklabbet' }

$ServerPy = Join-Path $Repo '.claude\dev-server.py'
$LogDir   = Join-Path $PSScriptRoot 'logg'
$LogFile  = Join-Path $LogDir 'vakt.log'
$UtFil    = Join-Path $LogDir 'server-ut.log'
$FelFil   = Join-Path $LogDir 'server-fel.log'

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Log($msg) {
    $line = ('{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $msg)
    Add-Content -Path $LogFile -Value $line -Encoding utf8
    Write-Output $line
}

function Find-Python {
    # pythonw.exe kor utan konsolfonster - annars blinkar en svart ruta forbi
    # varje gang vakten startar servern. Faller tillbaka pa python.exe.
    # Sokvagen far ALDRIG hardkodas till ett anvandarnamn.
    $kandidater = @(
        (Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312\pythonw.exe'),
        (Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312\python.exe')
    )
    foreach ($k in $kandidater) { if (Test-Path $k) { return $k } }

    $viaLauncher = (& py -3.12 -c "import sys; print(sys.executable)" 2>$null)
    if ($LASTEXITCODE -eq 0 -and $viaLauncher -and (Test-Path $viaLauncher)) {
        $w = $viaLauncher -replace 'python\.exe$', 'pythonw.exe'
        if (Test-Path $w) { return $w }
        return $viaLauncher
    }

    foreach ($namn in @('pythonw', 'python')) {
        $cmd = Get-Command $namn -ErrorAction SilentlyContinue
        if ($cmd) { return $cmd.Source }
    }
    return 'python'
}

function Get-ServerProcesser {
    # Vara egna serverprocesser: python* som kor dev-server.py.
    # CommandLine kravs - annars skulle vilken python som helst raknas.
    Get-CimInstance Win32_Process -Filter "Name like 'python%'" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -and $_.CommandLine -like '*dev-server.py*' }
}

function Test-RattAdress {
    # Kor den igang varande servern med den bindningsadress vi vill ha?
    # En server som startats med 127.0.0.1 svarar utmarkt lokalt, sa utan
    # den har kollen skulle vakten se "allt ar bra" och -Natverk aldrig
    # sla igenom.
    $procs = @(Get-ServerProcesser)
    if ($procs.Count -eq 0) { return $false }
    $vantat = '{0} {1}' -f $Port, $Adress
    foreach ($p in $procs) {
        if ($p.CommandLine.Trim().EndsWith($vantat)) { return $true }
    }
    return $false
}

function Get-LokalIP {
    (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
        Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } |
        Select-Object -First 1 -ExpandProperty IPAddress)
}

function Test-Svarar {
    # Riktig HTTP-koll, inte bara en oppen port: en port kan vara upptagen av
    # nagot helt annat, och en hangd process kan halla porten utan att svara.
    try {
        $svar = Invoke-WebRequest -Uri ('http://127.0.0.1:{0}/index.html' -f $Port) `
                                  -UseBasicParsing -TimeoutSec 5 -Method Head
        return ($svar.StatusCode -eq 200)
    } catch {
        return $false
    }
}

function Test-PortUpptagen {
    $klient = New-Object Net.Sockets.TcpClient
    try {
        $klient.Connect('127.0.0.1', $Port)
        return $klient.Connected
    } catch {
        return $false
    } finally {
        $klient.Close()
    }
}

function Stoppa-Server {
    $procs = Get-ServerProcesser
    if (-not $procs) { return $false }
    foreach ($p in $procs) {
        try {
            Stop-Process -Id $p.ProcessId -Force -ErrorAction Stop
            Log ("Stoppade dev-server (PID {0})." -f $p.ProcessId)
        } catch {
            Log ("KUNDE INTE stoppa PID {0}: {1}" -f $p.ProcessId, $_.Exception.Message)
        }
    }
    return $true
}

# --- Status ----------------------------------------------------------
if ($Status) {
    $procs = @(Get-ServerProcesser)
    $svarar = Test-Svarar
    Write-Output ("Lokalt:   http://localhost:{0}" -f $Port)
    $ip = Get-LokalIP
    if ($ip) {
        $natverk = @($procs | Where-Object { $_.CommandLine.Trim().EndsWith("$Port 0.0.0.0") }).Count -gt 0
        Write-Output ("Natverk:  http://{0}:{1}  {2}" -f $ip, $Port,
                      $(if ($natverk) { '(oppen)' } else { '(EJ oppen - servern lyssnar bara lokalt)' }))
        Write-Output ("          http://{0}:{1}" -f $env:COMPUTERNAME.ToLower(), $Port)
    }
    Write-Output ("Svarar:   {0}" -f $(if ($svarar) { 'JA' } else { 'NEJ' }))
    if ($procs.Count -gt 0) {
        Write-Output ("Process:  PID {0}" -f (($procs | ForEach-Object { $_.ProcessId }) -join ', '))
    } else {
        Write-Output 'Process:  ingen dev-server.py igang'
    }
    Write-Output ("Rot:      {0}" -f $Repo)
    return
}

# --- Stopp -----------------------------------------------------------
if ($Stoppa) {
    if (-not (Stoppa-Server)) { Log 'Ingen dev-server att stoppa.' }
    return
}

# --- Omstart ---------------------------------------------------------
if ($Starta_om) {
    [void](Stoppa-Server)
    Start-Sleep -Milliseconds 700
}

# --- Vakt: gor inget om servern redan svarar -------------------------
# ... men bara om den ocksa lyssnar pa ratt adress. Byter man till/fran
# -Natverk maste servern startas om for att bindningen ska andras.
if (-not $Starta_om -and (Test-Svarar)) {
    if (Test-RattAdress) {
        # Tyst utgang - annars skulle loggen fyllas med en rad var femte minut.
        exit 0
    }
    Log ("Servern lyssnar pa fel adress - startar om den mot {0}." -f $Adress)
    [void](Stoppa-Server)
    Start-Sleep -Milliseconds 700
}

if (-not (Test-Path $ServerPy)) {
    Log ("AVBRUTET: hittar inte {0}" -f $ServerPy)
    exit 1
}

# Porten oppen men inget HTTP-svar => hangd egen process (dodas) eller nagon
# annans tjanst (lamnas ifred - vi tar aldrig over en port vi inte ager).
if (Test-PortUpptagen) {
    if (Get-ServerProcesser) {
        Log ("Servern svarar inte pa port {0} - startar om den." -f $Port)
        [void](Stoppa-Server)
        Start-Sleep -Milliseconds 700
    } else {
        Log ("AVBRUTET: port {0} anvands av nagot annat program." -f $Port)
        exit 1
    }
}

$Python = Find-Python
# -NoNewWindow, INTE -WindowStyle Hidden: fonsterstil kraver UseShellExecute,
# vilket utesluter omdirigeringen av ut/fel nedan. pythonw.exe oppnar anda
# aldrig nagot konsolfonster. Processen ar fristaende och lever vidare nar
# den har PowerShell-instansen (och den schemalagda uppgiften) avslutas.
$proc = Start-Process -FilePath $Python `
                      -ArgumentList @($ServerPy, $Port, $Adress) `
                      -WorkingDirectory $Repo `
                      -NoNewWindow `
                      -RedirectStandardOutput $UtFil `
                      -RedirectStandardError $FelFil `
                      -PassThru

Start-Sleep -Seconds 2
if (Test-Svarar) {
    $var = 'http://localhost:{0} (bara denna dator)' -f $Port
    if ($Natverk) { $var = 'http://{0}:{1} (hela hemmanatverket)' -f (Get-LokalIP), $Port }
    Log ("Startade dev-server pa {0} (PID {1}, {2})." -f $var, $proc.Id, $Python)
    exit 0
}

Log ("START MISSLYCKADES pa port {0} med {1}. Se {2}." -f $Port, $Python, $FelFil)
exit 1
