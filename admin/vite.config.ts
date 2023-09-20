import { defineApplication } from "@fly/vite-config";

// 作用：定义应用程序配置的入口点。
export default defineApplication({

    // 作用：允许覆盖默认配置。
    overrides: {

        // 作用：配置服务器相关选项。
        server: {

            // 作用：配置反向代理规则。
            proxy: {

                // 作用：匹配需要代理的路径。
                '/basic-api': {

                    // 作用：指定代理目标的URL。
                    target: 'http://localhost:3000',

                    // 作用：修改请求头中的origin以匹配代理目标的origin。
                    changeOrigin: true,

                    // 作用：启用WebSocket代理。
                    ws: true,

                    // 作用：定义URL重写规则。
                    // 注释：这里使用正则表达式将匹配的路径中的"/basic-api"部分替换为空字符串。
                    rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),

                    // 作用：如果需要在HTTPS连接上代理，请设置secure为false。
                    // secure: false

                },

                // 作用：匹配需要代理的路径。
                '/upload': {

                    // 作用：指定代理目标的URL。
                    target: 'http://localhost:3300/upload',

                    // 作用：修改请求头中的origin以匹配代理目标的origin。
                    changeOrigin: true,

                    // 作用：启用WebSocket代理。
                    ws: true,

                    // 作用：定义URL重写规则。
                    // 注释：这里使用正则表达式将匹配的路径中的"/upload"部分替换为空字符串。
                    rewrite: (path) => path.replace(new RegExp(`^/upload`), '')
                }
            }
        }
    }
});
