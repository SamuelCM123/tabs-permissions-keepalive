import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ command, mode }) => {

  //? Cargar variables de entorno según el modo (development | production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      // vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: Number( env.VITE_APP_PORT ) || 5000,
    },
    preview: {
      port: Number( env.VITE_APP_PORT ) || 5000,
    },
  }
});
