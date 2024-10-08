import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const srcFolder = resolve(__dirname, 'src')
const cssFolder = resolve(srcFolder, 'css')
const jsFolder = resolve(srcFolder, 'js')

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(jsFolder, 'main.js')
    }
  },
  resolve: {
    alias: {
      '@': srcFolder,
      '@css': cssFolder,
      '@js': jsFolder
    }
  }
})