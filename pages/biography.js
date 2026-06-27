/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/biography.js
   Step 1: DOM scaffold.
   Step 3: Visual implementation (photo, facts, services).
══════════════════════════════════════════════════════════ */

const BiographyPage = {
  mount(el) {
    const lang = getCurrentLang();
    el.className = 'page-subpage page-biography';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true"></div>
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
                    <dt class="fact-label">${t('bio.educationLabel', lang)}</dt>
                    <dd class="fact-value">${t('bio.educationValue', lang)}</dd>
                  </div>
                  <div class="fact">
                    <dt class="fact-label">${t('bio.basedLabel', lang)}</dt>
                    <dd class="fact-value">${t('bio.basedValue', lang)}</dd>
                  </div>
                  <div class="fact">
                    <dt class="fact-label">${t('bio.specLabel', lang)}</dt>
                    <dd class="fact-value">${t('bio.specValue', lang)}</dd>
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
              </div>
            </div>
          </section>

          <section class="content-section section-services" aria-labelledby="svc-label">
            <span class="section-label" id="svc-label">Services</span>
            <div class="services-grid">
              ${['s1','s2','s3','s4'].map((k, i) => `
                <div class="service-card">
                  <h3 class="service-title">${t('svc.'+k+'.title', lang)}</h3>
                  <p class="service-desc">${t('svc.'+k+'.desc', lang)}</p>
                </div>`).join('')}
            </div>
          </section>

        </div>
      </div>
    `;
  },
};
