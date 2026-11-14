# Verification — product showcase redesign

Validated on November 14, 2026 with Node 22 and headless Chrome via Playwright.

- Production build: TypeScript and Vite successful; catalogue metadata and referenced local image files validated.
- Local browser suite: 20 scenarios passed. English remains the language default; light is the new theme default. Saved explicit preferences remain preserved.
- Nine route cases include all public pages, unknown application and missing page. Catalogue and downloads retain honest empty states.
- Search, categories, platforms, reset, persistence, blocked storage, mobile navigation/Escape/focus, documentation/security anchors and reloads checked.
- Responsive overflow checks at 360, 390, 768, 1024 and 1440 px in EN/FR. Desktop, tablet and mobile screenshots inspected in both themes.
- Product fixture covers slogan, specifications, screenshot selection, phone/desktop frames, complete image loading, preserved image ratio, download CTA/focus/sticky clearance and official URLs. Test screenshots are explicitly labelled and excluded from publication.
- Axe WCAG 2 A/AA and 2.1 AA: no reported violations on the seven content pages and the isolated product fixture in both themes. Automated checks are supplemented by independent visual review.
- CSS and scroll-entry motion tested with reduced motion, including a dynamic preference change. Revealed content remains visible.
- Independent visual review: the old orbital motif was fully replaced; the final rectilinear precision artwork was approved at desktop/tablet/mobile sizes.
- Source/output privacy scans and repository-local author/committer checks are performed before publication. Original CS artwork retains its provenance. No Apple proprietary assets are part of the site.

GitHub Actions builds and tests before deploying only `dist/`. The compiled preview and final live bundle are verified separately before handoff.
