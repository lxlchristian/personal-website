/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — i18n.js
   EN / 中文 / 日本語
   ──────────────────────────────────────────────────────────
   All translated UI strings live here.

   NOT translated: "CHRISTIAN LIU" display name, track titles,
   game titles, production credits (names) —
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
    'home.subtitle': 'Scores for games. Songs for the stage.',
    'home.roles':    'composer · songwriter · producer',

    /* ── Section labels ── */
    'section.reel':              'Reel',
    'section.credits':           'Professional Credits',
    'section.tracks':            'Featured Tracks',
    'section.specTracks':        'Featured Spec Tracks',
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
    'show.musicBy':               'Music by',
    'show.viewOnSteam':           'View on Steam ↗',
    'show.spotifyComingSoon':     'Spotify cast recording coming soon',
    'show.videoComingSoon':       'Video coming soon',
    'show.recordingsForthcoming': 'Recordings forthcoming.',
    'show.roughMixNote':          'Pre-release rough mixes · Full cast recording coming soon on Spotify.',

    /* ── Production teasers ── */
    'prod.teaser.salooney-tunes': "Harvard's 177th Hasty Pudding Musical: an all-new wild west adventure from the nation's oldest collegiate theater company.",
    'prod.teaser.city-of-peace':  'Inspired by 19th-century Ukrainian gothic literature, an original operetta exploring evil, folklore, and the human condition.',
    'prod.teaser.post-mortem':    'A comedy-musical set in a crumbling Classics department where an accidental ghost-summoning derails a desperate rescue plan.',

    /* ── CTA ── */
    'cta.workTogether': "Let's work together!",

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':          'Teaser Trailer Music',
    'credit.role.originalSoundtrack':    'Original Soundtrack',
    'credit.role.composerSoundDesigner': 'Composer & Sound Designer',
    'credit.role.composerTeaserTrailer': 'Composer (Teaser Trailer)',

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
    'credit.field.Sound Design / Scoring':                  'Sound Design / Scoring',
    'credit.field.Sound Design':                            'Sound Design',
    'credit.field.Original Soundtrack':                     'Original Soundtrack',
    'credit.field.Original Soundtrack + Interactive Audio': 'Original Soundtrack + Interactive Audio',
    'credit.field.Contributed Tracks':                      'Contributed Tracks',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite': 'Action Roguelite',
    'track.game.Dating Simulator': 'Dating Simulator',
    'track.game.Bullet Hell':      'Bullet Hell',
    'track.game.Speed Platformer': 'Speed Platformer',
    'track.game.Rhythm Battler':   'Rhythm Battler',
    'track.game.Retro':            'Retro',
    'track.genre.Cinematic / Orchestral': 'Cinematic / Orchestral',
    'track.genre.Electronic':             'Electronic',
    'track.genre.Drum & Bass':            'Drum & Bass',
    'track.genre.Chiptune':               'Chiptune',

    /* ── Contact ── */
    'contact.framing': 'Let\'s get to work!',
    'contact.name':    'Name',
    'contact.email':   'Email',
    'contact.message': 'Tell me about your project!',
    'contact.send':    'Send Message',
    'contact.or':      'or send a message',
    'contact.sending': 'Sending…',
    'contact.error':   'Something went wrong — please email me directly.',
    'contact.success.heading': 'Message sent.',
    'contact.success.body':    "I'll be in touch soon!",
    'contact.success.close':   'Close',

    /* ── Biography ── */
    'bio.label': 'Biography',
    'bio.p1': "Hi! My name is Christian, and I'm a composer from Singapore who loves scoring video games and writing for musical theatre. I'm also a recent graduate of the Harvard–Berklee Joint Studies Program.",
    'bio.p2': "Though much of my time as an undergraduate was spent studying Computer Science, perhaps even more of it was spent writing music. By graduation, I'd written three full-length, two-act musicals, including one with <a href=\"https://www.hastypudding.org/hasty-pudding-theatricals/\" target=\"_blank\" rel=\"noopener\">the Hasty Pudding Theatricals</a>, which ran 40 shows throughout Cambridge, New York, and Bermuda.",
    'bio.p3': "I also released my first full 17-track original video game soundtrack with Island of Hearts, and made contributions to action roguelite Realm of Taiwu, whose teaser trailer I scored crossed 1.2 million views on Bilibili. I've also collaborated with numerous game devs through Berklee's Games and Interactive Scoring Program, as well as interned at Sony PlayStation in Tokyo and Leap Studio in Beijing.",
    'bio.p4': "I'm now based in Tokyo and Singapore, and open to collaboration worldwide. If you're working on something that needs a composer, I'd love to hear about it!",
    'bio.basedLabel':             'Based in',
    'bio.basedValue':             'Tokyo · Singapore · Open to Remote',
    'bio.langLabel':              'Languages',
    'bio.langValue':              'English · Mandarin · Japanese',
    'bio.milestone':              'views on Bilibili — Realm of Taiwu teaser trailer',
    'bio.milestoneNumber':        '1.2M',
    'bio.credits.games':          'Games',
    'bio.credits.musicals':       'Musicals',
    'bio.credits.orchestrations': 'Additional Credits',
    'bio.toolsLabel': 'Software',
    'bio.codeLabel':  'Code',

    /* ── Show synopses ── */
    'show.salooney.synopsis':   "Salooney Tunes is a knee-slapping, nail-biting heist-gone-wrong that follows notorious outlaw Robin Yablind and his fame-hungry sidekick Wyatt Aintme. They must find a way to avoid Mayor Gerri Mandarin and pregnant Sheriff Carrie N Twins, who are on the hunt to put them behind bars. Chock-full of lovable characters like skittish saloon owner Bart Ender, sultry saloon-singer Sarah Problem, and twelve-year-old dancer Anna Fivesix-Fivesixseveneight, Salooney Tunes's twists and turns will keep you on the edge of your seat.",
    'show.cop.synopsis':        "City of Peace is a dark musical drama set in the cursed village of Myrhorod, loosely based on the stories of Nikolai Gogol. When Khoma Brut, an orphaned painter-philosopher, wanders into the wrong khutir on a summer holiday, he finds himself bound by promise to pray over the body of a girl he knows he killed. With his theologian companion Khaliava detained nearby, Khoma spends three nights in a locked church, haunted and manipulated until the question becomes less whether he survives than what's left of him if he does.",
    'show.postmortem.synopsis': "Post Mortem takes place in the basement archives of a crumbling Classics department at a fictional liberal arts college. When beleaguered doctoral student Tracie accidentally summons the ghost of Gaius Valerius Catullus while pulling an all-nighter, the Roman poet refuses to leave until his works are properly catalogued and his reputation restored.",

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
    'home.subtitle': '游戏配乐 · 舞台词曲',
    'home.roles':    '作曲家 · 词曲作者 · 制作人',

    /* ── Section labels ── */
    'section.reel':              '精选样片',
    'section.credits':           '专业履历',
    'section.tracks':            '精选曲目',
    'section.specTracks':        '精选示范曲目',
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
    'show.musicBy':               '作曲',
    'show.viewOnSteam':           '在Steam查看 ↗',
    'show.spotifyComingSoon':     '完整演员录音即将登陆 Spotify',
    'show.videoComingSoon':       '视频即将上线',
    'show.recordingsForthcoming': '录音即将发布。',
    'show.roughMixNote':          '预发行初混版 · 完整演员录音即将登陆 Spotify',

    /* ── Production teasers ── */
    'prod.teaser.salooney-tunes': '哈佛第177届Hasty Pudding年度大戏：来自美国历史最悠久大学剧团的全新西部冒险音乐剧。',
    'prod.teaser.city-of-peace':  '灵感来自19世纪乌克兰哥特文学，一部探索邪恶、民间传说与人类处境的原创轻歌剧。',
    'prod.teaser.post-mortem':    '一部喜剧音乐剧，发生在行将崩塌的古典系——一场意外的召鬼事件打乱了绝望的救援计划。',

    /* ── CTA ── */
    'cta.workTogether': '期待与您合作！',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':          '预告片音乐',
    'credit.role.originalSoundtrack':    '原声带',
    'credit.role.composerSoundDesigner': '作曲·音效设计',
    'credit.role.composerTeaserTrailer': '作曲（宣传片）',

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
    'credit.field.Sound Design / Scoring':                  '音效设计 / 配乐',
    'credit.field.Sound Design':                            '音效设计',
    'credit.field.Original Soundtrack':                     '原声带',
    'credit.field.Original Soundtrack + Interactive Audio': '原声带 + 互动音频',
    'credit.field.Contributed Tracks':                      '参与曲目',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite': '动作肉鸽游戏',
    'track.game.Dating Simulator': '恋爱模拟器',
    'track.game.Bullet Hell':      '弹幕射击',
    'track.game.Speed Platformer': '速度平台游戏',
    'track.game.Rhythm Battler':   '音乐格斗',
    'track.game.Retro':            '复古游戏',
    'track.genre.Cinematic / Orchestral': '电影风格 / 管弦乐',
    'track.genre.Electronic':             '电子音乐',
    'track.genre.Drum & Bass':            '鼓打贝斯',
    'track.genre.Chiptune':               '芯片音乐',

    /* ── Contact ── */
    'contact.framing': '来聊聊您的项目吧！',
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
    'bio.p1': '嗨！我叫Christian，是一位来自新加坡的作曲家，热爱游戏配乐与音乐剧创作，毕业于哈佛-伯克利音乐学院联合课程。',
    'bio.p2': '本科主修计算机科学，但投在音乐创作上的时间或许更多。毕业时，我已完成三部两幕长篇音乐剧——其中包括与百年名社<a href="https://www.hastypudding.org/hasty-pudding-theatricals/" target="_blank" rel="noopener">Hasty Pudding Theatricals</a>联合制作的一部，先后在剑桥、纽约和百慕大演出整整40场。',
    'bio.p3': '我还发行了Island of Hearts的17首完整原声带，并为动作肉鸽游戏《太吾绘卷》制作了宣传片配乐——该视频在哔哩哔哩播放量突破120万次。此外，我通过伯克利音乐学院游戏与互动配乐项目与众多开发者深度合作，并分别在东京索尼PlayStation及北京LEAP工作室完成实习。',
    'bio.p4': '目前定居于东京与新加坡，欢迎全球范围内的远程合作。如果您正在筹备需要作曲的项目，随时欢迎联系！',
    'bio.basedLabel':             '所在地',
    'bio.basedValue':             '东京 · 新加坡 · 欢迎远程合作',
    'bio.langLabel':              '语言',
    'bio.langValue':              '英语 · 普通话 · 日语',
    'bio.milestone':              '哔哩哔哩播放量——《太吾绘卷》宣传片',
    'bio.milestoneNumber':        '120万',
    'bio.credits.games':          '游戏',
    'bio.credits.musicals':       '音乐剧',
    'bio.credits.orchestrations': '其他作品',
    'bio.toolsLabel': '工具',
    'bio.codeLabel':  '编程',

    /* ── Show synopses ── */
    'show.salooney.synopsis':   '《Salooney Tunes》是一出令人捧腹、扣人心弦的西部喜剧音乐剧，讲述了臭名昭著的亡命之徒Robin Yablind与他贪图名利的搭档Wyatt Aintme的跌宕旅程。两人疲于应付步步紧逼的Gerri Mandarin市长与怀有身孕的Carrie N Twins警长的追缉。剧中角色个个生动鲜活——胆小的沙龙老板Bart Ender、风情万种的驻唱歌手Sarah Problem、年仅十二岁的舞蹈神童Anna Fivesix-Fivesixseveneight……笑料与惊喜接踵而至，让人目不暇接。',
    'show.cop.synopsis':        '《City of Peace》是一部以乌克兰民间传说为灵感的黑暗音乐剧，改编自尼古拉·果戈里的短篇小说。孤儿画家兼哲学家霍马在夏日闲游中误闯他乡庄园，被迫连续三夜在锁闭的教堂里为一具少女遗体守夜祈祷——而那个少女，正是死于他手。在幽灵威逼与人心操弄的双重折磨下，霍马面临的问题已不再是能否生还，而是若能幸存，那时的自己究竟还剩下什么。',
    'show.postmortem.synopsis': '《Post Mortem》发生在一所虚构文理学院行将崩塌的古典学系地下档案室。博士生Tracie在通宵备考时，意外召唤出古罗马诗人盖乌斯·瓦勒里乌斯·卡图卢斯的鬼魂。这位桀骜的诗人拒绝离去，执意要求Tracie整理其著作、恢复其声誉，方肯罢休。',

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
    'home.subtitle': 'ゲームに音楽を、舞台に歌を。',
    'home.roles':    '作曲家 · ソングライター · プロデューサー',

    /* ── Section labels ── */
    'section.reel':              'リール',
    'section.credits':           '制作実績',
    'section.tracks':            '注目楽曲',
    'section.specTracks':        '注目デモ楽曲',
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
    'show.musicBy':               '音楽',
    'show.viewOnSteam':           'Steamで見る ↗',
    'show.spotifyComingSoon':     'Spotifyアルバム、近日公開',
    'show.videoComingSoon':       '動画は近日公開予定',
    'show.recordingsForthcoming': '音源は近日公開予定。',
    'show.roughMixNote':          'リリース前ラフミックス · フルキャスト録音は近日Spotifyにて公開予定',

    /* ── Production teasers ── */
    'prod.teaser.salooney-tunes': 'ハーバード大学 Hasty Pudding Theatricals 第177回ミュージカル：米国最古の大学劇団が贈る新作ワイルドウェスト冒険譚。',
    'prod.teaser.city-of-peace':  '19世紀ウクライナのゴシック文学から着想を得た、悪・民話・人間の本質を探るオリジナルオペレッタ。',
    'prod.teaser.post-mortem':    '廃れていくクラシック学科を舞台に、偶然の幽霊召喚が必死の救出計画を狂わせるコメディ・ミュージカル。',

    /* ── CTA ── */
    'cta.workTogether': 'ぜひ一緒にお仕事しましょう！',

    /* ── Credit role descriptors ── */
    'credit.role.trailerMusic':          'PV楽曲',
    'credit.role.originalSoundtrack':    'オリジナルサウンドトラック',
    'credit.role.composerSoundDesigner': '作曲・サウンドデザイン',
    'credit.role.composerTeaserTrailer': '作曲（PV）',

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
    'credit.field.Sound Design / Scoring':                  'サウンドデザイン / 音楽',
    'credit.field.Sound Design':                            'サウンドデザイン',
    'credit.field.Original Soundtrack':                     'オリジナルサウンドトラック',
    'credit.field.Original Soundtrack + Interactive Audio': 'オリジナルサウンドトラック + インタラクティブオーディオ',
    'credit.field.Contributed Tracks':                      '楽曲提供',

    /* ── Track game / genre descriptors ── */
    'track.game.Action Roguelite': 'アクションローグライト',
    'track.game.Dating Simulator': '恋愛シミュレーション',
    'track.game.Bullet Hell':      '弾幕シューター',
    'track.game.Speed Platformer': 'スピードアクション',
    'track.game.Rhythm Battler':   'リズムバトル',
    'track.game.Retro':            'レトロゲーム',
    'track.genre.Cinematic / Orchestral': 'シネマティック / オーケストラ',
    'track.genre.Electronic':             'エレクトロニック',
    'track.genre.Drum & Bass':            'ドラムンベース',
    'track.genre.Chiptune':               'チップチューン',

    /* ── Contact ── */
    'contact.framing': 'ぜひ一緒にお仕事しましょう！',
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
    'bio.p1': 'シンガポール出身、東京を拠点に活動する作曲家、Christian Liuです。ビデオゲーム音楽とミュージカルを中心に、物語を彩る音楽を創り続けています。ハーバード大学×バークリー音楽院の合同プログラムを修了。',
    'bio.p2': '学内はコンピュータサイエンスを学びながら創作にも情熱を注ぎ、2幕構成のオリジナル・ミュージカルを3作品完成。',
    'bio.p3': 'ゲーム音楽では、オリジナルサウンドトラック『Island of Hearts』（全17曲）を制作しました。さらに担当した『太吾絵巻』PVは、Bilibiliで120万回以上再生されるなど、大きな反響を獲得しています。バークリー音楽院のGames and Interactive Scoring Programを通じて世界中の開発者と協働し、ソニー・インタラクティブエンタテインメント（東京）およびLEAP Studio（北京）でのインターンシップも経験。国際的な現場で実践を重ねてきました。',
    'bio.p4': '現在は東京とシンガポールを拠点に、世界中のクライアントとリモートでコラボレーションを行っています。心を動かし、世界観を広げる音楽を。ぜひあなたのプロジェクトでご一緒できれば嬉しいです。お気軽にご連絡ください！',
    'bio.basedLabel':             '拠点',
    'bio.basedValue':             '東京 · シンガポール · リモート対応可',
    'bio.langLabel':              '言語',
    'bio.langValue':              '英語 · 中国語 · 日本語',
    'bio.milestone':              'Bilibili再生回数 — 太吾絵巻 PV',
    'bio.milestoneNumber':        '120万',
    'bio.credits.games':          'ゲーム',
    'bio.credits.musicals':       'ミュージカル',
    'bio.credits.orchestrations': 'その他の実績',
    'bio.toolsLabel': 'ソフトウェア',
    'bio.codeLabel':  'コード',

    /* ── Show synopses ── */
    'show.salooney.synopsis':   '笑いとハラハラが止まらない西部劇コメディ・ミュージカル。悪名高き無法者Robin Yablindと名声に目がくらんだ相棒Wyatt Aintmeが繰り広げる大失敗の強盗劇を軸に、Gerri Mandarin市長と大きなお腹を抱えたCarrie N Twins保安官の執拗な追跡をかわしながら物語は転がっていく。腰の引けたサルーン亭主Bart Ender、妖艶な歌姫Sarah Problem、12歳のダンス天才少女Anna Fivesix-Fivesixseveneightら個性豊かな面々が次々登場——波乱万丈の展開に、観客は一瞬たりとも目が離せない。',
    'show.cop.synopsis':        'ニコライ・ゴーゴリの物語を原案に、呪われたウクライナの村Myrhorodを舞台とした闇のミュージカル・ドラマ。夏の旅の途中、見知らぬ農家に迷い込んだ孤児の画家兼哲学者Khoma Brutは、自らの手にかけた少女の遺体のそばで三夜にわたる祈りを捧げることを強いられてしまう。仲間の神学者Khaliavaが近くで拘束される中、錠のかかった教会にひとり残されたKhomaは、幽霊に苛まれ、人の悪意に翻弄されていく。やがて問いは「生き延びられるか」から「もし生き延びたとして、自分の中に何が残るのか」へと変わっていく。',
    'show.postmortem.synopsis': '舞台は、ある架空のリベラルアーツ大学、崩れかけた古典学科の地下書庫。追い詰められた博士課程学生Tracieが徹夜作業中に偶然Gaius Valerius Catullusの幽霊を呼び出してしまう。自作の整理と名声の回復を要求するこの古代ローマの詩人は、その条件が満たされるまで一向に成仏しようとしない。',

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

/* ── Auto-detect language: URL prefix first, then browser ── */
(function () {
  const path = window.location.pathname;
  if (path === '/cn' || path.startsWith('/cn/')) {
    _lang = 'zh';
    document.documentElement.setAttribute('lang',      'zh-Hans');
    document.documentElement.setAttribute('data-lang', 'zh');
    return;
  }
  if (path === '/jp' || path.startsWith('/jp/')) {
    _lang = 'ja';
    document.documentElement.setAttribute('lang',      'ja');
    document.documentElement.setAttribute('data-lang', 'ja');
    return;
  }
  const bl = (navigator.language || '').toLowerCase();
  if      (bl.startsWith('zh')) _lang = 'zh';
  else if (bl.startsWith('ja')) _lang = 'ja';
  if (_lang !== 'en') {
    document.documentElement.setAttribute('lang',      _lang === 'zh' ? 'zh-Hans' : _lang);
    document.documentElement.setAttribute('data-lang', _lang);
  }
})();
