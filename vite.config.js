import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyfills from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {}, // prevents crashes when accessing process.env
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyfills()],
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080/backend',
    },
  },
})
