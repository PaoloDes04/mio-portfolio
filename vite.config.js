import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mio-portfolio/', // <--- DEVE essere uguale al nome del repo su GitHub
})