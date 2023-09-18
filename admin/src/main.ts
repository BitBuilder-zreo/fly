// 引入样式文件
import 'uno.css'; // 导入 uno.css 样式
import 'ant-design-vue/dist/reset.css'; // 导入 ant-design-vue 的 reset 样式
import 'virtual:svg-icons-register'; // 导入注册的 SVG 图标

// 引入 Vue 3 的 createApp 函数
import { createApp } from 'vue';

// 引入路由配置
import { setupRouter, setupRouterGuard, router } from '@/router';

// 引入语言配置
import { setupI18n } from '@/locales';


// 引入根组件 App.vue
import App from './App.vue';


// 异步函数用于启动应用
async function bootstrap() {

  // 创建一个 Vue 应用实例
  const app = createApp(App);

  // 多语言配置
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  //路由守卫
  setupRouterGuard(router);

  // 将应用实例挂载到指定的 HTML 元素上，通常是 id 为 "app" 的元素
  app.mount('#app');
}

// 调用启动函数，启动应用
bootstrap();
