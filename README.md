<h1 align="center">Quentagon — Technology Studio Website</h1>

<p align="center">
  <img src="public/brand/quentagon-mark.webp" alt="Quentagon logo" width="160" />
</p>

<p align="center">
  <strong>Engineering intelligence for progress.</strong><br />
  Custom software, web and mobile applications, AI automation, security and cloud delivery.
</p>

<p align="center">
  <a href="https://quentagon.com/">Live Website</a> ·
  <a href="CONTRIBUTING.md">Contributing</a> ·
  <a href="SECURITY.md">Security</a>
</p>

Developed by **[rizad-mohamed](https://github.com/rizad-mohamed)**.

---

## Project Overview

Quentagon is a responsive technology studio website that presents services, project references, product previews and an interactive delivery process. It gives prospective clients a clear route from understanding the studio's capabilities to preparing a project enquiry.

This is the original source repository: **[rizad-mohamed/Quentagon](https://github.com/rizad-mohamed/Quentagon)**.

The public website is available at **[quentagon.com](https://quentagon.com/)**. Its current Hostinger deployment uses the separate **M-K-Hirusha/Quentagon** copy on `main`. Updates to this original repository do not automatically sync into that deployment copy.

---

## Problem Statement

A technology studio needs to explain its services, show relevant work and make its delivery process understandable to prospective clients. A fragmented presentation can make it difficult for visitors to identify the right service or know how to begin a project.

Quentagon brings those parts together in one accessible website with consistent navigation, responsive layouts and a clear enquiry path.

---

## Proposed Solution

The website combines service presentations, an eight-stage project journey, project references and product previews. Visitors can explore the studio's capabilities, learn how a project progresses and prepare an email enquiry.

The implementation combines Next.js-rendered content with React client components for interactive behavior. It is a frontend website: the current code does not include an application backend, database or authentication system.

---

## Key Features

### Services and Capabilities

Seven service presentations cover:

- Custom software development.
- Web and e-commerce solutions.
- Mobile application development.
- AI and automation.
- Cybersecurity.
- Cloud, DevOps and integrations.
- Technology consulting and support.

### Project Journey and Showcase

- Eight-stage delivery journey with keyboard-accessible tabs and stage controls.
- Project references and visual showcase previews.
- Product previews and coming-soon integration messaging.
- Illustrative service dashboards and workflow animations.

### Contact Enquiries

- Name, email, service and project-detail fields.
- Browser form validation and input-length limits.
- An encoded `mailto:` link that opens a draft in the visitor's email application.
- A direct email link and a copy-email control.

**Submitting the form does not send an email or store a submission.** The visitor must review and send the draft in their email application.

### Responsive Interface and Accessibility

- Mobile, tablet and desktop layouts.
- Light-first design with persistent explicit light/dark selection.
- Keyboard navigation, focus handling and a skip-to-content link.
- Reduced-motion support and a decorative-motion control.
- SVG artwork, scroll interactions and self-hosted fonts.

### Metadata and Discoverability

- Page title, description, canonical and social metadata.
- Sitemap and robots routes.
- Brand favicon and social artwork.
- Custom missing-page response.

Illustrations and demonstration data do not establish that the displayed customer systems or integrations are deployed. Automated accessibility checks supplement manual review.

---

## Website Workflow

1. Explore the services and capabilities.
2. Review the delivery process and project references.
3. Select a service and describe a project in the contact form.
4. Open the prepared email draft.
5. Review and send the enquiry using an email application.

The client portal and Quentagon Bot integrations are marked as coming soon. They do not provide an authenticated portal or a live AI service in the current implementation.

---

## Technology Stack

| Area                   | Technologies                                       |
| ---------------------- | -------------------------------------------------- |
| Framework              | Next.js 16, App Router                             |
| Interface              | React 19, TypeScript                               |
| Styling                | CSS, SVG artwork                                   |
| Motion                 | Motion                                             |
| Icons                  | Phosphor Icons                                     |
| Fonts                  | Self-hosted Manrope and IBM Plex Mono              |
| Local tooling          | Node.js 24, npm, Git                               |
| Code quality           | ESLint, Prettier, TypeScript checking              |
| Browser testing        | Playwright, Chromium, axe-core                     |
| Performance audit      | Lighthouse                                         |
| CI                     | GitHub Actions in this original repository         |
| Current public hosting | Hostinger, deploying the separate M-K-Hirusha copy |

Dependencies are pinned in `package.json`, and `package-lock.json` supports reproducible installation with `npm ci`.

---

## Architecture Overview

| Part          | Responsibility                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `app/`        | Page composition, layout, styles, metadata, sitemap, robots and missing-page handling                           |
| `components/` | Navigation, service presentations, journey controls, showcase previews, themes, motion and contact interactions |
| `data/`       | Structured service and capability content                                                                       |
| `lib/`        | Shared site identity and navigation                                                                             |
| `public/`     | Brand assets and static-host header configuration                                                               |
| `scripts/`    | Local static preview and Lighthouse audit                                                                       |
| `tests/`      | Browser interaction and accessibility coverage                                                                  |

Local and CI builds use `output: "export"` in `next.config.ts` and generate the static site in `out/`. Images are configured as unoptimized for static hosting.

Hostinger's Next.js preset overrides the output setting with standalone server mode and uses `.next/` instead. That hosted server mode does not add a business backend, database or authentication features to this application.

---

## Main Folder Structure

| Path                               | Contents                                              |
| ---------------------------------- | ----------------------------------------------------- |
| `app/page.tsx`                     | Main website page                                     |
| `app/layout.tsx`                   | Root layout, fonts, theme initialization and metadata |
| `app/robots.ts`, `app/sitemap.ts`  | Discoverability routes                                |
| `app/not-found.tsx`                | Missing-page UI                                       |
| `components/`                      | Interactive and presentation components               |
| `data/capabilities.ts`             | Service descriptions and capability data              |
| `lib/site.ts`                      | Site identity, email, fallback origin and navigation  |
| `public/brand/`                    | Optimized logo, favicon and social artwork            |
| `assets/brand-originals/`          | Original supplied brand images                        |
| `scripts/serve.mjs`                | Local static-preview server                           |
| `scripts/audit.mjs`                | Lighthouse audit script                               |
| `tests/`                           | Playwright test files                                 |
| `.github/workflows/ci.yml`         | Original repository's validation workflow             |
| `.github/PULL_REQUEST_TEMPLATE.md` | Pull request template                                 |
| `.openai/hosting.json`             | Earlier ChatGPT Sites project configuration           |
| `.env.example`                     | Safe environment-variable placeholder                 |
| `.nvmrc`                           | Node.js version selection                             |
| `CONTRIBUTING.md`, `SECURITY.md`   | Contribution and security guidance                    |

---

## How to Run Locally

### 1. Prerequisites

Use Node.js 24, npm and Git. Node.js 24 is selected in `.nvmrc` for local development and CI.

### 2. Clone and Install

```sh
git clone https://github.com/rizad-mohamed/Quentagon.git
cd Quentagon
npm ci
```

### 3. Configure the Public Origin

Copy `.env.example` to `.env.local`.

POSIX shell:

```sh
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

For a build intended for the live domain, set:

```env
NEXT_PUBLIC_SITE_URL=https://quentagon.com
```

### 4. Start Development

```sh
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

### 5. Preview a Production Export

```sh
npm run build
npm start -- --port 3003
```

Open [http://127.0.0.1:3003](http://127.0.0.1:3003). The preview server binds to localhost and is for verification; it is not the production hosting service.

---

## Environment Variables

| Variable               | Purpose                                                                                                                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public absolute origin used at build time for canonical, social, sitemap and organization URLs. Set to `https://quentagon.com` for production. Without an override, the code uses the earlier preview origin from `lib/site.ts`. |
| `PLAYWRIGHT_BASE_URL`  | Optional browser-test and audit URL; defaults to `http://127.0.0.1:3003`. Playwright starts the local preview only when this override is absent.                                                                                 |
| `PORT`                 | Local static-preview port; defaults to `3003`. The `--port` command argument takes precedence.                                                                                                                                   |

No credentials are required to run the frontend. `NEXT_PUBLIC_` variables are public and must never contain secrets. Real environment files are ignored; `.env.example` contains safe placeholders.

---

## Common Commands

| Command                     | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| `npm ci`                    | Install the locked dependencies                             |
| `npm run dev`               | Start the development server                                |
| `npm run build`             | Generate the local production static export in `out/`       |
| `npm start`                 | Serve the local export on port 3003                         |
| `npm run lint`              | Run ESLint                                                  |
| `npm run typecheck`         | Check TypeScript without emitting files                     |
| `npm run test:e2e`          | Run Chromium interaction and accessibility tests            |
| `npm run format`            | Format application files, scripts, configuration and README |
| `npm run format:check`      | Check formatting                                            |
| `npm run audit:performance` | Audit a running preview with Lighthouse                     |

---

## Testing Summary

The repository includes browser tests in `tests/site.spec.ts` and `tests/theme-motion.spec.ts`, using Playwright and axe-core. There is no separate unit-test suite.

Coverage includes responsive overflow, themes, keyboard navigation, motion preferences, resource loading, runtime errors and accessibility.

Run the validation sequence:

```sh
npx playwright install chromium
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright starts the production static preview automatically when `PLAYWRIGHT_BASE_URL` is not set. Build the export before running the tests.

For a performance audit, keep `npm start` running in one terminal and run `npm run audit:performance` in another. The report is written to `artifacts/lighthouse-mobile.json`.

This section describes the available checks, not a fixed pass count or a claim that the latest commit passed. Check the relevant GitHub Actions run for current results. Lighthouse reports lab measurements rather than field-performance guarantees.

---

## CI and Deployment

### Original Repository CI

`.github/workflows/ci.yml` runs on pushes to `main`, pull requests and manual dispatch. It uses Node.js 24 and runs dependency installation, formatting, lint, types, production build and Chromium browser checks.

Successful runs upload the `quentagon-static-site` artifact containing `out/`. Failed runs upload available browser diagnostics. Set the repository Actions variable `NEXT_PUBLIC_SITE_URL` to `https://quentagon.com` for production-origin artifacts.

The workflow validates and packages the static site. It does not publish to Hostinger or synchronize the deployment copy.

### Current Hostinger Deployment

| Setting              | Value                                        |
| -------------------- | -------------------------------------------- |
| Live domain          | `https://quentagon.com/`                     |
| Connected repository | `M-K-Hirusha/Quentagon` (separate copy)      |
| Connected branch     | `main`                                       |
| Framework            | Next.js                                      |
| Node.js              | 24.x                                         |
| Root directory       | `./`                                         |
| Build script         | `build` / `npm run build`                    |
| Output directory     | `.next` (Next.js default)                    |
| Public build origin  | `NEXT_PUBLIC_SITE_URL=https://quentagon.com` |

Keep Hostinger's default Next.js output directory as `.next`. Its preset applies `output: "standalone"` and overrides the repository's `output: "export"` setting. It starts the generated standalone server; the repository's `npm start` remains a local static-preview command.

**Do not select `out` as the output directory for Hostinger's Next.js preset.** That directory is produced by local and CI static exports, and selecting it for the hosted standalone build causes a missing-output-directory deployment failure.

See [Hostinger's Next.js documentation](https://docs.hostinger.com/node.js/overview-1/next) and [GitHub deployment documentation](https://docs.hostinger.com/node.js/github).

### Publishing Updates

Until Hostinger is connected to this original repository, changes here need to be reviewed and explicitly brought into `M-K-Hirusha/Quentagon` before publication. They do not reach the live site automatically.

Hostinger can deploy pushes to its connected branch when automatic deployment is active. A manual **Redeploy → Save and redeploy** pulls the latest code from that connected branch. Check the deployment status and live website after publishing.

The imported deployment copy currently lacks this original repository's `.github/` workflow folder. Its Hostinger build should not be treated as evidence that this repository's CI checks passed.

### Other Static Hosts and Earlier Configuration

For a compatible static host, set its public origin, run `npm run build` and publish the contents of `out/`. Preserve `/_next/` assets, configure `404.html` as the missing-page response, and apply `public/_headers` where supported or equivalent host settings.

The header file is not proof that Hostinger applies those headers to its Node.js deployment. `.openai/hosting.json` records the earlier ChatGPT Sites project and does not configure the current Hostinger deployment. GitHub Pages is not configured. Changing the public origin requires rebuilding.

---

## Development Workflow

1. Pull the latest `main` and create a focused topic branch.
2. Make the intended change and run the relevant validation checks.
3. Commit with a descriptive Conventional Commit message.
4. Open a pull request with the change, validation results and any remaining limitations.
5. Review the changes and ensure CI passes before merging.
6. Publish through the repository currently connected to Hostinger.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guidance. Preserve contributor attribution and genuine commit history.

---

## Security Notes

- Keep real environment values and hosting credentials out of Git.
- Public build variables must not contain secrets.
- The contact form opens a local email draft; it does not store enquiry data in a database.
- Review production hosting headers and settings separately from local static-preview behavior.
- Report suspected vulnerabilities privately using the contact in [SECURITY.md](SECURITY.md).

---

## Limitations

- Service dashboards, workflow animations and product previews are illustrative.
- Client portal and Quentagon Bot integrations are coming soon.
- Contact submissions require the visitor's email application and are not sent automatically.
- There is no application backend, database or user authentication.
- The original and deployed repositories are separate and do not automatically synchronize.
- Automated accessibility checks do not replace manual accessibility review.
- Package version `1.0.0` does not establish a release tag or a production-readiness certification.

---

## Future Improvements

Potential improvements, subject to maintainer agreement:

- Connect the intended authoritative repository directly to production hosting.
- Add an agreed server-side enquiry delivery service.
- Implement the client portal and bot integrations when their requirements are defined.
- Extend browser and accessibility coverage as features change.
- Review measured production performance and search metadata.
- Document a release and deployment process for the shared repository.

---

## Author and Project Information

| Item                       | Details                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| Project name               | Quentagon                                                                                  |
| Project type               | Technology studio and business services website                                            |
| Tagline                    | Engineering intelligence for progress.                                                     |
| Original developer         | [rizad-mohamed](https://github.com/rizad-mohamed)                                          |
| Original source repository | [rizad-mohamed/Quentagon](https://github.com/rizad-mohamed/Quentagon)                      |
| Live website               | [quentagon.com](https://quentagon.com/)                                                    |
| Current deployment copy    | `M-K-Hirusha/Quentagon`                                                                    |
| Primary visitors           | Prospective clients exploring services, work and project enquiries                         |
| Main objective             | Present the studio's capabilities, delivery process and work through an accessible website |

---

## Repository

[https://github.com/rizad-mohamed/Quentagon](https://github.com/rizad-mohamed/Quentagon)

```sh
git clone https://github.com/rizad-mohamed/Quentagon.git
```

---

## License

No license has been selected in this repository. Contact the maintainer before assuming permission to redistribute the code or brand assets. Package metadata does not grant a license or imply a release.
