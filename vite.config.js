import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use environment variable to set base path
  base: process.env.NODE_ENV === 'production' && process.env.DEPLOY_TARGET === 'github' 
    ? '/React-BookStore/' 
    : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080/backend',
    },
  },
})