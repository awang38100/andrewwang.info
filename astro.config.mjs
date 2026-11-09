// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://andrewwang.info',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Dark variant is applied via prefers-color-scheme in global.css
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
