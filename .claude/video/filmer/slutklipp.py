# Förbereder slutscenens AI-klipp när figuren står i helfigur: klippet flyttas
# upp och tonas över i bakgrundspapperet nedtill, så att slutskylten får fri yta.
#   python -I slutklipp.py <klipp.mp4> <papper.png> <ut.mp4> <tonstart_y> [lyft_px]
# Negativt lyft sänker i stället klippet och tonar in papperet ovanifrån, så att
# en rubrik överst får fri yta (tonstart_y är då där tonen slutar).
import subprocess, sys
src, papper, ut, y0 = sys.argv[1:5]
y0 = int(y0); lyft = int(sys.argv[5]) if len(sys.argv) > 5 else 160
if lyft < 0:
    ned = -lyft
    assert y0 - 160 >= ned, 'tonen måste börja nedanför klippets överkant (tonstart_y - 160 >= sänkning)'
    filt = (f'[0:v]scale=1080:1920,crop=1080:{1920 - ned}:0:0,pad=1080:1920:0:{ned}[k];'
            f"[1:v]crop=1080:{y0}:0:0,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='min(255,({y0}-Y)*255/160)'[m];"
            f'[k][m]overlay=0:0:shortest=1[v]')
else:
    filt = (f'[0:v]scale=1080:1920,crop=1080:{1920 - lyft}:0:{lyft},pad=1080:1920:0:0[k];'
            f"[1:v]crop=1080:{1920 - y0}:0:{y0},format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='min(255,Y*255/160)'[m];"
            f'[k][m]overlay=0:{y0}:shortest=1[v]')
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', src, '-loop', '1', '-i', papper, '-filter_complex', filt,
                       '-map', '[v]', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', ut])
