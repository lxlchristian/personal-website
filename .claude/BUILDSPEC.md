# Christian Liu Portfolio — Build Specification
> Context transfer document. Written after Step 1 completion.
> A new conversation can resume from any build step using this file.

---

## Project Identity

**Client:** Christian Liu — video game composer, songwriter, arranger  
**Audience:** Game audio directors and music supervisors at indie and mid-size studios  
**Identity:** Melody-forward, emotionally direct, orchestral-electronic blend — "music that hits before you've processed the lyrics"  
**Site:** Single-page application, static hosting, `christian-liu.me`

---

## Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | None — vanilla JS | No virtual DOM needed; non-engineer owner; no dependency rot |
| Routing | `history.pushState()` SPA | Direct URLs work; one HTML file |
| Animation | GSAP (CDN, already loaded) | Crossing-point spring animation, accordion |
| Fonts | Google Fonts (Bodoni Moda, Noto Sans) + Fontshare (Satoshi) | Via `<link>` tags |
| Audio | `HTMLAudioElement` + Canvas RAF | Already proven in prior codebase |
| Deploy | Vercel or Netlify (both catch-all configs in repo) | Zero config static hosting |
| Build step | None | `npx serve .` or `python3 -m http.server 8080` for local |

**Script load order** (in `index.html` — must not change):
```
config.js → i18n.js → nav.js → pages/home.js → pages/games.js →
pages/musicals.js → pages/biography.js → pages/contact.js → router.js
```
`router.js` must be last — it references all Page objects and starts the app.  
Nav references `Router.navigate()` lazily (inside click handlers), so the
circular dependency resolves correctly at event time.

---

## Design Tokens (already in `style.css`)

```css
--color-ground:     #F7F6F2;                   /* page bg, warm off-white */
--color-ink:        #1C1812;                   /* primary text, name */
--color-gold:       #C8A97A;                   /* diagonal lines, waveform bars */
--color-muted:      #8A7F72;                   /* subtitle, captions, lang toggle */
--color-mid:        #5E5E5E;                   /* nav items, inactive */
--color-play:       #E8522A;                   /* play button, scrubber — ONLY accent */
--color-line:       rgba(200, 169, 122, 0.50); /* diagonal lines (gold@50%) */
--color-line-faint: rgba(200, 169, 122, 0.20); /* mobile decoration */

--font-display: 'Bodoni Moda', Georgia, serif;
--font-body:    'Satoshi', system-ui, sans-serif;

--text-xs:   0.6875rem;  /* 11px — lang toggle */
--text-sm:   0.8125rem;  /* 13px — track meta */
--text-base: 1rem;
--text-hero: clamp(4rem, 11vw, 9rem); /* CHRISTIAN LIU */

--ease-spring:   cubic-bezier(0.16, 1, 0.3, 1);
--dur-cross:     500ms;
--dur-fade:      300ms;
--dur-accordion: 420ms;
--nav-width:     200px;
```

**Palette rationale:** Amber-gold diagonals (not cool sage) communicate orchestral warmth  
immediately — like brass, score paper. Red-orange is exclusive to play/interaction.  
The ground is withheld-luxury cream; the gold lines make it immediate rather than cold.

---

## Typography

- **Display face:** Bodoni Moda — **uniform weight only** (mixed Bold/Regular is passe)
- **Body/UI face:** Satoshi
- **CJK fallback:** Noto Sans JP / Noto Sans SC (loaded in `<head>`)
- **Name treatment:** "CHRISTIAN LIU" — all caps, `var(--font-display)`, `var(--text-hero)`
- **Subtitle:** `composer · songwriter · arranger` — Satoshi italic, `var(--color-muted)`  
  (Three roles only — "audio professional" was cut as too generic)
- **Lang toggle:** Satoshi, `var(--text-xs)`, `var(--color-muted)`, `EN · 中文 · 日本語`

---

## Homepage Layout

Full-viewport, no scroll. `body[data-section="home"] { overflow: hidden }`.

```
┌─────────────────────────────────────────────────────────┐
│ Games                                        Biography  │  ← corner labels, Bodoni, #5E5E5E
│                                                         │
│          ╲  gold diagonal lines  ╱                      │
│             ╲                 ╱                         │
│                ╲             ╱                          │
│                   CHRISTIAN LIU   ← locked center      │
│              composer · songwriter · arranger           │
│                ╱             ╲                          │
│             ╱                   ╲                       │
│                                                         │
│ Musicals          EN · 中文 · 日本語          Contact   │  ← lang toggle fixed bottom-center
└─────────────────────────────────────────────────────────┘
```

**"CHRISTIAN LIU" center block:** `position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%)`.  
Never moves. Never scales. Diagonal lines move around it.

**Corner labels:** `position: absolute` at each corner. Bodoni Moda, `var(--color-mid)`.  
On hover: translate 8–12px toward their corner (away from center), matching spring easing.  
TL → translate(-x, -y), TR → translate(+x, -y), BL → translate(-x, +y), BR → translate(+x, +y).

**Language toggle (homepage):** `position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%)`.  
Does NOT participate in the quadrant hover choreography. Stays fixed.

---

## Diagonal Line System — Full Geometric Specification

### Resting state
```
crossX: 42vw
crossY: 52vh
line1Angle: 130deg  (top-center → bottom-left)
line2Angle:  50deg  (top-right  → bottom-center)
```
Line angles are **FIXED**. They never animate. Only the crossing point moves.

### Implementation
```
DOM:
  .diag (position: fixed; inset: 0; pointer-events: none; z-index: 0)
    .diag__cross (position: absolute; width: 0; height: 0;
                  transform: translate(42vw, 52vh))
      .diag__line.diag__line--1 (position: absolute; transform-origin: center center;
                                  width: 141vw; height: 1px;
                                  background: var(--color-line);
                                  top: 0; left: -70.5vw;
                                  transform: rotate(130deg))
      .diag__line.diag__line--2 (same but rotate(50deg))

Animation target: transform: translate(crossX, crossY) on .diag__cross
Use GSAP: gsap.to('.diag__cross', { x: crossX, y: crossY,
           duration: 0.5, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' })
```
**CRITICAL:** Animate `x`/`y` via `transform: translate()`, NOT `left`/`top`.  
`left`/`top` triggers layout reflow every frame → jank on mid-range devices.  
GSAP handles translate natively and keeps animation on the compositor thread.

### Hover targets (crossing point destination)
```
top-left     (Games)     → x: 58vw, y: 62vh
top-right    (Biography) → x: 32vw, y: 62vh
bottom-left  (Musicals)  → x: 58vw, y: 38vh
bottom-right (Contact)   → x: 32vw, y: 38vh
hover-out                → x: 42vw, y: 52vh  (resting state)
```
Duration: 500ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

### Corner-to-corner direct transition
Track current animated x/y values (not cached destination). When hover moves  
from one corner directly to another without leaving the viewport, animate from  
**current position** to new destination — do NOT snap back to resting state first.  
Use `gsap.getProperty('.diag__cross', 'x')` to read live position.

### Preview image
- Fades in at `opacity: 0.15–0.20` within the expanded quadrant region
- Contained by `clip-path: polygon(...)` matching the expanded quadrant triangle
- **clip-path does NOT animate** — it snaps to final geometry  
  (polygon interpolation is unreliable cross-browser, especially Firefox)
- Opacity transition: 300ms, with 150ms delay after crossing point starts moving  
  (structure moves first, image follows)
- Images: one per quadrant, referenced in `config.js` (currently empty — add when images ready)

### Page-load micro-animation (one-time only)
Corner labels nudge 15–20px toward center, staggered:
```
Delays: 1.0s, 1.2s, 1.4s, 1.6s
Duration: 300ms ease-out, then returns to rest
```
**Must skip entirely** when `prefers-reduced-motion: reduce` is set.

---

## Subpage Layout

```
┌──────────────────────────────────────────────────────────┐
│ nav column (~200px) ╲ brushstroke ╲ content area        │
│                      ╲             ╲                     │
│  [accordion nav]      ╲             [reel]               │
│                        ╲            [credits grid]       │
│                         ╲           [track list]         │
│                          ╲          [contact form]       │
│  EN · 中文 · 日本語                                       │
└──────────────────────────────────────────────────────────┘
```

### Accordion sidebar nav

Fixed order, always: **Home → Games → Musicals → Biography → Contact**

- Active item: Bodoni Moda, display scale, vertical text  
  (`writing-mode: vertical-rl; transform: rotate(180deg)`), color `var(--color-ink)`
- Inactive items: Bodoni Moda, ~22–25px, `var(--color-mid)`, ~55% opacity, right-aligned
- Inactive hover: bring to 100% opacity of `var(--color-mid)`
- Gap between inactive items: 1.6–1.8× their font size
- Gap from active title bottom to next item: 2× inter-item gap
- Total column height stays **constant** — only proportions shift
- Home item: never expands. Clicking navigates to `/`. Otherwise styled as inactive.
- Transition: outgoing title contracts simultaneously with incoming title expanding.  
  Treat as one coordinated GSAP animation, not two sequential ones.

**Language toggle (subpages):** bottom of nav column, below Contact.  
`var(--text-xs)`, Satoshi, `var(--color-muted)`. `EN · 中文 · 日本語` with `·` separator.

### Nav/content divider
- Two organic brushstroke SVG paths (~80–120px tall, 3–6px stroke, `#C8A97A`, 60% opacity)
- Underneath: single 1px structural line at 15% opacity of `var(--color-ink)`, running full  
  column height at the same diagonal angle as the homepage lines
- The brushstroke SVGs are texture; the 1px line makes the boundary legible

---

## Mobile Layout

Breakpoint: `≤ 768px`. Portrait-first.

```
┌─────────────────────┐   ← 30vh
│  Games  │ Biography │   2-column grid, each tile: label + faint bg image
├─────────────────────┤
│                     │   ← 40vh
│    CHRISTIAN LIU    │   name + subtitle, centered
│  composer · etc.   │
│                     │
├─────────────────────┤
│ Musicals │  Contact │   ← 30vh
└─────────────────────┘
│  EN · 中文 · 日本語 │   below grid, centered row
└─────────────────────┘
```

- Each tile shows label + **low-opacity background image at rest** (no hover on touch)
- Diagonal lines appear at `var(--color-line-faint)` (20%) across full viewport height,  
  purely decorative — they do NOT define grid boundaries
- Name: `font-size: clamp(2.5rem, 11vw, 5rem)` — keeps "CHRISTIAN LIU" on one line at 390px
- Tiles: `height: 30vh` top/bottom, `height: 40vh` center

---

## Waveform Player — Full Specification

Audio is the primary design material. A fashion photographer should not be able to  
use this design without it feeling wrong.

### Track list rows
Each `article.track-row` contains:
1. `div.track-waveform` — full-width absolutely positioned behind text, z-index below content
2. `div.track-num` — `01`–`05`
3. `div.track-info` — `h3.track-title` + `p.track-meta` (game · genre)
4. `div.track-duration`
5. `button.track-play-btn` — play/pause icon swap

### Waveform visualization
Rendered to a `<canvas>` inside `.track-waveform`, full width of the row.
Bar heights derived from `waveformProfile` on each track in config.js:

| Profile | Character | Bar distribution |
|---|---|---|
| `dense-rhythmic` | Rock, trailer, energetic | Many bars, high amplitude, tight spacing |
| `flowing-electronic` | Drum & bass, melodic | Medium density, flowing envelope curve |
| `sweeping-orchestral` | Cinematic, builds | Slow-rising envelope, wider bars |
| `sparse-electronic` | Bullet hell, driving | Fewer bars, sharp peaks, irregular |
| `sparse-melodic` | Piano, intimate | Very few bars, gentle amplitude |

**States:**
- Resting: `var(--color-gold)` at 15% opacity
- Hover: `var(--color-gold)` at 35% opacity
- Playing (unplayed portion): `var(--color-gold)` at 40% opacity
- Playing (played portion): `var(--color-play)` (#E8522A) filling left-to-right as scrubber
- Clicking anywhere on waveform seeks to that position in the track

**Playing state row:**
- Track number replaced by animated equalizer (3 CSS bars, pulsing via `@keyframes`)
- Waveform bars animate with organic left-to-right ripple, 1.2s cycle, grouped bar phases  
  (not literal audio-reactive — procedural only)
- Play button icon swaps to pause

### Mini-player
Appears anchored to bottom of `.subpage-content` when playing track's row  
scrolls out of view. Controlled by `IntersectionObserver` on the **playing track's row**  
(not the whole section) at 50% threshold.

Contains:
- Animated single-line waveform (canvas, 1-line condensed)
- Track title + game name
- Pause/play control
- Current time / total time

Same typographic and color system as the rest of the page — not a separate design language.  
Disappears when playback stops or playing track row is ≥50% in viewport again.

### Audio implementation
- `HTMLAudioElement` with `preload: 'metadata'`
- `requestAnimationFrame` loop synced to `audioEl.currentTime`
- `loadedmetadata` event updates actual duration (overrides `durationStr` from config)
- `ended` event auto-advances to next track

---

## i18n Architecture

**Key principle:** `i18n.js` is a pure translation layer. It does not touch the DOM.

```
applyLanguage(lang)
  → sets _lang
  → sets html[lang] and html[data-lang]
  → fires CustomEvent('langchange')

window.addEventListener('langchange')  ← router.js
  → router.render(window.location.pathname)  ← re-renders everything
```

No `[data-i18n]` attributes. Translations are applied at render time by calling  
`t(key, lang)` inside page and nav renderers — not post-hoc DOM patching.

**NOT translated:** `CHRISTIAN LIU` (stays Roman in all languages), track titles, game titles.  
**Translated:** nav labels, section labels, contact copy/framing, bio copy, service  
descriptions, credit role descriptors, track game/genre type descriptors, footer copy.

**Key namespaces:**
- `nav.*` — nav labels
- `home.*` — homepage subtitle
- `section.*` — section labels (Reel, Featured Tracks, etc.)
- `track.game.*` — game type descriptors (lookup key is the raw string from config.js)
- `track.genre.*` — genre descriptors (same)
- `credit.role.*` — credit role descriptions
- `player.*` — player UI strings
- `contact.*` — contact form labels and framing copy
- `bio.*` — biography copy and fact labels
- `svc.*` — service card titles and descriptions
- `footer.*` — footer copy

---

## File Structure

```
christian-liu/
├── index.html              ← single entry point, script load order in comments
├── config.js               ← ALL content: tracks, credits, videos, email, social
├── i18n.js                 ← ALL translations: EN/ZH/JA + helpers (t, tTrack, tCredit)
├── nav.js                  ← Nav.render(section) — home corners + subpage accordion
├── router.js               ← SPA router, Pages map, popstate + langchange listeners
├── style.css               ← design tokens + reset (Step 1 only; visual in Steps 2–4)
├── pages/
│   ├── home.js             ← HomePage.mount(el) — diag scaffold, home-center, quad-previews
│   ├── games.js            ← GamesPage.mount(el) — reel, credits, track rows, mini-player
│   ├── musicals.js         ← MusicalsPage.mount(el)
│   ├── biography.js        ← BiographyPage.mount(el) — bio grid, facts, services
│   └── contact.js          ← ContactPage.mount(el) — email link, form, social
├── vercel.json             ← catch-all rewrite: any path → index.html
├── netlify.toml            ← catch-all redirect: /* → /index.html (status 200)
├── .claude/
│   ├── BUILDSPEC.md        ← this file
│   └── launch.json         ← python3 -m http.server 3000 (for preview tool)
├── [audio files]           ← TaiwuSurvivorPV.wav, ioh_theme.mp3, whaleboss.wav,
│                              recon.wav, sweet_dreaming.wav
└── [image files]           ← me.jpg, hero-texture.png, waveform-art.png
```

---

## Build State

### ✅ Step 1 — Architecture (COMPLETE)

All files written and verified. Tested:
- Cold entry `/` → homepage renders, corner nav, lang toggle visible
- SPA navigate `/games` → accordion nav (Games active), all 5 tracks, credits, sections
- Language switch EN→ZH → full re-render, nav + content + track descriptors translate
- Track titles stay Roman in ZH ✓
- Homepage round-trip with language state preserved ✓
- Zero JS console errors ✓

### ✅ Step 2 — Homepage visual (COMPLETE)

Build targets for `style.css` + `pages/home.js`:

1. **Diagonal line system**
   - `.diag__cross` positioned via `transform: translate(42vw, 52vh)`
   - `.diag__line--1` rotated 130deg, `.diag__line--2` rotated 50deg
   - GSAP hover animation on crossing point
   - Corner-to-corner direct transition (track live animated values)

2. **Corner labels**
   - `position: absolute` flush to corners
   - Bodoni Moda, `var(--color-mid)`, appropriate font size
   - Hover: translate 8–12px toward corner + crossing point animation triggers

3. **Name block**
   - `position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%)`
   - `font-family: var(--font-display); font-size: var(--text-hero); color: var(--color-ink)`
   - Subtitle: Satoshi italic, `var(--color-muted)`

4. **Preview images**
   - Absolutely positioned per quadrant, `opacity: 0` at rest
   - `clip-path` matches quadrant triangle — snaps on hover, does not animate
   - Opacity fades in 300ms with 150ms delay after crossing point moves

5. **Page-load micro-animation**
   - GSAP stagger: corner labels nudge 15–20px toward center then return
   - `gsap.matchMedia()` for `prefers-reduced-motion`

6. **Language toggle**
   - `position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%)`
   - Satoshi, `var(--text-xs)`, `var(--color-muted)`

7. **Mobile thirds layout**
   - `@media (max-width: 768px)`: 30/40/30vh rows
   - 2-column CSS grid for top/bottom tiles
   - Diagonal lines at `var(--color-line-faint)` as full-height decoration only
   - Name: `font-size: clamp(2.5rem, 11vw, 5rem)`

### 🔲 Step 3 — Games subpage visual (NEXT)

- Subpage layout (sidebar + content columns)
- Accordion nav CSS + GSAP coordinated animation
- Nav/content brushstroke SVG divider + 1px structural line
- Track row waveform visualization (canvas per row, waveformProfile-driven bar heights)
- Playing state: red-orange scrubber, equalizer icon, ripple animation
- Mini-player (IntersectionObserver on playing row, 50% threshold)
- Video reel embed (thumbnail → iframe on click)
- Credits grid (image + caption, top-aligned captions)
- Inline contact form (bottom-border fields only, no box borders)

### 🔲 Step 4 — Remaining subpages (QUEUED)

- **Musicals:** mirrors Games structure
- **Biography:** photo + facts column, bio text column, services grid
- **Contact:** full form, email link, social links

---

## Content Placeholders Needing Real Assets

| Item | Location in config.js | Status |
|---|---|---|
| Games reel YouTube ID | `SITE_CONFIG.VIDEOS.games[0].youtubeId` | Placeholder `dQw4w9WgXcQ` |
| Credit thumbnail images | `SITE_CONFIG.CREDITS.games[*].image` | Empty string |
| Game page URLs | `SITE_CONFIG.TRACKS[*].gameUrl` | Empty string |
| Social links | `SITE_CONFIG.SOCIAL.*` | Empty string |
| Quadrant preview images | `pages/home.js` quad-preview divs | Not yet wired |

---

## Key Decisions Log (for reference)

| Decision | Choice | Reason |
|---|---|---|
| Name weight | Uniform (not Bold/Regular mix) | Mixed-weight serif peaked 2017, reads template |
| Diagonal line color | Amber-gold `#C8A97A` | Warm immediacy; connects to waveform gold on subpages |
| Brushstroke SVGs | Cut from homepage | Clean lines are stronger; brushstrokes risked "Japanese restaurant" |
| Micro-animation size | 15–20px (not 4–6px) | 4px is imperceptible; must be visible to telegraph interactivity |
| clip-path on preview | Does not animate | Polygon interpolation is cross-browser unreliable |
| Translate vs left/top | `transform: translate()` | Stays on compositor thread; no layout reflow |
| Subtitle | 3 roles, not 4 | "audio professional" too generic; cut |
| React | No | No component-tree state; non-engineer owner; dep rot |
| i18n DOM approach | Event-driven re-render | Clean; no data-i18n scraping; translates at render time |
| Mobile home layout | Thirds (30/40/30vh) | Preserves name as focal center; tiles tappable |
| Lang toggle position | Homepage: fixed bottom-center | Between Musicals and Contact; consistent system |
