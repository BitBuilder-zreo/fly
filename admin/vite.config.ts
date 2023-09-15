import { defineApplicationConfig } from '@fly/vite-config';


export default defineApplicationConfig({
  overrides: {

    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:8080/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    }
  }
});