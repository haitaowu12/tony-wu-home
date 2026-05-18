# Tony Wu Home

Standalone personal brand and author page for Tony Wu, P.Eng, MIRSE, PMP, CSEP.

This is a static Vite + React + TypeScript site. It is designed as the canonical public profile page for linking from project READMEs, project footers, conference materials, and pet-project pages.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content Source

Primary content lives in:

```text
src/content/profile.ts
```

Keep the public page conservative:

- Use public or already-cleared facts.
- Keep client-specific delivery details anonymized unless explicitly approved.
- Mark prototypes and local/private projects clearly.
- Do not publish private vault, family, finance, or internal meeting details.
- Update the canonical URL before adding badges across project repos.

## Canonical Author Link

Live URL:

```text
https://haitaowu12.github.io/tony-wu-home/
```

README snippet:

```md
Built by [Tony Wu](https://haitaowu12.github.io/tony-wu-home/) - systems engineering tools, assurance workflows, and learning simulations.
```

Static HTML snippet:

```html
<a class="author-badge" href="https://haitaowu12.github.io/tony-wu-home/">
  Know the author: Tony Wu
</a>
```

React snippet:

```tsx
<a className="author-link" href="https://haitaowu12.github.io/tony-wu-home/">
  Know the author
</a>
```

## Integration Order

1. Publish this page first.
2. Add README-only links to public repos.
3. Add quiet UI footer/topbar links only where they do not interrupt the main workflow.
4. Defer shared package/component work until reuse proves maintenance value.

Detailed snippets: [docs/integration-snippets.md](docs/integration-snippets.md).

## QA Evidence

Rendered QA artifacts are stored in:

```text
docs/qa/
```

Current checks cover desktop, mobile, console health, and the live GitHub Pages route.
