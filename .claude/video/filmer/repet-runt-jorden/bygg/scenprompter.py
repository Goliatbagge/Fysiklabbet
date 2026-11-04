# Bygger scenprompter.txt/.json och scenplan.txt för filmen "Repet runt
# jorden" ur masterpromptens låsta block (Mattias figurblock, som i
# masterprompten står under Nils gamla namn, och husstilen citeras ordagrant).
#   python -I scenprompter.py
import json, os, re

HAR = os.path.dirname(os.path.abspath(__file__))
FILM = os.path.dirname(HAR)
MP = os.path.join(FILM, '..', '..', 'masterprompt-labbfolket.md')
mp = open(MP, encoding='utf-8').read()

def platta(s):
    return re.sub(r'\s+', ' ', s).strip()

husstil = platta(re.search(r'### HUSSTIL[^\n]*\n\n(.*?)\n\n###', mp, re.S).group(1))
figur = platta(re.search(r'Detta är (?:Nils|Mattias) LÅSTA FIGURBLOCK[^"]*"(.*?)"', mp, re.S).group(1))
manus = {m['scen']: m['undertext'] for m in json.load(open(os.path.join(FILM, 'manus.json'), encoding='utf-8'))['segment']}

TYST = 'The clip is silent: no voice, no narration, no dialogue, no music and no sound effects.'
SLUT = ("The camera stays locked or moves only in a very slow push-in; the character's design, clothing and "
        "proportions never change; the squared paper and paper grain stay consistent; no glitching, no warping, "
        "no morphing, no flickering, no extra limbs, no duplicate characters, no unintended characters, no "
        "on-screen text, no numbers, no letters, no subtitles and no watermark.")
BANK = ("The setting is a sparse lab bench drawn in a few loose blue lines on the grid paper, with plenty of empty "
        "paper around it.")
REP = "a thick coiled rope, the single red accent"

AI = {
  1: f"{BANK} On the bench stands a small plain desk globe with only a few loose continent outlines, no lettering. "
     f"Medium shot: the character stands behind the bench on the right half of the frame, holding in both arms "
     f"{REP}. He looks from the globe to the viewer with a wide, goofy, scheming grin and proudly lifts the coil a "
     f"little higher to show it off. The upper third of the frame is calm, empty paper.",
  3: "The setting is plain grid paper with only a faint line of a lab bench at the bottom of the frame. Medium shot: "
     "the character stands centred, holding a short straight piece of thick rope stretched horizontally between "
     "his two hands at chest height, the single red accent, about as long as his arms are wide. He looks down at it, "
     "then up at the viewer with raised eyebrows and a proud, slightly silly smile, giving the rope a small tug. The "
     "rope stays a short straight piece the whole clip.",
  5: "The setting is plain grid paper with a low line of ground and a few blades of grass along the bottom of the "
     "frame. Wide shot: the character crouches very low on the ground on the left half of the frame, his long legs "
     "folded awkwardly, cheek almost touching the grass, squinting sideways along the ground with one eye closed. "
     "Next to him on the right sits a plain friendly house cat drawn in the same blue ink, which tilts its head and "
     "looks at him curiously. The red accent is only the strap of his goggles.",
  6: "The setting is plain grid paper with only a faint line of ground at the bottom of the frame. Close-up of the "
     "character from the shoulders up, centred slightly below the middle of the frame. He turns to the viewer, "
     "raises both eyebrows high, gives an exaggerated questioning shrug with both palms up and holds the curious "
     "look. The red accent is only the strap of his goggles.",
  7: "The setting is plain grid paper with only a faint line of a lab bench at the bottom of the frame. Medium close "
     "shot: the character holds one hand up next to his face with thumb and index finger pinched almost together, "
     "squinting at the tiny gap between them with one eye, then lets out an amused, dismissive little laugh and "
     "waves the idea away with a floppy hand. The red accent is only the strap of his goggles.",
  13: f"{BANK} Medium shot: the character stands behind the bench in the middle of the frame, staring into space "
      f"while thinking. Suddenly he freezes, his eyes go huge and mismatched, he taps his temple twice with one long "
      f"finger and breaks into an ecstatic, gap-toothed grin of realisation. The red accent is only the strap of his "
      f"goggles.",
  15: "The setting is plain grid paper with only a faint line of ground at the bottom of the frame. The character "
      "stands in a full-figure shot on the upper part of the frame, leaving the lower third of the frame as empty "
      "paper. During the clip he gives a cheerful little wave and a quick, goofy thumbs up, then holds still smiling. "
      "The single red accent is only the strap of his goggles.",
}
EGNA = {
  2: "Egen animation: jorden som en cirkel i blått bläck på rutpapperet (bara en enkel kontur och några lösa "
     "kontinentstreck). Ett rött rep ritas fram tätt längs ekvatorn, runt hela cirkeln, och sluts.",
  4: "Egen animation: samma bild. Repet skarvas (en kort röd bit blinkar till) och lyfts sedan likformigt från "
     "jorden: en röd cirkel med samma medelpunkt, något större radie. Glappet är kraftigt överdrivet i bilden; i "
     "skala skulle det inte synas (16 cm mot 6 378 km).",
  8: "Egen animation: inzoomning till marken vid ekvatorn. Marklinje, repet som en röd linje 16 cm ovanför, och en "
     "enkel kattkontur som kryper under. Måttlinje med dubbelpil i fri yta bredvid: \"16 cm\". Kattens kontur "
     "skalenlig (en katt som kryper är cirka 12–15 cm hög).",
  9: "Egen animation: en cirkel med medelpunkt och radien r utritad. Omkretsen ritas fram med pennan ett varv. "
     "Etiketter: r vid radien, ord-etikett \"omkrets\" vid cirkeln.",
  10: "Egen animation: samma cirkel, en större koncentrisk cirkel (repet, rött) läggs utanför. Radien förlängs med "
      "biten h; måttlinje med h i fri yta mellan cirklarna.",
  11: "Egen animation: den yttre cirkeln jämförs med den inre: tillskottet i omkrets markeras som en röd bit och "
      "etiketten \"2π · h\" tonar in vid den. Den röda biten är den skarvade metern.",
  12: "Egen animation: pennlösning på rutpapperet: 2π · h = 1 m, sedan h = 1 m / (2π) med vågrätt bråkstreck, "
      "sedan ≈ 0,16 m = 16 cm. En rad i taget. (Detta är filmens enda formel.)",
  14: "Egen animation, skalenlig: en tennisboll (radie 3,3 cm) med ett rött rep 16 cm utanför (radie 19,3 cm). "
      "Måttlinje \"16 cm\" i fri yta. Bredvid, i liten skala, jorden med samma etikett 16 cm. Glappet är lika stort "
      "men ser enormt ut runt bollen.",
}

ai_nr = sorted(AI)
SCENER = 15
rader = ["AGENT INSTRUCTION", "",
  f"You are generating {len(ai_nr)} animated clips for one continuous short film in 9:16 vertical format. A character "
  "sheet is attached showing the recurring main character in several views, expressions and poses. Use it as the "
  "visual reference for that character in every clip where it appears, and build each clip's background from its own "
  "prompt. Every clip is exactly 4 seconds. Generate all clips in order, without stopping, without asking for "
  "confirmation and without summarising between clips. The character, the blue ballpoint ink style, the cream squared "
  "paper, the single red accent and the paper grain must stay identical in every clip so they cut together as one film. "
  f"Deliver all clips in order, labelled by scene number (scenes {', '.join(map(str, ai_nr[:-1]))} and {ai_nr[-1]}).", ""]
plan, js = [], []
for n in range(1, SCENER + 1):
    rad = manus.get(n, '(inget tal, slutskylten läggs på i redigeringen)')
    if n in AI:
        p = f"This is a 4-second hand-drawn 2D animated clip in 9:16 vertical format. {figur} {AI[n]} {husstil} {TYST} {SLUT}"
        rader += [f"Scene {n}", "", p, ""]
        js.append({'scen': n, 'prompt': p})
        plan += [f"Scen {n} · 4 s · AI-SCEN", f'"{rad}"', ""]
    else:
        plan += [f"Scen {n} · 4 s · EGEN INSPELNING", f'"{rad}"', "", EGNA[n], ""]
open(os.path.join(FILM, 'scenprompter.txt'), 'w', encoding='utf-8').write('\n'.join(rader))
json.dump(js, open(os.path.join(FILM, 'scenprompter.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(os.path.join(FILM, 'scenplan.txt'), 'w', encoding='utf-8').write('\n'.join(plan))
print(len(js), 'AI-scener;', len(open(os.path.join(FILM, 'scenprompter.txt'), encoding='utf-8').read()), 'tecken')
