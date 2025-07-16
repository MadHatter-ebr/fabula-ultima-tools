import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimize for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js', '@supabase/auth-ui-react', '@supabase/auth-ui-shared']
        }
      }
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000
  },
  // Handle fallback for SPA routing
  preview: {
    port: 3000
  }
})