import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Server-side render entry used at build time only.
 * Produces the static HTML shell so the page is readable without JavaScript
 * (DESIGN.md motion gate) and so the browser can discover the hero image
 * before any script executes.
 */
export function renderApp(): string {
  return renderToString(<App />);
}
