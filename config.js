/* ═══════════════════════════════════════════════════════════
   CHRISTIAN LIU — GAME SITE CONFIG
   ─────────────────────────────────────────────────────────
   This is the only file you need to edit to update content.
   HTML and JS are pure templates — all content lives here.

   TRACKS
   ──────
   title       — work title (kept in original language, not translated)
   game        — game title or type descriptor (translated via i18n keys below)
   gameUrl     — optional URL for the game / project page; omit or '' to skip
   genre       — genre descriptor (translated via i18n keys below)
   duration    — total seconds (number)
   durationStr — display string "M:SS"
   src         — path to audio file relative to this folder, e.g. 'recon.wav'

   GENRE / GAME TRANSLATION KEYS
   ──────────────────────────────
   The `game` and `genre` values are looked up in i18n.js under
   the key prefix "track.game." and "track.genre." respectively.
   If no translation exists, the raw string is shown as-is.
   Example: game: 'Action Roguelite'  → key "track.game.Action Roguelite"

   VIDEOS
   ──────
   youtubeId — part after ?v= in a YouTube URL
   featured  — true = large embed, false = smaller card
   If VIDEOS is empty, the section is hidden automatically.

   CONTACT
   ───────
   Change EMAIL to update the mailto link on both contact + footer.
════════════════════════════════════════════════════════════ */

const SITE_CONFIG = {

  /* ─── Contact ─────────────────────────────────────────── */
  EMAIL: 'xile.liu@gmail.com',

  /* ─── Audio Tracks ────────────────────────────────────── */
  TRACKS: [
    {
      title:       'Realm of Taiwu Trailer Theme',
      game:        'Action Roguelite',
      gameUrl:     'https://www.google.com',          // ← paste game/project URL here, or leave ''
      genre:       'Game Trailer / Rock',
      duration:    74,
      durationStr: '1:14',
      src:         'TaiwuSurvivorPV.wav',
    },
    {
      title:       'Island of Hearts Main Theme',
      game:        'Dating Simulator',
      gameUrl:     '',
      genre:       'Electronic / Drum & Bass',
      duration:    134,
      durationStr: '2:14',
      src:         'ioh_theme.mp3',
    },
    {
      title:       'Fight! Ancient Ocean Deity',
      game:        'Action Roguelite',
      gameUrl:     '',
      genre:       'Cinematic / Orchestral',
      duration:    163,
      durationStr: '2:43',
      src:         'whaleboss.wav',
    },
    {
      title:       'Reconnaissance',
      game:        'Bullet Hell Shooter',
      gameUrl:     '',
      genre:       'Electronic',
      duration:    128,
      durationStr: '2:08',
      src:         'recon.wav',
    },
    {
      title:       'Sweet Dreaming',
      game:        'Dating Simulator',
      gameUrl:     '',
      genre:       'Piano',
      duration:    102,
      durationStr: '1:42',
      src:         'sweet_dreaming.wav',
    },
  ],

  /* ─── Videos ──────────────────────────────────────────── */
  // Leave this array empty → video section is hidden.
  // youtubeId: the part after ?v= in the YouTube URL.
  //   e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
  //        → youtubeId: 'dQw4w9WgXcQ'
  // featured: true  → large embed (first video only)
  // featured: false → smaller card in the row below
  VIDEOS: [
    {
      youtubeId: 'dQw4w9WgXcQ',
      title:     'Demo Reel 2025',
      desc:      'Orchestral, hybrid, and jazz fusion — 2 min cut.',
      featured:  true,
    },
  ],

};
