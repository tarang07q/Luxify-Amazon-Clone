import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        // Add error handling for proxy
        configure: (proxy, _options) => {
          // Track connection errors to avoid flooding the console
          let connectionErrorLogged = false;

          proxy.on('error', (err, req, res) => {
            // Only log connection errors once
            if (err.code === 'ECONNREFUSED' && !connectionErrorLogged) {
              console.log('\n[Vite] Backend API server not running - using mock data');
              connectionErrorLogged = true;
            } else if (err.code !== 'ECONNREFUSED') {
              console.log('[Vite] proxy error:', err);
            }

            // If the response hasn't been sent yet, send a JSON error response
            if (!res.headersSent && res.writeHead) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                error: 'Backend server unavailable',
                message: 'The API server is not running. Using mock data instead.',
                code: err.code
              }));
            }
          });

          // Log requests and responses (but not for connection errors)
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            if (!connectionErrorLogged) {
              console.log('Sending Request to the Target:', req.method, req.url);
            }
          });

          proxy.on('proxyRes', (proxyRes, req, _res) => {
            // Reset connection error flag when we get a successful response
            if (connectionErrorLogged) {
              console.log('\n[Vite] Backend API server is now available');
              connectionErrorLogged = false;
            }
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Add error handling for uploads proxy
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            if (!res.headersSent && res.writeHead) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                error: 'Upload server unavailable',
                message: 'The upload server is not running.',
                code: err.code
              }));
            }
          });
        },
      },
    },
  },
  // Optimize build
  build: {
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons', 'tailwindcss'],
        }
      }
    }
  },
  // Disable WebGL shader warnings in development
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
