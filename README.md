# Quentagon

Quentagon is a technology studio website presenting services, project references, products, and an interactive delivery process.

Developed by rizad-mohamed.

Repository: https://github.com/rizad-mohamed/Quentagon

## Current status

Active development: a working static frontend with browser and accessibility checks. Service dashboards and workflow animations are illustrative demonstrations. The client portal and Quentagon Bot integrations are coming soon. The contact form validates input and opens an email draft; it does not send or store submissions. Package version 1.0.0 is existing metadata, not evidence of a production release.

## Features

- Seven interactive service presentations covering software, web, mobile, AI automation, security, deployment, and consulting.
- Eight-stage project journey with keyboard-accessible tabs and stage controls.
- Project references, product previews, and contact enquiries.
- Responsive mobile, tablet, and desktop layouts.
- Light-first interface with persistent explicit light/dark selection.
- SVG artwork, scroll interactions, reduced-motion support, and a manual decorative-motion control.
- Self-hosted fonts, static SEO metadata, sitemap, robots file, and a custom 404 page.

Demonstration data and illustrations are not evidence of live customer deployments or integrations. Automated accessibility checks supplement manual review.

## Technology and architecture

Next.js 16 App Router, React 19, TypeScript, CSS, Motion, and Phosphor icons. npm and package-lock.json provide deterministic installation. ESLint, Prettier, Playwright, axe-core, and Lighthouse support validation.

The page composes server-rendered content with client components for interactions. There is no application backend, database, or authentication system. Next.js exports static files to out/; images are unoptimized for static hosting.

```text
app/                    Routes, metadata, and styles
components/             Interactive and presentation components
data/                   Capability content
lib/                    Shared site identity and navigation
public/                 Brand assets and hosting headers
assets/brand-originals/ Original supplied brand images
scripts/                Static preview server and Lighthouse audit
tests/                  Playwright interaction and accessibility checks
.github/                CI workflow and pull request template
.openai/hosting.json     Existing Sites project/output configuration
```

## Prerequisites and local setup

Use Node.js 24 (selected in .nvmrc for local development and CI), npm, and Git. The installed Next.js package requires Node.js 20.9 or newer; Node.js 24 is the validated project toolchain.

```sh
git clone https://github.com/rizad-mohamed/Quentagon.git
cd Quentagon
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Optionally copy .env.example to .env.local (`Copy-Item .env.example .env.local` in PowerShell, or `cp .env.example .env.local` in a POSIX shell).

## Available scripts

| Command                   | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| npm run dev               | Development server on localhost:3000                   |
| npm run build             | Production static export to out/                       |
| npm start                 | Local static preview on localhost:3003                 |
| npm run lint              | ESLint                                                 |
| npm run typecheck         | TypeScript checking without emitting files             |
| npm run test:e2e          | Chromium browser and axe accessibility tests           |
| npm run format            | Format application, scripts, configuration, and README |
| npm run format:check      | Check formatting                                       |
| npm run audit:performance | Lighthouse lab audit of a running preview              |

## Production build and validation

```sh
npx playwright install chromium
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright automatically starts the production preview after a build. To inspect the export manually:

```sh
npm start -- --port 3003
```

Open http://127.0.0.1:3003. In another terminal, run `npm run audit:performance` to produce artifacts/lighthouse-mobile.json. Lighthouse reports lab measurements, not field performance guarantees.

There is no separate unit-test suite. Browser coverage includes responsive overflow, themes, keyboard navigation, motion preferences, resource loading, runtime errors, and accessibility. Diagnostic output is ignored by Git.

## Environment variables

| Variable             | Purpose                                                                                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_SITE_URL | Optional public absolute origin used at build time for canonical, social, sitemap, and organization URLs. Defaults to the existing preview origin in lib/site.ts. Set to the actual deployment origin before production builds. |
| PLAYWRIGHT_BASE_URL  | Optional test/audit URL; defaults to http://127.0.0.1:3003. Tests start the local preview only when this override is absent.                                                                                                    |
| PORT                 | Optional local static-preview port; defaults to 3003. The --port argument takes precedence.                                                                                                                                     |

No credentials are required to run the frontend. NEXT_PUBLIC variables are public and must not contain secrets. Real .env files are ignored; .env.example contains safe placeholders.

## CI and delivery

.github/workflows/ci.yml runs on pushes to main, pull requests, and manual dispatch. Node.js 24 and the npm cache support npm ci. CI checks formatting, lint, types, the production build, and Chromium browser tests. Obsolete runs are cancelled. Permissions are limited to reading repository content.

Successful runs upload quentagon-static-site containing out/. Failed runs upload browser diagnostics. Set the repository Actions variable NEXT_PUBLIC_SITE_URL to the intended hosting origin; no CI secrets are required.

The existing deployment target is ChatGPT Sites, recorded in .openai/hosting.json. No documented noninteractive Sites deployment command or GitHub credential integration is present in this repository, so automatic production CD is not configured. Deploy the validated out/ directory through the existing Sites deployment interface using the established project identity. Never place hosting credentials in Git.

For any compatible static host, publish the contents of out/, preserve /_next/ assets, configure 404.html as the missing-page response, and apply public/_headers where supported or equivalent host settings. The local preview is a verification server bound to localhost, not a production hosting service. Deployment origin changes require rebuilding. GitHub Pages is not configured.

## Development workflow

Branch from main → develop → validate → commit → pull request → CI → merge. Use focused Conventional Commits and retain the lockfile. See CONTRIBUTING.md and SECURITY.md.

The existing foundation commit is retained with its original author and timestamp. Recoverable working-tree changes are committed at publication time; no older development milestones or dates are invented. No license has been selected, and no release tag is implied by package metadata.
