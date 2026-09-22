import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serverEntry = path.join(root, "dist/server/entry-server.js");
const htmlPath = path.join(root, "dist/index.html");

const { renderApp } = await import(serverEntry);
let appHtml = renderApp();

// React 19 derives a preload <link> from <img fetchPriority="high"> and hoists
// it, which renderToString emits at the start of the component output (inside
// #root). index.html already declares that preload in <head>, where the browser
// discovers it earliest, so drop the duplicate instead of shipping two hints.
appHtml = appHtml.replace(/^<link rel="preload"[^>]*\/>/, "");

const html = await readFile(htmlPath, "utf8");
const placeholder = '<div id="root"></div>';

if (!html.includes(placeholder)) {
  throw new Error("Prerender failed: empty #root placeholder not found in dist/index.html");
}

const rendered = html.replace(placeholder, `<div id="root">${appHtml}</div>`);
await writeFile(htmlPath, rendered, "utf8");

// The SSR bundle is a build-time artifact only; GitHub Pages must not serve it.
await rm(path.join(root, "dist/server"), { recursive: true, force: true });

console.log(
  `prerendered ${appHtml.length} bytes into dist/index.html (${rendered.length} bytes total)`,
);
