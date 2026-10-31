import { expect, test } from "@playwright/test";

test("engineering-led homepage preserves project access and captures the reviewed views", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto(".");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero h1")).toHaveText("Connecting the parts.Making the whole work.");
  await expect(page.locator(".hero__credentials")).toContainText("Principal Engineer, Rail Systems");
  await expect(page.locator(".hero__artifact-copy")).toContainText("Browser prototype");
  await expect.poll(() => page.locator(".hero__visual img").evaluate((image) =>
    (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
  )).toBe(true);
  const order = await page.evaluate(() => {
    const top = (selector: string) => document.querySelector(selector)!.getBoundingClientRect().top;
    return { studies: top(".study-pair"), tools: top(".project-index"), atlas: top(".atlas-feature") };
  });
  expect(order.studies).toBeLessThan(order.tools);
  expect(order.tools).toBeLessThan(order.atlas);
  await expect(page.locator(".study-entry .project-limit")).toHaveCount(2);
  for (const limit of await page.locator(".study-entry .project-limit").all()) {
    await expect(limit).toBeVisible();
    await expect(limit).toContainText("qualification");
  }
  await expect(page.locator(".published-feature .type-label")).toContainText("Published");
  await expect(page.locator(".research-index summary").first()).toContainText("Research in progress");
  await expect(page.locator(".contact__links a")).toHaveAttribute("href", "https://ca.linkedin.com/in/haitonyw");
  await expect(page.locator(".site-footer a")).toHaveAttribute("href", "https://github.com/haitaowu12");

  // Capture production pixels, not a sketch. Keep the full image content loaded
  // and the same viewport/state for future before/after inspection.
  const width = testInfo.project.use.viewport!.width;
  const capture = [375, 1440].includes(width) && testInfo.project.name.endsWith("-no-preference");
  if (capture) {
    for (const image of await page.locator(".project-preview img").all()) {
      if (!await image.isVisible()) continue;
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
    });
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    const mode = width === 1440 ? "desktop" : "phone";
    await page.screenshot({ path: testInfo.outputPath(`${mode}-home.png`), animations: "disabled" });
    await page.screenshot({ path: testInfo.outputPath(`${mode}-full-page.png`), fullPage: true, animations: "disabled" });
    await page.locator(".study-pair").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`${mode}-engineering.png`), animations: "disabled" });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("prerendered introduction and project destinations remain available without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  try {
    const page = await context.newPage();
    const baseURL = testInfo.project.use.baseURL!;
    await page.goto(baseURL);
    await expect(page.locator(".hero h1")).toContainText("Connecting the parts.");
    await expect(page.locator(".study-entry")).toHaveCount(2);
    await expect(page.getByRole("link", { name: "Open RailClear", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Open RAMS Workbench", exact: true })).toBeVisible();
    const scope = page.locator(".study-entry").first().locator("details");
    await scope.locator("summary").click();
    await expect(scope).toHaveAttribute("open", "");
    await expect(scope.locator("p")).toContainText("project-specific engineering qualification");
  } finally {
    await context.close();
  }
});
