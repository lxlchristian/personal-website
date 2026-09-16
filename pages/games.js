/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games.js
   ──────────────────────────────────────────────────────────
   Games subpage: reel, professional credits, featured tracks,
   inline contact.
══════════════════════════════════════════════════════════ */

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

          <section class="content-section section-tracks" aria-labelledby="tracks-label">
            <span class="section-label" id="tracks-label">${t('section.specTracks', lang)}</span>
            <div class="track-list" id="games-track-list" role="list"></div>
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
                  <div class="game-credit-card__heading">
                    <p class="game-credit-card__title">${credit.gameTitle}</p>
                    <span class="card-link-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p class="game-credit-card__meta">${t('track.game.' + credit.genre, lang)} · ${credit.year} · ${credit.studio}</p>
                  <p class="game-credit-card__role">${tCredit(credit, lang)}</p>
                  <span class="card-tap-bar" aria-hidden="true">${t('cta.details', lang)}&ensp;↗</span>
                </div>
              </a>`).join('')}
            </div>
          </section>` : ''}

          <section class="content-section" aria-labelledby="addl-credits-label">
            <span class="section-label" id="addl-credits-label">${t('section.additionalCredits', lang)}</span>
            <div class="mus-orch-list">
              <div class="mus-orch-item">
                  <h3 class="mus-orch-title">Chasing Lunar</h3>
                  <p class="mus-orch-meta">${t('credit.field.Contributed Tracks', lang)} · Berklee/USC · 2025</p>
                </div>
              <div class="mus-orch-item">
                  <h3 class="mus-orch-title">Scythe of Sidereal</h3>
                  <p class="mus-orch-meta">${t('credit.field.Sound Design', lang)} · Berklee/USC · 2025</p>
                </div>
              
                <div class="mus-orch-item">
                  <h3 class="mus-orch-title">outrun the moon!</h3>
                  <p class="mus-orch-meta">${t('credit.field.Original Soundtrack + Interactive Audio', lang)} · Harvard · 2025</p>
              </div>
              <div class="mus-orch-item">
                  <h3 class="mus-orch-title">Tempo Takedown</h3>
                  <p class="mus-orch-meta">${t('credit.field.Original Soundtrack', lang)} · MIT · 2024</p>
                </div>
            </div>
          </section>

          <section class="content-section section-cta">
            <a href="/contact" data-link="/contact" class="cta-btn">${t('cta.workTogether', lang)}</a>
            ${renderSocialIcons('cta-social')}
          </section>

          <div class="section-crosslink">
            <a href="/musicals" data-link="/musicals" class="footer-sibling">${t('footer.sibling', lang)}</a>
          </div>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
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

    initPageLinks(el);
  },
};
