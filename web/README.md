# tarnnn.com — Portfolio (web)

Personal portfolio for **Taranjit Kang**, Senior Full Stack Software Developer.
Complete redesign built on Next.js 15 App Router.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (seeded from the paid "Sonic" shadcnblocks template)
- **Motion** (`motion/react`) for scroll/reveal animations; **Lenis** smooth scroll
- **Three.js** via `@react-three/fiber` + `drei` — cursor-reactive WebGL particle field in the hero
- **next-intl** — 5 languages (EN / ES / FR / Hindi / Punjabi), cookie-based, no URL prefix
- **Resend** — server-action contact form
- **@vercel/analytics**

## Sections

Hero · About (animated stat counters) · Skills · Experience (resume-driven timeline,
incl. Adobe & Handshake) · Projects (live from the GitHub API, cached daily) ·
Testimonials · Contact (working form + quick links).

SEO: JSON-LD `Person` schema, `app/sitemap.ts`, `app/robots.ts`, generated OG image
(`app/opengraph-image.tsx`), branded favicons (regenerate via `node scripts/gen-icons.mjs`).

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
