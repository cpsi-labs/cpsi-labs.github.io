import type { Application, Localized } from './applications.ts';
import { categories } from './applications.ts';
import { officialLink, localAsset } from '../lib/links.ts';
/** Fails the build when publication data is incomplete or points outside official channels. */
export function validateCatalogue(apps: Application[]): void {
  const slugs = new Set<string>();
  const check = (condition: unknown, message: string) => {
    if (!condition) throw new Error(`Catalogue: ${message}`);
  };
  const localized = (value: Localized, field: string) =>
    check(
      value &&
        typeof value.en === 'string' &&
        value.en.trim() &&
        typeof value.fr === 'string' &&
        value.fr.trim(),
      `${field} needs English and French text`,
    );
  const link = (value: string, field: string) =>
    check(officialLink(value), `${field} must point to https://github.com/cpsi-labs/`);
  const platforms = ['Android', 'Linux', 'Windows', 'Web', 'Cross-platform'];
  for (const app of apps) {
    check(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(app.slug) && !slugs.has(app.slug),
      `invalid or duplicate slug: ${app.slug}`,
    );
    slugs.add(app.slug);
    check(app.name?.trim(), `${app.slug} needs a name`);
    localized(app.summary, `${app.slug} summary`);
    localized(app.description, `${app.slug} description`);
    check(
      app.categories.length && app.categories.every((category) => categories.includes(category)),
      `${app.slug} needs valid categories`,
    );
    check(
      app.platforms.length && app.platforms.every((platform) => platforms.includes(platform)),
      `${app.slug} needs valid platforms`,
    );
    check(localAsset(app.icon), `${app.slug} needs a local application icon`);
    for (const shot of app.screenshots) {
      check(localAsset(shot.src), `${app.slug} screenshot path is invalid`);
      localized(shot.alt, `${app.slug} screenshot alternative`);
    }
    check(app.features.length, `${app.slug} needs documented features`);
    for (const feature of app.features) {
      localized(feature.title, `${app.slug} feature title`);
      localized(feature.description, `${app.slug} feature description`);
    }
    localized(app.license.name, `${app.slug} license`);
    check(
      ['open-source', 'proprietary'].includes(app.license.kind),
      `${app.slug} license kind is invalid`,
    );
    link(app.repository, `${app.slug} repository`);
    link(app.documentation, `${app.slug} documentation`);
    link(app.license.url, `${app.slug} license`);
    check(app.releases.length, `${app.slug} requires a real published release`);
    const versions = new Set<string>();
    let previousDate = '9999-12-31';
    for (const release of app.releases) {
      check(
        release.version?.trim() && !versions.has(release.version),
        `${app.slug} needs unique versions`,
      );
      versions.add(release.version);
      check(
        /^\d{4}-\d{2}-\d{2}$/.test(release.date) &&
          !Number.isNaN(Date.parse(release.date)) &&
          release.date <= previousDate,
        `${app.slug} needs ISO release dates, newest first`,
      );
      previousDate = release.date;
      localized(release.notes, `${app.slug} release notes`);
      link(release.url, `${app.slug} release`);
      check(release.assets.length, `${app.slug} release needs at least one asset`);
      for (const asset of release.assets) {
        link(asset.url, `${app.slug} download`);
        check(
          asset.label?.trim() && app.platforms.includes(asset.platform),
          `${app.slug} download platform/label is invalid`,
        );
        if (asset.sha256)
          check(
            /^[a-f0-9]{64}$/i.test(asset.sha256),
            `${app.slug} SHA-256 must be a 64-character hexadecimal string`,
          );
      }
    }
    if (app.support?.issues) link(app.support.issues, `${app.slug} issues`);
    if (app.support?.discussions) link(app.support.discussions, `${app.slug} discussions`);
  }
}
