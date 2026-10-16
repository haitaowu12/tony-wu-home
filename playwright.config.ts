import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: "http://127.0.0.1:4173/",
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
    command: "npm run preview -- --port 4173 --strictPort",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: !process.env.CI,
  },
});
