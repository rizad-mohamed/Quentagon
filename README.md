# Quentagon

A light-first technology studio website built with Next.js, React, TypeScript and Motion. Original SVG architecture gives the hero and closing sequence depth without a WebGL renderer. The supplied logo is used only for branding.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Development runs at http://127.0.0.1:3000.

## Production preview and validation

```sh
npm run lint
npm run build
npm start -- --port 3003
npm run test:e2e
npm run audit:performance
npm run format:check
```

The build exports portable static assets to `out/`. The local production preview binds to localhost and supports gzip compression, cache headers, 404 recovery and HEAD requests. Install the test browser once using `npx playwright install chromium`. Override the browser-test/audit URL with `PLAYWRIGHT_BASE_URL`.

## Design and interaction

Design read: a premium technology studio for business decision-makers, with calm editorial typography and useful interactive service demonstrations. Taste settings: design variance 6, motion intensity 4, visual density 3. The interface is original; n8n, Google Antigravity, Olee AI and AgencyOne were reviewed as references, with n8n as the primary clarity and conversion reference. This is not an implementation of an official Google design system.

- Light is the default regardless of system theme. Explicit light/dark selections persist locally.
- The desktop hero moves through two perspectives using scroll-linked transforms and a damped spring. Scrolling backward restores the starting composition.
- Mobile uses a compact, unpinned hero with static depth. Reduced-motion mode removes long decorative sequences; a manual pause control is also available.
- Seven services are visible, with distinctive workflow, commerce, mobile, AI, security, deployment and decision-path interactions.
- The eight-stage delivery journey supports tabs, arrow keys, Home/End and previous/next navigation.
- The final CTA echoes the original pentagonal structure through a restrained scroll zoom.
- Main body text is 18px on desktop, with larger lead paragraphs and clearly named service headings.

The former Three.js renderer, models, shaders, scene lifecycle and dependencies have been removed. No continuous render loop, remote fonts, stock imagery, video, third-party embeds or texture downloads are required. Fonts are self-hosted and preloaded; logo assets use appropriately sized WebP/PNG encodings. SVG artwork and UI demonstrations are original, lightweight and explicitly illustrative.

## Key files

- `app/page.tsx`: server-rendered narrative, verified company content and structured metadata.
- `app/globals.css`: complete light/dark tokens, components and responsive styles.
- `components/hero.tsx`, `pentagon-art.tsx`, `finale.tsx`: signature scroll story.
- `components/service-stories.tsx`: seven focused service demonstrations.
- `components/project-journey.tsx`: delivery stages and keyboard controls.
- `components/contact-form.tsx`: validated email draft and copy-email action.
- `components/use-quiet-motion.ts`: shared motion preference.
- `tests/site.spec.ts`: responsive, accessibility, navigation, resource and reverse-scroll coverage.
- `.openai/hosting.json`: dedicated private Sites deployment identity and static output directory.

## Content and integrations

The original brief and supplied capability PDF remain the content baseline. No client metrics, certifications, testimonials, project screenshots or product capabilities are invented. The two work references and founder names come from the supplied brief. The product portfolio and client portal are clearly marked coming soon.

Project enquiries use **rizad.dev@gmail.com**. The form validates input and opens an email draft; it does not send mail or store submissions. The service illustrations are concept demonstrations, not live applications or actual deployments.

The generated preview origin is in `lib/site.ts`; override it using `NEXT_PUBLIC_SITE_URL` before building for a different domain. Canonical links, sitemap and social metadata follow this origin. Static hosting headers are supplied in `public/_headers`; the host must support that format or provide equivalent headers.

Automated browser and accessibility checks supplement visual review. Lighthouse is a local lab measurement, not field Core Web Vitals or a guarantee of performance on every device.
