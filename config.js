/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — config.js
   ──────────────────────────────────────────────────────────
   All site content lives here. This is the only file you
   need to edit to update tracks, credits, videos, or links.

   Do NOT edit: i18n.js, nav.js, router.js, or pages/*.js
   Those are layout and logic — content lives here only.

   CREDIT ROLE KEYS
   ────────────────
   roleKey values are looked up in i18n.js for translation.
   Current keys: 'credit.role.trailerMusic'
                 'credit.role.originalSoundtrack'
   Add new keys to i18n.js if needed.
══════════════════════════════════════════════════════════ */

const SITE_CONFIG = {

  /* ── Contact ──────────────────────────────────────────── */
  EMAIL: 'xile.liu@gmail.com',

  /* Formspree endpoint — sign up at formspree.io, create a form,
     and paste the full URL here, e.g.:
     'https://formspree.io/f/xpwzabcd'
     Leave empty to disable the form (direct email link still works). */
  FORM_ENDPOINT: 'https://formspree.io/f/xwvdbyrk',

  /* ── Social links (leave empty string '' to hide) ─────── */
  SOCIAL: {
    youtube:    'https://www.youtube.com/@xilebilemusic',
    soundcloud: 'https://soundcloud.com/xilebile',
    instagram:  '',
    linkedin:   'https://www.linkedin.com/in/christian-liu-51480522b/',
  },

  /* ── Audio tracks ─────────────────────────────────────── */
  TRACKS: [
    {
      title:       'Battle the Beast!',
      game:        'Action Roguelite',
      gameUrl:     '',
      genre:       'Cinematic / Orchestral',
      durationStr: '2:43',
      src:         'whaleboss.wav',
    },
    {
      title:       'ARACHNOPHOBIA_A',
      game:        'Rhythm Battler',
      gameUrl:     '',
      genre:       'Electronic',
      durationStr: '2:48',
      src:         'ARACHNOPHOBIA_A.wav',
    },
    {
      title:       'Reconnaissance',
      game:        'Bullet Hell Shooter',
      gameUrl:     '',
      genre:       'Electronic',
      durationStr: '2:08',
      src:         'recon.wav',
    },

    {
      title:       'STREAM_LINE (Branched)',
      game:        'Platformer',
      gameUrl:     '',
      genre:       'Drum & Bass',
      durationStr: '1:23',
      src:         'STREAM__LINE_Flow.wav',
    },
    {
      title:       'Windy Hut',
      game:        'Retro Platformer',
      gameUrl:     '',
      genre:       'Chiptune',
      durationStr: '1:55',
      src:         'WindyHut.wav',
    },
  ],

  /* ── Professional credits ─────────────────────────────── */
  /* image: path to a thumbnail (relative to site root)
     url:   link to the game's page (or '' to omit link)    */
  CREDITS: {
    games: [
      {
        gameTitle: 'Island of Hearts',
        roleKey:   'credit.role.originalSoundtrack',
        image:     'islandofhearts-card.jpg',
        studio:    'Titan Digital Media',
        genre:     'Dating Simulator',
        year:      2026,
        url:       'https://store.steampowered.com/app/3794770/Island_of_Hearts/',
        page:      '/games/island-of-hearts',
      },
      {
        gameTitle: 'Realm of Taiwu: Teaser Trailer',
        roleKey:   'credit.role.trailerMusic',
        image:     'realmoftaiwu-card.jpg',
        studio:    'LEAP Studio',
        genre:     'Action Roguelite',
        year:      2025,
        url:       'https://store.steampowered.com/app/3452720/Realm_of_Taiwu/',
        page:      '/games/realm-of-taiwu',
      },
    ],
    musicals: [],
  },

};
