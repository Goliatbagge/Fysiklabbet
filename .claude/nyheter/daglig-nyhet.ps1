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

$Repo    = 'C:\claude\Fysiklabbet'
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

# 2) Enkel las sa tva inloggningar inte kor samtidigt.
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

try {
    # 3) Synka med GitHub forst (undvik push-konflikt).
    Log "git pull --rebase --autostash origin main"
    Invoke-Native 'git' @('pull','--rebase','--autostash','origin','main')

    if (HasTodayArticle) {
        Log "Dagens nyhet kom in via pull. Inget mer att gora."
    }
    else {
        # 4) Hitta claude.exe.
        $Claude = Join-Path $env:USERPROFILE '.local\bin\claude.exe'
        if (-not (Test-Path $Claude)) { $Claude = 'claude' }

        $Prompt = @"
Today is $Today. Read the file .claude/agents/nyhetsagent.md and carry out its FULL workflow to publish exactly ONE Swedish physics news article for today.

Steps: check the queue/log in .claude/nyheter/ so you do not repeat a story; pick the single most relevant story from the listed sources (Phys.org, Physics Magazine/APS, Physics World, Quanta, ScienceDaily) and research it thoroughly (you may read other reputable sites and the original paper too); write an in-depth, popular-science article in Swedish that follows the project's typography rules (Swedish quotation marks, comma decimals, NBSP, italic variables, no emojis); obtain a clean open-source image or generate one with the Gemini image script using the system Python at C:/Users/sam_s/AppData/Local/Programs/Python/Python312/python.exe; save the image under nyheter/bilder/ and add the article object to the TOP of window.NYHETER in data/nyheter.js with a real source link and a direct link to the original research when one exists; update .claude/nyheter/publicerat.md and ko.md; run node .claude/verify-navigation.js; then git add, git commit and git push origin main.

Publish ONLY ONE article. If today's date already exists in data/nyheter.js, make no changes and do not commit.
"@

        Log "Startar Claude Code (headless, modell sonnet)..."
        Invoke-Native $Claude @('-p', $Prompt, '--model', 'sonnet', '--dangerously-skip-permissions')
        Log ("Claude avslutade med kod {0}" -f $LASTEXITCODE)
    }

    # 5) Skyddsnat: pusha eventuella ej pushade commits.
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
    Log ("FEL: {0}" -f $_.Exception.Message)
}
finally {
    Remove-Item -Force $Lock -ErrorAction SilentlyContinue
    Log "=== Daglig nyhet: slut ==="
}
