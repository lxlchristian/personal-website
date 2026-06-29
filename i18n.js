/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — i18n.js
   EN / 中文 / 日本語
   ──────────────────────────────────────────────────────────
   All translated UI strings live here.

   NOT translated: "CHRISTIAN LIU" display name, track titles,
   game titles, show synopses, production credits (names) —
   these are proper nouns or authored content that stays as-is.

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
    'section.reel':              'Reel',
    'section.credits':           'Professional Credits',
    'section.tracks':            'Featured Tracks',
    'section.contact':           'Get in Touch',
    'section.productions':       'Productions',
    'section.additionalCredits': 'Additional Credits',

    /* ── Show page sections ── */
    'show.credits':               'Credits',
    'show.performances':          'Performances',
    'show.synopsis':              'Synopsis',
    'show.music':                 'Music',
    'show.media':                 'Media',
    'show.about':                 'About',
    'show.screenshots':           'Screenshots',
    'show.featuredRecording':     'Featured Recording',
    'show.musicalTheater':        'Musical Theater',
    'show.producedBy':            'Produced by',
    'show.viewOnSteam':           'View on Steam ↗',
    'show.spotifyComingSoon':     'Spotify album coming soon',
    'show.videoComingSoon':       'Video coming soon',
    'show.recordingsForthcoming': 'Recordings forthcoming.',

    /* ── CTA ── */
    'cta.workTogether': "Let's work together!",

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':       'Teaser Trailer Music',
    'credit.role.originalSoundtrack': 'Original Soundtrack',

    /* ── Credit field labels ── */
    'credit.field.Book':                   'Book',
    'credit.field.Lyrics':                 'Lyrics',
    'credit.field.Music':                  'Music',
    'credit.field.Book and Lyrics':        'Book and Lyrics',
    'credit.field.Orchestrations':         'Orchestrations',
    'credit.field.Orchestration':          'Orchestration',
    'credit.field.Direction':              'Direction',
    'credit.field.Music Direction':        'Music Direction',
    'credit.field.Choreography':           'Choreography',
    'credit.field.Developer':              'Developer',
    'credit.field.Publisher':              'Publisher',
    'credit.field.Role':                   'Role',
    'credit.field.Released':               'Released',
    'credit.field.Teaser Released':        'Teaser Released',
    'credit.field.Sound Design / Scoring': 'Sound Design / Scoring',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite':    'Action Roguelite',
    'track.game.Dating Simulator':    'Dating Simulator',
    'track.game.Bullet Hell Shooter': 'Bullet Hell Shooter',
    'track.genre.Game Trailer / Rock':      'Game Trailer / Rock',
    'track.genre.Electronic / Drum & Bass': 'Electronic / Drum & Bass',
    'track.genre.Cinematic / Orchestral':   'Cinematic / Orchestral',
    'track.genre.Electronic':               'Electronic',
    'track.genre.Piano':                    'Piano',

    /* ── Contact ── */
    'contact.framing': 'Tell me about your project.',
    'contact.name':    'Name',
    'contact.email':   'Email',
    'contact.message': 'Tell me about your project',
    'contact.send':    'Send Message',
    'contact.or':      'or send a message',
    'contact.sending': 'Sending…',
    'contact.error':   'Something went wrong — please email me directly.',
    'contact.success.heading': 'Message sent.',
    'contact.success.body':    "I'll be in touch soon.",
    'contact.success.close':   'Close',

    /* ── Biography ── */
    'bio.label': 'Biography',
    'bio.p1': "Hi! My name is Christian, and I'm a composer from Singapore who loves scoring video games and writing for musical theatre. I'm also a recent graduate of the Harvard–Berklee Joint Studies Program.",
    'bio.p2': "Though much of my time as an undergraduate was spent studying Computer Science, perhaps even more of it was spent writing music. By graduation, I'd written three full-length, two-act musicals, including one with <a href=\"https://www.hastypudding.org/hasty-pudding-theatricals/\" target=\"_blank\" rel=\"noopener\">the Hasty Pudding Theatricals</a>, which ran 40 shows throughout Cambridge, New York, and Bermuda.",
    'bio.p3': "I also released my first full 17-track original video game soundtrack with Island of Hearts, and made contributions to action roguelite Realm of Taiwu, whose teaser trailer I scored crossed 1.2 million views on Bilibili. I've also collaborated with numerous game devs through Berklee's Games and Interactive Scoring Program, as well as interned at Sony PlayStation in Tokyo and Leap Studio in Beijing.",
    'bio.p4': "I'm now based in Tokyo and open to collaboration worldwide. If you're working on something that needs a composer, I'd love to hear about it!",
    'bio.basedLabel':             'Based in',
    'bio.basedValue':             'Tokyo · Open to Remote',
    'bio.langLabel':              'Languages',
    'bio.langValue':              'English · Mandarin · Japanese',
    'bio.milestone':              'views on Bilibili — Realm of Taiwu teaser trailer',
    'bio.credits.games':          'Games',
    'bio.credits.musicals':       'Musicals',
    'bio.credits.orchestrations': 'Additional Credits',

    /* ── Footer ── */
    'footer.copy':         '© 2026 Christian Liu. All rights reserved.',
    'footer.sibling':      'I also write musicals →',
    'footer.gamesLink':    'I also score games →',
    'footer.backMusicals': '← All Musicals',
    'footer.backGames':    '← All Games',
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
    'section.reel':              '视频',
    'section.credits':           '专业履历',
    'section.tracks':            '精选曲目',
    'section.contact':           '联系我',
    'section.productions':       '作品',
    'section.additionalCredits': '其他作品',

    /* ── Show page sections ── */
    'show.credits':               '制作人员',
    'show.performances':          '演出场次',
    'show.synopsis':              '剧情简介',
    'show.music':                 '音乐',
    'show.media':                 '媒体',
    'show.about':                 '作品简介',
    'show.screenshots':           '游戏截图',
    'show.featuredRecording':     '精选录音',
    'show.musicalTheater':        '音乐剧',
    'show.producedBy':            '出品方',
    'show.viewOnSteam':           '在Steam查看 ↗',
    'show.spotifyComingSoon':     'Spotify专辑即将上线',
    'show.videoComingSoon':       '视频即将上线',
    'show.recordingsForthcoming': '录音即将发布。',

    /* ── CTA ── */
    'cta.workTogether': '期待与您合作！',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':       '预告片音乐',
    'credit.role.originalSoundtrack': '原声带',

    /* ── Credit field labels ── */
    'credit.field.Book':                   '剧本',
    'credit.field.Lyrics':                 '作词',
    'credit.field.Music':                  '作曲',
    'credit.field.Book and Lyrics':        '剧本 / 作词',
    'credit.field.Orchestrations':         '编曲',
    'credit.field.Orchestration':          '编曲',
    'credit.field.Direction':              '导演',
    'credit.field.Music Direction':        '音乐总监',
    'credit.field.Choreography':           '编舞',
    'credit.field.Developer':              '开发商',
    'credit.field.Publisher':              '发行商',
    'credit.field.Role':                   '职责',
    'credit.field.Released':               '发行日期',
    'credit.field.Teaser Released':        '预告片发布',
    'credit.field.Sound Design / Scoring': '音效设计 / 配乐',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite':    '动作肉鸽游戏',
    'track.game.Dating Simulator':    '恋爱模拟器',
    'track.game.Bullet Hell Shooter': '弹幕射击游戏',
    'track.genre.Game Trailer / Rock':      '游戏预告 / 摇滚',
    'track.genre.Electronic / Drum & Bass': '电子 / 鼓打贝斯',
    'track.genre.Cinematic / Orchestral':   '电影风格 / 管弦乐',
    'track.genre.Electronic':               '电子音乐',
    'track.genre.Piano':                    '钢琴',

    /* ── Contact ── */
    'contact.framing': '欢迎告诉我您的项目。',
    'contact.name':    '姓名',
    'contact.email':   '邮箱',
    'contact.message': '请介绍您的项目',
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
    'bio.basedLabel':             '所在地',
    'bio.basedValue':             '东京 — 支持远程合作',
    'bio.langLabel':              '语言',
    'bio.langValue':              '英语 · 普通话 · 日语',
    'bio.milestone':              '哔哩哔哩播放量——《太吾绘卷》宣传片',
    'bio.credits.games':          '游戏',
    'bio.credits.musicals':       '音乐剧',
    'bio.credits.orchestrations': '其他作品',

    /* ── Footer ── */
    'footer.copy':         '© 2026 Christian Liu 版权所有。',
    'footer.sibling':      '我也创作音乐剧 →',
    'footer.gamesLink':    '我也创作游戏配乐 →',
    'footer.backMusicals': '← 所有音乐剧',
    'footer.backGames':    '← 所有游戏',
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
    'section.reel':              'リール',
    'section.credits':           '制作実績',
    'section.tracks':            '注目楽曲',
    'section.contact':           'お問い合わせ',
    'section.productions':       '作品一覧',
    'section.additionalCredits': 'その他の実績',

    /* ── Show page sections ── */
    'show.credits':               'クレジット',
    'show.performances':          '公演情報',
    'show.synopsis':              'あらすじ',
    'show.music':                 '楽曲',
    'show.media':                 'メディア',
    'show.about':                 '作品について',
    'show.screenshots':           'スクリーンショット',
    'show.featuredRecording':     '注目録音',
    'show.musicalTheater':        'ミュージカル',
    'show.producedBy':            '製作',
    'show.viewOnSteam':           'Steamで見る ↗',
    'show.spotifyComingSoon':     'Spotifyアルバム、近日公開',
    'show.videoComingSoon':       'ビデオ近日公開',
    'show.recordingsForthcoming': '録音近日公開。',

    /* ── CTA ── */
    'cta.workTogether': 'ぜひ一緒にお仕事しましょう！',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':       'ティーザートレーラー楽曲',
    'credit.role.originalSoundtrack': 'オリジナルサウンドトラック',

    /* ── Credit field labels ── */
    'credit.field.Book':                   '台本',
    'credit.field.Lyrics':                 '作詞',
    'credit.field.Music':                  '作曲',
    'credit.field.Book and Lyrics':        '台本・作詞',
    'credit.field.Orchestrations':         'オーケストレーション',
    'credit.field.Orchestration':          'オーケストレーション',
    'credit.field.Direction':              '演出',
    'credit.field.Music Direction':        '音楽監督',
    'credit.field.Choreography':           '振付',
    'credit.field.Developer':              'デベロッパー',
    'credit.field.Publisher':              'パブリッシャー',
    'credit.field.Role':                   '担当',
    'credit.field.Released':               'リリース日',
    'credit.field.Teaser Released':        'ティーザー公開',
    'credit.field.Sound Design / Scoring': 'サウンドデザイン / 音楽',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite':    'アクションローグライト',
    'track.game.Dating Simulator':    '恋愛シミュレーション',
    'track.game.Bullet Hell Shooter': '弾幕シューター',
    'track.genre.Game Trailer / Rock':      'ゲームトレーラー / ロック',
    'track.genre.Electronic / Drum & Bass': 'エレクトロニック / ドラムンベース',
    'track.genre.Cinematic / Orchestral':   'シネマティック / オーケストラ',
    'track.genre.Electronic':               'エレクトロニック',
    'track.genre.Piano':                    'ピアノ',

    /* ── Contact ── */
    'contact.framing': 'プロジェクトについて、ぜひお聞かせください。',
    'contact.name':    'お名前',
    'contact.email':   'メールアドレス',
    'contact.message': 'プロジェクトについて教えてください',
    'contact.send':    'メッセージを送る',
    'contact.or':      'またはメッセージを送る',
    'contact.sending': '送信中…',
    'contact.error':   '送信に失敗しました。直接メールにてご連絡ください。',
    'contact.success.heading': 'メッセージを送信しました。',
    'contact.success.body':    'できるだけ早くご連絡いたします。',
    'contact.success.close':   '閉じる',

    /* ── Biography ── */
    'bio.label': 'プロフィール',
    'bio.p1': 'はじめまして。シンガポール出身の作曲家、Christian Liuです。ビデオゲームの音楽制作とミュージカルの作曲を専門とし、ハーバード大学・バークリー音楽院合同プログラムを修了しました。',
    'bio.p2': '学部ではコンピュータサイエンスを学びながらも、音楽制作に多くの時間を注ぎました。卒業までに2幕構成の本格ミュージカルを3作書き上げ、そのうちの1作は<a href="https://www.hastypudding.org/hasty-pudding-theatricals/" target="_blank" rel="noopener">Hasty Pudding Theatricals</a>との共同制作として、ケンブリッジ・ニューヨーク・バミューダで計40公演を行いました。',
    'bio.p3': 'ゲーム音楽の分野では、Island of Hearts（17曲収録の初のオリジナルサウンドトラック）と、アクションローグライト『太吾絵巻』のティーザートレーラーを手がけました。このトレーラーはBilibiliで120万回以上の再生を記録しています。バークリー音楽院のGames and Interactive Scoring Programを通じて多くのゲーム開発者と協働し、東京のソニー・プレイステーション、北京のLEAPスタジオでインターンも経験しました。',
    'bio.p4': '現在は東京を拠点に、世界中のクライアントとのリモートコラボレーションも承っています。作曲家をお探しでしたら、ぜひお気軽にご連絡ください！',
    'bio.basedLabel':             '拠点',
    'bio.basedValue':             '東京 · リモート対応可',
    'bio.langLabel':              '言語',
    'bio.langValue':              '英語 · 中国語 · 日本語',
    'bio.milestone':              'Bilibili再生回数 — 太吾絵巻 ティーザートレーラー',
    'bio.credits.games':          'ゲーム',
    'bio.credits.musicals':       'ミュージカル',
    'bio.credits.orchestrations': 'その他の実績',

    /* ── Footer ── */
    'footer.copy':         '© 2026 Christian Liu. 無断転載禁止。',
    'footer.sibling':      'ミュージカル作品はこちら →',
    'footer.gamesLink':    'ゲーム音楽はこちら →',
    'footer.backMusicals': '← ミュージカル一覧',
    'footer.backGames':    '← ゲーム一覧',
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
