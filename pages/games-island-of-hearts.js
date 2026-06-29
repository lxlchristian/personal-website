/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games-island-of-hearts.js
   /games/island-of-hearts
══════════════════════════════════════════════════════════ */

const _IOH_DATA = {
  title: 'Island of Hearts',
  genre: 'Dating Simulator',
  year:  2026,

  credits: [
    { label: 'Developer', value: 'Titan Digital Media' },
    { label: 'Publisher', value: '4Divinity' },
    { label: 'Role',      value: { en: 'Composer and Sound Designer', zh: '作曲·音效设计', ja: '作曲・サウンドデザイン' } },
    { label: 'Released',  value: { en: 'March 2026',                  zh: '2026年3月',      ja: '2026年3月'              } },
  ],

  description: {
    en: 'Island of Hearts is a live-action dating simulator set on a sun-drenched tropical island, blending real-video characters with choice-driven storytelling. The score is a departure from my usual work: the main theme leans rather unapologetically into the cutesy and tropical, and the tracks accompanying the narrative scenes strip back mostly to solo piano, minimal and warm, leaving space for the story to breathe.',
    zh: '《心之岛》是一款以阳光明媚的热带岛屿为背景的真人恋爱模拟游戏，将真实视频角色与选择驱动的叙事融为一体。这张原声大碟与我以往的作品风格有所不同：主题曲毫不掩饰地走向可爱与热带风情，而叙事场景的配乐则大多回归到简约温暖的独奏钢琴，留出空间让故事自然呼吸。',
    ja: '「アイランド・オブ・ハーツ」は、陽光降り注ぐ熱帯の島を舞台にした実写恋愛シミュレーションゲームで、実写キャラクターと選択肢による物語を融合させた作品です。スコアは私の通常の仕事とは一線を画しており、メインテーマはキュートでトロピカルな雰囲気を遠慮なく押し出し、ナラティブシーンの楽曲は主にソロピアノへとそぎ落とされ、シンプルで温かく、物語が息づくための空間を残しています。',
  },

  screenshots: [
    { src: 'ioh_screenshot1.jpg', alt: 'Island of Hearts — character storyline selection screen' },
    { src: 'ioh_screenshot2.jpg', alt: 'Island of Hearts — Gabby\'s room exploration scene' },
  ],

  youtubeId: '636WXykodVE',
  steamUrl:  'https://store.steampowered.com/app/3794770/Island_of_Hearts/',

  tracks: [
    { title: 'Island of Hearts Main Theme', src: 'ioh_theme.mp3',       durationStr: '2:14' },
    { title: 'The Doctor Is In',            src: 'thedoctorisin.mp3',   durationStr: '2:33' },
    { title: 'Sweet Dreaming',              src: 'sweet_dreaming.wav',  durationStr: '1:42' },
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
            <span class="game-hero__label">${t('track.game.' + d.genre, lang)} · ${d.year}</span>
            <h1 class="game-hero__title">${d.title}</h1>
          </header>

          <div class="show-media__video-wrap" style="margin-bottom: var(--sp-md)">
            <iframe class="show-yt-embed"
                    src="https://www.youtube.com/embed/${d.youtubeId}"
                    title="Island of Hearts — official launch trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen loading="lazy"></iframe>
          </div>

          <a href="${d.steamUrl}" class="game-hero__steam" target="_blank" rel="noopener noreferrer"
             style="display:block; margin-bottom: var(--sp-2xl)">${t('show.viewOnSteam', lang)}</a>

          <section class="content-section" aria-labelledby="credits-ioh">
            <span class="section-label" id="credits-ioh">${t('show.credits', lang)}</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${t('credit.field.' + c.label, lang) || c.label}</dt>
                  <dd class="show-credits__value">${typeof c.value === 'object' ? (c.value[lang] || c.value.en) : c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="desc-ioh">
            <span class="section-label" id="desc-ioh">${t('show.about', lang)}</span>
            <p class="game-description">${typeof d.description === 'object' ? (d.description[lang] || d.description.en) : d.description}</p>
          </section>

          <section class="content-section" aria-labelledby="screens-ioh">
            <span class="section-label" id="screens-ioh">${t('show.screenshots', lang)}</span>
            <div class="game-screenshot-strip">
              ${d.screenshots.map(s => `
                <img class="game-screenshot-strip__img" src="${s.src}" alt="${s.alt}" loading="lazy"/>`).join('')}
            </div>
          </section>

          <section class="content-section" aria-labelledby="tracks-ioh">
            <span class="section-label" id="tracks-ioh">${t('section.tracks', lang)}</span>
            <div class="track-list" id="ioh-track-list" role="list"></div>
          </section>

          <section class="content-section">
            <a href="/contact" data-link="/contact" class="cta-btn">${t('cta.workTogether', lang)}</a>
            ${_ctaSocialHTML()}
          </section>

          <footer class="subpage-footer">
            <span class="footer-copy">${t('footer.copy', lang)}</span>
            <a href="/games" data-link="/games" class="footer-sibling">${t('footer.backGames', lang)}</a>
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
