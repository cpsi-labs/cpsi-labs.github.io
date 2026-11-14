import { fileURLToPath } from 'node:url';
import { validateAssetFiles } from './scripts/validate-assets.ts';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { applications } from './src/data/applications.ts';
import { validateCatalogue } from './src/data/validateCatalogue.ts';
validateCatalogue(applications);
validateAssetFiles(applications, fileURLToPath(new URL('./public', import.meta.url)));
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: { sourcemap: false },
});
