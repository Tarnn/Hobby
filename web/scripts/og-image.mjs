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

// Same TK ligature as src/components/ui/monogram.tsx.
const MONOGRAM_VIEWBOX = '0 0 165.27 100';
const MONOGRAM_PATHS = [
  'M97.15,99.53C97.15,99.53 20.26,99.53 20.26,99.53C20.18,99.25 20.18,98.9 20.32,98.69C26.46,98.61 28.96,95.62 29.7,89.76C29.98,87.54 30.07,85.41 30.07,83.09C30.07,83.09 30.08,2.21 30.08,2.21C30.08,2.21 27.03,2.2 27.03,2.2C17.87,2.17 12.53,4.8 7.2,12.26C4.73,15.72 2.72,19.4 0.83,23.2C0.55,23.26 0.32,23.26 0,23.23C0,23.23 2.03,0 2.03,0C2.03,0 78.32,0 78.32,0C78.36,0.2 78.53,0.2 78.58,0C78.58,0 118.3,0 118.3,0C118.41,0.26 118.33,0.64 118.17,0.81C112.54,0.92 109.36,3.13 107.29,8.29C106.04,11.43 105.4,14.69 104.69,18.02C104.69,18.02 90.5,84.91 90.5,84.91C90.5,84.91 89.71,90.22 89.71,90.22C89.52,91.46 89.65,92.72 89.86,93.96C90.48,97.63 93.72,98.69 97.3,98.7C97.31,98.95 97.27,99.11 97.15,99.53ZM56.95,98.36C58.07,98.63 59.02,98.65 60.16,98.47C63.14,98 65.58,96.35 67.11,93.72C67.91,92.35 68.6,90.95 69.01,89.39C69.01,89.39 70.59,83.36 70.59,83.36C70.59,83.36 85.05,15.11 85.05,15.11C85.77,11.75 86.51,7.5 85.47,4.5C84.32,1.5 81.52,0.87 78.41,0.85C78.41,0.85 80.37,23.22 80.37,23.22C80.03,23.26 79.8,23.27 79.54,23.19C77.94,20.11 76.36,17.14 74.51,14.25C70.93,8.67 66.78,4.19 60.12,2.81C58.39,2.45 56.71,2.22 54.94,2.22C54.94,2.22 50.3,2.21 50.3,2.21C50.3,2.21 50.3,83.7 50.3,83.7C50.3,83.7 50.64,89.76 50.64,89.76C51.21,93.94 52.61,97.33 56.95,98.36Z',
  'M148.87,99.54C148.87,99.54 142.18,99.96 142.18,99.96C142.18,99.96 131.25,100 131.25,100C122.07,99.62 117.37,93.09 113.52,85.51C111.29,81.03 109.51,76.49 107.8,71.77C105.25,64.72 103.09,57.65 100.89,50.33C100.89,50.33 124.86,26.94 124.86,26.94C124.86,26.94 135.05,16.77 135.05,16.77C137.94,13.54 141.31,9.65 141.66,5.37C141.88,2.64 139.92,1.05 137.16,0.84C137.12,0.52 137.15,0.2 137.32,0C137.32,0 165.24,0 165.24,0C165.27,0.32 165.2,0.52 165.13,0.83C162.04,1.7 159.26,3.02 156.46,4.59C152.93,6.58 149.7,8.72 146.43,11.13C141.65,14.66 137.2,18.37 132.9,22.51C132.9,22.51 117.41,37.43 117.41,37.43C121.58,51.75 126.4,65.78 133.18,79.05C135.24,82.96 137.38,86.65 139.94,90.22C142.24,93.43 145.46,97.37 149.02,98.72C149.02,98.72 148.87,99.54 148.87,99.54Z',
];

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
  .tile{width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 30% 25%,#ffb35c,#f27a8e);box-shadow:0 8px 24px rgba(0,0,0,.25);display:grid;place-items:center}
  h1{margin:auto 0 0;font:300 118px/.98 'ivypresto-display',Georgia,serif;letter-spacing:-.02em}
  h1 em{font-style:italic}
  .sub{margin-top:22px;font-size:30px;color:rgba(255,246,236,.92)}
  .sub b{font-weight:600}
</style></head>
<body><div class="og"><div class="in">
  <div class="top"><span class="tile"><svg viewBox="${MONOGRAM_VIEWBOX}" width="38" style="transform:translateY(1px)">${MONOGRAM_PATHS.map((d) => `<path d="${d}" fill="#2a1520" fill-rule="evenodd"/>`).join('')}</svg></span>tarnnn.com</div>
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
