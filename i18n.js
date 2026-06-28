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
    'credit.role.trailerMusic':       'Teaser Trailer Music',
    'credit.role.originalSoundtrack': 'Original Soundtrack',

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
    'contact.sending': 'Sending…',
    'contact.error':   'Something went wrong — please email me directly.',
    'contact.success.heading': 'Message sent.',
    'contact.success.body':    'I\'ll be in touch soon.',
    'contact.success.close':   'Close',

    /* ── Biography ── */
    'bio.label': 'Biography',
    'bio.p1': 'Hi! I\'m Christian, a composer for video games and musical theater, and a graduate of the Harvard–Berklee Joint Studies Program.',
    'bio.p2': 'I grew up in Singapore and came to Harvard intending to study computer science. By graduation, I had written three full-length, two-act musicals — including my capstone with the Hasty Pudding Theatricals, which ran in Cambridge, New York, and Bermuda — and committed to making music a career.',
    'bio.p3': 'My game credits include Island of Hearts (17-track original soundtrack) and contributions to LEAP Studio\'s Realm of Taiwu, whose teaser trailer crossed 1.2 million views on Bilibili. Along the way I\'ve interned at Sony PlayStation in Tokyo and LEAP Studio in Beijing.',
    'bio.p4': 'I\'m now based in Tokyo and open to remote collaboration worldwide. If you\'re working on something that needs a composer, I\'d love to hear about it.',
    'bio.basedLabel':     'Based in',
    'bio.basedValue':     'Tokyo — open to remote',
    'bio.langLabel':      'Languages',
    'bio.langValue':      'English · Mandarin · Japanese',
    'bio.milestone':      'views on Bilibili — Realm of Taiwu teaser trailer',
    'bio.credits.games':          'Games',
    'bio.credits.musicals':       'Musicals',
    'bio.credits.orchestrations': 'Additional Credits',

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
    'contact.sending': '发送中…',
    'contact.error':   '发送失败，请直接发送邮件。',
    'contact.success.heading': '消息已发送。',
    'contact.success.body':    '我很快会与您联系。',
    'contact.success.close':   '关闭',

    /* ── Biography ── */
    'bio.label': '个人简介',
    'bio.p1': '我是Christian Liu——一位游戏与音乐剧作曲家，毕业于哈佛大学与伯克利音乐学院联合学习项目。',
    'bio.p2': '我在新加坡长大，最初来哈佛攻读计算机科学。毕业时，我已创作了三部完整的两幕音乐剧——包括我与Hasty Pudding Theatricals合作的毕业制作，该剧先后在剑桥、纽约和百慕大公演——并决定以音乐为职业。',
    'bio.p3': '我的游戏作品包括《心之岛》（17首曲目原声带）以及为LEAP工作室的《太吾绘卷》制作的预告片音乐，该预告片在哔哩哔哩累计播放超过120万次。期间，我曾在东京索尼PlayStation及北京LEAP工作室实习。',
    'bio.p4': '我目前定居东京，欢迎全球范围内的远程合作。如有作曲需求，欢迎随时联系我。',
    'bio.basedLabel':     '所在地',
    'bio.basedValue':     '东京 — 支持远程合作',
    'bio.langLabel':      '语言',
    'bio.langValue':      '英语 · 普通话 · 日语',
    'bio.milestone':      '哔哩哔哩播放量——《太吾绘卷》宣传片',
    'bio.credits.games':          '游戏',
    'bio.credits.musicals':       '音乐剧',
    'bio.credits.orchestrations': '其他作品',

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
    'contact.sending': '送信中…',
    'contact.error':   '送信に失敗しました。直接メールでご連絡ください。',
    'contact.success.heading': 'メッセージを送信しました。',
    'contact.success.body':    'すぐにご連絡いたします。',
    'contact.success.close':   '閉じる',

    /* ── Biography ── */
    'bio.label': 'プロフィール',
    'bio.p1': '私はChristian Liu — ゲーム音楽とミュージカルを専門とする作曲家で、ハーバード大学とバークリー音楽大学の合同プログラムの卒業生です。',
    'bio.p2': 'シンガポール出身で、コンピュータサイエンスを学ぶためハーバード大学に進学しました。卒業までに3作品の全幕ミュージカルを書き上げ、そのうちの1作はHasty Pudding Theatricalsとの卒業制作として、ケンブリッジ、ニューヨーク、バミューダで上演されました。卒業後は、音楽をキャリアとして歩むことを決意しました。',
    'bio.p3': 'ゲーム作品としては、Island of Hearts（17トラックのオリジナルサウンドトラック）と、LEAPスタジオの『太吾絵巻』ティーザートレーラー音楽が挙げられます。このトレーラーはBilibiliで120万回以上再生されています。その間、東京のソニー・プレイステーションと北京のLEAPスタジオでのインターン経験もあります。',
    'bio.p4': '現在は東京を拠点に、世界中のリモートコラボレーションに対応しています。作曲家をお探しでしたら、ぜひご連絡ください。',
    'bio.basedLabel':     '拠点',
    'bio.basedValue':     '東京 — リモート対応可',
    'bio.langLabel':      '言語',
    'bio.langValue':      '英語 · 中国語 · 日本語',
    'bio.milestone':      'Bilibili再生回数 — 太吾絵巻ティーザートレーラー',
    'bio.credits.games':          'ゲーム',
    'bio.credits.musicals':       'ミュージカル',
    'bio.credits.orchestrations': 'その他',

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
