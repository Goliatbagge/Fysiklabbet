/*
 * Fysiklabbet — Laborans-komponenter (React).
 *
 * Laddas via <script type="text/babel" data-presets="react" src="js/laborans.js">.
 * Exponerar window.LAB med alla delade komponenter:
 *   LAB.Topbar, LAB.Header, LAB.Breadcrumb, LAB.SearchBar,
 *   LAB.Updates, LAB.Catalog, LAB.Footer,
 *   LAB.WelcomeHero, LAB.CatalogHeader, LAB.MathematicsPlaceholder
 *
 * Använder window.KATALOG och window.KATALOG_FLAT från data/katalog.js.
 */

(function () {
    const { useState, useEffect, useMemo, useRef } = React;
    const K = window.KATALOG;
    const KF = window.KATALOG_FLAT;

    // Senaste uppdateringar — uppdatera vid ny simulering (max 4 poster, äldsta tas bort)
    const UPDATES = [
        { date: '2026-04-26', href: 'fysik1-newtons-gravitationslag.html', title: 'Newtons gravitationslag', text: 'Utforska kraften mellan två kroppar med interaktiva massor, kraftpilar och en människa på jordytan som visar tredje lagen.' },
        { date: '2026-04-24', href: 'fysik2-energinivaer.html', title: 'Energinivåer', text: 'Bohrs atommodell för väte med animerade elektronhopp, fotonemission med rätt våglängd och Lyman-, Balmer- och Paschen-serierna.' },
        { date: '2026-04-21', href: 'fysik2-spektrallinjer.html', title: 'Spektrallinjer', text: 'Utforska varje grundämnes unika fingeravtryck av ljus. Växla mellan emissions- och absorptionsspektrum och sök i periodiska systemet.' },
        { date: '2026-04-20', href: 'fysik2-fotoelektrisk-effekt.html', title: 'Fotoelektrisk effekt', text: 'Skjut ljusvågor mot en metallyta och se hur fotonens energi avgör om elektroner frigörs, precis som Einstein förutsade.' },
    ];

    // Normalisera svenska tecken så "karnfysik" matchar "kärnfysik"
    const normalize = (text) => text.toLowerCase()
        .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
        .replace(/é/g, 'e').replace(/è/g, 'e');

    // Förberäknade haystacks per simulering för snabb filtrering
    const HAYSTACKS = KF.map(sim =>
        normalize([sim.title, sim.description, sim.course, sim.chapter, ...(sim.keywords || [])].join(' '))
    );

    function Topbar() {
        return (
            <div className="lab-topbar">
                <div className="lab-topbar-inner">
                    <span>FYSIKLABBET — KATALOG ÖVER INTERAKTIVA EXPERIMENT</span>
                    <span>NAVIGATION · FYRA NIVÅER</span>
                </div>
            </div>
        );
    }

    function Header({ active }) {
        const cls = (name) => 'lab-nav-link' + (active === name ? ' active' : '');
        return (
            <div className="lab-header">
                <div className="lab-header-inner">
                    <a className="lab-logo" href="index.html">
                        <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
                            <circle cx="18" cy="18" r="17" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="18" cy="18" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="18" cy="18" r="3" fill="var(--lab-accent)" />
                        </svg>
                        <span className="lab-logo-text">Fysiklabbet</span>
                    </a>
                    <nav className="lab-nav" aria-label="Huvudnavigation">
                        <a href="katalog.html" className={cls('katalog')}>Katalog</a>
                        <a href="index.html#senaste" className={cls('senaste')}>Senaste</a>
                        <a href="om.html" className={cls('om')}>Om</a>
                        <a href="kontakt.html" className={cls('kontakt')}>Kontakt</a>
                    </nav>
                </div>
            </div>
        );
    }

    function Breadcrumb({ subject, course, chapter, section }) {
        return (
            <div className="lab-breadcrumb">
                KATALOG
                {subject && (
                    <React.Fragment>
                        <span className="lab-breadcrumb-sep">/</span>
                        <span className="lab-breadcrumb-current">{subject.toUpperCase()}</span>
                    </React.Fragment>
                )}
                {course && (
                    <React.Fragment>
                        <span className="lab-breadcrumb-sep">/</span>
                        <span className="lab-breadcrumb-current">{course.toUpperCase()}</span>
                    </React.Fragment>
                )}
                {chapter && (
                    <React.Fragment>
                        <span className="lab-breadcrumb-sep">/</span>
                        <span className="lab-breadcrumb-current">{chapter.toUpperCase()}</span>
                    </React.Fragment>
                )}
                {section && (
                    <React.Fragment>
                        <span className="lab-breadcrumb-sep">/</span>
                        <span className="lab-breadcrumb-tail">{section}</span>
                    </React.Fragment>
                )}
            </div>
        );
    }

    function WelcomeHero() {
        return (
            <section className="lab-welcome">
                <h1 className="lab-welcome-title">
                    Fysiken till <em>hands</em>.
                </h1>
                <p className="lab-welcome-lead">
                    Ett bibliotek av interaktiva simuleringar för Fysik 1 och Fysik 2
                    på gymnasiet — utforska, lek och förstå.
                </p>
                <div className="lab-welcome-actions">
                    <a className="lab-btn lab-btn-primary" href="katalog.html">
                        Bläddra i katalogen →
                    </a>
                </div>
            </section>
        );
    }

    function CatalogHeader() {
        return (
            <section className="lab-katalog-header">
                <h1 className="lab-katalog-title">Katalog</h1>
                <p className="lab-katalog-lead">
                    Fyra register, varandra inkapslade — välj ämne, kurs, kapitel och avsnitt.
                </p>
            </section>
        );
    }

    function SearchBar() {
        const [query, setQuery] = useState('');
        const [activeIdx, setActiveIdx] = useState(-1);
        const [open, setOpen] = useState(false);
        const wrapRef = useRef(null);

        const matches = useMemo(() => {
            const q = normalize(query.trim());
            if (!q) return [];
            const terms = q.split(/\s+/);
            return KF.filter((_, i) => terms.every(t => HAYSTACKS[i].includes(t)));
        }, [query]);

        useEffect(() => {
            setActiveIdx(matches.length > 0 ? 0 : -1);
        }, [matches.length, query]);

        useEffect(() => {
            const onDocClick = (e) => {
                if (!wrapRef.current) return;
                if (!wrapRef.current.contains(e.target)) setOpen(false);
            };
            document.addEventListener('click', onDocClick);
            return () => document.removeEventListener('click', onDocClick);
        }, []);

        const handleKey = (e) => {
            if (!open || matches.length === 0) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIdx((activeIdx + 1) % matches.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIdx((activeIdx - 1 + matches.length) % matches.length);
            } else if (e.key === 'Enter' && activeIdx >= 0) {
                e.preventDefault();
                window.location.href = matches[activeIdx].href;
            } else if (e.key === 'Escape') {
                setQuery('');
                setOpen(false);
                e.target.blur();
            }
        };

        return (
            <section className="lab-section" aria-label="Sök simulering">
                <div className="lab-search" ref={wrapRef}>
                    <div className="lab-search-input-wrap">
                        <span className="lab-search-icon" aria-hidden="true">⌕</span>
                        <input
                            type="text"
                            value={query}
                            className="lab-search-input"
                            placeholder="sök katalogen — t.ex. coulomb, pendel, magnetfält, ljus…"
                            autoComplete="off"
                            aria-label="Sök simulering"
                            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                            onFocus={() => { if (query.trim()) setOpen(true); }}
                            onKeyDown={handleKey} />
                        {query && (
                            <button className="lab-search-clear" aria-label="Rensa sökning"
                                onClick={() => { setQuery(''); setOpen(false); }}>✕</button>
                        )}
                    </div>
                    <div className={'lab-search-results' + (open && query.trim() ? ' visible' : '')} role="listbox">
                        {open && query.trim() && matches.length === 0 && (
                            <div className="lab-search-empty">Inga simuleringar matchar "{query}"</div>
                        )}
                        {open && matches.map((sim, idx) => (
                            <a key={sim.href} href={sim.href}
                                className={'lab-search-result' + (idx === activeIdx ? ' active' : '')}
                                role="option"
                                onMouseEnter={() => setActiveIdx(idx)}>
                                <span className="lab-search-result-icon">{sim.icon}</span>
                                <div>
                                    <div className="lab-search-result-title">{sim.title}</div>
                                    <div className="lab-search-result-desc">{sim.description}</div>
                                </div>
                                <div className="lab-search-result-meta">
                                    {sim.course.toUpperCase()}<br />{sim.num}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    function Updates() {
        return (
            <section id="senaste" className="lab-section lab-updates">
                <div className="lab-updates-header">
                    <span className="lab-mono-label">Senaste uppdateringar</span>
                    <span className="lab-mono-label">APR — 2026</span>
                </div>
                <div className="lab-updates-grid">
                    {UPDATES.map(u => (
                        <article key={u.href} className="lab-update-item">
                            <time>{u.date}</time>
                            <h3><a href={u.href}>{u.title}</a></h3>
                            <p>{u.text}</p>
                        </article>
                    ))}
                </div>
            </section>
        );
    }

    function MathematicsPlaceholder() {
        return (
            <div className="lab-placeholder">
                <div className="lab-placeholder-title">Under uppbyggnad</div>
                <p className="lab-placeholder-text">
                    Matematik-katalogen kommer hösten 2026. Vi planerar att täcka
                    Matematik 1 till 4 med samma typ av interaktiva utforskningar
                    som fysiken — i samma bibliotek.
                </p>
            </div>
        );
    }

    function Catalog({ state, setState }) {
        const { subject, course, chapter, section } = state;
        const subjectData = K[subject] || {};
        const isMath = subject === 'Matematik';

        const subjects = Object.keys(K);
        const chapters = Object.keys((subjectData.courses?.[course]?.chapters) || {});
        const sections = subjectData.courses?.[course]?.chapters?.[chapter]?.sections || [];
        const activeSection = sections.find(s => s.num === section);
        const chapterNumber = subjectData.courses?.[course]?.chapters?.[chapter]?.number;
        const sectionIdx = sections.findIndex(s => s.num === section);

        const goPrev = () => {
            if (sectionIdx > 0) setState({ ...state, section: sections[sectionIdx - 1].num });
        };
        const goNext = () => {
            if (sectionIdx >= 0 && sectionIdx < sections.length - 1) {
                setState({ ...state, section: sections[sectionIdx + 1].num });
            }
        };

        return (
            <section className="lab-section lab-catalog">
                {/* Nivå 1: Ämne */}
                <div className="lab-tabs-1">
                    {subjects.map((s) => (
                        <button key={s}
                            className={'lab-tab-1' + (subject === s ? ' active' : '')}
                            onClick={() => setState({ subject: s, course: null, chapter: null, section: null })}>
                            <span className="lab-tab-1-num">NIVÅ 1</span>
                            {s}
                        </button>
                    ))}
                    <div className="lab-tabs-1-tail" />
                </div>

                {/* Nivå 2: Kurs */}
                <div className="lab-level-2">
                    <div className="lab-mono-label" style={{ marginBottom: 12 }}>NIVÅ 2 · KURS</div>
                    <div className="lab-tabs-2">
                        {Object.keys(subjectData.courses || {}).map(c => (
                            <button key={c}
                                className={'lab-tab-2' + (course === c ? ' active' : '')}
                                onClick={() => setState({ ...state, course: c, chapter: null, section: null })}>
                                {c}
                            </button>
                        ))}
                    </div>

                    {isMath ? (
                        <div className="lab-level-3" style={{ paddingBottom: 24, marginBottom: 28 }}>
                            <MathematicsPlaceholder />
                        </div>
                    ) : (
                        <div className="lab-level-3">
                            {/* Nivå 3: Kapitel */}
                            <div className="lab-mono-label" style={{ marginBottom: 12 }}>NIVÅ 3 · KAPITEL</div>
                            <div className="lab-tabs-3">
                                {chapters.map((ch, i) => (
                                    <button key={ch}
                                        className={'lab-tab-3' + (chapter === ch ? ' active' : '')}
                                        onClick={() => setState({ ...state, chapter: ch, section: null })}>
                                        <span className="lab-tab-3-num">{String(i + 1).padStart(2, '0')}</span>
                                        {ch}
                                    </button>
                                ))}
                            </div>

                            {/* Nivå 4: Avsnitt */}
                            <div className="lab-level-4">
                                <aside className="lab-sections-aside">
                                    <div className="lab-mono-label" style={{ marginBottom: 14, paddingLeft: 4 }}>
                                        NIVÅ 4 · AVSNITT
                                    </div>
                                    {sections.map(s => (
                                        <button key={s.num}
                                            className={'lab-section-item' + (section === s.num ? ' active' : '')}
                                            onClick={() => setState({ ...state, section: s.num })}>
                                            <span className="lab-section-item-num">{s.num}</span>
                                            <span className="lab-section-item-title">{s.title}</span>
                                            <span className="lab-section-item-arrow">
                                                {section === s.num ? '●' : '→'}
                                            </span>
                                        </button>
                                    ))}
                                    <div className="lab-sections-aside-foot" />
                                </aside>

                                <div className="lab-section-content">
                                    {activeSection ? (
                                        <React.Fragment>
                                            <div className="lab-section-content-head">
                                                <span className="lab-mono-label">
                                                    Kapitel {chapterNumber} · {(chapter || '').toUpperCase()} · Avsnitt {activeSection.num}
                                                </span>
                                                <span className="lab-mono-label">
                                                    {sectionIdx + 1} / {sections.length}
                                                </span>
                                            </div>
                                            <h2 className="lab-section-title">
                                                <span className="lab-section-title-num">{activeSection.num}</span>
                                                {activeSection.title}
                                            </h2>
                                            <p className="lab-section-lead">
                                                {activeSection.description} Öppna avsnittet för
                                                interaktiv simulering, kort genomgång och övningar.
                                            </p>

                                            <div className="lab-section-cards">
                                                <div className="lab-card">
                                                    <div className="lab-card-tag">Läsning</div>
                                                    <div className="lab-card-title">Genomgång</div>
                                                    <div className="lab-card-meta">Kort introduktion</div>
                                                </div>
                                                <div className="lab-card">
                                                    <div className="lab-card-tag">Experiment</div>
                                                    <div className="lab-card-title">Simulering</div>
                                                    <div className="lab-card-meta">Interaktiv</div>
                                                </div>
                                                <div className="lab-card">
                                                    <div className="lab-card-tag">Räkna</div>
                                                    <div className="lab-card-title">Övningar</div>
                                                    <div className="lab-card-meta">Kommer snart</div>
                                                </div>
                                            </div>

                                            <div className="lab-section-actions">
                                                <a className="lab-btn lab-btn-primary" href={activeSection.href}>
                                                    Öppna avsnitt →
                                                </a>
                                                <button className="lab-btn" type="button">Bokmärk</button>
                                                <div className="lab-section-actions-spacer" />
                                                <button className="lab-btn lab-btn-quiet" type="button"
                                                    onClick={goPrev} disabled={sectionIdx <= 0}
                                                    style={sectionIdx <= 0 ? { opacity: 0.4, cursor: 'not-allowed' } : null}>
                                                    ← Föregående
                                                </button>
                                                <button className="lab-btn lab-btn-quiet" type="button"
                                                    onClick={goNext} disabled={sectionIdx >= sections.length - 1}
                                                    style={sectionIdx >= sections.length - 1 ? { opacity: 0.4, cursor: 'not-allowed' } : null}>
                                                    Nästa →
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <p style={{ color: 'var(--lab-ink-soft)' }}>
                                            Välj ett avsnitt i listan till vänster.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ height: 28 }} />
                </div>
            </section>
        );
    }

    function Footer() {
        return (
            <footer className="lab-section lab-footer">
                <span>© 2026 FYSIKLABBET</span>
                <span>SKAPAD FÖR GYMNASIEELEVER</span>
            </footer>
        );
    }

    // Standard initialvärden för katalog-tillståndet (Fysik / Fysik 1 / första kapitel / första avsnitt)
    function initialCatalogState() {
        const subject = 'Fysik';
        const course = Object.keys(K[subject].courses)[0];
        const chapter = Object.keys(K[subject].courses[course].chapters)[0];
        const section = K[subject].courses[course].chapters[chapter].sections[0].num;
        return { subject, course, chapter, section };
    }

    // Hook som håller kaskaden subject → course → chapter → section konsistent.
    // Vid byte uppåt i kedjan väljs första giltiga underrymden automatiskt.
    function useCatalogState() {
        const [state, setState] = useState(initialCatalogState);

        useEffect(() => {
            const subj = K[state.subject];
            if (!subj) return;
            let { course, chapter, section } = state;
            const courses = Object.keys(subj.courses || {});
            if (!course || !courses.includes(course)) course = courses[0] || null;
            const chapters = course ? Object.keys(subj.courses[course].chapters || {}) : [];
            if (!chapter || !chapters.includes(chapter)) chapter = chapters[0] || null;
            const sections = (chapter && subj.courses[course].chapters[chapter].sections) || [];
            if (!section || !sections.find(s => s.num === section)) {
                section = sections[0]?.num || null;
            }
            if (course !== state.course || chapter !== state.chapter || section !== state.section) {
                setState(s => ({ ...s, course, chapter, section }));
            }
        }, [state.subject, state.course, state.chapter, state.section]);

        return [state, setState];
    }

    window.LAB = {
        Topbar, Header, Breadcrumb,
        WelcomeHero, CatalogHeader,
        SearchBar, Updates, Catalog, Footer,
        MathematicsPlaceholder,
        useCatalogState,
    };
})();
