/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games-realm-of-taiwu.js
   /games/realm-of-taiwu
══════════════════════════════════════════════════════════ */

const _ROT_DATA = {
  title:      'Realm of Taiwu Teaser Trailer',
  titleLabel: 'Action Roguelite',

  credits: [
    { label: 'Developer',       value: 'Leap Studio' },
    { label: 'Publisher',       value: '4Divinity' },
    { label: 'Role',            value: 'Composer' },
    { label: 'Teaser Released', value: 'August 2025' },
  ],

  /* Replace this with your own description before launch */
  description: 'Realm of Taiwu (太吾弄世劫) is an action roguelite by Leap Studio and ConchShip Games, rooted in Chinese mythology and wuxia tradition, with hand-painted ink-wash visuals and kinetic top-down combat. I composed the music for the teaser trailer — [add your description of the music direction here].',

  screenshots: [
    { src: 'taiwu-screenshot-1.jpg', alt: 'Realm of Taiwu — gameplay screenshot' },
    { src: 'taiwu-screenshot-2.jpg', alt: 'Realm of Taiwu — title card' },
  ],

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
            <a href="${d.steamUrl}" class="game-hero__steam" target="_blank" rel="noopener noreferrer">View on Steam ↗</a>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${c.label}</dt>
                  <dd class="show-credits__value">${c.value}</dd>
                </div>`).join('')}
            </dl>
          </header>

          <div class="game-hero-image">
            <img src="realmoftaiwu-hero.jpg" alt="Realm of Taiwu" loading="eager" />
          </div>

          <section class="content-section" aria-labelledby="desc-rot">
            <span class="section-label" id="desc-rot">About</span>
            <p class="game-description">${d.description}</p>
          </section>

          <section class="content-section" aria-labelledby="screens-rot">
            <span class="section-label" id="screens-rot">Screenshots</span>
            <div class="game-screenshot-strip">
              ${d.screenshots.map(s => `
                <img class="game-screenshot-strip__img" src="${s.src}" alt="${s.alt}" loading="lazy"/>`).join('')}
            </div>
          </section>

          <section class="content-section" aria-labelledby="media-rot">
            <span class="section-label" id="media-rot">Teaser Trailer</span>
            <div class="show-media__video-wrap">
              <video class="show-yt-embed" controls preload="metadata">
                <source src="${d.videoSrc}" type="video/mp4">
              </video>
            </div>
          </section>

          <section class="content-section" aria-labelledby="cta-rot">
            <span class="section-label" id="cta-rot">Get in Touch</span>
            <p class="cta-text">Working on a game? I'd love to hear about it.</p>
            <a href="mailto:${SITE_CONFIG.EMAIL}" class="cta-email">${SITE_CONFIG.EMAIL}</a>
            <div class="game-cta-row">
              <a href="${d.steamUrl}" class="cta-steam" target="_blank" rel="noopener noreferrer">
                View on Steam ↗
              </a>
            </div>
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
