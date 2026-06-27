/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — nav.js
   ──────────────────────────────────────────────────────────
   Renders navigation for homepage (corner labels) and
   subpages (fixed-order accordion sidebar).

   Nav.render(section) is called by Router on every navigation
   and on language change. It re-renders the full nav each time.

   Router.navigate() is referenced lazily inside click handlers —
   Router is defined in router.js (loaded after this file),
   so the reference resolves correctly at event time.
══════════════════════════════════════════════════════════ */

const Nav = (() => {

  /* Fixed order — never changes across pages */
  const NAV_ITEMS = [
    { key: 'home',      path: '/',          labelKey: 'nav.home'      },
    { key: 'games',     path: '/games',     labelKey: 'nav.games'     },
    { key: 'musicals',  path: '/musicals',  labelKey: 'nav.musicals'  },
    { key: 'biography', path: '/biography', labelKey: 'nav.biography' },
    { key: 'contact',   path: '/contact',   labelKey: 'nav.contact'   },
  ];

  const navEl = document.getElementById('site-nav');

  /* ── Language toggle (shared between home and subpage) ── */
  function langToggleHTML() {
    const lang = getCurrentLang();
    return `
      <div class="lang-toggle" role="group" aria-label="Language selector">
        <button class="lang-btn${lang==='en'?' lang-btn--active':''}" data-lang="en" aria-pressed="${lang==='en'}">EN</button>
        <span class="lang-sep" aria-hidden="true">·</span>
        <button class="lang-btn${lang==='zh'?' lang-btn--active':''}" data-lang="zh" aria-pressed="${lang==='zh'}">中文</button>
        <span class="lang-sep" aria-hidden="true">·</span>
        <button class="lang-btn${lang==='ja'?' lang-btn--active':''}" data-lang="ja" aria-pressed="${lang==='ja'}">日本語</button>
      </div>
      <select class="lang-select" aria-label="Language selector">
        <option value="en"${lang==='en'?' selected':''}>EN</option>
        <option value="zh"${lang==='zh'?' selected':''}>中文</option>
        <option value="ja"${lang==='ja'?' selected':''}>日本語</option>
      </select>`;
  }

  /* ── Homepage nav ────────────────────────────────────────
     Four corner labels.
     data-quad attribute used in Step 2 for hover expansion.  */
  function renderHome() {
    const lang = getCurrentLang();
    navEl.className = 'nav-home';
    navEl.innerHTML = `
      <a class="corner-label corner-tl" href="/games"     data-link="/games"     data-quad="tl"
         aria-label="${t('nav.games', lang)}">${t('nav.games', lang)}</a>
      <a class="corner-label corner-tr" href="/biography" data-link="/biography" data-quad="tr"
         aria-label="${t('nav.biography', lang)}">${t('nav.biography', lang)}</a>
      <a class="corner-label corner-bl" href="/musicals"  data-link="/musicals"  data-quad="bl"
         aria-label="${t('nav.musicals', lang)}">${t('nav.musicals', lang)}</a>
      <a class="corner-label corner-br" href="/contact"   data-link="/contact"   data-quad="br"
         aria-label="${t('nav.contact', lang)}">${t('nav.contact', lang)}</a>
      <div class="nav-lang-home">${langToggleHTML()}</div>
    `;
  }

  /* ── Subpage nav ─────────────────────────────────────────
     Fixed-order accordion. Active item expands in place;
     inactive items compress.
     backPath: when set, the active title renders as a link
     (e.g. "Musicals" on a show subpage links back to /musicals). */
  function renderSubpage(activeKey, backPath) {
    const lang = getCurrentLang();
    navEl.className = 'nav-subpage';

    const items = NAV_ITEMS.map(item => {
      const isActive = item.key === activeKey;
      const isHome   = item.key === 'home';
      const label    = t(item.labelKey, lang);
      return `
        <div class="nav-item${isActive ? ' nav-item--active' : ''}${isHome ? ' nav-item--home' : ''}"
             data-item="${item.key}">
          ${isActive
            ? backPath
              ? `<a href="${backPath}" data-link="${backPath}"
                    class="nav-item__link nav-item__link--back" aria-current="page">
                   <span class="nav-item__title" aria-hidden="true">${label}</span>
                   <span class="sr-only">${label} — back to overview</span>
                 </a>`
              : `<div class="nav-item__link" aria-current="page">
                   <span class="nav-item__title" aria-hidden="true">${label}</span>
                   <span class="sr-only">${label} (current)</span>
                 </div>`
            : `<a href="${item.path}" data-link="${item.path}"
                  class="nav-item__link" aria-current="false">
                 <span class="nav-item__label">${label}</span>
               </a>`
          }
        </div>`;
    }).join('');

    navEl.innerHTML = `
      <div class="nav-accordion" role="list">${items}</div>
      <div class="nav-lang-subpage">${langToggleHTML()}</div>
    `;
  }

  /* ── GSAP ghost-clone accordion transition ───────────────
     Called before navigating: clones the outgoing active title,
     positions it fixed over the nav, animates it out.
     Then Router.navigate() replaces the nav HTML immediately
     and the incoming title animates in from the new DOM.       */
  function _animateAccordion(fromTitle, toPath) {
    if (typeof gsap === 'undefined' || !fromTitle) {
      Router.navigate(toPath);
      return;
    }

    const rect = fromTitle.getBoundingClientRect();

    /* Ghost clone: fixed position overlay over the outgoing title */
    const ghost = fromTitle.cloneNode(true);
    const cs = getComputedStyle(fromTitle);
    /* Strip class to avoid GSAP / CSS cascade conflicts; replicate via inline style */
    ghost.removeAttribute('class');
    ghost.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      font-family: ${cs.fontFamily};
      font-size: ${cs.fontSize};
      font-weight: ${cs.fontWeight};
      letter-spacing: ${cs.letterSpacing};
      color: ${cs.color};
      writing-mode: ${cs.writingMode};
      text-orientation: ${cs.textOrientation};
      transform: ${cs.transform};
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      z-index: 100;
      pointer-events: none;
      opacity: 1;
    `;

    document.body.appendChild(ghost);

    /* Animate ghost out — slow dissolve, minimal drift */
    gsap.to(ghost, {
      y: -10,
      opacity: 0,
      duration: 0.38,
      ease: 'power1.out',
      onComplete: () => ghost.remove(),
    });

    /* Navigate — replaces navEl.innerHTML immediately */
    Router.navigate(toPath);

    /* On next frame, the new title exists — slow fade-in, barely-perceptible drift */
    requestAnimationFrame(() => {
      const newTitle = navEl.querySelector('.nav-item__title');
      if (!newTitle) return;
      gsap.killTweensOf(newTitle);
      gsap.from(newTitle, {
        opacity: 0,
        y: 8,
        duration: 0.50,
        ease: 'power2.out',
        delay: 0.08,
        clearProps: 'opacity,transform',
      });
    });
  }

  /* ── Attach link + lang button event listeners ─────────── */
  function attachEvents() {
    navEl.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const path = el.getAttribute('data-link');
        const currentSection = document.body.dataset.section;
        /* Between subpages: use accordion animation; from/to home: direct */
        const fromTitle = navEl.querySelector('.nav-item__title');
        if (fromTitle && currentSection !== 'home' && path !== '/') {
          _animateAccordion(fromTitle, path);
        } else {
          Router.navigate(path);
        }
      });
    });

    navEl.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-lang'));
      });
    });

    navEl.querySelectorAll('.lang-select').forEach(sel => {
      sel.addEventListener('change', () => applyLanguage(sel.value));
    });
  }

  /* ── Animate incoming title on fresh subpage render ─────── */
  function _animateIncoming() {
    if (typeof gsap === 'undefined') return;
    const title = navEl.querySelector('.nav-item__title');
    if (!title) return;
    gsap.from(title, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'opacity',
    });
  }

  /* ── Public ─────────────────────────────────────────────── */
  function render(section, opts) {
    const fromSubpage = navEl.classList.contains('nav-subpage');
    if (section === 'home') renderHome();
    else {
      renderSubpage(section, opts && opts.backPath);
      /* Animate incoming title only when nav wasn't already animating via _animateAccordion */
      if (!fromSubpage) {
        requestAnimationFrame(_animateIncoming);
      }
    }
    attachEvents();
  }

  return { render };

})();
