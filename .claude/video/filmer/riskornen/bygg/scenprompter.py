# Bygger scenprompter.txt/.json och scenplan.txt för filmen "Riskornen på
# schackbrädet" ur masterpromptens låsta block (Fylgias figurblock, som i
# masterprompten står under Malins gamla namn, och husstilen citeras ordagrant).
#   python -I scenprompter.py
import json, os, re

HAR = os.path.dirname(os.path.abspath(__file__))
FILM = os.path.dirname(HAR)
MP = os.path.join(FILM, '..', '..', 'masterprompt-labbfolket.md')
mp = open(MP, encoding='utf-8').read()

def platta(s):
    return re.sub(r'\s+', ' ', s).strip()

husstil = platta(re.search(r'### HUSSTIL[^\n]*\n\n(.*?)\n\n###', mp, re.S).group(1))
figur = platta(re.search(r'Detta är (?:Malins|Fylgias) LÅSTA FIGURBLOCK[^\n]*\n[^\n]*\n\n"(.*?)"\n', mp, re.S).group(1))
manus = {m['scen']: m['undertext'] for m in json.load(open(os.path.join(FILM, 'manus.json'), encoding='utf-8'))['segment']}

TYST = 'The clip is silent: no voice, no narration, no dialogue, no music and no sound effects.'
SLUT = ("The camera stays locked or moves only in a very slow push-in; the character's design, clothing and "
        "proportions never change; the squared paper and paper grain stay consistent; no glitching, no warping, "
        "no morphing, no flickering, no extra limbs, no duplicate characters, no unintended characters, no "
        "on-screen text, no numbers, no letters, no subtitles and no watermark.")
SACK = "a plain round-bellied burlap sack of rice tied at the top, drawn in blue ink with a pale cream wash, unlabelled"

AI = {
  1: "The setting is a sparse old palace hall drawn in a few loose blue lines on the grid paper: two tall arched "
     "windows and a low wooden table. On the table lies a closed wooden game box with a simple carved lid, which is "
     "the single red accent; it is closed and no board or pieces are visible. Medium shot: the character stands "
     "behind the table on the right third of the frame, leans forward over the box with her hands clasped under her "
     "chin and looks up and to the side with a dreamy, mischievous smile, as if remembering an old story. The upper "
     "third of the frame is calm empty paper above the windows.",
  2: "The setting is plain grid paper with only the edge of a wooden table at the bottom of the frame. Close-up of "
     "the character from the shoulders up, centred slightly below the middle of the frame. She holds up one single "
     "tiny grain of rice, the single red accent, pinched between her thumb and index finger right in front of her "
     "face, goes cross-eyed looking at it, and then gives a small, delighted, gap-toothed grin.",
  4: "The setting is plain grid paper with the faint outline of a wooden table in the lower part of the frame. "
     "Medium shot: the character stands on the left third of the frame and slowly scratches her messy bun with the "
     "pencil she has pulled out of it, eyebrows tilted up in the middle, looking at the viewer with a puzzled, "
     "curious expression as if asking a question. The red accent is only the strap of her goggles.",
  5: f"The setting is plain grid paper. On the floor beside the character stands {SACK}; behind it, smaller and further "
     f"back, the outline of a small empty flatbed delivery truck, plain and unbranded, no logos and no number plate, "
     f"drawn in blue ink lines only. The sack is the single red accent. Medium-wide shot: the character stands in the "
     f"middle of the frame, points first at the sack, then swings her pointing finger towards the truck, and then "
     f"turns to the viewer with a wide-eyed, eager, questioning look and shrugs with both palms up.",
  8: "The setting is a sparse palace courtyard on the grid paper: an arched gate and a few neat stacks of plain "
     "burlap rice sacks along a wall, drawn in blue ink with a pale cream wash, unlabelled. A plain "
     "crown resting on a cushion on a small stool is the single red accent; no person wears it. Medium shot: the "
     "character stands beside the stacked sacks on the right, looks them over, nods slowly with a relaxed, "
     "approving smile and gives a small casual shrug.",
  13: "The setting is a quiet room drawn as sparse blue lines on the bright cream grid paper, never dark or grey; "
      "only the small pane of a tall window shows the night, with a few light blue hatching strokes and a thin moon. "
      "Her hair stays exactly as on the character sheet: dark blue hatching piled up in the tall, lopsided messy bun "
      "with two pencils through it, never loose and never light-coloured. On the floor lies a low wooden game board seen almost edge-on, so that "
      "its squares cannot be seen. Medium shot from a low angle: the character kneels on the floor beside the board on "
      "the left of the frame, holds a small plain flashlight, the single red accent, pointing straight up, and clicks "
      "it on; a soft pale beam rises straight up out of the top of the frame. She tilts her head all the way back to "
      "follow the beam upwards, with wide, curious eyes and a slowly growing grin.",
  15: f"The setting is a sparse open landscape drawn in a few blue lines on the grid paper: a low horizon with gentle "
      f"hills and a few distant pine trees. Wide shot: the character stands on the left on a low hill and holds "
      f"{SACK} tipped over in both arms with its open mouth towards the right side of the frame; the sack is the "
      f"single red accent. During the clip she tips it further with a big, theatrical, mischievous grin, leaning back "
      f"from the effort. The pouring itself is not shown: the sack's opening points out of frame to the right.",
  17: "The setting is a vast rice field drawn in loose blue ink strokes on the grid paper, with neat rows of rice "
      "plants receding to a far, flat horizon, and a pale sun low in the sky. Medium-wide shot from behind and "
      "slightly to the side: the character stands at the edge of the field in the lower left of the frame, holding "
      "a single rice plant, the single red accent, and slowly turns her head from left to right to take in the "
      "endless field, her shoulders dropping in awe.",
  18: "The setting is plain grid paper with only a faint line of a table at the bottom of the frame. Close medium "
      "shot, centred: the character holds her thumb and index finger almost touching in front of her face, as if "
      "showing something tiny, and looks at the small gap with a sly smile; then she throws both long arms wide "
      "apart in an enormous gesture, her eyes huge and her mouth open in an ecstatic grin, her loose strands of hair "
      "springing out. The red accent is only the strap of her goggles.",
  19: "The setting is plain grid paper with only a faint line of a table at the bottom of the frame. The character "
      "stands in a full-figure shot on the upper part of the frame, leaving the lower third of the frame as empty "
      "paper. During the clip she gives a cheerful little wave and a quick, goofy thumbs up, then holds still smiling. "
      "The single red accent is only the strap of her goggles.",
}
EGNA = {
  3: "Egen animation: schackbrädet (8 × 8 rutor, ruta 1 nere till vänster). Korn dyker upp på ruta 1–4: 1, 2, 4 och 8 korn, med antalet nederst i rutan.",
  6: "Egen animation: första raden tonar in ruta för ruta med talen 1, 2, 4, …, 128. Sedan \"255 korn, cirka 6 gram\".",
  7: "Egen animation: rad 1–4 tonas rad för rad. Sedan \"4 294 967 295 korn\" och \"cirka 100 ton\".",
  9: "Egen animation: rutorna 1–32 i blått, ruta 33 i rött. Ruta 1–32: 4 294 967 295, ruta 33: 4 294 967 296, \"ett korn mer\".",
  10: "Egen animation: en rektangel för allt ris delas i halvor: ruta 64 hälften, ruta 63 en fjärdedel, sedan 62, 61, …",
  11: "Egen animation: 18 446 744 073 709 551 615 skrivs fram i tresiffriga grupper, sedan \"riskorn\" och = 2^64 − 1.",
  12: "Egen animation: ett bräde på 40 × 40 cm där riset växer till en pelare ut ur bilden; sedan hela höjden i linjär skala med streckade mått vid 1, 10 och 20 gånger avståndet till solen, och toppen märkt \"cirka 3,6 miljarder km\".",
  14: "Egen animation: samma skalbild med en ficklampa vid brädet; en ljusprick går med konstant fart från brädet till toppen medan klockan räknar från 0 h 00 min till 3 h 20 min.",
  16: "Egen animation: genomskärning av marken. Riset stiger till 1 m; en vuxen (1,75 m) står i det till midjan, måttpil 1 m.",
}

ai_nr = sorted(AI)
rader = ["AGENT INSTRUCTION", "",
  f"You are generating {len(ai_nr)} animated clips for one continuous short film in 9:16 vertical format. A character "
  "sheet is attached showing the recurring main character in several views, expressions and poses. Use it as the "
  "visual reference for that character in every clip where it appears, and build each clip's background from its own "
  "prompt. Every clip is exactly 4 seconds. Generate all clips in order, without stopping, without asking for "
  "confirmation and without summarising between clips. The character, the blue ballpoint ink style, the cream squared "
  "paper, the single red accent and the paper grain must stay identical in every clip so they cut together as one film. "
  f"Deliver all clips in order, labelled by scene number (scenes {', '.join(map(str, ai_nr[:-1]))} and {ai_nr[-1]}).", ""]
plan, js = [], []
for n in range(1, 20):
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
