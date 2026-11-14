export type Language = 'en' | 'fr';
export type Localized = Record<Language, string>;
export type Category = 'mobile' | 'desktop' | 'web' | 'systems' | 'security' | 'automation';
export type Platform = 'Android' | 'Linux' | 'Windows' | 'Web' | 'Cross-platform';
export type ProductTone = 'light' | 'dark' | 'navy';
export type MediaFrame = 'phone' | 'desktop' | 'browser' | 'none';
export interface Release {
  version: string;
  date: string; // ISO YYYY-MM-DD
  notes: Localized;
  assets: { label: string; platform: Platform; url: string; sha256?: string }[];
  url: string; // Official GitHub release page
}
export interface Application {
  slug: string;
  name: string;
  summary: Localized;
  slogan?: Localized;
  description: Localized;
  categories: Category[];
  platforms: Platform[];
  icon: string; // Path in public/apps/<slug>/
  screenshots: {
    src: string;
    alt: Localized;
    frame?: MediaFrame;
    width?: number;
    height?: number;
  }[];
  features: { title: Localized; description: Localized; screenshotIndex?: number }[];
  specifications?: { label: Localized; value: Localized }[];
  presentation?: { heroScreenshot?: number; tone?: ProductTone };
  license: { name: Localized; kind: 'open-source' | 'proprietary'; url: string };
  repository: string;
  documentation: string;
  releases: Release[]; // Newest first, published releases only
  support?: { issues?: string; discussions?: string };
}
// Intentionally empty. Add only applications with real, public official releases.
export const applications: Application[] = [];
export const categories: Category[] = [
  'mobile',
  'desktop',
  'web',
  'systems',
  'security',
  'automation',
];
