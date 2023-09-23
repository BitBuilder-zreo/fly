// 导入 Vue 的 createApp 函数
import { createApp } from 'vue';

// 导入根组件 App.vue
import App from './App.vue';

// 导入设置 store 的函数 setupStore
import { setupStore } from './store';

// 导入路由相关的模块，包括 router、setupRouter 和 setupRouterGuard 函数
import { router, setupRouter, setupRouterGuard } from './router';

// 异步函数 bootstrap 用于初始化应用程序
async function bootstrap() {
    // 创建 Vue 应用实例
    const app = createApp(App);

    // 设置应用程序的状态管理，将 app 实例传递给 setupStore 函数
    setupStore(app);

    // 设置应用程序的路由，将 app 实例传递给 setupRouter 函数
    setupRouter(app);

    // 设置路由守卫，将 router 传递给 setupRouterGuard 函数
    setupRouterGuard(router);

    // 挂载应用程序到指定的 DOM 元素上，此处的 '#app' 是挂载的目标元素
    app.mount('#app');
}

// 调用异步函数 bootstrap，启动应用程序初始化过程
bootstrap();
