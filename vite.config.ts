import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const pwaOptions: Partial<VitePWAOptions> = {
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  },
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  includeAssets: ['**/*'],
  manifest: {
    short_name: 'Catalog',
    name: 'React Catalog',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: 'logo192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: 'logo512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    start_url: '.',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), VitePWA(pwaOptions)],
});
