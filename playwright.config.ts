import { defineConfig } from "@playwright/test";

const testPort = Number(process.env.HOMEPAGE_TEST_PORT ?? 4273);
const baseURL = `http://127.0.0.1:${testPort}/`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL,
    browserName: "chromium",
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
    trace: "retain-on-failure",
  },
  projects: [320, 375, 414, 768, 1440].flatMap((width) =>
    (["no-preference", "reduce"] as const).map((reducedMotion) => ({
      name: `${width}-${reducedMotion}`,
      use: { viewport: { width, height: 900 }, contextOptions: { reducedMotion } },
    })),
  ),
  webServer: {
    command: `npm run preview -- --port ${testPort} --strictPort`,
    url: baseURL,
    reuseExistingServer: false,
  },
});
