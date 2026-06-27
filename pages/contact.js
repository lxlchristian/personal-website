/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/contact.js
   Step 1: DOM scaffold.
   Step 3: Visual implementation and form handling.
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
              <button type="submit" class="contact-submit">${t('contact.send', lang)}</button>
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
  },
};
