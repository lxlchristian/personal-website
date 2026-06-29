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
    '/':                           'home',
    '/games':                      'games',
    '/games/island-of-hearts':     'games-island-of-hearts',
    '/games/realm-of-taiwu':       'games-realm-of-taiwu',
    '/musicals':                   'musicals',
    '/musicals/salooney-tunes':    'musicals-salooney-tunes',
    '/musicals/city-of-peace':     'musicals-city-of-peace',
    '/musicals/post-mortem':       'musicals-post-mortem',
    '/biography':                  'biography',
    '/contact':                    'contact',
  };

  /* Map section names to page objects (defined in pages/*.js) */
  const Pages = {
    home:                      HomePage,
    games:                     GamesPage,
    'games-island-of-hearts':  IslandOfHeartsPage,
    'games-realm-of-taiwu':    RealmOfTaiwuPage,
    musicals:                  MusicalsPage,
    'musicals-salooney-tunes': SalooneyTunesPage,
    'musicals-city-of-peace':  CityOfPeacePage,
    'musicals-post-mortem':    PostMortemPage,
    biography:                 BiographyPage,
    contact:                   ContactPage,
  };

  const contentEl = document.getElementById('content');

  /* ── Language prefix helpers ─────────────────────────── */
  function _getLangFromPath(pathname) {
    if (pathname === '/cn' || pathname.startsWith('/cn/')) return 'zh';
    if (pathname === '/jp' || pathname.startsWith('/jp/')) return 'ja';
    return 'en';
  }

  function _stripLangPrefix(pathname) {
    if (pathname.startsWith('/cn/')) return pathname.slice(3);
    if (pathname === '/cn') return '/';
    if (pathname.startsWith('/jp/')) return pathname.slice(3);
    if (pathname === '/jp') return '/';
    return pathname;
  }

  function _addLangPrefix(strippedPath, lang) {
    if (lang === 'zh') return strippedPath === '/' ? '/cn' : '/cn' + strippedPath;
    if (lang === 'ja') return strippedPath === '/' ? '/jp' : '/jp' + strippedPath;
    return strippedPath;
  }

  function getSection(pathname) {
    return ROUTES[_stripLangPrefix(pathname)] || 'home';
  }

  function getNavKey(section) {
    if (section.startsWith('musicals-')) return 'musicals';
    if (section.startsWith('games-'))   return 'games';
    return section;
  }

  /* ── Navigate to a new path (path is always prefix-free) ─ */
  function navigate(path) {
    const fullPath = _addLangPrefix(path, getCurrentLang());
    if (window.location.pathname === fullPath) return;
    AudioPlayer.stop();
    history.pushState({}, '', fullPath);
    render(fullPath);
  }

  /* ── Full render cycle ─────────────────────────────────── */
  function render(pathname) {
    const section    = getSection(pathname); // getSection strips the lang prefix internally
    const navSection = getNavKey(section);

    /* Drive body[data-section] — CSS uses this for overflow and layout */
    document.body.dataset.section = section;

    /* Nav: show subpages keep parent nav item active, rendered as a back-link */
    let navOpts = null;
    if (section !== navSection) {
      navOpts = { backPath: navSection === 'games' ? '/games' : '/musicals' };
    }
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
        'games-island-of-hearts':  'Island of Hearts — Christian Liu',
        'games-realm-of-taiwu':    'Realm of Taiwu — Christian Liu',
        musicals:                  'Musicals — Christian Liu',
        'musicals-salooney-tunes': 'Salooney Tunes — Christian Liu',
        'musicals-city-of-peace':  'City of Peace — Christian Liu',
        'musicals-post-mortem':    'Post Mortem — Christian Liu',
        biography:                 'Biography — Christian Liu',
        contact:                   'Contact — Christian Liu',
      },
      zh: {
        home:                      'Christian Liu — 游戏音乐作曲家',
        games:                     '游戏 — Christian Liu',
        'games-island-of-hearts':  'Island of Hearts — Christian Liu',
        'games-realm-of-taiwu':    'Realm of Taiwu — Christian Liu',
        musicals:                  '音乐剧 — Christian Liu',
        'musicals-salooney-tunes': 'Salooney Tunes — Christian Liu',
        'musicals-city-of-peace':  'City of Peace — Christian Liu',
        'musicals-post-mortem':    'Post Mortem — Christian Liu',
        biography:                 '个人简介 — Christian Liu',
        contact:                   '联系 — Christian Liu',
      },
      ja: {
        home:                      'Christian Liu — ゲーム音楽作曲家',
        games:                     'ゲーム — Christian Liu',
        'games-island-of-hearts':  'Island of Hearts — Christian Liu',
        'games-realm-of-taiwu':    'Realm of Taiwu — Christian Liu',
        musicals:                  'ミュージカル — Christian Liu',
        'musicals-salooney-tunes': 'Salooney Tunes — Christian Liu',
        'musicals-city-of-peace':  'City of Peace — Christian Liu',
        'musicals-post-mortem':    'Post Mortem — Christian Liu',
        biography:                 'プロフィール — Christian Liu',
        contact:                   'お問い合わせ — Christian Liu',
      },
    };
    document.title = (titles[lang] || titles.en)[section] || 'Christian Liu';
  }

  /* ── Event listeners ───────────────────────────────────── */

  /* Flag: true while popstate is syncing language to suppress URL rewrite in langchange */
  let _poppingState = false;

  /* Back / forward: if URL lang differs from current, sync language first.
     applyLanguage dispatches langchange synchronously, which renders; the flag
     prevents that handler from also rewriting the URL (it's already correct). */
  window.addEventListener('popstate', () => {
    const pathname = window.location.pathname;
    const pathLang = _getLangFromPath(pathname);
    if (pathLang !== getCurrentLang()) {
      _poppingState = true;
      applyLanguage(pathLang);
      _poppingState = false;
    } else {
      render(pathname);
    }
  });

  /* Language change — update URL prefix and re-render */
  window.addEventListener('langchange', () => {
    if (_poppingState) {
      /* URL is already correct (set by browser history); just re-render */
      render(window.location.pathname);
      return;
    }
    const lang      = getCurrentLang();
    const stripped  = _stripLangPrefix(window.location.pathname);
    const newPath   = _addLangPrefix(stripped, lang);
    history.replaceState({}, '', newPath);
    render(newPath);
  });

  /* ── Cold entry: render from current URL ──────────────── */
  render(window.location.pathname);

  return { navigate };

})();
