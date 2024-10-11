import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const srcFolder = resolve(__dirname, 'src')
const cssFolder = resolve(srcFolder, 'css')
const jsFolder = resolve(srcFolder, 'js')
const assetsFolder = resolve(srcFolder, 'assets')

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'index.css'
          }
          return '[name].[ext]'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': srcFolder,
      '@css': cssFolder,
      '@js': jsFolder,
      '@a': assetsFolder
    }
  }
})