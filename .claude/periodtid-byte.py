# Engångsbyte 2026-11-14: fysikens T heter periodtid, inte period (användarkrav).
#   python .claude/periodtid-byte.py            byter i arbetskatalogen och listar ändringarna
#   python .claude/periodtid-byte.py --head F   skriver ut HEAD-versionen av F med bytet (för en ren commit)
# Matematikens period (perioden för sin x) behålls, liksom sökord (kw, keywords, forms),
# kod som heter period, publicerade nyheter, ordlistan och NP:s citerade bedömningstext.
import re, sys, glob, subprocess, io

ORD = re.compile(r'\b([Pp])eriod(en|ens)?\b')
def ord_byte(s):
    return ORD.sub(lambda m: m.group(1) + 'eriodtid' + (m.group(2) or ''), s)

def utanfor_sokord(line):
    """Byter bara före kw:/keywords:/forms: på raden, så att sökordet 'period' finns kvar."""
    m = re.search(r'\b(kw|keywords|forms)\s*:', line)
    return ord_byte(line[:m.start()]) + line[m.start():] if m else ord_byte(line)

KOD = re.compile(r'Math\.|=>|\.period|period[:=(};]|\{period|setPeriod|\(period|, period,|const period|function period')

# Formuleringar som inte blir rätt av ett rakt ordbyte (plural = antal svängningar).
PAR = {
    'data/teori/fy2-2.5.md': [
        ('tio hela perioder och får', 'tio hela svängningar och får'),
        ('tar tid på tio perioder i stället för en', 'tar tid på tio svängningar i stället för en'),
        ('perioder, så att felet per period bara', 'svängningar, så att felet per svängning bara'),
        ('tiden för en hel period:', 'tiden för en hel svängning:'),
    ],
    'data/np/fy2-vt2016.js': [
        ('tiden för många perioder i följd fördelas felet på alla perioderna', 'tiden för många svängningar i följd fördelas felet på alla svängningarna'),
        ("'10 perioder och dela med antalet", "'10 svängningar och dela med antalet"),
    ],
    'data/exittickets.js': [
        ("'Det motsvarar två hela perioder. En period är en svängning fram och tillbaka,",
         "'Det motsvarar två hela svängningar. Periodtiden är tiden för en svängning fram och tillbaka,"),
    ],
    'data/ovningar.js': [('bilda kvoten av perioderna.', 'bilda kvoten av periodtiderna.')],
    'fysik2-resonans-app.html': [
        ('håll drivfrekvensen stilla några perioder', 'håll drivfrekvensen stilla några svängningar'),
        ('eftersom varje period bara tillför', 'eftersom varje svängning bara tillför'),
    ],
    'fysik2-konisk-pendel-app.html': [
        ('vinkeln <em>α</em>, perioden och spännkraften', 'vinkeln <em>α</em>, periodtiden och spännkraften'),
        ('vad händer med vinkeln och perioden?', 'vad händer med vinkeln och periodtiden?'),
    ],
    'handskrift.js': [
        ("[['är perioden ', 0], ['T', 1]]", "[['är periodtiden ', 0], ['T', 1]]"),
        ("      [['Formeln för konisk pendel ger']],\n      [['perioden direkt. Varken massan']],\n      [['eller banradien behövs!']]",
         "      [['Formeln för konisk pendel ger']],\n      [['periodtiden direkt. Varken']],\n      [['massan eller banradien behövs!']]"),
        ("[['perioden ', 0], ['T', 1], [' är det jag söker,', 0]]", "[['periodtiden ', 0], ['T', 1], [' är det jag söker,', 0]]"),
        ("      [['Perioden hänger ihop med vinkel-']],\n      [['hastigheten ', 0], ['ω', 1], ['. Den läser jag av', 0]],\n      [['med samma jämförelse som i a).']]",
         "      [['Periodtiden hänger ihop med']],\n      [['vinkelhastigheten ', 0], ['ω', 1], ['. Den', 0]],\n      [['läser jag av med samma jäm-']],\n      [['förelse som i a).']]"),
        ("[['heten och perioden ', 0], ['T', 1], [':', 0]]", "[['heten och periodtiden ', 0], ['T', 1], [':', 0]]"),
        ("      [['Perioden beror bara på massan']],\n      [['och fjäderkonstanten. Ampli-']],\n      [['tuden 5,0 cm behövs alltså inte']],\n      [['alls!']]",
         "      [['Periodtiden beror bara på']],\n      [['massan och fjäderkonstanten.']],\n      [['Amplituden 5,0 cm behövs']],\n      [['alltså inte alls!']]"),
        ("      [['perioden. Massan ', 0], ['m', 1], [' är det jag', 0]],\n      [['söker, så den får bara sin']],\n      [['beteckning.']]",
         "      [['periodtiden. Massan ', 0], ['m', 1], [' är det', 0]],\n      [['jag söker, så den får bara sin']],\n      [['beteckning.']]"),
        ("      [['Formeln för perioden innehåller']],\n      [['massan. Jag ställer upp den och']],\n      [['löser ut ', 0], ['m', 1]]",
         "      [['Formeln för periodtiden inne-']],\n      [['håller massan. Jag ställer upp']],\n      [['den och löser ut ', 0], ['m', 1]]"),
        ("[['perioden är dubbelt så lång.']]", "[['periodtiden är dubbelt så lång.']]"),
        ("placeString('Halva perioden: 1,00 s',", "placeString('Halva periodtiden: 1,00 s',"),
        ("      [['för tio hela perioder. ', 0], ['g', 1], [' är det', 0]],\n      [['jag söker.']]",
         "      [['för tio hela svängningar. ', 0], ['g', 1], [' är', 0]],\n      [['det jag söker.']]"),
        ("T.lbl('10 perioder: 18,5 s',", "T.lbl('10 svängningar: 18,5 s',"),
        ("      [['period. Jag delar därför tiden']],\n      [['med antalet perioder.']]",
         "      [['svängning. Jag delar därför']],\n      [['tiden med antalet svängningar.']]"),
    ],
}

def fysiksektioner(text):
    """Byter bara i avsnitt vars nyckel börjar med fy (ovningar.js, exittickets.js)."""
    ut, key = [], None
    for line in text.split('\n'):
        m = re.match(r"\s*'?((?:fy|ma)\d[\w.-]*)'?\s*:\s*[\[{]", line)
        if m: key = m.group(1)
        ut.append(utanfor_sokord(line) if (key or '').startswith('fy') else line)
    return '\n'.join(ut)

def per_rad(text, villkor):
    return '\n'.join(utanfor_sokord(l) if villkor(l) else l for l in text.split('\n'))

def katalog(text):
    i = text.index("  'Matematik': {")
    return per_rad(text[:i], lambda l: True) + text[i:]

def byt(path, text):
    nl = '\r\n' if '\r\n' in text else '\n'
    for a, b in PAR.get(path, []):
        a, b = a.replace('\n', nl), b.replace('\n', nl)
        if text.count(a) == 0 and b in text:
            continue   # redan bytt (skriptet får köras flera gånger)
        assert text.count(a) == 1, (path, a[:60], text.count(a))
        text = text.replace(a, b)
    if path in ('data/ovningar.js', 'data/exittickets.js'):
        return fysiksektioner(text)
    if path == 'data/katalog.js':
        return katalog(text)
    if path == 'data/teori/fy2-5.3.md':
        return per_rad(text, lambda l: 'saros' not in l and 'kände till perioden' not in l)
    if path == 'data/np/fy2-vt2016.js':
        return per_rad(text, lambda l: 'godtagbar beskrivning' not in l)
    if path.startswith('data/teori/fy') or path.startswith('data/repetition/fy') or path == 'data/simuleringar.js':
        return per_rad(text, lambda l: True)
    if path in KODFILER:
        return per_rad(text, lambda l: not KOD.search(l))
    return text   # handskrift.js, konisk pendel, resonans: bara de uttryckliga paren

KODFILER = ['fysik2-svangningstid-app.html', 'fysik2-vinkelhastighet-app.html', 'fysik1-hypotesprovet-app.html',
            'fysik2-manens-faser.html', 'fysik2-pendel-app.html', 'fysik2-svangningar-jamforelse.html',
            'minisim.js', 'fysik-enhetskoll.html']
FILER = (sorted(glob.glob('data/teori/fy*.md')) + sorted(glob.glob('data/repetition/fy*.js')) +
         sorted(glob.glob('data/np/fy*.js')) + ['data/ovningar.js', 'data/exittickets.js', 'data/katalog.js',
         'data/simuleringar.js', 'handskrift.js', 'fysik2-konisk-pendel-app.html', 'fysik2-resonans-app.html'] + KODFILER)
FILER = [f.replace('\\', '/') for f in FILER]

if __name__ == '__main__':
    if sys.argv[1:2] == ['--head']:
        f = sys.argv[2]
        old = subprocess.run(['git', 'show', 'HEAD:' + f], capture_output=True).stdout.decode('utf-8')
        sys.stdout.buffer.write(byt(f, old).encode('utf-8')); sys.exit()
    for f in FILER:
        old = io.open(f, encoding='utf-8', newline='').read()
        new = byt(f, old)
        if new != old:
            io.open(f, 'w', encoding='utf-8', newline='').write(new)
            for a, b in zip(old.split('\n'), new.split('\n')):
                if a != b:
                    print(f'{f}: {b.strip()[:170]}')
