/* ═══════════════════════════════════════════════════════════
   CHRISTIAN LIU — GAME SITE  i18n.js
   EN / 中文 / 日本語
   ─────────────────────────────────────────────────────────
   All user-facing text lives here (except track titles, which
   are proper nouns and stay in their original language).
   To add a language: duplicate one block and translate.
════════════════════════════════════════════════════════════ */

const TRANSLATIONS = {
  en: {
    /* ── Nav ── */
    'nav.sounds':   'Sounds',
    'nav.about':    'About',
    'nav.services': 'Services',
    'nav.contact':  'Contact',

    /* ── Hero ── */
    'hero.eyebrow': 'Video Game Composer',
    'hero.sub':     'Melodies you don\'t forget.',
    'hero.cta':     'Hear My Work',

    /* ── Sounds section ── */
    'sounds.label': 'Portfolio',
    'sounds.title': 'The Sounds<br><em>of Christian Liu</em>',

    /* ── Player ── */
    'player.nowPlaying': 'Now Playing',

    /* ── Track game-type descriptors (translated; titles are not) ── */
    'track.game.Action Roguelite':   'Action Roguelite',
    'track.game.Dating Simulator':   'Dating Simulator',
    'track.game.Bullet Hell Shooter':'Bullet Hell Shooter',
    'track.genre.Game Trailer / Rock':       'Game Trailer / Rock',
    'track.genre.Electronic / Drum & Bass':  'Electronic / Drum & Bass',
    'track.genre.Cinematic / Orchestral':    'Cinematic / Orchestral',
    'track.genre.Electronic':                'Electronic',
    'track.genre.Piano':                     'Piano',

    /* ── About ── */
    'about.label': 'About',
    'about.title': 'I write melodies<br><em>you don\'t forget.</em>',
    'about.p1':    'I\'m Christian Liu — a composer trained at Harvard who makes music that hits you immediately and stays with you long after the screen goes dark. My thing is melody: bold, direct, unapologetically in-your-face. Not the kind of music that washes over you. The kind that gets stuck in your head at 2am.',
    'about.p2':    'I grew up on JRPG soundtracks and it shows. I write with the same conviction — every theme should feel like it was inevitable, like it couldn\'t be any other way. Jazz fusion, orchestral fanfares, piano ballads, hybrid electronic scores: the genre changes, but the commitment to a memorable melody never does.',
    'about.p3':    'I\'ve lived and worked in New York, Tokyo, and Singapore. Those years sharpened my ear for what makes music land differently across cultures — and gave me a deep respect for the specificity that makes a great game world feel real.',
    'about.factEducationLabel': 'Education',
    'about.factEducationValue': 'Harvard College',
    'about.factBasedLabel':     'Based in',
    'about.factBasedValue':     'New York City',
    'about.factSpecLabel':      'Specialties',
    'about.factSpecValue':      'Orchestral · Theatre · Games',
    'about.factLangLabel':      'Languages',
    'about.factLangValue':      'English · Mandarin · Japanese',

    /* ── Services ── */
    'services.label':    'What I Do',
    'services.title':    'Services',
    'services.s1.title': 'Original Scoring',
    'services.s1.desc':  'Full-length game soundtracks — from a single hook-driven loop to a 90-minute orchestral score. Every theme built to be heard once and remembered forever.',
    'services.s2.title': 'Orchestral Arrangements',
    'services.s2.desc':  'Transform existing themes or MIDI mockups into lush, fully notated orchestrations. Suitable for live performance, recording sessions, or trailer use.',
    'services.s3.title': 'Adaptive / Interactive Music',
    'services.s3.desc':  'Music systems designed for game engines — stems, loops, and transitions that respond dynamically to gameplay using middleware like Wwise or FMOD.',
    'services.s4.title': 'Consultation',
    'services.s4.desc':  'Advisory sessions on music direction, scoring budget, team assembly, and audio pipeline architecture for indie and mid-sized studios.',

    /* ── Reel ── */
    'reel.label': 'Reel',
    'reel.title': 'Watch &amp; Listen',

    /* ── Contact ── */
    'contact.label': 'Get in Touch',
    'contact.title': 'Let\'s make<br><em>something</em><br>together.',

    /* ── Footer ── */
    'footer.sounds':  'SOUNDS',
    'footer.about':   'ABOUT',
    'footer.contact': 'CONTACT',
    'footer.sibling': 'I ALSO WRITE MUSICALS →',
    'footer.copy':    '© 2026 Christian Liu. All rights reserved.',
    'footer.role':    'Video Game Composer & Orchestrator',
  },

  zh: {
    /* ── Nav ── */
    'nav.sounds':   '作品',
    'nav.about':    '关于',
    'nav.services': '服务',
    'nav.contact':  '联系',

    /* ── Hero ── */
    'hero.eyebrow': '游戏音乐作曲家',
    'hero.sub':     '让人难以忘怀的旋律。',
    'hero.cta':     '聆听我的作品',

    /* ── Sounds section ── */
    'sounds.label': '音乐作品集',
    'sounds.title': 'Christian Liu<br><em>的音乐世界</em>',

    /* ── Player ── */
    'player.nowPlaying': '正在播放',

    /* ── Track descriptors ── */
    'track.game.Action Roguelite':    '动作肉鸽游戏',
    'track.game.Dating Simulator':    '恋爱模拟器',
    'track.game.Bullet Hell Shooter': '弹幕射击游戏',
    'track.genre.Game Trailer / Rock':      '游戏预告 / 摇滚',
    'track.genre.Electronic / Drum & Bass': '电子 / 鼓打贝斯',
    'track.genre.Cinematic / Orchestral':   '电影风格 / 管弦乐',
    'track.genre.Electronic':               '电子音乐',
    'track.genre.Piano':                    '钢琴',

    /* ── About ── */
    'about.label': '关于我',
    'about.title': '我创作<em>令人难忘</em><br>的旋律。',
    'about.p1':    '我是刘克里斯蒂安——一位毕业于哈佛大学的作曲家。我的音乐直击人心，在屏幕熄灭后久久萦绕。旋律是我的核心：大胆、直接、毫无保留。不是那种悄然流淌的音乐，而是会在凌晨两点钻进你脑海的那种。',
    'about.p2':    '我在JRPG游戏原声中长大，这在我的作品里一目了然。我以同样的信念创作——每一个主题都应感觉是命中注定的，仿佛它只能是它本来的样子。爵士融合、管弦乐华彩、钢琴情歌、混合电子配乐：风格在变，但对难忘旋律的执着从未改变。',
    'about.p3':    '我曾在纽约、东京和新加坡生活工作。那些岁月磨砺了我对音乐如何跨越文化打动人心的理解，也让我深刻认识到，赋予游戏世界真实感的，正是那些细致入微的独特细节。',
    'about.factEducationLabel': '学历',
    'about.factEducationValue': '哈佛大学',
    'about.factBasedLabel':     '所在地',
    'about.factBasedValue':     '纽约市',
    'about.factSpecLabel':      '专长',
    'about.factSpecValue':      '管弦乐 · 音乐剧 · 游戏',
    'about.factLangLabel':      '语言',
    'about.factLangValue':      '英语 · 普通话 · 日语',

    /* ── Services ── */
    'services.label':    '服务内容',
    'services.title':    '服务项目',
    'services.s1.title': '原创配乐',
    'services.s1.desc':  '提供完整游戏原声带创作——从单一钩子式循环到长达90分钟的管弦乐配乐，每个主题都为一次聆听即永久铭记而生。',
    'services.s2.title': '管弦乐编曲',
    'services.s2.desc':  '将现有主题旋律或MIDI草稿转化为丰富、完整的管弦乐谱，适用于现场演出、录音会话或预告片配乐。',
    'services.s3.title': '自适应 / 互动音乐',
    'services.s3.desc':  '专为游戏引擎设计的音乐系统——音轨分层、循环与过渡，配合Wwise或FMOD中间件，随游戏动态智能响应。',
    'services.s4.title': '咨询服务',
    'services.s4.desc':  '为独立及中型游戏工作室提供音乐方向、配乐预算、团队组建及音频架构的专业顾问咨询服务。',

    /* ── Reel ── */
    'reel.label': '视频',
    'reel.title': '观看与聆听',

    /* ── Contact ── */
    'contact.label': '联系我',
    'contact.title': '让我们一起<br>创作<em>精彩</em><br>的作品。',

    /* ── Footer ── */
    'footer.sounds':  '作品',
    'footer.about':   '关于',
    'footer.contact': '联系',
    'footer.sibling': '我也创作音乐剧 →',
    'footer.copy':    '© 2026 Christian Liu 版权所有。',
    'footer.role':    '游戏音乐作曲家 & 配器师',
  },

  ja: {
    /* ── Nav ── */
    'nav.sounds':   'サウンド',
    'nav.about':    'プロフィール',
    'nav.services': 'サービス',
    'nav.contact':  'お問合せ',

    /* ── Hero ── */
    'hero.eyebrow': 'ゲーム音楽作曲家',
    'hero.sub':     '忘れられないメロディを。',
    'hero.cta':     '楽曲を聴く',

    /* ── Sounds section ── */
    'sounds.label': 'ポートフォリオ',
    'sounds.title': 'Christian Liu の<br><em>サウンド</em>',

    /* ── Player ── */
    'player.nowPlaying': '再生中',

    /* ── Track descriptors ── */
    'track.game.Action Roguelite':    'アクションローグライト',
    'track.game.Dating Simulator':    '恋愛シミュレーション',
    'track.game.Bullet Hell Shooter': '弾幕シューター',
    'track.genre.Game Trailer / Rock':      'ゲームトレーラー / ロック',
    'track.genre.Electronic / Drum & Bass': 'エレクトロニック / ドラムンベース',
    'track.genre.Cinematic / Orchestral':   'シネマティック / オーケストラ',
    'track.genre.Electronic':               'エレクトロニック',
    'track.genre.Piano':                    'ピアノ',

    /* ── About ── */
    'about.label': 'プロフィール',
    'about.title': '忘れられない<br><em>メロディを書く。</em>',
    'about.p1':    '私はChristian Liu、ハーバード大学で学んだ作曲家です。私の音楽はすぐにあなたに届き、画面が暗くなった後もずっとあなたの中に残り続けます。私の真骨頂はメロディ——大胆で、直接的で、遠慮のない音楽。さりげなく流れるタイプではなく、夜中の2時に頭から離れないタイプです。',
    'about.p2':    '私はJRPGのサウンドトラックを聴いて育ちました。そしてそれは作品に表れています。すべてのテーマは必然的に感じられるべきだ——それ以外の形はあり得ないと思わせるほどに。ジャズフュージョン、オーケストラファンファーレ、ピアノバラード、ハイブリッドエレクトロニックスコア：ジャンルは変わっても、印象的なメロディへのこだわりは変わりません。',
    'about.p3':    'ニューヨーク、東京、シンガポールで生活し、仕事をしてきました。その経験が、音楽が異なる文化でどう響くかを深く理解させてくれました。そして、優れたゲーム世界をリアルに感じさせる「細部の力」への敬意を育んでくれました。',
    'about.factEducationLabel': '学歴',
    'about.factEducationValue': 'ハーバード大学',
    'about.factBasedLabel':     '拠点',
    'about.factBasedValue':     'ニューヨーク市',
    'about.factSpecLabel':      '専門分野',
    'about.factSpecValue':      'オーケストラ · 舞台音楽 · ゲーム',
    'about.factLangLabel':      '言語',
    'about.factLangValue':      '英語 · 中国語 · 日本語',

    /* ── Services ── */
    'services.label':    'サービス内容',
    'services.title':    'サービス',
    'services.s1.title': 'オリジナル楽曲制作',
    'services.s1.desc':  'フックを核にしたループ1曲から90分のオーケストラスコアまで、一度聴けば永遠に忘れられないテーマを制作します。',
    'services.s2.title': 'オーケストラアレンジ',
    'services.s2.desc':  '既存のテーマやMIDIモックアップを、ライブ演奏・録音セッション・トレーラー使用に適した豊かなオーケストラ譜に仕上げます。',
    'services.s3.title': 'アダプティブ / インタラクティブ音楽',
    'services.s3.desc':  'WwiseやFMODを活用し、ゲームエンジン向けに設計された動的な音楽システム（ステム・ループ・トランジション）を提供します。',
    'services.s4.title': 'コンサルテーション',
    'services.s4.desc':  'インディーおよび中規模スタジオ向けに、音楽方針・予算・チーム編成・オーディオパイプライン設計についてアドバイスを提供します。',

    /* ── Reel ── */
    'reel.label': '映像',
    'reel.title': '映像・音楽を見る',

    /* ── Contact ── */
    'contact.label': 'お問い合わせ',
    'contact.title': '一緒に<em>素晴らしい</em><br>作品を<br>つくりましょう。',

    /* ── Footer ── */
    'footer.sounds':  'サウンド',
    'footer.about':   'プロフィール',
    'footer.contact': 'お問合せ',
    'footer.sibling': 'ミュージカル作品はこちら →',
    'footer.copy':    '© 2026 Christian Liu. 無断転載禁止。',
    'footer.role':    'ゲーム音楽作曲家 & オーケストレーター',
  },
};

/* ── Helpers ─────────────────────────────────────────────── */

// Look up a translation key, falling back to the raw string
function t(key, lang) {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

// Translate a track's game type and genre, leaving the title untouched
function tTrack(track, lang) {
  return {
    gameLabel:  t('track.game.'  + track.game,  lang) || track.game,
    genreLabel: t('track.genre.' + track.genre, lang) || track.genre,
  };
}

/* ── Language application ────────────────────────────────── */
let _currentLang = 'en';

function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  const root = document.documentElement;

  root.classList.add('lang-transitioning');
  setTimeout(() => {
    // Static data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key, lang);
      if (val !== undefined) el.innerHTML = val;
    });

    // Footer nav links (rendered by main.js, so update directly)
    const footerSounds  = document.querySelector('[data-i18n-footer="sounds"]');
    const footerAbout   = document.querySelector('[data-i18n-footer="about"]');
    const footerContact = document.querySelector('[data-i18n-footer="contact"]');
    const footerSibling = document.querySelector('[data-i18n-footer="sibling"]');
    if (footerSounds)  footerSounds.textContent  = t('footer.sounds',  lang);
    if (footerAbout)   footerAbout.textContent   = t('footer.about',   lang);
    if (footerContact) footerContact.textContent = t('footer.contact', lang);
    if (footerSibling) footerSibling.textContent = t('footer.sibling', lang);

    // Re-render track list with translated descriptors (titles stay as-is)
    if (typeof window.__renderTracks === 'function') window.__renderTracks(lang);

    // Update player bar meta if a track is active
    if (typeof window.__updatePlayerMeta === 'function') window.__updatePlayerMeta(lang);

    // Document lang + title
    root.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : lang);
    root.setAttribute('data-lang', lang);
    const titles = {
      en: 'Christian Liu — Video Game Composer',
      zh: 'Christian Liu — 游戏音乐作曲家',
      ja: 'Christian Liu — ゲーム音楽作曲家',
    };
    document.title = titles[lang] || titles.en;
    _currentLang = lang;

    root.classList.remove('lang-transitioning');
  }, 180);

  // Update button states immediately
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const active = btn.getAttribute('data-lang-btn') === lang;
    btn.classList.toggle('lang-btn--active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function getCurrentLang() { return _currentLang; }

/* ── Init ────────────────────────────────────────────────── */
(function () {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang-btn')));
  });

  const browserLang = navigator.language.toLowerCase();
  if      (browserLang.startsWith('zh')) applyLanguage('zh');
  else if (browserLang.startsWith('ja')) applyLanguage('ja');
  // else stays 'en' (default)
})();
