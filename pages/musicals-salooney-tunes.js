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
    { label: 'Orchestrations',  value: 'Allen Feinstein, Ben Green, Dan Ring, Peter Mansfield, Fraser Weist, Christian Liu' },
    { label: 'Direction',       value: 'Larry Sousa' },
    { label: 'Music Direction', value: 'José Delgado' },
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

          <section class="content-section" aria-labelledby="music-st">
            <span class="section-label" id="music-st">${t('show.music', lang)}</span>
            <div id="spotify-salooney">
              <div class="mus-spotify-frame-wrap"></div>
            </div>
          </section>

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
            <p class="show-synopsis__text">${t('show.salooney.synopsis', lang)}</p>
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

    /* Spotify's embed picks its internal layout once, from the width it's
       given at load, and never re-evaluates it on its own — loaded narrow,
       it caps the tracklist at ~3 rows and pads any extra height with dead
       space instead of filling it. Loaded wide, it fills any height with a
       proper scrollable list. Merely restyling an already-loaded frame's
       width/height doesn't reliably re-trigger that decision either (seen
       first-hand: an already-wide frame shrunk back down can come back
       dead-space-broken), so on narrow columns we give it a fresh iframe at
       a fixed width comfortably inside "wide" territory and scale the whole
       frame down to fit. Rotation/resize across that width boundary gets a
       fresh iframe again for the same reason; resizing within one mode just
       retunes the existing frame, which is safe. */
    const spotifyOuterWrap = el.querySelector('#spotify-salooney');
    const SPOTIFY_SRC = 'https://open.spotify.com/embed/album/2M2BCa0Y8RoUd42ofshnNy?utm_source=generator';
    const SPOTIFY_TITLE = 'Salooney Tunes — Original Cast Recording';
    const SPOTIFY_WIDE_WIDTH = 400;
    const SPOTIFY_WIDE_HEIGHT = 450;
    const SPOTIFY_NATIVE_HEIGHT = 352;
    let spotifyIsCompact = null;

    function _createSpotifyFrame() {
      const frame = document.createElement('iframe');
      frame.className = 'mus-spotify-embed';
      frame.src = SPOTIFY_SRC;
      frame.title = SPOTIFY_TITLE;
      frame.loading = 'lazy';
      frame.allowFullscreen = true;
      frame.setAttribute('frameborder', '0');
      frame.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
      return frame;
    }

    function _sizeSpotifyEmbed() {
      const wrap = spotifyOuterWrap.querySelector('.mus-spotify-frame-wrap');
      if (!wrap) { window.removeEventListener('resize', _sizeSpotifyEmbed); return; }
      const wrapWidth = wrap.getBoundingClientRect().width;
      const compact = wrapWidth < SPOTIFY_WIDE_WIDTH;

      if (compact === spotifyIsCompact) {
        if (compact) {
          const scale = wrapWidth / SPOTIFY_WIDE_WIDTH;
          wrap.firstElementChild.style.transform = `scale(${scale})`;
          wrap.style.height = Math.round(SPOTIFY_WIDE_HEIGHT * scale) + 'px';
        }
        return;
      }

      spotifyIsCompact = compact;
      const frame = _createSpotifyFrame();
      if (compact) {
        const scale = wrapWidth / SPOTIFY_WIDE_WIDTH;
        frame.style.width = SPOTIFY_WIDE_WIDTH + 'px';
        frame.style.height = SPOTIFY_WIDE_HEIGHT + 'px';
        frame.style.transform = `scale(${scale})`;
        wrap.style.height = Math.round(SPOTIFY_WIDE_HEIGHT * scale) + 'px';
      } else {
        frame.style.width = '100%';
        frame.style.height = SPOTIFY_NATIVE_HEIGHT + 'px';
        wrap.style.height = '';
      }
      wrap.replaceChildren(frame);
    }
    _sizeSpotifyEmbed();
    window.addEventListener('resize', _sizeSpotifyEmbed);

    _initMusLinks(el);
    _initMusReveals(el);
  },
};
