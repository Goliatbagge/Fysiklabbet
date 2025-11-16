@echo off
echo Starting Fysiklabbet server...
echo.
echo Oppna din webblasare och ga till: http://localhost:8000
echo.
echo Tryck Ctrl+C for att stoppa servern.
echo.
python -m http.server 8000
