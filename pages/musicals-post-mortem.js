/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/musicals-post-mortem.js
   /musicals/post-mortem
══════════════════════════════════════════════════════════ */

const _POSTMORTEM_DATA = {
  title:     'Post Mortem',
  year:      2023,
  producer:  'Harvard Office for Fine Arts',
  poster:    'postmortem-poster.JPG',
  posterAlt: 'Post Mortem — 2023 Harvard Office for Fine Arts production poster',

  credits: [
    { label: 'Book',             value: 'Paul Palmer' },
    { label: 'Music',            value: 'Christian Liu' },
    { label: 'Lyrics',           value: 'Eleni Dadian' },
    { label: 'Orchestrations',   value: 'Christian Liu, Adam Bartholomew, Williams Goldsmith' },
    { label: 'Direction',        value: 'Lollie McKenzie' },
    { label: 'Music Direction',  value: 'Alyssa Gaines' },
    { label: 'Choreography',     value: 'Keren Elmore' },
  ],

  performances: [
    {
      dates: { en: 'April 20–23, 2023', zh: '2023年4月20–23日',  ja: '2023年4月20〜23日'  },
      venue: { en: 'Agassiz Theater, Cambridge, MA', zh: '阿加西剧场，剑桥，马萨诸塞州', ja: 'アガシー劇場、ケンブリッジ、マサチューセッツ州' },
    },
  ],

  synopsis: 'Post Mortem takes place in the basement archives of a crumbling Classics department at a fictional liberal arts college. When beleaguered doctoral student Tracie accidentally summons the ghost of Gaius Valerius Catullus while pulling an all-nighter, the Roman poet refuses to leave until his works are properly catalogued and his reputation restored.',
};

const PostMortemPage = {
  mount(el) {
    const lang = getCurrentLang();
    const d = _POSTMORTEM_DATA;

    el.className = 'page-subpage page-show page-show--postmortem';
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
                <p class="show-hero__producer">${t('show.producedBy', lang)} ${d.producer}</p>
              </div>
            </div>
          </header>

          <section class="content-section" aria-labelledby="credits-pm">
            <span class="section-label" id="credits-pm">${t('show.credits', lang)}</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${t('credit.field.' + c.label, lang) || c.label}</dt>
                  <dd class="show-credits__value">${c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="perf-pm">
            <span class="section-label" id="perf-pm">${t('show.performances', lang)}</span>
            <ol class="show-perf-list">
              ${d.performances.map(p => `
                <li class="show-perf-item">
                  <p class="show-perf-dates">${p.dates[lang] || p.dates.en}</p>
                  <p class="show-perf-venue">${p.venue[lang] || p.venue.en}</p>
                </li>`).join('')}
            </ol>
          </section>

          <section class="content-section" aria-labelledby="synopsis-pm">
            <span class="section-label" id="synopsis-pm">${t('show.synopsis', lang)}</span>
            <p class="show-synopsis__text">${t('show.postmortem.synopsis', lang)}</p>
          </section>

          <section class="content-section" aria-labelledby="recordings-pm">
            <span class="section-label" id="recordings-pm">${t('show.music', lang)}</span>
            <div class="show-recordings-forthcoming">
              <p class="show-recordings-forthcoming__text">${t('show.recordingsForthcoming', lang)}</p>
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

    _initMusLinks(el);
    _initMusReveals(el);
  },
};
