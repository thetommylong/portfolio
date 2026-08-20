import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 5173
  },
  build: {
    assetsInlineLimit: 0,
    sourcemap: 'hidden',
  },
  plugins: [svelte()],
  base: "./",
})
