# =====================================================================
#  Fysiklabbet - daglig nyhet
#  Korsa av Windows Schemalaggaren vid inloggning (se installera-task.ps1).
#  Skapar EN fysiknyhet per dag via Claude Code + nyhetsagenten och pushar.
#  Idempotent: kors den flera ganger samma dag hander inget extra.
#  Loggar till .claude\nyheter\logg\<datum>.log
# =====================================================================

# Native git/claude skriver normal info till stderr. Med 'Stop' skulle
# PowerShell 5.1 da kasta fel, sa vi kor med 'Continue' och fangar riktiga
# undantag manuellt i try/catch.
$ErrorActionPreference = 'Continue'

# Repo-roten harleds ur skriptets egen plats (<repo>\.claude\nyheter\) sa att
# samma skript fungerar pa vilken maskin och vilken sokvag som helst.
# Fallback behovs bara om skriptet dot-sourcas utan $PSScriptRoot.
if ($PSScriptRoot) { $Repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent }
else               { $Repo = 'C:\claude\Fysiklabbet' }

$LogDir  = Join-Path $Repo '.claude\nyheter\logg'
$DataJs  = Join-Path $Repo 'data\nyheter.js'
$Today   = Get-Date -Format 'yyyy-MM-dd'
$LogFile = Join-Path $LogDir "$Today.log"

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Log($msg) {
    $line = ('{0}  {1}' -f (Get-Date -Format 'HH:mm:ss'), $msg)
    Add-Content -Path $LogFile -Value $line -Encoding utf8
    Write-Output $line
}

function HasTodayArticle {
    return [bool](Select-String -Path $DataJs -SimpleMatch ('date: "{0}"' -f $Today) -Quiet)
}

function Find-Python {
    # Nyhetsagenten anropar Gemini-bildskriptet med en explicit Python-sokvag.
    # Den FAR INTE hardkodas till ett anvandarnamn - da gar bildgenereringen
    # sonder tyst pa en maskin dar kontot heter nagot annat.
    $kandidat = Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312\python.exe'
    if (Test-Path $kandidat) { return $kandidat }

    # Windows-launchern pekar ut ratt tolk aven vid annan installationsplats.
    $viaLauncher = (& py -3.12 -c "import sys; print(sys.executable)" 2>$null)
    if ($LASTEXITCODE -eq 0 -and $viaLauncher -and (Test-Path $viaLauncher)) { return $viaLauncher }

    $cmd = Get-Command python -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }

    return 'python'
}

function Invoke-Native {
    # Kor en native exe, loggar all output, kastar inte pa stderr.
    # OBS: parametern far INTE heta $Args ($Args ar en reserverad automatisk
    # variabel i PowerShell -> splattingen blir tom och inga argument skickas).
    param([string]$Exe, [string[]]$Arguments)
    & $Exe @Arguments 2>&1 | ForEach-Object { Log $_ }
}

Set-Location $Repo
Log "=== Daglig nyhet: start ($Today) ==="

# 1) Redan publicerad idag? Da ar vi klara (snabb utgang, ingen las behovs).
if (HasTodayArticle) {
    Log "Dagens nyhet finns redan i data/nyheter.js. Inget att gora."
    Log "=== Daglig nyhet: slut ==="
    return
}

# 2) Hogst tva tunga korningar per dag: forsta inloggningen + en retry (t.ex.
#    om natverket inte hunnit upp). Utan detta skulle VARJE inloggning samma
#    dag starta en ny full Claude-korning sa lange nagot gatt fel.
$MaxForsok   = 2
$ForsokFil   = Join-Path $LogDir ('.forsok-{0}' -f $Today)
$AntalForsok = 0
if (Test-Path $ForsokFil) {
    $raw = (Get-Content -Path $ForsokFil -TotalCount 1)
    [void][int]::TryParse($raw, [ref]$AntalForsok)
}
if ($AntalForsok -ge $MaxForsok) {
    Log ("Redan {0} korning(ar) idag utan resultat - avstar till imorgon." -f $AntalForsok)
    Log "=== Daglig nyhet: slut ==="
    return
}
Set-Content -Path $ForsokFil -Value ($AntalForsok + 1) -Encoding ascii

# Stada bort gamla forsoksmarkorer.
Get-ChildItem -Path $LogDir -Filter '.forsok-*' -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } |
    Remove-Item -Force -ErrorAction SilentlyContinue

# 3) Enkel las sa tva inloggningar inte kor samtidigt.
$Lock = Join-Path $LogDir '.lock'
if (Test-Path $Lock) {
    $ageMin = ((Get-Date) - (Get-Item $Lock).LastWriteTime).TotalMinutes
    if ($ageMin -lt 30) {
        Log ("En korning pagar redan (las {0:n0} min gammal). Avslutar." -f $ageMin)
        return
    }
    Log "Hittade gammal las - tar bort den."
    Remove-Item -Force $Lock -ErrorAction SilentlyContinue
}
Set-Content -Path $Lock -Value $Today -Encoding ascii

$Misslyckades = $false

try {
    # 4) Synka med GitHub forst (undvik push-konflikt).
    Log "git pull --rebase --autostash origin main"
    Invoke-Native 'git' @('pull','--rebase','--autostash','origin','main')

    if (HasTodayArticle) {
        Log "Dagens nyhet kom in via pull. Inget mer att gora."
    }
    else {
        # 5) Hitta claude.exe.
        $Claude = Join-Path $env:USERPROFILE '.local\bin\claude.exe'
        if (-not (Test-Path $Claude)) { $Claude = 'claude' }

        $Python = Find-Python
        Log ("Python for bildgenerering: {0}" -f $Python)

        $Prompt = @"
Today is $Today. Read the file .claude/agents/nyhetsagent.md and carry out its FULL workflow to publish exactly ONE Swedish physics news article for today.

Steps: check the queue/log in .claude/nyheter/ so you do not repeat a story; pick the single most relevant story from the listed sources (Phys.org, Physics Magazine/APS, Physics World, Quanta, ScienceDaily, Nature) and research it thoroughly (you may read other reputable sites and the original paper too); write an in-depth, popular-science article in Swedish that follows the project's typography rules (Swedish quotation marks, comma decimals, NBSP, italic variables, no emojis); obtain a clean open-source image or generate one with the Gemini image script using the system Python at $Python; save the image under nyheter/bilder/ and add the article object to the TOP of window.NYHETER in data/nyheter.js with a real source link and a direct link to the original research when one exists; update .claude/nyheter/publicerat.md and ko.md; run node .claude/verify-navigation.js; then git add, git commit and git push origin main.

Publish ONLY ONE article. If today's date already exists in data/nyheter.js, make no changes and do not commit.
"@

        # Headless print-lage avslutar bakgrundsagenter efter 600 s som standard.
        # Nyhetsagenten startas ofta i bakgrunden och behover langre tid an sa
        # (2026-07-30: agenten dodades mitt i arbetet, exitkod 0, ingen artikel).
        # 0 = vanta ut bakgrundsjobben i stallet for att kapa dem.
        $env:CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS = '0'

        # Modell: opus (uttryckligt onskemal 2026-07-31). Nyhetsagenten gor
        # research, faktakoll och redaktionell bedomning - det tjanar pa den
        # starkaste modellen. 'opus' = senaste Opus-versionen.
        Log "Startar Claude Code (headless, modell opus)..."
        Invoke-Native $Claude @('-p', $Prompt, '--model', 'opus', '--dangerously-skip-permissions')
        Log ("Claude avslutade med kod {0}" -f $LASTEXITCODE)

        # Lita INTE pa exitkoden - den kan bli 0 aven nar ingen artikel skrevs.
        # Kontrollera resultatet i data/nyheter.js i stallet.
        if (HasTodayArticle) {
            Log "OK: dagens artikel finns nu i data/nyheter.js."
        }
        else {
            $Misslyckades = $true
            Log ('FEL: Claude avslutade utan att skriva nagon artikel for {0} - ingen rad "date: {1}{0}{1}" i data/nyheter.js.' -f $Today, '"')
        }
    }

    # 6) Skyddsnat: pusha eventuella ej pushade commits.
    $ahead = (& git rev-list --count 'origin/main..HEAD' 2>$null)
    if ($ahead -and ([int]$ahead -gt 0)) {
        Log ("Pushar {0} ej pushade commit(s)..." -f $ahead)
        Invoke-Native 'git' @('push','origin','main')
    }
    else {
        Log "Inga nya commits att pusha."
    }
}
catch {
    $Misslyckades = $true
    Log ("FEL: {0}" -f $_.Exception.Message)
}
finally {
    Remove-Item -Force $Lock -ErrorAction SilentlyContinue
    if ($Misslyckades) {
        Log "=== Daglig nyhet: slut (MISSLYCKADES - ingen artikel publicerad) ==="
    }
    else {
        Log "=== Daglig nyhet: slut ==="
    }
}

# Icke-noll exitkod nar inget publicerades, sa Windows Schemalaggaren visar
# korningen som misslyckad i stallet for gron.
if ($Misslyckades) { exit 1 }
