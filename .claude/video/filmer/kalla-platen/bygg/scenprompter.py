# Bygger scenprompter.txt/.json och scenplan.txt för filmen "Plåten som
# känns kallare" ur masterpromptens låsta block (Fylgias figurblock, som i
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
KOK = ("The setting is a sparse kitchen drawn in a few loose blue lines on the grid paper: a plain kitchen counter "
       "across the lower part of the frame, a window with soft early morning light behind it, and on the counter a "
       "plain flat metal baking tray drawn with a few light blue sheen strokes lying next to a plain wooden cutting "
       "board drawn with fine wood grain hatching. No brand names, no labels and no lettering anywhere.")
RED = "The single red accent is only the strap of her goggles."

AI = {
  1: f"{KOK} Medium-wide shot: the character shuffles into the frame from the left in a rumpled, sleepy way, "
     f"yawning hugely with one hand over her mouth, and stops behind the counter, blinking down at the baking tray "
     f"and the cutting board, which take up the lower middle of the frame. {RED}",
  2: f"{KOK} Close medium shot from slightly above: the character leans over the counter and lays one flat palm on "
     f"the wooden cutting board and the other flat palm on the metal baking tray at the same moment. Her hand on the "
     f"tray gives an exaggerated rubbery slapstick shiver, her shoulders jump up, her eyes go wide and her eyebrows "
     f"shoot up in surprise, while the hand on the wood stays relaxed. Nothing else moves on the counter. {RED}",
  3: f"The setting is plain grid paper with only a faint line of a counter edge at the bottom of the frame. Close-up "
     f"of the character from the shoulders up, centred slightly below the middle of the frame. She turns to the "
     f"viewer, raises both eyebrows high, gives an exaggerated questioning shrug with both palms up and holds the "
     f"curious look. {RED}",
  6: f"The setting is plain grid paper with only a faint line of a counter edge at the bottom of the frame. Medium "
     f"close-up: the character holds up one open hand in front of her face, palm towards the viewer, and slowly "
     f"wiggles her long fingers while she studies her own palm with a curious, cross-eyed squint. {RED}",
  10: f"{KOK} Medium shot: the character stands behind the counter with one finger on her chin in a thoughtful "
      f"pose and slowly looks from the metal baking tray to the wooden cutting board and back again, eyebrows "
      f"knitted in concentration. {RED}",
  11: f"The setting is plain grid paper with only a faint line of a counter edge at the bottom of the frame. Close "
      f"medium shot: the character presses her own flat palm gently against her cheek, then her eyes go huge and "
      f"she lights up in a wide, crooked-toothed grin of sudden understanding. {RED}",
  12: f"{KOK} Close shot of the counter from slightly above with the character leaning in from the right: she "
      f"carefully sets down one small plain ice cube in the middle of the metal baking tray and one identical small "
      f"plain ice cube in the middle of the wooden cutting board, then props her chin on both hands and stares at "
      f"them with huge curious eyes. The ice cubes stay exactly the same size and shape during the whole clip. {RED}",
  14: f"The setting is plain grid paper with only a faint line of a counter edge at the bottom of the frame. Medium "
      f"shot: the character wraps her long arms around herself and gives a big, theatrical, rubbery pretend shiver, "
      f"then lets go, throws her arms wide and breaks into an ecstatic, crooked-toothed grin. {RED}",
  15: f"The setting is plain grid paper with only a faint line of a counter edge at the bottom of the frame. The "
      f"character stands in a full-figure shot on the upper part of the frame, leaving the lower third of the frame "
      f"as empty paper. During the clip she gives a cheerful little wave and a quick, goofy thumbs up, then holds "
      f"still smiling. {RED}",
}
EGNA = {
  4: "Egen animation: bakplåten och skärbrädan i genomskärning på bänken. En kontakttermometer (givare som trycks "
     "mot ytan, inte infraröd) sätts först mot plåten och sedan mot brädan; displayen visar 20 °C båda gångerna.",
  5: "Egen animation: samma bild, med en rumstermometer på väggen som också visar 20 °C. De tre värdena "
     "markeras med en tunn blå ring i tur och ordning.",
  7: "Egen animation: en hand ligger på plåten i genomskärning. Blå värmeflödespilar går från handen ned i "
     "plåten. Etikett \"värme\" vid pilarna. Inga kraftpilar.",
  8: "Egen animation (räknad värmeledning): en plåt av stål och en bräda av trä i genomskärning, med en varm hand "
     "överst. Temperaturen i materialet visas som en färgton som sprider sig nedåt, räknad ur "
     "värmeledningsekvationen med stålets och träets temperaturledningstal (stål cirka 4 · 10⁻⁶ m²/s, trä cirka "
     "1,5 · 10⁻⁷ m²/s). I stålet sprids värmen synligt snabbt, i träet knappt alls.",
  9: "Egen animation: samma bild, med värmeflödespilarna ut ur handen. Pilarna in i plåten är många och tjocka, "
     "pilarna in i brädan få och tunna. Etiketterna \"snabbt\" och \"långsamt\".",
  13: "Egen animation (tidsförlopp): isbitarna på plåten och brädan. Isbiten på plåten smälter till en vattenpöl "
      "först, medan isbiten på brädan bara krymper lite. Blå värmeflödespilar från plåten in i isen, få från brädan. "
      "Bara ordningen visas, ingen tid i minuter.",
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
