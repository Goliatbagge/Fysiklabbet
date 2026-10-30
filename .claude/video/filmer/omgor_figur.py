# Byter den gamla figurstilen mot den nya i en äldre films scenprompter.
# Figurblocket och husstilen hämtas ordagrant ur masterpromptens låsta block;
# scenernas egen handling lämnas orörd (utom pronomen "its" -> his/her).
#   python -I omgor_figur.py <filmmapp> nils|malin
# Skriver <film>/scenprompter-ny.txt och .json; den gamla filen behålls.
import json, os, re, sys

FILM, FIGUR = sys.argv[1], sys.argv[2]
HAR = os.path.dirname(os.path.abspath(__file__))
mp = open(os.path.join(HAR, '..', 'masterprompt-labbfolket.md'), encoding='utf-8').read()
platta = lambda s: re.sub(r'\s+', ' ', s).strip()
husstil = platta(re.search(r'### HUSSTIL[^\n]*\n\n(.*?)\n\n###', mp, re.S).group(1))
namn = 'Nils' if FIGUR == 'nils' else 'Malins'
block = platta(re.search(namn + r' LÅSTA FIGURBLOCK[^\n]*\n(?:[^\n]*\n)?\n"(.*?)"\n', mp, re.S).group(1))
pron = 'his' if FIGUR == 'nils' else 'her'

t = open(os.path.join(FILM, 'scenprompter.txt'), encoding='utf-8').read()
gammal_fig = re.compile(r'The main character is a friendly hand-drawn .*?in every clip\.', re.S)
gammal_stil = re.compile(r'Hand-drawn 2D animation that looks drawn .*?other than the single red accent\.', re.S)
ut, js = [], []
for nr, p in re.findall(r'^Scene (\d+)\n\n(.*?)\n', t, re.M | re.S):
    assert gammal_stil.search(p), nr
    p = gammal_fig.sub(lambda m: block, p, 1)
    # Bifigurer: samma nya slapstickstil i stället för den gamla runda figuren
    p = re.sub(r'with the same round head, dot eyes and simple features as the main character',
               'in the same rubbery slapstick cartoon style with squash and stretch and exaggerated expressions as the main character, an adult and never childlike,', p)
    p = p.replace('blue ballpoint ink style in the same rubbery', 'blue ballpoint ink and in the same rubbery')
    p = p.replace('in the same blue ballpoint style with the same simple round head, dot eyes and curved eyebrows, but',
                  'in the same blue ballpoint ink and in the same rubbery slapstick cartoon style with squash and stretch and exaggerated expressions as the main character, an adult and never childlike, but')
    assert 'round head' not in p and 'dot eyes' not in p, nr
    p = gammal_stil.sub(lambda m: husstil, p, 1)
    p = re.sub(r'\bits (eyebrows|head|hand|hands|arm|arms|eyes|face|finger|fingers|shoulders|shoulder|belly|feet|forehead|knees|lab coat|mouth)', pron + r' \1', p)
    p = re.sub(r'\bit(s)? (raises|looks|turns|holds|lifts|points)', lambda m: ('he ' if FIGUR == 'nils' else 'she ') + m.group(2), p)
    js.append({'scen': int(nr), 'prompt': p})
nr = [j['scen'] for j in js]
inst = t.split('\n\nScene ')[0]
ut = [inst, ''] + sum([[f"Scene {j['scen']}", '', j['prompt'], ''] for j in js], [])
open(os.path.join(FILM, 'scenprompter-ny.txt'), 'w', encoding='utf-8').write('\n'.join(ut))
json.dump(js, open(os.path.join(FILM, 'scenprompter-ny.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(js), 'scener:', nr)
