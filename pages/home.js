/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — pages/home.js
   ──────────────────────────────────────────────────────────
   Homepage: full-viewport quadrant layout.
   Lines drawn as SVG <line> elements from explicit edge
   coordinates — no rotation approach.
══════════════════════════════════════════════════════════ */

/* ── Resting line endpoints (viewport fractions) ────────
   Line A: top-edge → bottom-edge  (divides left / right)
   Line B: left-edge → right-edge  (divides top / bottom) */
const _REST = {
  a: { x1: 0.33, y1: 0,    x2: 0.60, y2: 1    },
  b: { x1: 0,    y1: 0.60, x2: 1,    y2: 0.40 },
};

/* ── Hover endpoint overrides per quadrant ──────────────
   All four endpoints specified; both lines shift on hover. */
const _HOVER = {
  tl: { a: { x1: 0.44, x2: 0.76 }, b: { y1: 0.72, y2: 0.70 } }, /* Biography */
  tr: { a: { x1: 0.29, x2: 0.45 }, b: { y1: 0.76, y2: 0.52 } }, /* Contact   */
  bl: { a: { x1: 0.62, x2: 0.72 }, b: { y1: 0.48, y2: 0.23 } }, /* Games     */
  br: { a: { x1: 0.23, x2: 0.48 }, b: { y1: 0.34, y2: 0.45 } }, /* Musicals  */
};

/* ── Mobile-specific line positions — wider angles for portrait viewport ─
   Intersection lands near (46 %, 52 %) which is roughly screen center.    */
const _REST_MOBILE = {
  a: { x1: 0.44, y1: 0,    x2: 0.56, y2: 1    },
  b: { x1: 0,    y1: 0.70, x2: 1,    y2: 0.30 },
};

const _HOVER_MOBILE = {
  tl: { a: { x1: 0.63, x2: 0.63 }, b: { y1: 0.70, y2: 0.82 } },
  tr: { a: { x1: 0.10, x2: 0.52 }, b: { y1: 0.82, y2: 0.58 } },
  bl: { a: { x1: 0.48, x2: 0.86 }, b: { y1: 0.52, y2: 0.06 } },
  br: { a: { x1: 0.08, x2: 0.48 }, b: { y1: 0.40, y2: 0.22 } },
};

/* ── Corner label translate direction on hover ───────── */
const _CORNER_NUDGE = {
  tl: { x: -10, y: -10 },
  tr: { x:  10, y: -10 },
  bl: { x: -10, y:  10 },
  br: { x:  10, y:  10 },
};

/* ── Mobile armed nudge — font-size zoom handles the expansion; no translation needed */
const _MOBILE_ARMED_NUDGE = {
  tl: { x: 0, y: 0 },
  tr: { x: 0, y: 0 },
  bl: { x: 0, y: 0 },
  br: { x: 0, y: 0 },
};

const _QUAD_PATHS = {
  tl: '/biography',
  tr: '/contact',
  bl: '/games',
  br: '/musicals',
};

const _SPRING   = 'cubic-bezier(0.16, 1, 0.3, 1)'; /* corner label nudge */
const _EASE_OUT = 'power2.out';                     /* hover + idle-reset ease */

/* ── Live line state in CSS px — mutated by GSAP ────── */
const _st = {
  a: { x1: 0, y1: 0, x2: 0, y2: 0 },
  b: { x1: 0, y1: 0, x2: 0, y2: 0 },
};

/* ── Interaction state ─────────────────────────────────
   _activeQuad: which quadrant is currently shown
   _idleTimer:  fires after 1.5 s inactivity → rest
   _activateTimer: 300 ms intent delay from idle           */
let _activeQuad    = null;
let _idleTimer     = null;
let _activateTimer = null;
let _pageLoadAnimDone = false;
let _isDrifting       = false;

/* Intersection of the two infinite lines (line-line formula) */
function _intersect() {
  const { a, b } = _st;
  const dxa = a.x2 - a.x1, dya = a.y2 - a.y1;
  const dxb = b.x2 - b.x1, dyb = b.y2 - b.y1;
  const den = dxa * dyb - dya * dxb;
  if (!den) return { x: 0, y: 0 };
  const t = ((b.x1 - a.x1) * dyb - (b.y1 - a.y1) * dxb) / den;
  return { x: a.x1 + t * dxa, y: a.y1 + t * dya };
}

/* Flush current _st values to SVG attributes + clip-paths */
function _render() {
  const { a, b } = _st;
  const W = window.innerWidth, H = window.innerHeight;

  const lA = document.getElementById('diagLineA');
  const lB = document.getElementById('diagLineB');
  const gA = document.getElementById('diagGradA');
  const gB = document.getElementById('diagGradB');

  /* Update SVG line/gradient elements only if they exist (desktop, or before
     _renderMobilePolygons replaces svg.innerHTML on mobile) */
  if (lA) {
    lA.setAttribute('x1', a.x1); lA.setAttribute('y1', a.y1);
    lA.setAttribute('x2', a.x2); lA.setAttribute('y2', a.y2);
    lB.setAttribute('x1', b.x1); lB.setAttribute('y1', b.y1);
    lB.setAttribute('x2', b.x2); lB.setAttribute('y2', b.y2);
    gA.setAttribute('x1', a.x1); gA.setAttribute('y1', a.y1);
    gA.setAttribute('x2', a.x2); gA.setAttribute('y2', a.y2);
    gB.setAttribute('x1', b.x1); gB.setAttribute('y1', b.y1);
    gB.setAttribute('x2', b.x2); gB.setAttribute('y2', b.y2);
  }

  const { x: ix, y: iy } = _intersect();

  const clips = {
    TL: `polygon(0px 0px, ${a.x1}px 0px, ${ix}px ${iy}px, 0px ${b.y1}px)`,
    TR: `polygon(${a.x1}px 0px, ${W}px 0px, ${W}px ${b.y2}px, ${ix}px ${iy}px)`,
    BL: `polygon(0px ${b.y1}px, ${ix}px ${iy}px, ${a.x2}px ${H}px, 0px ${H}px)`,
    BR: `polygon(${ix}px ${iy}px, ${W}px ${b.y2}px, ${W}px ${H}px, ${a.x2}px ${H}px)`,
  };
  Object.entries(clips).forEach(([q, cp]) => {
    const el = document.getElementById('quad' + q);
    if (el) el.style.clipPath = cp;
  });
}

/* ── Mobile: two-tap reveal mechanic ────────────────────────
   Quad overlays receive taps directly via their diagonal
   clip-paths. Nav-home is pointer-events:none on mobile (CSS)
   so clicks pass through to the overlay beneath.
   First tap: arms the quad — diagonals shift (same as desktop
   hover), image fades in, label springs outward.
   Second tap on same quad: navigates. Tap a different quad:
   switches arm. Auto-resets after 2.5 s.                      */
function _initMobileQuads() {
  _setResting();
  _render();

  let _armedQuad = null;
  let _resetTimer = null;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* restoreOpacity=false when called from _armQuad — opacity is handled there instead */
  function _deactivateAll(restoreOpacity = true) {
    clearTimeout(_resetTimer);
    _armedQuad = null;
    _stopIdleDrift();
    document.querySelectorAll('.quad-overlay').forEach(el => el.classList.remove('is-active'));
    document.querySelectorAll('.corner-label').forEach(el => {
      el.classList.remove('is-armed');
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(el);
        if (prefersReduced.matches) {
          gsap.set(el, { x: 0, y: 0, ...(restoreOpacity ? { opacity: 1 } : {}) });
        } else if (restoreOpacity) {
          gsap.to(el, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        } else {
          gsap.set(el, { x: 0, y: 0 });
        }
      }
    });
    _animateLines(_target(null), 0.8, _EASE_OUT); /* return diagonals to rest */
    /* Restart drift after reset animation — guard prevents restart if user re-armed quickly */
    if (typeof gsap !== 'undefined') {
      gsap.delayedCall(1.0, () => { if (_armedQuad === null) _startIdleDrift(); });
    }
  }

  function _armQuad(quad) {
    _deactivateAll(false); /* kills timers + resets position; opacity handled below */
    _armedQuad = quad;

    /* Dim non-armed labels; keep armed label at full opacity */
    if (typeof gsap !== 'undefined') {
      document.querySelectorAll('.corner-label').forEach(el => {
        gsap.killTweensOf(el);
        if (el.classList.contains('corner-' + quad)) {
          gsap.set(el, { opacity: 1 });
        } else {
          gsap.to(el, { opacity: 0.2, duration: 0.25, ease: 'power2.out' });
        }
      });
    }

    /* Reveal background image */
    const overlay = document.getElementById('quad' + quad.toUpperCase());
    if (overlay) overlay.classList.add('is-active');

    /* Shift diagonals — slower, softer ease on mobile */
    _animateLines(_target(quad), 0.85, 'power2.inOut');

    /* Spring corner label outward (armed signal) */
    const label = document.querySelector('.corner-' + quad);
    const nudge = _MOBILE_ARMED_NUDGE[quad];
    if (label && nudge) {
      label.classList.add('is-armed');
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(label);
        if (prefersReduced.matches) {
          gsap.set(label, { x: nudge.x, y: nudge.y });
        } else {
          gsap.to(label, { x: nudge.x, y: nudge.y, duration: 0.45, ease: 'power3.out' });
        }
      }
    }

    _resetTimer = setTimeout(_deactivateAll, 2500);
  }

  /* Each overlay receives taps via its diagonal clip-path region */
  ['TL', 'TR', 'BL', 'BR'].forEach(Q => {
    const overlay = document.getElementById('quad' + Q);
    if (!overlay) return;
    overlay.style.pointerEvents = 'all';
    overlay.style.cursor = 'pointer';

    const quad = Q.toLowerCase();
    overlay.addEventListener('click', () => {
      if (_armedQuad === quad) {
        clearTimeout(_resetTimer);
        _armedQuad = null;
        if (typeof Router !== 'undefined') Router.navigate(_QUAD_PATHS[quad]);
        return;
      }
      _armQuad(quad);
    });
  });

  _withGSAP(() => gsap.delayedCall(2.0, _startIdleDrift));
}

/* Reset _st to resting state for current viewport */
function _setResting() {
  const W = window.innerWidth, H = window.innerHeight;
  const isMob = window.matchMedia('(max-width: 768px)').matches;
  const rest = isMob ? _REST_MOBILE : _REST;
  _st.a = { x1: rest.a.x1*W, y1: rest.a.y1*H, x2: rest.a.x2*W, y2: rest.a.y2*H };
  _st.b = { x1: rest.b.x1*W, y1: rest.b.y1*H, x2: rest.b.x2*W, y2: rest.b.y2*H };
}

/* Compute hover target px (quad=null → resting) */
function _target(quad) {
  const W = window.innerWidth, H = window.innerHeight;
  const isMob = window.matchMedia('(max-width: 768px)').matches;
  const restSrc  = isMob ? _REST_MOBILE : _REST;
  const hoverSrc = isMob ? _HOVER_MOBILE : _HOVER;
  const ha = quad ? (hoverSrc[quad].a || {}) : {};
  const hb = quad ? (hoverSrc[quad].b || {}) : {};
  const fa = { ...restSrc.a, ...ha };
  const fb = { ...restSrc.b, ...hb };
  return {
    a: { x1: fa.x1*W, y1: fa.y1*H, x2: fa.x2*W, y2: fa.y2*H },
    b: { x1: fb.x1*W, y1: fb.y1*H, x2: fb.x2*W, y2: fb.y2*H },
  };
}

/* Animate lines to target.
   dur/ease default to power3.out hover; idle reset passes slower ease-in. */
function _animateLines(tgt, dur = 0.5, ease = _EASE_OUT) {
  if (typeof gsap === 'undefined') return;
  gsap.killTweensOf(_st.a);
  gsap.killTweensOf(_st.b);
  gsap.to(_st.a, { ...tgt.a, duration: dur, ease, onUpdate: _render });
  gsap.to(_st.b, { ...tgt.b, duration: dur, ease, onUpdate: _render });
}

/* ── Quadrant activation state machine ──────────────── */

function _activateQuad(quad) {
  clearTimeout(_idleTimer);
  clearTimeout(_activateTimer);
  _idleTimer = _activateTimer = null;

  if (_activeQuad === quad) return;

  /* Deactivate previous */
  if (_activeQuad) {
    document.getElementById('quad' + _activeQuad.toUpperCase())?.classList.remove('is-active');
    const prev = document.querySelector('.corner-' + _activeQuad);
    if (prev && typeof gsap !== 'undefined') {
      gsap.to(prev, { x: 0, y: 0, duration: 0.5, ease: _SPRING });
    }
  }

  _activeQuad = quad;

  if (quad) {
    _stopIdleDrift();
    /* Activate new quadrant: spring-animate lines + show overlay + nudge label */
    _animateLines(_target(quad));
    document.getElementById('quad' + quad.toUpperCase())?.classList.add('is-active');
    const label = document.querySelector('.corner-' + quad);
    const nudge = _CORNER_NUDGE[quad];
    if (label && nudge && typeof gsap !== 'undefined') {
      gsap.to(label, { x: nudge.x, y: nudge.y, duration: 0.5, ease: _SPRING });
    }
  } else {
    _stopIdleDrift();
    /* Idle reset: slower ease-in return to rest */
    _animateLines(_target(null), 0.8, _EASE_OUT);
    document.querySelectorAll('.quad-overlay').forEach(el => el.classList.remove('is-active'));
    document.querySelectorAll('.corner-label').forEach(el => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: _EASE_OUT });
      }
    });
    /* Restart drift after reset animation — guard prevents restart if user re-hovered quickly */
    gsap.delayedCall(1.0, () => { if (_activeQuad === null) _startIdleDrift(); });
  }
}

/* Enter a quadrant — 300 ms intent delay from idle, immediate if switching */
function _onEnter(quad) {
  clearTimeout(_idleTimer);
  _idleTimer = null;
  clearTimeout(_activateTimer);
  if (_activeQuad !== null) {
    _activateQuad(quad);                                     /* corner-to-corner: immediate */
  } else {
    _activateTimer = setTimeout(() => _activateQuad(quad), 300); /* from idle: intent delay */
  }
}

/* Leave a quadrant — start idle timer; lines stay put until it fires */
function _onLeave() {
  clearTimeout(_activateTimer);
  _activateTimer = null;
  clearTimeout(_idleTimer);
  _idleTimer = setTimeout(() => _activateQuad(null), 1500);
}

/* Idle drift: lines breathe slowly when no quadrant is active.
   Endpoints slide along their screen edges (edge-to-edge constraint preserved).
   Interrupted cleanly by any hover/tap via _stopIdleDrift + gsap.killTweensOf. */
function _startIdleDrift() {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  _isDrifting = true;
  const D = 0.05; /* ±2.5 % of viewport per endpoint — subtle rotation + translation */

  function nextDrift() {
    if (!_isDrifting) return;
    const W = window.innerWidth, H = window.innerHeight;
    const isMob = window.matchMedia('(max-width: 768px)').matches;
    const rest = isMob ? _REST_MOBILE : _REST;
    const tgt = {
      a: {                                              /* line A: x-intercepts slide along top/bottom edges */
        x1: (rest.a.x1 + (Math.random() * 2 - 1) * D) * W,
        y1: 0,
        x2: (rest.a.x2 + (Math.random() * 2 - 1) * D) * W,
        y2: H,
      },
      b: {                                              /* line B: y-intercepts slide along left/right edges */
        x1: 0,
        y1: (rest.b.y1 + (Math.random() * 2 - 1) * D) * H,
        x2: W,
        y2: (rest.b.y2 + (Math.random() * 2 - 1) * D) * H,
      },
    };
    const dur = 7 + Math.random() * 6; /* 7–13 s per keyframe */
    gsap.to(_st.a, { ...tgt.a, duration: dur, ease: 'sine.inOut', onUpdate: _render });
    gsap.to(_st.b, { ...tgt.b, duration: dur, ease: 'sine.inOut', onUpdate: _render,
                     onComplete: nextDrift });
  }

  nextDrift();
}

function _stopIdleDrift() {
  _isDrifting = false;
  if (typeof gsap !== 'undefined') {
    gsap.killTweensOf(_st.a);
    gsap.killTweensOf(_st.b);
  }
}

/* Poll until GSAP is available (it's loaded with defer) */
function _withGSAP(cb) {
  if (typeof gsap !== 'undefined') { cb(); return; }
  let n = 0;
  (function poll() {
    if (typeof gsap !== 'undefined') { cb(); return; }
    if (++n < 80) requestAnimationFrame(poll);
  })();
}

/* Wire up hover: quad overlays (full region) + corner labels (z-index fallback) */
function _initHover() {
  _setResting();
  _render();

  /* Quad overlays: primary hover targets + click navigation */
  ['TL', 'TR', 'BL', 'BR'].forEach(Q => {
    const el = document.getElementById('quad' + Q);
    if (!el) return;
    const quad = Q.toLowerCase();
    el.addEventListener('mouseenter', () => _onEnter(quad));
    el.addEventListener('mouseleave', _onLeave);
    el.addEventListener('click', () => {
      if (typeof Router !== 'undefined') Router.navigate(_QUAD_PATHS[quad]);
    });
  });

  /* Corner labels: above quad overlays in z-index, so they intercept events
     in their area — mirror the same enter/leave behaviour */
  document.querySelectorAll('.corner-label[data-quad]').forEach(label => {
    const quad = label.dataset.quad;
    label.addEventListener('mouseenter', () => _onEnter(quad));
    label.addEventListener('mouseleave', _onLeave);
  });

  window.addEventListener('resize', () => {
    _setResting();
    _render();
    if (_activeQuad === null) { _stopIdleDrift(); _startIdleDrift(); }
  });

  _withGSAP(() => gsap.delayedCall(2.0, _startIdleDrift));
}

/* Detect upward swipe on the homepage content to open the mobile nav sheet.
   Uses touchmove so slow deliberate drags register before finger-lift —
   touchend-only detection fails on iOS when the browser enters scroll-
   consideration mode and issues touchcancel instead of touchend. */
function _initHomeSwipe(el) {
  let startY = 0;
  let startX = 0;
  let triggered = false;

  el.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
    triggered = false;
  }, { passive: true });

  el.addEventListener('touchmove', e => {
    if (triggered) return;
    if (document.body.dataset.section !== 'home') return;
    const sheet = document.getElementById('nav-home-sheet');
    if (sheet && sheet.classList.contains('is-open')) return;
    const deltaY = startY - e.touches[0].clientY;   /* positive = upward */
    const deltaX = Math.abs(e.touches[0].clientX - startX);
    if (deltaY > 60 && deltaX < 60) {
      triggered = true;
      if (typeof Nav !== 'undefined') Nav.openHomeSheet();
    }
  }, { passive: true });
}

/* Page-load entrance: all four corner labels nudge outward simultaneously,
   then snap back with an elastic release — like a single breath. */
function _initEntrance() {
  if (_pageLoadAnimDone) return;
  _withGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      _pageLoadAnimDone = true; return;
    }
    [
      { sel: '.corner-tl', dx: -4, dy: -4 },
      { sel: '.corner-tr', dx:  4, dy: -4 },
      { sel: '.corner-bl', dx: -4, dy:  4 },
      { sel: '.corner-br', dx:  4, dy:  4 },
    ].forEach(({ sel, dx, dy }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.timeline({ delay: 1.2 })
        .to(el, { x: dx, y: dy, duration: 0.08, ease: 'power1.in' })
        .to(el, { x: 0,  y: 0,  duration: 0.65, ease: 'elastic.out(1.2, 0.4)' })
        .set(el, { clearProps: 'transform' });
    });
    _pageLoadAnimDone = true;
  });
}

/* Gradient stops: higher edge opacity, tighter fade zone around center */
const _STOPS = `
  <stop offset="0%"   stop-color="#E4E3D5" stop-opacity="0.75"/>
  <stop offset="38%"  stop-color="#E4E3D5" stop-opacity="0"/>
  <stop offset="62%"  stop-color="#E4E3D5" stop-opacity="0"/>
  <stop offset="100%" stop-color="#E4E3D5" stop-opacity="0.75"/>`;


const HomePage = {
  mount(el) {
    const lang     = getCurrentLang();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const W = window.innerWidth, H = window.innerHeight;
    const restSrc = isMobile ? _REST_MOBILE : _REST;
    const ra = { x1: restSrc.a.x1*W, y1: restSrc.a.y1*H, x2: restSrc.a.x2*W, y2: restSrc.a.y2*H };
    const rb = { x1: restSrc.b.x1*W, y1: restSrc.b.y1*H, x2: restSrc.b.x2*W, y2: restSrc.b.y2*H };

    /* Portrait crops for mobile, landscape for desktop */
    const imgs = isMobile
      ? ['home_bg1m.jpeg', 'home_bg2m.jpeg', 'home_bg3m.jpeg', 'home_bg4m.jpeg']
      : ['home_bg1.jpeg',   'home_bg2.jpeg',  'home_bg3.jpeg',  'home_bg4.jpeg'];

    el.className = 'page-home';
    el.innerHTML = `
      <!-- SVG diagonal lines -->
      <svg xmlns="http://www.w3.org/2000/svg"
           class="diag-svg" aria-hidden="true">
        <defs>
          <linearGradient id="diagGradA" gradientUnits="userSpaceOnUse"
            x1="${ra.x1}" y1="${ra.y1}" x2="${ra.x2}" y2="${ra.y2}">${_STOPS}
          </linearGradient>
          <linearGradient id="diagGradB" gradientUnits="userSpaceOnUse"
            x1="${rb.x1}" y1="${rb.y1}" x2="${rb.x2}" y2="${rb.y2}">${_STOPS}
          </linearGradient>
        </defs>
        <line id="diagLineA"
          x1="${ra.x1}" y1="${ra.y1}" x2="${ra.x2}" y2="${ra.y2}"
          stroke="url(#diagGradA)" stroke-width="9"/>
        <line id="diagLineB"
          x1="${rb.x1}" y1="${rb.y1}" x2="${rb.x2}" y2="${rb.y2}"
          stroke="url(#diagGradB)" stroke-width="9"/>
      </svg>

      <!-- Quadrant photo overlays — clip-path defines tap zone on mobile -->
      <div class="quad-overlay" id="quadTL">
        <img src="${imgs[0]}" alt="" class="quad-overlay__img" fetchpriority="high"/>
      </div>
      <div class="quad-overlay" id="quadTR">
        <img src="${imgs[1]}" alt="" class="quad-overlay__img" fetchpriority="high"/>
      </div>
      <div class="quad-overlay" id="quadBL">
        <img src="${imgs[2]}" alt="" class="quad-overlay__img" fetchpriority="high"/>
      </div>
      <div class="quad-overlay" id="quadBR">
        <img src="${imgs[3]}" alt="" class="quad-overlay__img" fetchpriority="high"/>
      </div>

      <!-- Dead zone: blocks quadrant interaction in the title region -->
      <div class="diag-deadzone" aria-hidden="true"></div>

      <!-- Name block: absolutely centered, never moves -->
      <div class="home-center"
           aria-label="Christian Liu — ${t('home.subtitle', lang)} — ${t('home.roles', lang)}">
        <p class="home-roles">${t('home.roles', lang)}</p>
        <h1 class="home-name">CHRISTIAN LIU</h1>
        <p class="home-sub">${t('home.subtitle', lang)}</p>
      </div>
    `;

    /* Mark each image ready only once fully loaded so a partially-downloaded
       image never paints through the opacity transition */
    el.querySelectorAll('.quad-overlay__img').forEach(img => {
      const markReady = () => img.classList.add('is-ready');
      if (img.complete && img.naturalWidth) {
        markReady();
      } else {
        img.addEventListener('load', markReady, { once: true });
        img.addEventListener('error', markReady, { once: true }); /* show on broken img */
      }
    });

    if (isMobile) {
      _initMobileQuads();
      _initHomeSwipe(el);
      window.addEventListener('resize', () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
          _setResting();
          _render();
        }
      });
    } else {
      _initHover();
    }
    _initEntrance();
  },
};
