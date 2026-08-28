// Fysiklabbet — delat sökindex för sökrutan (index.html, katalog.html,
// simuleringar.html).
//
// Varje avsnitt i data/katalog.js expanderas till flera sökträffar:
//   • en TEORI-rad (alltid), som pekar in i katalogen, och
//   • en SIMULERING-rad PER simulering som avsnittet har.
//
// Namnen på simuleringarna kommer från data/simuleringar.js (SIM_NAMES). Ett
// avsnitt med två fristående simuleringar (t.ex. 7.1 "Laddning och influens"
// → "Elektrisk influens" + "Bandgeneratorn") ger alltså EN rad per simulering,
// med simuleringens eget namn, egen beskrivning och egen länk — annars går den
// andra simuleringen inte att hitta via sökrutan.
//
// Nyckelord: har avsnittet EN simulering ärver simuleringen avsnittets
// keywords. Har avsnittet FLERA simuleringar ärvs de INTE — då skulle en
// sökning på "bandgenerator" också träffa "Elektrisk influens". Ge i stället
// varje simulering egna nyckelord med `kw: [...]` i data/simuleringar.js.
//
// Kräver att data/katalog.js och data/simuleringar.js har laddats först.

(function () {
  const KF = window.KATALOG_FLAT || [];
  const SIM_NAMES = window.SIM_NAMES || {};

  // Kurskod för hash/id — 'Fysik nivå 1' → 'fy1', 'Matematik nivå 1c' → 'ma1c'
  function courseCode(courseName) {
    if (courseName === 'Fysik nivå 1') return 'fy1';
    if (courseName === 'Fysik nivå 2') return 'fy2';
    if (courseName === 'Matematik nivå 1b') return 'ma1b';
    if (courseName === 'Matematik nivå 1c') return 'ma1c';
    if (courseName === 'Matematik nivå 2c') return 'ma2c';
    if (courseName === 'Matematik fortsättning nivå 1c') return 'ma3c';
    if (courseName === 'Matematik fortsättning nivå 2') return 'ma4';
    return null;
  }

  const normalize = (text) => String(text).toLowerCase()
    .replace(/\*/g, '')
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    .replace(/é/g, 'e').replace(/è/g, 'e');

  // En teorisektion (med href) → en eller flera simuleringsposter, namngivna
  // efter vad simuleringen visar. Saknas namn används avsnittstiteln.
  function simEntries(section) {
    if (!section.href) return [];
    const v = SIM_NAMES[section.href];
    const items = v == null ? [section.title] : (Array.isArray(v) ? v : [v]);
    const out = items.map(it => (typeof it === 'string')
      ? { name: it, desc: section.description, href: section.href, num: section.num, kw: null }
      : {
          name: it.name,
          desc: it.desc || section.description,
          href: it.href || section.href,
          num: section.num,
          kw: it.kw || null,
        });
    // Skyddsnät: en andra eller tredje simulering (href2/href3) som saknar
    // post i SIM_NAMES ska ändå komma med i listan/sökningen.
    for (const extra of [section.href2, section.href3]) {
      if (extra && !out.some(s => s.href === extra)) {
        out.push({ name: section.title, desc: section.description, href: extra,
                   num: section.num, kw: null });
      }
    }
    return out;
  }

  const index = [];
  for (const section of KF) {
    const code = courseCode(section.course) || 'fy1';
    const sectionWords = [section.title, section.description, section.course,
      section.chapter].concat(section.keywords || []).join(' ');

    // Enhetskollavsnitten (num 'K.E') har ingen teoritext — bara quizet.
    // De får därför ingen TEORI-rad, enbart sin Enhetskoll-rad nedan.
    const arEnhetskoll = String(section.num).endsWith('.E');

    if (!arEnhetskoll) index.push({
      kind: 'teori',
      kindLabel: 'Teori',
      title: section.title,
      description: section.description,
      course: section.course,
      num: section.num,
      icon: section.icon,
      resultHref: 'katalog.html#' + code + '-' + section.num,
      hay: normalize(sectionWords),
    });

    const sims = simEntries(section);
    const flera = sims.length > 1;
    for (const s of sims) {
      const ownWords = [s.name, s.desc, section.course, section.chapter]
        .concat(s.kw || []).join(' ');
      index.push({
        kind: 'sim',
        // Kapitelsammanfattningarna länkar till repetitionsspelet och
        // enhetskollavsnitten till enhetskollen, inte till en simulering —
        // de får sina egna etiketter i träfflistan.
        kindLabel: s.href.indexOf('fysik-repetition.html') === 0 ? 'Repetition'
          : s.href.indexOf('fysik-enhetskoll.html') === 0 ? 'Enhetskoll'
          : 'Simulering',
        title: s.name,
        description: s.desc,
        course: section.course,
        num: section.num,
        icon: section.icon,
        resultHref: s.href,
        hay: normalize(flera ? ownWords : ownWords + ' ' + sectionWords),
      });
    }
  }

  // Begreppsordlistan (data/begrepp.js) — ett uppslagsord = en sökrad, så att
  // "supraledare" eller "kvasar" hittas även när inget avsnitt heter så.
  // Laddas begrepp.js inte på sidan hoppas raderna helt enkelt över.
  for (const b of (window.BEGREPP || [])) {
    if (!b || !b.id) continue;
    index.push({
      kind: 'begrepp',
      kindLabel: 'Begrepp',
      title: b.term,
      description: b.kort,
      course: 'Ordlista',
      num: '',
      icon: null,
      resultHref: 'begrepp.html?ord=' + encodeURIComponent(b.id),
      hay: normalize([b.term, b.kort].concat(b.former || []).join(' ')),
    });
  }

  function search(query) {
    const q = normalize(String(query || '').trim());
    if (!q) return [];
    const terms = q.split(/\s+/).filter(t => t.length > 0);
    if (terms.length === 0) return [];
    return index.filter(e => terms.every(t => e.hay.indexOf(t) !== -1));
  }

  window.SOK_INDEX = index;
  window.SOK_SEARCH = search;
  window.SIM_ENTRIES = simEntries;
  window.SOK_COURSE_CODE = courseCode;
})();
