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
              ${SITE_CONFIG.SOCIAL.youtube    ? `<a href="${SITE_CONFIG.SOCIAL.youtube}"    class="social-icon-link" target="_blank" rel="noopener" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
              </a>` : ''}
              ${SITE_CONFIG.SOCIAL.soundcloud ? `<a href="${SITE_CONFIG.SOCIAL.soundcloud}" class="social-icon-link" target="_blank" rel="noopener" aria-label="SoundCloud">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.175 12.225c-.108 0-.198.088-.211.197l-.309 2.453.309 2.412c.013.109.103.195.211.195.107 0 .196-.086.21-.195l.351-2.412-.351-2.453c-.014-.109-.103-.197-.21-.197zm1.59-.956c-.127 0-.232.104-.245.23l-.27 3.409.27 3.35c.013.126.118.228.245.228.126 0 .231-.102.244-.228l.308-3.35-.308-3.409c-.013-.126-.118-.23-.244-.23zm1.625-.246c-.146 0-.265.12-.277.265l-.234 3.655.234 3.578c.012.145.131.263.277.263.145 0 .264-.118.277-.263l.266-3.578-.266-3.655c-.013-.145-.132-.265-.277-.265zM9 5.997c-.553 0-1.086.1-1.58.28C7.077 3.92 5.267 2.25 3.078 2.25c-.553 0-1 .448-1 1v16.5c0 .553.447 1 1 1H9h11.5c1.38 0 2.5-1.12 2.5-2.5 0-1.381-1.12-2.5-2.5-2.5-.122 0-.241.009-.357.027C20.22 13.01 18.32 11.25 16 11.25c-.553 0-1.07.108-1.543.302C13.888 8.353 11.656 6 9 6v-.003z"/></svg>
              </a>` : ''}
              ${SITE_CONFIG.SOCIAL.instagram  ? `<a href="${SITE_CONFIG.SOCIAL.instagram}"  class="social-icon-link" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>` : ''}
              ${SITE_CONFIG.SOCIAL.linkedin   ? `<a href="${SITE_CONFIG.SOCIAL.linkedin}"   class="social-icon-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>` : ''}
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
        <div class="success-icon" aria-hidden="true">
          <svg viewBox="0 0 44 44" class="check-svg" xmlns="http://www.w3.org/2000/svg">
            <circle class="check-circle" cx="22" cy="22" r="18"
                    stroke="var(--color-gold)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path class="check-mark" d="M13 22 L19.5 28.5 L31 15"
                  stroke="var(--color-gold)" stroke-width="2.2" fill="none"
                  stroke-linecap="round" stroke-linejoin="round"/>
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
