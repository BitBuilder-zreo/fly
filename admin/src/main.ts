
import 'uno.css'

import { createApp } from 'vue'

import App from './App.vue'

import { router, setupRouter, setupRouterGuard } from '/@/router'
import { setupI18n } from '/@/locales';
import { setupStore } from '/@/store';



async function bootstrap() {

    const app = createApp(App);

    // 设置存储
    setupStore(app);

    // 设置多语言
    // 可以异步服务器获取
    await setupI18n();

    //设置路由
    setupRouter(app);

    // 设置路由守卫
    setupRouterGuard(router);

    // 挂载
    app.mount('#app');
}

bootstrap();





