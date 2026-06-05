// One-off: rasterize the brand SVG into the favicon PNG/ICO set.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const DIR = 'public/favicon';

// Brand tile (matches favicon.svg). Render at high res, then downscale.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2b9bf4"/><stop offset="1" stop-color="#8b5cf6"/>
  </linearGradient></defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="50%" y="53%" dominant-baseline="central" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif" font-size="256" font-weight="700" fill="#fff">TK</text>
</svg>`;

const base = Buffer.from(svg);

async function png(size, name) {
  await sharp(base, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(`${DIR}/${name}`);
  console.log('wrote', name);
}

await png(180, 'apple-touch-icon.png');
await png(192, 'web-app-manifest-192x192.png');
await png(512, 'web-app-manifest-512x512.png');
await png(96, 'favicon-96x96.png');

// favicon.ico (multi-size)
const ico = await pngToIco([
  await sharp(base, { density: 384 }).resize(16, 16).png().toBuffer(),
  await sharp(base, { density: 384 }).resize(32, 32).png().toBuffer(),
  await sharp(base, { density: 384 }).resize(48, 48).png().toBuffer(),
]);
await writeFile(`${DIR}/favicon.ico`, ico);
console.log('wrote favicon.ico');
