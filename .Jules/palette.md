## 2026-10-13 - Enhance Keyboard Focus and Link Context
**Learning:** Adding programmatic focus support to hash-target sections (`tabIndex={-1}`) causes browsers to draw a default focus ring around entire layout containers. This can be visually jarring and look like a bug.
**Action:** When adding `tabIndex={-1}` to structural elements like `<main>` or `<section>` to fix "skip link" navigation, always remember to add `outline: none;` on their focus state in CSS to maintain visual polish without breaking programmatic focus.

## 2026-10-13 - Screen Reader Context on Reusable Components
**Learning:** Reusable card components (like `project-entry`) often reuse generic link labels (like "Open project" or "Read"). Screen reader users navigating by links-list lose all context.
**Action:** Append the contextual title to the `aria-label` of generic links (`aria-label={\`Open project: \${project.title}\`}`) to ensure every link's purpose is unambiguous out of context.
## 2026-10-14 - Accessible External Links
**Learning:** Adding `target="_blank"` to external links without proper aria-labels causes context shift issues for screen reader users. Also, adding custom CSS classes like `.sr-only` violates the rule against adding custom CSS.
**Action:** When adding `target="_blank"`, ensure that `aria-label`s are updated to include `(opens in a new tab)` or equivalent text to announce the context shift. Do not add custom CSS classes for screen-reader-only text; use existing `aria-label` support instead.
