// Re-render the hero poster stills (public/meadow/*.webp) from the live
// WebGL meadow. Run after changing the scene's look (palette, terrain, tree…):
//
//   npm run build && npx next start -p 3001 &
//   node scripts/posters.mjs
//
// Posters are rendered wider than typical screens so the CSS `cover` crop in
// `.hero-poster` matches the live camera framing. UI is hidden for the shot.
import { mkdirSync } from 'node:fs';

import { chromium } from 'playwright';
import sharp from 'sharp';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const OUT = 'public/meadow';
mkdirSync(OUT, { recursive: true });

const VARIANTS = {
  desktop: {
    context: { viewport: { width: 2048, height: 960 }, deviceScaleFactor: 1 },
    width: 1920,
  },
  mobile: {
    context: {
      viewport: { width: 600, height: 800 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    width: 900,
  },
};

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

for (const tod of ['morning', 'golden', 'night']) {
  for (const [name, { context, width }] of Object.entries(VARIANTS)) {
    // Reduced motion: frozen wind + still camera, so stills are repeatable.
    const ctx = await browser.newContext({
      ...context,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.addInitScript((t) => localStorage.setItem('tod', t), tod);
    await page.goto(BASE, { waitUntil: 'load', timeout: 120_000 });
    // Wait for the canvas to finish fading in over the old poster.
    await page.waitForFunction(
      () => {
        const wrap = document
          .querySelector('#top canvas')
          ?.closest('div[style*="opacity"]');
        return wrap && getComputedStyle(wrap).opacity === '1';
      },
      null,
      { timeout: 120_000 },
    );
    await page.addStyleTag({
      content:
        'header, .grain, #top > .container, #top > div[aria-hidden]:not(.hero-sky):not(.hero-poster) { display: none !important; }',
    });
    await page.waitForTimeout(2500);
    const png = await page.locator('#top').screenshot();
    const file = `${OUT}/${tod}-${name}.webp`;
    await sharp(png)
      .resize({ width })
      .webp({ quality: 58, effort: 6 })
      .toFile(file);
    console.log(`wrote ${file}`);
    await ctx.close();
  }
}

await browser.close();
