
import 'uno.css'

import { createApp } from 'vue'

import App from './App.vue'

import { router, setupRouterGuard, setupRouter } from './router';


async function bootstrap() {

    const app = createApp(App);

    //设置路由
    setupRouter(app);

    // 设置路由守卫
    setupRouterGuard(router);

    // 挂载
    app.mount('#app');
}

bootstrap();





