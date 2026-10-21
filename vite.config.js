import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the site from /<repo-name>/. Change this if the repo is
  // renamed, or set it to '/' when deploying to a custom domain or root host.
  base: command === 'build' ? '/gurjeet-portfolio/' : '/',
}));
