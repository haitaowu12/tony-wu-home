# Homepage content review — 21 September 2026

## Assessment

The delivery-focused practitioner positioning still fits. The published page understates the connection between technical leadership, responsible AI, and learning through practice. Its publication status is outdated, its learning-game description predates Asterfall, and its About / Now section contains no current work.

## Changes and evidence

| Area | Update | Evidence |
| --- | --- | --- |
| AI-augmented leadership paper | Lead the writing section with the published paper; link both entries to Wiley. Record first online publication on 11 September 2026, volume 36(1), pages 459–481, and DOI. Describe six retained pillars plus a seventh on responsible technology use. | [Publisher record and abstract](https://incose.onlinelibrary.wiley.com/doi/10.1002/iis2.70143), directly inspected. The issue is dated July; the first online publication date is September. |
| SE Learning Quest | Introduce Asterfall and its 24-quest Classic campaign. Remove the obsolete Phaser tag and earlier homepage preview from the rendered entry. Retain the image files for history. | [Public README](https://github.com/haitaowu12/SE-Learning-Quest) and [deployed game](https://haitaowu12.github.io/SE-Learning-Quest/), directly inspected. Local work is ahead of the public repository, so no later chapter count is advertised. |
| Personal Growth Copilot | Add a selected-work entry labelled Public alpha, linking to the repository. Identify the offline lesson as part of the development version. | [Public README](https://github.com/haitaowu12/personal-growth-copilot), read through the GitHub API. The development candidate and earlier installable tag are distinct; learning efficacy and production qualification remain unproven. |
| SysML Viewer | Clarify supported-subset scope and distinguish the public browser prototype from AI workflows requiring a local service. | Owner README in the local SysML Viewer repository; [public repository](https://github.com/haitaowu12/sysmlv2_viewer). No new deployment or conformance claim. |
| About / Now | Add dated current work, connecting the published paper, learning game, reflective-learning alpha, and ongoing tailoring research. | The public sources above and the owner's current SE Tailoring Model manuscript/release records. Research is described as in progress, without version or effectiveness claims. |
| Search and sharing | Align page descriptions with the updated content. | Same sources and boundaries as the visible page. |

## Editorial boundaries

Keep the existing professional title and credentials; this review does not establish a new role or credential. Keep private assessments, internal delivery material, restricted methods, and unpublished project details out of public copy. Active private work is not automatically public portfolio material. Preserve the existing design direction and label alpha/prototype work explicitly.

The workspace already contained layout, navigation, responsive-image, and prerender changes before this review. Those changes are preserved. This content update is local; it does not establish that the published homepage has changed.

## Validation

- `npm run build` passes, including TypeScript and static prerendering. Both paper links and the added project entry are present in rendered HTML.
- `npm run audit` reports zero vulnerabilities after compatible transitive updates to nanoid 3.3.19 and PostCSS 8.5.28. No top-level dependency ranges changed in this review.
- In-app browser checks at 320, 375, 414, 768, and 1440 pixels show no horizontal overflow. Removing the fixed body minimum width resolved a 15-pixel overflow at 320 pixels with a persistent scrollbar.
- Mobile menu open, selection-close, and Escape-close checks pass. Desktop writing and mobile About content were inspected; the updated paper date, both publisher links, and public-alpha label render correctly.
- No browser warnings or errors were observed. `git diff --check` passes.
- This is a content-refresh check, not a new end-to-end qualification of every linked project or every pre-existing workspace change. No commit, push, or deployment was performed.

## Follow-up — 22 September: papers and SLE development

At Tony's request, the field notes now include the other current paper topics and continuing INCOSE–APTA SLE development. About / Now and the writing-section introduction reflect that scope. Unpublished entries remain in field notes; the public publication record is unchanged.

| Entry | Basis and editorial decision |
| --- | --- |
| SE tailoring | Retain the separate methods-paper entry and make its justification, reassessment, and evaluation scope clearer. |
| Applying Adaptability Practices to Transit Concepts of Operations | Use the 19 September current project entry and author-directed paper-direction proposal in the Second Brain's `sources/projects/adaptsem/workstreams/long-horizon-conops/`. Preserve operating intent and justified reconsideration as the subject. |
| Designing for the Next Upgrade | Use the latest paper direction in the task **Research SLE Standard Development**, followed by Tony's manual abstract revisions in **Humanize transit paper abstracts**. Describe a case-informed procurement application, without promising an executed study or a complete worked example. |
| Beyond System Completion | Use the same task sequence, retaining Tony's later choices of mission analysis, service/performance, and operating and maintenance arrangements. Keep present operational suitability and subsequent adaptation in scope. |
| INCOSE–APTA SLE | Use Tony's explicit continuation request, the SLE discussion, and the Second Brain working candidate in PR #23 at `fadd10de2fa994ca52bc39ae4b9547813513cbb8`, including `workspace/projects/incose-apta-sle.md` and `sources/projects/incose-apta-sle/restart-v0.1-working-baseline.md`. This is an open-PR development source, not merged local authority or approved association content. Describe the parent framework, practice modules, tailoring, responsibilities, evidence, and volunteer continuity without claiming appointments, sponsor approval, publication, or a finished standard. |

The newer discussion reframes the earlier broad rail/adoptability topic list into the two applied transit papers while retaining tailoring and ConOps separately. The earlier adoptability protocol and AI-assisted adaptability packet remain research context; this update does not advertise them as additional active manuscripts. No private correspondence, contact details, personnel circumstances, or draft clauses are reproduced on the homepage. No submission, acceptance, coauthor approval, or empirical effectiveness is claimed.

Follow-up verification: production build and whitespace checks pass. All seven field notes render with their intended status labels. In-app browser checks at 320, 375, 414, 768, and 1440 pixels show no horizontal overflow, with no observed console warnings or errors. The expanded paper entries were visually inspected. Changes remain local and unpublished.

## Publication — 22 September

Tony authorized commit and push and supplied the recognition text **2026 Mott MacDonald Award - Thought Leadership Award**. Added that exact wording and published homepage commit `9a766543dba4aa35be5e1c73fbf2a0a08bd73788` to `origin/main`. A fresh `npm ci`, audit, production build, and whitespace check passed. GitHub Pages workflow run `35700955953` succeeded for that commit; local and remote main have zero divergence.

Live in-app-browser readback confirmed the award, all seven field-note titles, the Wiley publication link, and no broken loaded images. The internal review record, temporary overflow harness, and unused earlier learning-game image variant were retained locally and excluded from the publication commit. Earlier local-only statements above describe their respective review stages, not the current deployment state.
