# Kör den månatliga statistikgenomgången av sociala medier: startar en
# headless Claude Code-session som följer .claude/commands/some-rapport.md
# (läser Business Suite/Instagram via Chrome, skriver rapporter i
# .claude/some/rapporter/ och uppdaterar kanalagenternas lägesavsnitt).
#
# Körs av den schemalagda uppgiften "Fysiklabbet SoMe-rapport"
# (första dagen i månaden kl 10:03, endast när användaren är inloggad —
# Chrome med Claude-utökningen måste finnas i den interaktiva sessionen).
# Registrering: se installera-some-rapport.ps1 i samma mapp.
#
# Behörigheter: endast Chrome-verktygen, läsning samt skrivning av
# rapporterna, agentfilernas lägesavsnitt och loggraden. Ingen publicering.

$ErrorActionPreference = 'Continue'
$repo   = 'C:\claude\Fysiklabbet'
$logDir = Join-Path $repo '.claude\server\logg'
$logFil = Join-Path $logDir 'some-rapport.log'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Force $logDir | Out-Null }

function Logga($txt) {
    $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    Add-Content -Path $logFil -Value "[$stamp] $txt" -Encoding utf8
}

# Windows-notis i den inloggade sessionen (samma mönster som some-vakt.ps1).
# Utan den syns rapporten ingenstans — den är hela poängen med jobbet.
function VisaNotis($titel, $text) {
    try {
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        $mall = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent(
            [Windows.UI.Notifications.ToastTemplateType]::ToastText02)
        $texter = $mall.GetElementsByTagName('text')
        $texter.Item(0).AppendChild($mall.CreateTextNode($titel)) | Out-Null
        $texter.Item(1).AppendChild($mall.CreateTextNode($text)) | Out-Null
        # PowerShells registrerade AppUserModelID — krävs för att notisen ska visas.
        $appId = '{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\WindowsPowerShell\v1.0\powershell.exe'
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($appId).Show(
            [Windows.UI.Notifications.ToastNotification]::new($mall))
    } catch {
        Logga "Kunde inte visa Windows-notis: $_"
    }
}

Logga '--- some-rapport startar ---'

# Chrome måste vara igång för att Claude-in-Chrome-utökningen ska svara.
if (-not (Get-Process chrome -ErrorAction SilentlyContinue)) {
    Logga 'Chrome kör inte - startar (minimerat).'
    Start-Process 'chrome.exe' -WindowStyle Minimized
    Start-Sleep -Seconds 20
}

$claude = 'C:\Users\sam_s\AppData\Local\Microsoft\WinGet\Packages\Anthropic.ClaudeCode_Microsoft.Winget.Source_8wekyb3d8bbwe\claude.exe'
if (-not (Test-Path $claude)) {
    # Winget-sökvägen kan ändras vid uppdatering - falla tillbaka på PATH.
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    if ($cmd) { $claude = $cmd.Source } else { Logga 'FEL: claude.exe hittas inte.'; exit 1 }
}

$verktyg = @(
    'mcp__claude-in-chrome__*'
    'ToolSearch'
    'Read'
    'Grep'
    'Glob'
    'Write(.claude/some/rapporter/*)'
    'Edit(.claude/some/rapporter/*)'
    'Edit(.claude/agents/facebook-agent.md)'
    'Edit(.claude/agents/instagram-agent.md)'
    'Edit(.claude/facebook/logg.md)'
) -join ','

Set-Location $repo
# --chrome är obligatoriskt: utan flaggan får en headless session aldrig
# Chrome-MCP-verktygen (missarna 2026-08-17/19).
$ut = & $claude --chrome -p '/some-rapport' --allowedTools $verktyg 2>&1 | Out-String
$kod = $LASTEXITCODE
Logga $ut.Trim()

# Sammanfattningen sparas som en läsbar fil och notisen pekar på den —
# annars ligger månadens arbete bara i loggen och ingen ser det.
$manad   = (Get-Date).AddMonths(-1).ToString('yyyy-MM')
$rapDir  = Join-Path $repo '.claude\some\rapporter'
$sammFil = Join-Path $rapDir "$manad-sammanfattning.md"
if (-not (Test-Path $rapDir)) { New-Item -ItemType Directory -Force $rapDir | Out-Null }

$rubrik = "# Sociala medier $manad - sammanfattning`r`n`r`n" +
          "Skriven av det schemalagda jobbet SoMe-rapport $(Get-Date -Format 'yyyy-MM-dd HH:mm').`r`n" +
          "Detaljerna finns i $manad-facebook.md och $manad-instagram.md.`r`n`r`n---`r`n`r`n"
[IO.File]::WriteAllText($sammFil, $rubrik + $ut.Trim(), [Text.UTF8Encoding]::new($true))

if ($kod -eq 0) {
    VisaNotis 'Fysiklabbet: manadsrapport for sociala medier' `
        "Rapporten for $manad ar klar. Oppna .claude\some\rapporter\ - sammanfattningen ligger i $manad-sammanfattning.md."
} else {
    VisaNotis 'Fysiklabbet: manadsrapporten MISSLYCKADES' `
        "SoMe-rapporten for $manad gick inte igenom (exit $kod). Se .claude\server\logg\some-rapport.log."
}

Logga "Sammanfattning skriven till $sammFil"
Logga "--- some-rapport klar (exit $kod) ---"
exit $kod
