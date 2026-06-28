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
                  <picture>
                    <source media="(max-width: 768px)" srcset="landscape.JPG" />
                    <img src="portrait.JPG" alt="Christian Liu" class="bio-img" />
                  </picture>
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
              </div>

            </div>

            <div class="bio-credits">
              <div class="bio-credits__group">
                <span class="bio-credits__cat">${t('bio.credits.games', lang)}</span>
                <ul class="bio-credits__list">
                  <li><a href="/games/island-of-hearts" data-link="/games/island-of-hearts">Island of Hearts ↗</a> <em>— Composer &amp; Sound Designer · Titan Digital Media · 2026</em></li>
                  <li><a href="/games/realm-of-taiwu" data-link="/games/realm-of-taiwu">Realm of Taiwu ↗</a> <em>— Composer (Teaser Trailer) · LEAP Studio · 2025</em></li>
                </ul>
              </div>
              <div class="bio-credits__group">
                <span class="bio-credits__cat">${t('bio.credits.musicals', lang)}</span>
                <ul class="bio-credits__list">
                  <li><a href="/musicals/salooney-tunes" data-link="/musicals/salooney-tunes">Salooney Tunes ↗</a> <em>— Music · Hasty Pudding Theatricals · 2026</em></li>
                  <li><a href="/musicals/city-of-peace" data-link="/musicals/city-of-peace">City of Peace ↗</a> <em>— Music · Harvard Office for Fine Arts · 2025</em></li>
                  <li><a href="/musicals/post-mortem" data-link="/musicals/post-mortem">Post Mortem ↗</a> <em>— Music · Harvard Office for Fine Arts · 2023</em></li>
                </ul>
              </div>
              <div class="bio-credits__group">
                <span class="bio-credits__cat">${t('bio.credits.orchestrations', lang)}</span>
                <ul class="bio-credits__list">
                  <li>Be Cozy <em>— Sound Design / Scoring · Harvard-Radcliffe Dramatic Club · 2025</em></li>
                  <li>White House Princess <em>— Music Direction · Harvard-Radcliffe Dramatic Club · 2023</em></li>
                  <li>Iscariot <em>— Orchestration · Harvard-Radcliffe Dramatic Club · 2022</em></li>
                </ul>
              </div>
            </div>
          </section>

          <section class="content-section section-cta">
            <a href="/contact" data-link="/contact" class="cta-btn">Let's work together!</a>
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
