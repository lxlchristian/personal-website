/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/biography.js
══════════════════════════════════════════════════════════ */

const BiographyPage = {
  mount(el) {
    const lang = getCurrentLang();
    el.className = 'page-subpage page-biography';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true">${_DIVIDER_SVG}</div>
        <div class="subpage-content">

          <section class="content-section section-bio" aria-labelledby="bio-label">
            <span class="section-label" id="bio-label">${t('bio.label', lang)}</span>

            <div class="bio-grid">

              <div class="bio-image-col">
                <div class="bio-image-frame">
                  <img src="me.jpg" alt="Christian Liu" class="bio-img" />
                </div>
                <dl class="bio-facts">
                  <div class="fact">
                    <dt class="fact-label">${t('bio.basedLabel', lang)}</dt>
                    <dd class="fact-value">${t('bio.basedValue', lang)}</dd>
                  </div>
                  <div class="fact">
                    <dt class="fact-label">${t('bio.langLabel', lang)}</dt>
                    <dd class="fact-value">${t('bio.langValue', lang)}</dd>
                  </div>
                </dl>
              </div>

              <div class="bio-text-col">
                <p class="bio-body">${t('bio.p1', lang)}</p>
                <p class="bio-body">${t('bio.p2', lang)}</p>
                <p class="bio-body">${t('bio.p3', lang)}</p>

                <div class="bio-milestone">
                  <span class="bio-milestone__number" aria-hidden="true">1.2M</span>
                  <span class="bio-milestone__label">${t('bio.milestone', lang)}</span>
                </div>

                <p class="bio-body">${t('bio.p4', lang)}</p>

                <div class="bio-credits">
                  <div class="bio-credits__group">
                    <span class="bio-credits__cat">${t('bio.credits.games', lang)}</span>
                    <ul class="bio-credits__list">
                      <li>Island of Hearts <em>— ${t('credit.role.originalSoundtrack', lang)}</em></li>
                      <li>Realm of Taiwu <em>— ${t('credit.role.trailerMusic', lang)}, LEAP Studio</em></li>
                    </ul>
                  </div>
                  <div class="bio-credits__group">
                    <span class="bio-credits__cat">${t('bio.credits.musicals', lang)}</span>
                    <ul class="bio-credits__list">
                      <li><a href="/musicals/salooney-tunes" data-link="/musicals/salooney-tunes">Salooney Tunes ↗</a> <em>— Hasty Pudding Theatricals, 2026</em></li>
                      <li><a href="/musicals/city-of-peace" data-link="/musicals/city-of-peace">City of Peace ↗</a> <em>— Harvard Office for Fine Arts, 2025</em></li>
                      <li><a href="/musicals/post-mortem" data-link="/musicals/post-mortem">Post-Mortem ↗</a> <em>— Harvard Office for Fine Arts, 2023</em></li>
                    </ul>
                  </div>
                  <div class="bio-credits__group">
                    <span class="bio-credits__cat">${t('bio.credits.orchestrations', lang)}</span>
                    <ul class="bio-credits__list">
                      <li>White House Princess <em>— 2023</em></li>
                      <li>Iscariot <em>— 2022</em></li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section class="content-section section-cta" aria-labelledby="bio-cta-label">
            <span class="section-label" id="bio-cta-label">${t('section.contact', lang)}</span>
            <p class="cta-text">${t('contact.framing', lang)}</p>
            <a href="mailto:${SITE_CONFIG.EMAIL}" class="cta-email">${SITE_CONFIG.EMAIL}</a>
            <a href="/contact" data-link="/contact" class="cta-btn">${t('contact.submit', lang)}</a>
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
          </footer>

        </div>
      </div>
    `;

    el.querySelectorAll('[data-link]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        Router.navigate(a.getAttribute('data-link'));
      });
    });
  },
};
