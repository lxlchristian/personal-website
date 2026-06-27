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

  synopsis: 'City of Peace is a dark musical drama set in the cursed village of Myrhorod, loosely based on the stories of Nikolai Gogol. When Khoma Brut, an orphaned painter-philosopher, wanders into the wrong khutir on a summer holiday, he finds himself bound by promise to pray over the body of a girl he knows he killed. With his theologian companion Khaliava detained nearby, Khoma navigates three nights of haunting, manipulation, and moral collapse — beginning to question not only what he owes the dead, but what kind of man he is willing to become.',

  /* YouTube embed: replace YOUTUBE_ID with the actual video ID from the URL (?v=...) */
  youtubeId: '', /* ← paste YouTube video ID here */

  /* Songs with unavailable audio */
  songs: [
    { title: 'Never Die',    desc: 'haunting folk tune intertwined with overtly happy dance' },
    { title: 'The Bell Knell', desc: 'choral lament' },
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
             <p class="show-yt-placeholder__label">Video coming soon</p>
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
                <span class="show-hero__label">Musical Theater · ${d.year}</span>
                <h1 class="show-hero__title">${d.title}</h1>
                <p class="show-hero__role">${d.role}</p>
                <p class="show-hero__producer">Produced by ${d.producer}</p>
              </div>
            </div>
          </header>

          <section class="content-section" aria-labelledby="credits-cop">
            <span class="section-label" id="credits-cop">Credits</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${c.label}</dt>
                  <dd class="show-credits__value">${c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="perf-cop">
            <span class="section-label" id="perf-cop">Performances</span>
            <ol class="show-perf-list">
              ${d.performances.map(p => `
                <li class="show-perf-item">
                  <p class="show-perf-dates">${p.dates}</p>
                  <p class="show-perf-venue">${p.venue}</p>
                </li>`).join('')}
            </ol>
          </section>

          <section class="content-section" aria-labelledby="synopsis-cop">
            <span class="section-label" id="synopsis-cop">Synopsis</span>
            <p class="show-synopsis__text">${d.synopsis}</p>
          </section>

          <section class="content-section" aria-labelledby="media-cop">
            <span class="section-label" id="media-cop">Media</span>

            <div class="show-media__video-wrap" style="margin-bottom: var(--sp-2xl)">
              ${mediaSection}
            </div>

            <span class="show-media__sub-label">Selected Songs</span>
            <div class="mus-feat-list">
              ${d.songs.map(s => `
                <div class="mus-feat-row mus-feat-row--unavailable">
                  <button class="mus-feat-play" disabled aria-disabled="true"
                          aria-label="Recording unavailable: ${s.title}">
                    <svg class="icon-play" width="15" height="15" viewBox="0 0 24 24"
                         fill="currentColor" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
                    <svg class="icon-pause" width="15" height="15" viewBox="0 0 24 24"
                         fill="currentColor" aria-hidden="true"
                         style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  </button>
                  <div class="mus-feat-info">
                    <p class="mus-feat-title">${s.title}</p>
                    <p class="mus-feat-meta">${s.desc}</p>
                  </div>
                  <div class="mus-feat-status">
                    <span class="mus-feat-coming">Recording coming soon</span>
                  </div>
                </div>`).join('')}
            </div>
          </section>

          <section class="content-section" aria-labelledby="cta-cop">
            <span class="section-label" id="cta-cop">Get in Touch</span>
            <p class="cta-text">Working on a musical? I'd love to hear about it.</p>
            <a href="mailto:${SITE_CONFIG.EMAIL}" class="cta-email">${SITE_CONFIG.EMAIL}</a>
            <a href="/contact" data-link="/contact" class="cta-btn">Get in Touch</a>
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/musicals" data-link="/musicals" class="footer-sibling">← All Musicals</a>
          </footer>

        </div>
      </div>`;

    _initMusLinks(el);
    _initMusReveals(el);
  },
};
