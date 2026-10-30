# Bygger scenprompter.txt/.json för filmen "Faradays bur" ur masterpromptens
# låsta block (Nils figurblock och husstilen citeras ordagrant därifrån).
#   python -I scenprompter.py
import json, os, re

HAR = os.path.dirname(os.path.abspath(__file__))
FILM = os.path.dirname(HAR)
MP = os.path.join(FILM, '..', '..', 'masterprompt-labbfolket.md')
mp = open(MP, encoding='utf-8').read()

def platta(s):
    return re.sub(r'\s+', ' ', s).strip()

husstil = platta(re.search(r'### HUSSTIL[^\n]*\n\n(.*?)\n\n###', mp, re.S).group(1))
nils = platta(re.search(r'Detta är Nils LÅSTA FIGURBLOCK[^\n]*\n\n"(.*?)"\n', mp, re.S).group(1))
manus = {m['scen']: m['tal'] for m in json.load(open(os.path.join(FILM, 'manus.json'), encoding='utf-8'))['segment']}

TYST = 'The clip is silent: no voice, no narration, no dialogue, no music and no sound effects.'
SLUT = ("The camera stays locked or moves only in a very slow push-in; the character's design, clothing and "
        "proportions never change; the squared paper and paper grain stay consistent; no glitching, no warping, "
        "no morphing, no flickering, no extra limbs, no duplicate characters, no unintended characters, no "
        "on-screen text, no numbers, no letters, no subtitles and no watermark.")
BIL = ("a small ordinary hatchback car drawn in blue ink lines with a pale light blue wash, closed metal roof and "
       "doors, plain unbranded, no logos and no number plate")

AI = {
  1: f"The setting is a quiet country road at dusk drawn in a few blue lines on the grid paper, with heavy storm clouds "
     f"drawn as dense blue cross-hatching at the top of the frame and thin diagonal rain strokes. On the road stands {BIL}; "
     f"its metal body outline is the single red accent. The character sits calmly behind the steering wheel, seen through "
     f"the side window in a medium shot from outside, on the lower half of the frame. During the clip the whole scene is "
     f"lit up for an instant by a soft white flash from the clouds, and the character blinks, then looks up through the "
     f"windscreen at the sky with wide, mismatched eyes and an amazed but unharmed, slightly goofy smile. No lightning bolt "
     f"touches the car, nothing burns, no sparks.",
  2: f"The setting is the same road drawn sparsely on the grid paper, light rain strokes, the lower part of {BIL} visible. "
     f"One rubber tyre of the car is the single red accent. Medium shot: the character crouches beside the front wheel on "
     f"the right third of the frame, points at the red tyre with one long finger and turns his head towards the viewer "
     f"with raised, upward-tilted eyebrows and a questioning, slightly lost look, as if asking the viewer. Then he holds "
     f"still.",
  3: "The setting is a wide open landscape drawn in a few blue lines on the grid paper: a flat horizon, a few distant "
     "trees and heavy storm clouds drawn as dense blue cross-hatching filling the top of the frame. Far away in the "
     "distance a single long, thin, jagged lightning bolt in the red accent colour reaches from the cloud to the ground "
     "on the far horizon, very small. The character stands in the lower right corner, seen in a low-angle shot from "
     "behind and slightly to the side, and slowly tilts his head all the way back to follow the full length of the "
     "distant bolt from the clouds down to the ground, his fluffy hair bouncing.",
  4: f"The setting is plain grid paper with the faint outline of a car wheel at the bottom of the frame. Close-up of the "
     f"character from the chest up, centred. He holds up a small thin slice of rubber, the single red accent, between "
     f"his thumb and finger, squints at how thin it is with one eye huge and the other narrowed, then bursts into a "
     f"warm, gap-toothed laugh and shakes his head.",
  5: f"The setting is a sparse roadside on the grid paper, light rain strokes. {BIL[0].upper()}{BIL[1:]} stands in the "
     f"middle of the frame; its metal roof and doors are the single red accent. Medium-wide shot: the character stands "
     f"beside the car on the left and happily knocks on the metal roof twice with his knuckles, beaming with pride, "
     f"then pats the roof gently like an old friend.",
  12: f"The setting is plain grid paper with {BIL} drawn in the centre of the frame; a thin red accent line traces the "
      f"whole outline of its metal body like a shell. Wide shot: the character stands in front of the car on the right "
      f"and sweeps both long arms out wide in a proud, theatrical presenting gesture towards the car, with an ecstatic "
      f"grin.",
  13: "The setting is plain grid paper with a small open-top convertible car with a soft fabric roof folded halfway, "
      "drawn in blue ink lines with a pale wash, plain unbranded, no logos; the fabric roof is the single red accent. "
      "Medium shot: the character stands beside the convertible, looks from the fabric roof to the viewer, frowns "
      "doubtfully with one eyebrow raised, and slowly wags one finger side to side.",
  14: f"The setting is the inside of {BIL}, drawn sparsely on the grid paper: the curve of the roof, the windscreen frame "
      f"and the door frame around the character, all outlined with the single red accent so the metal shell around him "
      f"is clear. Close medium shot from the passenger side: the character sits in the driver's seat, looks up at the "
      f"roof, taps it gently from the inside with his palm and turns to the viewer with a relaxed, warm, gap-toothed "
      f"smile.",
  15: "The setting is plain grid paper with only a faint line of the road at the bottom of the frame. The character "
      "stands in a full-figure shot on the upper part of the frame, leaving the lower third of the frame as empty paper. "
      "During the clip he gives a cheerful little wave and a quick, goofy thumbs up, then holds still smiling. The single "
      "red accent is only the strap of his goggles.",
}
EGNA = {
  6: "Egen animation (teorifiguren i fy1-7.13): bilen i genomskärning som en metallram. Ledningselektronerna syns som små blå minustecken utspridda i plåten och rör sig lite fritt.",
  7: "Fortsättning: ett yttre elektriskt fält (grå fältlinjer åt höger med pilspetsen mitt på linjen) läggs på, och elektronerna glider åt vänster i plåten.",
  8: "Fortsättning: vänstra sidan av plåten är full av minustecken och högra sidan får plustecken.",
  9: "Fortsättning: inuti bilen tonar röda fältlinjer åt vänster in, från plussidan till minussidan.",
  10: "Fortsättning: inuti bilen tonar både de grå och de röda linjerna bort; ytan där föraren sitter är tom på fält. Nils sitter som liten figur inne i bilen.",
  11: "Egen animation: en blixt träffar taket, och strömmen (gula pilar) följer plåten runt kupén ned mot marken under bilen. Inne i bilen sker ingenting.",
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
for n in range(1, 16):
    rad = manus.get(n, '(inget tal, slutskylten läggs på i redigeringen)')
    if n in AI:
        p = (f"This is a 4-second hand-drawn 2D animated clip in 9:16 vertical format. {nils} {AI[n]} {husstil} {TYST} {SLUT}")
        rader += [f"Scene {n}", "", p, ""]
        js.append({'scen': n, 'prompt': p})
        plan += [f"Scen {n} · 4 s · AI-SCEN", f'"{rad}"', ""]
    else:
        plan += [f"Scen {n} · 4 s · EGEN INSPELNING", f'"{rad}"', "", EGNA[n], ""]
open(os.path.join(FILM, 'scenprompter.txt'), 'w', encoding='utf-8').write('\n'.join(rader))
json.dump(js, open(os.path.join(FILM, 'scenprompter.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(os.path.join(FILM, 'scenplan.txt'), 'w', encoding='utf-8').write('\n'.join(plan))
print(len(js), 'AI-scener;', len(open(os.path.join(FILM, 'scenprompter.txt'), encoding='utf-8').read()), 'tecken')
