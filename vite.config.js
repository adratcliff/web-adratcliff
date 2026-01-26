import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation';

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
        remotes: {
          rgbCrosser: 'http://localhost:8091/assets/rgbCrosser.js',
        },
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
