import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react') || id.includes('/node_modules/scheduler')) return 'react-vendor';
          if (id.includes('/src/guides-data.json')) return 'guides-data';
          if (id.includes('/src/data/')) return 'calculator-data';
        },
      },
    },
  },
});
