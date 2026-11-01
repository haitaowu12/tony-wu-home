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
    await page.evaluate(() => Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => {}))));
  }
}
async function tabTo(page: Page, selector: string) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    await page.keyboard.press("Tab");
    if (await page.locator(selector).evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error(`Could not reach ${selector} using Tab`);
}
async function expectVisibleTargetFocus(page: Page, id: string, showIndicator = true) {
  const target = page.locator(`#${id}`);
  await expect(target).toBeFocused();
  const heading = target.locator("h1, h2, h3").first();
  if (showIndicator) {
    await expect(heading).toHaveCSS("outline-offset", "6px");
    const indicator = await heading.evaluate((element) => {
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
      const focusLuminance = luminance(style.outlineColor), surfaceLuminance = luminance(background);
      return { style: style.outlineStyle, width: parseFloat(style.outlineWidth), offset: parseFloat(style.outlineOffset),
        contrast: (Math.max(focusLuminance, surfaceLuminance) + 0.05) / (Math.min(focusLuminance, surfaceLuminance) + 0.05) };
    });
    expect(indicator.style).toBe("solid");
    expect(indicator.width).toBeGreaterThanOrEqual(3);
    expect(indicator.offset).toBeGreaterThanOrEqual(indicator.width);
    expect(indicator.contrast).toBeGreaterThanOrEqual(3);
  } else await expect(heading).toHaveCSS("outline-style", "none");
  // Wait for native smooth scrolling, not just CSS animations.
  await page.evaluate(() => new Promise<void>((resolve) => {
    let previousY = scrollY, stableFrames = 0;
    const check = () => {
      stableFrames = scrollY === previousY ? stableFrames + 1 : 0;
      previousY = scrollY;
      if (stableFrames >= 4) resolve(); else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  }));
  await expect.poll(() => target.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const navBottom = document.querySelector(".site-nav")!.getBoundingClientRect().bottom;
    return rect.top >= navBottom - 1 && rect.top < innerHeight && rect.left >= 0 && rect.right <= innerWidth;
  })).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if (id === "playground") expect(await target.evaluate((element) => Math.abs(element.getBoundingClientRect().top - document.querySelector(".site-nav")!.getBoundingClientRect().bottom))).toBeLessThan(2);
}

test.beforeEach(async ({ page }, testInfo) => {
  await openPage(page);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(testInfo.project.name.endsWith("-reduce"));
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

test("pointer navigation focuses the destination without keyboard decoration", async ({ page }) => {
  for (const id of sectionIds) {
    if (id !== "top" && await page.locator(".site-nav__toggle").isVisible()) await page.locator(".site-nav__toggle").click();
    await page.locator(`.site-nav a[href="#${id}"]`).click();
    await expectVisibleTargetFocus(page, id, false);
  }
});

test("bounded project previews support browsing and full-size image navigation", async ({ page }, testInfo) => {
  for (const image of await page.locator(".project-preview img").all()) {
    if (await image.isVisible()) {
      expect(await image.evaluate((element) => element.getBoundingClientRect().height)).toBeLessThanOrEqual(442);
      await expect(image).toHaveCSS("object-fit", "contain");
    }
  }
  if (testInfo.project.use.viewport!.width >= 1100) {
    // The selected redo has a three-interest introduction before the study pair.
    // Check alignment and separation, not the superseded single-Atlas height.
    const scan = await page.locator("#work").evaluate((work) => {
      const features = work.querySelector(".featured-work")!.getBoundingClientRect();
      const cards = [...work.querySelectorAll(".featured-work > article")].map(entry => entry.getBoundingClientRect());
      const rows = [...work.querySelectorAll(".study-entry")].map(entry => entry.getBoundingClientRect());
      return { aligned: cards.every(card => Math.abs(card.top - cards[0].top) < 1), paired: Math.abs(rows[0].top - rows[1].top) < 1, separated: rows[0].top >= features.bottom };
    });
    expect(scan.aligned).toBe(true);
    expect(scan.paired).toBe(true);
    expect(scan.separated).toBe(true);
  }
  for (const title of ["World History Atlas", "RailClear", "RAMS Workbench", "SE Learning Quest"]) {
    const link = page.getByRole("link", { name: `View full screenshot: ${title}`, exact: true });
    await expect(link).toHaveAttribute("href", /^\.\/project-previews\/.*\.(?:webp|jpg)$/);
    await link.scrollIntoViewIfNeeded();
    await expect.poll(() => link.locator("img").evaluate((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
    if (["RailClear", "RAMS Workbench"].includes(title)) {
      const entry = page.locator(".study-entry").filter({ has: page.getByRole("heading", { name: title, exact: true }) });
      await expect(entry.getByRole("link")).toHaveCount(2);
      await expect(entry.locator(".project-limit")).toContainText("qualification");
      await expect(entry.locator("figcaption")).toContainText("Synthetic example");
    }
    await link.focus();
    const beforeImageScroll = await page.evaluate(() => scrollY);
    await link.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close preview" })).toBeFocused();
    await expect.poll(() => dialog.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(720);
    await dialog.getByRole("button", { name: "Actual size" }).click();
    await expect(dialog.getByRole("button", { name: "Fit to window" })).toHaveAttribute("aria-pressed", "true");
    await dialog.getByRole("button", { name: "Fit to window" }).click();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport();
    await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - beforeImageScroll)).toBeLessThan(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("paired About and Writing navigation retains the chosen chapter", async ({ page }) => {
  for (const id of ["writing", "about", "writing", "work"]) {
    if (await page.locator(".site-nav__toggle").isVisible()) await page.locator(".site-nav__toggle").click();
    await page.locator(`.site-nav a[href="#${id}"]`).click();
    await expectVisibleTargetFocus(page, id, false);
    await expect(page.locator(`.site-nav a[href="#${id}"]`)).toHaveAttribute("aria-current", "location");
  }
  // Modeling Lab is now a featured project; its image is visible before disclosure.
  // Tailoring retains its detailed preview inside disclosure. Both remain real links.
  for (const title of ["Modeling Lab", "SE Tailoring Model"]) {
    const entry = page.locator("#work article").filter({ has: page.getByRole("heading", { name: title, exact: true }) });
    await entry.locator("summary").click();
    await expect(entry.getByRole("link", { name: `View full screenshot: ${title}`, exact: true })).toBeVisible();
    await entry.locator("summary").click();
  }
  for (const id of ["practice", "experience"]) {
    await page.goto(`./#${id}`);
    const summary = page.locator(`#${id} > summary`);
    await expect(summary).toBeVisible();
    await summary.click();
    await expect(page.locator(`#${id}`)).toHaveAttribute("open", "");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("light and dark chapters retain readable text and links", async ({ page }) => {
  const colors = await page.evaluate(() => {
    const luminance = (color: string) => {
      const [r,g,b] = color.match(/[\d.]+/g)!.slice(0,3).map(value => {
        const c = Number(value) / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return .2126*r + .7152*g + .0722*b;
    };
    const contrast = (a: string,b: string) => {
      const x=luminance(a),y=luminance(b);
      return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
    };
    return ["work","playground","about","writing","contact"].map(id => {
      const section=document.getElementById(id)!;
      const background=getComputedStyle(section).backgroundColor;
      const targets=[...section.querySelectorAll("p, h2, h3, a, summary")].filter(element => element.getBoundingClientRect().height>0 && element.textContent!.trim().length>0);
      return {id,background,minimumContrast:Math.min(...targets.map(element => {
        let parent:Element|null=element;
        let surface=getComputedStyle(parent).backgroundColor;
        while(parent && surface==="rgba(0, 0, 0, 0)") { parent=parent.parentElement; if(parent) surface=getComputedStyle(parent).backgroundColor; }
        return contrast(getComputedStyle(element).color,surface);
      }))};
    });
  });
  expect(new Set(colors.filter(item=>item.id!=="playground").map(item=>item.background)).size).toBe(1);
  expect(colors.find(item=>item.id==="playground")!.background).not.toBe(colors[0].background);
  for(const item of colors) expect(item.minimumContrast,item.id).toBeGreaterThanOrEqual(4.5);
});

test("preview contains keyboard focus, supports native originals, and reopens", async ({ page }) => {
  const trigger=page.getByRole("link",{name:"View full screenshot: World History Atlas",exact:true});
  for(let cycle=0;cycle<2;cycle++) {
    await trigger.click();
    const dialog=page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("link",{name:"Open original"})).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button",{name:"Close preview"})).toBeFocused();
    await dialog.getByRole("button",{name:"Close preview"}).click();
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow","hidden");
  }
  await trigger.click();
  await page.getByRole("dialog").getByRole("link",{name:"Open original"}).click();
  await expect(page).toHaveURL(/\/project-previews\/[^/]+\.(?:webp|jpg)$/);
  await page.goBack();
  await expect(trigger).toBeInViewport();
});

test("mobile menu dismisses with Escape, outside press and focus leaving", async ({ page }) => {
  const toggle=page.locator(".site-nav__toggle");
  if(!await toggle.isVisible()) return;
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded","true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded","false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator(".hero__visual img").click();
  await expect(toggle).toHaveAttribute("aria-expanded","false");
  await toggle.click();
  await page.locator('.site-nav a[href="#contact"]').focus();
  await page.keyboard.press("Tab");
  await expect(toggle).toHaveAttribute("aria-expanded","false");
});

test("uncached preview reserves its frame while the full image loads", async ({ page }) => {
  let release!:()=>void;
  const gate=new Promise<void>(resolve=>{release=resolve;});
  await page.route("**/project-previews/world-history-atlas-2026-10-29.jpg",async route=>{await gate;await route.continue();});
  await page.getByRole("link",{name:"View full screenshot: World History Atlas",exact:true}).click();
  const dialog=page.getByRole("dialog");
  await expect(dialog.getByRole("status")).toContainText("Loading full-resolution image");
  await expect(dialog.getByRole("button",{name:"Actual size"})).toBeDisabled();
  const frame=await dialog.locator(".image-viewer__surface").boundingBox();
  expect(frame!.height).toBeGreaterThan(100);
  release();
  await expect(dialog.getByRole("status")).toHaveCount(0);
  await expect(dialog.getByRole("button",{name:"Actual size"})).toBeEnabled();
  const loaded=await dialog.locator(".image-viewer__surface").boundingBox();
  expect(Math.abs(loaded!.height-frame!.height)).toBeLessThan(2);
  await dialog.getByRole("button",{name:"Close preview"}).click();
});

test("desk links reach their project and preserve navigation context", async ({ page }) => {
  for(const [name,id,chapter] of [["Models","modeling-lab","work"],["History","world-atlas","work"],["Play","asterfall","playground"]]) {
    await page.goto(".");
    const link=page.locator(".desk-links").getByRole("link",{name,exact:true});
    await link.focus();
    await page.keyboard.press("Enter");
    await expectVisibleTargetFocus(page,id);
    await expect(page.locator(`.site-nav a[href="#${chapter}"]`)).toHaveAttribute("aria-current","location");
  }
});

test("gallery browses all projects and returns to the original trigger", async ({ page }) => {
  const trigger=page.getByRole("link",{name:"View full screenshot: World History Atlas",exact:true});
  await trigger.click();
  const dialog=page.getByRole("dialog");
  for(const title of ["Railway Anatomy","Engine Anatomy","RailClear","RAMS Workbench","Modeling Lab","SE Tailoring Model","Asterfall: The Last Relay","World History Atlas"]) {
    await dialog.getByRole("button",{name:"Next project",exact:true}).click();
    await expect(dialog.getByRole("heading")).toHaveText(title);
    await expect(dialog.getByRole("button",{name:"Next project",exact:true})).toBeFocused();
    await expect(dialog.getByRole("button",{name:"Actual size"})).toBeEnabled();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("heading")).toHaveText("Asterfall: The Last Relay");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading")).toHaveText("World History Atlas");
  await dialog.getByRole("button",{name:"Actual size"}).click();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading")).toHaveText("World History Atlas");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow","hidden");
});
