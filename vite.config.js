import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation';

const remotes = [
  { id: 'rgbCrosser', filename: 'rgbCrosser', folder: 'rgb-crosser', port: 8091 },
  { id: 'quantizer', filename: 'quantizer', folder: 'quantizer', port: 8092 },
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
        remotes: remotes.reduce((acc, cur) => ({
          ...acc,
          [cur.id]: `${env.VITE_REMOTE_MODULE_BASE}${mode === 'production' ? `/${cur.folder}` : cur.port}/assets/${cur.filename}.js`
        }), {}),
        shared: ['vue', 'vuetify'],
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
