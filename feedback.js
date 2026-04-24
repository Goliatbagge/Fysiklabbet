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

    const CSS = `
    .fb-btn {
        position: fixed;
        bottom: 1.75rem;
        right: 1.75rem;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: 1px solid rgba(56, 189, 248, 0.35);
        background: linear-gradient(135deg, #38bdf8, #0ea5e9);
        color: #0a1628;
        font-size: 1.7rem;
        cursor: pointer;
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(56, 189, 248, 0.4);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        animation: fb-pulse 2.6s ease-in-out infinite;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .fb-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.75);
    }
    .fb-btn:active { transform: scale(0.96); }
    .fb-btn:focus-visible {
        outline: 2px solid #38bdf8;
        outline-offset: 3px;
    }
    @keyframes fb-pulse {
        0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 22px rgba(56, 189, 248, 0.35); }
        50%      { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 40px rgba(56, 189, 248, 0.75); }
    }
    .fb-tooltip {
        position: fixed;
        bottom: 2.5rem;
        right: 5.5rem;
        background: rgba(12, 18, 32, 0.95);
        color: #e2e8f0;
        padding: 0.5rem 0.85rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-family: 'Poppins', sans-serif;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 9998;
        border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .fb-btn:hover + .fb-tooltip { opacity: 1; }
    .fb-panel {
        position: fixed;
        bottom: 5.8rem;
        right: 1.75rem;
        width: 360px;
        max-width: calc(100vw - 2rem);
        background: rgba(12, 18, 32, 0.97);
        backdrop-filter: blur(18px);
        border: 1px solid rgba(56, 189, 248, 0.25);
        border-radius: 16px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.15);
        padding: 1.25rem;
        color: #e2e8f0;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        z-index: 9999;
        display: none;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.22s ease, transform 0.22s ease;
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
        margin-bottom: 1rem;
    }
    .fb-title {
        font-size: 1.05rem;
        font-weight: 600;
        color: #e2e8f0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .fb-close {
        background: transparent;
        border: none;
        color: #94a3b8;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.25rem 0.55rem;
        border-radius: 6px;
        line-height: 1;
        font-family: inherit;
        transition: background 0.15s ease, color 0.15s ease;
    }
    .fb-close:hover {
        background: rgba(56, 189, 248, 0.12);
        color: #e2e8f0;
    }
    .fb-field { margin-bottom: 0.85rem; }
    .fb-label {
        display: block;
        font-size: 0.85rem;
        font-weight: 500;
        color: #94a3b8;
        margin-bottom: 0.35rem;
    }
    .fb-optional {
        font-size: 0.7rem;
        font-weight: 600;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.14);
        padding: 0.12rem 0.5rem;
        border-radius: 999px;
        margin-left: 0.45rem;
        vertical-align: middle;
        letter-spacing: 0.02em;
    }
    .fb-input, .fb-textarea {
        width: 100%;
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid rgba(148, 163, 184, 0.22);
        border-radius: 8px;
        padding: 0.6rem 0.75rem;
        color: #e2e8f0;
        font-family: inherit;
        font-size: 0.95rem;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        box-sizing: border-box;
    }
    .fb-input::placeholder, .fb-textarea::placeholder { color: #64748b; }
    .fb-input:focus, .fb-textarea:focus {
        border-color: #38bdf8;
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
    }
    .fb-textarea {
        resize: vertical;
        min-height: 100px;
        line-height: 1.5;
    }
    .fb-file-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.85rem;
        background: rgba(56, 189, 248, 0.1);
        border: 1px dashed rgba(56, 189, 248, 0.4);
        border-radius: 8px;
        color: #7dd3fc;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 500;
        transition: background 0.15s ease, border-color 0.15s ease;
    }
    .fb-file-btn:hover {
        background: rgba(56, 189, 248, 0.2);
        border-color: rgba(56, 189, 248, 0.65);
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
        font-size: 0.82rem;
        color: #94a3b8;
        vertical-align: middle;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fb-submit {
        width: 100%;
        padding: 0.8rem 1rem;
        background: linear-gradient(135deg, #38bdf8, #0ea5e9);
        color: #0a1628;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        font-size: 0.95rem;
        font-family: inherit;
        cursor: pointer;
        margin-top: 0.4rem;
        transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
    }
    .fb-submit:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(56, 189, 248, 0.35);
    }
    .fb-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    .fb-success {
        text-align: center;
        padding: 1.5rem 0.5rem 0.75rem;
    }
    .fb-success-icon {
        font-size: 2.75rem;
        margin-bottom: 0.85rem;
        filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.55));
        animation: fb-celebrate 0.6s ease;
    }
    @keyframes fb-celebrate {
        0%   { transform: scale(0.4) rotate(-20deg); opacity: 0; }
        70%  { transform: scale(1.15) rotate(8deg); opacity: 1; }
        100% { transform: scale(1) rotate(0); opacity: 1; }
    }
    .fb-success-text {
        color: #e2e8f0;
        font-size: 0.95rem;
        line-height: 1.55;
    }
    .fb-error {
        margin-top: 0.75rem;
        padding: 0.65rem 0.85rem;
        background: rgba(248, 113, 113, 0.12);
        border: 1px solid rgba(248, 113, 113, 0.35);
        border-radius: 8px;
        color: #fecaca;
        font-size: 0.85rem;
        line-height: 1.45;
        display: none;
    }
    .fb-error.fb-error-visible { display: block; }
    @media (max-width: 480px) {
        .fb-btn { bottom: 1rem; right: 1rem; width: 52px; height: 52px; font-size: 1.45rem; }
        .fb-panel { bottom: 4.6rem; right: 1rem; left: 1rem; width: auto; }
        .fb-tooltip { display: none; }
    }
    `;

    const styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    const container = document.createElement('div');
    container.id = 'fb-feedback-widget';
    container.innerHTML = `
    <button class="fb-btn" id="fb-btn" aria-label="Lämna feedback" aria-expanded="false" type="button">💡</button>
    <div class="fb-tooltip" role="tooltip">Lämna feedback</div>
    <section class="fb-panel" id="fb-panel" role="dialog" aria-labelledby="fb-title" aria-hidden="true">
        <div class="fb-header">
            <div class="fb-title" id="fb-title"><span aria-hidden="true">💡</span><span>Lämna feedback</span></div>
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

            <button class="fb-submit" type="submit" id="fb-submit">Skicka feedback</button>
            <div class="fb-error" id="fb-error" role="alert" aria-live="assertive"></div>
        </form>
        <div class="fb-success" id="fb-success" role="status" aria-live="polite" style="display:none;">
            <div class="fb-success-icon" aria-hidden="true">⚡</div>
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
        submitBtn.textContent = 'Skicka feedback';
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
