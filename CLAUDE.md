# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static portfolio site for Christian Liu, a video game composer. It's a client-side-routed SPA, not a set of separate HTML pages: every path serves `index.html`, and `router.js` swaps content in place. No build step, no package manager.

To preview locally:
```
npx serve .
# or
python3 -m http.server 8080
```

Deploy is zero-config static hosting — `vercel.json` / `netlify.toml` both catch-all rewrite every path to `index.html` so the client router can take over.

## Architecture

JS files are loaded in a strict, dependency-ordered sequence at the bottom of `index.html`. Each file depends on everything above it:

1. **`config.js`** — the only file that should be edited for content changes. Exports `SITE_CONFIG` with `EMAIL`, `FORM_ENDPOINT` (Formspree), `SOCIAL` links, `TRACKS` (homepage/Games-page track reel), and `CREDITS.games` (professional credit cards). Individual show/game subpages hold their own content inline (see `pages/`) rather than living in this config.
2. **`shared.js`** — renderers and helpers used by more than one page. Exports `_DIVIDER_SVG` (the subpage divider SVG string, used by every subpage), `renderSocialIcons(wrapperClass)` (the social icon row — pass `'cta-social'` under a "let's work together" CTA or `'contact-social'` on the Contact page; the two differ only in gap/margin in `style.css`, and the row renders from the `_SOCIAL_ICONS` table, skipping any `SITE_CONFIG.SOCIAL` key left empty), and `initPageLinks(el)` (binds every `[data-link]` anchor in `el` to `Router.navigate()` — every page with internal links calls it from its `mount()`). Has no load-time dependencies: `Router` is referenced only inside a click handler, so the circular dependency on `router.js` resolves at event time, the same way `nav.js` does it. New cross-page helpers belong here rather than in whichever `pages/*.js` file happened to need them first.
3. **`i18n.js`** — all user-facing strings in EN/ZH/JA. Exports `t(key, lang)`, `tTrack()`, `tCredit()`, `getCurrentLang()`, and `applyLanguage(lang)`. Track *titles* are proper nouns and intentionally not translated; only `game`/`genre` descriptors and credit `roleKey`s are looked up via `track.game.*`, `track.genre.*`, `credit.role.*`. `applyLanguage()` fires a `langchange` event and does not touch the DOM itself.
4. **`audio-player.js`** — global `AudioPlayer` singleton (`play/pause/resume/stop/seek/getCurrentTrack/isPlaying`) shared by every page that has a track list, plus `buildTrackRow(config)` which builds a `<article class="track-row">` element. Only one audio element/controller exists for the whole app, so playback persists correctly across route changes until `Router.navigate()` explicitly stops it.
5. **`nav.js`** — exports `Nav.render(navSection, navOpts)`. Renders the homepage corner-label nav or the subpage accordion sidebar (fixed order: Home → Biography → Musicals → Games → Contact) plus the EN·中文·日本語 language toggle. Calls `Router.navigate()` lazily inside click handlers so the circular dependency on `router.js` (loaded after) resolves at event time, not load time.
6. **`pages/*.js`** — one file per route, each exporting a `*Page` object with `mount(el)` that renders into `#content`. Top-level pages: `home.js`, `games.js`, `musicals.js`, `biography.js`, `contact.js`. Nested show/game detail pages: `games-island-of-hearts.js`, `games-realm-of-taiwu.js`, `musicals-salooney-tunes.js`, `musicals-city-of-peace.js`, `musicals-post-mortem.js`. Pages read language/content themselves at mount time (via `getCurrentLang()`/`t()`); the router does not pass language in as an argument.
7. **`router.js`** — must load last (references all `*Page` objects). Owns the `ROUTES` (path → section) and `Pages` (section → page object) maps, `navigate(path)`, and the `popstate`/`langchange` listeners that re-render on back/forward and language switch. Also owns the `/cn` and `/jp` URL language prefixes (English has no prefix) and sets `document.title` per section/language.
8. **`style.css`** / **`audio-player.css`** — one shared stylesheet keyed to CSS custom properties (`--color-*`, `--font-*`, `--text-*`, `--sp-*`, `--ease-*`) defined in `:root`, plus a dedicated stylesheet for the audio player bar/track rows.

### Key behaviors

- **Routing**: `Router.navigate(path)` pushes history state, stops the current audio track, and re-renders nav + content. Cold entry (direct URL / refresh) resolves the section from `window.location.pathname` on load.
- **Language URLs**: Chinese and Japanese are served under `/cn` and `/jp` path prefixes (e.g. `/cn/games`); English has no prefix. `Router` strips/re-adds the prefix internally — page/nav code always works with prefix-free paths.
- **Waveform player**: uses `requestAnimationFrame` synced to a real `<audio>` element. Waveform bars are procedurally generated per track (seeded by a `waveformProfile` value), not real audio analysis.
- **Video embeds**: the Games page reel and both game detail pages embed YouTube iframes (`youtube.com/embed/<id>`) rather than local video files.
- **GSAP**: loaded via CDN with `defer`; animations degrade gracefully if unavailable (`typeof gsap === 'undefined'` guards at call sites).

### Adding content

- **New track** (homepage/Games reel): add an object to `SITE_CONFIG.TRACKS` in `config.js` and drop the audio file in the project root. If `game`/`genre` values don't yet have translation keys, add them under `track.game.*`/`track.genre.*` in all three language blocks in `i18n.js`.
- **New professional credit card**: add to `SITE_CONFIG.CREDITS.games` (or `.musicals`) in `config.js`.
- **New social platform**: add the URL under `SITE_CONFIG.SOCIAL` in `config.js` and a matching `[key, aria-label, <path>]` row to `_SOCIAL_ICONS` in `shared.js`. Keys left as `''` are skipped, so both icon rows update everywhere at once.
- **New show/game detail page**: add a route to `ROUTES`/`Pages` in `router.js`, a nav path if needed, and a new `pages/<name>.js` file following the existing `mount(el)` pattern — content for these pages lives in the page file itself, not in `config.js`.
- **New language**: duplicate a language block in `i18n.js`, add the URL prefix convention in `router.js` (`_getLangFromPath`/`_stripLangPrefix`/`_addLangPrefix`), and add a button in `Nav`'s language toggle.
- **Contact email**: change `SITE_CONFIG.EMAIL` in `config.js`.
