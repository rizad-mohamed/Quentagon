# Contributing to Quentagon

Start with the setup instructions in README.md. Branch from main, keep changes focused, and use descriptive Conventional Commit messages.

Before opening a pull request, run:

```sh
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright starts the production preview automatically. Install Chromium with `npx playwright install chromium` first. Review visible changes at mobile, tablet, and desktop sizes, in both themes, with keyboard navigation and reduced motion.

Explain behavior changes, validation results, and remaining limitations in the pull request. CI must pass before merging. Preserve existing contributor attribution and genuine commit dates; do not rewrite shared history. Never commit real environment values, hosting credentials, dependency directories, or build output.

A license has not been selected. Contact the maintainer before assuming permission to redistribute this project.
