# Tony OS Explorer

## Selected v5 launcher

The current implementation follows Tony’s selected third image concept, retained at `docs/design-v5/selected-concept.png`. Home presents an unboxed Tony identity over the warm wallpaper, six clear app launchers in a 3 × 2 grid, a featured World History Atlas card, and a small Search pill. The Atlas card sits alongside the launcher on desktop and below it on phone. There is no initial Welcome window, sidebar icon rail, repeated Home dock, or white profile container.

**The v4 visual acceptance is superseded.** Its flat slate backdrop, initial Welcome window, custom icon artwork and phone tab bar are not the selected design. The experimental pastel/sculpted-object direction was also rejected. Earlier build and browser passes do not establish v5 visual fidelity. Current paired visual evidence and release status belong in `docs/design-qa.md`.

## Source and routes

The public Explorer address is [tony-os-explorer.techiesea.chatgpt.site](https://tony-os-explorer.techiesea.chatgpt.site). Its repository is `haitaowu12/tony-wu-home`, with Explorer source on `codex/tony-os-explorer-20261125`. The original Firebase homepage and GitHub Pages mirror have not been cut over; the canonical URL remains `https://tony-wu-home.web.app/`.

- `/` enhances to Explorer when JavaScript is available. `?view=explorer` makes that choice explicit.
- `app=projects&project=world-history-atlas` opens a project detail. Other app IDs are `atlas`, `play`, `about`, `research`, and `contact`. The retained `welcome` ID now opens Home.
- Opening an app or project adds a browser-history entry. Browser Back/Forward restores the app/detail route; window movement and dismissal replace the current route instead of adding geometry actions to history. A project navigation pushes its URL before committing React state, so the route-synchronization effect cannot overwrite the previous list entry.
- `?view=page` and existing section hashes retain the conventional personal page. Explorer displays none of the removed Standard page links.
- Initial HTML still contains the complete standard page, public records, navigation and credits for SEO and no-JavaScript access.

`src/content/profile.ts` remains the public content authority. All 13 public project records, qualifications, source credits and destinations are preserved; `local-private` entries are excluded from Explorer. This public build contains no private workspace records, authentication credentials or outbound message relay.

## Home and app behavior

Home launches Projects, World Atlas, Playground, About Tony, Research and Contact. The actual Atlas preview opens its project details; Open atlas follows the existing public destination in a new tab. The Search pill and Ctrl/Command+K open the native search modal. Help retains the motion preference and desktop reset.

Opened apps retain the window manager: drag, resize, minimize, maximize, close, bounds constraints and keyboard movement/resizing. Returning Home minimizes open windows without unmounting their content. Opening an existing app restores it. The active-app header offers Home, Search and Apps; Apps contains Home and all six apps. A dismissed window returns focus to another active heading, or to its matching Home launcher when no app remains.

At 760px and below, apps fill the available space and have a Back control. The title is noninteractive text; desktop drag/resize controls are omitted. Project query, collection and list position survive detail navigation and app switching. Detail open/return manages heading/card focus. Search’s first Escape closes populated search and returns focus; its Enter handling does not intercept text composition.

The selected phone Home keeps readable text and touch targets. Its real Atlas image is cropped into a 128px thumbnail, with title, 16px description and a minimum 44px action in the footer. Home can scroll at shorter heights or increased text sizes. The shell explicitly clears the standard page’s global `main` background so wallpaper remains visible behind the white identity and launchers.

The Help inspiration credit, Help Read the standard page link, and menubar Standard page link remain removed.

## Materials and artwork

System typography begins with `-apple-system` and `BlinkMacSystemFont`. Public app interiors remain opaque `#f2f2f7` and white, with `#1c1c1e` primary text, `#636366` secondary text and blue controls. Body descriptions are at least 16px, control labels at least 14px, and metadata at least 12px. Project descriptions reflow without a line clamp.

The warm wallpaper is `public/assets/tony-os-wallpaper.webp`. Clear launch tiles are editable CSS controls with backdrop blur, an asymmetric bright upper rim, interior highlights and a lower shadow. Glyphs are unmodified official Ionicons v8.0.0 assets under `public/symbols/`; the upstream license and source pin are beside them. Decorative glyph images have empty alternative text; visible labels or explicit accessible names identify their controls. Superseded custom `public/icons/` assets are not used.

Tony’s portrait uses the supplied `public/tony/neutral.png`, unchanged. CSS scales it 1.3 inside its existing footprint to remove the excess transparent padding from the visible composition. The Atlas card uses the actual `public/project-previews/world-history-atlas-vermilion-2026-11-01.webp`, not the generated concept’s reconstructed interface. Cropping changes presentation only; no whole-screen mockup is embedded as the UI.

## Motion

Motion retains the maintained Frontend/UI delivery method and Motion Prompt porting workflow, using native dialogs, Web Animations and feature-detected same-document View Transitions. Source revision is `7819d3879eb7d5a1475c11c001bedffb5cab64af`; retained recipe references are under `resources/methods/motion-prompt/` in Second Brain. Copyright and permission remain in source comments and `public/notices/motion-prompt.txt`.

| Recipe | Actual trigger and change | v5 timing |
| --- | --- | --- |
| #049 | App/modal opening: opacity 0→1, scale .97→1, y 8px→0 | 260ms ease-out cubic approximation |
| #049 dismissal adaptation | Close/minimize: opacity 1→0, scale 1→.98, y 0→6px; then commit closed/hidden state | 220ms ease-in-out cubic approximation |
| #051 | Phone Apps native sheet enters/exits vertically | 280ms opening / 240ms closing |
| #057 | Actual collection indicator moves to its button; filtered results fade and move y 8px→0 | 250ms indicator / 200ms results |
| #161 | Actual project screenshot transitions between list/detail geometry | 300ms; 160ms old/new panel fades |

Canceled or replaced animation cannot commit a stale dismissal. Focus recovery follows the React/native-dialog state change. Help provides device preference, Full and Reduced; Reduced commits immediately and removes spatial/CSS transitions. There is no ambient wallpaper or character animation. Launcher feedback is limited to a small hover/press response.

## Verification and release boundaries

`npm run build` runs TypeScript, client and SSR bundles, and prerender into `dist/`. Relative base `./` remains compatible with root hosting and GitHub Pages subpaths. `npm run check:explorer` verifies unique public routes, public destinations, 280 window geometry cases and required public identity/credits in prerendered HTML. These are not browser or visual tests.

V5 visual QA passed after paired desktop and phone comparisons against the selected concept, including an independent review of the corrected material, portrait scale and preview bounds. The evidence and correction history are in `docs/design-qa.md`. The release workflow performs a fresh production build followed by `npm run check:explorer` before source packaging.

The current browser review observed Railway filtering to three results; detail/list navigation preserving query, collection and card focus; browser Back/Forward after the history-order correction; Home and Apps restoring the open app; a 12px keyboard window move; maximize/restore, minimize and close; search via the launcher and Ctrl+K; search-to-project navigation; Escape focus recovery; and the explicit Reduced setting. The phone history flow retained its History collection and returned focus to the Atlas card. No application console errors were observed after excluding browser-extension messages.

Home was inspected at 1263×857, 390×844, 320×740 and 768×1024 CSS viewports. At 390×844, the Home scroll area has equal client/scroll dimensions of390×776 and Search ends at832px. Shorter layouts scroll to their controls without horizontal overflow. Captured small white metadata samples have at least5.44:1 contrast after the neutral wallpaper tint. These samples are not a claim of a complete automated contrast audit. Actual operating-system reduced-motion preference, real IME composition, physical mobile keyboards and pointer resize were not newly exercised in this revision.

The existing workflow is unchanged. It triggers on pull requests, main pushes and manual dispatch. This implementation work does not trigger GitHub Actions, create a pull request, or alter the Firebase/GitHub Pages deployments. Root coordinates the separate Sites release after visual QA.
