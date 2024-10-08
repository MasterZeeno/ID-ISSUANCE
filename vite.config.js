import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const srcFolder = resolve(__dirname, 'src')
const cssFolder = resolve(srcFolder, 'css')

export default defineConfig({
  build: {
    base: '/ID-ISSUANCE/'
  },
  resolve: {
    alias: {
      '@': srcFolder,
      '@css': cssFolder
    }
  }
})