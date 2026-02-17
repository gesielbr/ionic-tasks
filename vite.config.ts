import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/ds-api': {
        target: 'https://www.demonslayer-api.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/ds-api/, ''),
      },
    },
  },
});
