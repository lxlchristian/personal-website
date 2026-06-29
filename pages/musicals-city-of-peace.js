/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/musicals-city-of-peace.js
   /musicals/city-of-peace
══════════════════════════════════════════════════════════ */

const _COP_DATA = {
  title:     'City of Peace',
  year:      2025,
  role:      'Music by Christian Liu',
  producer:  'Harvard Office for Fine Arts',
  poster:    'cityofpeace-poster.jpg',
  posterAlt: 'City of Peace — 2025 Harvard Office for Fine Arts production poster',

  credits: [
    { label: 'Book and Lyrics',  value: 'Paul Palmer' },
    { label: 'Music',            value: 'Christian Liu' },
    { label: 'Orchestrations',   value: 'Quinn McMath, Charlie Melton, Tyler Doucette, Martín Schnell Sanchez' },
    { label: 'Direction',        value: 'Jolana Kampfova' },
    { label: 'Music Direction',  value: 'Christian Liu' },
    { label: 'Choreography',     value: 'Leonard Walletzky' },
  ],

  performances: [
    { dates: 'December 5–7, 2025', venue: 'Agassiz Theater, Cambridge, MA' },
  ],

  synopsis: 'City of Peace is a dark musical drama set in the cursed village of Myrhorod, loosely based on the stories of Nikolai Gogol. When Khoma Brut, an orphaned painter-philosopher, wanders into the wrong khutir on a summer holiday, he finds himself bound by promise to pray over the body of a girl he knows he killed. With his theologian companion Khaliava detained nearby, Khoma navigates three nights of haunting, manipulation, and moral collapse, faced with the question of what kind of man he is willing to become.',

  /* YouTube embed: replace YOUTUBE_ID with the actual video ID from the URL (?v=...) */
  youtubeId: '7GpOX9bDCwk',

  tracks: [
    { title: 'The Cards',      src: 'cop_thecards.mp3',     durationStr: '' },
    { title: "A Devil's Born", src: 'cop_adevilsborn.mp3',  durationStr: '' },
    { title: 'The Bell Knell', src: 'cop_thebellknell.mp3', durationStr: '' },
  ],
};

const CityOfPeacePage = {
  mount(el) {
    const lang = getCurrentLang();
    const d = _COP_DATA;

    const mediaSection = d.youtubeId
      ? `<iframe class="show-yt-embed"
                 src="https://www.youtube.com/embed/${d.youtubeId}"
                 title="City of Peace — musical theater production video"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowfullscreen loading="lazy"></iframe>`
      : `<!--
           YOUTUBE EMBED — paste the video ID from the YouTube URL into _COP_DATA.youtubeId above.
           The embed will render automatically once the ID is set.
         -->
         <div class="show-yt-placeholder">
           <div class="show-yt-placeholder__inner">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.2" stroke-linecap="round" aria-hidden="true">
               <rect x="2" y="5" width="20" height="14" rx="2"/>
               <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
             </svg>
             <p class="show-yt-placeholder__label">${t('show.videoComingSoon', lang)}</p>
           </div>
         </div>`;

    el.className = 'page-subpage page-show page-show--cop';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true">${_DIVIDER_SVG}</div>
        <div class="subpage-content">

          <header class="show-hero">
            <div class="show-hero__layout">
              <div class="show-hero__poster-col">
                <img class="show-hero__poster" src="${d.poster}" alt="${d.posterAlt}" loading="eager"/>
              </div>
              <div class="show-hero__info">
                <span class="show-hero__label">${t('show.musicalTheater', lang)} · ${d.year}</span>
                <h1 class="show-hero__title">${d.title}</h1>
                <p class="show-hero__role">${d.role}</p>
                <p class="show-hero__producer">${t('show.producedBy', lang)} ${d.producer}</p>
              </div>
            </div>
          </header>

          <section class="content-section" aria-labelledby="credits-cop">
            <span class="section-label" id="credits-cop">${t('show.credits', lang)}</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${t('credit.field.' + c.label, lang) || c.label}</dt>
                  <dd class="show-credits__value">${c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="perf-cop">
            <span class="section-label" id="perf-cop">${t('show.performances', lang)}</span>
            <ol class="show-perf-list">
              ${d.performances.map(p => `
                <li class="show-perf-item">
                  <p class="show-perf-dates">${p.dates}</p>
                  <p class="show-perf-venue">${p.venue}</p>
                </li>`).join('')}
            </ol>
          </section>

          <section class="content-section" aria-labelledby="synopsis-cop">
            <span class="section-label" id="synopsis-cop">${t('show.synopsis', lang)}</span>
            <p class="show-synopsis__text">${d.synopsis}</p>
          </section>

          <section class="content-section" aria-labelledby="media-cop">
            <span class="section-label" id="media-cop">${t('show.media', lang)}</span>
            <div class="show-media__video-wrap">
              ${mediaSection}
            </div>
          </section>

          <section class="content-section" aria-labelledby="tracks-cop">
            <span class="section-label" id="tracks-cop">${t('section.tracks', lang)}</span>
            <div class="track-list" id="cop-track-list" role="list"></div>
            <div class="mus-spotify-placeholder" style="margin-top: var(--sp-xl)">
              <div class="mus-spotify-inner">
                <svg class="mus-spotify-icon" width="22" height="22" viewBox="0 0 24 24"
                     fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12
                    2zm4.586 14.424a.622.622 0 01-.857.208c-2.348-1.435-5.304-1.76-8.785-.964a.623.623
                    0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115.294.181.387.564.207.856zm1.223-2.722a.78.78
                    0 01-1.072.257C14.25 12.314 10.95 11.9 7.84 12.8a.78.78 0 01-.426-1.499c3.522-.999
                    7.192-.516 9.939 1.329a.78.78 0 01.256 1.072zm.105-2.834C15.16 9.15 10.535 9 7.2
                    9.984a.937.937 0 01-.517-1.8C10.4 7.08 15.503 7.25 18.9 9.387a.938.938 0 01-.986 1.481z"/>
                </svg>
                <p class="mus-spotify-label">${t('show.spotifyComingSoon', lang)}</p>
              </div>
            </div>
          </section>

          <section class="content-section">
            <a href="/contact" data-link="/contact" class="cta-btn">${t('cta.workTogether', lang)}</a>
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/musicals" data-link="/musicals" class="footer-sibling">${t('footer.backMusicals', lang)}</a>
          </footer>

        </div>
      </div>`;

    /* ── Build track rows ──────────────────────────────────── */
    const trackList = el.querySelector('#cop-track-list');
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

    _initMusLinks(el);
    _initMusReveals(el);
  },
};
