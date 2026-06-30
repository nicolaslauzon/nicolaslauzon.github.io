# Core rules
- Lean code, no comments. Clear code > comments.
- Straightforward HTML/CSS/JS. Prioritize simplicity + perf.
# Font
- Cooper BT from `assets/fonts/Cooper/webfonts/` (woff2). Weights: 400–900.
- `font-weight: 900` for titles (Cooper Black).

# Responsive split
- `.mobile` / `.desktop` classes separate mobile + desktop. Never merge.
- Desktop: `min-width: 900px` media query.
- Mobile shows by default, desktop hidden. Reversed at 900px+.

# Desktop
- BG: `web1.jpeg` fullscreen. Nothing else until designed.

# Mobile
Two pages: landing + links.

## Landing [DONE]
- BG: `mobile1.png`, centered on mtb rider.
- Centered title: "Nicolas Lauzon" / subtitle: "Coach de vélo de montagne"
- Color: `#e1c6a9` with `#2b1e12` text-shadow contour.
- Font: Cooper Black (`font-weight: 900`), `letter-spacing: -0.03em`
- JS auto-fit: hidden span measures text width, computes font-size to fill available width
- Padding: 10vw title / 15vw subtitle (set by JS)
- Full viewport (`100vh`), no scroll

## Links page [BUILT]
- Title: "Contacte-moi!", same style as landing (reuses `.landing__title`).
- BG: `mobile2.JPG`, centered on rear rider.
- 4 boxes (`#e1c6a9`), rounded corners, shadow, bottom-half of page:
  1. Réserve un cours ! (bike icon) → https://lvlupmtb.simplybook.me/v2/#book/provider/126
  2. Courriel (mail icon) → mailto:nicolas_lauzon@outlook.com
  3. Instagram (instagram icon) → https://www.instagram.com/nicolas_lauzon09/
  4. Facebook (facebook icon) → https://www.facebook.com/nicolas.lauzon.579997
- Inline SVGs from `assets/icons/` inside each box (`aria-hidden="true"`).
- Hover: scale(1.05) + deeper shadow, 0.2s ease transition.
- Scroll-snap: y mandatory, both sections 100vh, hidden scrollbar.

# Colors
- `#2b1e12` — text inside boxes, title contours
- `#e1c6a9` — box backgrounds, title text

# Web design methodology (always follow)
- **Mobile-first**: base styles for mobile, `min-width` breakpoints for larger.
- **No framework**: vanilla HTML/CSS/JS only. No libs, no build steps.
- **Semantic HTML**: use proper elements (`<nav>`, `<main>`, `<section>`, `<a>`).
- **Accessible**: proper `alt` texts, `aria-label` on icon links, semantic structure.
- **Performance**: lazy-load images, minimal HTTP requests, no unused CSS.
- **Responsive without duplication**: single source of truth for content — use media queries to rearrange, not duplicate.
- **Clean CSS**: BEM-like naming, no `!important`, short selectors, logical cascade.
- **No inline styles**: all styling in `style.css`.
- **Progressive enhancement**: core content works without JS. JS only enhances.

# Image paths
- `assets/images/` for all images
- `assets/icons/` for svg icons
- `assets/fonts/` for font files

# Verification
After changes: check mobile + desktop layouts, verify links, confirm colors match palette, test scroll-snap between sections.
