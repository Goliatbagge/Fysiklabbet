// Bygger den engelska versionen av agentkontoret ur den svenska:
//   utkast/agentkontoret.html -> utkast/agent-office.html
//   utkast/agentkontoret.js   -> utkast/agent-office.js
// Den engelska sidan läser samma datafil, utkast/agentkontoret-data.js.
// Kör: node .claude/oversatt-agentkontor-en.js
//
// Samma upplägg som .claude/oversatt-fordubbling-en.js: ändra bara i de
// svenska filerna och kör sedan skriptet. Redigera aldrig agent-office.*
// för hand. Varje par nedan måste hittas i den svenska filen, annars avbryter
// skriptet (då har den svenska texten ändrats och paret ska uppdateras).
// Efter översättningen letar skriptet efter kvarvarande svensk text och
// avbryter om det hittar någon.
//
// Fritext ur loggarna (commitmeddelanden, sessionsrubriker, uppdragstexter)
// visas på svenska; sidan säger det. Fasta etiketter som byggskriptet
// .claude/bygg-agentkontor.js skriver (verifierarnas namn, jobbrubriker,
// utgivarens utslag, SoMe-vaktens meddelanden) översätts i webbläsaren med
// ordlistan EN_ORD nedan. Finns byggskriptet kontrollerar skriptet att varje
// verifierarnamn och jobbrubrik där har en översättning.

const fs = require('fs');
const path = require('path');
const ROT = path.join(__dirname, '..');
const R = String.raw;

// ---------------------------------------------------------------------------
// Ordlista för fasta etiketter i datafilen (injiceras i agent-office.js).
// ---------------------------------------------------------------------------
const EN_ORD = {
  // Verifierarna (lamporna i verifieringsslussen)
  'Navigation': 'Navigation', 'Vita konturer': 'White outlines', 'Figurkanter': 'Figure edges',
  'Vinkelbågar': 'Angle arcs', 'Mjuka kurvor': 'Smooth curves', 'Språk': 'Language',
  'Bråkstorlek': 'Fraction size', 'Formelklipp': 'Clipped formulas', 'Uppgiftsrutor': 'Question boxes',
  'Kopplingsscheman': 'Circuit diagrams', 'Kontakt i figurer': 'Contact in figures',
  'Exit tickets': 'Exit tickets', 'Flervalsbalans': 'Multiple-choice balance',
  'Pennlösningar': 'Pen solutions', 'Simuleringsväxlare': 'Simulation switcher',
  'Sökindex': 'Search index', 'Ordlistan': 'Glossary', 'Fullskärmsknapp': 'Full-screen button',
  'Mobilvy': 'Mobile view', 'Sammanfattningar': 'Summaries', 'Sitemap och RSS': 'Sitemap and RSS',
  'Besöksmätning': 'Visitor analytics', 'Nyhetsbrev': 'Newsletter',
  // Byggen
  'RSS, sitemap och delningssidor': 'RSS, sitemap and share pages', 'teorin': 'the theory pages',
  // Sessionsrubriker som byggskriptet sätter
  'Dagens fysiknyhet': "Today's physics news",
  'Facebookinlägg om dagens nyhet': "Facebook post about today's news",
  'Instagraminlägg om dagens nyhet': "Instagram post about today's news",
  'Facebookinlägg om nytt på sajten': "Facebook post about what's new on the site",
  'Instagraminlägg om nytt på sajten': "Instagram post about what's new on the site",
  'Månadsrapport för sociala medier': 'Monthly social media report',
  'Svar till en besökare': 'Reply to a visitor', 'Forskningssammanställning': 'Research summary',
  'Nyhetsbrevet läggs upp i EmailOctopus': 'The newsletter is uploaded to EmailOctopus',
  'Fysikgranskning': 'Physics review', 'Uppdrag från läraren': 'Task from the teacher',
  // Övriga fasta texter
  'Sparar ändringarna': 'Saving the changes',
  'Bygg om RSS och sitemap (automatisk körning)': 'Rebuild RSS and sitemap (automatic run)',
  // Utgivarens utslag
  'GODKÄND': 'APPROVED', 'RÄTTA FÖRST': 'FIX FIRST', 'STOPPAD': 'STOPPED',
};
// SoMe-vaktens meddelanden byggs av jobbnamn och fasta fraser.
const EN_JOBB = {
  'Facebook-nyhet': 'The Facebook news post', 'Instagram-nyhet': 'The Instagram news post',
  'Facebook-lansering': "The Facebook what's-new post", 'Instagram-lansering': "The Instagram what's-new post",
};

const INJEKTION = `
  // ---- EN-ORDLISTA START (genererad av .claude/oversatt-agentkontor-en.js) ----
  // Fasta etiketter i datafilen översätts; fritext (commitmeddelanden,
  // rubriker) visas på svenska som den skrevs.
  const EN_ORD = ${JSON.stringify(EN_ORD, null, 2).replace(/\n/g, '\n  ')};
  const EN_JOBB = ${JSON.stringify(EN_JOBB, null, 2).replace(/\n/g, '\n  ')};
  function enText(t) {
    if (t == null || typeof t !== 'string') return t;
    if (Object.prototype.hasOwnProperty.call(EN_ORD, t)) return EN_ORD[t];
    const jobb = s => s.split(' och ').map(x => EN_JOBB[x] || x).join(' and ').replace(/ and The /g, ' and the ');
    let m = t.match(/^(.+?) kördes om och gick igenom$/);
    if (m) return jobb(m[1]) + ' was rerun and went out';
    m = t.match(/^(.+?) kördes om men föll igen$/);
    if (m) return jobb(m[1]) + ' was rerun but failed again';
    m = t.match(/^(.+?) har inte gått ut, inte ens efter omkörning\\.?$/);
    if (m) return jobb(m[1]) + ' did not go out, not even after a rerun.';
    return t;
  }
  for (const d of Object.values(DATA.dagar || {})) for (const e of (d.h || [])) {
    if (e.rubrik) e.rubrik = enText(e.rubrik);
    if (e.vad) e.vad = enText(e.vad);
    if (e.utslag) e.utslag = enText(e.utslag);
    if (e.text && (e.typ === 'vakt' || e.typ === 'robot' || e.typ === 'commit')) e.text = enText(e.text);
    if (Array.isArray(e.skript)) e.skript = e.skript.map(enText);
  }
  // ---- EN-ORDLISTA SLUT ----
`;

// Agentnamn i en mening: "the proofreader", men "Facebook".
const VEM = R`(/^(Facebook|Instagram)$/.test(A.namn) ? A.namn : 'the ' + A.namn.toLowerCase())`;

// ---------------------------------------------------------------------------
// HTML: [svenska, engelska]. Längre och mer specifika först.
// ---------------------------------------------------------------------------
const HTML = [
  [R`<html lang="sv">`, R`<html lang="en">`],
  [R`<!DOCTYPE html>
`, R`<!DOCTYPE html>
<!--
  agent-office.html: ENGELSK VERSION, GENERERAD. Redigera inte den här filen.
  Ändra i agentkontoret.html och kör node .claude/oversatt-agentkontor-en.js.
-->
`],
  [R`<title>Agentkontoret — Fysiklabbet</title>`, R`<title>The agent office — Fysiklabbet</title>`],
  [R`<meta name="description" content="Fysiklabbets AI-agenter i ett pixelkontor. Varje figur är en agent med egen instruktionsfil, och allt som händer spelas upp ur riktiga loggar från en vald dag.">`,
   R`<meta name="description" content="Fysiklabbet's AI agents in a pixel office. Each figure is an agent with its own instruction file, and everything that happens is replayed from real logs from a chosen day.">`],
  [R`title="Till Fysiklabbet"`, R`title="To Fysiklabbet"`],
  [R`<small>Återuppspelning av riktiga loggar</small><strong>Fysiklabbets agentkontor</strong>`, R`<small>Replay of real logs</small><strong>Fysiklabbet's agent office</strong>`],
  [R`aria-label="Välj dag"`, R`aria-label="Choose a day"`],
  [R`<button class="knapp" id="spela" aria-label="Pausa">`, R`<button class="knapp" id="spela" aria-label="Pause">`],
  [R`aria-label="Uppspelningshastighet"`, R`aria-label="Playback speed"`],
  [R`<button data-v="0.5">0,5×</button>`, R`<button data-v="0.5">0.5×</button>`],
  [R`title="Hoppa till nästa händelse"`, R`title="Jump to the next event"`],
  [R`        Nästa
      </button>`, R`        Next
      </button>`],
  [R`title="Visa etiketter och pratbubblor extra stora, för projektor"`, R`title="Show labels and speech bubbles extra large, for a projector"`],
  [R`        Större text
      </button>`, R`        Larger text
      </button>`],
  [R`title="Gör namnskyltar, pratbubblor och skyltar i kontoret större, upp till 4 gånger">Textstorlek`, R`title="Make name labels, speech bubbles and signs in the office larger, up to 4 times">Text size`],
  [R`aria-label="Textstorlek"`, R`aria-label="Text size"`],
  [R`<button class="knapp" id="omKnapp">Om kontoret</button>`, R`<button class="knapp" id="omKnapp">About the office</button>`],
  [R`href="agent-office.html" hreflang="en" lang="en" title="English version" aria-label="English version">`, R`href="agentkontoret.html" hreflang="sv" lang="sv" title="Svensk version" aria-label="Svensk version">`],
  [R`</svg>English</a>`, R`</svg>Svenska</a>`],
  [R`title="Helskärm" aria-label="Helskärm"`, R`title="Full screen" aria-label="Full screen"`],
  [R`aria-label="Stäng"`, R`aria-label="Close"`],
  [R`title="Klicka för att hoppa i tiden"`, R`title="Click to jump in time"`],
  [R`<h2>Dagens resultat</h2>`, R`<h2>Today's results</h2>`],
  [R`<h2>Just nu</h2>`, R`<h2>Right now</h2>`],
  [R`<h2>Händelselogg <small>klicka för att hoppa dit</small></h2>`, R`<h2>Event log <small>click to jump there</small></h2>`],
  [R`<h2>Så fungerar agentkontoret</h2>`, R`<h2>How the agent office works</h2>`],
  [R`<p>Fysiklabbet byggs av en lärare och ett team av AI-agenter. Varje figur i kontoret är en agent med en egen instruktionsfil under <code>.claude/agents/</code>: en egen roll, egna regler och egna verktyg. Ingen agent får publicera något på egen hand utan att passera granskningen.</p>`,
   R`<p>Fysiklabbet is built by a teacher and a team of AI agents. Each figure in the office is an agent with its own instruction file under <code>.claude/agents/</code>: its own role, its own rules and its own tools. No agent may publish anything on its own without passing review.</p>`],
  [R`<h3>Det här är inga påhittade händelser</h3>`, R`<h3>These events are not made up</h3>`],
  [R`<p>Allt som händer i kontoret spelas upp ur riktiga loggar från den valda dagen: Claude Codes sessionstranskript (varje delegering till en agent, varje verifierarkörning, commit och push), git-historiken och loggarna från de schemalagda jobben. Tiden på klockan är den verkliga tiden då det hände. Klockan går långsamt när något händer och spolar fram när kontoret är tyst.</p>`,
   R`<p>Everything that happens in the office is replayed from real logs from the chosen day: Claude Code's session transcripts (every delegation to an agent, every verifier run, commit and push), the git history and the logs from the scheduled jobs. The time on the clock is the real time when it happened. The clock runs slowly when something is happening and fast-forwards when the office is quiet.</p>
  <p>The site is Swedish, so commit messages and task titles are shown in Swedish, as they were written.</p>`],
  [R`<h3>Flödet</h3>`, R`<h3>The workflow</h3>`],
  [R`<li><b>Läraren</b> ger ett uppdrag. <b>Claude</b> (huvudagenten) tar det och delegerar delar till specialisterna: pedagogen granskar fysiken, korrekturläsaren språket, grafikern figurerna.</li>`,
   R`<li><b>The teacher</b> gives a task. <b>Claude</b> (the main agent) takes it and delegates parts to the specialists: the educator reviews the physics, the proofreader the language, the illustrator the figures.</li>`],
  [R`<li>Allt passerar <b>verifieringsslussen</b>, ett tjugotal automatiska kontroller av typografi, figurer, språk och sidstruktur, innan det sparas och pushas till <b>main</b>, som är den publicerade sajten.</li>`,
   R`<li>Everything passes through the <b>verification gate</b>, some twenty automatic checks of typography, figures, language and page structure, before it is saved and pushed to <b>main</b>, which is the published site.</li>`],
  [R`<li>Varje natt klockan 03.15 väcker <b>schemaläggaren</b> nyhetsredaktören, som skriver dagens fysiknyhet. <b>Utgivaren</b> granskar den mot originalstudien och fäller GODKÄND, RÄTTA FÖRST eller STOPPAD.</li>`,
   R`<li>Every night at 03:15 the <b>scheduler</b> wakes the news editor, who writes today's physics news. The <b>publisher</b> checks it against the original study and rules APPROVED, FIX FIRST or STOPPED.</li>`],
  [R`<li>Vid lunch och på kvällen publiceras inlägg på Facebook och Instagram. <b>SoMe-vakten</b> kontrollerar att de gått ut, kör om jobben och larmar annars.</li>`,
   R`<li>At lunchtime and in the evening, posts are published on Facebook and Instagram. The <b>social media watch</b> checks that they went out, reruns the jobs and raises an alarm otherwise.</li>`],
  [R`<li><b>Svarsagenten</b> och <b>nyhetsbrevsredaktören</b> skriver bara utkast. Det är alltid läraren som skickar.</li>`,
   R`<li>The <b>reply agent</b> and the <b>newsletter editor</b> only write drafts. It is always the teacher who sends.</li>`],
  [R`<p>Klicka på en figur för att läsa om den, eller i händelseloggen och tidslinjen för att hoppa i tiden.</p>`,
   R`<p>Click a figure to read about it, or click the event log or the timeline to jump in time.</p>`],
  [R`<button class="knapp aktiv">Stäng</button>`, R`<button class="knapp aktiv">Close</button>`],
  [R`<script src="agentkontoret.js?v=`, R`<script src="agent-office.js?v=`],
];

// ---------------------------------------------------------------------------
// JS: [svenska, engelska]. Längre och mer specifika först.
// ---------------------------------------------------------------------------
const JS = [
  [R`/*
 * agentkontoret.js — Fysiklabbets agenter i ett pixelkontor`, R`/*
 * agent-office.js: ENGELSK VERSION, GENERERAD. Redigera inte den här filen.
 * Ändra i agentkontoret.js och kör node .claude/oversatt-agentkontor-en.js.
 *
 * agentkontoret.js — Fysiklabbets agenter i ett pixelkontor`],
  [R`  const DATA = window.AGENTKONTOR || { dagar: {} };
`, R`  const DATA = window.AGENTKONTOR || { dagar: {} };
` + INJEKTION],

  // ---- rum ----
  [R`namn: 'Nyhetsredaktionen',`, R`namn: 'Newsroom',`],
  [R`{ id: 'utgivare', namn: 'Utgivaren',`, R`{ id: 'utgivare', namn: 'Publisher',`],
  [R`namn: 'Språkrummet',`, R`namn: 'Language room',`],
  [R`namn: 'Serverrummet · main',`, R`namn: 'Server room · main',`],
  [R`namn: 'Sociala medier',`, R`namn: 'Social media',`],
  [R`namn: 'Öppna kontoret',`, R`namn: 'Open-plan office',`],
  [R`namn: 'Utvecklingslabbet',`, R`namn: 'Development lab',`],
  [R`namn: 'Bildateljén',`, R`namn: 'Image studio',`],
  [R`namn: 'Postrummet',`, R`namn: 'Mail room',`],
  [R`namn: 'Mötesrummet',`, R`namn: 'Meeting room',`],

  // ---- figurer ----
  [R`larare: { namn: 'Läraren', roll: 'Människan i loopen',`, R`larare: { namn: 'Teacher', roll: 'The human in the loop',`],
  [R`text: 'Ger uppdragen, bedömer resultatet och är den enda som skickar mejl, svarar besökare och trycker på skicka för nyhetsbrevet. Agenterna skriver utkast, läraren beslutar.',`,
   R`text: 'Gives the tasks, judges the results and is the only one who sends emails, answers visitors and presses send on the newsletter. The agents write drafts, the teacher decides.',`],
  [R`fakta: [['Arbetar', 'När det finns tid mellan lektionerna']],`, R`fakta: [['Works', 'When there is time between lessons']],`],
  [R`nyhetsagent: { namn: 'Nyhetsredaktören', roll: 'Dagens fysiknyhet',`, R`nyhetsagent: { namn: 'News editor', roll: 'Today\'s physics news',`],
  [R`text: 'Väcks av schemaläggaren varje natt. Letar dagens nyhet hos Phys.org, Nature, Physics World och Quanta, läser originalstudien och skriver en artikel för gymnasieelever på svenska.',`,
   R`text: 'Woken by the scheduler every night. Looks for the day\'s news at Phys.org, Nature, Physics World and Quanta, reads the original study and writes an article in Swedish for upper secondary students.',`],
  [R`utgivare: { namn: 'Utgivaren', roll: 'Ansvarig utgivare',`, R`utgivare: { namn: 'Publisher', roll: 'Responsible publisher',`],
  [R`text: 'Oberoende slutgranskning innan en nyhet publiceras. Läser studiens sammanfattning och metoddel, kontrollerar varje siffra och varje citat och fäller GODKÄND, RÄTTA FÖRST eller STOPPAD.',`,
   R`text: 'Independent final review before a news article is published. Reads the study\'s abstract and methods, checks every number and every quote and rules APPROVED, FIX FIRST or STOPPED.',`],
  [R`korrekturlasare: { namn: 'Korrekturläsaren', roll: 'Språkgranskning',`, R`korrekturlasare: { namn: 'Proofreader', roll: 'Language review',`],
  [R`text: 'Läser meningarna högt för sig själv: anglicismer, felböjda verb, personifierade döda ting och klichéer. Rättar aldrig fakta och ändrar aldrig något utan att först visa vad som ska bytas.',`,
   R`text: 'Reads the sentences aloud to itself: anglicisms, wrongly inflected verbs, personified objects and clichés. Never corrects facts and never changes anything without first showing what is to be replaced.',`],
  [R`pedagog: { namn: 'Pedagogen', roll: 'Fysikgranskning',`, R`pedagog: { namn: 'Educator', roll: 'Physics review',`],
  [R`text: 'Fysiklärare i teamet. Granskar att fysiken stämmer i genomgångar, uppgifter och simuleringar, och att en gymnasieelev kan följa resonemanget.',`,
   R`text: 'The physics teacher on the team. Checks that the physics is right in lessons, exercises and simulations, and that an upper secondary student can follow the reasoning.',`],
  [R`grafik: { namn: 'Grafikern', roll: 'Figurer och scener',`, R`grafik: { namn: 'Illustrator', roll: 'Figures and scenes',`],
  [R`text: 'Ritar figurer, kraftpilar och simuleringsscener i SVG, Canvas och Three.js, efter husets regler för etiketter, kurvor och vinkelbågar.',`,
   R`text: 'Draws figures, force arrows and simulation scenes in SVG, Canvas and Three.js, following the house rules for labels, curves and angle arcs.',`],
  [R`webbdesigner: { namn: 'Webbdesignern', roll: 'Gränssnitt',`, R`webbdesigner: { namn: 'Web designer', roll: 'User interface',`],
  [R`text: 'Formger simuleringarnas gränssnitt: reglage, fullskärm, mobilvy och läsbarhet.',`, R`text: 'Designs the simulations\' interfaces: sliders, full screen, mobile view and readability.',`],
  [R`testare: { namn: 'Testaren', roll: 'Kvalitetskontroll',`, R`testare: { namn: 'Tester', roll: 'Quality control',`],
  [R`text: 'Provkör simuleringarna efter varje ändring och letar fel i fysik, gränssnitt och mobilvy.',`, R`text: 'Test-runs the simulations after every change and looks for errors in physics, interface and mobile view.',`],
  [R`fysikexpert: { namn: 'Fysikexperten', roll: 'Fysikgranskning på expertnivå',`, R`fysikexpert: { namn: 'Physics expert', roll: 'Expert physics review',`],
  [R`text: 'Granskar att fysiken är rätt, på en nivå över kursplanen: formler och härledningar, enheter, tecken, talvärden, förenklingar, kraftfigurer och simuleringarnas modell. Rapporterar fel med belägg men skriver aldrig om något själv.',`,
   R`text: 'Checks that the physics is right, at a level above the curriculum: formulas and derivations, units, signs, numerical values, simplifications, force diagrams and the models behind the simulations. Reports errors with evidence but never rewrites anything itself.',`],
  [R`matematiker: { namn: 'Matematikern', roll: 'Matematikgranskning',`, R`matematiker: { namn: 'Mathematician', roll: 'Mathematics review',`],
  [R`text: 'Räknar om varje steg i teori, övningar, pennlösningar och provlösningar: svar och facit, avrundning, notation, definitionsmängder och att metoden passar kursens nivå. Rapporterar fel men ändrar aldrig stil eller upplägg.',`,
   R`text: 'Recalculates every step in lessons, exercises, pen solutions and exam solutions: answers and answer keys, rounding, notation, domains and whether the method suits the course level. Reports errors but never changes style or structure.',`],
  [R`rostmanus: { namn: 'Röstmanusförfattaren', roll: 'Talmanus till lösningsfilmer',`, R`rostmanus: { namn: 'Voice script writer', roll: 'Voice-over scripts for solution videos',`],
  [R`text: 'Skriver det som berättarrösten säger i lösningsfilmerna, med all matematik i uttalad svenska så som en lärare säger den vid tavlan. Skriver aldrig text som eleven ska se.',`,
   R`text: 'Writes what the narrator says in the solution videos, with all the mathematics spelled out in spoken Swedish the way a teacher says it at the board. Never writes text that the student is meant to see.',`],
  [R`svar = e.utslag ? 'Utslag: ' + e.utslag : 'Fysiken är kontrollerad';`, R`svar = e.utslag ? 'Verdict: ' + e.utslag : 'The physics is checked';`],
  [R`svar = e.utslag ? 'Utslag: ' + e.utslag : 'Matematiken är kontrollerad';`, R`svar = e.utslag ? 'Verdict: ' + e.utslag : 'The mathematics is checked';`],
  [R`svar = 'Manuset är klart';`, R`svar = 'The script is ready';`],
  [R`'image-creator': { namn: 'Bildmakaren', roll: 'AI-bilder',`, R`'image-creator': { namn: 'Image maker', roll: 'AI images',`],
  [R`text: 'Tar fram bilder med Googles Gemini när det inte finns någon fri bild att använda, till exempel till en nyhetsartikel.',`,
   R`text: 'Creates images with Google\'s Gemini when there is no free image to use, for example for a news article.',`],
  [R`nyhetsbrev: { namn: 'Nyhetsbrevsredaktören', roll: 'Veckobrevet',`, R`nyhetsbrev: { namn: 'Newsletter editor', roll: 'The weekly newsletter',`],
  [R`modell: 'Molnrutin',`, R`modell: 'Cloud routine',`],
  [R`text: 'Skriver veckans nyhetsbrev som en schemalagd rutin i molnet. Lägger upp ett utkast i EmailOctopus, men skickar aldrig något själv.',`,
   R`text: 'Writes the weekly newsletter as a scheduled routine in the cloud. Uploads a draft to EmailOctopus, but never sends anything itself.',`],
  [R`svarsagent: { namn: 'Svarsagenten', roll: 'Svar till besökare',`, R`svarsagent: { namn: 'Reply agent', roll: 'Replies to visitors',`],
  [R`text: 'Skriver utkast till svar på mejl och på kommentarer i Facebook och Instagram. Publicerar aldrig något: utkastet går till läraren.',`,
   R`text: 'Drafts replies to emails and to comments on Facebook and Instagram. Never publishes anything: the draft goes to the teacher.',`],
  [R`roll: 'Kanalansvarig', hem: [40, 6, 'upp']`, R`roll: 'Channel manager', hem: [40, 6, 'upp']`],
  [R`roll: 'Kanalansvarig', hem: [44, 6, 'upp']`, R`roll: 'Channel manager', hem: [44, 6, 'upp']`],
  [R`text: 'Äger Facebooksidans riktlinjer. De dagliga inläggen (13.03 om dagens nyhet, 19.33 om nyheter på sajten) görs av schemalagda jobb som följer riktlinjerna.',`,
   R`text: 'Owns the guidelines for the Facebook page. The daily posts (13:03 about today\'s news, 19:33 about what\'s new on the site) are made by scheduled jobs that follow the guidelines.',`],
  [R`text: 'Äger Instagramkontots riktlinjer. Inläggen går ut 13.18 och 19.48 som schemalagda jobb, ofta med en inspelad film ur simuleringen.',`,
   R`text: 'Owns the guidelines for the Instagram account. The posts go out at 13:18 and 19:48 as scheduled jobs, often with a video recorded from a simulation.',`],
  [R`sitemap: { namn: 'Sitemap-roboten',`, R`sitemap: { namn: 'Sitemap robot',`],
  [R`text: 'Kör varje timme på GitHub. Bygger om RSS-flödet och webbplatskartan när en datumgrindad nyhet blir synlig, så att Google hittar den.' },`,
   R`text: 'Runs every hour on GitHub. Rebuilds the RSS feed and the sitemap when a date-gated news article becomes visible, so that Google finds it.' },`],
  [R`vakt: { namn: 'SoMe-vakten', roll: 'Bevakning',`, R`vakt: { namn: 'Social media watch', roll: 'Monitoring',`],
  [R`text: 'Kontrollerar klockan 14 och 21 att dagens inlägg gått ut på Facebook och Instagram. Kör om jobb som fallit och larmar om det ändå saknas.' },`,
   R`text: 'Checks at 14:00 and 21:00 that the day\'s posts have gone out on Facebook and Instagram. Reruns jobs that failed and raises an alarm if a post is still missing.' },`],
  [R`servervakt: { namn: 'Servervakten', roll: 'Utvecklingsservern',`, R`servervakt: { namn: 'Server watch', roll: 'The development server',`],
  [R`text: 'Tittar var femte minut att utvecklingsservern på datorn svarar, så att sidorna alltid kan provas innan de pushas.' },`,
   R`text: 'Checks every five minutes that the development server on the computer responds, so that pages can always be tried out before they are pushed.' },`],
  [R`namn: 'Claude', roll: 'Huvudagent',`, R`namn: 'Claude', roll: 'Main agent',`],
  [R`text: 'Tar emot lärarens uppdrag, läser projektets regler i CLAUDE.md och delegerar delar till specialisterna. Kör verifierarna, sparar och pushar till main. Flera Claude kan arbeta samtidigt i var sin session.',`,
   R`text: 'Receives the teacher\'s tasks, reads the project rules in CLAUDE.md and delegates parts to the specialists. Runs the verifiers, saves and pushes to main. Several Claudes can work at the same time, each in its own session.',`],
  [R`const HJALP = { namn: 'Hjälpagent', roll: 'Tillfällig agent',`, R`const HJALP = { namn: 'Helper agent', roll: 'Temporary agent',`],
  [R`text: 'En tillfällig agent som Claude skickar ut för en avgränsad utredning, till exempel att söka igenom kodbasen eller läsa in material, parallellt med huvudarbetet.',`,
   R`text: 'A temporary agent that Claude sends out for a limited investigation, for example searching the codebase or reading up on material, in parallel with the main work.',`],

  // ---- handlingar och repliker ----
  [R`saga(f, 'Kaffe', 1300, null, true);`, R`saga(f, 'Coffee', 1300, null, true);`],
  [R`'Uppdrag från läraren'`, R`'Task from the teacher'`],
  [R`'Jag har ett nytt uppdrag till dig' : 'Nytt uppdrag: ' + e.rubrik`, R`'I have a new task for you' : 'New task: ' + e.rubrik`],
  [R`bubbla(figur, 'Jag tar det!', 1500)`, R`bubbla(figur, 'I\'m on it!', 1500)`],
  [R`const vad = j === 'nyhet' ? 'Dags för dagens fysiknyhet' : /lansering/.test(j) ? 'Dags att berätta om nytt på sajten' : j === 'some-rapport' ? 'Dags för månadsrapporten' : 'Dags för dagens inlägg';`,
   R`const vad = j === 'nyhet' ? 'Time for today\'s physics news' : /lansering/.test(j) ? 'Time to tell people what\'s new on the site' : j === 'some-rapport' ? 'Time for the monthly report' : 'Time for today\'s post';`],
  [R`saga(f, 'Dagens nyhet är publicerad!', 2200, '#2f5d9e');`, R`saga(f, 'Today\'s news is published!', 2200, '#2f5d9e');`],
  [R`'Inlägget är ute på Facebook' : 'Inlägget är ute på Instagram'`, R`'The post is out on Facebook' : 'The post is out on Instagram'`],
  [R`saga(f, 'Jobbet avbröts', 2000, '#b03a3a');`, R`saga(f, 'The job was cancelled', 2000, '#b03a3a');`],
  [R`saga(f, 'Klart!', 1300);`, R`saga(f, 'Done!', 1300);`],
  [R`saga(f, 'Läser nyhetsflödena', 1600);`, R`saga(f, 'Reading the news feeds', 1600);`],
  [R`saga(f, 'Läser källor på nätet', 1400);`, R`saga(f, 'Reading sources online', 1400);`],
  [R`status(f, 'Läser källor');`, R`status(f, 'Reading sources');`],
  [R`'Loggar in och skriver inlägget' : 'Provar sidan i webbläsaren'`, R`'Logging in and writing the post' : 'Trying the page in the browser'`],
  [R`saga(f, 'Bygger ' + e.vad, 1700);`, R`saga(f, 'Building ' + e.vad, 1700);`],
  [R`bubbla(F['image-creator'], 'Fin motiv!', 1500)`, R`bubbla(F['image-creator'], 'Nice motif!', 1500)`],
  [R`saga(f, 'Genererar en bild med Gemini', 1800);`, R`saga(f, 'Generating an image with Gemini', 1800);`],
  [R`saga(f, 'Sparar: ' + e.text, 2200, '#8a5a36');`, R`saga(f, 'Saving: ' + e.text, 2200, '#8a5a36');`],
  [R`effekt.sajtText = 'uppdaterad ' + tid(simT);`, R`effekt.sajtText = 'updated ' + tid(simT);`],
  [R`saga(f, 'Pushar till main', 1400, '#c0392b');`, R`saga(f, 'Pushing to main', 1400, '#c0392b');`],
  [R`const namn = { 'brev-till-octopus': 'Lägger upp nyhetsbrevet i EmailOctopus', 'granska-fysik': 'Kör fysikgranskningen', 'ny-simulering': 'Följer receptet för ny simulering', 'some-rapport': 'Skriver månadsrapporten' }[e.namn] || ('Följer instruktionen ' + e.namn);`,
   R`const namn = { 'brev-till-octopus': 'Uploading the newsletter to EmailOctopus', 'granska-fysik': 'Running the physics review', 'ny-simulering': 'Following the recipe for a new simulation', 'some-rapport': 'Writing the monthly report' }[e.namn] || ('Following the instruction ' + e.namn);`],
  [R`saga(V, 'LARM: ' + e.text, 3200, '#b03a3a');`, R`saga(V, 'ALARM: ' + e.text, 3200, '#b03a3a');`],
  [R`saga(R, 'Bygger om RSS och sitemap', 1800);`, R`saga(R, 'Rebuilding RSS and sitemap', 1800);`],
  [R`effekt.sajtText = 'nytt flöde ' + tid(simT);`, R`effekt.sajtText = 'new feed ' + tid(simT);`],
  [R`namn: 'Claude i molnet', poff: 1`, R`namn: 'Claude in the cloud', poff: 1`],
  [R`const kort = e.text || 'Kan du titta på det här?';`, R`const kort = e.text || 'Could you take a look at this?';`],
  [R`bubbla(A, 'Jag tar det', 1400);`, R`bubbla(A, 'I\'ll take it', 1400);`],
  [R`let svar = 'Klart, här är min granskning';`, R`let svar = 'Done, here is my review';`],
  [R`svar = e.utslag ? 'Utslag: ' + e.utslag : 'Granskningen är klar'; farg = e.utslag === 'GODKÄND'`, R`svar = e.utslag ? 'Verdict: ' + e.utslag : 'The review is done'; farg = e.utslag === 'APPROVED'`],
  [R`svar = 'Här är ett utkast. Du skickar.';`, R`svar = 'Here is a draft. You send it.';`],
  [R`svar = 'Språket är granskat';`, R`svar = 'The language is reviewed';`],
  [R`svar = 'Fysiken är granskad';`, R`svar = 'The physics is reviewed';`],
  [R`svar = 'Figurerna är klara';`, R`svar = 'The figures are ready';`],
  [R`svar.replace(/^Utslag: /, '')`, R`svar.replace(/^Verdict: /, '')`],
  [R`status(f, 'Väntar på ' + A.namn.toLowerCase());`, R`status(f, 'Waiting for ' + ` + VEM + R`);`],
  [R`saga(f, 'Hjälpagent: ' + e.text, 1800);`, R`saga(f, 'Helper agent: ' + e.text, 1800);`],
  [R`saga(H1, 'Klart!', 1100);`, R`saga(H1, 'Done!', 1100);`],
  [R`'Rött först, rättat och grönt nu' : 'Rött! Måste rätta'`, R`'Red at first, fixed and green now' : 'Red! Must fix'`],
  ["`${antal} kontroller, alla gröna` : 'Grönt'", "`${antal} checks, all green` : 'Green'"],

  // ---- händelseloggen ----
  [R`text: 'Schemaläggaren väcker nyhetsredaktören',`, R`text: 'The scheduler wakes the news editor',`],
  [R`text: 'Schemalagt jobb: ' + e.rubrik, farg: f['facebook-agent']`, R`text: 'Scheduled job: ' + e.rubrik, farg: f['facebook-agent']`],
  [R`text: 'Schemalagt jobb: ' + e.rubrik, farg: f['instagram-agent']`, R`text: 'Scheduled job: ' + e.rubrik, farg: f['instagram-agent']`],
  [R`'Läraren ger Claude ett nytt uppdrag' : 'Läraren ger Claude ett uppdrag: ' + e.rubrik`, R`'The teacher gives Claude a new task' : 'The teacher gives Claude a task: ' + e.rubrik`],
  [R`text: 'Dagens nyhet är publicerad',`, R`text: 'Today\'s news is published',`],
  [R`: 'Jobbet för ' + (e.jobb[0] === 'f' ? 'Facebook' : 'Instagram') + ' avbröts',`, R`: 'The ' + (e.jobb[0] === 'f' ? 'Facebook' : 'Instagram') + ' job was cancelled',`],
  ["text: `${sessNamn(e)} ber ${A ? A.namn.toLowerCase() : e.agent}: ${e.text}`", "text: `${sessNamn(e)} asks ${A ? " + VEM + " : e.agent}: ${e.text}`"],
  ["text: `${sessNamn(e)} skickar ut en hjälpagent: ${e.text}`", "text: `${sessNamn(e)} sends out a helper agent: ${e.text}`"],
  ["text: `Verifieringsslussen: ${antal} ${antal === 1 ? 'kontroll' : 'kontroller'}${roda ? `, ${roda} röd${roda > 1 ? 'a' : ''}` : ', alla gröna'}`",
   "text: `Verification gate: ${antal} ${antal === 1 ? 'check' : 'checks'}${roda ? `, ${roda} red` : ', all green'}`"],
  [R`text: 'Bygger ' + e.vad,`, R`text: 'Building ' + e.vad,`],
  [R`text: 'En bild genereras med Gemini',`, R`text: 'An image is generated with Gemini',`],
  [R`text: 'Sparar: ' + e.text,`, R`text: 'Saving: ' + e.text,`],
  [R`text: 'Pushar till main, sajten uppdateras',`, R`text: 'Pushing to main, the site is updated',`],
  ["text: `${sessNamn(e)} följer instruktionen ${e.namn}`", "text: `${sessNamn(e)} follows the instruction ${e.namn}`"],
  [R`(e.larm ? 'LARM: ' : 'SoMe-vakten: ')`, R`(e.larm ? 'ALARM: ' : 'Social media watch: ')`],
  [R`text: 'Sitemap-roboten: ' + e.text,`, R`text: 'Sitemap robot: ' + e.text,`],
  [R`text: 'Nyhetsbrevsrutinen i molnet: ' + e.text,`, R`text: 'Newsletter routine in the cloud: ' + e.text,`],
  [R`text: 'Claude i molnet: ' + e.text,`, R`text: 'Claude in the cloud: ' + e.text,`],
  [R`text: 'Nyhetsredaktören läser källor',`, R`text: 'The news editor reads sources',`],

  // ---- scenens skyltar ----
  [R`'SCHEMALÄGGAREN'`, R`'SCHEDULER'`],
  [R`'VERIFIERINGSSLUSSEN'`, R`'VERIFICATION GATE'`],
  [R`'BYGGET'`, R`'BUILD'`],
  [R`'SAJTEN'`, R`'THE SITE'`],
  [R`(sista.fel ? 'Rött: ' : 'Grönt: ')`, R`(sista.fel ? 'Red: ' : 'Green: ')`],

  // ---- sidopanelen ----
  [R`const KPI_DEF = [['nyheter', 'nyhet publicerad', 'nyheter publicerade'], ['utgivare', 'utgivarbeslut', 'utgivarbeslut'], ['delegeringar', 'uppdrag till agenter', 'uppdrag till agenter'], ['verifieringar', 'automatiska kontroller', 'automatiska kontroller'],
    ['roda', 'röd kontroll', 'röda kontroller'], ['commits', 'sparad ändring', 'sparade ändringar'], ['pushar', 'push till main', 'pushar till main'], ['inlagg', 'inlägg i sociala medier', 'inlägg i sociala medier']];`,
   R`const KPI_DEF = [['nyheter', 'news article published', 'news articles published'], ['utgivare', 'publisher decision', 'publisher decisions'], ['delegeringar', 'task for agents', 'tasks for agents'], ['verifieringar', 'automatic check', 'automatic checks'],
    ['roda', 'red check', 'red checks'], ['commits', 'saved change', 'saved changes'], ['pushar', 'push to main', 'pushes to main'], ['inlagg', 'social media post', 'social media posts']];`],
  [R`'<li class="nu-tom">Tyst i kontoret. Klockan spolar fram till nästa händelse.</li>'`, R`'<li class="nu-tom">Quiet in the office. The clock fast-forwards to the next event.</li>'`],
  [R`fakta.push(['Instruktioner',`, R`fakta.push(['Instructions',`],
  [R`fakta.push(['Modell',`, R`fakta.push(['Model',`],
  [R`fakta.push(['Just nu',`, R`fakta.push(['Right now',`],
  [R`fakta.push(['Uppdrag i dag',`, R`fakta.push(['Tasks today',`],
  [R`toLocaleDateString('sv-SE',`, R`toLocaleDateString('en-GB',`],
  [R`setAttribute('aria-label', v ? 'Pausa' : 'Spela')`, R`setAttribute('aria-label', v ? 'Pause' : 'Play')`],
  [R`const textEtikett = v => String(Math.round(v * 100) / 100).replace('.', ',') + '×';`, R`const textEtikett = v => String(Math.round(v * 100) / 100) + '×';`],
  [R`'<li class="nu-tom">Inget data. Kör node .claude/bygg-agentkontor.js</li>'`, R`'<li class="nu-tom">No data. Run node .claude/bygg-agentkontor.js</li>'`],
  [R`'Loggarna lästes in ' + DATA.genererad + '.'`, R`'Logs read on ' + DATA.genererad + '. Commit messages and task titles are shown in Swedish, as they were written.'`],
];

// ---------------------------------------------------------------------------
function oversatt(kallNamn, malNamn, par) {
  const kalla = path.join(ROT, 'utkast', kallNamn);
  const ra = fs.readFileSync(kalla, 'utf8');
  const CRLF = ra.includes('\r\n');
  let s = ra.replace(/\r\n/g, '\n');
  const saknas = [];
  for (const [sv, en] of par) {
    if (!s.includes(sv)) { saknas.push(sv.slice(0, 100)); continue; }
    s = s.split(sv).join(en);
  }
  if (saknas.length) {
    console.error('Hittade inte ' + saknas.length + ' svenska texter i ' + kallNamn + ' (har filen ändrats?):');
    saknas.forEach(t => console.error('  - ' + t.replace(/\n/g, ' ')));
    process.exit(1);
  }
  return { s, CRLF, mal: path.join(ROT, 'utkast', malNamn) };
}

// Kvarvarande svenska? Kommentarer och ordlistan räknas inte.
const MISSTANKT = /[åäöÅÄÖ]|\b(och|inte|till|från|för|med|Jag|Klart|Kaffe|Dags|Sparar|Bygger|Pushar|Läser|ber|skickar|uppdrag|Uppdrag|Nytt|kontroller|Väntar|LARM|Utslag|Instruktioner|Modell|Tyst|Inget|Loggarna|uppdaterad|nytt|Stäng|Nästa|Pausa|Spela|Helskärm|Textstorlek|kontoret|Agentkontoret)\b/;
function kontrollera(namn, s, arJs) {
  let t = s.replace(/\/\/ ---- EN-ORDLISTA START[\s\S]*?\/\/ ---- EN-ORDLISTA SLUT ----/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/[;,)}{]\s*\/\/ .*$/gm, '');
  const traffar = [];
  t.split('\n').forEach((rad, i) => {
    let text;
    if (arJs || /^\s*(const|let|var|function|if|for|\}|\{|\$|ctx|c\.|rect)/.test(rad)) {
      // Bara stränglitteraler; enordsidentifierare som 'nyhet' får vara kvar.
      text = (rad.replace(/\$\{[^}]*\}/g, ' ').match(/'[^']*'|`[^`]*`|"[^"]*"/g) || [])
        .filter(x => !/^['"`][a-z0-9_.-]*['"`]$/.test(x)).join(' ');
    } else {
      text = rad.replace(/<(style|script)[\s\S]*?<\/\1>/g, '')
        .replace(/\b(id|for|class|href|src|data-[a-z-]+|lang|hreflang)="[^"]*"/g, '')
        .replace(/<[^>]+?(title|aria-label|content|placeholder)="([^"]*)"[^>]*>/g, ' $2 ')
        .replace(/<[^>]+>/g, ' ');
    }
    if (MISSTANKT.test(text)) traffar.push(namn + ':' + (i + 1) + ': ' + rad.trim().slice(0, 150));
  });
  return traffar;
}

const html = oversatt('agentkontoret.html', 'agent-office.html', HTML);
const js = oversatt('agentkontoret.js', 'agent-office.js', JS);

// CSS och skript i HTML-filen granskas inte som text.
const htmlUtanKod = html.s.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<script[\s\S]*?<\/script>/g, '');
const traffar = [...kontrollera('agent-office.html', htmlUtanKod, false), ...kontrollera('agent-office.js', js.s, true)];

// Har byggskriptet fått en ny verifierare eller rubrik som saknar översättning?
const BYGG = path.join(__dirname, 'bygg-agentkontor.js');
if (fs.existsSync(BYGG)) {
  const b = fs.readFileSync(BYGG, 'utf8');
  const ver = (b.match(/const VERIFIERARE = \{([\s\S]*?)\};/) || [, ''])[1];
  const namn = [...ver.matchAll(/:\s*'([^']+)'/g)].map(m => m[1]);
  const rubriker = [...b.matchAll(/rubrik = (?:[^;]*?\? )?'([^']+)'(?: : '([^']+)')?;/g)].flatMap(m => [m[1], m[2]]).filter(Boolean);
  const vad = [...b.matchAll(/typ: 'bygg', vad: '([^']+)'/g)].map(m => m[1]);
  for (const t of [...namn, ...rubriker, ...vad]) if (!(t in EN_ORD)) traffar.push('bygg-agentkontor.js: saknar översättning i EN_ORD: ' + t);
}

if (traffar.length) {
  console.error('Svensk text kvar i den engelska versionen:');
  traffar.forEach(t => console.error('  ' + t));
  process.exit(1);
}
for (const { s, CRLF, mal } of [html, js]) {
  fs.writeFileSync(mal, CRLF ? s.replace(/\n/g, '\r\n') : s);
  console.log('Skrev ' + path.relative(process.cwd(), mal));
}
console.log((HTML.length + JS.length) + ' översatta texter, ' + Object.keys(EN_ORD).length + ' ord i ordlistan.');
