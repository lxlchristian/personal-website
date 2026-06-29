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

/* ── Shared: social icons for CTA sections ───────────────── */
function _ctaSocialHTML() {
  const s = SITE_CONFIG.SOCIAL;
  if (!s || !Object.values(s).some(v => v)) return '';
  return `<div class="cta-social">
    ${s.youtube    ? `<a href="${s.youtube}"    class="social-icon-link" target="_blank" rel="noopener" aria-label="YouTube">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
    </a>` : ''}
    ${s.soundcloud ? `<a href="${s.soundcloud}" class="social-icon-link" target="_blank" rel="noopener" aria-label="SoundCloud">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.175 12.225c-.108 0-.198.088-.211.197l-.309 2.453.309 2.412c.013.109.103.195.211.195.107 0 .196-.086.21-.195l.351-2.412-.351-2.453c-.014-.109-.103-.197-.21-.197zm1.59-.956c-.127 0-.232.104-.245.23l-.27 3.409.27 3.35c.013.126.118.228.245.228.126 0 .231-.102.244-.228l.308-3.35-.308-3.409c-.013-.126-.118-.23-.244-.23zm1.625-.246c-.146 0-.265.12-.277.265l-.234 3.655.234 3.578c.012.145.131.263.277.263.145 0 .264-.118.277-.263l.266-3.578-.266-3.655c-.013-.145-.132-.265-.277-.265zM9 5.997c-.553 0-1.086.1-1.58.28C7.077 3.92 5.267 2.25 3.078 2.25c-.553 0-1 .448-1 1v16.5c0 .553.447 1 1 1H9h11.5c1.38 0 2.5-1.12 2.5-2.5 0-1.381-1.12-2.5-2.5-2.5-.122 0-.241.009-.357.027C20.22 13.01 18.32 11.25 16 11.25c-.553 0-1.07.108-1.543.302C13.888 8.353 11.656 6 9 6v-.003z"/></svg>
    </a>` : ''}
    ${s.instagram  ? `<a href="${s.instagram}"  class="social-icon-link" target="_blank" rel="noopener" aria-label="Instagram">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    </a>` : ''}
    ${s.linkedin   ? `<a href="${s.linkedin}"   class="social-icon-link" target="_blank" rel="noopener" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    </a>` : ''}
  </div>`;
}

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

          <section class="content-section section-reel" aria-labelledby="reel-label">
            <span class="section-label" id="reel-label">${t('section.reel', lang)}</span>
            <div class="show-media__video-wrap" style="margin-bottom: var(--sp-md)">
              <iframe class="show-yt-embed"
                src="https://www.youtube.com/embed/DTsnKl34Ap4"
                title="Game Scoring Reel"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen loading="lazy"></iframe>
            </div>
          </section>

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
                  <p class="game-credit-card__meta">${t('track.game.' + credit.genre, lang)} · ${credit.year} · ${credit.studio}</p>
                  <p class="game-credit-card__role">${tCredit(credit, lang)}</p>
                </div>
              </a>`).join('')}
            </div>
          </section>` : ''}

          <section class="content-section" aria-labelledby="addl-credits-label">
            <span class="section-label" id="addl-credits-label">${t('section.additionalCredits', lang)}</span>
            <div class="mus-orch-list">
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">outrun the moon!</h3>
                <p class="mus-orch-meta">${t('credit.field.Original Soundtrack + Interactive Audio', lang)} · Harvard</p>
              </div>
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">Tempo Takedown</h3>
                <p class="mus-orch-meta">${t('credit.field.Original Soundtrack', lang)} · MIT</p>
              </div>
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">Chasing Lunar</h3>
                <p class="mus-orch-meta">${t('credit.field.Contributed Tracks', lang)} · Berklee/USC</p>
              </div>
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">Scythe of Sidereal</h3>
                <p class="mus-orch-meta">${t('credit.field.Sound Design', lang)} · Berklee/USC</p>
              </div>
            </div>
          </section>

          <section class="content-section section-tracks" aria-labelledby="tracks-label">
            <span class="section-label" id="tracks-label">${t('section.specTracks', lang)}</span>
            <div class="track-list" id="games-track-list" role="list"></div>
          </section>

          <section class="content-section section-cta">
            <a href="/contact" data-link="/contact" class="cta-btn">${t('cta.workTogether', lang)}</a>
            ${_ctaSocialHTML()}
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
        sourceKey: 'track.game.' + track.game,
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
