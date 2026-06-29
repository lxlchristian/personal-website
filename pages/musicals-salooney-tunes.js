/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/musicals-salooney-tunes.js
   /musicals/salooney-tunes
══════════════════════════════════════════════════════════ */

const _SALOONEY_DATA = {
  title:     'Salooney Tunes',
  year:      2026,
  role:      'Music by Christian Liu',
  producer:  'the Hasty Pudding Theatricals',
  poster:    'salooneytunes-poster.jpg',
  posterAlt: 'Salooney Tunes — 2026 Hasty Pudding Theatricals production poster',

  credits: [
    { label: 'Book',            value: 'Benjamin Langman and Gunnar Sizemore' },
    { label: 'Lyrics',          value: 'Olivia Data' },
    { label: 'Music',           value: 'Christian Liu' },
    { label: 'Orchestrations',  value: 'Allen Feinstein, Peter Mansfield, Benjamin Green, Fraser Weist, Christian Liu' },
    { label: 'Direction',       value: 'Larry Sousa' },
    { label: 'Music Direction', value: 'Jose Degaldos' },
  ],

  performances: [
    { dates: 'February 6–March 8, 2026', venue: 'Farkas Hall, Cambridge, MA'              },
    { dates: 'March 13–14, 2026',         venue: 'Kaye Playhouse, New York'                },
    { dates: 'March 18–20, 2026',         venue: 'Earl Cameron Theater, Hamilton, Bermuda' },
  ],

  synopsis: 'Salooney Tunes is a knee-slapping, nail-biting heist-gone-wrong that follows notorious outlaw Robin Yablind and his fame-hungry sidekick Wyatt Aintme. They must find a way to avoid Mayor Gerri Mandarin and pregnant Sheriff Carrie N Twins, who are on the hunt to put them behind bars. Chock-full of lovable characters like skittish saloon owner Bart Ender, sultry saloon-singer Sarah Problem, and twelve-year-old dancer Anna Fivesix-Fivesixseveneight, Salooney Tunes\'s twists and turns will keep you on the edge of your seat.',

  /* Featured song: add a local mp3 path to enable the player before Spotify goes live.
     Leave src empty and it won't render.                                                */
  featuredSong: { title: 'I Just Want To Be Wanted', src: '' /* ← add mp3 path */ },
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
                <p class="show-hero__role">${d.role}</p>
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
                  <p class="show-perf-dates">${p.dates}</p>
                  <p class="show-perf-venue">${p.venue}</p>
                </li>`).join('')}
            </ol>
          </section>

          <section class="content-section" aria-labelledby="synopsis-st">
            <span class="section-label" id="synopsis-st">${t('show.synopsis', lang)}</span>
            <p class="show-synopsis__text">${d.synopsis}</p>
          </section>

          <section class="content-section" aria-labelledby="music-st">
            <span class="section-label" id="music-st">${t('show.music', lang)}</span>

            ${d.featuredSong.src ? `
            <div class="show-media__local">
              <span class="show-media__sub-label">${t('show.featuredRecording', lang)}</span>
              <div class="show-feat-row">
                <button class="mus-feat-play" data-src="${d.featuredSong.src}"
                        aria-label="Play ${d.featuredSong.title}">
                  <svg class="icon-play" width="15" height="15" viewBox="0 0 24 24"
                       fill="currentColor" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
                  <svg class="icon-pause" width="15" height="15" viewBox="0 0 24 24"
                       fill="currentColor" aria-hidden="true"
                       style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                </button>
                <p class="show-feat-title">${d.featuredSong.title}</p>
              </div>
            </div>` : ''}

            <div id="spotify-salooney">
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
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/musicals" data-link="/musicals" class="footer-sibling">${t('footer.backMusicals', lang)}</a>
          </footer>

        </div>
      </div>`;

    /* Local audio buttons (when featuredSong.src is set, wire to global AudioPlayer) */
    el.querySelectorAll('.mus-feat-play[data-src]').forEach(btn => {
      const src = btn.dataset.src;
      if (!src) return;
      btn.addEventListener('click', () => {
        AudioPlayer.setLastTrigger(btn);
        AudioPlayer.play({ src, title: btn.closest('[data-title]')?.dataset.title || '', source: 'Salooney Tunes', available: true });
      });
    });

    _initMusLinks(el);
    _initMusReveals(el);
  },
};
