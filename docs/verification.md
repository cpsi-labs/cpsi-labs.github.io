# Verification — website redesign

Validated on November 14, 2026 with Node 22 and headless Chrome via Playwright.

- Production build: TypeScript and Vite successful; catalogue validation successful.
- Local browser suite: 20 scenarios passed, including a test-only application fixture. That fixture is excluded from the production bundle.
- Compiled production preview: 18 applicable scenarios passed; the local dev-module fixture is intentionally skipped. Visual capture generation is performed in the local suite.
- All eight page types, unknown application and missing page routes tested. With the real catalogue empty, published application details show the honest unavailable state.
- English/French and dark/light preferences tested, including persistence and blocked storage.
- Responsive overflow checks at 360, 390, 768, 1024 and 1440 px in both languages.
- Catalogue query/category/platform/reset, mobile menu/Escape/focus, expertise tabs/keyboard, FAQ, documentation and security section links, reloading, reduced motion and URL guards checked.
- Axe WCAG 2 A/AA and 2.1 AA automated checks: no reported violations on the seven content pages in both themes. Automated checks do not constitute a full accessibility certification.
- Desktop, tablet and mobile captures inspected by an independent UI reviewer. Review corrections resolved: reading text size, mobile code size and redundant empty-state badge. Animation contrast and section scrolling also verified on the compiled build.
- Source and compiled-output scan found no private local identity paths, credential markers or test product data. Repository-local Git author and committer verified as CPSI LABS with the provided GitHub noreply address.
- Image provenance checked for every shipped brand raster. Original brand colors preserved.
- Official GitHub profile and GitHub privacy policy links returned HTTP 200.

GitHub Actions runs build and browser/axe checks before uploading only `dist/`. Live deployment status and the final served bundle are verified separately after pushing.
