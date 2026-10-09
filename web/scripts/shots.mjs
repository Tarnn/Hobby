import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const OUT = process.env.OUT || 'screenshots';
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const themes = process.env.TOD
  ? [process.env.TOD]
  : ['morning', 'golden', 'night'];

// WebGL needs a GPU or SwiftShader in headless Chromium. CHROMIUM_PATH lets
// this run against a preinstalled browser (e.g. in CI containers).
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
let totalErrors = 0;

for (const theme of themes) {
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      colorScheme: theme === 'morning' ? 'light' : 'dark',
      // The meadow saturates a software-rendered CPU; reduced motion switches
      // it to render-on-demand so scripted scrolling stays responsive.
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();

    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`));

    // Force the time of day before load (see TOD_INIT_SCRIPT)
    await page.addInitScript((t) => {
      localStorage.setItem('tod', t);
    }, theme);

    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);

    // Scroll through the whole page to trigger all whileInView reveals
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.6);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800); // let animations settle

    const tag = `${theme}-${vp.name}`;
    await page.screenshot({
      path: `${OUT}/${tag}-full.png`,
      fullPage: true,
    });

    // Per-section above-the-fold-ish shots
    for (const id of ['about', 'skills', 'experience', 'testimonials', 'contact']) {
      const el = await page.$(`#${id}`);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await el.screenshot({ path: `${OUT}/${tag}-${id}.png` }).catch(() => {});
      }
    }

    if (errors.length) {
      totalErrors += errors.length;
      console.log(`\n[${tag}] ${errors.length} console error(s):`);
      errors.slice(0, 8).forEach((e) => console.log('   - ' + e));
    } else {
      console.log(`[${tag}] OK — no console errors`);
    }

    await ctx.close();
  }
}

await browser.close();
console.log(`\nDone. Total console errors: ${totalErrors}. Shots in ./${OUT}`);
