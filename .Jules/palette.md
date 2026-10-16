## 2026-10-13 - Enhance Keyboard Focus and Link Context
**Learning:** Adding programmatic focus support to hash-target sections (`tabIndex={-1}`) causes browsers to draw a default focus ring around entire layout containers. This can be visually jarring and look like a bug.
**Action:** When adding `tabIndex={-1}` to structural elements like `<main>` or `<section>` to fix "skip link" navigation, always remember to add `outline: none;` on their focus state in CSS to maintain visual polish without breaking programmatic focus.

## 2026-10-13 - Screen Reader Context on Reusable Components
**Learning:** Reusable card components (like `project-entry`) often reuse generic link labels (like "Open project" or "Read"). Screen reader users navigating by links-list lose all context.
**Action:** Append the contextual title to the `aria-label` of generic links (`aria-label={\`Open project: \${project.title}\`}`) to ensure every link's purpose is unambiguous out of context.

## 2026-10-14 - Semantic Containers and Redundant List Numbers
**Learning:** Screen readers often ignore `aria-label` when applied to non-semantic elements like `<div>` unless they are explicitly given a role (like `role="group"`). Additionally, when using ordered lists (`<ol>`), adding visual decorative numbers in spans causes screen readers to read the number twice (once natively, once from the DOM).
**Action:** Always add `role="group"` to generic `<div>` containers if giving them an `aria-label`, and always add `aria-hidden="true"` to explicitly styled numeral spans inside natively numbered lists (`<ol>`).
