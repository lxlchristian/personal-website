/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — router.js
   ──────────────────────────────────────────────────────────
   SPA router. Must be loaded last (after all page scripts).

   On cold entry (direct URL), reads window.location.pathname
   to determine which section to render.

   Server catch-all (vercel.json / netlify.toml) ensures any
   path returns index.html so the router can handle it.
══════════════════════════════════════════════════════════ */

const Router = (() => {

  const ROUTES = {
    '/':                       'home',
    '/games':                  'games',
    '/musicals':               'musicals',
    '/musicals/salooney-tunes':'musicals-salooney-tunes',
    '/musicals/city-of-peace': 'musicals-city-of-peace',
    '/musicals/post-mortem':   'musicals-post-mortem',
    '/biography':              'biography',
    '/contact':                'contact',
  };

  /* Map section names to page objects (defined in pages/*.js) */
  const Pages = {
    home:                      HomePage,
    games:                     GamesPage,
    musicals:                  MusicalsPage,
    'musicals-salooney-tunes': SalooneyTunesPage,
    'musicals-city-of-peace':  CityOfPeacePage,
    'musicals-post-mortem':    PostMortemPage,
    biography:                 BiographyPage,
    contact:                   ContactPage,
  };

  const contentEl = document.getElementById('content');

  function getSection(pathname) {
    return ROUTES[pathname] || 'home';
  }

  /* Musicals show pages still use the "musicals" nav accordion item */
  function getNavKey(section) {
    return section.startsWith('musicals-') ? 'musicals' : section;
  }

  /* ── Navigate to a new path ────────────────────────────── */
  function navigate(path) {
    if (window.location.pathname === path) return;
    history.pushState({}, '', path);
    render(path);
  }

  /* ── Full render cycle ─────────────────────────────────── */
  function render(pathname) {
    const section    = getSection(pathname);
    const navSection = getNavKey(section);

    /* Drive body[data-section] — CSS uses this for overflow and layout */
    document.body.dataset.section = section;

    /* Nav: musicals show subpages keep "Musicals" active, now as a back-link */
    const navOpts = (section !== navSection) ? { backPath: '/musicals' } : null;
    Nav.render(navSection, navOpts);

    /* Swap content */
    contentEl.innerHTML = '';
    const page = Pages[section];
    if (page && typeof page.mount === 'function') {
      page.mount(contentEl);
    }

    /* Document title + lang attribute */
    updateMeta(section);

    /* Scroll to top on subpage nav (not on popstate — preserve position) */
    if (navSection !== 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  /* ── Document meta ─────────────────────────────────────── */
  function updateMeta(section) {
    const lang = getCurrentLang();
    const titles = {
      en: {
        home:                      'Christian Liu — Video Game Composer',
        games:                     'Games — Christian Liu',
        musicals:                  'Musicals — Christian Liu',
        'musicals-salooney-tunes': 'Salooney Tunes — Christian Liu',
        'musicals-city-of-peace':  'City of Peace — Christian Liu',
        'musicals-post-mortem':    'Post-Mortem — Christian Liu',
        biography:                 'Biography — Christian Liu',
        contact:                   'Contact — Christian Liu',
      },
      zh: {
        home:                      'Christian Liu — 游戏音乐作曲家',
        games:                     '游戏 — Christian Liu',
        musicals:                  '音乐剧 — Christian Liu',
        'musicals-salooney-tunes': 'Salooney Tunes — Christian Liu',
        'musicals-city-of-peace':  'City of Peace — Christian Liu',
        'musicals-post-mortem':    'Post-Mortem — Christian Liu',
        biography:                 '个人简介 — Christian Liu',
        contact:                   '联系 — Christian Liu',
      },
      ja: {
        home:                      'Christian Liu — ゲーム音楽作曲家',
        games:                     'ゲーム — Christian Liu',
        musicals:                  'ミュージカル — Christian Liu',
        'musicals-salooney-tunes': 'Salooney Tunes — Christian Liu',
        'musicals-city-of-peace':  'City of Peace — Christian Liu',
        'musicals-post-mortem':    'Post-Mortem — Christian Liu',
        biography:                 'プロフィール — Christian Liu',
        contact:                   'お問い合わせ — Christian Liu',
      },
    };
    document.title = (titles[lang] || titles.en)[section] || 'Christian Liu';
  }

  /* ── Event listeners ───────────────────────────────────── */

  /* Back / forward navigation */
  window.addEventListener('popstate', () => render(window.location.pathname));

  /* Language change — re-render current section with new language */
  window.addEventListener('langchange', () => render(window.location.pathname));

  /* ── Cold entry: render from current URL ──────────────── */
  render(window.location.pathname);

  return { navigate };

})();
