# Bygger scenprompter.txt/.json och scenplan.txt för filmen "Det femton
# meter långa sugröret" ur masterpromptens låsta block (Mattias figurblock,
# som i masterprompten står under Nils gamla namn, och husstilen citeras
# ordagrant).
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
STRA = ("an absurdly long, thin drinking straw, the single red accent, standing in a plain tall glass of water and "
        "rising straight up until it leaves the top of the frame")

AI = {
  1: f"The setting is plain grid paper with the edge of a lab bench at the bottom of the frame. On the bench stands {STRA}. "
     "Medium-wide shot from a slight low angle: the character stands beside the bench on the left third of the frame, "
     "follows the straw upwards with his eyes and tilts his head further and further back until his goggles almost slip, "
     "his mouth falling open in amazement.",
  2: "The setting is plain grid paper with only a faint line of a lab bench at the bottom of the frame. Close-up of the "
     "character from the shoulders up, centred slightly below the middle of the frame. He raises his eyebrows, rubs his "
     "chin with one finger and looks straight at the viewer with a playful, questioning expression, as if waiting for "
     "an answer. The red accent is only the strap of his goggles.",
  3: f"The setting is plain grid paper with the edge of a lab bench at the bottom of the frame. On the bench stands {STRA}; "
     "the water in the glass and the straw are drawn as simple outlines, and the inside of the straw is not shown. "
     "Medium shot: the character leans over the bench with the bottom end of the straw in his mouth, sucks with "
     "comically bulging cheeks and a reddening face that squashes and stretches, then lets go, gasps for breath and "
     "shakes his head with a defeated, goofy look.",
  4: "The setting is plain grid paper with a lab bench at the bottom of the frame and a plain glass of water on it. "
     "Medium shot: the character stands on the right third of the frame, holds up his index finger and wags it slowly "
     "from side to side at the viewer with a knowing, mischievous grin, as if saying no, it is not what you think. "
     "The glass is the single red accent, drawn as a red outline.",
  9: f"The setting is plain grid paper. On the floor stands the base of a very tall, thin transparent tube, the single red "
     "accent, rising straight up out of the top of the frame; nothing inside the tube is shown. Full-figure shot from a "
     "low angle: the character stands at the foot of the tube on the left, shades his eyes with one hand and leans back "
     "to peer up along it, then scratches his messy hair with a puzzled frown.",
  14: "The setting is plain grid paper with only a faint line of a lab bench at the bottom of the frame. Medium close-up, "
      "centred: the character's face lights up in an ecstatic, gap-toothed grin, he taps his temple twice with one "
      "finger and then points up and around him at the empty air with both hands, eyes wide with delight. The red accent "
      "is only the strap of his goggles.",
  15: "The setting is plain grid paper with only a faint line of a lab bench at the bottom of the frame. The character "
      "stands in a full-figure shot on the upper part of the frame, leaving the lower third of the frame as empty paper. "
      "During the clip he takes a small sip from a short ordinary drinking straw in a glass, the single red accent, gives "
      "a satisfied little nod and a goofy thumbs up, then holds still smiling.",
}
EGNA = {
  5: "Egen animation (pennstil på rutpapper, som teorifigurerna i fy1-5.4): ett glas vatten med sugrör på en bänk. Luftens tryck visas som många korta blå pilar som pekar in mot glaset, sugröret och bänken från alla håll. Etikett \"lufttryck 101,3 kPa\".",
  6: "Fortsättning: pilarna mot glasets sidor tonar ut, kvar blir en rad lika långa pilar som trycker ned på vattenytan runt sugröret.",
  7: "Fortsättning: inne i sugröret krymper pilarna och blir glesare (lägre tryck), medan pilarna på vattenytan utanför står kvar lika långa. Etikett \"lägre tryck\" vid sugrörets topp.",
  8: "Fortsättning: vattnet stiger upp i sugröret, drivet av pilarna på vattenytan, tills det når munnen (antydd med en enkel linje).",
  10: "Egen animation, ny bild i skala: ett 15 m högt genomskinligt rör står i en balja vatten, en måttstock 0–15 m bredvid, en pump överst. Luften i röret visas som prickar som sugs ut uppåt tills röret är tomt.",
  11: "Fortsättning: vattnet stiger i röret och saktar in tills det stannar vid 10,3 m. Ovanför vattnet tomt rör (vakuum) upp till 15 m. Streckad linje och etikett \"drygt 10 m\" vid vattenytan, \"15 m\" vid toppen.",
  12: "Fortsättning: en pil nedåt i vattenpelaren och en lika lång pil nedåt på vattenytan i baljan, \"lika stort tryck\". Filmens enda formel tonar in: p_0 = \\rho \\cdot g \\cdot h, sedan h = 101 300 / (998 · 9,82) ≈ 10,3 m.",
  13: "Egen animation: genomskärning av en djup borrad brunn (marken i grafit, grundvattnet i ljusblått). Pumpen sitter längst ned under vattenytan och vattnet går uppåt i röret till ytan, med en pil uppåt vid pumpen.",
}

ai_nr = sorted(AI)
rader = ["AGENT INSTRUCTION", "",
  f"You are generating {len(ai_nr)} animated clips for one continuous short film in 9:16 vertical format. A character "
  "sheet is attached showing the recurring main character in several views, expressions and poses. Use it as the "
  "visual reference for that character in every clip, and build each clip's background from its own prompt. Every "
  "clip is exactly 4 seconds. Generate all clips in order, without stopping, without asking for confirmation and "
  "without summarising between clips. The character, the blue ballpoint ink style, the cream squared paper, the single "
  "red accent and the paper grain must stay identical in every clip so they cut together as one film. Deliver all clips "
  f"in order, labelled by scene number (scenes {', '.join(map(str, ai_nr[:-1]))} and {ai_nr[-1]}).", ""]
plan, js = [], []
for n in range(1, 16):
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
