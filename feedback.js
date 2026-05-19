/**
 * Feedback-widget för Fysiklabbet.
 *
 * En flytande glödlampa nere till höger öppnar ett formulär med
 * meddelande, valfri e-post och valfri bilaga. URL:en där användaren
 * befinner sig skickas automatiskt med i mailet.
 *
 * E-posten går via Formsubmit.co. Första gången ett meddelande skickas
 * från en ny domän mailar Formsubmit en aktiveringslänk till
 * mottagaradressen — klicka den för att börja ta emot feedback.
 *
 * För att byta mottagaradress, ändra FEEDBACK_ENDPOINT nedan.
 */
(function () {
    'use strict';
    if (document.getElementById('fb-feedback-widget')) return;

    const FEEDBACK_EMAIL = 'sam.skoglund83@gmail.com';
    const FEEDBACK_ENDPOINT = `https://formsubmit.co/${FEEDBACK_EMAIL}`;
    const FEEDBACK_ENDPOINT_AJAX = `https://formsubmit.co/ajax/${FEEDBACK_EMAIL}`;
    const CONFIRMATION_TEXT = 'Snyggt! Vi har registrerat din kraftfulla input. Acceleration mot en bättre sida påbörjad!';

    // Feedback-widgetens stil matchar Laborans-paletten (pappersbakgrund,
    // ink-svart text, accent-röd #c8324a). Vit knapp + svart border syns
    // bra både mot Laborans pappersgula bakgrund och mot de mörka
    // simuleringsidornas slate-bakgrund.
    const CSS = `
    .fb-btn {
        position: fixed;
        bottom: 1.75rem;
        right: 1.75rem;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid rgba(15, 22, 32, 0.85);
        background: #ffffff;
        color: #0f1620;
        cursor: pointer;
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
        transition: transform 0.18s ease, background 0.18s ease,
                    color 0.18s ease, border-color 0.18s ease,
                    box-shadow 0.18s ease;
        font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
        padding: 0;
    }
    .fb-btn:hover {
        transform: translateY(-1px);
        background: #c8324a;
        color: #ffffff;
        border-color: #c8324a;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
    }
    .fb-btn:active { transform: translateY(0) scale(0.98); }
    .fb-btn:focus-visible {
        outline: 2px solid #c8324a;
        outline-offset: 3px;
    }
    .fb-btn svg { width: 26px; height: 26px; }
    .fb-btn .fb-bulb-glow {
        fill: rgba(200, 50, 74, 0.16);
        transition: fill 0.18s ease;
    }
    .fb-btn:hover .fb-bulb-glow { fill: rgba(255, 255, 255, 0.25); }
    .fb-btn .fb-bulb-stroke { stroke: currentColor; }

    .fb-tooltip {
        position: fixed;
        bottom: 2.55rem;
        right: 5.5rem;
        background: #0f1620;
        color: #f3eee4;
        padding: 0.45rem 0.8rem;
        border-radius: 2px;
        font-size: 11px;
        font-family: "JetBrains Mono", ui-monospace, "Menlo", monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease;
        z-index: 9998;
    }
    .fb-btn:hover + .fb-tooltip { opacity: 1; }

    .fb-panel {
        position: fixed;
        bottom: 5.6rem;
        right: 1.75rem;
        width: 360px;
        max-width: calc(100vw - 2rem);
        background: #ffffff;
        border: 1px solid rgba(15, 22, 32, 0.85);
        border-radius: 2px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
        padding: 1.25rem 1.25rem 1.1rem;
        color: #0f1620;
        font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
        z-index: 9999;
        display: none;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .fb-panel.fb-open {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
    .fb-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 1.1rem;
        padding-bottom: 0.85rem;
        border-bottom: 1px solid rgba(15, 22, 32, 0.12);
    }
    .fb-title {
        font-family: "Instrument Serif", "Times New Roman", serif;
        font-size: 22px;
        font-weight: 400;
        color: #0f1620;
        letter-spacing: -0.005em;
        line-height: 1.05;
    }
    .fb-close {
        background: transparent;
        border: none;
        color: #8a8579;
        font-size: 18px;
        cursor: pointer;
        padding: 4px 8px;
        line-height: 1;
        font-family: inherit;
        transition: color 0.15s ease;
    }
    .fb-close:hover { color: #c8324a; }

    .fb-field { margin-bottom: 0.85rem; }
    .fb-label {
        display: block;
        font-family: "JetBrains Mono", ui-monospace, "Menlo", monospace;
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #8a8579;
        margin-bottom: 0.45rem;
    }
    .fb-optional {
        font-family: "JetBrains Mono", ui-monospace, "Menlo", monospace;
        font-size: 9px;
        font-weight: 500;
        color: #c8324a;
        margin-left: 0.5rem;
        letter-spacing: 0.06em;
        text-transform: none;
    }
    .fb-input, .fb-textarea {
        width: 100%;
        background: #ffffff;
        border: 1px solid rgba(15, 22, 32, 0.28);
        border-radius: 0;
        padding: 0.6rem 0.75rem;
        color: #0f1620;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.4;
        outline: none;
        transition: border-color 0.15s ease, background 0.15s ease;
        box-sizing: border-box;
    }
    .fb-input::placeholder, .fb-textarea::placeholder { color: #8a8579; }
    .fb-input:focus, .fb-textarea:focus {
        border-color: #0f1620;
    }
    .fb-textarea {
        resize: vertical;
        min-height: 96px;
        line-height: 1.5;
    }
    .fb-file-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.45rem 0.85rem;
        background: transparent;
        border: 1px dashed rgba(15, 22, 32, 0.4);
        border-radius: 0;
        color: #0f1620;
        cursor: pointer;
        font-size: 12px;
        font-family: "JetBrains Mono", ui-monospace, monospace;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        transition: background 0.15s ease, border-color 0.15s ease,
                    color 0.15s ease;
    }
    .fb-file-btn:hover {
        background: #ebe4d4;
        border-color: #c8324a;
        color: #c8324a;
    }
    .fb-file-input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
    }
    .fb-file-name {
        display: inline-block;
        margin-left: 0.6rem;
        font-size: 12px;
        color: #8a8579;
        vertical-align: middle;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fb-submit {
        width: 100%;
        padding: 0.75rem 1rem;
        background: #0f1620;
        color: #f3eee4;
        border: 1px solid #0f1620;
        border-radius: 0;
        font-family: "JetBrains Mono", ui-monospace, "Menlo", monospace;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        margin-top: 0.45rem;
        transition: background 0.15s ease, border-color 0.15s ease,
                    color 0.15s ease;
    }
    .fb-submit:hover {
        background: #c8324a;
        border-color: #c8324a;
        color: #ffffff;
    }
    .fb-submit:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        background: #0f1620;
        border-color: #0f1620;
        color: #f3eee4;
    }
    .fb-success {
        text-align: center;
        padding: 1.25rem 0.5rem 0.6rem;
    }
    .fb-success-icon {
        width: 44px;
        height: 44px;
        margin: 0 auto 0.9rem;
        color: #c8324a;
        animation: fb-celebrate 0.55s ease;
    }
    @keyframes fb-celebrate {
        0%   { transform: scale(0.5) rotate(-10deg); opacity: 0; }
        70%  { transform: scale(1.1) rotate(4deg); opacity: 1; }
        100% { transform: scale(1) rotate(0); opacity: 1; }
    }
    .fb-success-text {
        color: #0f1620;
        font-family: "Instrument Serif", "Times New Roman", serif;
        font-style: italic;
        font-size: 16px;
        line-height: 1.5;
        max-width: 28ch;
        margin: 0 auto;
    }
    .fb-error {
        margin-top: 0.75rem;
        padding: 0.6rem 0.85rem;
        background: rgba(200, 50, 74, 0.08);
        border-left: 3px solid #c8324a;
        color: #0f1620;
        font-size: 13px;
        line-height: 1.45;
        display: none;
    }
    .fb-error.fb-error-visible { display: block; }
    @media (max-width: 480px) {
        .fb-btn { bottom: 1rem; right: 1rem; width: 50px; height: 50px; }
        .fb-btn svg { width: 22px; height: 22px; }
        .fb-panel { bottom: 4.5rem; right: 1rem; left: 1rem; width: auto; }
        .fb-tooltip { display: none; }
    }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    // SVG-glödlampa i Laborans-stil: tunna konturer (currentColor) + en
    // fylld "glöd"-form i accent-rött bakom. Föredras framför 💡-emojin
    // eftersom emojier renderas med systemfärger (gul/orange) som inte
    // matchar pappers/röd-paletten.
    const BULB_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path class="fb-bulb-glow" d="M8.2 13.5c-1.1-1.2-1.7-2.5-1.7-3.9a5.5 5.5 0 0 1 11 0c0 1.4-.6 2.7-1.7 3.9-.7.8-1.1 1.4-1.2 2H9.4c-.1-.6-.5-1.2-1.2-2Z"/>
        <path class="fb-bulb-stroke" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M9.2 18h5.6M10 21h4M14.6 15.5c.18-.78.55-1.4 1.13-2A4.65 4.65 0 0 0 17.5 10a5.5 5.5 0 0 0-11 0c0 1 .23 2.04 1.37 3.5.58.6.95 1.22 1.13 2"/>
    </svg>`;

    const CHECK_SVG = `<svg viewBox="0 0 44 44" fill="none" aria-hidden="true" width="44" height="44">
        <circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M13 22.5l6 6 12-13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`;

    const container = document.createElement('div');
    container.id = 'fb-feedback-widget';
    container.innerHTML = `
    <button class="fb-btn" id="fb-btn" aria-label="Lämna feedback" aria-expanded="false" type="button">${BULB_SVG}</button>
    <div class="fb-tooltip" role="tooltip">Lämna feedback</div>
    <section class="fb-panel" id="fb-panel" role="dialog" aria-labelledby="fb-title" aria-hidden="true">
        <div class="fb-header">
            <div class="fb-title" id="fb-title">Lämna feedback</div>
            <button class="fb-close" id="fb-close" type="button" aria-label="Stäng">✕</button>
        </div>
        <form id="fb-form" action="${FEEDBACK_ENDPOINT}" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_subject" value="Feedback från Fysiklabbet">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="URL" id="fb-url" value="">
            <input type="text" name="_honey" tabindex="-1" autocomplete="off" style="display:none">

            <div class="fb-field">
                <label class="fb-label" for="fb-message">Meddelande</label>
                <textarea class="fb-textarea" id="fb-message" name="message" required placeholder="Vad vill du berätta? Hittade du en bugg, har du en idé eller en fråga?"></textarea>
            </div>

            <div class="fb-field">
                <label class="fb-label" for="fb-email">E-postadress <span class="fb-optional">valfritt</span></label>
                <input class="fb-input" type="email" id="fb-email" name="email" placeholder="du@exempel.se">
            </div>

            <div class="fb-field">
                <span class="fb-label" id="fb-file-label">Bifoga fil eller skärmdump <span class="fb-optional">valfritt</span></span>
                <label class="fb-file-btn" for="fb-file"><span aria-hidden="true">📎</span> Välj fil</label>
                <input class="fb-file-input" type="file" id="fb-file" name="attachment" accept="image/*,.pdf,.txt,.doc,.docx" aria-labelledby="fb-file-label">
                <span class="fb-file-name" id="fb-file-name" aria-live="polite"></span>
            </div>

            <button class="fb-submit" type="submit" id="fb-submit">Skicka feedback →</button>
            <div class="fb-error" id="fb-error" role="alert" aria-live="assertive"></div>
        </form>
        <div class="fb-success" id="fb-success" role="status" aria-live="polite" style="display:none;">
            <div class="fb-success-icon" aria-hidden="true">${CHECK_SVG}</div>
            <div class="fb-success-text">${CONFIRMATION_TEXT}</div>
        </div>
    </section>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('fb-btn');
    const panel = document.getElementById('fb-panel');
    const closeBtn = document.getElementById('fb-close');
    const form = document.getElementById('fb-form');
    const urlInput = document.getElementById('fb-url');
    const fileInput = document.getElementById('fb-file');
    const fileName = document.getElementById('fb-file-name');
    const submitBtn = document.getElementById('fb-submit');
    const successBox = document.getElementById('fb-success');
    const messageInput = document.getElementById('fb-message');
    const errorBox = document.getElementById('fb-error');

    function openPanel() {
        urlInput.value = window.location.href;
        panel.classList.add('fb-open');
        panel.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        setTimeout(() => messageInput.focus(), 120);
    }

    function closePanel() {
        panel.classList.remove('fb-open');
        panel.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
    }

    function resetForm() {
        form.reset();
        form.style.display = 'block';
        successBox.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Skicka feedback →';
        fileName.textContent = '';
        hideError();
    }

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.classList.add('fb-error-visible');
    }

    function hideError() {
        errorBox.textContent = '';
        errorBox.classList.remove('fb-error-visible');
    }

    btn.addEventListener('click', () => {
        if (panel.classList.contains('fb-open')) closePanel();
        else openPanel();
    });
    closeBtn.addEventListener('click', closePanel);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('fb-open')) closePanel();
    });

    fileInput.addEventListener('change', () => {
        fileName.textContent = fileInput.files && fileInput.files[0] ? fileInput.files[0].name : '';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Skickar…';

        const formData = new FormData(form);

        try {
            const response = await fetch(FEEDBACK_ENDPOINT_AJAX, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            let data = {};
            try { data = await response.json(); } catch (_) {}

            if (!response.ok || String(data.success) !== 'true') {
                const detail = data.message || `HTTP ${response.status}`;
                throw new Error(detail);
            }

            form.style.display = 'none';
            successBox.style.display = 'block';
            setTimeout(() => {
                closePanel();
                setTimeout(resetForm, 320);
            }, 5000);
        } catch (err) {
            console.error('[feedback] submit misslyckades:', err);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Försök igen';
            showError(`Kunde inte skicka: ${err.message}. Försök igen, eller mejla ${FEEDBACK_EMAIL} direkt.`);
        }
    });
})();
