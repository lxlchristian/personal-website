/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/musicals.js
   ──────────────────────────────────────────────────────────
   /musicals index: featured tracks, production cards,
   orchestration credits, contact CTA.

   Also defines shared helpers used by the three individual
   show page files (loaded after this one).
══════════════════════════════════════════════════════════ */

/* ── Shared: SPA link init ──────────────────────────────── */
function _initMusLinks(el) {
  el.querySelectorAll('[data-link]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      Router.navigate(a.getAttribute('data-link'));
    });
  });
}

/* ── Shared: scroll reveal ──────────────────────────────── */
function _initMusReveals(el) {
  if (!('IntersectionObserver' in window)) {
    el.querySelectorAll('.mus-reveal').forEach(n => n.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.06 });
  el.querySelectorAll('.mus-reveal').forEach(n => obs.observe(n));
}

/* ── Index page data ────────────────────────────────────── */

/* Featured tracks — one per show, curated sampler.
   Set src to a local mp3 path and available: true to enable. */
const _FEATURED_TRACKS = [
  {
    title:     'I Just Want To Be Wanted',
    show:      'Salooney Tunes',
    showPath:  '/musicals/salooney-tunes',
    src:       'musical_song1.mp3',
    available: true,
  },
  {
    title:     'Never Die',
    show:      'City of Peace',
    showPath:  '/musicals/city-of-peace',
    src:       'musical_song2.mp3',
    available: true,
  },
  {
    title:     'Maybe It\'s Best to Tie',
    show:      'Post Mortem',
    showPath:  '/musicals/post-mortem',
    src:       '',
    available: false,
  },
];

/* Production cards — order is intentional (Salooney first) */
const _PRODUCTIONS_INDEX = [
  {
    title:      'Salooney Tunes',
    path:       '/musicals/salooney-tunes',
    year:       2026,
    producer:   'Hasty Pudding Theatricals',
    role:       'Music by Christian Liu',
    teaser:     'A high-energy comic western heist musical that ran in Cambridge, New York, and Bermuda.',
    poster:     'salooneytunes-poster.jpg',
    posterAlt:  'Salooney Tunes — 2026 Hasty Pudding Theatricals production poster',
  },
  {
    title:      'City of Peace',
    path:       '/musicals/city-of-peace',
    year:       2025,
    producer:   'Harvard Office for Fine Arts',
    role:       'Music by Christian Liu',
    teaser:     'A dark folk-inflected musical drama of haunting, guilt, and moral collapse.',
    poster:     'cityofpeace-poster.jpg',
    posterAlt:  'City of Peace — 2025 Harvard Office for Fine Arts production poster',
  },
  {
    title:      'Post Mortem',
    path:       '/musicals/post-mortem',
    year:       2023,
    producer:   'Harvard Office for Fine Arts',
    role:       'Music by Christian Liu',
    teaser:     'A comedy-musical set in a crumbling Classics department where an accidental ghost-summoning derails a desperate rescue plan.',
    poster:     'postmortem-poster.JPG',
    posterAlt:  'Post Mortem — 2023 Harvard Office for Fine Arts production poster',
  },
];

/* ── Production card HTML ───────────────────────────────── */
function _prodCard(prod) {
  return `
    <a class="mus-prod-card" href="${prod.path}" data-link="${prod.path}"
       aria-label="${prod.title}, ${prod.year}. ${prod.teaser}">
      <span class="mus-prod-card__year" aria-hidden="true">${prod.year}</span>
      <div class="mus-prod-card__body">
        <h3 class="mus-prod-card__title">
          ${prod.title}<span class="mus-prod-card__arrow" aria-hidden="true">↗</span>
        </h3>
        <div class="mus-prod-card__rule" aria-hidden="true"></div>
        <p class="mus-prod-card__credits">
          <span class="mus-prod-card__year-mobile" aria-hidden="true">${prod.year}&ensp;·&ensp;</span>${prod.producer}&ensp;·&ensp;${prod.role}
        </p>
        <p class="mus-prod-card__teaser">${prod.teaser}</p>
      </div>
      <div class="mus-prod-card__poster-col">
        <img src="${prod.poster}" alt="${prod.posterAlt}" loading="lazy"/>
      </div>
    </a>`;
}

/* ── Wire track rows to AudioPlayer ────────────────────── */
function _initIndexAudio(el) {
  const trackData = _FEATURED_TRACKS.map(t => ({
    src:       t.src,
    title:     t.title,
    source:    t.show,
    available: t.available,
  }));

  const rows = Array.from(el.querySelectorAll('.track-row'));

  rows.forEach((rowEl, i) => {
    const config = trackData[i];
    if (!config?.available) return;
    const iconEl = rowEl.querySelector('.track-row__play-icon');
    rowEl.querySelector('.track-row__play').addEventListener('click', () => {
      AudioPlayer.setLastTrigger(iconEl);
      AudioPlayer.play(config);
    });
  });

  function _syncRows() {
    const current = AudioPlayer.getCurrentTrack();
    const playing = AudioPlayer.isPlaying();
    rows.forEach((rowEl, i) => {
      if (!rowEl.isConnected) return;
      const config = trackData[i];
      if (!config) return;
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
}

/* ── Page object ─────────────────────────────────────────── */
const MusicalsPage = {
  mount(el) {
    const lang = getCurrentLang();
    el.className = 'page-subpage page-musicals';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true">${_DIVIDER_SVG}</div>
        <div class="subpage-content">

          <section class="content-section mus-reveal" aria-labelledby="feat-label">
            <span class="section-label" id="feat-label">Featured Tracks</span>
            <div class="track-list" id="mus-track-list" role="list"></div>
          </section>

          <section class="content-section mus-reveal" aria-labelledby="prod-label">
            <span class="section-label" id="prod-label">Productions</span>
            <div class="mus-prod-cards">
              ${_PRODUCTIONS_INDEX.map(_prodCard).join('')}
            </div>
          </section>

          <section class="content-section mus-reveal" aria-labelledby="orch-label">
            <span class="section-label" id="orch-label">Additional Credits</span>
            <div class="mus-orch-list">
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">Be Cozy</h3>
                <p class="mus-orch-meta">Sound Design / Scoring · 2025 · Harvard-Radcliffe Dramatic Club</p>
              </div>
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">White House Princess</h3>
                <p class="mus-orch-meta">Music Direction · 2023 · Harvard-Radcliffe Dramatic Club</p>
              </div>
              <div class="mus-orch-item">
                <h3 class="mus-orch-title">Iscariot</h3>
                <p class="mus-orch-meta">Orchestration · 2022 · Harvard-Radcliffe Dramatic Club</p>
              </div>
            </div>
          </section>

          <section class="content-section mus-reveal">
            <a href="/contact" data-link="/contact" class="cta-btn">Let's work together!</a>
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/games" data-link="/games" class="footer-sibling">I also score games →</a>
          </footer>

        </div>
      </div>`;

    /* Build track rows for featured tracks */
    const trackList = el.querySelector('#mus-track-list');
    _FEATURED_TRACKS.forEach(track => {
      trackList.appendChild(buildTrackRow({
        title:     track.title,
        meta:      track.show,
        available: track.available,
      }));
    });

    _initIndexAudio(el);
    _initMusLinks(el);
    _initMusReveals(el);
  },
};
