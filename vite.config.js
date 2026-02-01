import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation';

const remotes = [
  { id: 'rgbCrosser', filename: 'rgbCrosser', folder: 'rgb-crosser', port: 8091 },
  { id: 'quantizer', filename: 'quantizer', folder: 'quantizer', port: 8092 },
  { id: 'recipeBook', filename: 'recipeBook', folder: 'receipe-book', port: 8093 },
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      vueDevTools(),
      federation({
        name: 'web-adratcliff',
        remoteEntry: 'remoteEntry.js',
        remotes: remotes.reduce((acc, cur) => ({
          ...acc,
          [cur.id]: `${env.VITE_REMOTE_MODULE_BASE}${mode === 'production' ? `/${cur.folder}` : cur.port}/assets/${cur.filename}.js`
        }), {}),
        exposes: {
          './utils': './src/utils/index.js',
          './stores': './src/stores/shared.js',
        },
        shared: ['vue', 'vuetify', 'vue-router', 'pinia'],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: '8080',
    },
    preview: {
      port: '8070',
      strictPort: true,
    },
    build: {
      target: 'esnext',
      minify: env.VITE_MINIFY === 'true',
      cssCodeSplit: env.VITE_CSS_CODE_SPLIT === 'true',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    }
  }
});
