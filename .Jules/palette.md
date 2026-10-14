## 2026-10-13 - Enhance Keyboard Focus and Link Context
**Learning:** Adding programmatic focus support to hash-target sections (`tabIndex={-1}`) causes browsers to draw a default focus ring around entire layout containers. This can be visually jarring and look like a bug.
**Action:** When adding `tabIndex={-1}` to structural elements like `<main>` or `<section>` to fix "skip link" navigation, always remember to add `outline: none;` on their focus state in CSS to maintain visual polish without breaking programmatic focus.

## 2026-10-13 - Screen Reader Context on Reusable Components
**Learning:** Reusable card components (like `project-entry`) often reuse generic link labels (like "Open project" or "Read"). Screen reader users navigating by links-list lose all context.
**Action:** Append the contextual title to the `aria-label` of generic links (`aria-label={\`Open project: \${project.title}\`}`) to ensure every link's purpose is unambiguous out of context.

## 2026-10-14 - Redundant Links on Cards
**Learning:** Reusable card components often have multiple links pointing to the same destination (e.g. an image link and a text link). This creates redundant tab stops for keyboard users and repetitive announcements for screen reader users.
**Action:** Add `tabIndex={-1}` and `aria-hidden="true"` to the redundant links (usually the image link) to remove them from the tab order and screen reader flow. Use `:focus-within` on the parent container to maintain visual hover/focus effects when the remaining text link is focused.
