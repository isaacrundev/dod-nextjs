# Evidence: Vercel build failure — Tailwind v4 PostCSS migration

> Date: 2026-10-14
> Verifier: AI-assisted local check
> Environment: local clone at `/tmp/dod-nextjs`, Node v25.2.1, npm 11.18.0

## Symptom

Every Vercel deployment since 2026-10-06 has failed, including two production ones.

```
./app/globals.css
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS
configuration.
```

Failed deployments: `6873257360` (2485b29c, Production), `6873254395` (c6d94bfe, Production),
`6873146588` (e20fa657, Preview) and every later push. The last successful deploy was
`6873248525` (bf0c6465), which still had `tailwindcss` 3.3.2.

## Root cause

Dependabot PR #44 (commit e20fa657, merge 2485b29c) bumped `tailwindcss` from 3.3.2 to
**4.3.3** — a major version — without the matching migration. v4 removed the PostCSS plugin
from the `tailwindcss` package, so `postcss.config.js` could no longer load it.

Reverting is not the right fix: that PR also removed `postcss-selector-parser`, which closed
Dependabot #149 and #139. Tailwind 3.3.2 is also out of support.

## Fix

| File | Change |
| --- | --- |
| `postcss.config.js` | Use `@tailwindcss/postcss` (the v4 plugin location); drop `autoprefixer` (v4 prefixes through Lightning CSS) |
| `app/globals.css` | `@tailwind base/components/utilities` → `@import "tailwindcss"` + `@config "../tailwind.config.js"` (keeps the existing JS theme, `darkMode: ["class"]` and `tailwindcss-animate`) |
| `app/page.tsx` | `container` → `mx-auto w-full max-w-[1400px]` |
| `package.json` | add `@tailwindcss/postcss ^4.3.3`; remove unused `autoprefixer` |

`app/page.tsx` needed the swap because v4 ignores the v3 `container` options
(`center`/`padding`/`screens`): the built-in utility emits `width:100%` with max-widths at
640–1536px and **no auto margins**, so the hero content became left-aligned and capped at
1280px instead of centered at 1400px. The page supplies its own `px-4 md:px-6`, so the
container's `2rem` padding was never used.

## Automated checks

- Command: `npm run build`
- Result: pass (previously failed at `./app/globals.css`).

- Command: `npm run lint`
- Result: pass.

- Command: `npm run test:ci`
- Result: pass — 11 suites, 51 tests.

Generated CSS still contains `bg-background` / `text-foreground` / `border-border` as
`hsl(var(--border))`-based theme colors, the `:is(.dark *)` class variant, the
`tailwindcss-animate` utilities (`animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*`),
and `rounded-md: calc(var(--radius) - 2px)` from the JS config. All 380 utility classes used
in the source are emitted (the five `space-x/y` variants only differ in selector form:
`:where(...)` + logical properties).

## Manual checks

Compared the new build against the live production deployment `dod-nextjs-jccvdgxyx`
(commit bf0c6465, Tailwind 3.3.2) with headless Chromium at 1920, 1440 and 1024 px:

- Elements shifting more than 1px: **0 of 90** at each width.
- Hero container: `x=260, width=1400, padding=24px` at 1920px on both; `x=0, width=1024` at
  1024px on both.
- Screenshots of the landing page at 1920px and 1024px: **0 differing pixels**
  (pixelmatch, threshold 0.1).

## Known style deltas (v4 scale, deliberately not pinned)

- `shadow-sm` now uses v4's value (v3's `shadow`), i.e. slightly stronger. Used on the NavBar,
  card and tabs.
- `backdrop-blur-sm` is 8px instead of 4px. Used on dialog, sheet and alert-dialog overlays.
- `bg-gradient-to-r` (3 uses) interpolates in oklab, so the blue gradient is marginally
  different.

To restore the v3 look exactly, add to `app/globals.css`:
`@theme { --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05); --blur-sm: 4px; }`

## Deviations

- Dark mode and authenticated pages (`/dashboard`, `/add-new`, …) were not exercised; the
  layout comparison covers the public landing page, which is the only page that used the v3
  `container` class.
- `next build` cannot verify the runtime database paths; no application code was changed
  besides the class swap in `app/page.tsx`.
