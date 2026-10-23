import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import protectImages from './plugins/protect-images.js';

export default defineConfig(({ command }) => ({
  // protectImages resizes, watermarks and tags every image in production builds.
  plugins: [react(), protectImages()],
  // GitHub Pages serves the site from /<repo-name>/. Change this if the repo is
  // renamed, or set it to '/' when deploying to a custom domain or root host.
  base: command === 'build' ? '/gurjeet-portfolio/' : '/',
}));
