import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import daisyui from 'daisyui';
import './src/types.d.ts'; // or './src/types' if no .d.ts in import
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), daisyui],
  base: '/',
  build: {
    outDir: 'dist',
  },
});
