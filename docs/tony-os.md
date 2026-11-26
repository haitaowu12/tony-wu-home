# Tony OS Explorer

Tony OS adds a public desktop experience to the existing personal page. The interface uses the navy/copper/paper direction from Tony-OS-v0.1 and the repository’s approved illustration, screenshots, copy, links and qualifications. It is an original implementation inspired by Xiaozao OS; its source code and assets are not bundled.

## Routes and rendering

- `/` enhances to Explorer when JavaScript is available.
- `?view=explorer` explicitly opens Explorer; `app=projects&project=world-history-atlas` opens a project detail. Other app IDs are `welcome`, `atlas`, `play`, `about`, `research`, and `contact`.
- `?view=page` opens the existing personal page. Existing section URLs such as `#work`, `#about` and `#world-atlas` continue to open that page.
- The initial HTML still contains the complete existing page, including its public profile, project descriptions, credits and ordinary navigation. It remains readable without JavaScript and supplies the existing SEO content.
- Navigation between views uses ordinary links. Explorer updates its current app/project query parameters without adding a browser-history entry for every desktop action.

`src/StandardPage.tsx` preserves the former `App.tsx`. `src/App.tsx` owns enhancement selection. Desktop state and views live in `src/explorer/`. Public records continue to come from `src/content/profile.ts`; the Explorer collection excludes `local-private` entries. The standard page preserves existing public descriptions of unpublished experiments.

## Behavior

Seven apps cover Welcome, Projects, World Atlas, Playground, About Tony, Research and Contact. Project search, collection filters, project detail/back navigation, screenshot enlargement, source credits and public project links work from the shared content model.

Desktop windows can move, resize, minimize, maximize and close. Dragging and resizing stay within the desktop. Title bars and resize controls support arrow keys. The dock restores minimized apps, Show desktop minimizes the open windows, and Help offers a reset. Search is a native modal with Tab/Enter navigation and Ctrl/Command+K. Its search field does not intercept Enter, preserving native text-composition behavior.

At 760px and below, the same app DOM fills the available screen and only the active window is visible. The dock changes apps. Motion is disabled with `prefers-reduced-motion`. The standard page is always one link away.

This public build contains no owner workspace, private records, credentials, authentication code or outbound message relay. Contact opens the already-public LinkedIn/GitHub destinations. Project links open a new browser tab; UI does not claim an embedded app is running.

## Build and verification

Run `npm ci`, `npm run build`, and `npm run check:explorer`. Build runs TypeScript, the Vite client/SSR bundles, and the existing prerender step. Output is `dist/`; server render artifacts are removed afterward. Relative base `./` is retained for Firebase root hosting and GitHub Pages subpath hosting. Canonical profile URL remains `https://tony-wu-home.web.app/`.

`check:explorer` checks unique public routes, existing public destinations, window bounds across four viewport sizes (including off-screen moves/oversized resizes), and essential public content/credits in the prerendered HTML. These checks do not claim browser interaction or visual coverage.

The existing `tests/focus.spec.ts` and `tests/portfolio.spec.ts` now request `?view=page` for ordinary no-hash page visits; their legacy-hash and no-JavaScript coverage remains intact. Browser QA of Explorer must include project selection/detail/action/back, search, screenshot close/focus return, drag/resize/minimize/maximize/close, a phone viewport, keyboard access and reduced motion.

The existing GitHub workflow is unchanged. It triggers on pull requests, main pushes and manual dispatch. No GitHub Action, PR or production deployment is part of this implementation.
