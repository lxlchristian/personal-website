/* ══════════════════════════════════════════════════════════
   CHRISTIAN LIU — audio-player.js
   ──────────────────────────────────────────────────────────
   Global audio controller + persistent player bar.
   Both the Games page and Musicals page use this controller.
   Do not use separate audio instances per page.
══════════════════════════════════════════════════════════ */

/* ── Time formatter ─────────────────────────────────────── */
function _fmtTime(s) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

/* ── Shared track row builder ───────────────────────────── */
/* config: { title, meta, duration, available }
   Returns a DOM <article> element ready to append.          */
function buildTrackRow(config) {
  const available = config.available !== false;
  const el = document.createElement('article');
  el.className = 'track-row' + (available ? '' : ' track-row--unavailable');
  el.setAttribute('role', 'listitem');
  el.innerHTML = `
    <button class="track-row__play"
            ${available ? '' : 'disabled aria-disabled="true"'}
            aria-label="${available ? 'Play' : 'Unavailable'}: ${config.title}">
      <span class="track-row__play-icon">
        <svg class="ap-row-icon-play" width="14" height="14" viewBox="0 0 24 24"
             fill="white" aria-hidden="true"><polygon points="6,3 20,12 6,21"/></svg>
        <svg class="ap-row-icon-pause" width="14" height="14" viewBox="0 0 24 24"
             fill="white" aria-hidden="true" style="display:none">
          <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
        </svg>
      </span>
    </button>
    <div class="track-row__info">
      <p class="track-row__title">${config.title}</p>
      ${config.meta ? `<p class="track-row__meta">${config.meta}</p>` : ''}
    </div>
    <div class="track-row__right">
      <span class="track-row__duration">${config.duration || '—'}</span>
      <span class="track-row__coming">Coming soon</span>
    </div>`;
  return el;
}

/* ── Global AudioPlayer singleton ───────────────────────── */
const AudioPlayer = (() => {
  let _audio        = null;
  let _currentTrack = null;
  let _playing      = false;
  let _visible      = false;
  let _rafId        = null;
  let _scrubbing    = false;
  let _el           = null;
  let _lastTrigger  = null;

  const _trackChangeCBs  = [];
  const _playStateCBs    = [];

  /* DOM refs — populated by _ensureDOM */
  let _closeBtn, _playBtn, _playIconEl, _pauseIconEl;
  let _titleEl, _sourceEl;
  let _scrubberEl, _fillEl, _dotEl;
  let _timeCurEl, _timeTotEl;

  /* ── Audio element ─────────────────────────────────────── */
  function _getAudio() {
    if (_audio) return _audio;
    _audio = new Audio();
    _audio.preload = 'metadata';

    _audio.addEventListener('play', () => {
      _playing = true;
      _updatePlayUI();
      _startRaf();
      _notifyPlayState();
    });

    _audio.addEventListener('pause', () => {
      _playing = false;
      _updatePlayUI();
      _notifyPlayState();
    });

    _audio.addEventListener('ended', () => {
      _playing = false;
      _updatePlayUI();
      _resetProgress();
      _notifyPlayState();
    });

    _audio.addEventListener('loadedmetadata', () => {
      if (_scrubberEl)
        _scrubberEl.setAttribute('aria-valuemax', Math.round(_audio.duration));
      _updateTimestamp();
    });

    return _audio;
  }

  /* ── Build player DOM (once) ───────────────────────────── */
  function _ensureDOM() {
    if (_el) return;

    _el = document.createElement('div');
    _el.className = 'audio-player';
    _el.setAttribute('role', 'region');
    _el.setAttribute('aria-label', 'Audio player');
    _el.innerHTML = `
      <button class="audio-player__close" aria-label="Close audio player">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6"  y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="audio-player__play-btn" aria-label="Play">
        <span class="audio-player__play-icon">
          <svg class="ap-icon-play" width="16" height="16" viewBox="0 0 24 24"
               fill="white" aria-hidden="true"><polygon points="6,3 20,12 6,21"/></svg>
          <svg class="ap-icon-pause" width="16" height="16" viewBox="0 0 24 24"
               fill="white" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
        </span>
      </button>
      <div class="audio-player__right">
        <div class="audio-player__info">
          <span class="audio-player__title-inner"></span><span class="audio-player__source"></span>
        </div>
        <div class="audio-player__progress-row">
          <div class="audio-player__scrubber" role="slider"
               aria-label="Seek" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" tabindex="0">
            <div class="audio-player__track-line">
              <div class="audio-player__fill"></div>
              <div class="audio-player__dot"></div>
            </div>
          </div>
          <div class="audio-player__timestamp">
            <span class="ap-time-current">0:00</span><span
                 class="ap-time-sep"> / </span><span
                 class="ap-time-total">0:00</span>
          </div>
        </div>
      </div>`;

    document.body.appendChild(_el);

    _closeBtn    = _el.querySelector('.audio-player__close');
    _playBtn     = _el.querySelector('.audio-player__play-btn');
    _playIconEl  = _el.querySelector('.ap-icon-play');
    _pauseIconEl = _el.querySelector('.ap-icon-pause');
    _titleEl     = _el.querySelector('.audio-player__title-inner');
    _sourceEl    = _el.querySelector('.audio-player__source');
    _scrubberEl  = _el.querySelector('.audio-player__scrubber');
    _fillEl      = _el.querySelector('.audio-player__fill');
    _dotEl       = _el.querySelector('.audio-player__dot');
    _timeCurEl   = _el.querySelector('.ap-time-current');
    _timeTotEl   = _el.querySelector('.ap-time-total');

    _closeBtn.addEventListener('click', stop);
    _playBtn.addEventListener('click', () => {
      if (_audio && !_audio.paused) pause();
      else                          resume();
    });

    _initScrubberEvents();
    _scrubberEl.addEventListener('keydown', _onScrubKey);
  }

  /* ── Scrubber mouse / touch ────────────────────────────── */
  function _initScrubberEvents() {
    function _frac(clientX) {
      const r = _scrubberEl.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    }
    function _seekAt(clientX) {
      if (!_audio || !_audio.duration) return;
      const f = _frac(clientX);
      _audio.currentTime = f * _audio.duration;
      _setProgress(f);
    }

    _scrubberEl.addEventListener('mousedown', e => {
      if (!_currentTrack) return;
      _scrubbing = true;
      _seekAt(e.clientX);
      e.preventDefault();
    });
    window.addEventListener('mousemove', e => { if (_scrubbing) _seekAt(e.clientX); });
    window.addEventListener('mouseup',   () => { _scrubbing = false; });

    _scrubberEl.addEventListener('touchstart', e => {
      if (!_currentTrack) return;
      _scrubbing = true;
      _seekAt(e.touches[0].clientX);
      e.preventDefault();
    }, { passive: false });
    window.addEventListener('touchmove', e => {
      if (_scrubbing) _seekAt(e.touches[0].clientX);
    });
    window.addEventListener('touchend', () => { _scrubbing = false; });
  }

  function _onScrubKey(e) {
    if (!_audio || !_audio.duration) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); seek(_audio.currentTime + 5); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); seek(_audio.currentTime - 5); }
  }

  /* ── RAF progress loop ─────────────────────────────────── */
  function _startRaf() {
    cancelAnimationFrame(_rafId);
    function tick() {
      if (!_playing) { _rafId = null; return; }
      if (!_scrubbing) _updateProgress();
      _rafId = requestAnimationFrame(tick);
    }
    _rafId = requestAnimationFrame(tick);
  }

  function _updateProgress() {
    if (!_audio || !_audio.duration) return;
    const f = _audio.currentTime / _audio.duration;
    _setProgress(f);
    _updateTimestamp();
    if (_scrubberEl)
      _scrubberEl.setAttribute('aria-valuenow', Math.round(_audio.currentTime));
  }

  function _setProgress(frac) {
    const pct = (Math.max(0, Math.min(1, frac)) * 100).toFixed(2) + '%';
    if (_fillEl) _fillEl.style.width = pct;
    if (_dotEl)  _dotEl.style.left   = pct;
  }

  function _resetProgress() {
    if (_fillEl) {
      const t = _fillEl.style.transition;
      _fillEl.style.transition = 'none';
      _fillEl.style.width = '0%';
      if (_dotEl) _dotEl.style.left = '0%';
      requestAnimationFrame(() => { if (_fillEl) _fillEl.style.transition = t; });
    }
  }

  function _updateTimestamp() {
    if (!_audio) return;
    if (_timeCurEl) _timeCurEl.textContent = _fmtTime(_audio.currentTime || 0);
    if (_timeTotEl) _timeTotEl.textContent = _fmtTime(_audio.duration    || 0);
  }

  /* ── Play state UI ─────────────────────────────────────── */
  function _updatePlayUI() {
    if (_playIconEl)  _playIconEl.style.opacity  = _playing ? '0' : '1';
    if (_pauseIconEl) _pauseIconEl.style.opacity = _playing ? '1' : '0';

    const label = _currentTrack?.title || 'track';
    if (_playBtn)
      _playBtn.setAttribute('aria-label', _playing ? `Pause ${label}` : `Play ${label}`);

  }

  /* ── Title + marquee ───────────────────────────────────── */
  function _updateTitle(title) {
    if (_titleEl) _titleEl.textContent = title;
  }

  /* ── Show / hide player bar ────────────────────────────── */
  function _showPlayer(track) {
    _ensureDOM();
    _currentTrack = track;
    _updateTitle(track.title);
    if (_sourceEl) _sourceEl.textContent = track.source || '';
    _setProgress(0);
    _updateTimestamp();

    if (!_visible) {
      _visible = true;
      /* rAF so the initial translateY(100%) is painted before we add .is-open */
      requestAnimationFrame(() => {
        _el.classList.add('is-open');
        document.body.classList.add('player-visible');
      });
    }

    _notifyTrackChange();
  }

  /* ── Notification ──────────────────────────────────────── */
  function _notifyTrackChange() { _trackChangeCBs.forEach(cb => cb(_currentTrack)); }
  function _notifyPlayState()   { _playStateCBs.forEach(cb => cb(_playing)); }

  /* ══════════════════════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════════════════════ */

  /* play(trackConfig)
     trackConfig: { src, title, source, available }             */
  function play(trackConfig) {
    if (!trackConfig.available || !trackConfig.src) return;
    const a = _getAudio();

    /* Same track → toggle play / pause */
    if (_currentTrack && _currentTrack.src === trackConfig.src) {
      if (a.paused) a.play().catch(() => {});
      else          a.pause();
      return;
    }

    /* New track */
    a.pause();
    a.src         = trackConfig.src;
    a.currentTime = 0;
    _showPlayer(trackConfig);
    a.play().catch(() => {});
  }

  function pause()  { _getAudio().pause(); }
  function resume() { if (_currentTrack) _getAudio().play().catch(() => {}); }

  function stop() {
    const a = _getAudio();
    a.pause();
    a.currentTime = 0;
    a.src         = '';
    _playing      = false;
    cancelAnimationFrame(_rafId);
    _rafId = null;

    if (_el) {
      _el.classList.remove('is-open');
      _el.addEventListener('transitionend', () => {
        document.body.classList.remove('player-visible');
        _visible = false;
      }, { once: true });
    }

    _currentTrack = null;
    _notifyTrackChange();
    _notifyPlayState();

    if (_lastTrigger && _lastTrigger.isConnected) {
      _lastTrigger.focus();
      _lastTrigger = null;
    }
  }

  function seek(seconds) {
    const a = _getAudio();
    if (a.duration) a.currentTime = Math.max(0, Math.min(a.duration, seconds));
  }

  function getCurrentTrack()    { return _currentTrack; }
  function isPlaying()          { return _playing; }
  function setLastTrigger(btn)  { _lastTrigger = btn; }

  /* Subscribe to state changes. Callbacks receive (currentTrack) or (isPlaying). */
  function onTrackChange(cb)    { _trackChangeCBs.push(cb); }
  function onPlayStateChange(cb){ _playStateCBs.push(cb); }

  return {
    play, pause, resume, stop, seek,
    getCurrentTrack, isPlaying, setLastTrigger,
    onTrackChange, onPlayStateChange,
  };
})();
