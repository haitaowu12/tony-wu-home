import { test, expect } from '@playwright/test';

// These checks protect explicit content/behavior decisions, not aesthetic quality.
test('personal identity, breadth, public links and scope notes survive the redo', async ({ page }, info) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('.');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#hero-title')).toHaveText('Tony Wu.');
  await expect(page.locator('.hero__visual img')).toHaveAttribute('src', './hero-practice-story.webp');
  await expect(page.locator('.hero__copy')).toContainText('aircraft engines to rail networks');
  for (const name of ['Models', 'History', 'Play']) await expect(page.locator('.desk-links').getByRole('link', { name, exact: true })).toBeVisible();
  // Protect two defects found in actual first-pass screenshots, not by the earlier tests.
  await expect(page.locator('.play-cover img')).toHaveCSS('object-fit', 'contain');
  const width = info.project.use.viewport!.width;
  if (width >= 375 && width <= 414) {
    const actions = await page.locator('.hero__actions a').evaluateAll(links => links.map(link => link.getBoundingClientRect().top));
    expect(Math.abs(actions[0] - actions[1])).toBeLessThan(1);
  }
  const firstProjects = page.locator('.featured-work');
  await expect(firstProjects.getByRole('heading', { name: /World History Atlas/ })).toBeVisible();
  await expect(firstProjects.getByRole('heading', { name: 'Modeling Lab', exact: true })).toBeVisible();
  await expect(firstProjects.getByRole('heading', { name: 'Asterfall', exact: true })).toBeVisible();
  await expect(firstProjects.getByRole('link', { name: 'Explore World Atlas', exact: true })).toHaveAttribute('href', 'https://world-history-atlas-tony.techiesea.chatgpt.site/');
  await expect(firstProjects.getByRole('link', { name: 'Open Modeling Lab', exact: true })).toHaveAttribute('href', 'https://haitaowu12.github.io/sysmlv2_viewer/');
  await expect(firstProjects.getByRole('link', { name: 'Play Asterfall', exact: true })).toHaveAttribute('href', 'https://haitaowu12.github.io/SE-Learning-Quest/');
  await expect(firstProjects).toContainText('Selected coverage');
  await expect(firstProjects).toContainText('Bounded language and diagram coverage');
  await expect(firstProjects).toContainText('Effectiveness not evaluated');
  for (const name of ['RailClear', 'RAMS Workbench']) {
    const entry = page.locator('.study-entry').filter({ has: page.getByRole('heading', { name, exact: true }) });
    await expect(entry.locator('.project-limit')).toContainText('qualification');
    await expect(entry.locator('figcaption')).toContainText('Synthetic example');
  }
  await expect(page.locator('.about-identity')).toContainText('P.Eng (ON, BC), MIRSE, PMP, CSEP');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (['375-no-preference', '1440-no-preference'].includes(info.project.name)) {
    for (const image of await page.locator('main img').all()) {
      if (!await image.isVisible()) continue;
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    const prefix = info.project.name.startsWith('375') ? 'phone' : 'desktop';
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
    await page.screenshot({ path: info.outputPath(`${prefix}-home.png`), animations: 'disabled' });
    await page.screenshot({ path: info.outputPath(`${prefix}-full-page.png`), animations: 'disabled', fullPage: true });
    for (const [id, label] of [['work', 'projects'], ['playground', 'playground'], ['about', 'about'], ['writing', 'writing']]) {
      await page.evaluate(target => {
        const element = document.getElementById(target)!;
        const margin = parseFloat(getComputedStyle(element).scrollMarginTop);
        scrollTo({ top: element.getBoundingClientRect().top + scrollY - margin, behavior: 'instant' });
      }, id);
      await page.screenshot({ path: info.outputPath(`${prefix}-${label}.png`), animations: 'disabled' });
    }
  }
  expect(errors).toEqual([]);
});

test('the personal page and project explanations remain usable without JavaScript', async ({ browser, baseURL }, info) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: info.project.use.viewport });
  const page = await context.newPage();
  try {
    await page.goto(baseURL!);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tony Wu.');
    await expect(page.getByRole('link', { name: /See what I’m building/ })).toHaveAttribute('href', '#work');
    await page.locator('#world-atlas summary').click();
    await expect(page.locator('#world-atlas')).toContainText('Jiangshan');
    await expect(page.getByRole('link', { name: 'Project source and credits', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View full screenshot: World History Atlas', exact: true })).toHaveAttribute('href', './project-previews/world-history-atlas-2026-10-29.jpg');
    await page.locator('#experience > summary').click();
    await expect(page.locator('#experience')).toContainText('Professional Engineer');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  } finally { await context.close(); }
});
