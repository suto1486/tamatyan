import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHub = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isGitHub ? '/tamatyan/' : '/',  // ← 自動で切り替え
  plugins: [react()],
});
