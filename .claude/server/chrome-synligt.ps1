# Dot-sourcas av fb-daglig/ig-daglig/fb-lansering/ig-lansering.ps1 INNAN
# Claude-sessionen startar. Återställer minimerade Chrome-fönster utan att ta
# fokus. I ett minimerat fönster får flikarna ytan 0x0, och varje skärmdump
# slutar i timeout (2026-11-25, issue #27). Returnerar antalet återställda.

function AterstallChromeFonster {
    try {
        if (-not ('FlFonster' -as [type])) {
            Add-Type -TypeDefinition @"
using System; using System.Text; using System.Collections.Generic; using System.Runtime.InteropServices;
public static class FlFonster {
    delegate bool Cb(IntPtr h, IntPtr p);
    [DllImport("user32.dll")] static extern bool EnumWindows(Cb cb, IntPtr p);
    [DllImport("user32.dll")] static extern bool IsWindowVisible(IntPtr h);
    [DllImport("user32.dll")] static extern bool IsIconic(IntPtr h);
    [DllImport("user32.dll")] static extern bool ShowWindow(IntPtr h, int n);
    [DllImport("user32.dll")] static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
    [DllImport("user32.dll", CharSet = CharSet.Unicode)] static extern int GetClassName(IntPtr h, StringBuilder s, int n);
    public static int Aterstall(int[] pids) {
        var set = new HashSet<int>(pids); int antal = 0;
        EnumWindows((h, p) => {
            uint pid; GetWindowThreadProcessId(h, out pid);
            if (set.Contains((int)pid) && IsWindowVisible(h) && IsIconic(h)) {
                var s = new StringBuilder(64); GetClassName(h, s, 64);
                if (s.ToString() == "Chrome_WidgetWin_1") { ShowWindow(h, 4); antal++; }  // SW_SHOWNOACTIVATE
            }
            return true;
        }, IntPtr.Zero);
        return antal;
    }
}
"@
        }
        $pids = @(Get-Process chrome -ErrorAction SilentlyContinue | ForEach-Object { $_.Id })
        if ($pids.Count -eq 0) { return 0 }
        $n = [FlFonster]::Aterstall([int[]]$pids)
        if ($n -gt 0) { Start-Sleep -Seconds 3 }
        return $n
    } catch { return 0 }   # får aldrig stoppa själva jobbet
}
