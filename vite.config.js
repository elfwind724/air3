import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: true,
    cors: true,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  preview: {
    port: 5173,
    host: true,
    strictPort: false,
    open: true
  },
  base: '',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    assetsInlineLimit: 10240,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('styled-components')) {
              return 'vendor-styles';
            }
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name;
          if (!fileName) return 'assets/[name]-[hash][extname]';

          const extType = fileName.split('.').pop();
          
          if (/\.(png|jpe?g|svg|gif|webp)$/i.test(fileName)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(mp3|wav|ogg)$/i.test(fileName)) {
            return 'assets/audio/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(fileName)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        }
      },
    },
  }
})
