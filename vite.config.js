import { defineConfig } from 'vite';
import { resolve } from 'path';

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
    sourcemap: true
  },
  server: {
    port: 3000,
    open: '/examples/index.html'
  }
});
