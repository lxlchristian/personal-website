# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static single-page portfolio site for Christian Liu, a video game composer. No build step, no package manager — open `index.html` directly in a browser or serve with any static file server.

To preview locally:
```
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

Three JavaScript files, loaded in order at the bottom of `index.html`:

1. **`config.js`** — the only file that should be edited for content changes. Exports `SITE_CONFIG` with `TRACKS`, `VIDEOS`, and `EMAIL`. All HTML/JS are templates driven by this config.
2. **`i18n.js`** — all user-facing strings in EN/ZH/JA. Exports `TRANSLATIONS`, `t()`, `tTrack()`, `applyLanguage()`, and `getCurrentLang()`. Track *titles* are proper nouns and intentionally not translated; only `game` and `genre` descriptors are looked up via `track.game.*` and `track.genre.*` keys.
3. **`main.js`** — pure DOM/behavior, no content. Reads from `SITE_CONFIG` and calls `i18n.js` helpers. Exposes `window.__renderTracks` and `window.__updatePlayerMeta` for `i18n.js` to call on language switch.

### Key behaviors

- **Video section**: hidden automatically when `SITE_CONFIG.VIDEOS` is empty.
- **Track list**: built dynamically from `SITE_CONFIG.TRACKS`; if a track has a `gameUrl`, the game name renders as a linked `<a>` with `↗`.
- **Waveform player**: uses `requestAnimationFrame` loop synced to a real `<audio>` element. Waveform bars are procedurally generated (seeded RNG, not real audio data). The player bar slides up when a track is selected.
- **Language switching**: `applyLanguage()` in `i18n.js` re-renders `[data-i18n]` elements and calls `window.__renderTracks` to re-render the track list. Auto-detects `navigator.language` on load.
- **GSAP**: loaded via CDN with `defer`; animations degrade gracefully if unavailable (`typeof gsap === 'undefined'` guard in `main.js`).

### Adding content

- **New track**: add an object to `SITE_CONFIG.TRACKS` in `config.js` and drop the audio file in the project root. If `game` or `genre` values don't yet have translation keys in `i18n.js`, add them under `track.game.*` / `track.genre.*` in all three language blocks.
- **New language**: duplicate a language block in `TRANSLATIONS` in `i18n.js`, add a button in the nav (`data-lang-btn`), and handle it in `applyLanguage()`.
- **Contact email**: change `SITE_CONFIG.EMAIL` in `config.js` — it is also hardcoded in the `<a href="mailto:...">` in `index.html`, so update both.
