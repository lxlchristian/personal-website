/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/games-realm-of-taiwu.js
   /games/realm-of-taiwu
══════════════════════════════════════════════════════════ */

const _ROT_DATA = {
  title: 'Realm of Taiwu: Teaser Trailer',
  genre: 'Action Roguelite',

  credits: [
    { label: 'Developer',       value: 'Leap Studio' },
    { label: 'Publisher',       value: '4Divinity' },
    { label: 'Role',            value: { en: 'Composer',     zh: '作曲',   ja: '作曲'   } },
    { label: 'Teaser Released', value: { en: 'August 2025', zh: '2025年8月', ja: '2025年8月' } },
  ],

  description: {
    en: 'I composed the score for the teaser trailer of Realm of Taiwu (太吾弄世劫), a long-awaited return to one of China\'s most celebrated indie IPs. Built on Chinese mythology and wuxia tradition, the game pairs hand-painted ink-wash visuals with kinetic top-down combat, a world that I found demanded music rooted in classical Chinese instrumentation combined with a modern, electric energy. The trailer crossed 1.2 million views on Bilibili.',
    zh: '我为《太吾弄世劫》的宣传片配乐——这是国产独立游戏史上最受期待的IP之一的归来之作。游戏以中国神话与武侠传统为基础，将手绘水墨画风与动感的俯视角战斗相结合。这个世界令我深感需要一种扎根于中国传统乐器、却又充满现代与电气精神的音乐。宣传片在哔哩哔哩获得超过120万次播放。',
    ja: '太吾弄世劫のティーザートレーラーの音楽を担当しました。中国で最も注目されるインディーIPの一つが、長い沈黙を経て帰還した作品です。中国神話と武侠の伝統に基づき、手書き水墨画のビジュアルとダイナミックな見下ろし型戦闘を組み合わせたこの世界は、古典的な中国楽器を軸に据えながら現代的でエレクトリックな精神を持つ音楽を必要としていると感じました。トレーラーはBilibiliで120万回以上の再生回数を記録しました。',
  },

  youtubeId: 'uAmEFJ3UL3Q',
  steamUrl: 'https://store.steampowered.com/app/3452720/Realm_of_Taiwu/',
};

const RealmOfTaiwuPage = {
  mount(el) {
    const lang = getCurrentLang();
    const d = _ROT_DATA;

    el.className = 'page-subpage page-show page-show--rot';
    el.innerHTML = `
      <div class="subpage-layout">
        <div class="subpage-divider" aria-hidden="true">${_DIVIDER_SVG}</div>
        <div class="subpage-content">

          <header class="game-hero">
            <span class="game-hero__label">${t('track.game.' + d.genre, lang)}</span>
            <h1 class="game-hero__title">${d.title}</h1>
          </header>

          <div class="show-media__video-wrap" style="margin-bottom: var(--sp-md)">
            <iframe class="show-yt-embed"
              src="https://www.youtube.com/embed/${d.youtubeId}"
              title="Realm of Taiwu: Teaser Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          </div>

          <a href="${d.steamUrl}" class="game-hero__steam" target="_blank" rel="noopener noreferrer"
             style="display:block; margin-bottom: var(--sp-2xl)">${t('show.viewOnSteam', lang)}</a>

          <section class="content-section" aria-labelledby="credits-rot">
            <span class="section-label" id="credits-rot">${t('show.credits', lang)}</span>
            <dl class="show-credits__grid">
              ${d.credits.map(c => `
                <div class="show-credits__row">
                  <dt class="show-credits__label">${t('credit.field.' + c.label, lang) || c.label}</dt>
                  <dd class="show-credits__value">${typeof c.value === 'object' ? (c.value[lang] || c.value.en) : c.value}</dd>
                </div>`).join('')}
            </dl>
          </section>

          <section class="content-section" aria-labelledby="desc-rot">
            <span class="section-label" id="desc-rot">${t('show.about', lang)}</span>
            <p class="game-description">${typeof d.description === 'object' ? (d.description[lang] || d.description.en) : d.description}</p>
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

    _initGameLinks(el);
  },
};
