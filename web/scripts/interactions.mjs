import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

let pass = 0;
let fail = 0;
const check = (name, ok) => {
  console.log(`${ok ? '✓' : '✗'} ${name}`);
  ok ? pass++ : fail++;
};

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// 1. Cover-letter href resolves (HEAD)
const coverHref = await page
  .locator('a:has-text("Cover Letter")')
  .first()
  .getAttribute('href');
const coverStatus = coverHref
  ? (await page.request.head(coverHref)).status()
  : 0;
check(`Cover-letter link resolves (HTTP ${coverStatus})`, coverStatus === 200);

// 2. Experience tab switch changes the panel (Intuit/RBC have screenshots)
await page.locator('#experience').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.locator('#experience button:has-text("Intuit")').click();
await page.waitForTimeout(700);
const firstImg = await page
  .locator('#experience img[alt$="project"]')
  .first()
  .getAttribute('src');
await page
  .locator('#experience button:has-text("Royal Bank of Canada")')
  .click();
await page.waitForTimeout(700);
const secondImg = await page
  .locator('#experience img[alt$="project"]')
  .first()
  .getAttribute('src');
check(
  'Experience tab switches project image',
  !!firstImg && firstImg !== secondImg,
);

// 2b. Branded fallback renders for roles without a screenshot (Adobe)
await page.locator('#experience button:has-text("Adobe")').click();
await page.waitForTimeout(600);
const adobeText = await page.locator('#experience').innerText();
check('Adobe role shows highlight (fallback card)', /Unified Platform/.test(adobeText));

// 3. Theme toggle flips <html> class
const htmlBefore = await page.locator('html').getAttribute('class');
await page.locator('[data-theme-toggle]').first().click();
await page.waitForTimeout(800);
const htmlAfter = await page.locator('html').getAttribute('class');
check('Theme toggle flips <html> class', htmlBefore !== htmlAfter);

// 4. Language switcher re-renders content (Skills -> Compétences)
await page.locator('button[aria-label="Change language"]').first().click();
await page.waitForTimeout(300);
await page.locator('button[role="option"]:has-text("Français")').click();
await page.waitForTimeout(1500); // server action + re-render
const navText = await page.locator('header nav').first().innerText();
check(
  `Language switch renders French nav (${JSON.stringify(navText.replace(/\n/g, ' '))})`,
  /Compétences|Expérience|propos/.test(navText),
);

console.log(`\n${pass} passed, ${fail} failed. pageerrors: ${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log('  ! ' + e));
await browser.close();
process.exit(fail ? 1 : 0);
