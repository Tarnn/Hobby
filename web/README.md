# tarnnn.com — Portfolio (web)

Personal portfolio for **Taranjit Kang**, Senior Full Stack Software Developer.
Complete redesign built on Next.js 15 App Router.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (seeded from the paid "Sonic" shadcnblocks template)
- **Motion** (`motion/react`) for scroll/reveal animations; **Lenis** smooth scroll
- **Three.js** via `@react-three/fiber` + `drei` — the interactive "touch grass" meadow hero (custom GLSL)
- **Type**: IvyPresto Display (editorial serif) via Adobe Fonts kit `cml5ijv`; Geist Sans for body text and Geist Mono for HUD labels, both self-hosted by `next/font`
- **next-intl** — 5 languages (EN / ES / FR / Hindi / Punjabi), cookie-based, no URL prefix
- **Resend** — server-action contact form
- **@vercel/analytics**

## The meadow + time of day

The hero is a real-time WebGL meadow (`src/components/meadow/`): ~72k instanced grass
blades with wind gusts, a cursor trail that parts the grass, click-to-plant flowers, a
lone tree, sky dome with sun / moon / stars / clouds, and fireflies at night.

**Time of day is the site theme.** `morning` (light), `golden` and `night` (dark) drive
both the CSS tokens (`data-tod` on `<html>`, see `globals.css`) and the scene palette
(`meadow/palette.ts`). It defaults to the visitor's local clock, then persists their
pick (`localStorage.tod`). An inline script resolves it before first paint. The
Morning / Golden / Night switch lives in the hero.

- Terrain height is analytic and mirrored in TS + GLSL (`meadow/terrain.ts` ↔
  `meadow/glsl.ts`) — change both together.
- Performance: mobile/low-core devices get fewer blades; DPR adapts via
  `PerformanceMonitor`; rendering stops when the hero is off-screen.
- `prefers-reduced-motion`: wind freezes, no camera drift, render-on-demand (the grass
  still reacts to touch). No WebGL → CSS sky fallback.
- Poster stills (`public/meadow/*.webp`) paint instantly under the canvas, which
  fades in on its first frame; they're all that no-WebGL and Save-Data visitors
  get. Re-render them after changing the scene: `node scripts/posters.mjs`
  (with a production server on :3001).
- The About portrait is the LinkedIn profile photo, edited with the Adobe Photoshop
  API: Generative Expand rebuilt the shoulders LinkedIn's circle crop cut off (the
  face and hair stay original pixels), then background removal and a light tone
  pass gave `public/portrait/morning-v2.webp` (the right-hand hair outline is
  tidied: flyaways and a stray tuft trimmed). Golden and night grades are Photoshop
  adjustments (`public/portrait/{golden,night}-v2.webp`); only the grade for the
  current time of day downloads. `public/profile-photo.jpg` is the uncut photo
  used in the JSON-LD `Person` schema.
- Adobe Fonts kit `cml5ijv` is allow-listed for `tarnnn.com`, `www.tarnnn.com`,
  `*.vercel.app` and `localhost` — add new domains at fonts.adobe.com → Web Projects.

## Sections

Hero · About (animated stat counters) · Skills · Experience (impact highlights +
resume-driven timeline, incl. Adobe & Handshake) · Studio (Nexus Development LLC and
its apps — Baybee Studio, Lullow, Pyaar; artwork mirrored in `public/nexus/`) ·
Projects (live from the GitHub API, cached daily) · Testimonials · Contact (working
form + quick links).

SEO: JSON-LD `Person` schema, `app/sitemap.ts`, `app/robots.ts`, a share card rendered
from the golden-hour poster (`app/opengraph-image.jpg`, re-render with
`node scripts/og-image.mjs`), and favicons built from `public/favicon/favicon.svg`
(regenerate via `node scripts/gen-icons.mjs`).

Logo: a TK ligature set in IvyPresto Display (upright T, italic K, like the hero's
"Taranjit *Kang*"), outlined with Adobe Illustrator's vectorizer so it needs no font at
runtime. The header lockup is `src/components/ui/wordmark.tsx` (mark, hairline, name);
the favicon and app icons put the mark on a round "sun" tile.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint + prettier
node scripts/shots.mjs   # Playwright responsive screenshots (server must be running)
```

## Content

- Copy lives in `messages/*.json` (per locale).
- Structured data (experience, testimonials, skills, links, asset URLs) lives in
  `src/content/portfolio.ts`. All images/PDFs are served from the existing S3 bucket
  `hobby-tkang.s3.us-east-2.amazonaws.com` (reused from the previous site).

## Deploy (same Vercel project / domain)

This app lives in `Hobby/web/`. To switch the live site from the old Vite app:

1. Vercel → Project → **Settings → Build & Deployment → Root Directory** → set to `web`.
2. Vercel auto-detects Next.js. Redeploy.
3. If the optional S3 CDN override env var was set, rename it from `VITE_AWS_S3_HOBBY_CDN`
   to `NEXT_PUBLIC_AWS_S3_HOBBY_CDN` (the default fallback URL works without it).

The old app remains at `Hobby/my-react-ts-app/` as a backup until you confirm.

## Contact form (Resend)

The form works without config (it shows a "reach me directly" message). To enable email:

1. Create a free account at [resend.com](https://resend.com) and an API key.
2. In Vercel, add env var `RESEND_API_KEY`.
3. (Recommended) Verify the `tarnnn.com` domain in Resend and set `CONTACT_FROM`
   to e.g. `Tarnnn <hello@tarnnn.com>`. Without a verified domain, Resend's
   `onboarding@resend.dev` sender only delivers to your own account email.

See `.env.example`. Messages are sent to `taranjitk18@gmail.com` with the sender's
address as reply-to. A hidden honeypot field drops bot submissions.

## Notes

- Favicons, OG image, and manifest are fully branded (no template placeholders left).
  Regenerate raster icons from the brand SVG with `node scripts/gen-icons.mjs`.
