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

test("project previews fill their row below descriptions and private images open without app access", async ({ page }) => {
  for (const [rowSelector, bodySelector] of [
    [".atlas-feature", ".atlas-feature__body"],
    [".project-spotlight", ".project-spotlight__body"],
    [".project-entry.has-preview", ".project-entry__body"],
    [".learning-feature", ".learning-feature__body"],
  ]) {
    for (const row of await page.locator(rowSelector).all()) {
      const layout = await row.evaluate((element, bodySelector) => {
        const bounds = element.getBoundingClientRect();
        const body = element.querySelector(bodySelector)!.getBoundingClientRect();
        const image = element.querySelector("img")!.getBoundingClientRect();
        const natural = element.querySelector("img")!;
        return { width: bounds.width, imageWidth: image.width, below: image.top >= body.bottom,
          ratio: image.width / image.height, naturalRatio: Number(natural.getAttribute("width")) / Number(natural.getAttribute("height")) };
      }, bodySelector);
      expect(layout.imageWidth).toBeGreaterThan(layout.width * 0.85);
      expect(layout.below).toBe(true);
      expect(layout.ratio).toBeCloseTo(layout.naturalRatio, 1);
    }
  }
  for (const title of ["RailClear", "RAMS Workbench"]) {
    const entry = page.locator(".project-entry").filter({
      has: page.getByRole("heading", { name: title, exact: true }),
    });
    const link = entry.getByRole("link", { name: `View full screenshot: ${title}`, exact: true });
    await expect(entry.getByRole("link")).toHaveCount(1);
    await expect(link).toHaveAttribute("href", /^\.\/project-previews\/.*\.webp$/);
    await link.scrollIntoViewIfNeeded();
    await expect(link.getByRole("img")).toBeVisible();
    await expect.poll(() => link.locator("img").evaluate((image) =>
      (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
    )).toBe(true);
    const layout = await entry.evaluate((element) => {
      const row = element.getBoundingClientRect();
      const body = element.querySelector(".project-entry__body")!.getBoundingClientRect();
      const image = element.querySelector("img")!.getBoundingClientRect();
      return { rowWidth: row.width, imageWidth: image.width, belowDescription: image.top >= body.bottom };
    });
    expect(layout.imageWidth).toBeGreaterThan(layout.rowWidth * 0.85);
    expect(layout.belowDescription).toBe(true);
    await link.focus();
    await expect(link).toBeFocused();
    await link.press("Enter");
    await expect(page).toHaveURL(/\/project-previews\/[^/]+\.webp$/);
    await expect.poll(() => page.locator("img").evaluate((image) =>
      (image as HTMLImageElement).naturalWidth,
    )).toBeGreaterThan(720);
    await page.goBack();
    await expect(entry).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

// Palette refinements must retain readable text on both reading surfaces.
test("content chapters share a surface with readable text and links", async ({ page }) => {
  const colors = await page.evaluate(() => {
    const luminance = (color: string) => {
      const [r, g, b] = color.match(/[\d.]+/g)!.slice(0, 3).map((value) => {
        const c = Number(value) / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a: string, b: string) => {
      const x = luminance(a), y = luminance(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    return ["work", "playground", "about", "writing", "contact"].map((id) => {
      const section = document.getElementById(id)!;
      const background = getComputedStyle(section).backgroundColor;
      const targets = [...section.querySelectorAll("p, h2, h3, a, summary")].filter((element) =>
        element.getBoundingClientRect().height > 0 && element.textContent!.trim().length > 0);
      return { id, background, minimumContrast: Math.min(...targets.map((element) => {
        let parent: Element | null = element;
        let surface = getComputedStyle(parent).backgroundColor;
        while (parent && surface === "rgba(0, 0, 0, 0)") {
          parent = parent.parentElement;
          if (parent) surface = getComputedStyle(parent).backgroundColor;
        }
        return contrast(getComputedStyle(element).color, surface);
      })) };
    });
  });
  expect(new Set(colors.slice(0, 4).map((item) => item.background)).size).toBe(1);
  for (const item of colors) expect(item.minimumContrast, item.id).toBeGreaterThanOrEqual(4.5);
});
