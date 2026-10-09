// Rasterize the brand mark into the favicon PNG/ICO set. Source of truth is
// public/favicon/favicon.svg: the TK ligature (see src/components/ui/
// monogram.tsx) on a round "sun" tile.
//
//   node scripts/gen-icons.mjs
import { readFile, writeFile } from 'node:fs/promises';

import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const DIR = 'public/favicon';
const source = await readFile(`${DIR}/favicon.svg`, 'utf8');

// Round tile with transparent corners for browser tabs, as authored.
const round = Buffer.from(source);

// Full-bleed square for OS icons (the OS applies its own mask); `scale`
// keeps the mark inside maskable safe zones.
function bleed(scale) {
  return Buffer.from(
    source
      .replace(
        /<circle id="tile"[^>]*\/>/,
        '<rect width="36" height="36" fill="url(#g)"/>',
      )
      .replace(
        /(<g id="mark"[\s\S]*?<\/g>)/,
        `<g transform="translate(18 18) scale(${scale}) translate(-18 -18)">$1</g>`,
      ),
  );
}

const png = (svg, size) =>
  sharp(svg, { density: (72 * size) / 36 + 1 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

const files = {
  'favicon-96x96.png': [round, 96],
  'apple-touch-icon.png': [bleed(1), 180],
  'web-app-manifest-192x192.png': [bleed(0.9), 192],
  'web-app-manifest-512x512.png': [bleed(0.9), 512],
};
for (const [name, [svg, size]] of Object.entries(files)) {
  await writeFile(`${DIR}/${name}`, await png(svg, size));
  console.log('wrote', name);
}

const ico = await pngToIco(
  await Promise.all([16, 32, 48].map((s) => png(round, s))),
);
await writeFile(`${DIR}/favicon.ico`, ico);
console.log('wrote favicon.ico');
