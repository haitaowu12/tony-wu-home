# Homepage publishing

[Firebase Hosting](https://tony-wu-home.web.app/) is the canonical homepage. The same static build serves the [GitHub Pages mirror](https://haitaowu12.github.io/tony-wu-home/).

## Firebase Hosting

From the repository root, run `npm run audit`, `npm run build` and `npm run test:focus`. Deploy the checked `dist/` with `firebase deploy --only hosting --project tony-wu-projects`. The checked-in configuration targets the `tony-wu-home` site.

## GitHub Pages

The workflow on `main` runs the dependency audit, production build and browser tests before deploying the mirror. It can also be started manually from the Actions tab. The Pages build source is **GitHub Actions**.
