/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games.js
   ──────────────────────────────────────────────────────────
   Games subpage: reel, professional credits, featured tracks,
   inline contact.
══════════════════════════════════════════════════════════ */

/* ── Divider SVG — shared with all musicals pages ───────── */
/* Lines at ±6° from vertical, crossing at (26, 50).
   preserveAspectRatio="none" + vector-effect keeps 1.5px visual weight. */
const _DIVIDER_SVG = `
<svg width="100%" height="100%" viewBox="0 0 52 100"
     preserveAspectRatio="none" aria-hidden="true">
  <defs>
    <linearGradient id="divGrad1" gradientUnits="userSpaceOnUse"
      x1="-16" y1="0" x2="68" y2="100">
      <stop offset="0%"   stop-color="#E4E3D5" stop-opacity="0.75"/>
      <stop offset="48%"  stop-color="#E4E3D5" stop-opacity="0"/>
      <stop offset="52%"  stop-color="#E4E3D5" stop-opacity="0"/>
      <stop offset="100%" stop-color="#E4E3D5" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="divGrad2" gradientUnits="userSpaceOnUse"
      x1="68" y1="0" x2="-16" y2="100">
      <stop offset="0%"   stop-color="#E4E3D5" stop-opacity="0.75"/>
      <stop offset="48%"  stop-color="#E4E3D5" stop-opacity="0"/>
      <stop offset="52%"  stop-color="#E4E3D5" stop-opacity="0"/>
      <stop offset="100%" stop-color="#E4E3D5" stop-opacity="0.75"/>
    </linearGradient>
  </defs>
  <line x1="-16" y1="0" x2="68" y2="100"
        stroke="url(#divGrad1)" stroke-width="4"
        vector-effect="non-scaling-stroke"/>
  <line x1="68" y1="0" x2="-16" y2="100"
        stroke="url(#divGrad2)" stroke-width="4"
        vector-effect="non-scaling-stroke"/>
</svg>`;

/* ── Shared: SPA link init (used by game subpages too) ──── */
function _initGameLinks(el) {
  el.querySelectorAll('[data-link]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      Router.navigate(a.getAttribute('data-link'));
    });
  });
}

/* ── Page object ─────────────────────────────────────────── */
const GamesPage = {
  mount(el) {
    const lang = getCurrentLang();
    el.className = 'page-subpage page-games';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true">${_DIVIDER_SVG}</div>
        <div class="subpage-content">

          ${SITE_CONFIG.VIDEOS.games.length ? `
          <section class="content-section section-reel" aria-labelledby="reel-label">
            <span class="section-label" id="reel-label">${t('section.reel', lang)}</span>
            <video class="reel-video" controls preload="metadata">
              <source src="./gamescoringreel_210626.mov" type="video/mp4">
              <source src="./gamescoringreel_210626.mov" type="video/quicktime">
            </video>
          </section>` : ''}

          ${SITE_CONFIG.CREDITS.games.length ? `
          <section class="content-section section-credits" aria-labelledby="credits-label">
            <span class="section-label" id="credits-label">${t('section.credits', lang)}</span>
            <div class="credits-grid">
              ${SITE_CONFIG.CREDITS.games.map(credit => `
              <a class="game-credit-card" href="${credit.page}" data-link="${credit.page}">
                <div class="game-credit-card__img">
                  ${credit.image
                    ? `<img src="${credit.image}" alt="${credit.gameTitle}" loading="lazy"/>`
                    : `<div class="game-credit-card__img-placeholder"></div>`}
                </div>
                <div class="game-credit-card__body">
                  <p class="game-credit-card__title">${credit.gameTitle}</p>
                  <p class="game-credit-card__meta">${credit.genre} · ${credit.year} · ${credit.studio}</p>
                  <p class="game-credit-card__role">${tCredit(credit, lang)}</p>
                </div>
              </a>`).join('')}
            </div>
          </section>` : ''}

          <section class="content-section section-tracks" aria-labelledby="tracks-label">
            <span class="section-label" id="tracks-label">${t('section.tracks', lang)}</span>
            <div class="track-list" id="games-track-list" role="list"></div>
          </section>

          <section class="content-section section-cta">
            <a href="/contact" data-link="/contact" class="cta-btn">Let's work together!</a>
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/musicals" data-link="/musicals" class="footer-sibling">${t('footer.sibling', lang)}</a>
          </footer>

        </div>
      </div>`;

    /* ── Build track rows ──────────────────────────────────── */
    const trackList = el.querySelector('#games-track-list');
    const rows = SITE_CONFIG.TRACKS.map(track => {
      const { gameLabel, genreLabel } = tTrack(track, lang);
      const audioConfig = {
        src:       track.src,
        title:     track.title,
        source:    gameLabel,
        available: !!track.src,
      };
      const rowEl = buildTrackRow({
        title:     track.title,
        meta:      gameLabel + ' · ' + genreLabel,
        duration:  track.durationStr,
        available: !!track.src,
      });

      if (audioConfig.available) {
        const iconEl = rowEl.querySelector('.track-row__play-icon');
        rowEl.querySelector('.track-row__play').addEventListener('click', () => {
          AudioPlayer.setLastTrigger(iconEl);
          AudioPlayer.play(audioConfig);
        });
      }

      trackList.appendChild(rowEl);
      return { el: rowEl, config: audioConfig };
    });

    /* ── Sync active state with AudioPlayer ────────────────── */
    function _syncRows() {
      const current = AudioPlayer.getCurrentTrack();
      const playing = AudioPlayer.isPlaying();
      rows.forEach(({ el: rowEl, config }) => {
        if (!rowEl.isConnected) return;
        const isActive = !!(current && current.src === config.src);
        rowEl.classList.toggle('track-row--active', isActive);
        const iconPlay  = rowEl.querySelector('.ap-row-icon-play');
        const iconPause = rowEl.querySelector('.ap-row-icon-pause');
        if (iconPlay)  iconPlay.style.display  = (isActive && playing) ? 'none' : '';
        if (iconPause) iconPause.style.display = (isActive && playing) ? ''     : 'none';
        const btn = rowEl.querySelector('.track-row__play');
        if (btn) btn.setAttribute('aria-label',
          (isActive && playing) ? `Pause ${config.title}` : `Play ${config.title}`);
      });
    }

    AudioPlayer.onTrackChange(_syncRows);
    AudioPlayer.onPlayStateChange(_syncRows);
    _syncRows();

    _initGameLinks(el);
  },
};
