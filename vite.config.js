import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { base } from 'framer-motion/client'

export default defineConfig({
  plugins: [react()],
  base : "/janshia-porfolio"
})
