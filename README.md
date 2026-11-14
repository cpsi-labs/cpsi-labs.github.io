# CPSI LABS — Official website

Official, bilingual software publishing website. **English and light theme by default**, complete French copy, persistent light/dark themes. Existing explicit theme preferences are preserved. Built with React, TypeScript, Vite, Tailwind CSS, Manrope and Lucide. No backend, user account, contact form, analytics or external font requests.

## Develop and build

Node.js **22.12+** (Node 22 LTS recommended) and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Production output: `dist/`. The build checks TypeScript and validates the catalogue before generating assets. Never publish the repository root as the compiled site.

## Architecture

- `src/pages/`: home, catalogue, application details, downloads, documentation, about, support, legal.
- `src/components/`: navigation/footer, shared UI, honest empty states.
- `src/data/applications.ts`: the only publication catalogue, strongly typed. Intentionally empty until real applications are published.
- `src/data/validateCatalogue.ts`: build-time validation of translations, categories, releases, checksums, local asset paths and official links.
- `src/data/disciplines.ts`: bilingual technical disciplines.
- `src/lib/preferences.tsx`: language/theme state with safe local storage fallback.
- `src/lib/links.ts`: official GitHub namespace and local asset guards.
- `src/styles.css`: shared tokens, navigation, reading layouts and complete light/dark themes.
- `src/styles/showcase.css`: full-width brand showcases, product presentations and responsive media frames.
- `src/components/ProductMedia.tsx`: real catalogue screenshots in explicit phone/desktop/browser frames, without cropping.
- `src/components/Reveal.tsx`: finite scroll entrances, disabled and cancelled for reduced motion.
- `scripts/validate-assets.ts`: build-time check that referenced catalogue images exist.
- `public/brand/`: optimized owner-supplied CS mark, icons and social card. Original colors preserved. Provenance embedded or in adjacent sidecar.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: product and design guidance for future changes; not included in the production bundle.

`HashRouter` allows direct links and refreshes on GitHub Pages without a server rewrite, for example `https://cpsi-labs.github.io/#/applications`. A single brand-level HTML metadata/social card is shared by the routes; hash routes do not have independently crawlable social previews. The sitemap lists the real HTML entry point only.

## Add a real application

1. Publish its official repository and GitHub Release under `cpsi-labs`. Confirm licensing and documentation. Never add an unannounced application as a demonstration.
2. Place its logo and screenshots in `public/apps/<slug>/`. Use optimized images, meaningful EN/FR alternative text, and retain the source/rights information. Never include personal paths or metadata.
3. Add an `Application` object to `applications` in `src/data/applications.ts`. See [the complete data guide](docs/catalogue.md).
4. Supply English **and** French summaries, descriptions, features, license labels and release notes. Slugs must be unique lowercase kebab-case.
5. List real releases **newest first**, ISO dates, actual GitHub release/asset URLs, supported platforms and optional published SHA-256 hashes. Only configure Issues/Discussions links once those channels exist.
6. Run `npm run build` and `npm test`. Open the new `/#/applications/<slug>` page, verify screenshots and downloads. Search, filters, detail pages, homepage highlights and download entries derive automatically from the same object.
7. Commit using the repository-local CPSI LABS publishing identity and push `main`. The workflow deploys only `dist/`.

The catalogue never fetches unaudited repositories automatically. It is updated deliberately so that official publication data remains controlled.

## Browser validation

Install Playwright's Chromium once with `npx playwright install chromium`, or use an existing Chrome executable:

```sh
PLAYWRIGHT_CHROME_PATH=/usr/bin/google-chrome npm test
```

To test a production preview or the deployed site, set `TEST_BASE_URL`. Playwright starts and stops its own local Vite server. The tests cover all routes in both languages and themes, 360/390/768/1024/1440 px layouts, preference persistence and blocked storage, catalogue filters, menu keyboard/focus handling, documentation, reduced motion, URL validation, catalogue validation, and axe WCAG checks. Captures are written outside the repository to `/tmp/cpsi-redesign-review/` (Linux); test artifacts are ignored by Git.

## Deployment

`.github/workflows/pages.yml` builds pull requests and `main` pushes with Node 22 / `npm ci` / `npm run build`. It also runs browser and axe checks before publication (Playwright installs Chromium in the CI runner). It uploads **only `dist`**, then deploys through GitHub Pages on `main`. The deploy job alone has `pages: write` and `id-token: write`; PRs cannot deploy. In repository Settings → Pages, use **GitHub Actions** as the source.

Public URL: https://cpsi-labs.github.io/

Local repository author: **CPSI LABS**, `356433484+cpsi-labs@users.noreply.github.com`. Global Git configuration and SSH keys must remain untouched. No secret is required by the Pages workflow.

Rollback: revert the website commit and push `main`, or rerun a known-good workflow. For the original buildless site, also restore Pages to branch `main` / root.

## Publication and privacy

GitHub is the sole public contact. No public email, contact form, configured project support channel, published application, testimonial, customer count or usage metric is assumed. The website only stores theme/language preferences locally. GitHub, as the hosting provider, has its own technical-data processing policies. Each future application must document its own privacy practices.

CPSI LABS logos, name and original website content remain reserved to their rights holders. Application licensing is independent. Third-party notices are distributed in `public/third-party-notices.txt`.
