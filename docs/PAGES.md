# Homepage publishing

The [homepage](https://haitaowu12.github.io/tony-wu-home/) publishes from `main` through GitHub Actions.

Each push runs the dependency audit, production build and browser regression tests. After those checks pass, the same build is deployed to GitHub Pages. The workflow can also be started manually from the Actions tab.

GitHub Pages must use **GitHub Actions** as its build source. No publication branch is needed.
