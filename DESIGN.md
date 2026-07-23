# Tony Wu Home Design Direction

## Surface

Public author/about page for a full-time systems engineering practitioner, professional society contributor, and operator-builder. Main users: industry peers, conference contacts, collaborators, future advisory fits, and people arriving from project READMEs.

## Visual Thesis

Artifact-first editorial technical practice page. Dark workbench hero, briefing-board art, exposed grid, restrained signal colors, real public-project proof, field-note structure, and delivery evidence without starting as a CV or active consulting funnel.

## Rules

- Lead with `Tony Wu`, credentials, and a personal practice thesis: complex infrastructure programs need usable systems engineering, evidence, readiness, and decision support.
- Position Tony as a practitioner-builder working with a consultant's lens. Do not imply an active independent consulting shop.
- Avoid generic developer portfolio language.
- Keep client/program specifics conservative unless explicitly cleared.
- Use exact names for Tony's public projects and publicly documented professional programs. Never invent generic case studies to fill a visual slot.
- Page order: hero, selected public work, about/now, practice, writing and talks, selected experience, contact.
- Show the full personality arc: full-time rail systems engineer, technical leader, AI side-project builder, and INCOSE practice contributor.
- Keep collaboration language low-pressure: speaking, writing, professional society work, workshops, independent review, and selective future advisory.
- Keep the reusable author badge available for other repos, but do not render it on the homepage.
- Use `docs/branding-image-prompts.md` as the sidecar prompt package for GPT-Image-2 brand, hero, and lab imagery.
- Use dense evidence panels and rows, not a generic card wall.
- Keep author badge quiet and reusable.
- No decorative blobs, hype gradients, floating badge overlays, or modal-style author promos.
- No portrait in the primary page direction. The work is the visual identity. Revisit portraiture only with a deliberately commissioned editorial asset that avoids photorealistic or uncanny generated likenesses.
- Motion donors: asymmetric editorial composition, ordered hero reveal, hero-to-proof transition, and layered interface depth from the local MotionSites-derived pattern library.
- Motion should feel like a systems briefing coming into focus: one 450-900 ms semantic hero entrance, a compact mobile-menu transition, and bounded hover/focus depth on real project evidence.
- No looping spectacle, cursor chase, particles, perpetual float, scroll hijacking, or animation that hides content when JavaScript is unavailable.
- `prefers-reduced-motion` renders the identical final hierarchy immediately, removes scroll-linked transforms, and keeps every action available.
- HyperFrames belongs to separate video or social assets, not the live responsive page runtime.
- Use real captures from public project interfaces as the primary work evidence. Keep screenshots local, named by project, and paired with meaningful alt text.
- Mobile navigation is a visible menu control, not a hidden horizontal rail. It must close after selection and with Escape.
- Keep the live site static. Add a runtime backend only for a demonstrated interaction that cannot be handled at build time.

## Tokens

- Ink: `#f7f2e8`
- Carbon: `#0b0d0d`
- Paper: `#ede5d6`
- Panel: `#1d201e`
- Line: `rgba(247, 242, 232, 0.18)`
- Signal: `#36d29c`
- Cyan: `#4dc9ff`
- Violet: `#bda4ff`
- Amber: `#f2aa45`
- Red: `#f26d5b`
- Focus: `#f2aa45`
- Primary type: self-hosted IBM Plex Sans Variable

## QA Baseline

- Desktop and mobile screenshots stored in `docs/qa/`.
- Build gate: `npm run build`.
- Security gate: `npm run audit` reports no high-severity advisories.
- Responsive gate: 320, 375, 414, 768, and 1440 CSS pixels with no horizontal page overflow, clipped primary action, sticky collision, or unreachable navigation item.
- Browser gate: no console errors; hero, project spotlight and index, about/now, practice, writing, experience, contact, and anchors render cleanly.
- Interaction gate: mobile menu opens, closes after selection, closes with Escape, exposes Contact without horizontal scrolling, and retains visible keyboard focus.
- Motion gate: content remains visible without JavaScript and under reduced motion; full-page capture does not depend on IntersectionObserver state.
