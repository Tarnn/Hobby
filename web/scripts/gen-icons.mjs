// Rasterize the brand mark into the favicon PNG/ICO set. Source of truth is
// public/favicon/favicon.svg (the TK monogram drawn as paths, no font).
//
//   node scripts/gen-icons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const DIR = 'public/favicon';
const source = await readFile(`${DIR}/favicon.svg`, 'utf8');
const mark = source.match(/<path d="([^"]+)"/)[1];
const gradient = source.match(/<defs>[\s\S]*<\/defs>/)[0];

// rounded: transparent corners for browser tabs. Otherwise full-bleed (the
// OS applies its own mask); `scale` keeps the mark inside maskable safe zones.
function tile({ rounded, scale = 1 }) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">${gradient}` +
      `<rect width="36" height="36"${rounded ? ' rx="8"' : ''} fill="url(#g)"/>` +
      `<g transform="translate(18 18) scale(${scale}) translate(-18 -18)">` +
      `<path d="${mark}" fill="#fff"/></g></svg>`,
  );
}

const png = (opts, size) =>
  sharp(tile(opts), { density: (72 * size) / 36 + 1 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

const files = {
  'favicon-96x96.png': [{ rounded: true }, 96],
  'apple-touch-icon.png': [{ rounded: false, scale: 0.9 }, 180],
  'web-app-manifest-192x192.png': [{ rounded: false, scale: 0.82 }, 192],
  'web-app-manifest-512x512.png': [{ rounded: false, scale: 0.82 }, 512],
};
for (const [name, [opts, size]] of Object.entries(files)) {
  await writeFile(`${DIR}/${name}`, await png(opts, size));
  console.log('wrote', name);
}

const ico = await pngToIco(
  await Promise.all([16, 32, 48].map((s) => png({ rounded: true }, s))),
);
await writeFile(`${DIR}/favicon.ico`, ico);
console.log('wrote favicon.ico');
