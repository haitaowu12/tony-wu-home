# Personal homepage redo — decision and evidence

## Brief established before drawing candidates

Audience: people arriving from Tony's projects, professional/community work and writing. Introduce Tony as a person with systems-engineering practice AND independent interests. Help visitors find a project to explore, learn about his background, or connect. This is not a new consultancy or single-product landing page.

Baseline to beat: `846987908733abafe988369003dab32b113d8606`. Rejected redesign: `affe497e55bf4fb6be89c6a85e7864cd9de0b1cd` / PR #37. The shared main frontend workflow used for the redo is Second Brain revision `98440d88bef426a4b2ff5151c937758678da5b26`, merged through #173. Generic skills stay outside this repository.

Preserve: dominant Tony Wu identity, warm dark opening, illustrated multi-interest workspace, history/learning breadth, project image enlargement, prototype/qualification labels, author/source credits, existing public facts and destinations. Change: slow project scanning, small supporting text, generic new slogans and the engineering-only first impression of #37. Avoid: microscopic whole-application screenshot as hero, unannounced employer changes, private family/client/financial details, or test counts presented as design success.

Criteria fixed BEFORE selection:
1. Tony's name remains the largest identity text, not replaced by a proposition.
2. Engineering, history and learning remain discoverable as one person's interests.
3. At 375x900, the opening includes a useful action and recognizable storytelling imagery; credentials/abstract copy do not consume the first screen.
4. The first project region presents identifiable work and a direct destination without relying on miniature app controls to explain it.
5. Preserve qualifications, attribution, keyboard access, responsive behavior and real destinations.

## Exact reference shortlist

Inspected accessible Refero screenshots on 30 October 2026 (Vancouver). These are desktop capture observations, not original-site journeys or verified mobile behavior. Provider-generated token values are not measured specifications. No reference artwork or fonts are imported into the website.

| Reference | Useful observed relationship | Deliberate limit |
|---|---|---|
| [Daniel Sun](https://styles.refero.design/style/8d1b6c70-e045-4ce6-891d-aba5d5c00e0d) / [capture](https://images.refero.design/styles/refero.design/image/57c49e73-663a-4330-be9f-5d693a82de46.jpg) | Owner's name is the dominant typographic object, with a short introduction above | Not the huge empty beam region, condensed face or branding-service pitch |
| [Josh Warner](https://styles.refero.design/style/e2e9b80c-b548-4f86-a4d7-7a6b07d1c2e1) / [capture](https://images.refero.design/styles/refero.design/image/e706ea3a-5c5c-42fb-abb8-d248e051fa26.jpg) | One artwork carries the opening; professional and artistic interests coexist | Not the small identity, hiring cues or copied artwork. Use Tony's existing illustration |
| [Dul Zorigoo](https://styles.refero.design/style/c8ca6c83-3197-4b19-af1c-b29d6f829c5f) / [capture](https://images.refero.design/styles/refero.design/image/218fed06-11af-4f2a-91ca-81385c0783ea.jpg) | Photography and product experiments coexist in an image-led archive | The tiny-name/sidebar opening and dense miniature images are not the governing direction |

The accepted baseline remains the identity foundation. Daniel Sun informs name hierarchy; Josh Warner informs the role of personal-world artwork; Dul's archive is a limited breadth reference, not another whole identity to mix in.

## Pre-selection comparison and decision

The same short biography, actual illustration, actions and three projects were rendered in two compositions at 1440x900 and 375x900: **A, name-led illustrated studio**, and **B, image-led cover with overlaid name and introduction below**. Both included the first project region.

Initial study commit: `a2583080516d2976de51e5cf60024710157e82e7`, run `41170328758`. B's filtered image obscured its name because of stacking. That implementation defect was repaired before judging design merit.

Repaired study commit: **`ab0458356fc2972e6ed6812125f01dee636c0b35`**, [run 41170739620](https://github.com/haitaowu12/tony-wu-home/actions/runs/41170739620), [capture artifact](https://github.com/haitaowu12/tony-wu-home/actions/runs/41170739620/artifacts/13031187013), SHA-256 `d09688c7da9348bfa5debe32d89294623fb870cb52e02e1a83f4dc41765863e3`. The artifact contains both viewports, full slices, first-project captures and the three exact reference JPEGs. The [study source](https://github.com/haitaowu12/tony-wu-home/blob/ab0458356fc2972e6ed6812125f01dee636c0b35/tests/fixtures/design-directions.html) and [capture test](https://github.com/haitaowu12/tony-wu-home/blob/ab0458356fc2972e6ed6812125f01dee636c0b35/tests/design-study.spec.ts) remain recoverable at that commit. They are removed from the final tree rather than becoming production routes or recurring external-image downloads.

**Author selected A after inspecting the repaired captures, before editing production source.** A retains the name on an untextured field and the illustration's aerospace/rail sketches, modeling laptop and learning materials together. B's wide desktop crop loses much of that context and puts text over competing image detail. On the phone, B postpones the introduction and action until after its large image. A is an evolution of the baseline, not an unrelated rebrand.

Production changes: shorten theme links to Models / History / Play; keep an illustrated split opening; introduce Atlas, Modeling Lab and Asterfall together; put deeper engineering studies below; make the role/credentials readable in About; keep published versus developing writing; remove the rejected abstract slogans and duplicate editorial.ts content layer. Screenshots remain dated artifact previews with full-source enlargement, not freshly verified application behavior.

## Verification contract

The original keyboard, contrast, overflow, preview, focus-return and reduced-motion behaviors remain covered. Two intentional expectation changes in focus.spec.ts: the old single-Atlas-to-study distance is replaced by three-feature alignment and study separation, and Modeling Lab's selector follows it into the featured region. Neither is a claim that a test selected the best order. The former engineering-first editorial test is replaced with identity/breadth/destination/scope and no-JavaScript tests. Production captures at 1440x900 and 375x900 are taken after actual images load.

Build, final captured pixels and browser-run results must be recorded against the completed source head in PR #38. No independent reviewer, physical-device/Safari validation, comprehension study, general skill-effectiveness result or owner approval is claimed.

## Release boundary

The redo is reviewable on PR #38. Source, visual acceptance and live publication are separate. This work does not publish the rejected main or change gh-pages. Do not promote a preference-sensitive redo solely because technical checks pass.


## Unslop refinement — October 31, 2026

The approved Unslop trial was applied to the current studio implementation. Captions/actions use 14px, small labels use at least 13px, and tracked capitals and tight small-title tracking are removed. Engineering previews lose their second tinted mat and have 320px desktop frames; tablet and phone bounds remain. The existing portrait-free illustration, three-project introduction, project destinations, study qualifications, gallery, and content remain. Motion uses the existing curve with a 400ms, 8px name entrance. The taller desktop engineering row is the reading trade-off.

Method credit: [Unslop by Damir Sokolovsky](https://github.com/heydamir/unslop), CC BY 4.0. The reusable method remains in the shared development workflow; no skill package or runtime is copied into this site.

Phone action alignment uses explicit text/arrow line heights and 12px horizontal button padding, avoiding fallback-font height differences and a second row at 375px. Existing alignment tests retain their original expectation.
