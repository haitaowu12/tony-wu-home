import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/ibm-plex-sans";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Missing #root container");
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The build pre-renders the page, so hydrate the existing markup. The
// createRoot branch only runs if the shell was served without content.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
