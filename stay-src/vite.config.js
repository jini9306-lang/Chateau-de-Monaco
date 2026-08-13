import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Chateau-de-Monaco/stay/',
  build: {
    outDir: '../stay',
  },
})
