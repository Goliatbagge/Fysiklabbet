# Genererar berättarrösten scen för scen ur manus.json och lägger repliken
# efter varandra med korta pauser, så att klippen kan följa rösten.
#   python -I rost_film.py <manus.json> <utmapp> <röst-id eller "Sam"> [--ny]
# Repliker som redan finns i utmappen återanvänds, utom med --ny.
# Skriver scenNN.mp3, langder.json, helspar.mp3 och tidslinje.txt.
import json, os, subprocess, sys, requests

MANUS, UT, ROST = sys.argv[1:4]
KEY = os.environ.get('ELEVENLABS_API_KEY') or sys.exit('ELEVENLABS_API_KEY saknas')
API = 'https://api.elevenlabs.io'
H = {'xi-api-key': KEY}
PAUS, EFTER_FRAGA, FORE, SLUTSCEN = 0.25, 1.2, 0.3, 4.0

if ROST.lower() == 'sam':
    r = requests.get(f'{API}/v2/voices', headers=H, params={'page_size': 100, 'search': 'Sam'})
    r.raise_for_status()
    v = sorted([v for v in r.json()['voices'] if v['name'].strip().lower() == 'sam'], key=lambda v: v.get('category') == 'premade')
    ROST = v[0]['voice_id']
print('Röst-id:', ROST)

seg = json.load(open(MANUS, encoding='utf-8'))['segment']
os.makedirs(UT, exist_ok=True)
langd = {}
for i, s in enumerate(seg):
    fil = os.path.join(UT, f"scen{s['scen']:02d}.mp3")
    if os.path.exists(fil) and '--ny' not in sys.argv:   # redan genererad: återanvänd
        d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                           '-of', 'csv=p=0', fil]).decode())
        langd[s['scen']] = round(d, 2); print(f"scen {s['scen']:2d}  {d:4.2f} s (fanns)"); continue
    body = {'text': s['tal'], 'model_id': 'eleven_v4', 'language_code': 'sv',
            'previous_text': seg[i - 1]['tal'] if i else None,
            'next_text': seg[i + 1]['tal'] if i + 1 < len(seg) else None,
            'voice_settings': {'stability': 0.3, 'similarity_boost': 0.75, 'style': 0.4,
                               'use_speaker_boost': True, 'speed': 1.0}}
    r = requests.post(f'{API}/v1/text-to-speech/{ROST}', headers=H,
                      params={'output_format': 'mp3_44100_192'}, json=body)
    if r.status_code != 200:
        sys.exit(f"scen {s['scen']}: {r.status_code} {r.text[:300]}")
    open(fil, 'wb').write(r.content)
    d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                       '-of', 'csv=p=0', fil]).decode())
    langd[s['scen']] = round(d, 2)
    print(f"scen {s['scen']:2d}  {d:4.2f} s")
json.dump(langd, open(os.path.join(UT, 'langder.json'), 'w'), indent=1)

t, tider, args, filt = FORE, [], ['ffmpeg', '-y', '-v', 'error'], []
for i, s in enumerate(seg):
    n = s['scen']
    tider.append((n, round(t, 2), round(t + langd[n], 2)))
    args += ['-i', os.path.join(UT, f'scen{n:02d}.mp3')]
    ms = int(t * 1000)
    filt.append(f'[{i}:a]adelay={ms}|{ms}[a{i}]')
    t += langd[n] + (EFTER_FRAGA if s['tal'].strip().endswith('Vad tror du?') or (s['tal'].strip().endswith('?') and len(s['tal']) < 20) else PAUS)
slut_tal = t - PAUS
total = round(slut_tal + SLUTSCEN, 2)
mix = ''.join(f'[a{i}]' for i in range(len(seg)))
filt.append(f'{mix}amix=inputs={len(seg)}:normalize=0,apad,atrim=0:{total}[ut]')
subprocess.check_call(args + ['-filter_complex', ';'.join(filt), '-map', '[ut]', '-b:a', '192k',
                              os.path.join(UT, 'helspar.mp3')])
rad = ['scen  start   slut  (s)'] + [f'{n:4d}  {a:5.2f}  {b:5.2f}' for n, a, b in tider]
rad.append(f'{seg[-1]["scen"] + 1:4d}  {round(slut_tal, 2):5.2f}  {total:5.2f}  (utan tal)')
open(os.path.join(UT, 'tidslinje.txt'), 'w', encoding='utf-8').write('\n'.join(rad) + '\n')
print('\n'.join(rad))
