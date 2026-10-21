import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
  },
  server: {
    port: 3000,
    open: true,
  },
});
