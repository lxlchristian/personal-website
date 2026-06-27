/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games-island-of-hearts.js
   /games/island-of-hearts
══════════════════════════════════════════════════════════ */

const _IOH_DATA = {
  title:      'Island of Hearts',
  titleLabel: 'Dating Simulator · 2026',

  credits: [
    { label: 'Developer', value: 'Titan Digital Media' },
    { label: 'Publisher', value: '4Divinity' },
    { label: 'Role',      value: 'Composer and Sound Designer' },
  ],

  description: 'Island of Hearts is a live-action dating simulator set on a sun-drenched tropical island, blending real-video characters with choice-driven storytelling. The score is a departure from my usual work — the main theme leans unapologetically into the cutesy and tropical, while the background tracks strip back to solo piano, minimal and warm, leaving space for the story to breathe.',

  screenshots: [
    { src: 'ioh-screenshot-1.jpg', alt: 'Island of Hearts — character storyline selection screen' },
    { src: 'ioh-screenshot-2.jpg', alt: 'Island of Hearts — Gabby\'s room exploration scene' },
  ],

  youtubeId: '636WXykodVE',
  steamUrl:  'https://store.steampowered.com/app/3794770/Island_of_Hearts/',

  tracks: [
    { title: 'Island of Hearts Main Theme', src: 'ioh_theme.mp3',     durationStr: '2:14' },
    { title: 'Sweet Dreaming',              src: 'sweet_dreaming.wav', durationStr: '1:42' },
  ],
};

const IslandOfHeartsPage = {
  mount(el) {
    const lang = getCurrentLang();
    const d = _IOH_DATA;

    el.className = 'page-subpage page-show page-show--ioh';
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

          <section class="content-section" aria-labelledby="desc-ioh">
            <span class="section-label" id="desc-ioh">About</span>
            <p class="game-description">${d.description}</p>
          </section>

          <section class="content-section" aria-labelledby="screens-ioh">
            <span class="section-label" id="screens-ioh">Screenshots</span>
            <div class="game-screenshot-strip">
              ${d.screenshots.map(s => `
                <img class="game-screenshot-strip__img" src="${s.src}" alt="${s.alt}" loading="lazy"/>`).join('')}
            </div>
          </section>

          <section class="content-section" aria-labelledby="media-ioh">
            <span class="section-label" id="media-ioh">Media</span>
            <div class="show-media__video-wrap" style="margin-bottom: var(--sp-2xl)">
              <iframe class="show-yt-embed"
                      src="https://www.youtube.com/embed/${d.youtubeId}"
                      title="Island of Hearts — official trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen loading="lazy"></iframe>
            </div>
            <span class="show-media__sub-label">Soundtrack</span>
            <div class="track-list" id="ioh-track-list" role="list"></div>
          </section>

          <section class="content-section" aria-labelledby="cta-ioh">
            <span class="section-label" id="cta-ioh">Get in Touch</span>
            <p class="cta-text">Working on a game? I'd love to hear about it.</p>
            <a href="mailto:${SITE_CONFIG.EMAIL}" class="cta-email">${SITE_CONFIG.EMAIL}</a>
            <div class="game-cta-row">
              <a href="/contact" data-link="/contact" class="cta-btn">Get in Touch</a>
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

    /* ── Build track rows ──────────────────────────────────── */
    const trackList = el.querySelector('#ioh-track-list');
    const rows = d.tracks.map(track => {
      const audioConfig = {
        src:       track.src,
        title:     track.title,
        source:    d.title,
        available: true,
      };
      const rowEl = buildTrackRow({
        title:     track.title,
        meta:      d.title,
        duration:  track.durationStr,
        available: true,
      });
      const iconEl = rowEl.querySelector('.track-row__play-icon');
      rowEl.querySelector('.track-row__play').addEventListener('click', () => {
        AudioPlayer.setLastTrigger(iconEl);
        AudioPlayer.play(audioConfig);
      });
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
