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
  tl: { a: { x1: 0.44, x2: 0.76 }, b: { y1: 0.72, y2: 0.70 } }, /* Games     */
  tr: { a: { x1: 0.29, x2: 0.45 }, b: { y1: 0.76, y2: 0.52 } }, /* Biography */
  bl: { a: { x1: 0.62, x2: 0.72 }, b: { y1: 0.48, y2: 0.23 } }, /* Musicals  */
  br: { a: { x1: 0.23, x2: 0.48 }, b: { y1: 0.34, y2: 0.45 } }, /* Contact   */
};

/* ── Corner label translate direction on hover ───────── */
const _CORNER_NUDGE = {
  tl: { x: -10, y: -10 },
  tr: { x:  10, y: -10 },
  bl: { x: -10, y:  10 },
  br: { x:  10, y:  10 },
};

const _QUAD_PATHS = {
  tl: '/games',
  tr: '/biography',
  bl: '/musicals',
  br: '/contact',
};

const _SPRING     = 'cubic-bezier(0.16, 1, 0.3, 1)'; /* corner label nudge */
const _EASE_HOVER = 'power2.out';                    /* diagonal hover ease */
const _EASE_OUT   = 'power2.out';                     /* idle-reset ease */

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

/* ── Mobile: diagonal-shaped touch zones via clip-path ──────
   Sets quadrant clip-paths on the existing .quad-overlay divs
   and enables pointer-events so the full quadrant area is
   tappable, matching the visual diagonal boundaries.          */
function _initMobileQuads() {
  _setResting();
  _render(); /* sets clip-paths while SVG line elements still exist */

  ['TL', 'TR', 'BL', 'BR'].forEach(Q => {
    const overlayEl = document.getElementById('quad' + Q);
    if (!overlayEl) return;
    overlayEl.style.pointerEvents = 'all';
    overlayEl.style.cursor        = 'pointer';
    overlayEl.style.zIndex        = '9'; /* below nav-home stacking context (z-index 10) */
    overlayEl.addEventListener('click', () => {
      if (typeof Router !== 'undefined') Router.navigate(_QUAD_PATHS[Q.toLowerCase()]);
    });
  });
}

/* Reset _st to resting state for current viewport */
function _setResting() {
  const W = window.innerWidth, H = window.innerHeight;
  _st.a = { x1: _REST.a.x1*W, y1: _REST.a.y1*H, x2: _REST.a.x2*W, y2: _REST.a.y2*H };
  _st.b = { x1: _REST.b.x1*W, y1: _REST.b.y1*H, x2: _REST.b.x2*W, y2: _REST.b.y2*H };
}

/* Compute hover target px (quad=null → resting) */
function _target(quad) {
  const W = window.innerWidth, H = window.innerHeight;
  const ha = quad ? (_HOVER[quad].a || {}) : {};
  const hb = quad ? (_HOVER[quad].b || {}) : {};
  const fa = { ..._REST.a, ...ha };
  const fb = { ..._REST.b, ...hb };
  return {
    a: { x1: fa.x1*W, y1: fa.y1*H, x2: fa.x2*W, y2: fa.y2*H },
    b: { x1: fb.x1*W, y1: fb.y1*H, x2: fb.x2*W, y2: fb.y2*H },
  };
}

/* Animate lines to target.
   dur/ease default to power3.out hover; idle reset passes slower ease-in. */
function _animateLines(tgt, dur = 0.5, ease = _EASE_HOVER) {
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
    /* Activate new quadrant: spring-animate lines + show overlay + nudge label */
    _animateLines(_target(quad));
    document.getElementById('quad' + quad.toUpperCase())?.classList.add('is-active');
    const label = document.querySelector('.corner-' + quad);
    const nudge = _CORNER_NUDGE[quad];
    if (label && nudge && typeof gsap !== 'undefined') {
      gsap.to(label, { x: nudge.x, y: nudge.y, duration: 0.5, ease: _SPRING });
    }
  } else {
    /* Idle reset: slower ease-in return to rest */
    _animateLines(_target(null), 0.8, _EASE_OUT);
    document.querySelectorAll('.quad-overlay').forEach(el => el.classList.remove('is-active'));
    document.querySelectorAll('.corner-label').forEach(el => {
      if (typeof gsap !== 'undefined') {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: _EASE_OUT });
      }
    });
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

  window.addEventListener('resize', () => { _setResting(); _render(); });
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

/* ── Mobile: weight-fade bowtie polygons ─────────────────
   Renders each line as two triangles meeting at a point at
   the intersection — thick at viewport edges, tapering to
   zero weight at the center. No opacity gradient needed.   */
function _renderMobilePolygons(svg) {
  const W = window.innerWidth, H = window.innerHeight;
  _setResting();

  const a = _st.a, b = _st.b;
  const { x: ix, y: iy } = _intersect();

  /* Half-width at endpoints (px); tapers to 0 at intersection */
  const hw = 5;

  function bowtiePath(x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const px = -dy / len, py = dx / len; /* unit perpendicular */
    /* Bowtie: two triangles joined at (ix, iy) */
    return [
      `M ${x1 + hw * px},${y1 + hw * py}`,
      `L ${ix},${iy}`,
      `L ${x2 + hw * px},${y2 + hw * py}`,
      `L ${x2 - hw * px},${y2 - hw * py}`,
      `L ${ix},${iy}`,
      `L ${x1 - hw * px},${y1 - hw * py}`,
      'Z',
    ].join(' ');
  }

  svg.innerHTML = `
    <path d="${bowtiePath(a.x1, a.y1, a.x2, a.y2)}"
          fill="rgba(200,169,122,0.55)" />
    <path d="${bowtiePath(b.x1, b.y1, b.x2, b.y2)}"
          fill="rgba(200,169,122,0.55)" />
  `;
}

const HomePage = {
  mount(el) {
    const lang = getCurrentLang();

    const W = window.innerWidth, H = window.innerHeight;
    const ra = { x1: _REST.a.x1*W, y1: _REST.a.y1*H, x2: _REST.a.x2*W, y2: _REST.a.y2*H };
    const rb = { x1: _REST.b.x1*W, y1: _REST.b.y1*H, x2: _REST.b.x2*W, y2: _REST.b.y2*H };

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

      <!-- Quadrant photo overlays — full clipped region is hover target -->
      <div class="quad-overlay" id="quadTL">
        <img src="home_bg1.jpg"  alt="" class="quad-overlay__img"/>
      </div>
      <div class="quad-overlay" id="quadTR">
        <img src="home_bg2.jpeg" alt="" class="quad-overlay__img"/>
      </div>
      <div class="quad-overlay" id="quadBL">
        <img src="home_bg3.jpeg" alt="" class="quad-overlay__img"/>
      </div>
      <div class="quad-overlay" id="quadBR">
        <img src="home_bg4.jpeg" alt="" class="quad-overlay__img"/>
      </div>

      <!-- Dead zone: blocks quadrant hover in the title region -->
      <div class="diag-deadzone" aria-hidden="true"></div>

      <!-- Name block: absolutely centered, never moves -->
      <div class="home-center"
           aria-label="Christian Liu — ${t('home.subtitle', lang)}">
        <h1 class="home-name">CHRISTIAN LIU</h1>
        <p class="home-sub">${t('home.subtitle', lang)}</p>
      </div>
    `;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      /* Must call _initMobileQuads() first (sets clip-paths while SVG line
         elements still exist), then _renderMobilePolygons replaces svg.innerHTML */
      _initMobileQuads();
      const diagSvg = el.querySelector('.diag-svg');
      if (diagSvg) {
        _renderMobilePolygons(diagSvg);
        window.addEventListener('resize', () => {
          if (window.matchMedia('(max-width: 768px)').matches) {
            _renderMobilePolygons(diagSvg); /* calls _setResting() internally */
            _render();                      /* updates clip-paths on quad overlays */
          }
        });
      }
    } else {
      _initHover();
    }
    _initEntrance();
  },
};
