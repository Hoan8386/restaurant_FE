import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
// TailwindCSS không cần import plugin riêng
// Chỉ cần cấu hình postcss.config.js cho Tailwind

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
