import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
}));