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
    { key: 'biography', path: '/biography', labelKey: 'nav.biography' },
    { key: 'musicals',  path: '/musicals',  labelKey: 'nav.musicals'  },
    { key: 'games',     path: '/games',     labelKey: 'nav.games'     },
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

    const homeSheetItems = NAV_ITEMS.map(item => {
      const isCurrent = item.key === 'home';
      return `<a href="${item.path}" data-link="${item.path}"
                 class="nav-mobile-panel__item${isCurrent ? ' is-current' : ''}"
                 ${isCurrent ? 'aria-current="page"' : ''}>
                 ${t(item.labelKey, lang)}
               </a>`;
    }).join('');

    navEl.innerHTML = `
      <a class="corner-label corner-tl" href="/biography" data-link="/biography" data-quad="tl"
         aria-label="${t('nav.biography', lang)}">${t('nav.biography', lang)}</a>
      <a class="corner-label corner-tr" href="/contact"   data-link="/contact"   data-quad="tr"
         aria-label="${t('nav.contact', lang)}">${t('nav.contact', lang)}</a>
      <a class="corner-label corner-bl" href="/games"     data-link="/games"     data-quad="bl"
         aria-label="${t('nav.games', lang)}">${t('nav.games', lang)}</a>
      <a class="corner-label corner-br" href="/musicals"  data-link="/musicals"  data-quad="br"
         aria-label="${t('nav.musicals', lang)}">${t('nav.musicals', lang)}</a>
      <div class="nav-lang-home">${langToggleHTML()}</div>

      <!-- Mobile: swipe-up nav sheet (homepage only) -->
      <div class="nav-home-sheet" id="nav-home-sheet" aria-hidden="true">
        <svg class="nav-mobile-panel__diag" viewBox="0 0 100 100" preserveAspectRatio="none"
             aria-hidden="true">
          <line x1="33" y1="0" x2="60" y2="100" stroke="rgba(200,169,122,0.18)" stroke-width="0.4"/>
          <line x1="0" y1="60" x2="100" y2="40" stroke="rgba(200,169,122,0.12)" stroke-width="0.3"/>
        </svg>
        <button class="nav-mobile-panel__close" aria-label="Close navigation">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
               stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
            <line x1="2" y1="2" x2="14" y2="14"/>
            <line x1="14" y1="2" x2="2" y2="14"/>
          </svg>
        </button>
        <nav class="nav-mobile-panel__items">${homeSheetItems}</nav>
        <div class="nav-mobile-panel__lang">${langToggleHTML()}</div>
      </div>
    `;
  }

  /* ── Subpage nav ─────────────────────────────────────────
     Fixed-order accordion (desktop) + hamburger/globe (mobile).
     backPath: when set, the active title renders as a link
     (e.g. "Musicals" on a show subpage links back to /musicals). */
  function renderSubpage(activeKey, backPath) {
    const lang = getCurrentLang();
    navEl.className = 'nav-subpage';

    /* Desktop accordion items */
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

    /* Mobile panel items (includes Home) */
    const mobileItems = NAV_ITEMS.map(item => {
      const isCurrent = item.key === activeKey;
      const dest      = (isCurrent && backPath) ? backPath : item.path;
      return `<a href="${dest}" data-link="${dest}"
                 class="nav-mobile-panel__item${isCurrent ? ' is-current' : ''}"
                 ${isCurrent ? 'aria-current="page"' : ''}>
                 ${t(item.labelKey, lang)}
               </a>`;
    }).join('');

    const currentLabel = t(NAV_ITEMS.find(i => i.key === activeKey)?.labelKey || '', lang);

    navEl.innerHTML = `
      <div class="nav-accordion" role="list">${items}</div>
      <div class="nav-lang-subpage">${langToggleHTML()}</div>

      <!-- Mobile: spine strip (hidden on desktop) -->
      <div class="nav-spine" id="nav-spine" role="button" tabindex="0"
           aria-label="Open navigation" aria-expanded="false" aria-controls="nav-mobile-panel">
        <span class="nav-spine__tab" aria-hidden="true"></span>
        <span class="nav-spine__title" aria-hidden="true">${currentLabel}</span>
      </div>

      <!-- Mobile: full-screen nav overlay -->
      <div class="nav-mobile-panel" id="nav-mobile-panel" aria-hidden="true">
        <svg class="nav-mobile-panel__diag" viewBox="0 0 100 100" preserveAspectRatio="none"
             aria-hidden="true">
          <line x1="33" y1="0" x2="60" y2="100" stroke="rgba(200,169,122,0.18)" stroke-width="0.4"/>
          <line x1="0" y1="60" x2="100" y2="40" stroke="rgba(200,169,122,0.12)" stroke-width="0.3"/>
        </svg>
        <button class="nav-mobile-panel__close" aria-label="Close navigation">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
               stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
            <line x1="2" y1="2" x2="14" y2="14"/>
            <line x1="14" y1="2" x2="2" y2="14"/>
          </svg>
        </button>
        <nav class="nav-mobile-panel__items">${mobileItems}</nav>
        <div class="nav-mobile-panel__lang">${langToggleHTML()}</div>
      </div>

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

  /* ── Homepage swipe-up nav sheet ────────────────────────── */
  function _openHomeSheet() {
    const sheet = navEl.querySelector('.nav-home-sheet');
    if (!sheet || sheet.classList.contains('is-open')) return;
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    if (typeof gsap !== 'undefined' &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const items = sheet.querySelectorAll('.nav-mobile-panel__item');
      gsap.from(items, {
        y: 16, duration: 0.30, ease: 'power2.out',
        stagger: 0.045, delay: 0.06, clearProps: 'all',
      });
    }
  }

  function _closeHomeSheet() {
    const sheet = navEl.querySelector('.nav-home-sheet');
    if (!sheet) return;
    sheet.style.transform = '';
    sheet.style.transition = '';
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
  }

  function _wireHomeSheetSwipe(sheet) {
    let startY = 0;
    let dragging = false;
    const DEAD_ZONE = 20;       /* px of slack before sheet starts moving */
    const DISMISS_THRESHOLD = 120; /* total px down required to dismiss */

    sheet.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
      dragging = true;
      sheet.style.transition = 'none';
    }, { passive: true });

    sheet.addEventListener('touchmove', e => {
      if (!dragging) return;
      const deltaY = e.touches[0].clientY - startY;
      /* Only track movement past the dead zone so normal taps never move the sheet */
      if (deltaY > DEAD_ZONE) {
        sheet.style.transform = `translateY(${deltaY - DEAD_ZONE}px)`;
      }
    }, { passive: true });

    sheet.addEventListener('touchend', e => {
      if (!dragging) return;
      dragging = false;
      const deltaY = e.changedTouches[0].clientY - startY;
      sheet.style.transition = '';
      sheet.style.transform = '';
      if (deltaY > DISMISS_THRESHOLD) _closeHomeSheet();
    });
  }

  /* ── Close all mobile panels ───────────────────────────── */
  function _closeMobilePanels() {
    const panel = navEl.querySelector('.nav-mobile-panel');
    const spine = navEl.querySelector('.nav-spine');
    if (panel) { panel.classList.remove('is-open'); panel.setAttribute('aria-hidden', 'true'); }
    if (spine) spine.setAttribute('aria-expanded', 'false');
    _closeHomeSheet();
  }

  /* ── Attach link + lang button event listeners ─────────── */
  function attachEvents() {
    navEl.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        _closeMobilePanels();
        const path = el.getAttribute('data-link');
        const currentSection = document.body.dataset.section;
        /* Between subpages: use accordion animation; from/to home: direct.
           Skip on mobile — accordion is hidden (getBoundingClientRect returns 0). */
        const fromTitle = navEl.querySelector('.nav-item__title');
        const fromTitleVisible = fromTitle && fromTitle.getBoundingClientRect().height > 0;
        if (fromTitleVisible && currentSection !== 'home' && path !== '/') {
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

    /* ── Mobile: spine toggle ────────────────────────────────
       The spine strip IS the nav trigger. Tapping it opens the
       full-screen overlay; the close button (×) or a link tap
       closes it. First visit: shimmer hint after 900 ms.       */
    const spine    = navEl.querySelector('.nav-spine');
    const navPanel = navEl.querySelector('.nav-mobile-panel');
    const closeBtn = navEl.querySelector('.nav-mobile-panel__close');

    function _openNavPanel() {
      navPanel.classList.add('is-open');
      navPanel.setAttribute('aria-hidden', 'false');
      if (spine) spine.setAttribute('aria-expanded', 'true');
      if (typeof gsap !== 'undefined') {
        const items = navPanel.querySelectorAll('.nav-mobile-panel__item');
        gsap.from(items, {
          x: -16, duration: 0.30, ease: 'power2.out',
          stagger: 0.045, delay: 0.06, clearProps: 'all',
        });
      }
    }

    if (spine && navPanel) {
      const handleSpineOpen = () => {
        const opening = !navPanel.classList.contains('is-open');
        _closeMobilePanels();
        if (opening) _openNavPanel();
      };
      spine.addEventListener('click', handleSpineOpen);
      spine.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSpineOpen(); }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => _closeMobilePanels());
    }

    /* ── Home sheet: swipe-down dismiss ─────────────────── */
    const homeSheet = navEl.querySelector('.nav-home-sheet');
    if (homeSheet) _wireHomeSheetSwipe(homeSheet);

    /* ── Mobile: first-visit spine shimmer hint ───────────── */
    if (spine && spine.offsetWidth > 0 && !localStorage.getItem('cl-spine-hint')) {
      const tid = setTimeout(() => {
        if (localStorage.getItem('cl-spine-hint')) return;
        spine.classList.add('is-hinting');
        spine.addEventListener('animationend', () => {
          spine.classList.remove('is-hinting');
          localStorage.setItem('cl-spine-hint', '1');
        }, { once: true });
      }, 900);
      spine.addEventListener('click', () => {
        clearTimeout(tid);
        spine.classList.remove('is-hinting');
        localStorage.setItem('cl-spine-hint', '1');
      }, { once: true });
    }

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

  /* ── Outside-click: close mobile panels (wired once) ────── */
  let _outsideClickWired = false;
  function _wireOutsideClick() {
    if (_outsideClickWired) return;
    _outsideClickWired = true;
    document.addEventListener('click', e => {
      if (!navEl.contains(e.target)) _closeMobilePanels();
    }, { capture: true, passive: true });
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
    _wireOutsideClick();
  }

  return { render, openHomeSheet: _openHomeSheet };

})();
