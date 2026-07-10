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
- Motion should feel like a systems briefing coming into focus: one 450-900 ms semantic hero entrance, one native-scroll hero-to-proof handoff, bounded depth in real project rows, restrained section reveals, and hover/focus affordance that helps scanning.
- No looping spectacle, cursor chase, particles, perpetual float, scroll hijacking, or animation that hides content when JavaScript is unavailable.
- `prefers-reduced-motion` renders the identical final hierarchy immediately, removes scroll-linked transforms, and keeps every action available.
- HyperFrames belongs to separate video or social assets, not the live responsive page runtime.

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

## QA Baseline

- Desktop and mobile screenshots stored in `docs/qa/`.
- Build gate: `npm run build`.
- Browser gate: no console errors; hero, practice section, principles section, field notes, lab/project list, author badge, and anchors render cleanly.
