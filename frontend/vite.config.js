import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist' // 👈 important for Render to know where to serve from
  },
  base: './', // 👈 optional, useful to avoid broken paths in static hosting
})
