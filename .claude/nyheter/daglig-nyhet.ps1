# =====================================================================
#  Fysiklabbet - daglig nyhet
#  Korsa av Windows Schemalaggaren vid inloggning (se installera-task.ps1).
#  Skapar EN fysiknyhet per dag via Claude Code + nyhetsagenten och pushar.
#  Idempotent: kors den flera ganger samma dag hander inget extra.
#  Reserv: misslyckas nattens korning (Claude-gransen nadd, natfel) gors ett
#  nytt forsok 07:15 (se installera-task.ps1), och
#  .github/workflows/nyhetsvakt.yml oppnar ett arende pa GitHub (= mejl till
#  agaren) om ingen nyhet finns pa main en bit in pa formiddagen.
#  Se CLAUDE.md, "Dagens nyhet".
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
# Namnet som installera-task.ps1 registrerar (dess -Namn-standard).
$HuvudTask = 'Fysiklabbet daglig nyhet'

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Log($msg) {
    $line = ('{0}  {1}' -f (Get-Date -Format 'HH:mm:ss'), $msg)
    Add-Content -Path $LogFile -Value $line -Encoding utf8
    Write-Output $line
}

function HasTodayArticle {
    # Bada nyckelformerna forekommer i data/nyheter.js: date: "..." (de flesta
    # artiklarna) och "date": "..." (JSON-stil, t.ex. extraartikeln
    # 2026-10-03). Den gamla bokstavliga sokningen sag bara den forsta formen,
    # sa en artikel i JSON-stil fran molnets reservjobb hade gett en andra
    # artikel samma dag.
    $monster = '[''"]?date[''"]?\s*:\s*[''"]{0}[''"]' -f [regex]::Escape($Today)
    return [bool](Select-String -Path $DataJs -Pattern $monster -Quiet)
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

function Planera-OmforsokEfterGrans([string]$Utdata) {
    # Claude-gransen slog i (2026-10-04: "You've hit your session limit -
    # resets 3:50am", korningen dog efter fem sekunder). Vi vantar INTE i
    # processen - uppgiften har en tidsgrans pa 1 h och gransen kan slappa
    # flera timmar senare. I stallet laggs en engangsuppgift som kor samma
    # skript 5 min efter att gransen slappt, med huvuduppgiftens atgard,
    # konto och installningar.
    # Ett gransforsok dog innan det hann gora nagot, sa det raknas inte mot
    # taket pa tunga korningar. Egna tak: hogst 4 sadana omforsok per dygn.
    $GransFil = Join-Path $LogDir ('.gransforsok-{0}' -f $Today)
    $Antal = 0
    if (Test-Path $GransFil) { [void][int]::TryParse((Get-Content $GransFil -TotalCount 1), [ref]$Antal) }
    if ($Antal -ge 4) { Log "Claude-gransen nadd igen, men redan 4 omforsok idag - avstar."; return }
    Set-Content -Path $GransFil -Value ($Antal + 1) -Encoding ascii
    Set-Content -Path $ForsokFil -Value $AntalForsok -Encoding ascii

    # "resets 3:50am" / "resets 4pm" / "resets 15:50". Ett datum efter
    # "resets" (veckograns, "resets Oct 7, 4am") matchar inte - da forsoker
    # vi om en timme och later taket ovan satta stopp.
    $Nu = Get-Date
    $Mal = $Nu.AddHours(1)
    $m = [regex]::Match($Utdata, 'resets\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?', 'IgnoreCase')
    if ($m.Success) {
        $h = [int]$m.Groups[1].Value
        $min = if ($m.Groups[2].Success) { [int]$m.Groups[2].Value } else { 0 }
        $ampm = $m.Groups[3].Value.ToLower()
        if ($ampm -eq 'pm' -and $h -lt 12) { $h += 12 }
        if ($ampm -eq 'am' -and $h -eq 12) { $h = 0 }
        if ($h -le 23 -and $min -le 59) {
            $Slapp = $Nu.Date.AddHours($h).AddMinutes($min)
            if ($Slapp -le $Nu) { $Slapp = $Slapp.AddDays(1) }
            if (($Slapp - $Nu).TotalHours -le 6) { $Mal = $Slapp }
        }
    }
    $Mal = $Mal.AddMinutes(5)

    try {
        $Huvud = Get-ScheduledTask -TaskName $HuvudTask -ErrorAction Stop
        Register-ScheduledTask -TaskName ('{0} (efter grans)' -f $HuvudTask) `
            -Action $Huvud.Actions -Principal $Huvud.Principal -Settings $Huvud.Settings `
            -Trigger (New-ScheduledTaskTrigger -Once -At $Mal) `
            -Description 'Engangsomforsok efter att Claude-gransen slagit i. Skrivs over av daglig-nyhet.ps1 vid behov.' `
            -Force -ErrorAction Stop | Out-Null
        Log ("Claude-gransen nadd. Nytt forsok planerat {0:HH:mm}." -f $Mal)
    }
    catch {
        Log ("FEL: kunde inte planera omforsok efter gransen: {0}" -f $_.Exception.Message)
    }
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

# 2) Hogst tre tunga korningar per dag: nattens korning, morgonens omforsok
#    och ett skyddsnat vid inloggning efter omstart. Utan taket skulle VARJE
#    inloggning samma dag starta en ny full Claude-korning sa lange nagot
#    gatt fel.
$MaxForsok   = 3
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
        # 5) Hitta claude.exe. Samma ordning som fb-/ig-jobben: winget-
        #    installationen forst. ~\.local\bin forsvann i slutet av sept 2026
        #    och da hittades ingen claude alls (natten 2026-10-01 uteblev).
        $Claude = $null
        foreach ($k in @(
            (Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'),
            (Join-Path $env:USERPROFILE '.local\bin\claude.exe'))) {
            if (Test-Path $k) { $Claude = $k; break }
        }
        if (-not $Claude) {
            $cmd = Get-Command claude -ErrorAction SilentlyContinue
            if ($cmd) { $Claude = $cmd.Source } else { throw 'claude.exe hittas inte (varken winget, ~\.local\bin eller PATH).' }
        }
        Log "claude.exe: $Claude"

        $Python = Find-Python
        Log ("Python for bildgenerering: {0}" -f $Python)

        $Prompt = @"
Today is $Today. Read the file .claude/agents/nyhetsagent.md and carry out its FULL workflow to publish exactly ONE Swedish physics news article for today.

Steps: check the queue/log in .claude/nyheter/ so you do not repeat a story; pick the single most relevant story from the listed sources (Phys.org, Physics Magazine/APS, Physics World, Quanta, ScienceDaily, Nature) and research it thoroughly (you may read other reputable sites and the original paper too); write an in-depth, popular-science article in Swedish that follows the project's typography rules (Swedish quotation marks, comma decimals, NBSP, italic variables, no emojis); obtain a clean open-source image or generate one with the Gemini image script using the system Python at $Python; save the image under nyheter/bilder/ and add the article object to the TOP of window.NYHETER in data/nyheter.js with a real source link and a direct link to the original research when one exists; update .claude/nyheter/publicerat.md and ko.md; run node .claude/verify-navigation.js; then git add, git commit and git push origin main.

Publish ONLY ONE article. If today's date already exists in data/nyheter.js, make no changes and do not commit. Another run (a retry, or a manual cloud session) may publish today's article in parallel, so immediately before you commit: run git pull --rebase origin main, and if an article dated $Today has appeared in data/nyheter.js from someone else, discard your own article and do not commit or push.
"@

        # Headless print-lage avslutar bakgrundsagenter efter 600 s som standard.
        # Nyhetsagenten startas ofta i bakgrunden och behover langre tid an sa
        # (2026-07-30: agenten dodades mitt i arbetet, exitkod 0, ingen artikel).
        # 0 = vanta ut bakgrundsjobben i stallet for att kapa dem.
        $env:CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS = '0'

        # Ror inte Telegram-kanalen: pluginens server tar over boten fran
        # starta-telegram.cmd-sessionen. Utan token i denna katalog avslutar den direkt.
        $env:TELEGRAM_STATE_DIR = Join-Path $env:TEMP 'telegram-ingen-kanal'

        # Modell: opus (uttryckligt onskemal 2026-07-31). Nyhetsagenten gor
        # research, faktakoll och redaktionell bedomning - det tjanar pa den
        # starkaste modellen. 'opus' = senaste Opus-versionen.
        Log "Startar Claude Code (headless, modell opus)..."
        $ClaudeUt = New-Object System.Collections.Generic.List[string]
        & $Claude @('-p', $Prompt, '--model', 'opus', '--dangerously-skip-permissions') 2>&1 |
            ForEach-Object { $ClaudeUt.Add([string]$_); Log $_ }
        Log ("Claude avslutade med kod {0}" -f $LASTEXITCODE)
        $GransNadd = (($ClaudeUt -join "`n") -match "hit your .*limit")

        # Lita INTE pa exitkoden - den kan bli 0 aven nar ingen artikel skrevs.
        # Kontrollera resultatet i data/nyheter.js i stallet.
        if (HasTodayArticle) {
            Log "OK: dagens artikel finns nu i data/nyheter.js."
        }
        else {
            $Misslyckades = $true
            Log ('FEL: Claude avslutade utan att skriva nagon artikel for {0} - ingen rad "date: {1}{0}{1}" i data/nyheter.js.' -f $Today, '"')
            if ($GransNadd) { Planera-OmforsokEfterGrans ($ClaudeUt -join "`n") }
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
