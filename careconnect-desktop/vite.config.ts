import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    // Prevent Vite from adding `crossorigin` to script/link tags.
    // In Electron's file:// context, crossorigin triggers CORS checks
    // that fail silently and cause a blank window.
    modulePreload: false,
    rollupOptions: {
      output: {
        // Disable any automatic crossorigin handling on output assets
        generatedCode: 'es2015',
      },
    },
  },
});