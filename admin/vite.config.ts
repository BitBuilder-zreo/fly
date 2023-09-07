import { defineApplicationConfig } from '@fly/vite-config';


export default defineApplicationConfig({
    overrides:{

        server: {
            proxy: {
              '/fly-api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(new RegExp(`^/fly-api`), ''),
                // only https
                // secure: false
              },
              '/upload': {
                target: 'http://localhost:3300/upload',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
              },
            },
        }
    }
});