import { test, expect } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';

// Bounded pre-selection studies. Not shipped by Vite and not aesthetic pass/fail tests.
for (const direction of ['A', 'B']) {
  test(`direction ${direction}: capture before selection`, async ({ page }, info) => {
    test.skip(!['1440-no-preference', '375-no-preference'].includes(info.project.name));
    await page.goto('.');
    const origin = new URL(page.url()).origin;
    const html = readFileSync('tests/fixtures/design-directions.html', 'utf8')
      .replace('__DIRECTION__', direction).replaceAll('src="/', `src="${origin}/`);
    await page.setContent(html);
    // The first capture exposed B's filtered image painting over its name.
    // Repair the stacking bug before comparing design merit; a broken candidate
    // cannot justify selecting its competitor.
    await page.addStyleTag({ content: '[data-direction="B"] .study-hero h1,[data-direction="B"] .study-kicker{z-index:2}' });
    await page.evaluate(() => Promise.all([...document.images].map(image => image.decode())));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const unobscured = await page.locator('h1').evaluate(heading => {
      const r = heading.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return hit === heading || heading.contains(hit);
    });
    expect(unobscured).toBe(true);
    await page.screenshot({ path: info.outputPath(`direction-${direction}-home.png`), animations: 'disabled' });
    await page.screenshot({ path: info.outputPath(`direction-${direction}-full.png`), fullPage: true, animations: 'disabled' });
    await page.locator('#work').scrollIntoViewIfNeeded();
    await page.screenshot({ path: info.outputPath(`direction-${direction}-work.png`), animations: 'disabled' });
  });
}

test('retain inspected reference captures for comparison only', async ({ request }, info) => {
  test.skip(info.project.name !== '1440-no-preference');
  test.setTimeout(60000);
  const sources = {
    'daniel-sun': '57c49e73-663a-4330-be9f-5d693a82de46',
    'josh-warner': 'e706ea3a-5c5c-42fb-abb8-d248e051fa26',
    'dul-zorigoo': '218fed06-11af-4f2a-91ca-81385c0783ea',
  };
  const results: Record<string, string> = {};
  for (const [name, id] of Object.entries(sources)) {
    const url = `https://images.refero.design/styles/refero.design/image/${id}.jpg`;
    try {
      const response = await request.get(url, { timeout: 15000 });
      if (!response.ok()) throw new Error(`HTTP ${response.status()}`);
      if (!response.headers()['content-type']?.includes('image')) throw new Error('Not an image');
      writeFileSync(info.outputPath(`reference-${name}.jpg`), await response.body());
      results[name] = url;
    } catch (error) {
      results[name] = `Unavailable: ${String(error)}; source ${url}`;
    }
  }
  writeFileSync(info.outputPath('reference-access.json'), JSON.stringify(results, null, 2));
});
