/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/contact.js
══════════════════════════════════════════════════════════ */

const ContactPage = {
  mount(el) {
    const lang = getCurrentLang();
    el.className = 'page-subpage page-contact';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true"></div>
        <div class="subpage-content">

          <section class="content-section section-contact-full" aria-labelledby="contact-full-label">
            <span class="section-label" id="contact-full-label">${t('section.contact', lang)}</span>

            <p class="contact-framing">${t('contact.framing', lang)}</p>

            <a href="mailto:${SITE_CONFIG.EMAIL}" class="contact-email-link">
              ${SITE_CONFIG.EMAIL}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>

            <div class="contact-or" role="separator" aria-hidden="true">
              <span class="contact-or__label">${t('contact.or', lang)}</span>
            </div>

            <form class="contact-form" id="contactFormFull" novalidate>
              <div class="form-field">
                <label for="cfName">${t('contact.name', lang)}</label>
                <input type="text"  id="cfName"  name="name"  autocomplete="name" required />
              </div>
              <div class="form-field">
                <label for="cfEmail">${t('contact.email', lang)}</label>
                <input type="email" id="cfEmail" name="email" autocomplete="email" required />
              </div>
              <div class="form-field">
                <label for="cfMsg">${t('contact.message', lang)}</label>
                <textarea id="cfMsg" name="message" rows="6" required></textarea>
              </div>
              <div class="form-actions">
                <button type="submit" class="contact-submit">${t('contact.send', lang)}</button>
                <p class="contact-error" aria-live="polite"></p>
              </div>
            </form>

            ${Object.values(SITE_CONFIG.SOCIAL).some(v => v) ? `
            <div class="contact-social">
              ${SITE_CONFIG.SOCIAL.youtube    ? `<a href="${SITE_CONFIG.SOCIAL.youtube}"    class="social-link" target="_blank" rel="noopener">YouTube</a>`    : ''}
              ${SITE_CONFIG.SOCIAL.soundcloud ? `<a href="${SITE_CONFIG.SOCIAL.soundcloud}" class="social-link" target="_blank" rel="noopener">SoundCloud</a>` : ''}
              ${SITE_CONFIG.SOCIAL.instagram  ? `<a href="${SITE_CONFIG.SOCIAL.instagram}"  class="social-link" target="_blank" rel="noopener">Instagram</a>`  : ''}
              ${SITE_CONFIG.SOCIAL.linkedin   ? `<a href="${SITE_CONFIG.SOCIAL.linkedin}"   class="social-link" target="_blank" rel="noopener">LinkedIn</a>`   : ''}
            </div>` : ''}

          </section>

        </div>
      </div>
    `;

    el.querySelector('#contactFormFull').addEventListener('submit', (e) => ContactPage._handleSubmit(e));
  },

  _handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const lang = getCurrentLang();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    const btn     = form.querySelector('.contact-submit');
    const errEl   = form.querySelector('.contact-error');

    errEl.textContent = '';

    if (!name || !email || !message) {
      if (!name)         form.querySelector('#cfName').focus();
      else if (!email)   form.querySelector('#cfEmail').focus();
      else               form.querySelector('#cfMsg').focus();
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { form.querySelector('#cfEmail').focus(); return; }

    btn.disabled = true;
    btn.textContent = t('contact.sending', lang);

    const endpoint = SITE_CONFIG.FORM_ENDPOINT;

    if (!endpoint) {
      /* No endpoint configured — show the popup anyway so design is visible */
      setTimeout(() => {
        ContactPage._showSuccess(lang);
        form.reset();
        btn.disabled = false;
        btn.textContent = t('contact.send', lang);
      }, 600);
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(res => {
        if (res.ok) {
          ContactPage._showSuccess(lang);
          form.reset();
        } else {
          throw new Error('non-ok');
        }
      })
      .catch(() => {
        errEl.textContent = t('contact.error', lang);
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = t('contact.send', lang);
      });
  },

  _showSuccess(lang) {
    const overlay = document.createElement('div');
    overlay.className = 'contact-success-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'contact-success-heading');

    overlay.innerHTML = `
      <div class="contact-success-card">
        <div class="success-note" aria-hidden="true">
          <svg viewBox="0 0 24 56" class="note-svg" xmlns="http://www.w3.org/2000/svg">
            <line class="note-stem" x1="19" y1="46" x2="19" y2="5"
                  stroke="var(--color-gold)" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse class="note-head" cx="11" cy="49" rx="8.5" ry="5.5"
                     transform="rotate(-15 11 49)" fill="var(--color-gold)"/>
          </svg>
        </div>
        <h2 class="success-heading" id="contact-success-heading">
          ${t('contact.success.heading', lang)}
        </h2>
        <p class="success-body">${t('contact.success.body', lang)}</p>
        <button class="contact-submit success-close">
          ${t('contact.success.close', lang)}
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('is-visible'));
    });

    const close = () => {
      overlay.classList.remove('is-visible');
      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    };

    overlay.querySelector('.success-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    const onKey = (e) => {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    };
    document.addEventListener('keydown', onKey);

    overlay.querySelector('.success-close').focus();
  },
};
