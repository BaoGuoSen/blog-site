import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/'
      },
      '/static': {
        target: 'http://localhost/'
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') }
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
