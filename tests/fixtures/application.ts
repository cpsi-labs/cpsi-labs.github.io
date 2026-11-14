import type { Application } from '../../src/data/applications';
// Synthetic test-only data. Never import into production.
export const testApplication: Application = {
  slug: 'test-fixture',
  name: 'Test fixture',
  summary: { en: 'Test only', fr: 'Test uniquement' },
  description: { en: 'Test only', fr: 'Test uniquement' },
  categories: ['mobile'],
  platforms: ['Android'],
  icon: '/brand/symbol.webp',
  screenshots: [
    { src: '/brand/favicon.png', alt: { en: 'Test screenshot one', fr: 'Capture de test une' } },
    {
      src: '/brand/apple-touch-icon.png',
      alt: { en: 'Test screenshot two', fr: 'Capture de test deux' },
    },
  ],
  features: [{ title: { en: 'Test', fr: 'Test' }, description: { en: 'Test', fr: 'Test' } }],
  license: {
    name: { en: 'Test', fr: 'Test' },
    kind: 'proprietary',
    url: 'https://github.com/cpsi-labs/test-fixture/blob/main/LICENSE',
  },
  repository: 'https://github.com/cpsi-labs/test-fixture',
  documentation: 'https://github.com/cpsi-labs/test-fixture#readme',
  releases: [
    {
      version: 'v1',
      date: '2026-01-01',
      notes: { en: 'Test', fr: 'Test' },
      url: 'https://github.com/cpsi-labs/test-fixture/releases/tag/v1',
      assets: [
        {
          label: 'APK',
          platform: 'Android',
          url: 'https://github.com/cpsi-labs/test-fixture/releases/download/v1/test.apk',
        },
      ],
    },
  ],
};
