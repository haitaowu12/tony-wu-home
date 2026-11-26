# Tony OS Explorer

Tony OS adds a public desktop experience to the existing personal page. The current visual revision follows the inspected official iOS Home, Settings, Clear app-icon and expanded tab-bar references: neutral backgrounds, grouped white content, system typography, familiar rounded-square app icons, and restrained translucency in navigation and window chrome. Existing public project screenshots, copy, destinations, qualifications and credits remain the content authority. The earlier experimental pastel/sculpted-object direction was rejected and was not published. The original desktop experiment took inspiration from Xiaozao OS; no source or assets from that project are bundled.

## Deployment and source

The public Explorer is deployed at [tony-os-explorer.techiesea.chatgpt.site](https://tony-os-explorer.techiesea.chatgpt.site). Its source is on branch `codex/tony-os-explorer-20261125` in `haitaowu12/tony-wu-home`.

The original Firebase homepage and GitHub Pages mirror have not been cut over. The existing canonical URL remains in place while this separate Explorer version is available for review.

## Routes and rendering

- `/` enhances to Explorer when JavaScript is available.
- `?view=explorer` explicitly opens Explorer; `app=projects&project=world-history-atlas` opens a project detail. Other app IDs are `welcome`, `atlas`, `play`, `about`, `research`, and `contact`.
- `?view=page` opens the existing personal page. Existing section URLs such as `#work`, `#about` and `#world-atlas` continue to open that page. Explorer no longer displays links to this legacy presentation.
- The initial HTML still contains the complete existing page, including its public profile, project descriptions, credits and ordinary navigation. It remains readable without JavaScript and supplies the existing SEO content.
- Navigation between views uses ordinary links. Explorer updates its current app/project query parameters without adding a browser-history entry for every desktop action.

`src/StandardPage.tsx` preserves the former `App.tsx`. `src/App.tsx` owns enhancement selection. Desktop state and views live in `src/explorer/`. Public records continue to come from `src/content/profile.ts`; the Explorer collection excludes `local-private` entries. The standard page preserves existing public descriptions of unpublished experiments.

## Implemented behavior

Seven apps cover Welcome, Projects, World Atlas, Playground, About Tony, Research and Contact. Project search, collection filters, project detail/back navigation, screenshot enlargement, source credits and public project links work from the shared content model.

Desktop windows can move, resize, minimize, maximize and close. Dragging and resizing stay within the desktop. Title bars and resize controls support arrow keys. The dock restores minimized apps, Show desktop minimizes the open windows, and Help offers a reset. Search is a native modal with Tab/Enter navigation and Ctrl/Command+K. Its search field does not intercept Enter, preserving native text-composition behavior.

At 760px and below, Home becomes a compact personal introduction and six-app launcher. Four persistent controls provide Home, Projects, Search and Apps. Apps opens a native modal bottom sheet containing all seven apps. App pages fill the available screen and have a Back control; desktop move, resize and minimize controls are omitted. Project collection, search text and list position survive detail/return and app switching. The same React content nodes remain in place when the layout changes size.

The menubar’s Standard page link, Help’s Read the standard page link, and Help’s inspiration credit were removed as requested. The standard route and initial prerender remain available for compatibility and SEO.

This public build contains no owner workspace, private records, credentials, authentication code or outbound message relay. Contact opens the already-public LinkedIn/GitHub destinations. Project links open a new browser tab; UI does not claim an embedded app is running.

## Visual reference and supplied artwork

The implementation follows the distinction in [Apple’s Materials guidance](https://developer.apple.com/design/human-interface-guidelines/materials.md): translucency belongs to the functional navigation layer, while app content stays readable on neutral standard surfaces. Official Home, Settings, Clear icon and expanded tab-bar screenshots were inspected before this revision. The website adapts those visible patterns; it does not claim to reproduce Apple’s native rendering engine. Reference screenshots are not bundled in the site.

The desktop backdrop is plain neutral slate `#54565f`. App pages use `#f2f2f7`, white grouped content, `#1c1c1e` primary text and `#636366` secondary text. Actions and blue text use `#0066cc` for contrast at small control sizes; focus accents retain `#007aff`. Fonts use the platform system stack beginning with `-apple-system` and `BlinkMacSystemFont`. Body descriptions are at least 16px, control labels at least 14px, and metadata at least 12px. Project descriptions reflow without a line clamp.

Welcome has a compact 76px character/identity row, a 34px name, the existing introduction, and a simple app grid. The phone layout uses a 72px character, the same 34px name, a concise introduction and six launchers. The floating phone tab bar uses monochrome symbols and labels, a pale selected capsule and a blue active state. Its appearance follows the inspected expanded native tab-bar reference. Phone app pages are neutral and opaque. The Apps sheet has explicit viewport width and maximum width, avoiding the browser dialog width cap.

`public/icons/` contains the shared Clear-style app artwork: consistent rounded-square neutral tiles and recognizable white glyphs, without separate pastel colors or free-floating sculpted objects. They are decorative external images in desktop/dock launchers, Home, Apps and app-identity results. Their CSS container adds no colored tile or extra shadow. Small functional controls retain line glyphs, including the Show desktop monitor and phone navigation. Button text and accessible names supply meaning; decorative images have empty alternative text.

`public/tony/standing.png` and `public/tony/neutral.png` are the supplied v0.6 accepted-reference character exports, copied byte-for-byte for Tony’s explicitly requested OS use. No generation, recoloring, transparency modification or image editing was performed. The source collection’s review-status exports are not described as independently approved production art. Their inclusion does not grant rights to reuse Tony’s character elsewhere.

## Authored motion

The implementation follows the maintained Frontend design and delivery → UI delivery motion contract and the Motion Prompt porting method. Recipes come from upstream revision `7819d3879eb7d5a1475c11c001bedffb5cab64af`; retained references are under `resources/methods/motion-prompt/` in Second Brain. Runtime code uses the existing React stack, native dialogs, Web Animations and feature-detected same-document View Transitions. It does not run a demonstration Canvas loop.

| Recipe / subject | Real trigger and properties | Timing and resting state | Protected behavior / acceptance states |
| --- | --- | --- | --- |
| #049, app windows and Search/Help | Opening/restoring the actual surface: opacity `0 → 1`, scale `.9 → 1`, y `10px → 0` | 320 ms; approximate ease-out cubic `cubic-bezier(.215,.61,.355,1)`; remain visible at final state | Content and controls operate from their real state. Inspect initial, midpoint, rest, dismissal and interruption. |
| #049, app/modal dismissal adaptation | Actual close/minimize; opacity `1 → 0`, scale `1 → .94`, y `0 → 8px` | 200 ms; approximate ease-in-out cubic; commit hidden/closed state afterward | Shorter and smaller than the source’s 280 ms reverse. Focus recovery runs after the React/native-dialog change. Replaced/canceled animation cannot commit an old dismissal. |
| #051, phone Apps sheet | Apps control opens native dialog; sheet y `100% → 0` | 400 ms ease-out; explicit close reverses over 280 ms | The source’s simulated finger/drag is omitted. Close/Escape work through the same dismissal function; native focus/inert semantics remain. Inspect open, settle, close and repeated requests. |
| #057, project collection selection | The selected background moves to the measured button x/y/width/height; filtered results fade `0 → 1` and move y `8px → 0` | Indicator 250 ms approximate ease-in-out cubic; results 200 ms linear | Button state/count and visible records change from actual selection. Results switch immediately rather than retaining the source’s overlapping sample panels. Check touch/keyboard selection and empty search. |
| #161, project screenshot continuity | Project selection and return; the same screenshot transitions between list and detail geometry | 600 ms approximate ease-in-out cubic; old panel fades during first 62%, new panel enters during final 40% | Uses the selected public image and real React state. Preserve filter/query/list position, destination and focus. Unsupported View Transitions use immediate navigation. Check forward, return and interruption. |

Help offers **Use device setting**, **Full**, and **Reduced**. Device preference is the default. Reduced removes spatial transitions and CSS animation while preserving content, focus and controls; the explicit control also allows this path to be exercised without browser media emulation. Hover/press feedback uses 140–180 ms transitions, with no ambient character loop or simulated loading.

The iOS-derived revision retains the existing event-bound recipe implementations and timings. It adds no ambient wallpaper loop, moving text, or simulated app launch. Launcher feedback is limited to a small lift/press response. Native modal opening, dismissal, focus recovery and project state continue to follow the contracts above.

Motion-source copyright/permission is retained in source comments and `public/notices/motion-prompt.txt`, outside the user-facing Help content. The selected recipes’ power-cubic easing is approximated by the stated CSS curves; geometry uses the actual UI rather than the source demo’s card coordinates.

## Build and verification

Run `npm ci`, `npm run build`, and `npm run check:explorer`. Build runs TypeScript, the Vite client/SSR bundles, and the existing prerender step. Output is `dist/`; server render artifacts are removed afterward. Relative base `./` is retained for Firebase root hosting and GitHub Pages subpath hosting. Canonical profile URL remains `https://tony-wu-home.web.app/`.

`check:explorer` checks unique public routes, existing public destinations, window bounds across four viewport sizes (including off-screen moves/oversized resizes), and essential public content/credits in the prerendered HTML. These checks do not claim browser interaction or visual coverage.

The current iOS-derived revision passed TypeScript, the Vite client/SSR builds and prerender. `check:explorer` passed for 13 public project routes, 280 geometry cases, and required identity and credits. No dependency versions changed. Browser review of this visual revision covered desktop and 390 × 844 phone views. Both phone Home screens had matching client and scroll widths. The public Projects journey filtered “Railway” to three results, opened Railway Anatomy with its real destination visible, and returned with the query retained. The seven-app sheet measured 374px wide with 8px side margins. Help contained none of the three removed items; the Reduced setting and sheet opening/closing worked. An inherited standard-page background was corrected so the neutral desktop and white launcher labels remain distinct. The phone collection labels were shortened to fit one row; a fresh 320px viewport measured `body.clientWidth = body.scrollWidth = 320` and collection width/scroll width of 292px. Temporary QA wrappers were removed before packaging. Independent image review of the desktop, phone Home, app sheet and project detail found no blocking material or layout mismatch against the official references. The observations below belong to earlier revisions.

Revision 3 browser review observed the desktop glass/character composition and the 390 × 844 phone journey: filter Projects with “Railway” → three results → Railway Anatomy detail → Back, retaining query and original card focus. The primary public destination remained visible. The Apps sheet opened with seven apps. Help contained none of the three removed elements. Selecting Reduced, opening and populating Search, then pressing Escape closed Search and returned focus. This exercised the application’s explicit reduced-motion setting; the browser’s actual media preference was not emulated.

Revision 3’s final targeted review at 390 × 844 passed the four narrow-layout corrections: Welcome content had `scrollWidth = clientWidth = 390` with no horizontal scrollbar; desktop shortcut icons no longer appeared behind phone content; the menubar control was named Open search; and the Projects app title was noninteractive text. Additional desktop review confirmed a pointer drag moved Welcome by exactly +40px horizontally and +28px vertically. Minimize → Restore returned the visible Welcome window and focused the Tony Wu heading.

Prior-version browser review observed the corrected desktop Welcome layout, project filtering and detail navigation, focus on the detail heading after opening a project, and focus restored to the original card on return. A first Escape closed populated search and returned focus to its invoker. Welcome and project detail were also reviewed in an actual 390 × 844 iframe viewport.

Prior-version hosted browser review also confirmed title-bar ArrowRight movement (x = 217.5 to 229.5), maximize/restore, minimize/dock restore, and navigation to the standard page and back. That review exposed focus falling to the page after minimizing Welcome. Minimize and close now select a focus target after React commits the window change: the remaining active window’s heading/title, or the dismissed app’s existing dock launcher if no window remains. The prior targeted browser recheck passed: minimizing the sole Welcome window focused its Restore Welcome dock control; closing Projects above Welcome focused the Welcome heading.

The existing `tests/focus.spec.ts` and `tests/portfolio.spec.ts` now request `?view=page` for ordinary no-hash page visits; their legacy-hash and no-JavaScript test cases remain in place. The full browser test suite was not run for this delivery. Pointer resize, screenshot-dialog focus return, complete keyboard traversal, the actual operating-system motion preference and real IME behavior were not established by this browser review. The explicit Reduced setting journey was exercised as recorded above. Geometry checks and source inspection do not substitute for unexercised interaction checks.

The existing GitHub workflow is unchanged. It triggers on pull requests, main pushes and manual dispatch. The public Explorer was deployed separately through Sites; no GitHub Action or pull request was triggered, and the original Firebase/GitHub Pages deployments were not changed.
