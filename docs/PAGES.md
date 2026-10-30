# Branch-hosted portfolio publication

Publish project sites first; update the personal page with their verified links and availability, then publish it last. Source stays on main. Verified static files go to `gh-pages` with `.nojekyll` and `deployment.json`. GitHub Pages uses that branch root. The old custom Pages workflow is disabled; keyboard-focus verification remains available.

Run `npm ci`, `npm run audit` and `npm run build`, then inspect the affected desktop and phone flows before publishing. `scripts/publish-pages.py` pushes with ordinary Git (no force update), configures branch hosting and explicitly requests a build if the latest Pages build does not match the publication commit. A settings update alone did not start a legacy build for some previously workflow-hosted repositories. Verify the completed build’s exact commit and the live URL before calling it published.

The helper takes `--repo`, `--directory`, the exact source `--source` SHA and an output `--receipt`. Use the current committed source and keep the verified static bytes unchanged through publication. It retains source and per-file hashes, but the operator owns source/content acceptance. Preserve prior gh-pages history for rollback.

29 October content update: public RailClear 0.4 app; RAMS public worked study and local authoring download; current Modeling Lab; repaired Learning Quest legacy replay; ordinal Tailoring presentation; Leadership Toolbox catalogue; Personal Growth Copilot lesson/skill candidate; both workshop games; current Atlas Pages mirror. Prototype and engineering/human-acceptance boundaries remain explicit. Private finance, family, client records and unfinished private experiments are outside this public release.

Verification: zero high-severity dependency advisories in the audit; production prerender/build passes. The in-app browser inspected the new RailClear/RAMS links in context and the actual 375px phone layout without page overflow. Keyboard access reached the study-scope disclosure. Project sites have their own test and live-build receipts. Cross-browser, screen-reader and human-outcome evidence are not newly claimed.
