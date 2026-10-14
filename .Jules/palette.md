## 2026-10-13 - Enhance Keyboard Focus and Link Context
**Learning:** Hash-target sections (`tabIndex={-1}`) become the active element after skip links and section navigation. Suppressing their focus outline hides the destination from keyboard users.
**Action:** Keep a visible, high-contrast inset focus ring on focused `<main>` and `<section>` targets, including programmatic focus. Use the dark ring on paper and signal surfaces, and keep the target below the sticky navigation. Run `npm run build && npm run test:focus` to check the rendered behavior.

## 2026-10-13 - Screen Reader Context on Reusable Components
**Learning:** Reusable card components (like `project-entry`) often reuse generic link labels (like "Open project" or "Read"). Screen reader users navigating by links-list lose all context.
**Action:** Append the contextual title to the `aria-label` of generic links (`aria-label={\`Open project: \${project.title}\`}`) to ensure every link's purpose is unambiguous out of context.
