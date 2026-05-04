import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/react-swc'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    base: './', // Use relative paths so assets load correctly on your .np domain
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  }
})