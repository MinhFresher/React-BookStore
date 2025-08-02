import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  console.log('Build mode:', mode)
  console.log('NODE_ENV:', process.env.NODE_ENV)
  
  return {
    // For GitHub Pages, always use the repo name as base
    // For Docker/local, use root
    base: mode === 'production' ? '/React-BookStore/' : '/',
    plugins: [react()],
    server: {
      proxy: {
        '/api': 'http://localhost:8080/backend',
      },
    },
  }
})