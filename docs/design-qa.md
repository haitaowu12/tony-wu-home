# Tony OS public Explorer — selected option3 QA

Result: **passed** (visual and changed-flow review). Date:26 November2026.

## Reference and evidence

The user selected the third displayed concept, `design-v5/selected-concept.png`. Its desktop app region is1263×857; the generated phone region is391×857. The implementation was rendered in real CSS viewports of1263×857 and390×844. Comparison pages placed the source crop and actual render in the same frame. Outside-frame review text is scaffolding, not product UI.

- `design-v5/public-desktop-comparison-final.jpg`
- `design-v5/public-phone-comparison-final.jpg`
- `design-v5/public-desktop-final.jpg`
- `design-v5/public-phone-final.jpg`

## Fidelity and deliberate adaptations

Home follows the selected hierarchy: unboxed portrait/name and introduction, one six-app grid, opaque featured Atlas card and one bottom Search pill. The card sits beside the launcher on desktop and below it on phone. There is no initial Welcome window, duplicated dock or icon rail. System sans-serif typography, blue actions, warm graphite/taupe wallpaper and opaque content interiors follow the selected direction. Clear app controls use translucent bodies, backdrop blur, upper rim highlights, lower interior shading and small contact shadows.

The original supplied pixel portrait is unchanged; CSS compensates for transparent padding. The Atlas uses the actual project screenshot, not generated UI. Its10px presentation crop removes the captured right scrollbar. Phone starts the128px thumbnail at the original top edge, keeping application chrome intact. Official Ionicons v8.0.0 glyphs and upstream license/attribution are included. The wallpaper generation prompt is retained in `design-v5/wallpaper-prompt.txt`.

The phone implementation uses a16px project description and a44px minimum action, larger than the generated concept's miniature footer text. This requires a shorter preview crop. Phone app tiles are74px; the phone identity greeting is14px, body copy20px, and app labels14px. A30% neutral wallpaper tint preserves the contours while improving white-text contrast. Sampled backgrounds behind small white metadata yield5.44–5.97:1. No whole-screen reference image is used as product UI.

## Findings and correction history

1. P1: inherited conventional-page `main` background covered the wallpaper. Fixed with an explicit transparent OS desktop surface and visually rechecked.
2. P1: natural-height phone Atlas image pushed Search below the first viewport. Fixed with the compact crop/footer and reduced gaps. Final390×844 Home client and scroll area are390×776; Search bottom is832px.
3. P2: flat tile outlines and small portrait. Added upper/lower material depth and scaled the original portrait inside its existing footprint. Independent paired review closed the finding.
4. P2: phone launcher scale. Increased tiles from68 to74px and adjusted bottom padding; no label collision or scroll overflow at390px.
5. P2: clipped preview chrome and right-edge capture strip. Top-aligned the phone crop and removed the strip through CSS clipping. Independent final review closed both.
6. Navigation defect: detail route replacement ran before history push. Pushing the detail route before the synchronous state update preserves the prior list entry. Browser Back/Forward now restore the list/detail and focus.

No open P0, P1 or P2 finding remains in the reviewed scope.

## Browser checks

- Desktop filter Railway→three projects; detail→All projects returns the query and focus to the originating card.
- Home→Projects and Apps→Projects preserve the open app/filter.
- Keyboard title movement changes x by12px; maximize fills the available desktop, restore returns bounds; minimize returns Home, close returns focus to the matching launcher.
- Search pill and Ctrl+K open search; Railway returns three project results; a result opens its detail; Escape closes search and restores launcher focus.
- Help contains none of the three removed credit/Standard-page links. Explicit Reduced commits modal/app transitions immediately; Full/default transitions were observed earlier in the same flow.
- Phone History collection→Atlas→browser Back restores one-item History list/card focus; Forward restores Atlas detail. Phone Home returns to the compact launcher.
-390×844 Home has no horizontal or vertical scroll overflow.320×740 scrolls to Search, which remains operable;768×1024 has equal client/scroll width. Desktop1263×857 composition is visible without initial app chrome.
- No application console errors in reviewed desktop/phone flows; browser-extension errors were excluded.

These are focused browser observations, not a claim that every project destination, physical mobile browser, keyboard mode or accessibility combination was tested. The release gate runs the production build and13-route/280-geometry invariant check after the evidence is saved. Runtime/backend behavior is unchanged by this public visual revision.
