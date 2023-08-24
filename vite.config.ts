import {defineViteConfig } from '@vfly/vite-config';

export default defineViteConfig({
    ovveride:{
        server: {
            proxy: {
                '/basic-api': {
                  target: 'http://localhost:3000',
                  changeOrigin: true,
                  ws: true,
                  rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
                },
                '/upload': {
                  target: 'http://localhost:3300/upload',
                  changeOrigin: true,
                  ws: true,
                  rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
                },
            }
        }
    }
});
