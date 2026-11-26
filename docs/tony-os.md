# Tony OS Explorer

Tony OS adds a public desktop experience to the existing personal page. The interface uses the navy/copper/paper direction from Tony-OS-v0.1 and the repository’s approved illustration, screenshots, copy, links and qualifications. It is an original implementation inspired by Xiaozao OS; its source code and assets are not bundled.

## Deployment and source

The public Explorer is deployed at [tony-os-explorer.techiesea.chatgpt.site](https://tony-os-explorer.techiesea.chatgpt.site). Its source is on branch `codex/tony-os-explorer-20261125` in `haitaowu12/tony-wu-home`.

The original Firebase homepage and GitHub Pages mirror have not been cut over. The existing canonical URL remains in place while this separate Explorer version is available for review.

## Routes and rendering

- `/` enhances to Explorer when JavaScript is available.
- `?view=explorer` explicitly opens Explorer; `app=projects&project=world-history-atlas` opens a project detail. Other app IDs are `welcome`, `atlas`, `play`, `about`, `research`, and `contact`.
- `?view=page` opens the existing personal page. Existing section URLs such as `#work`, `#about` and `#world-atlas` continue to open that page.
- The initial HTML still contains the complete existing page, including its public profile, project descriptions, credits and ordinary navigation. It remains readable without JavaScript and supplies the existing SEO content.
- Navigation between views uses ordinary links. Explorer updates its current app/project query parameters without adding a browser-history entry for every desktop action.

`src/StandardPage.tsx` preserves the former `App.tsx`. `src/App.tsx` owns enhancement selection. Desktop state and views live in `src/explorer/`. Public records continue to come from `src/content/profile.ts`; the Explorer collection excludes `local-private` entries. The standard page preserves existing public descriptions of unpublished experiments.

## Implemented behavior

Seven apps cover Welcome, Projects, World Atlas, Playground, About Tony, Research and Contact. Project search, collection filters, project detail/back navigation, screenshot enlargement, source credits and public project links work from the shared content model.

Desktop windows can move, resize, minimize, maximize and close. Dragging and resizing stay within the desktop. Title bars and resize controls support arrow keys. The dock restores minimized apps, Show desktop minimizes the open windows, and Help offers a reset. Search is a native modal with Tab/Enter navigation and Ctrl/Command+K. Its search field does not intercept Enter, preserving native text-composition behavior.

At 760px and below, the same app DOM fills the available screen and only the active window is visible. The dock changes apps. Motion is disabled with `prefers-reduced-motion`. The standard page is always one link away.

This public build contains no owner workspace, private records, credentials, authentication code or outbound message relay. Contact opens the already-public LinkedIn/GitHub destinations. Project links open a new browser tab; UI does not claim an embedded app is running.

## Build and verification

Run `npm ci`, `npm run build`, and `npm run check:explorer`. Build runs TypeScript, the Vite client/SSR bundles, and the existing prerender step. Output is `dist/`; server render artifacts are removed afterward. Relative base `./` is retained for Firebase root hosting and GitHub Pages subpath hosting. Canonical profile URL remains `https://tony-wu-home.web.app/`.

`check:explorer` checks unique public routes, existing public destinations, window bounds across four viewport sizes (including off-screen moves/oversized resizes), and essential public content/credits in the prerendered HTML. These checks do not claim browser interaction or visual coverage.

The TypeScript/client/SSR build and prerender passed. `check:explorer` passed for 13 public project routes, 280 geometry cases, and the required public identity and credits in the generated HTML. `git diff --check` passed. No dependency versions changed; the completed dependency audit reported zero vulnerabilities.

Browser review observed the corrected desktop Welcome layout, project filtering and detail navigation, focus on the detail heading after opening a project, and focus restored to the original card on return. A first Escape closed populated search and returned focus to its invoker. Welcome and project detail were also reviewed in an actual 390 × 844 iframe viewport.

Hosted browser review also confirmed title-bar ArrowRight movement (x = 217.5 to 229.5), maximize/restore, minimize/dock restore, and navigation to the standard page and back. That review exposed focus falling to the page after minimizing Welcome. Minimize and close now select a focus target after React commits the window change: the remaining active window’s heading/title, or the dismissed app’s existing dock launcher if no window remains. The targeted browser recheck passed: minimizing the sole Welcome window focused its Restore Welcome dock control; closing Projects above Welcome focused the Welcome heading.

The existing `tests/focus.spec.ts` and `tests/portfolio.spec.ts` now request `?view=page` for ordinary no-hash page visits; their legacy-hash and no-JavaScript test cases remain in place. The full browser test suite was not run for this delivery. Pointer drag/resize, screenshot-dialog focus return, complete keyboard traversal, reduced motion, and actual IME behavior were not established by this browser review. Geometry checks and source inspection do not substitute for those interaction checks.

The existing GitHub workflow is unchanged. It triggers on pull requests, main pushes and manual dispatch. The public Explorer was deployed separately through Sites; no GitHub Action or pull request was triggered, and the original Firebase/GitHub Pages deployments were not changed.
