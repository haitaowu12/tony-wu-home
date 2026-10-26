import { expect, test as base, type Page } from "@playwright/test";

const test = base.extend<{ browserErrors: void }>({
  browserErrors: [async ({ page }, use) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await use();
    expect(errors).toEqual([]);
  }, { auto: true }],
});

const sectionIds = ["top", "work", "playground", "about", "writing", "contact"];

async function openPage(page: Page) {
  await page.goto(".");
  await page.evaluate(() => document.fonts.ready);
  if (!await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    await expect(page.locator("html")).toHaveClass(/page-ready/);
    await page.evaluate(() => Promise.all(document.getAnimations().map((animation) =>
      animation.finished.catch(() => {}),
    )));
  }
}

async function tabTo(page: Page, selector: string) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    await page.keyboard.press("Tab");
    if (await page.locator(selector).evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error(`Could not reach ${selector} using Tab`);
}

async function expectVisibleTargetFocus(page: Page, id: string) {
  const target = page.locator(`#${id}`);
  await expect(target).toBeFocused();
  // The site's reduced-motion rule gives all properties a 0.01ms transition.
  // Wait for the rendered focus state instead of sampling before its first paint.
  await expect(target).toHaveCSS("outline-offset", "-3px");
  const indicator = await target.evaluate((element) => {
    const style = getComputedStyle(element);
    let surface: Element | null = element;
    let background = style.backgroundColor;
    while (surface && background === "rgba(0, 0, 0, 0)") {
      surface = surface.parentElement;
      if (surface) background = getComputedStyle(surface).backgroundColor;
    }
    const luminance = (color: string) => {
      const [r, g, b] = color.match(/[\d.]+/g)!.slice(0, 3).map((value) => {
        const channel = Number(value) / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const focusLuminance = luminance(style.outlineColor);
    const surfaceLuminance = luminance(background);
    return {
      style: style.outlineStyle,
      width: parseFloat(style.outlineWidth),
      offset: parseFloat(style.outlineOffset),
      contrast: (Math.max(focusLuminance, surfaceLuminance) + 0.05) /
        (Math.min(focusLuminance, surfaceLuminance) + 0.05),
    };
  });
  expect(indicator.style).toBe("solid");
  expect(indicator.width).toBeGreaterThanOrEqual(3);
  expect(indicator.offset).toBeLessThanOrEqual(-indicator.width);
  expect(indicator.contrast).toBeGreaterThanOrEqual(3);
  // Native smooth scrolling is not a CSS animation. Wait for consecutive
  // stable frames so clearance checks and screenshots use its final position.
  await page.evaluate(() => new Promise<void>((resolve) => {
    let previousY = scrollY;
    let stableFrames = 0;
    const check = () => {
      stableFrames = scrollY === previousY ? stableFrames + 1 : 0;
      previousY = scrollY;
      if (stableFrames >= 4) resolve();
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  }));
  // The top indicator is below the sticky navigation and its inset sides fit
  // the viewport, including at the end of the page where scroll is clamped.
  await expect.poll(() => target.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const navBottom = document.querySelector(".site-nav")!.getBoundingClientRect().bottom;
    return rect.top >= navBottom - 1 && rect.top < innerHeight &&
      rect.left >= 0 && rect.right <= innerWidth;
  })).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test.beforeEach(async ({ page }, testInfo) => {
  await openPage(page);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches))
    .toBe(testInfo.project.name.endsWith("-reduce"));
});

test("skip link keeps a visible destination and resumes within main", async ({ page }, testInfo) => {
  await tabTo(page, ".skip-link");
  await expect(page.locator(".skip-link")).toBeInViewport();
  await page.keyboard.press("Enter");
  await expectVisibleTargetFocus(page, "main-content");
  const screenshot = testInfo.outputPath("skip-destination.png");
  await page.screenshot({ path: screenshot, animations: "disabled" });
  await testInfo.attach("skip-destination", { path: screenshot, contentType: "image/png" });
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /See what I’m building/ })).toBeFocused();
});

test("keyboard hash navigation shows focus on every section", async ({ page }, testInfo) => {
  for (const id of sectionIds) {
    await openPage(page);
    if (id !== "top" && await page.locator(".site-nav__toggle").isVisible()) {
      await tabTo(page, ".site-nav__toggle");
      await page.keyboard.press("Enter");
    }
    await tabTo(page, `.site-nav a[href="#${id}"]`);
    await page.keyboard.press("Enter");
    await expectVisibleTargetFocus(page, id);
    await expect(page.locator(".site-nav__toggle")).toHaveAttribute("aria-expanded", "false");
    if (["top", "work", "contact"].includes(id)) {
      const screenshot = testInfo.outputPath(`${id}-destination.png`);
      await page.screenshot({ path: screenshot, animations: "disabled" });
      await testInfo.attach(`${id}-destination`, { path: screenshot, contentType: "image/png" });
    }
  }
});

test("programmatic focus after pointer use retains a visible indicator", async ({ page }) => {
  await page.locator("h1").click();
  for (const id of ["main-content", ...sectionIds]) {
    await page.locator(`#${id}`).evaluate((element) => {
      (element as HTMLElement).focus({ preventScroll: true });
      element.scrollIntoView({ block: "start", behavior: "instant" });
    });
    await expectVisibleTargetFocus(page, id);
  }
});
