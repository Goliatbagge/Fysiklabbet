' kor-dolt.vbs - startar ett kommando HELT utan fonster.
'
' Anvands av Schemalaggarens uppgifter. powershell.exe -WindowStyle Hidden
' racker inte: konsolfonstret skapas innan PowerShell hinner lasa flaggan,
' sa en svart ruta blinkar till (och tar fokus) vid varje korning. wscript
' har inget konsolfonster alls, och Run(..., 0, ...) startar barnet dolt.
'
' Anrop:  wscript.exe //B //Nologo kor-dolt.vbs <program> [argument ...]
'   t.ex. wscript.exe //B //Nologo kor-dolt.vbs powershell.exe -NoProfile -File "C:\sokvag\skript.ps1" -Port 8000
'
' Argument med mellanslag citeras igen (Windows tar bort citattecknen vid
' anropet). Vantar pa barnet (True) sa att uppgiftens tidsgrans och
' "starta inte ny instans" fortsatter galla, och returnerar dess exitkod.
' (VBScript ar "deprecated" i Windows 11 men medfoljer fortfarande; skulle
'  wscript.exe forsvinna: byt till "Kor oavsett om anvandaren ar inloggad"
'  for uppgifter som inte behover skrivbordet.)
Set sh = CreateObject("WScript.Shell")
Set args = WScript.Arguments
cmd = ""
For i = 0 To args.Count - 1
    a = args(i)
    If InStr(a, " ") > 0 Then a = """" & a & """"
    cmd = cmd & a & " "
Next
WScript.Quit sh.Run(Trim(cmd), 0, True)
