// Gemensam regel för hårt mellanslag mellan mätetal och enhet. Används av
// .claude/verify-nbsp-enhet.js (granskning och lagning av data/*.js och
// HTML-sidorna) och av data/teori/build.js (teorins md-filer, vid bygget).
//
// Ett vanligt mellanslag mellan "10" och "meter" låter webbläsaren bryta
// raden där, så att talet står sist på en rad och enheten först på nästa
// (påpekat 2026-11-12, Exempel 1 i fy2-2.13). Mellanslaget ska vara U+00A0.

// Enheterna. Ordningen spelar ingen roll; alternativen sorteras längst först.
const ENHETER = [
  // längd, area, volym
  'm', 'cm', 'mm', 'km', 'dm', 'nm', 'μm', 'µm', 'pm', 'fm', 'm²', 'cm²', 'mm²', 'km²', 'dm²', 'm³', 'cm³', 'dm³', 'mm³',
  'meter', 'metern', 'kilometer', 'centimeter', 'millimeter', 'decimeter', 'nanometer', 'mikrometer',
  'mil', 'ljusår', 'AE', 'liter', 'litern', 'dl', 'ml', 'cl', 'kvadratmeter', 'kubikmeter',
  // tid
  's', 'ms', 'μs', 'µs', 'ns', 'min', 'h', 'sekund', 'sekunder', 'sekunden', 'sekunderna', 'minut', 'minuter', 'minuterna',
  'timme', 'timmar', 'timmen', 'timmarna', 'dygn', 'dygnet',
  // massa
  'kg', 'g', 'mg', 'μg', 'µg', 'ton', 'gram', 'kilogram', 'u',
  // mekanik och energi
  'N', 'kN', 'MN', 'mN', 'Nm', 'J', 'kJ', 'MJ', 'GJ', 'TJ', 'W', 'kW', 'MW', 'GW', 'TW', 'mW', 'kWh', 'MWh', 'GWh', 'TWh', 'Wh',
  'Pa', 'kPa', 'hPa', 'MPa', 'GPa', 'bar', 'mbar', 'newton', 'joule', 'watt', 'pascal', 'kilowattimmar', 'kilowattimme',
  'm/s', 'm/s²', 'km/h', 'km/s', 'cm/s', 'mm/s', 'N/kg', 'N/m', 'kg/m³', 'g/cm³', 'kg/dm³', 'g/dm³', 'kg·m/s', 'Ns', 'N·s',
  'rad/s', 'varv/s', 'varv/min', 'Hz', 'kHz', 'MHz', 'GHz', 'hertz',
  // värme
  '°C', '°F', 'K', 'grader', 'J/(kg·K)', 'J/kg', 'kJ/kg', 'J/K',
  // el och magnetism
  'V', 'kV', 'mV', 'MV', 'A', 'mA', 'kA', 'μA', 'µA', 'Ω', 'kΩ', 'MΩ', 'C', 'mC', 'μC', 'µC', 'nC', 'μF', 'µF', 'nF', 'pF', 'mF',
  'T', 'mT', 'μT', 'µT', 'nT', 'Wb', 'Ah', 'mAh', 'volt', 'ampere', 'ohm', 'coulomb', 'tesla', 'V/m', 'N/C', 'Ωm', 'Ω·m',
  // atom- och kärnfysik, strålning, ljud
  'eV', 'keV', 'MeV', 'GeV', 'TeV', 'Bq', 'kBq', 'MBq', 'Gy', 'mGy', 'Sv', 'mSv', 'μSv', 'µSv', 'dB',
  // vinkel, pengar, procent
  '°', 'rad', 'kr', 'kronor', 'procent', 'procentenheter', 'öre', '%', '‰',
];
const esc = s => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const ALT = [...new Set(ENHETER)].sort((a, b) => b.length - a.length).map(esc).join('|');
const SLUT = '(?![\\p{L}\\p{N}_²³])';  // enheten får inte fortsätta som ett ord ("5 mars", "3 grupper")

// "2 500 meter": tusentalsgruppernas mellanslag framför en enhet
const GRUPP_RE = new RegExp('(?<![\\d,.])(\\d{1,3})((?: \\d{3})+)(?=[ \\u00a0](?:' + ALT + ')' + SLUT + ')', 'gu');
// tal (eventuellt en tiopotens "10<sup>27</sup>") + ETT vanligt mellanslag + enhet
const UNIT_RE = new RegExp('(\\d(?:</sup>)?) (' + ALT + ')' + SLUT, 'gu');

// Träffar som oftast INTE är mått: en bokstav efter ett nummer på en uppgift,
// ett alternativ, en lampa eller en punkt ("uppgift 3 C", "alternativ 2 A").
function arFalskTraff(text, idx, enhet, matchLen) {
  const efter = text.slice(idx + matchLen, idx + matchLen + 1);
  if (/^[A-Z]$/.test(enhet) && /^[)\]]/.test(efter)) return true;
  // talet är slutet på ett namn i kod (i2 % 2, x1 m): ingen mätning
  const start = text.slice(0, idx + 1).search(/[\d,]+$/);
  if (start > 0 && /[A-Za-z_]/.test(text[start - 1])) return true;
  const fore = text.slice(Math.max(0, idx - 30), idx + 1);
  return /(uppgift|uppgifterna|fråga|frågorna|kapitel|avsnitt|nivå|alternativ|alternativen|punkt|punkterna|sida|figur|exempel|nr|nummer|steg|lampa|lamporna|rad|kolumn|grupp|version|del|bild)\s*[\d,]+$/i.test(fore);
}

// Delar av en rad som aldrig ska röras: inline-matte, attributvärden
// (banornas "10 L 20" och "26 s 6" är inga enheter) och webbadresser.
const SKYDD = [
  /\$\$[\s\S]*?\$\$/g,
  /\$[^$\n]*?\$/g,
  /\b(?:d|points|viewBox|transform|style|class|className|href|src|id|data-[\w-]+|font-family|stroke-dasharray|x|y|x1|x2|y1|y2|cx|cy|r|rx|ry|width|height|offset|values|keyTimes|keySplines|from|to|by|dur|begin|path|gradientTransform|preserveAspectRatio)\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}\n]*\})/g,
  // samma attribut som nycklar i JS-objekt: el('path', { d: 'M 0 40 C 2 8 …' })
  /\b(?:d|points|viewBox|transform|path|dasharray|strokeDasharray)\s*:\s*(?:"[^"]*"|'[^']*'|`[^`]*`)/g,
  // JSX-banor: d={`M ${x} ${y} c -6 -10 6 -16 0 -26 s 6 …`}
  /\b(?:d|points|transform|viewBox)\s*=\s*\{\s*`[^`]*`\s*\}/g,
  /https?:\/\/\S+/g,
];

function laga(text) {
  const skydd = [];
  for (const re of SKYDD) {
    re.lastIndex = 0; let m;
    while ((m = re.exec(text))) skydd.push([m.index, m.index + m[0].length]);
  }
  const iSkydd = i => skydd.some(([a, b]) => i >= a && i < b);
  const traffar = [];
  text = text.replace(GRUPP_RE, (hel, forsta, grupper, idx) => {
    if (iSkydd(idx + forsta.length)) return hel;
    traffar.push(idx);
    return forsta + grupper.replace(/ /g, ' ');
  });
  const ut = text.replace(UNIT_RE, (hel, tal, enhet, idx) => {
    const mellan = idx + tal.length;
    if (iSkydd(mellan)) return hel;
    if (arFalskTraff(text, idx, enhet, hel.length)) return hel;
    traffar.push(mellan);
    return tal + ' ' + enhet;
  });
  return { ut, traffar };
}

module.exports = { UNIT_RE, GRUPP_RE, laga, ENHETER };
