/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — i18n.js
   EN / 中文 / 日本語
   ──────────────────────────────────────────────────────────
   All translated UI strings live here.

   NOT translated: "CHRISTIAN LIU" display name, track titles,
   game titles — these are proper nouns that stay as-is.

   To add a language: duplicate one block below, translate,
   then add a button to the lang toggle in nav.js.
══════════════════════════════════════════════════════════ */

const TRANSLATIONS = {

  en: {
    /* ── Nav ── */
    'nav.home':      'Home',
    'nav.games':     'Games',
    'nav.musicals':  'Musicals',
    'nav.biography': 'Biography',
    'nav.contact':   'Contact',

    /* ── Homepage ── */
    'home.subtitle': 'composer · songwriter · arranger',

    /* ── Section labels ── */
    'section.reel':    'Reel',
    'section.credits': 'Professional Credits',
    'section.tracks':  'Featured Tracks',
    'section.contact': 'Get in Touch',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':       'teaser trailer music',
    'credit.role.originalSoundtrack': 'original soundtrack',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite':    'Action Roguelite',
    'track.game.Dating Simulator':    'Dating Simulator',
    'track.game.Bullet Hell Shooter': 'Bullet Hell Shooter',
    'track.genre.Game Trailer / Rock':      'Game Trailer / Rock',
    'track.genre.Electronic / Drum & Bass': 'Electronic / Drum & Bass',
    'track.genre.Cinematic / Orchestral':   'Cinematic / Orchestral',
    'track.genre.Electronic':               'Electronic',
    'track.genre.Piano':                    'Piano',

    /* ── Player ── */
    'player.nowPlaying': 'Now Playing',

    /* ── Contact ── */
    'contact.framing': 'Tell me about your project.',
    'contact.name':    'Name',
    'contact.email':   'Email',
    'contact.message': 'Tell me about your project',
    'contact.submit':  'Get in Touch',
    'contact.send':    'Send Message',
    'contact.or':      'or send a message',

    /* ── Biography ── */
    'bio.label': 'Biography',
    'bio.p1': 'I\'m Christian Liu — a composer trained at Harvard who makes music that hits you immediately and stays with you long after the screen goes dark. My thing is melody: bold, direct, unapologetically in-your-face.',
    'bio.p2': 'I grew up on JRPG soundtracks and it shows. Jazz fusion, orchestral fanfares, piano ballads, hybrid electronic scores: the genre changes, but the commitment to a memorable melody never does.',
    'bio.p3': 'I\'ve lived and worked in New York, Tokyo, and Singapore. Those years sharpened my ear for what makes music land differently across cultures — and gave me a deep respect for the specificity that makes a great game world feel real.',
    'bio.educationLabel': 'Education',
    'bio.educationValue': 'Harvard College',
    'bio.basedLabel':     'Based in',
    'bio.basedValue':     'New York City',
    'bio.specLabel':      'Specialties',
    'bio.specValue':      'Orchestral · Theatre · Games',
    'bio.langLabel':      'Languages',
    'bio.langValue':      'English · Mandarin · Japanese',

    /* ── Services ── */
    'svc.s1.title': 'Original Scoring',
    'svc.s1.desc':  'Full-length game soundtracks — from a single hook-driven loop to a 90-minute orchestral score. Every theme built to be heard once and remembered forever.',
    'svc.s2.title': 'Orchestral Arrangements',
    'svc.s2.desc':  'Transform existing themes or MIDI mockups into lush, fully notated orchestrations — for live performance, recording sessions, or trailer use.',
    'svc.s3.title': 'Adaptive / Interactive Music',
    'svc.s3.desc':  'Music systems designed for game engines — stems, loops, and transitions that respond dynamically to gameplay using Wwise or FMOD.',
    'svc.s4.title': 'Consultation',
    'svc.s4.desc':  'Advisory sessions on music direction, scoring budget, team assembly, and audio pipeline architecture for indie and mid-sized studios.',

    /* ── Footer ── */
    'footer.copy':    '© 2026 Christian Liu. All rights reserved.',
    'footer.sibling': 'I also write musicals →',
  },

  zh: {
    /* ── Nav ── */
    'nav.home':      '首页',
    'nav.games':     '游戏',
    'nav.musicals':  '音乐剧',
    'nav.biography': '个人简介',
    'nav.contact':   '联系',

    /* ── Homepage ── */
    'home.subtitle': '作曲家 · 词曲作者 · 编曲人',

    /* ── Section labels ── */
    'section.reel':    '视频',
    'section.credits': '专业履历',
    'section.tracks':  '精选曲目',
    'section.contact': '联系我',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':       '预告片音乐',
    'credit.role.originalSoundtrack': '原声带',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite':    '动作肉鸽游戏',
    'track.game.Dating Simulator':    '恋爱模拟器',
    'track.game.Bullet Hell Shooter': '弹幕射击游戏',
    'track.genre.Game Trailer / Rock':      '游戏预告 / 摇滚',
    'track.genre.Electronic / Drum & Bass': '电子 / 鼓打贝斯',
    'track.genre.Cinematic / Orchestral':   '电影风格 / 管弦乐',
    'track.genre.Electronic':               '电子音乐',
    'track.genre.Piano':                    '钢琴',

    /* ── Player ── */
    'player.nowPlaying': '正在播放',

    /* ── Contact ── */
    'contact.framing': '欢迎告诉我您的项目。',
    'contact.name':    '姓名',
    'contact.email':   '邮箱',
    'contact.message': '请介绍您的项目',
    'contact.submit':  '联系我',
    'contact.send':    '发送消息',
    'contact.or':      '或发送消息',

    /* ── Biography ── */
    'bio.label': '个人简介',
    'bio.p1': '我是刘克里斯蒂安——一位毕业于哈佛大学的作曲家。我的音乐直击人心，在屏幕熄灭后久久萦绕。旋律是我的核心：大胆、直接、毫无保留。',
    'bio.p2': '我在JRPG游戏原声中长大，这在我的作品里一目了然。爵士融合、管弦乐华彩、钢琴情歌、混合电子配乐：风格在变，但对难忘旋律的执着从未改变。',
    'bio.p3': '我曾在纽约、东京和新加坡生活工作。那些岁月磨砺了我对音乐如何跨越文化打动人心的理解，也让我深刻认识到，赋予游戏世界真实感的，正是那些细致入微的独特细节。',
    'bio.educationLabel': '学历',
    'bio.educationValue': '哈佛大学',
    'bio.basedLabel':     '所在地',
    'bio.basedValue':     '纽约市',
    'bio.specLabel':      '专长',
    'bio.specValue':      '管弦乐 · 音乐剧 · 游戏',
    'bio.langLabel':      '语言',
    'bio.langValue':      '英语 · 普通话 · 日语',

    /* ── Services ── */
    'svc.s1.title': '原创配乐',
    'svc.s1.desc':  '提供完整游戏原声带创作——从单一钩子式循环到长达90分钟的管弦乐配乐。',
    'svc.s2.title': '管弦乐编曲',
    'svc.s2.desc':  '将现有主题旋律或MIDI草稿转化为丰富、完整的管弦乐谱，适用于现场演出、录音会话或预告片配乐。',
    'svc.s3.title': '自适应 / 互动音乐',
    'svc.s3.desc':  '专为游戏引擎设计的音乐系统——配合Wwise或FMOD中间件，随游戏动态智能响应。',
    'svc.s4.title': '咨询服务',
    'svc.s4.desc':  '为独立及中型游戏工作室提供音乐方向、配乐预算、团队组建及音频架构的专业顾问咨询服务。',

    /* ── Footer ── */
    'footer.copy':    '© 2026 Christian Liu 版权所有。',
    'footer.sibling': '我也创作音乐剧 →',
  },

  ja: {
    /* ── Nav ── */
    'nav.home':      'ホーム',
    'nav.games':     'ゲーム',
    'nav.musicals':  'ミュージカル',
    'nav.biography': 'プロフィール',
    'nav.contact':   'お問い合わせ',

    /* ── Homepage ── */
    'home.subtitle': '作曲家 · ソングライター · アレンジャー',

    /* ── Section labels ── */
    'section.reel':    '映像',
    'section.credits': '職務経歴',
    'section.tracks':  '楽曲',
    'section.contact': 'お問い合わせ',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':       'ティーザートレーラー音楽',
    'credit.role.originalSoundtrack': 'オリジナルサウンドトラック',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite':    'アクションローグライト',
    'track.game.Dating Simulator':    '恋愛シミュレーション',
    'track.game.Bullet Hell Shooter': '弾幕シューター',
    'track.genre.Game Trailer / Rock':      'ゲームトレーラー / ロック',
    'track.genre.Electronic / Drum & Bass': 'エレクトロニック / ドラムンベース',
    'track.genre.Cinematic / Orchestral':   'シネマティック / オーケストラ',
    'track.genre.Electronic':               'エレクトロニック',
    'track.genre.Piano':                    'ピアノ',

    /* ── Player ── */
    'player.nowPlaying': '再生中',

    /* ── Contact ── */
    'contact.framing': 'プロジェクトについて教えてください。',
    'contact.name':    'お名前',
    'contact.email':   'メールアドレス',
    'contact.message': 'プロジェクトについて教えてください',
    'contact.submit':  'お問い合わせ',
    'contact.send':    'メッセージを送る',
    'contact.or':      'またはメッセージを送る',

    /* ── Biography ── */
    'bio.label': 'プロフィール',
    'bio.p1': '私はChristian Liu、ハーバード大学で学んだ作曲家です。私の音楽はすぐにあなたに届き、画面が暗くなった後もずっとあなたの中に残り続けます。私の真骨頂はメロディ——大胆で、直接的で、遠慮のない音楽。',
    'bio.p2': '私はJRPGのサウンドトラックを聴いて育ちました。ジャズフュージョン、オーケストラファンファーレ、ピアノバラード、ハイブリッドエレクトロニックスコア：ジャンルは変わっても、印象的なメロディへのこだわりは変わりません。',
    'bio.p3': 'ニューヨーク、東京、シンガポールで生活し、仕事をしてきました。その経験が、音楽が異なる文化でどう響くかを深く理解させてくれました。',
    'bio.educationLabel': '学歴',
    'bio.educationValue': 'ハーバード大学',
    'bio.basedLabel':     '拠点',
    'bio.basedValue':     'ニューヨーク市',
    'bio.specLabel':      '専門分野',
    'bio.specValue':      'オーケストラ · 舞台音楽 · ゲーム',
    'bio.langLabel':      '言語',
    'bio.langValue':      '英語 · 中国語 · 日本語',

    /* ── Services ── */
    'svc.s1.title': 'オリジナル楽曲制作',
    'svc.s1.desc':  'フックを核にしたループ1曲から90分のオーケストラスコアまで制作します。',
    'svc.s2.title': 'オーケストラアレンジ',
    'svc.s2.desc':  '既存のテーマやMIDIモックアップを豊かなオーケストラ譜に仕上げます。',
    'svc.s3.title': 'アダプティブ / インタラクティブ音楽',
    'svc.s3.desc':  'WwiseやFMODを活用したゲームエンジン向けの動的な音楽システムを提供します。',
    'svc.s4.title': 'コンサルテーション',
    'svc.s4.desc':  'インディーおよび中規模スタジオ向けに音楽方針や予算などについてアドバイスします。',

    /* ── Footer ── */
    'footer.copy':    '© 2026 Christian Liu. 無断転載禁止。',
    'footer.sibling': 'ミュージカル作品はこちら →',
  },

};

/* ══════════════════════════════════════════════════════════
   Helpers — used by nav.js, router.js, and all page scripts
══════════════════════════════════════════════════════════ */

let _lang = 'en';

/* Look up a key, fall back to EN, fall back to the raw key */
function t(key, lang) {
  const l = lang || _lang;
  return TRANSLATIONS[l]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

/* Translate a track's game type and genre label */
function tTrack(track, lang) {
  const l = lang || _lang;
  return {
    gameLabel:  t('track.game.'  + track.game,  l) || track.game,
    genreLabel: t('track.genre.' + track.genre, l) || track.genre,
  };
}

/* Translate a credit's role descriptor */
function tCredit(credit, lang) {
  return t(credit.roleKey, lang || _lang) || credit.roleKey;
}

function getCurrentLang() { return _lang; }

/* Apply a language change — fires 'langchange' for router.js to re-render */
function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  _lang = lang;
  document.documentElement.setAttribute('lang',      lang === 'zh' ? 'zh-Hans' : lang);
  document.documentElement.setAttribute('data-lang', lang);
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/* ── Auto-detect browser language on first load ─────────── */
(function () {
  const bl = (navigator.language || '').toLowerCase();
  if      (bl.startsWith('zh')) _lang = 'zh';
  else if (bl.startsWith('ja')) _lang = 'ja';
  if (_lang !== 'en') {
    document.documentElement.setAttribute('lang',      _lang === 'zh' ? 'zh-Hans' : _lang);
    document.documentElement.setAttribute('data-lang', _lang);
  }
})();
