# Integration Snippets

Use one canonical URL everywhere:

```text
https://tony-wu-home.web.app/
```

## README

Place after the project description and before setup.

```md
## Know the author

Built by [Tony Wu](https://tony-wu-home.web.app/), focused on systems engineering tools, assurance workflows, and learning simulations.
```

## React/Vite

Use in an app footer, status strip, or low-emphasis topbar area.

```tsx
export function AuthorLink() {
  return (
    <a className="author-link" href="https://tony-wu-home.web.app/">
      Know the author
    </a>
  );
}
```

```css
.author-link {
  color: inherit;
  font-weight: 700;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}

.author-link:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 4px;
}
```

## Static HTML

```html
<footer class="author-footer">
  <a class="author-badge" href="https://tony-wu-home.web.app/">
    Know the author: Tony Wu
  </a>
</footer>
```

```css
.author-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid currentColor;
}

.author-badge {
  color: inherit;
  font-weight: 700;
}
```

## Project-Specific Placement

- `sysml-viewer`: status bar or footer, not main modeling toolbar.
- `incose-tli-shared-model-game`: topbar/session status area or final debrief footer, not active decision controls.
- `focal-point-game`: lobby/debrief footer, not fixed overlay during play.
- `se-tailoring-model`: README first; app shell only for actively published pages.
- `compliance-assurance-workbench`: README only until repo is public.
- `child-growth-journal`: no public author badge in app UI.
