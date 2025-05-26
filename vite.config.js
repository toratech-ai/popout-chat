import { defineConfig } from 'vite';
import { resolve } from 'path';

// Determine if we're building for production
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyPopoutWidget',
      fileName: (format) => `widget.${format}.js`
    },
    rollupOptions: {
      output: {
        globals: {
          window: 'window',
          document: 'document'
        }
      }
    },
    minify: 'terser',
    sourcemap: !isProd // Only generate source maps for development builds
  },
  server: {
    port: 3000,
    open: '/examples/index.html'
  }
});
