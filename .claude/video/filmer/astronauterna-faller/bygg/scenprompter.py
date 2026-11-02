# Bygger scenprompter.txt/.json och scenplan.txt för filmen "Astronauterna
# faller" ur masterpromptens låsta block (Fylgias figurblock, som i
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
MODUL = ("The setting is the inside of a sparse, generic space station module drawn in a few loose blue lines on the "
         "grid paper: a rounded tube-shaped wall with a few plain handrails and one round window, no flags, no logos "
         "and no lettering. She is still wearing her lab coat and goggles, not a space suit.")
BOLL = "a small plain round ball, the single red accent"

AI = {
  1: f"{MODUL} Medium shot: the character floats gently in the middle of the frame, upright but slightly tilted, her "
     f"long legs dangling loosely and her lab coat and the loose strands of her bun hovering softly around her. Beside "
     f"her hand hovers {BOLL}. She looks around with a happy, slightly bewildered smile and gives the ball a tiny "
     f"careful nudge with one fingertip; it only drifts a little, staying beside her. The upper third of the frame is "
     f"calm, empty module wall.",
  2: "The setting is plain grid paper with a low line of ground and a few blades of grass at the bottom of the frame "
     "and an empty sky above, with one tiny round space station drawn as a small dot with two thin solar panels high "
     "up in the corner of the sky, the single red accent. Medium shot from a slight low angle: the character stands "
     "on the ground on the left third of the frame, shades her eyes with one hand and squints up at the tiny station, "
     "then scratches her messy bun with a puzzled frown, eyebrows tilted up in the middle.",
  3: "The setting is plain grid paper with only a faint line of ground at the bottom of the frame. Close-up of the "
     "character from the shoulders up, centred slightly below the middle of the frame. She turns to the viewer, "
     "raises both eyebrows high, gives an exaggerated questioning shrug with both palms up and holds the curious "
     "look. The red accent is only the strap of her goggles.",
  6: f"The setting is a sparse grassy hilltop drawn in a few blue lines on the grid paper, with a low horizon and a "
     f"wide empty sky. Medium-wide shot from the side: the character stands on the hilltop on the left third of the "
     f"frame, facing right, holding {BOLL} in her raised throwing hand. She winds up with a big, rubbery, theatrical "
     f"slapstick backswing, tongue poking out in concentration, and freezes at the top of the wind-up just before the "
     f"throw. The ball never leaves her hand during the clip.",
  14: f"{MODUL} Close medium shot: the character floats near the round window on the right, through which only a "
      f"curved edge of a pale blue planet is visible as a few soft blue strokes. {BOLL[0].upper() + BOLL[1:]} hovers "
      f"right next to her face. She looks from the ball down towards the planet, her eyes go huge, and she breaks "
      f"into an ecstatic, gap-toothed grin of realisation, pointing down at the planet with one long finger.",
  15: "The setting is plain grid paper with only a faint line of ground at the bottom of the frame. The character "
      "stands in a full-figure shot on the upper part of the frame, leaving the lower third of the frame as empty "
      "paper. During the clip she gives a cheerful little wave and a quick, goofy thumbs up, then holds still smiling. "
      "The single red accent is only the strap of her goggles.",
}
EGNA = {
  4: "Egen animation: jorden i genomskärning i skala (radie 6 378 km) med rymdstationens bana 400 km ovanför "
     "jordytan som en tunn cirkel tätt intill. Måttpil \"cirka 400 km\" mellan jordytan och banan. Banan ska synligt "
     "nästan nudda jorden: det är poängen.",
  5: "Egen animation: två tyngdkraftspilar F_G i skala, en vid jordytan (100 %) och en vid stationens höjd (88,5 %, "
     "räknat som (6 378 / 6 778)²). Etikett \"cirka 89 %\" vid den övre pilen.",
  7: "Egen animation (Newtons kanonkula, räknad bana): en kulle på en jord i genomskärning, bollen kastas vågrätt "
     "med låg fart och faller i en båge till marken nära kullen. Luftmotstånd försummas; banan räknas ur "
     "gravitationslagen, inte ritas på fri hand.",
  8: "Egen animation: samma bild, två kast till med högre fart. Banorna landar längre och längre bort; de gamla "
     "banorna står kvar streckade.",
  9: "Egen animation: kameran zoomar ut så hela jorden syns. Ett kast till landar en bra bit runt jorden; markens "
     "krökning syns tydligt under banan.",
  10: "Egen animation: bollen kastas med 7,9 km/s (cirkelbanefart vid jordytan, som i faktakontrollen). Etikett "
      "\"nästan 8 km/s\" vid kastet. Banan börjar följa jordytan.",
  11: "Egen animation: samma kast, inzoomat på en bit av banan. Två streckade linjer visar hur långt bollen fallit "
      "från den raka linjen och hur långt marken kröker sig undan; de är lika långa.",
  12: "Egen animation: utzoomat igen. Bollen går ett helt varv runt jorden och kommer tillbaka till kullen; banan "
      "sluts till en cirkel.",
  13: "Egen animation: bollen byts mot en liten rymdstation på samma sorts bana, 400 km upp, 7,7 km/s. En tyngdkraftspil "
      "F_G pekar från stationen mot jordens medelpunkt och följer med runt banan.",
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
