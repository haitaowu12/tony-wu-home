## 2026-10-13 - Enhance Keyboard Focus and Link Context
**Learning:** Hash-target sections (`tabIndex={-1}`) become the active element after skip links and section navigation. Suppressing their focus outline hides the destination from keyboard users.
**Action:** Keep a visible, high-contrast inset focus ring on focused `<main>` and `<section>` targets, including programmatic focus. Use the dark ring on paper and signal surfaces, and keep the target below the sticky navigation. Run `npm run build && npm run test:focus` to check the rendered behavior.

## 2026-10-13 - Screen Reader Context on Reusable Components
**Learning:** Reusable card components (like `project-entry`) often reuse generic link labels (like "Open project" or "Read"). Screen reader users navigating by links-list lose all context.
**Action:** Append the contextual title to the `aria-label` of generic links (`aria-label={\`Open project: \${project.title}\`}`) to ensure every link's purpose is unambiguous out of context.

## 2026-10-14 - Redundant Links on Cards
**Learning:** Reusable card components often have multiple links pointing to the same destination (e.g. an image link and a text link). This creates redundant tab stops for keyboard users and repetitive announcements for screen reader users.
**Action:** Add `tabIndex={-1}` and `aria-hidden="true"` to the redundant links (usually the image link) to remove them from the tab order and screen reader flow. Use `:focus-within` on the parent container to maintain visual hover/focus effects when the remaining text link is focused.

## 2026-10-14 - Semantic Containers and Redundant List Numbers
**Learning:** Screen readers often ignore `aria-label` when applied to non-semantic elements like `<div>` unless they are explicitly given a role (like `role="group"`). Additionally, when using ordered lists (`<ol>`), adding visual decorative numbers in spans causes screen readers to read the number twice (once natively, once from the DOM).
**Action:** Always add `role="group"` to generic `<div>` containers if giving them an `aria-label`, and always add `aria-hidden="true"` to explicitly styled numeral spans inside natively numbered lists (`<ol>`).

## 2026-10-16 - File Type Context and Pending Links
**Learning:** When linking directly to non-HTML resources (like PDFs), screen reader users and visual users can be disoriented if they expect a webpage. Additionally, pending links need semantic representation without breaking layout styles.
**Action:** Append the file type visually and in the `aria-label` for direct file links (e.g., ` (PDF)`). Render pending links as plain text in their existing content context, with sufficient contrast on the section background; do not imply an unavailable navigation action.

## 2026-10-17 - Focus Management on Dismissible Elements
**Learning:** When a keyboard user dismisses an interactive container (like a mobile menu) using the `Escape` key, keyboard focus drops to the document `<body>` if the focused element within the container is hidden or removed. This disrupts the navigation flow.
**Action:** Always programmatically return focus (`element.focus()`) to the trigger element that originally opened the container when it is dismissed.
