import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Application } from '../src/data/applications.ts';
import { localAsset } from '../src/lib/links.ts';
export function validateAssetFiles(apps: Application[], publicDirectory: string) {
  for (const app of apps)
    for (const asset of [app.icon, ...app.screenshots.map((shot) => shot.src)]) {
      if (!localAsset(asset) || !existsSync(resolve(publicDirectory, `.${asset}`)))
        throw new Error(`Catalogue: missing local image ${asset}`);
    }
}
