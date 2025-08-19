import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          cspContent: process.env.NODE_ENV === 'production' 
            ? `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' ${process.env.VITE_API_BASE_URL || 'https://api.example.com'}; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self';`
            : `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' ws: wss: ${process.env.VITE_API_BASE_URL || 'https://api.example.com'}; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self';`
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    headers: {
      // Additional security headers for development
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  build: {
    // Security optimizations for production builds
    rollupOptions: {
      output: {
        // Prevent code injection through module names
        sanitizeFileName(name) {
          return name.replace(/[<>:"/\\|?*]/g, '_')
        }
      }
    }
  }
})
