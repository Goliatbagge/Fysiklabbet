# Klipper ihop filmen "Tung boll mot lätt boll" scen för scen efter rösten.
#   python -I montera.py <filmmapp> <klippmapp> <röstmapp> <apollo.mp4> <utfil>
import json, os, shutil, subprocess, sys
DIR, KLIPP, ROST, APOLLO, UTFIL = sys.argv[1:6]
L = lambda *p: os.path.join(DIR, 'lager', *p)
FPS = 30

rader = open(os.path.join(ROST, 'tidslinje.txt'), encoding='utf-8').read().strip().split('\n')[1:]
tl = {int(r.split()[0]): (float(r.split()[1]), float(r.split()[2])) for r in rader}
SLUT = tl[15][1]
cut = {1: 0.0}
for n in range(2, 15):
    cut[n] = round(tl[n][0] - 0.1, 3)
cut[15] = round(tl[14][1] + 0.15, 3)
slot = {n: round((cut[n + 1] if n < 15 else SLUT) - cut[n], 3) for n in range(1, 16)}

ai = {n: f's{n:02d}' for n in (1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15)}
filer = os.listdir(KLIPP)
def klippfil(prefix):
    m = [f for f in filer if f.startswith(prefix)]
    assert len(m) == 1, (prefix, m)
    return os.path.join(KLIPP, m[0])
def langd(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).decode())

# Textlager per scen: (fil, start, slut) i scenens egen tid
lager = {n: [] for n in range(1, 16)}
lager[1].append(('hook', 0.2, None))
lager[4].append(('aristoteles', 0.3, None))
lager[6].append(('galileo', 0.3, None))
lager[10] += [('formel1', 0.5, 1.9), ('formel2', 1.9, None)]
lager[11] += [('v1', 0.9, None), ('v2', 1.9, None), ('v3', 2.9, None)]
lager[13].append(('simrubrik', 0.0, None))
lager[14].append(('nasa', 0.0, None))
lager[15].append(('slut', 0.4, None))
for u in json.load(open(os.path.join(DIR, 'undertexter.json'), encoding='utf-8')):
    for n in range(1, 16):
        a, b = max(u['start'], cut[n]), min(u['slut'], cut[n] + slot[n])
        if b - a > 0.05:
            lager[n].append((u['id'], round(a - cut[n], 3), round(b - cut[n], 3)))

TMP = os.path.join(DIR, 'scener'); os.makedirs(TMP, exist_ok=True)
# Scen 13: luftfallet (62 rutor) följt av vakuumfallet
s13 = os.path.join(DIR, 's13'); shutil.rmtree(s13, ignore_errors=True); os.makedirs(s13)
SIM = os.path.join(os.path.dirname(DIR), 'sim13')
n13 = round(slot[13] * FPS); luft = 62
seq = [f'luft-{i:04d}.png' for i in range(luft)] + [f'vak-{i:04d}.png' for i in range(min(150, n13 - luft))]
for i, f in enumerate(seq):
    shutil.copy(os.path.join(SIM, f), os.path.join(s13, f'f{i:04d}.png'))

delar = []
for n in range(1, 16):
    d = slot[n]
    args = ['ffmpeg', '-y', '-v', 'error']
    if n == 15:
        # Nya Nils står i helfigur: krymp klippet och lägg det överst, så att slutskylten får fri yta
        src = klippfil(ai[n]); c = langd(src); f = min(max(d / c, 0.77), 1.35)
        args += ['-loop', '1', '-framerate', str(FPS), '-t', str(d), '-i', L('papper.png'), '-i', src]
        bas = (f'[1:v]setpts={f:.4f}*PTS,fps={FPS},scale=1080:1920,tpad=stop_mode=clone:stop_duration=2,crop=1080:1760:0:160,pad=1080:1920:0:0[k];'
               f"[0:v]crop=1080:780:0:1140,format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='min(255,Y*255/160)'[m];"
               f'[k][m]overlay=0:1140,trim=duration={d},setpts=PTS-STARTPTS[v0]')
        nin = 2
    elif n in ai:
        src = klippfil(ai[n]); c = langd(src); f = d / c
        f = min(max(f, 0.77), 1.35)   # längre än så: sista bildrutan står kvar
        args += ['-i', src]
        bas = f'[0:v]setpts={f:.4f}*PTS,fps={FPS},scale=1080:1920,tpad=stop_mode=clone:stop_duration=2,trim=duration={d},setpts=PTS-STARTPTS[v0]'
        nin = 1
    elif n == 3:
        args += ['-framerate', str(FPS), '-i', os.path.join(DIR, 's3', 'f%04d.png')]
        bas = f'[0:v]fps={FPS},tpad=stop_mode=clone:stop_duration=2,trim=duration={d},setpts=PTS-STARTPTS[v0]'
        nin = 1
    elif n == 13:
        args += ['-loop', '1', '-framerate', str(FPS), '-t', str(d), '-i', L('papper.png'),
                 '-framerate', str(FPS), '-i', os.path.join(s13, 'f%04d.png')]
        bas = (f'[1:v]scale=900:-1,pad=iw+36:ih+36:18:18:white,tpad=stop_mode=clone:stop_duration=2[sim];'
               f'[0:v][sim]overlay=72:225,trim=duration={d},setpts=PTS-STARTPTS[v0]')
        nin = 2
    elif n == 14:
        args += ['-loop', '1', '-framerate', str(FPS), '-t', str(d), '-i', L('papper.png'),
                 '-ss', '36.0', '-t', str(d), '-i', APOLLO]
        bas = (f'[1:v]fps={FPS},scale=1000:750,pad=1036:786:18:18:white,tpad=stop_mode=clone:stop_duration=2[ap];'
               f'[0:v][ap]overlay=22:340,trim=duration={d},setpts=PTS-STARTPTS[v0]')
        nin = 2
    filt, prev = [bas], 'v0'
    for i, (namn, a, b) in enumerate(lager[n]):
        args += ['-loop', '1', '-framerate', str(FPS), '-t', str(d), '-i', L(namn + '.png')]
        k = nin + i
        b = d if b is None else b
        filt.append(f'[{k}:v]format=rgba,fade=t=in:st={a}:d=0.2:alpha=1[o{i}]')
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
