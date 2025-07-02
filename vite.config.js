import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'development' ? '/' : '/seehb_website/', // dynamic path to have npm run dev and gh-pages work
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
}));