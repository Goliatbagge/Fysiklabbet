# Skriver undertexter.srt för "Repet runt jorden" ur arbete/undertexter.json
# (samma tider som de inbrända undertexterna): högst 32 tecken per rad, två rader.
#   python -I bygg/srt.py
import json, os
FILM = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ut = json.load(open(os.path.join(FILM, 'arbete', 'undertexter.json'), encoding='utf-8'))

def tid(s):
    ms = round(s * 1000)
    return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'

def rader(t):
    if len(t) <= 32: return [t]
    ord_ = t.split(' '); bast = None
    for i in range(1, len(ord_)):
        a, b = ' '.join(ord_[:i]), ' '.join(ord_[i:])
        if len(a) <= 32 and len(b) <= 32:
            d = abs(len(a) - len(b))
            if bast is None or d < bast[0]: bast = (d, [a, b])
    assert bast, t
    return bast[1]

block = [f"{i}\n{tid(u['start'])} --> {tid(u['slut'])}\n" + '\n'.join(rader(u['text'])) + '\n' for i, u in enumerate(ut, 1)]
open(os.path.join(FILM, 'undertexter.srt'), 'w', encoding='utf-8').write('\n'.join(block))
print(len(block), 'undertexter')
