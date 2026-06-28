/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games-realm-of-taiwu.js
   /games/realm-of-taiwu
══════════════════════════════════════════════════════════ */

const _ROT_DATA = {
  title:      'Realm of Taiwu: Teaser Trailer',
  titleLabel: 'Action Roguelite',

  credits: [
    { label: 'Developer',       value: 'Leap Studio' },
    { label: 'Publisher',       value: '4Divinity' },
    { label: 'Role',            value: 'Composer' },
    { label: 'Teaser Released', value: 'August 2025' },
  ],

  /* Replace this with your own description before launch */
  description: 'Realm of Taiwu (太吾弄世劫) is an action roguelite by Leap Studio and ConchShip Games, rooted in Chinese mythology and wuxia tradition, with hand-painted ink-wash visuals and kinetic top-down combat. I composed the music for the teaser trailer — [add your description of the music direction here].',

  videoSrc: 'taiwu_PV.mp4',
  steamUrl: 'https://store.steampowered.com/app/3452720/Realm_of_Taiwu/',
};

const RealmOfTaiwuPage = {
  mount(el) {
    const lang = getCurrentLang();
    const d = _ROT_DATA;

    el.className = 'page-subpage page-show page-show--rot';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true">${_DIVIDER_SVG}</div>
        <div class="subpage-content">

          <header class="game-hero">
            <span class="game-hero__label">${d.titleLabel}</span>
            <h1 class="game-hero__title">${d.title}</h1>
          </header>

          <div class="show-media__video-wrap" style="margin-bottom: var(--sp-md)">
            <video class="show-yt-embed" controls preload="metadata">
              <source src="${d.videoSrc}" type="video/mp4">
            </video>
          </div>

          <a href="${d.steamUrl}" class="game-hero__steam" target="_blank" rel="noopener noreferrer"
             style="display:block; margin-bottom: var(--sp-2xl)">View on Steam ↗</a>

          <section class="content-section" aria-labelledby="credits-rot">
            <span class="section-label" id="credits-rot">Credits</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${c.label}</dt>
                  <dd class="show-credits__value">${c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="desc-rot">
            <span class="section-label" id="desc-rot">About</span>
            <p class="game-description">${d.description}</p>
          </section>

          <section class="content-section">
            <a href="/contact" data-link="/contact" class="cta-btn">Let's work together!</a>
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/games" data-link="/games" class="footer-sibling">← All Games</a>
          </footer>

        </div>
      </div>`;

    _initGameLinks(el);
  },
};
