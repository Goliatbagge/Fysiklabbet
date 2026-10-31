# Klipper ihop filmen "Riskornen på schackbrädet" scen för scen efter rösten.
#   python -I montera.py <arbetsmapp> <klippmapp> <röstmapp> <utfil>
import json, os, subprocess, sys
EGNA = (3, 6, 7, 9, 10, 11, 12, 14, 16)   # egna animationer, resten AI-klipp
DIR, KLIPP, ROST, UTFIL = sys.argv[1:5]
L = lambda *p: os.path.join(DIR, 'lager', *p)
FPS = 30

rader = open(os.path.join(ROST, 'tidslinje.txt'), encoding='utf-8').read().strip().split('\n')[1:]
tl = {int(r.split()[0]): (float(r.split()[1]), float(r.split()[2])) for r in rader}
S = max(tl)                     # sista scenen (slutskylten, utan tal)
SLUT = tl[S][1]
cut = {1: 0.0}
for n in range(2, S):
    cut[n] = round(tl[n][0] - 0.1, 3)
cut[S] = round(tl[S - 1][1] + 0.15, 3)
slot = {n: round((cut[n + 1] if n < S else SLUT) - cut[n], 3) for n in range(1, S + 1)}

ai = {}   # scen -> filnamnsprefix, fylls i när klippen finns (AI_KLIPP i klippmappen)
import glob
for f_ in sorted(glob.glob(os.path.join(KLIPP, 'scen*.mp4'))):
    ai[int(os.path.basename(f_)[4:6])] = os.path.basename(f_)[:6]
# Egna scener: bildrutemapp och startruta
egna = {n: (f"s{n}", 0) for n in EGNA}
beskar = {}

filer = os.listdir(KLIPP)
def klippfil(prefix):
    m = [f for f in filer if f.startswith(prefix)]
    assert len(m) == 1, (prefix, m)
    return os.path.join(KLIPP, m[0])
def langd(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).decode())

# Textlager per scen: (fil, start, slut) i scenens egen tid
lager = {n: [] for n in range(1, S + 1)}
lager[1].append(('hook', 0.2, None))
lager[S].append(('slut', 0.4, None))
for u in json.load(open(os.path.join(DIR, 'undertexter.json'), encoding='utf-8')):
    for n in range(1, S + 1):
        a, b = max(u['start'], cut[n]), min(u['slut'], cut[n] + slot[n])
        if b - a > 0.05:
            lager[n].append((u['id'], round(a - cut[n], 3), round(b - cut[n], 3)))

TMP = os.path.join(DIR, 'scener'); os.makedirs(TMP, exist_ok=True)
delar = []
for n in range(1, S + 1):
    d = slot[n]
    args = ['ffmpeg', '-y', '-v', 'error']
    if n in ai:
        src = klippfil(ai[n]); f = d / langd(src)
        f = min(max(f, 0.77), 1.35)   # längre än så: sista bildrutan står kvar
        extra = (',' + beskar[n]) if n in beskar else ''
        args += ['-i', src]
        bas = f'[0:v]setpts={f:.4f}*PTS,fps={FPS},scale=1080:1920{extra},tpad=stop_mode=clone:stop_duration=3,trim=duration={d},setpts=PTS-STARTPTS[v0]'
    elif n not in egna:
        # AI-klippet saknas än: tomt papper, så att ett provklipp går att se
        args += ['-loop', '1', '-framerate', str(FPS), '-t', str(d), '-i', L('papper.png')]
        bas = f'[0:v]fps={FPS},trim=duration={d},setpts=PTS-STARTPTS[v0]'
    else:
        mapp, start = egna[n]
        args += ['-framerate', str(FPS), '-start_number', str(start), '-i', os.path.join(DIR, mapp, 'f%04d.png')]
        bas = f'[0:v]fps={FPS},tpad=stop_mode=clone:stop_duration=3,trim=duration={d},setpts=PTS-STARTPTS[v0]'
    filt, prev = [bas], 'v0'
    for i, (namn, a, b) in enumerate(lager[n]):
        args += ['-loop', '1', '-framerate', str(FPS), '-t', str(d), '-i', L(namn + '.png')]
        b = d if b is None else b
        filt.append(f'[{i + 1}:v]format=rgba,fade=t=in:st={a}:d=0.2:alpha=1[o{i}]')
        filt.append(f"[{prev}][o{i}]overlay=0:0:enable='between(t,{a},{b})'[w{i}]")
        prev = f'w{i}'
    ut = os.path.join(TMP, f'scen{n:02d}.mp4')
    args += ['-filter_complex', ';'.join(filt), '-map', f'[{prev}]', '-r', str(FPS), '-t', str(d),
             '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', ut]
    subprocess.check_call(args)
    delar.append(ut)
    print(f'scen {n:2d}  {cut[n]:6.2f}  {d:5.2f} s  {len(lager[n])} lager')

lista = os.path.join(TMP, 'lista.txt')
open(lista, 'w').write(''.join(f"file '{p.replace(os.sep, '/')}'\n" for p in delar))
bild = os.path.join(TMP, 'bild.mp4')
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lista, '-c', 'copy', bild])
subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', bild, '-i', os.path.join(ROST, 'helspar.mp3'),
                       '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
                       '-t', str(SLUT), '-movflags', '+faststart', UTFIL])
print('Film:', UTFIL, f'{langd(UTFIL):.2f} s')
