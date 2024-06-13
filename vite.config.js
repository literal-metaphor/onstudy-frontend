import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})