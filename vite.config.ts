import { defineConfig } from 'vite';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const getCache = ({ name, pattern, handleOption }) => ({
  urlPattern: pattern,
  handler: handleOption,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 7,  // a week
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});


const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [
      getCache({
        pattern: /^https:\/\/moscow\.fargospc\.ru\/test\/json\//,
        name: 'products-info',
        handleOption: 'NetworkFirst'
      }),
      getCache({
        pattern: /^https:\/\/moscow\.fargospc\.ru\/upload\/.*/,
        name: 'products-images',
        handleOption: 'CacheFirst'
      }),
      getCache({
        pattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
        name: 'google-fonts',
        handleOption: 'CacheFirst'
      }),
    ],
  },
  includeAssets: ['**/*'],
  manifest: {
    theme_color: '#000000',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'React Catalog',
    short_name: 'Catalog',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), VitePWA(pwaOptions)],
});
