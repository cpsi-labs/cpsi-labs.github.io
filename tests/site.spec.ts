import { testApplication } from './fixtures/application';
import { test, expect } from '@playwright/test';
import { officialLink, localAsset } from '../src/lib/links';
const routes = [
  '/',
  '/applications',
  '/downloads',
  '/docs',
  '/about',
  '/support',
  '/legal',
  '/applications/not-published',
  '/missing',
];
for (const language of ['en', 'fr'])
  for (const theme of ['dark', 'light']) {
    test(`all pages: ${language}, ${theme}`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => {
        if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      await page.addInitScript(
        ({ language, theme }) => {
          localStorage.setItem('cpsi-language', language);
          localStorage.setItem('cpsi-theme', theme);
        },
        { language, theme },
      );
      for (const route of routes) {
        await page.goto('/#' + route);
        await expect(page.locator('main h1')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('lang', language);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await expect(page.locator('main')).not.toContainText('undefined');
        await expect(page.locator('main')).not.toContainText('NaN');
        expect(
          await page
            .locator('main a')
            .evaluateAll((links) =>
              links.every(
                (link) =>
                  !!link.getAttribute('href') &&
                  !/^(javascript:|mailto:|tel:)/i.test(link.getAttribute('href')!),
              ),
            ),
        ).toBe(true);
      }
      expect(errors).toEqual([]);
    });
  }
for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive layout ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ['en', 'fr']) {
      await page.goto('/');
      await page.evaluate((lang) => localStorage.setItem('cpsi-language', lang), language);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('lang', language);
      for (const route of routes) {
        await page.goto('/#' + route);
        await page.locator('h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
          `${language} ${route}`,
        ).toBe(true);
      }
    }
  });
}
test('preferences persist, defaults are English and light', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Passer en français' }).click();
  await page.getByRole('button', { name: 'Activer le thème sombre' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/#/downloads');
  await expect(page.locator('h1')).toContainText('officiel');
});
test('unavailable localStorage does not break preferences', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('blocked');
      },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Passer en français' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await page.getByRole('button', { name: 'Activer le thème sombre' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
test('catalogue search, filters and reset retain their state across language changes', async ({
  page,
}) => {
  await page.goto('/#/applications');
  await expect(page.getByText('Good software takes intention.')).toBeVisible();
  await page.getByRole('searchbox').fill('a future application');
  await page.getByRole('button', { name: 'Mobile', exact: true }).click();
  await page.getByRole('combobox').selectOption('Android');
  await expect(page.getByText('Nothing here. Yet.')).toBeVisible();
  await page.getByRole('button', { name: 'Passer en français' }).click();
  await expect(page.getByRole('searchbox')).toHaveValue('a future application');
  await expect(page.getByRole('combobox')).toHaveValue('Android');
  await page.getByRole('button', { name: 'Effacer les filtres', exact: true }).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await expect(page.getByRole('combobox')).toHaveValue('all');
  await expect(page.getByText('Les bons logiciels prennent forme.')).toBeVisible();
});
test('mobile navigation, focus, escape and route reload', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Downloads' })
    .click();
  await expect(page.locator('main')).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.reload();
  await expect(page.locator('h1')).toHaveText('The official starting point.');
});
test('showcase navigation and documentation anchors', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Software. Mobile apps. Digital tools.',
  );
  await page.getByRole('link', { name: 'Explore the catalogue', exact: true }).click();
  await expect(page.getByRole('searchbox')).toBeVisible();
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Categories' })
    .getByRole('link', { name: 'Systems', exact: true })
    .click();
  await expect(page.getByRole('button', { name: 'Systems', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('searchbox')).toBeVisible();
  await page.goto('/#/docs?section=verification');
  await expect(page.locator('#verification')).toBeInViewport();
  await page.getByRole('button', { name: 'Troubleshooting', exact: true }).click();
  await expect(page.locator('#troubleshooting')).toBeFocused();
  await page.goto('/#/legal?section=security');
  await expect(page.locator('#security')).toBeInViewport();
  await expect(page.locator('#security')).toBeFocused();
  await page.reload();
  await expect(page.locator('#security')).toBeInViewport();
});
test('FAQ opens and reduced motion disables animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('.home-tiles').scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.getAnimations().filter((a) => a.playState === 'running').length,
    ),
  ).toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#/about');
  await page.goto('/');
  await page.locator('.home-tiles').scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() =>
      page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length),
    )
    .toBe(0);
  await expect(page.locator('.home-tiles h2').first()).toBeVisible();
  await page.goto('/#/docs');
  await page.getByText('Are the applications free?', { exact: true }).click();
  await expect(
    page.getByText('Pricing and usage rights will be stated', { exact: false }),
  ).toBeVisible();
});
test('official URL and local asset guards reject untrusted destinations', () => {
  for (const url of [
    'javascript:alert(1)',
    'https://github.com.evil.test/cpsi-labs/app',
    'https://github.com/another-org/app',
    'https://github.com/cpsi-labs-evil/app',
    'https://user:password@github.com/cpsi-labs/app',
    'http://github.com/cpsi-labs/app',
    'https://github.com/cpsi-labs/../other/app',
  ])
    expect(officialLink(url)).toBeUndefined();
  expect(
    officialLink('https://github.com/cpsi-labs/app/releases/download/v1/app.zip'),
  ).toBeTruthy();
  for (const path of [
    'https://evil.test/image.svg',
    '/apps/../secret.png',
    '//evil.test/image.png',
    '/apps/file.html',
  ])
    expect(localAsset(path)).toBeUndefined();
});
test('capture review matrix', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const mode of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
  ])
    for (const theme of ['dark', 'light']) {
      await page.setViewportSize({ width: mode.width, height: mode.height });
      await page.goto('/');
      await page.evaluate((t) => {
        localStorage.setItem('cpsi-theme', t);
      }, theme);
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      await page.locator('.home-stage img.on-light, .home-stage img.on-dark').first().waitFor({
        state: 'attached',
      });
      await page.screenshot({
        path: `/tmp/cpsi-redesign-review/home-${mode.name}-${theme}.png`,
        fullPage: true,
      });
    }
  for (const route of ['applications', 'downloads', 'docs', 'about', 'support', 'legal']) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/#/' + route);
    await page.screenshot({
      path: `/tmp/cpsi-redesign-review/${route}-desktop.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: `/tmp/cpsi-redesign-review/${route}-mobile.png`,
      fullPage: true,
    });
  }
  for (const theme of ['light', 'dark'])
    for (const width of [390, 1440]) {
      await page.goto('/');
      await page.evaluate(
        ({ theme }) => {
          localStorage.setItem('cpsi-language', 'fr');
          localStorage.setItem('cpsi-theme', theme);
        },
        { theme },
      );
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      for (const route of ['', 'docs', 'legal']) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/#/' + route);
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: `/tmp/cpsi-redesign-review/${route || 'home'}-fr-${width}-${theme}.png`,
          fullPage: true,
        });
      }
    }
});

test('catalogue validation rejects incomplete publication data', async () => {
  const { validateCatalogue } = await import('../src/data/validateCatalogue');
  const fixture = testApplication;
  const { validateAssetFiles } = await import('../scripts/validate-assets');
  expect(() => validateAssetFiles([fixture], 'public')).toThrow('missing local image');
  expect(() => validateAssetFiles([{ ...fixture, screenshots: [] }], 'public')).not.toThrow();

  expect(() => validateCatalogue([])).not.toThrow();
  const { slogan, specifications, presentation, ...legacy } = fixture;
  expect(() => validateCatalogue([legacy])).not.toThrow();
  expect(() => validateCatalogue([{ ...fixture, presentation: { heroScreenshot: 99 } }])).toThrow(
    'hero screenshot',
  );
  expect(() =>
    validateCatalogue([
      { ...fixture, features: [{ ...fixture.features[0], screenshotIndex: -1 }] },
    ]),
  ).toThrow('feature screenshot');
  expect(() => validateCatalogue([{ ...fixture, slogan: { en: '', fr: 'Test' } }])).toThrow(
    'slogan',
  );

  expect(() => validateCatalogue([fixture])).not.toThrow();
  expect(() => validateCatalogue([fixture, fixture])).toThrow('duplicate');
  expect(() => validateCatalogue([{ ...fixture, releases: [] }])).toThrow('published release');
  expect(() => validateCatalogue([{ ...fixture, repository: 'https://evil.test' }])).toThrow(
    'repository',
  );
  expect(() => validateCatalogue([{ ...fixture, summary: { en: '', fr: 'Test' } }])).toThrow(
    'English and French',
  );
});

test('accessibility: all pages in both themes', async ({ page }) => {
  const { default: AxeBuilder } = await import('@axe-core/playwright');
  for (const theme of ['dark', 'light']) {
    await page.goto('/');
    await page.evaluate((t) => localStorage.setItem('cpsi-theme', t), theme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    for (const route of routes.slice(0, 7)) {
      await page.goto('/#' + route);
      await page.evaluate(() => document.fonts.ready);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect
        .soft(
          result.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          })),
          `${theme} ${route}`,
        )
        .toEqual([]);
    }
  }
});

test('application detail and downloads derive from one catalogue entry (local test fixture only)', async ({
  page,
}) => {
  test.skip(
    !!process.env.TEST_BASE_URL,
    'Local fixture intercepts a dev module, never a published bundle.',
  );
  await page.route('**/apps/test-fixture/*.svg', async (route) => {
    const portrait = route.request().url().includes('portrait');
    const width = portrait ? 390 : 1200;
    const height = portrait ? 720 : 750;
    await route.fulfill({
      contentType: 'image/svg+xml',
      body: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f5f5f7"/><rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="12" fill="#e6edfa"/><text x="50%" y="42%" text-anchor="middle" fill="#10233f" font-family="sans-serif" font-size="${portrait ? 24 : 52}">VISUAL TEST ONLY</text><text x="50%" y="51%" text-anchor="middle" fill="#005bd3" font-family="sans-serif" font-size="${portrait ? 15 : 27}">Not a published application</text><rect x="${width * 0.2}" y="${height * 0.65}" width="${width * 0.6}" height="12" rx="6" fill="#0063ed"/></svg>`,
    });
  });
  await page.route('**/src/data/applications.ts', async (route) => {
    await route.fulfill({
      contentType: 'application/javascript',
      body: `export const applications = ${JSON.stringify([testApplication])};export const categories = ['mobile','desktop','web','systems','security','automation'];`,
    });
  });
  await page.goto('/#/applications/test-fixture');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Test fixture');
  await expect(page.locator('.product-hero .frame-phone')).toBeVisible();
  await expect(page.locator('.product-benefit .frame-desktop')).toBeVisible();
  await expect(page.locator('.specification-list')).toContainText('Test environment only');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['light', 'dark'])
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate((t) => localStorage.setItem('cpsi-theme', t), theme);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBe(true);
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (img) =>
                (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      await page.evaluate(() => scrollTo(0, 0));
      const { default: AxeBuilder } = await import('@axe-core/playwright');
      if (width === 390)
        expect(
          (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
            .violations,
        ).toEqual([]);

      await page.screenshot({
        path: `/tmp/cpsi-redesign-review/product-fixture-${width}-${theme}.png`,
        fullPage: true,
      });
    }
  await page.getByRole('link', { name: 'Download', exact: true }).first().click();
  await expect(page.locator('#product-downloads')).toBeFocused();
  await expect(page.locator('#product-downloads')).toBeInViewport();
  expect(
    await page.locator('#product-downloads').evaluate((el) => el.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(
    await page.locator('.product-subnav').evaluate((el) => el.getBoundingClientRect().bottom),
  );

  await expect(
    page.locator('.app-gallery').getByRole('img', { name: 'Test screenshot one', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Test screenshot two', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Test screenshot two', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.locator('.app-gallery').getByRole('img', { name: 'Test screenshot two', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'APK', exact: true })).toHaveAttribute(
    'href',
    testApplication.releases[0].assets[0].url,
  );
  await expect(page.getByRole('link', { name: 'License', exact: false })).toHaveAttribute(
    'href',
    testApplication.license.url,
  );
  await page.getByRole('button', { name: 'Passer en français' }).click();
  await expect(
    page.locator('.app-gallery').getByRole('img', { name: 'Capture de test deux', exact: true }),
  ).toBeVisible();
  await page.goto('/#/downloads');
  await expect(page.locator('.download-row')).toContainText('Test fixture');
  await expect(page.getByRole('link', { name: 'APK', exact: true })).toHaveAttribute(
    'href',
    testApplication.releases[0].assets[0].url,
  );
  await page.goto('/#/applications');
  await page.getByRole('searchbox').fill('not a match');
  await expect(page.getByText('Aucun résultat pour le moment.')).toBeVisible();
  await page.getByRole('button', { name: 'Effacer les filtres', exact: true }).click();
  await expect(page.locator('.application-card')).toContainText('Test fixture');
});
