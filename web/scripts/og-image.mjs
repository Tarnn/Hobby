// Render the social share card (src/app/opengraph-image.jpg + twitter-image.jpg)
// from the golden-hour meadow poster, in IvyPresto via the Adobe Fonts kit.
//
//   node scripts/og-image.mjs
//
// The page is served at http://localhost (an allowed kit domain) through
// Playwright request routing, so no dev server is needed.
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import sharp from 'sharp';

// Same geometry as the wordmark's MONOGRAM (src/components/ui/wordmark.tsx).
const MONOGRAM =
  'M4.85 10H16.45V13.7H4.85Z M8.8 10H12.5V26H8.8Z M18.85 10H22.55V26H18.85Z M19.14 20.2L25.66 10L30.04 10L22.26 22.2Z M25.1 15.94L31.14 26L26.56 26L21.74 17.95Z';

const HTML = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://use.typekit.net/cml5ijv.css">
<style>
  html,body{margin:0}
  .og{position:relative;width:1200px;height:630px;overflow:hidden;color:#fff6ec;
    font-family:ui-sans-serif,system-ui,sans-serif;
    background:url('/poster.webp') 58% 60%/cover no-repeat}
  .og::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(40,14,28,.72) 0%,rgba(40,14,28,.42) 42%,rgba(40,14,28,0) 72%)}
  .og::after{content:'';position:absolute;inset:auto 0 0 0;height:180px;background:linear-gradient(0deg,rgba(20,8,12,.55),transparent)}
  .in{position:absolute;inset:0;z-index:1;padding:68px 76px;display:flex;flex-direction:column}
  .top{display:flex;align-items:center;gap:16px;font:500 20px/1 ui-monospace,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,246,236,.88)}
  .tile{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#ffb35c,#f27a8e);box-shadow:0 8px 24px rgba(0,0,0,.25);display:grid;place-items:center}
  h1{margin:auto 0 0;font:300 118px/.98 'ivypresto-display',Georgia,serif;letter-spacing:-.02em}
  h1 em{font-style:italic}
  .sub{margin-top:22px;font-size:30px;color:rgba(255,246,236,.92)}
  .sub b{font-weight:600}
</style></head>
<body><div class="og"><div class="in">
  <div class="top"><span class="tile"><svg viewBox="0 0 36 36" width="44" height="44"><path d="${MONOGRAM}" fill="#2a1520"/></svg></span>tarnnn.com</div>
  <h1>Taranjit<br><em>Kang</em></h1>
  <div class="sub">Senior Full Stack Software Developer · <b>Adobe</b></div>
</div></div></body></html>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
});
await page.route('http://localhost/', (r) =>
  r.fulfill({ contentType: 'text/html', body: HTML }),
);
await page.route('http://localhost/poster.webp', (r) =>
  r.fulfill({
    contentType: 'image/webp',
    body: readFileSync('public/meadow/golden-desktop.webp'),
  }),
);
await page.goto('http://localhost/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = 'src/app/opengraph-image.jpg';
writeFileSync(
  out,
  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer(),
);
copyFileSync(out, 'src/app/twitter-image.jpg');
console.log(`wrote ${out} and src/app/twitter-image.jpg`);
