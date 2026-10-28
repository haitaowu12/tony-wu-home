# Editorial homepage — design QA

final result: passed

## Target and scope

Tony selected the first displayed proposal on 28 October 2026, then explicitly rejected its green shade. The revised selected source is `/Users/tony/.codex/generated_images/01a17505-a6b5-7621-89d1-7415dc0424bd/exec-a9ea6877-f5ff-46f3-9075-5152e23eb7f5.png`, copied as `selected-reference.png` in the evidence folder below. It preserves option 1's editorial composition with ivory, neutral charcoal and umber. Existing public copy, actual imagery and qualifications govern any generated text differences.

Evidence folder: `/Users/tony/.codex/visualizations/2026/10/25/01a17505-a6b5-7621-89d1-7415dc0424bd/homepage-editorial-build-20261028/`.

Implementation URL: `http://127.0.0.1:4186/`. This report qualifies the rendered implementation and scoped manual journeys, not deployment, universal accessibility compliance or engineering-tool qualification. Automated regressions are separate release checks.

## Comparison conditions and evidence

- Desktop: 1440×900 CSS pixels, normal motion, closed disclosures, same editorial page state. Original source image is 946×1663 pixels; the implemented full-page capture is 1425×2752 pixels (1440 CSS viewport minus the scrollbar), density 1. Full page heights differ because original qualifications, source details, Chinese name, credentials and publication citation are retained. No image was stretched to force equal page heights.
- `implementation-full.png`, `implementation-hero.png` and `phone-work.png` were captured in the in-app browser. Full-page capture and direct viewport inspection were both used; thumbnail comparison alone did not establish legibility. Phone inspection used actual 390×844 CSS pixels; its saved content screenshot is 375×812 pixels under the capture provider. Native UI was inspected directly as well.
- `comparison.html` renders source and implementation together at equal display widths; `comparison-full.png` records that combined input. `comparison-focus.html`/`comparison-focus.png` compare Atlas, the paired engineering tools and secondary index with explicit display crops. The source and original screenshot files remain unchanged. These are structural/type-role comparisons of a generated visual target, not a claim of pixel-perfect typography reconstruction.
- Desktop and phone views, source images and both combined comparisons were opened and inspected. Original application images remain unchanged; actual interface color is not the website palette.

## Findings and iteration history

1. **[P2, resolved] Type and hero-image emphasis were weaker than the selected design.** Initial combined comparison showed a fine typographic hierarchy and an overly inset hero image. Increased the hero and Atlas heading scale, raised primary paragraph/tool text sizes, and filled the desktop artwork slot using the original illustration. The phone treatment retains the whole illustration. Post-fix desktop captures and combined comparisons are the evidence named above. No actionable P0/P1/P2 visual difference remains within the authorized composition and content constraints.
2. **[P2, resolved] Fixed-height image frames introduced unnecessary letterboxing.** Initial implementation inspection found unused light gutters around the Atlas image. Natural image dimensions plus maximum heights now bound the captures without a forced frame ratio. Project captures remain uncropped and use `object-fit: contain`.
3. **[P1, resolved] Back from an interface image could jump to an older section fragment.** Native full-size-image navigation was exercised; the initial hash-jump effect could override restored browser history position. History traversal now retains native scroll restoration. Scoped regressions require return to the image link's viewport and saved scroll position.
4. **[P2, resolved] About and Writing share a desktop row.** Navigation now accounts for tied section starts, the chosen fragment and a clamped last-row destination. Manual Writing navigation retained its active item and focus; scoped regressions exercise repeated About/Writing navigation and legacy Practice/Experience anchors.

## Five fidelity surfaces

- **Typography:** existing self-hosted IBM Plex Sans body/navigation and system-serif editorial headings retain distinct roles; stronger hero/Atlas hierarchy, readable summaries and visible availability/qualification text. Chinese Atlas label is retained. Font metrics and longer verified copy intentionally differ from generated prose.
- **Layout and rhythm:** compact opening, split Atlas feature, paired RailClear/RAMS, three-part secondary index, asymmetric learning module, career thread beside published writing, small contact footer. All current projects and section anchors remain. On phones, columns become vertical with bounded previews. The collapsed desktop Work section measured approximately 1145px, and the full page approximately 2752px, at the inspected 1440px viewport. These observations are not general performance or usability thresholds.
- **Colors:** ivory `#f4f0e8`, neutral charcoal `#181716`, ink `#27231f`, secondary `#655d54`, umber `#76553b` and sand `#d3b38b`. No green in website tokens or favicon. Sampled visible text/link contrast: at least 5.68:1 across content chapters, over 9:1 in the opening. Interface/illustration colors remain original.
- **Imagery:** original personal-story illustration and all six source interface captures. Default images are at most 300px high; engineering captures at most 220px; phone images at most 190px. Modeling Lab and tailoring images remain in their disclosures. Native full-size image links expose complete captures. No fabricated interface or new raster asset is used.
- **Copy:** original content source governs facts, dates, research status and qualifications. Reconciliation checked 78 project/practice/experience/recognition/research strings in the static render, with none missing. Atlas remains public/bilingual; Cleo Wong attribution and evaluation status remain; private tools expose image links, not app access; synthetic captions and engineering qualification remain visible. Generated decorative file icons and timeline circles are omitted in favor of native links and ordered-list markers.

## Manual journeys and limits

- Desktop/phone image scale and visual reading order inspected; no overflow across the 320/375/414/768/1440 CSS width sweep. Intermediate measurements during responsive source changes are not final raster-size claims.
- Phone menu opens and closes after selection and Escape. Native project disclosures expose complete source descriptions and supporting images.
- Full-size RailClear image loaded at its original 1687px width; browser Back returned to the engineering tool row. Other full-size image journeys and exact scroll-position checks are covered by the regression suite.
- Browser warning/error log was empty for the scoped local checks.
- No live screen-reader or real mobile-device trial; no field performance measurement. This local visual/manual pass does not replace those checks or certify the engineering tools.

## Implementation checklist

- [x] Selected composition implemented in the existing owner project.
- [x] Explicit green rejection applied to page chrome and favicon.
- [x] Original assets, qualifications, all projects and complete details retained.
- [x] Source/implementation compared together, plus focused/reading-size checks.
- [x] P0/P1/P2 issues above repaired and affected browser behavior rechecked.
- [x] Preview remains available for user inspection.

## Follow-up polish

[P3] Complete captions, bilingual naming, source citations and optional details make the implementation slightly taller and denser than the generated mock. This preserves real information and remains an explicit difference; no speculative further redesign was added.
