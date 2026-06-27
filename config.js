/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — config.js
   ──────────────────────────────────────────────────────────
   All site content lives here. This is the only file you
   need to edit to update tracks, credits, videos, or links.

   Do NOT edit: i18n.js, nav.js, router.js, or pages/*.js
   Those are layout and logic — content lives here only.

   WAVEFORM PROFILES
   ─────────────────
   Sets the visual character of the waveform bars per track.
   Choose from: 'dense-rhythmic' | 'flowing-electronic' |
                'sweeping-orchestral' | 'sparse-electronic' |
                'sparse-melodic'

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

  /* ── Social links (leave empty string '' to hide) ─────── */
  SOCIAL: {
    youtube:    '',
    soundcloud: '',
    instagram:  '',
    linkedin:   '',
  },

  /* ── Audio tracks ─────────────────────────────────────── */
  TRACKS: [
    {
      title:           'Realm of Taiwu Trailer Theme',
      game:            'Action Roguelite',
      gameUrl:         '',
      genre:           'Game Trailer / Rock',
      duration:        74,
      durationStr:     '1:14',
      src:             'TaiwuSurvivorPV.wav',
      waveformProfile: 'dense-rhythmic',
    },
    {
      title:           'Island of Hearts Main Theme',
      game:            'Dating Simulator',
      gameUrl:         '',
      genre:           'Electronic / Drum & Bass',
      duration:        134,
      durationStr:     '2:14',
      src:             'ioh_theme.mp3',
      waveformProfile: 'flowing-electronic',
    },
    {
      title:           'Fight! Ancient Ocean Deity',
      game:            'Action Roguelite',
      gameUrl:         '',
      genre:           'Cinematic / Orchestral',
      duration:        163,
      durationStr:     '2:43',
      src:             'whaleboss.wav',
      waveformProfile: 'sweeping-orchestral',
    },
    {
      title:           'Reconnaissance',
      game:            'Bullet Hell Shooter',
      gameUrl:         '',
      genre:           'Electronic',
      duration:        128,
      durationStr:     '2:08',
      src:             'recon.wav',
      waveformProfile: 'sparse-electronic',
    },
    {
      title:           'Sweet Dreaming',
      game:            'Dating Simulator',
      gameUrl:         '',
      genre:           'Piano',
      duration:        102,
      durationStr:     '1:42',
      src:             'sweet_dreaming.wav',
      waveformProfile: 'sparse-melodic',
    },
  ],

  /* ── Professional credits ─────────────────────────────── */
  /* image: path to a thumbnail (relative to site root)
     url:   link to the game's page (or '' to omit link)    */
  CREDITS: {
    games: [
      {
        gameTitle: 'Realm of Taiwu',
        roleKey:   'credit.role.trailerMusic',
        image:     '',
        url:       'https://store.steampowered.com/app/3452720/Realm_of_Taiwu/',
        page:      '/games/realm-of-taiwu',
      },
      {
        gameTitle: 'Island of Hearts',
        roleKey:   'credit.role.originalSoundtrack',
        image:     '',
        url:       'https://store.steampowered.com/app/3794770/Island_of_Hearts/',
        page:      '/games/island-of-hearts',
      },
    ],
    musicals: [],
  },

  /* ── Video reel ───────────────────────────────────────── */
  /* youtubeId: the part after ?v= in a YouTube URL.
     e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
          → youtubeId: 'dQw4w9WgXcQ'
     Leave the array empty to hide the reel section.        */
  VIDEOS: {
    games: [
      {
        youtubeId: 'dQw4w9WgXcQ',
        title:     'Demo Reel 2025',
      },
    ],
    musicals: [],
  },

};
