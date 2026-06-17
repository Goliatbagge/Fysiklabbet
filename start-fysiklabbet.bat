@echo off
REM Startar Fysiklabbets utvecklingsserver (cache avstangd) och oppnar sidan i Chrome.
REM Servern kors i ett eget, minimerat fonster. Stang det fonstret for att stoppa servern.

cd /d "C:\claude\Fysiklabbet"

REM Starta no-cache-servern i eget minimerat fonster (om den inte redan kor).
start "Fysiklabbet-server" /min python ".claude\dev-server.py" 8000

REM Vanta tva sekunder sa servern hinner upp innan Chrome ansluter.
timeout /t 2 /nobreak >nul

REM Oppna startsidan i Chrome.
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:8000/index.html"
