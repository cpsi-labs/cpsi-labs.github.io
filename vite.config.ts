import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { applications } from './src/data/applications.ts';
import { validateCatalogue } from './src/data/validateCatalogue.ts';
validateCatalogue(applications);
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: { sourcemap: false },
});
