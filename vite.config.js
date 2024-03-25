import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    plugins: [react()],
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
  }
})