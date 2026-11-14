# Application data guide

The `Application` and `Release` TypeScript interfaces in `src/data/applications.ts` are the source of truth. The live array remains empty until an application is officially released.

| Field | Required content |
| --- | --- |
| `slug` | Unique lowercase kebab-case; permanent detail URL identifier |
| `name` | Official application name |
| `summary`, `description` | `{ en, fr }` nonempty text |
| `categories` | One or more of `mobile`, `desktop`, `web`, `systems`, `security`, `automation` |
| `platforms` | One or more of `Android`, `Linux`, `Windows`, `Web`, `Cross-platform` |
| `icon` | Root-relative file in `/apps/<slug>/`; optimized PNG/WebP/AVIF/SVG |
| `screenshots` | Array of `{ src, alt: { en, fr } }`; use `[]` only if none are available |
| `features` | Array of `{ title: { en, fr }, description: { en, fr } }` |
| `license` | `{ name: { en, fr }, kind: 'open-source' or 'proprietary', url }` |
| `repository` | Real official `https://github.com/cpsi-labs/<repository>` |
| `documentation` | Actual guide or README URL within the official GitHub namespace |
| `releases` | At least one actually published release, newest first |
| `support` | Optional `{ issues, discussions }`; omit until those channels exist |

Each release includes:

- `version`: the exact published version identifier.
- `date`: publication date in `YYYY-MM-DD` format.
- `notes`: `{ en, fr }` summary of changes.
- `url`: actual GitHub release page.
- `assets`: `{ label, platform, url, sha256? }[]`. Use the exact public GitHub Releases download URL. A checksum must be the published 64-character hexadecimal SHA-256 value, never a placeholder.

The same entry feeds the homepage, category/platform search, application details, feature list, screenshot selector, release history, documentation/license links, optional support links and the latest-release download centre. No extra page component is required.

Application-specific installation steps stay in the real project documentation. Do not assume every application is open source, free of charge, cross-platform or automatically updated.

Before publishing, confirm all paths and links in a browser and include rights/provenance with added artwork. Run build and browser checks. The validator refuses incomplete translations, duplicate slugs, missing releases, malformed checksums and links outside the official GitHub namespace.
