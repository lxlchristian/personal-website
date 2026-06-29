/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/musicals-salooney-tunes.js
   /musicals/salooney-tunes
══════════════════════════════════════════════════════════ */

const _SALOONEY_DATA = {
  title:     'Salooney Tunes',
  year:      2026,
  producer:  'the Hasty Pudding Theatricals',
  poster:    'salooneytunes-poster.jpg',
  posterAlt: 'Salooney Tunes — 2026 Hasty Pudding Theatricals production poster',

  credits: [
    { label: 'Book',            value: 'Benjamin Langman and Gunnar Sizemore' },
    { label: 'Lyrics',          value: 'Olivia Data' },
    { label: 'Music',           value: 'Christian Liu' },
    { label: 'Orchestrations',  value: 'Allen Feinstein, Peter Mansfield, Ben Green, Fraser Weist, Christian Liu' },
    { label: 'Direction',       value: 'Larry Sousa' },
    { label: 'Music Direction', value: 'José Degaldo' },
  ],

  performances: [
    {
      dates: { en: 'February 6–March 8, 2026', zh: '2026年2月6日 – 3月8日',  ja: '2026年2月6日〜3月8日'  },
      venue: { en: 'Farkas Hall, Cambridge, MA',              zh: '法卡斯厅，剑桥，马萨诸塞州',                   ja: 'ファーカス・ホール、ケンブリッジ、マサチューセッツ州'   },
    },
    {
      dates: { en: 'March 13–14, 2026',         zh: '2026年3月13–14日',        ja: '2026年3月13〜14日'        },
      venue: { en: 'Kaye Playhouse, New York',                zh: '凯伊剧场，纽约',                                ja: 'カイ・プレイハウス、ニューヨーク'                       },
    },
    {
      dates: { en: 'March 18–20, 2026',         zh: '2026年3月18–20日',        ja: '2026年3月18〜20日'        },
      venue: { en: 'Earl Cameron Theater, Hamilton, Bermuda', zh: '厄尔·卡梅伦剧场，百慕大哈密尔顿',              ja: 'アール・キャメロン劇場、バミューダ・ハミルトン'         },
    },
  ],

  synopsis: 'Salooney Tunes is a knee-slapping, nail-biting heist-gone-wrong that follows notorious outlaw Robin Yablind and his fame-hungry sidekick Wyatt Aintme. They must find a way to avoid Mayor Gerri Mandarin and pregnant Sheriff Carrie N Twins, who are on the hunt to put them behind bars. Chock-full of lovable characters like skittish saloon owner Bart Ender, sultry saloon-singer Sarah Problem, and twelve-year-old dancer Anna Fivesix-Fivesixseveneight, Salooney Tunes\'s twists and turns will keep you on the edge of your seat.',

  /* Pre-release rough mixes — shown before the Spotify cast recording goes live.
     Add { title, src, durationStr } entries; only rows with a src are rendered. */
  tracks: [
    { title: 'Want To Be Wanted', src: 'WantToBeWanted_rough.wav', durationStr: '5:20' },
    { title: 'Rodeo and Juliet', src: 'Rodeo_rough.wav', durationStr: '3:09' },
    { title: 'Salooney Tunes', src: 'SalooneyTunes_rough.wav', durationStr: '4:08' },
  ],
};

const SalooneyTunesPage = {
  mount(el) {
    const lang = getCurrentLang();
    const d = _SALOONEY_DATA;

    el.className = 'page-subpage page-show page-show--salooney';
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
                <p class="show-hero__role">${t('show.musicBy', lang)} Christian Liu</p>
                <p class="show-hero__producer">${t('show.producedBy', lang)} <a href="https://www.hastypudding.org/" target="_blank" rel="noopener" class="show-hero__producer-link">${d.producer}</a></p>
              </div>
            </div>
          </header>

          <section class="content-section" aria-labelledby="credits-st">
            <span class="section-label" id="credits-st">${t('show.credits', lang)}</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${t('credit.field.' + c.label, lang) || c.label}</dt>
                  <dd class="show-credits__value">${c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="perf-st">
            <span class="section-label" id="perf-st">${t('show.performances', lang)}</span>
            <ol class="show-perf-list">
              ${d.performances.map(p => `
                <li class="show-perf-item">
                  <p class="show-perf-dates">${p.dates[lang] || p.dates.en}</p>
                  <p class="show-perf-venue">${p.venue[lang] || p.venue.en}</p>
                </li>`).join('')}
            </ol>
          </section>

          <section class="content-section" aria-labelledby="synopsis-st">
            <span class="section-label" id="synopsis-st">${t('show.synopsis', lang)}</span>
            <p class="show-synopsis__text">${d.synopsis}</p>
          </section>

          <section class="content-section" aria-labelledby="music-st">
            <span class="section-label" id="music-st">${t('show.music', lang)}</span>
            <p class="show-roughmix-note">${t('show.roughMixNote', lang)}</p>
            <div class="track-list" id="salooney-track-list" role="list"></div>

            <div id="spotify-salooney" style="margin-top: var(--sp-xl)">
              <!--
                SPOTIFY EMBED — replace this entire <div> with the Spotify iframe when the album is live.

                Paste the embed code from Spotify here:
                  <iframe style="border-radius:12px"
                          src="https://open.spotify.com/embed/album/ALBUM_ID"
                          width="100%" height="352" frameBorder="0" allowfullscreen=""
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy" title="Salooney Tunes — Original Cast Recording"></iframe>
              -->
              <div class="mus-spotify-placeholder">
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
            </div>
          </section>

          <section class="content-section">
            <a href="/contact" data-link="/contact" class="cta-btn">${t('cta.workTogether', lang)}</a>
            ${_ctaSocialHTML()}
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/musicals" data-link="/musicals" class="footer-sibling">${t('footer.backMusicals', lang)}</a>
          </footer>

        </div>
      </div>`;

    /* Build pre-release track rows and wire to AudioPlayer */
    const trackList = el.querySelector('#salooney-track-list');
    const rows = d.tracks
      .filter(tr => tr.src)
      .map(tr => {
        const audioConfig = { src: tr.src, title: tr.title, source: 'Salooney Tunes', available: true };
        const rowEl = buildTrackRow({ title: tr.title, meta: 'Salooney Tunes / The Hasty Pudding Cast & Band', duration: tr.durationStr, available: true });
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
