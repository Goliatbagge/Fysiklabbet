# =====================================================================
#  Fysiklabbet - daglig nyhet (med förhandsgranskning)
#
#  Rutinen sedan 2026-10-25 (ägarens beslut; nattschemat sedan samma kväll):
#    1. NATT (-Lage imorgon 03.20 eller -Lage idag 03.15, omförsök 07.15/
#       07.20 och 13.15, samt vid inloggning). Båda lägena gör samma sak:
#       a) SKYDDSNÄT: finns dagens artikel (förberedd natten innan) händer
#          ingenting. Saknas den skrivs och publiceras den direkt, och ägaren
#          får ett mejl om att den gick ut utan förhandsgranskning.
#       b) Nyhetsagenten skriver MORGONDAGENS artikel med morgondagens datum.
#          Datumgrinden i data/nyheter.js döljer den till midnatt, så den kan
#          pushas direkt. Sedan mejlas ägaren en granskningslänk
#          (nyheter.html?forhand=<id>), så att hen kan läsa och godkänna
#          den under dagen.
#    2. -Lage svar (07.45, 11.45, 15.45, 19.15, 22.15): läser ägarens
#       mejlsvar. "OK" kvitteras, ändringar görs och pushas, "stoppa" tar
#       bort artikeln och skriver en ny. Inget svar = artikeln publiceras
#       ändå vid midnatt.
#
#  Jobbet arbetar i en EGEN arbetskatalog (git worktree, gren nyhetsjobb,
#  C:\claude\Fysiklabbet-nyhetsjobb) som återställs till origin/main före
#  varje körning. Den gemensamma arbetskatalogen används inte längre: där
#  står interaktiva sessioner på andra grenar med stagade filer, och natten
#  2026-10-25 drog jobbet in main i en arbetsgren, fick konflikt i feed.xml
#  och kunde inte pusha. Skriptet ligger i den egna arbetskatalogen och de
#  schemalagda uppgifterna pekar dit (installera-task.ps1), så jobbet kör
#  alltid mains version.
#
#  Mejl: Claude-sessionen skickar via Gmail-kopplingen till ägarens adress.
#  Varje mejl från jobbet bär markören FL-JOBB och FL-NYHET:<datum>, och
#  ämnesraden börjar "[Nyhet <datum>]". Ett svar är obehandlat så länge det
#  senaste meddelandet i tråden saknar markören.
#
#  Filen MÅSTE sparas som UTF-8 MED BOM (PowerShell 5.1 läser annars å/ä/ö
#  som ANSI, och de svenska meningarna i uppdragen blir trasiga).
#  Loggar till .claude\nyheter\logg\<datum>.log (ignoreras av git). Efter
#  varje körning pushas loggen också till grenen nyhetsjobb-logg (utan
#  nycklar och mejladress), så att den går att läsa på GitHub och från en
#  molnsession. Nyhetsvakten (.github/workflows/nyhetsvakt.yml) länkar dit.
#  Se CLAUDE.md, "Dagens nyhet".
# =====================================================================

param(
    [ValidateSet('idag', 'imorgon', 'svar')]
    [string]$Lage = 'idag'
)

# Native git/claude skriver normal info till stderr. Med 'Stop' skulle
# PowerShell 5.1 då kasta fel, så vi kör med 'Continue' och fångar riktiga
# undantag manuellt i try/catch.
$ErrorActionPreference = 'Continue'

if ($PSScriptRoot) { $Repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent }
else               { $Repo = 'C:\claude\Fysiklabbet-nyhetsjobb' }

$Agare     = 'sam.skoglund83@gmail.com'
$Bas       = 'https://fysiklabbet.se'
$LogDir    = Join-Path $Repo '.claude\nyheter\logg'
$DataJs    = Join-Path $Repo 'data\nyheter.js'
$Today     = Get-Date -Format 'yyyy-MM-dd'
$Tomorrow  = (Get-Date).AddDays(1).ToString('yyyy-MM-dd')
$LogFile   = Join-Path $LogDir "$Today.log"
# Namnet som installera-task.ps1 registrerar för skyddsnätet (-Lage idag).
$HuvudTask = 'Fysiklabbet daglig nyhet'

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Log($msg) {
    $line = ('{0}  [{1}] {2}' -f (Get-Date -Format 'HH:mm:ss'), $Lage, $msg)
    Add-Content -Path $LogFile -Value $line -Encoding utf8
    # Write-Host, inte Write-Output: funktioner som loggar (Push-Main) returnerar
    # ett sant/falskt varde, och Write-Output hade blandat in loggraderna i det.
    Write-Host $line
}

function HasArticle([string]$Datum) {
    # Båda nyckelformerna förekommer: date: "..." och "date": "..." (JSON-stil).
    $monster = '[''"]?date[''"]?\s*:\s*[''"]{0}[''"]' -f [regex]::Escape($Datum)
    return [bool](Select-String -Path $DataJs -Pattern $monster -Quiet)
}

function Find-Python {
    # Nyhetsagenten anropar Gemini-bildskriptet med en explicit Python-sökväg.
    $kandidat = Join-Path $env:LOCALAPPDATA 'Programs\Python\Python312\python.exe'
    if (Test-Path $kandidat) { return $kandidat }
    $viaLauncher = (& py -3.12 -c "import sys; print(sys.executable)" 2>$null)
    if ($LASTEXITCODE -eq 0 -and $viaLauncher -and (Test-Path $viaLauncher)) { return $viaLauncher }
    $cmd = Get-Command python -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    return 'python'
}

function Find-Claude {
    # Samma ordning som fb-/ig-jobben: winget-installationen först.
    foreach ($k in @(
        (Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'),
        (Join-Path $env:USERPROFILE '.local\bin\claude.exe'))) {
        if (Test-Path $k) { return $k }
    }
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    throw 'claude.exe hittas inte (varken winget, ~\.local\bin eller PATH).'
}

function Invoke-Native {
    # OBS: parametern får INTE heta $Args (reserverad automatisk variabel).
    param([string]$Exe, [string[]]$Arguments)
    & $Exe @Arguments 2>&1 | ForEach-Object { Log $_ }
}

$script:GransNadd = $false
$script:ClaudeText = ''
$script:ForsokFil = $null
$script:AntalForsok = 0
$script:InloggningSaknas = $false

# Långlivad inloggning för jobbet (sedan 2026-10-31). Den vanliga
# inloggningen i ~\.claude\.credentials.json gick ut 2026-10-29 och kunde
# inte förnyas utan att någon loggade in för hand, så två dagar gick utan
# nyhet. `claude setup-token` ger en token som gäller ett år; den sparas
# utanför repot i den här filen och läses av varje körning.
$TokenFil = Join-Path $env:USERPROFILE '.claude\nyhetsjobb-token.txt'

function Invoke-Claude([string]$Prompt, [string]$Modell) {
    # Headless print-läge avslutar bakgrundsagenter efter 600 s som standard;
    # 0 = vänta ut dem (2026-07-30 dödades nyhetsagenten mitt i arbetet).
    $env:CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS = '0'
    # Rör inte Telegram-kanalen (pluginens server tar annars över boten).
    $env:TELEGRAM_STATE_DIR = Join-Path $env:TEMP 'telegram-ingen-kanal'
    if (Test-Path $TokenFil) {
        $token = ([IO.File]::ReadAllText($TokenFil)).Trim()
        if ($token) { $env:CLAUDE_CODE_OAUTH_TOKEN = $token }
    }
    Log ("Startar Claude Code (headless, modell {0})..." -f $Modell)
    $ut = New-Object System.Collections.Generic.List[string]
    & $script:Claude @('-p', $Prompt, '--model', $Modell, '--dangerously-skip-permissions') 2>&1 |
        ForEach-Object { $ut.Add([string]$_); Log $_ }
    Log ("Claude avslutade med kod {0}" -f $LASTEXITCODE)
    $script:ClaudeText = ($ut -join "`n")
    # Sessionsgränsen ("You've hit your session limit"), veckogränsen och
    # äldre CLI-versioners "Claude AI usage limit reached".
    if ($script:ClaudeText -match 'hit your .*limit|usage limit reached|weekly limit') { $script:GransNadd = $true }
    if ($script:ClaudeText -match 'Failed to authenticate|OAuth (session|token) (has )?expired|Invalid API key|Please run /login|Not logged in|authentication_error') {
        $script:InloggningSaknas = $true
        # Försöket dog innan det gjorde något och ska inte räknas mot taket.
        if ($script:ForsokFil) { Set-Content -Path $script:ForsokFil -Value $script:AntalForsok -Encoding ascii }
        Larma-Inloggning
    }
}

function Larma-Inloggning {
    # Claude kommer inte in. Det löser sig inte av sig självt, och mejlet till
    # ägaren skickas av en Claude-session, så larmet måste gå en annan väg:
    #  1. ett ärende på GitHub via arbetsflödet Nyhetsjobb-larm (öppnas av
    #     github-actions, så att GitHub mejlar ägaren; ett per dag),
    #  2. en ruta på skärmen (msg), som syns när någon sätter sig vid datorn.
    $Fil = Join-Path $LogDir ('.inloggningslarm-{0}' -f $Today)
    if (Test-Path $Fil) { return }
    Set-Content -Path $Fil -Value (Get-Date -Format 'HH:mm') -Encoding ascii
    Log 'FEL: Claude-inloggningen fungerar inte. Larmar ägaren.'
    $rubrik = "Nyhetsjobbet kan inte logga in i Claude ($Today)"
    $text = @"
Nyhetsjobbet på Windows-datorn får 'Failed to authenticate' från Claude Code, så ingen nyhet skrivs förrän inloggningen är lagad.

Laga så här (en gång, i en vanlig PowerShell på datorn):

1. ``claude setup-token`` och logga in i webbläsaren som öppnas.
2. Spara token som visas i ``$TokenFil`` (bara token, en rad).
3. Starta om jobbet: ``Start-ScheduledTask -TaskName 'Fysiklabbet daglig nyhet imorgon'``

Token gäller ett år. Loggen: https://github.com/Goliatbagge/Fysiklabbet/blob/nyhetsjobb-logg/$Today.log
"@
    $gh = Get-Command gh -ErrorAction SilentlyContinue
    if ($gh) {
        & $gh.Source workflow run nyhetsjobb-larm.yml --repo Goliatbagge/Fysiklabbet -f "rubrik=$rubrik" -f "text=$text" 2>&1 | ForEach-Object { Log $_ }
        if ($LASTEXITCODE -eq 0) { Log 'Larmet skickat till GitHub (Nyhetsjobb-larm).' }
        else { Log 'FEL: larmet kunde inte skickas till GitHub.' }
    }
    else { Log 'FEL: gh saknas, inget GitHub-larm.' }
    try {
        & msg.exe '*' "Fysiklabbet: nyhetsjobbet kan inte logga in i Claude, så ingen nyhet skrivs. Kör 'claude setup-token' och spara token i $TokenFil." 2>$null
    } catch { }
}

function Push-Main {
    # Pushar HEAD till main. Kommer något annat in under tiden (fb-jobb,
    # GitHub Actions) rebaseas vi ovanpå och försöker igen.
    $ahead = (& git rev-list --count 'origin/main..HEAD' 2>$null)
    if (-not $ahead -or ([int]$ahead -eq 0)) { Log 'Inget att pusha.'; return $true }
    foreach ($vanta in @(0, 2, 4, 8, 16)) {
        if ($vanta) { Start-Sleep -Seconds $vanta }
        Invoke-Native 'git' @('pull', '-q', '--rebase', 'origin', 'main')
        $rebaseDir = (& git rev-parse --git-path rebase-merge 2>$null)
        if ($rebaseDir -and (Test-Path $rebaseDir)) {
            Log 'FEL: rebase-konflikt - avbryter rebasen.'
            Invoke-Native 'git' @('rebase', '--abort')
            return $false
        }
        & git push -q origin 'HEAD:main' 2>&1 | ForEach-Object { Log $_ }
        if ($LASTEXITCODE -eq 0) { Log 'Pushat till main.'; return $true }
        Log 'Push misslyckades - försöker igen.'
    }
    return $false
}

function Sync-Main {
    # Arbetskatalogen ska alltid stå på origin/main. Commits som en tidigare
    # körning inte fick ut försöker vi pusha först; går det inte sparas de på
    # en reservgren innan återställningen, så att ingen artikel försvinner.
    Invoke-Native 'git' @('fetch', '-q', 'origin', 'main')
    $ahead = (& git rev-list --count 'origin/main..HEAD' 2>$null)
    if ($ahead -and ([int]$ahead -gt 0)) {
        Log ("{0} opushade commit(s) från en tidigare körning - försöker pusha." -f $ahead)
        if (-not (Push-Main)) {
            $rest = 'nyhetsjobb-rest-' + (Get-Date -Format 'yyyyMMdd-HHmmss')
            Invoke-Native 'git' @('branch', $rest)
            Log "Kunde inte pusha. Sparade dem på grenen $rest."
        }
        Invoke-Native 'git' @('fetch', '-q', 'origin', 'main')
    }
    Invoke-Native 'git' @('reset', '-q', '--hard', 'origin/main')
    # Rensa spårlösa filer från en avbruten körning, men aldrig loggarna
    # (markörer för försök och lås bor där) eller ignorerade filer (.env).
    Invoke-Native 'git' @('clean', '-fdq', '-e', '.claude/nyheter/logg/')
}

function Spara-LoggPaGren {
    # Pushar dagens logg till grenen nyhetsjobb-logg, så att en misslyckad
    # natt går att felsöka utan att sitta vid datorn (2026-10-30 och -31 gick
    # båda nattkörningarna fel, och loggen fanns bara på Windows-datorn).
    # Grenen har bara loggfiler och är helt fristående från main: den byggs
    # med ett tillfälligt index och git commit-tree, så arbetskatalogen och
    # HEAD rörs inte. Nycklar och ägarens adress rensas bort först.
    try {
        if (-not (Test-Path $LogFile)) { return }
        $text = [IO.File]::ReadAllText($LogFile)
        $text = $text -replace 'AIza[0-9A-Za-z_\-]{30,}', '[NYCKEL]'
        $text = $text -replace 'sk-ant-[0-9A-Za-z_\-]+', '[NYCKEL]'
        $text = $text -replace [regex]::Escape($Agare), '[ägaren]'
        $tmp = Join-Path $env:TEMP "nyhetslogg-$Today.log"
        [IO.File]::WriteAllText($tmp, $text, (New-Object Text.UTF8Encoding $false))
        $blob = "$(& git hash-object -w $tmp)".Trim()

        $forra = $null
        & git fetch -q origin '+refs/heads/nyhetsjobb-logg:refs/remotes/origin/nyhetsjobb-logg' 2>$null
        if ($LASTEXITCODE -eq 0) { $forra = "$(& git rev-parse -q --verify 'refs/remotes/origin/nyhetsjobb-logg' 2>$null)".Trim() }

        $index = Join-Path $env:TEMP 'nyhetslogg-index'
        Remove-Item -Force $index -ErrorAction SilentlyContinue
        $env:GIT_INDEX_FILE = $index
        try {
            if ($forra) { & git read-tree $forra 2>$null } else { & git read-tree --empty 2>$null }
            & git update-index --add --cacheinfo "100644,$blob,$Today.log" 2>$null
            $trad = "$(& git write-tree)".Trim()
        }
        finally { Remove-Item Env:\GIT_INDEX_FILE -ErrorAction SilentlyContinue }

        $meddelande = "Nyhetsjobbets logg $Today ($Lage, $(Get-Date -Format 'HH:mm'))"
        if ($forra) { $commit = "$(& git commit-tree $trad -p $forra -m $meddelande)".Trim() }
        else        { $commit = "$(& git commit-tree $trad -m $meddelande)".Trim() }
        & git push -q origin "${commit}:refs/heads/nyhetsjobb-logg" 2>$null
        if ($LASTEXITCODE -ne 0) { Write-Host 'Loggen kunde inte pushas till nyhetsjobb-logg.' }
    }
    catch { Write-Host ("Loggen kunde inte sparas på grenen: {0}" -f $_.Exception.Message) }
}

function Read-ArticleId([string]$Datum) {
    # Plockar id för artikeln med givet datum ur data/nyheter.js (id står
    # alltid före date i artikelobjekten).
    $text = [IO.File]::ReadAllText($DataJs)
    $m = [regex]::Match($text, '[''"]?id[''"]?\s*:\s*[''"]([^''"]+)[''"]\s*,\s*[''"]?date[''"]?\s*:\s*[''"]' + [regex]::Escape($Datum) + '[''"]')
    if ($m.Success) { return $m.Groups[1].Value }
    return $null
}

function Planera-OmforsokEfterGrans([string]$Utdata) {
    # Claude-gränsen slog i ("You've hit your session limit - resets 3:50am").
    # En engångsuppgift kör samma skript och läge 5 min efter att gränsen
    # släppt, med skyddsnätsuppgiftens konto och inställningar. Högst 4 per dygn.
    $GransFil = Join-Path $LogDir ('.gransforsok-{0}' -f $Today)
    $Antal = 0
    if (Test-Path $GransFil) { [void][int]::TryParse((Get-Content $GransFil -TotalCount 1), [ref]$Antal) }
    if ($Antal -ge 4) { Log 'Claude-gränsen nådd igen, men redan 4 omförsök idag - avstår.'; return }
    Set-Content -Path $GransFil -Value ($Antal + 1) -Encoding ascii
    # Gränsförsöket dog innan det gjorde något och ska inte räknas mot taket.
    if ($script:ForsokFil) { Set-Content -Path $script:ForsokFil -Value $script:AntalForsok -Encoding ascii }

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
        $Arg = $Huvud.Actions[0].Arguments -replace '\s+-Lage\s+\S+', ''
        $Atg = New-ScheduledTaskAction -Execute $Huvud.Actions[0].Execute -Argument ("{0} -Lage {1}" -f $Arg, $Lage)
        Register-ScheduledTask -TaskName ('{0} (efter grans)' -f $HuvudTask) `
            -Action $Atg -Principal $Huvud.Principal -Settings $Huvud.Settings `
            -Trigger (New-ScheduledTaskTrigger -Once -At $Mal) `
            -Description 'Engångsomförsök efter att Claude-gränsen slagit i. Skrivs över av daglig-nyhet.ps1 vid behov.' `
            -Force -ErrorAction Stop | Out-Null
        Log ("Claude-gränsen nådd. Nytt försök planerat {0:HH:mm}." -f $Mal)
    }
    catch {
        Log ("FEL: kunde inte planera omförsök efter gränsen: {0}" -f $_.Exception.Message)
    }
}

function Tak([string]$Nyckel, [int]$Max) {
    # Högst $Max tunga körningar per nyckel (läge + datum). Returnerar $false
    # när taket är nått, annars räknas försöket upp.
    $script:ForsokFil = Join-Path $LogDir ('.forsok-{0}' -f $Nyckel)
    $script:AntalForsok = 0
    if (Test-Path $script:ForsokFil) {
        [void][int]::TryParse((Get-Content -Path $script:ForsokFil -TotalCount 1), [ref]$script:AntalForsok)
    }
    if ($script:AntalForsok -ge $Max) { return $false }
    Set-Content -Path $script:ForsokFil -Value ($script:AntalForsok + 1) -Encoding ascii
    return $true
}

# ---------------------------------------------------------------------
#  Uppdrag till Claude
# ---------------------------------------------------------------------

function Prompt-Skriv([string]$Datum, [bool]$Forhand) {
    $Python = Find-Python
    if ($Forhand) {
        $forhandText = "The article is written TODAY ($Today) but is for TOMORROW: set its date field to `"$Datum`" (no time field). The date gate at the end of data/nyheter.js hides it until midnight. When you check that consecutive news items are not from the same subject area, the neighbour is the article dated $Today."
    } else {
        $forhandText = "The article is for today, $Datum, and goes live as soon as it is pushed."
    }
    return @"
Today is $Today. Read the file .claude/agents/nyhetsagent.md and carry out its FULL workflow, including the independent review by the utgivare agent, to write exactly ONE Swedish physics news article dated $Datum.

$forhandText

Steps: check the queue/log in .claude/nyheter/ so you do not repeat a story; pick the single most relevant story from the listed sources (Phys.org, Physics Magazine/APS, Physics World, Quanta, ScienceDaily, Nature) and research it thoroughly, including the original paper; write an in-depth popular-science article in Swedish that follows the project's typography rules; obtain a clean open-source image or generate one with the Gemini image script using the system Python at $Python (the API key is in .env in the repository root); save the image under nyheter/bilder/ and add the article object to the TOP of the list in data/nyheter.js; run node data/build-nyheter-og.js; update .claude/nyheter/publicerat.md, ko.md and granskningar.md; run node .claude/verify-navigation.js and node .claude/verify-begrepp.js.

Then git add ONLY the news files and git commit on the current branch. Do NOT push and do NOT pull: the calling script pushes. Do not send any email: the calling script asks for that separately. If an article dated $Datum already exists in data/nyheter.js, make no changes and do not commit.
"@
}

function Prompt-Mejl([string]$Datum, [string]$Id, [string]$Typ) {
    $lank   = "$Bas/nyheter.html?forhand=$Id"
    $publik = "$Bas/nyheter.html?id=$Id"
    if ($Typ -eq 'granska') {
        $amne = "[Nyhet $Datum] Att granska: <title>"
        $uppdrag = @"
The article is scheduled and will be published automatically at 00.00 on $Datum. Write a short review email in Swedish with:
- one sentence saying that tomorrow's news article (weekday and date written out in Swedish) is ready and is published automatically at midnight;
- the title in bold, the deck, the category and the reading time;
- the line "Läs artikeln i förhandsvisning:" followed on the next line by a plain link whose visible text AND href are both EXACTLY $lank, copied character for character (never the plain ?id= address: the article is still hidden by the date gate and that address only shows the news list). No button: no colours, background, padding or other inline style on the link, so that it is readable in every mail client. Add that it can take a few minutes after this email before the link works;
- the utgivare's verdict for this article and, briefly, what had to be corrected (from .claude/nyheter/granskningar.md);
- the sources (name and link for the news source and the original research);
- this instruction, word for word: "Svara på det här mejlet med OK, eller skriv vad som ska ändras. Ändringar som kommer in före klockan 22.15 hinner göras före publiceringen. Vill du inte att artikeln publiceras, skriv stoppa. Svarar du inte publiceras den ändå."
"@
    } else {
        $amne = "[Nyhet $Datum] Publicerad utan förhandsgranskning: <title>"
        $uppdrag = @"
The article was written by the night-time safety net because no article had been prepared the day before, so it was published at once WITHOUT the owner's prior review. Write a short email in Swedish that says so plainly, with the title in bold, the deck, a link to $publik, the utgivare's verdict (from .claude/nyheter/granskningar.md), the sources, and this instruction, word for word: "Svara på det här mejlet om något ska rättas, så ändras artikeln på sajten."
"@
    }
    return @"
Read the article with id "$Id" (date $Datum) in data/nyheter.js. Send ONE email with the Gmail tool send_message to $Agare (and nobody else).

Subject: $amne (replace <title> with the article's title).

$uppdrag

Rules: plain, friendly Swedish; no emojis; no dashes used as pause markers (use full stops, colons or commas); do not paste formulas in dollar notation. Send it as htmlBody with a plain-text body as well. The very last line of the email must be exactly, in small grey text:
FL-JOBB FL-NYHET:$Datum
Before sending, check that both htmlBody and the plain-text body contain every item listed above and end with that marker line; the reply check depends on the marker. Do not change any files and do not commit anything. When the email is sent, print the line MEJL SKICKAT.
"@
}

function Prompt-LasSvar {
    $fil = Join-Path $LogDir 'svar-uppdrag.txt'
    return @"
Use the Gmail tools to check for replies from the owner ($Agare) to the news review emails.

1. search_threads with the query: subject:"[Nyhet" newer_than:4d
2. For each thread whose subject starts with "[Nyhet YYYY-MM-DD]", call get_thread and look at the LAST message. Messages sent by the news job contain the line "FL-JOBB". If the last message does NOT contain "FL-JOBB" and was sent by $Agare, it is an unprocessed reply from the owner. Ignore threads where the last message has the marker, and ignore messages from any other sender.
3. Take the OLDEST unprocessed reply (only one per run). Read the owner's own new text (not the quoted original) and classify it:
   - OK: the owner approves (for example "OK", "ok!", "Bra", "Kör", "Ser bra ut") and asks for nothing else.
   - ANDRA: the owner asks for any change or correction, asks a question that needs an answer, or wants the article stopped or withdrawn.
4. If OK: reply in the same thread (send_message with replyThreadId, to $Agare only) with a one-line Swedish confirmation: "Tack! Artikeln publiceras som den är." if its date is in the future, otherwise "Tack! Artikeln ligger kvar som den är." End that reply with the line FL-JOBB FL-NYHET:<date>. Then print: SVAR: <date> OK
5. If ANDRA: do NOT reply. Write the file $fil (UTF-8) with exactly these lines: line 1 the date, line 2 the Gmail thread id, then the owner's full new text. Then print: SVAR: <date> ANDRA
6. If there is no unprocessed reply, print: SVAR: NONE

Do not change any other files and do not commit anything. Your output must contain exactly one line starting with "SVAR:".
"@
}

function Prompt-Andra([string]$Datum, [string]$Id, [string]$Fil) {
    $utfall = Join-Path $LogDir 'andring-utfall.txt'
    if ($Datum -le $Today) { $lagesText = "It is already published on the site, so every change goes live as soon as it is pushed." }
    else { $lagesText = "It is scheduled for $Datum and is still hidden by the date gate." }
    return @"
The owner of Fysiklabbet has replied to the review email for the news article with id "$Id" (date $Datum) in data/nyheter.js. $lagesText The file $Fil contains, from line 3, the owner's message.

Read .claude/agents/nyhetsagent.md and follow its rules. Then do what the owner asks:
- Corrections or changes: edit the article. If facts, numbers, quotes or the scientific content change, have the utgivare agent review the changed parts again (log it in .claude/nyheter/granskningar.md). Run node data/build-nyheter-og.js and node .claude/verify-begrepp.js. Commit only the news files on the current branch.
- A question: answer it in the outcome file below, and change the article only if the answer shows that it is wrong.
- Stop or withdraw: remove the article object from data/nyheter.js together with its image(s) in nyheter/bilder/ and its page in nyheter/dela/, run node data/build-nyheter-og.js, update .claude/nyheter/publicerat.md, and commit.

Do NOT push and do NOT pull (the calling script pushes), and do not send any email. Finally write the file $utfall (UTF-8) in Swedish: line 1 exactly ANDRAD, BESVARAD or BORTTAGEN; then a short summary for the owner of what you changed or answered (no emojis, no dashes as pause markers).
"@
}

function Prompt-Kvittera([string]$Datum, [string]$Tradid, [string]$Id) {
    $utfall = Join-Path $LogDir 'andring-utfall.txt'
    if ($Datum -gt $Today) { $lank = "$Bas/nyheter.html?forhand=$Id" } else { $lank = "$Bas/nyheter.html?id=$Id" }
    return @"
Read the file $utfall. Reply in the Gmail thread with id $Tradid (send_message with replyThreadId, to $Agare only) with a short Swedish email built from that file: what was changed or answered and, if the article still exists, a link to $lank (the change can take a few minutes to show). If line 1 is BORTTAGEN, say that the article has been removed and, if the date $Datum is still in the future, that a new article is being written and will arrive in a separate review email. No emojis, no dashes as pause markers. The last line must be exactly: FL-JOBB FL-NYHET:$Datum
Do not change any files. Print MEJL SKICKAT when done.
"@
}

# ---------------------------------------------------------------------
#  Lägena
# ---------------------------------------------------------------------

function Kor-Skriv([string]$Datum, [bool]$Forhand) {
    if (HasArticle $Datum) { Log "Artikeln för $Datum finns redan. Inget att skriva."; return }
    Invoke-Claude (Prompt-Skriv $Datum $Forhand) 'opus'
    if (-not (HasArticle $Datum)) {
        Log "FEL: Claude avslutade utan att skriva någon artikel för $Datum."
        if ($script:GransNadd) { Planera-OmforsokEfterGrans $script:ClaudeText }
        return
    }
    if (-not (Push-Main)) { Log 'FEL: artikeln skrevs men kunde inte pushas.'; return }
    $id = Read-ArticleId $Datum
    Log "Artikel $Datum pushad: $id"
    # Ge GitHub Pages en stund, så att förhandslänken fungerar när mejlet kommer.
    Start-Sleep -Seconds 90
    if ($Forhand) { $typ = 'granska' } else { $typ = 'publicerad' }
    Invoke-Claude (Prompt-Mejl $Datum $id $typ) 'sonnet'
    # Sessionen skriver inte alltid den överenskomna raden ordagrant (första
    # körningen 2026-10-25 svarade "Mejlet är skickat …"), så godta båda.
    if ($script:ClaudeText -notmatch 'MEJL SKICKAT|[Mm]ejlet är skickat|email (has been |was )?sent') { Log 'VARNING: mejlet till ägaren verkar inte ha skickats.' }
}

function Kor-Svar {
    Invoke-Claude (Prompt-LasSvar) 'sonnet'
    $m = [regex]::Match($script:ClaudeText, 'SVAR:\s*(\d{4}-\d{2}-\d{2})\s+(OK|ANDRA)')
    if (-not $m.Success) { Log 'Inga obehandlade svar.'; return }
    $datum = $m.Groups[1].Value
    if ($m.Groups[2].Value -eq 'OK') { Log "Ägaren godkände artikeln för $datum."; return }

    $fil = Join-Path $LogDir 'svar-uppdrag.txt'
    if (-not (Test-Path $fil)) { Log "FEL: svarsfilen saknas ($fil)."; return }
    $tradid = ([IO.File]::ReadAllLines($fil) | Select-Object -Skip 1 -First 1).Trim()
    $id = Read-ArticleId $datum
    if (-not $id) { Log "FEL: hittar ingen artikel daterad $datum."; return }
    Log "Ägaren vill ändra artikeln $datum ($id). Tråd $tradid."

    $utfallFil = Join-Path $LogDir 'andring-utfall.txt'
    Remove-Item -Force $utfallFil -ErrorAction SilentlyContinue
    Invoke-Claude (Prompt-Andra $datum $id $fil) 'opus'
    if (-not (Test-Path $utfallFil)) {
        Log 'FEL: ändringen gav ingen utfallsfil. Svaret behandlas vid nästa körning.'
        if ($script:GransNadd) { Planera-OmforsokEfterGrans $script:ClaudeText }
        return
    }
    if (-not (Push-Main)) { Log 'FEL: ändringen kunde inte pushas. Svaret behandlas vid nästa körning.'; return }
    Start-Sleep -Seconds 60
    Invoke-Claude (Prompt-Kvittera $datum $tradid $id) 'sonnet'
    Remove-Item -Force $fil -ErrorAction SilentlyContinue

    $utfall = [IO.File]::ReadAllLines($utfallFil) | Select-Object -First 1
    if ($utfall -match 'BORTTAGEN' -and $datum -gt $Today) {
        Log "Artikeln för $datum togs bort på ägarens begäran. Skriver en ny."
        Kor-Skriv $datum $true
    }
}

# ---------------------------------------------------------------------
#  Huvudflöde
# ---------------------------------------------------------------------

Set-Location $Repo

# ⛔ SPÄRR: skriptet återställer arbetskatalogen med git reset --hard och
# git clean. Det får bara ske i nyhetsjobbets egen worktree (gren
# nyhetsjobb), aldrig i den gemensamma arbetskatalogen där ocommittat arbete
# ligger. Startas skriptet någon annanstans (en gammal schemalagd uppgift som
# pekar på C:\claude\Fysiklabbet) lämnas jobbet över till worktreens skript.
$Gren = (& git rev-parse --abbrev-ref HEAD 2>$null)
if ($Gren -ne 'nyhetsjobb') {
    $Worktree = 'C:\claude\Fysiklabbet-nyhetsjobb'
    $Dit = Join-Path $Worktree '.claude\nyheter\daglig-nyhet.ps1'
    if ((Test-Path $Dit) -and ((Resolve-Path $Dit).Path -ne $PSCommandPath)) {
        Log "Startat i $Repo (gren $Gren). Lämnar över till $Dit."
        & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $Dit -Lage $Lage
    } else {
        Log "FEL: startat i $Repo på grenen '$Gren', inte i nyhetsjobbets worktree. Avbryter utan att röra något."
    }
    return
}

Log "=== Nyhetsjobb: start ($Today) ==="

# Snabb utgång utan lås och utan git: nattjobbet behöver inte göra något när
# både dagens och morgondagens artikel redan ligger i arbetskatalogen.
if ($Lage -ne 'svar' -and (HasArticle $Today) -and (HasArticle $Tomorrow)) {
    Log 'Dagens och morgondagens nyhet finns redan. Inget att göra.'
    Log '=== Nyhetsjobb: slut ==='
    return
}

# Enkelt lås så att två körningar aldrig arbetar i katalogen samtidigt.
$Lock = Join-Path $LogDir '.lock'
if (Test-Path $Lock) {
    $ageMin = ((Get-Date) - (Get-Item $Lock).LastWriteTime).TotalMinutes
    if ($ageMin -lt 120) {
        Log ("En körning pågår redan (lås {0:n0} min gammalt). Avslutar." -f $ageMin)
        return
    }
    Log 'Hittade gammalt lås - tar bort det.'
    Remove-Item -Force $Lock -ErrorAction SilentlyContinue
}
Set-Content -Path $Lock -Value "$Today $Lage" -Encoding ascii

Get-ChildItem -Path $LogDir -Filter '.forsok-*' -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } |
    Remove-Item -Force -ErrorAction SilentlyContinue

try {
    $script:Claude = Find-Claude
    Sync-Main

    if ($Lage -eq 'svar') {
        Kor-Svar
    }
    else {
        # 'idag' och 'imorgon' gör samma sak (två namn för att de gamla
        # uppgifterna utan -Lage ska fungera): först skyddsnätet för dagens
        # artikel, sedan morgondagens artikel för granskning.
        if (HasArticle $Today) { Log 'Dagens nyhet finns (förberedd i går).' }
        elseif (-not (Tak "idag-$Today" 3)) { Log 'Redan tre försök för dagens nyhet utan resultat - hoppar över den.' }
        else {
            Log 'Ingen förberedd artikel för idag. Skyddsnätet skriver och publicerar direkt.'
            Kor-Skriv $Today $false
        }

        if ($script:InloggningSaknas) { Log 'Hoppar över morgondagens nyhet: Claude kommer inte in.' }
        elseif (HasArticle $Tomorrow) { Log "Morgondagens nyhet ($Tomorrow) finns redan." }
        elseif (-not (Tak "imorgon-$Tomorrow" 3)) { Log 'Redan tre försök för morgondagens nyhet - avstår.' }
        else { Kor-Skriv $Tomorrow $true }
    }
}
catch {
    Log ("FEL: {0}" -f $_.Exception.Message)
}
finally {
    Remove-Item -Force $Lock -ErrorAction SilentlyContinue
    Log '=== Nyhetsjobb: slut ==='
    Spara-LoggPaGren
}
