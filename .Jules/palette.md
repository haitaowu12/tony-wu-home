## 2026-10-13 - Enhance Keyboard Focus and Link Context
**Learning:** Adding programmatic focus support to hash-target sections (`tabIndex={-1}`) causes browsers to draw a default focus ring around entire layout containers. This can be visually jarring and look like a bug.
**Action:** When adding `tabIndex={-1}` to structural elements like `<main>` or `<section>` to fix "skip link" navigation, always remember to add `outline: none;` on their focus state in CSS to maintain visual polish without breaking programmatic focus.

## 2026-10-13 - Screen Reader Context on Reusable Components
**Learning:** Reusable card components (like `project-entry`) often reuse generic link labels (like "Open project" or "Read"). Screen reader users navigating by links-list lose all context.
**Action:** Append the contextual title to the `aria-label` of generic links (`aria-label={\`Open project: \${project.title}\`}`) to ensure every link's purpose is unambiguous out of context.

## 2026-10-16 - External Link Context for Screen Readers
**Learning:** Users navigating with a screen reader often lose their place in a site when they interact with external links that open in the same tab, or open in a new tab without explicit warning. Many links in portfolios point to external platforms (publications, social media).
**Action:** When a link points externally (e.g., starts with `http`), always add `target="_blank" rel="noopener noreferrer"` and explicitly append "(opens in a new tab)" to the `aria-label` to ensure context isn't lost for assistive technology users.
