# Kontrollerar att undertexter och andra textlager inte skymmer något i en
# Labbfolket-film. Körs efter rendera.js och före montera.py:
#
#   python -I .claude/video/verktyg/skymt.py <filmmapp> [röstmapp]
#
# För varje textlager (undertexter, krokrubriken, slutskylten) tas bilden
# fram som ligger UNDER lagret, i början, mitten och slutet av den tid
# lagret syns. Klippen tidsförskjuts på samma sätt som i montera.py. Skriptet
# mäter hur mycket teckning (streck) det finns under rutan, jämfört med tomt
# rutat papper, och flaggar rutor som täcker mer än bakgrund.
#
# Utdata i <filmmapp>/arbete/skymt/:
#   rapport.txt     ett lager per rad, mest skymt först, FLAGGAD eller ok
#   oversikt.jpg    alla flaggade lager: bilden under, rutan inritad i rött
#                   och utsnittet under rutan förstorat bredvid
#
# Verktyget vet inte vad som är viktigt i scenen. Titta på oversikt.jpg och
# avgör för varje flaggad ruta om den täcker ett nyckelobjekt (det repliken
# talar om eller det eleven ska titta på). Gör den det: flytta undertexten
# ("tt_lage": "uppe" i manus.json), flytta klippet med slutklipp.py eller
# gör om klippet. Se "Inget viktigt får skymmas" i produktion.md.
import glob, json, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw

FILM = os.path.abspath(sys.argv[1])
ROST = sys.argv[2] if len(sys.argv) > 2 else sorted(glob.glob(os.path.join(FILM, 'rost-*')))[0]
DIR = os.path.join(FILM, 'arbete')
KLIPP = os.path.join(FILM, 'klipp')
UT = os.path.join(DIR, 'skymt'); os.makedirs(UT, exist_ok=True)
FPS = 30
GRANS = 2.2        # flagga när strecktätheten under rutan är mer än så här många gånger papperets

# Samma tidslinje som montera.py
rader = open(os.path.join(ROST, 'tidslinje.txt'), encoding='utf-8').read().strip().split('\n')[1:]
tl = {int(r.split()[0]): (float(r.split()[1]), float(r.split()[2])) for r in rader}
S = max(tl); SLUT = tl[S][1]
cut = {1: 0.0}
for n in range(2, S):
    cut[n] = round(tl[n][0] - 0.1, 3)
cut[S] = round(tl[S - 1][1] + 0.15, 3)
slot = {n: round((cut[n + 1] if n < S else SLUT) - cut[n], 3) for n in range(1, S + 1)}

def langd(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).decode())
ai = {int(os.path.basename(f)[4:6]): f for f in sorted(glob.glob(os.path.join(KLIPP, 'scen*.mp4')))}

def underlag(n, t):
    """Bilden i scen n vid scenens egen tid t, utan textlager (1080 x 1920)."""
    mapp = os.path.join(DIR, f's{n}')
    if os.path.isdir(mapp):
        bilder = sorted(glob.glob(os.path.join(mapp, 'f*.png')))
        return Image.open(bilder[min(len(bilder) - 1, int(t * FPS))]).convert('RGB').resize((1080, 1920))
    if n in ai:
        src = ai[n]; L = langd(src)
        f = min(max(slot[n] / L, 0.77), 1.35)
        tk = min(t / f, L - 0.05)
        ut = os.path.join(UT, '_ram.png')
        subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-ss', f'{tk:.3f}', '-i', src, '-frames:v', '1',
                               '-vf', 'scale=1080:1920', ut])
        return Image.open(ut).convert('RGB')
    return Image.open(os.path.join(DIR, 'lager', 'papper.png')).convert('RGB').resize((1080, 1920))

def streck(bild, box):
    """Andel pixlar med tydlig kant inom box (x0, y0, x1, y1)."""
    g = np.asarray(bild.convert('L').crop(box), dtype=np.float32)
    gx = np.abs(np.diff(g, axis=1))[:-1, :]; gy = np.abs(np.diff(g, axis=0))[:, :-1]
    return float(((gx + gy) > 38).mean())

def ruta(png):
    a = np.asarray(Image.open(png).convert('RGBA'))[:, :, 3]
    ys, xs = np.nonzero(a > 40)
    return (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1) if len(xs) else None

# Textlagren med sina tider i filmens tid
lager = [(u['id'], u['start'], u['slut'], u['text']) for u in json.load(open(os.path.join(DIR, 'undertexter.json'), encoding='utf-8'))]
if os.path.exists(os.path.join(DIR, 'lager', 'hook.png')):
    lager.append(('hook', 0.2, cut[2], 'krokrubriken'))
if os.path.exists(os.path.join(DIR, 'lager', 'slut.png')):
    lager.append(('slut', cut[S] + 0.4, SLUT, 'slutskylten'))

def scen_vid(t):
    return max(n for n in cut if cut[n] <= t + 1e-6)

papper = Image.open(os.path.join(DIR, 'lager', 'papper.png')).convert('RGB')
res = []
for lid, a, b, txt in lager:
    box = ruta(os.path.join(DIR, 'lager', lid + '.png'))
    if not box:
        continue
    bas = streck(papper, box) + 1e-4
    bast = None
    for t in (a + 0.15, (a + b) / 2, b - 0.15):
        n = scen_vid(t); bild = underlag(n, t - cut[n])
        v = streck(bild, box) / bas
        if not bast or v > bast[0]:
            bast = (v, n, t, bild)
    v, n, t, bild = bast
    flagg = v > GRANS
    res.append((v, lid, n, t, txt, box, flagg, bild))

res.sort(key=lambda r: -r[0])
with open(os.path.join(UT, 'rapport.txt'), 'w', encoding='utf-8') as f:
    for v, lid, n, t, txt, box, flagg, _ in res:
        f.write(f"{'FLAGGAD' if flagg else 'ok     '}  {v:5.1f}  scen {n:2d}  {t:6.2f} s  {lid:8s}  {txt}\n")

flaggade = [r for r in res if r[6]]
if flaggade:
    B, H = 360, 640            # en film­ruta i halv tredjedels storlek, plus utsnittet förstorat
    rad_h = H + 20
    ark = Image.new('RGB', (B * 2 + 60, rad_h * len(flaggade) + 20), (255, 255, 255))
    d = ImageDraw.Draw(ark)
    for i, (v, lid, n, t, txt, box, _, bild) in enumerate(flaggade):
        y = 10 + i * rad_h
        liten = bild.copy(); dl = ImageDraw.Draw(liten)
        dl.rectangle(box, outline=(200, 30, 40), width=8)
        ark.paste(liten.resize((B, H)), (10, y))
        ut = bild.crop((0, max(0, box[1] - 120), 1080, min(1920, box[3] + 120)))
        k = (B + 20) / 1080
        ut = ut.resize((B + 20, int(ut.height * k)))
        ark.paste(ut, (B + 30, y + 60))
        d.text((B + 30, y + 10), f'{lid}  scen {n}  {t:.2f} s  tathet {v:.1f}', fill=(200, 30, 40))
        d.text((B + 30, y + 30), txt[:60], fill=(20, 20, 20))
    ark.save(os.path.join(UT, 'oversikt.jpg'), quality=85)
if os.path.exists(os.path.join(UT, '_ram.png')):
    os.remove(os.path.join(UT, '_ram.png'))
print(f'{len(res)} textlager granskade, {len(flaggade)} flaggade. Se {UT}')
for v, lid, n, t, txt, box, flagg, _ in res[:12]:
    print(f"{'FLAGGAD' if flagg else 'ok     '}  {v:5.1f}  scen {n:2d}  {lid:8s}  {txt}")
