// 引入 Vue Router 相关的类型和函数
import type { RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';
export * from '/@/router/guard'

// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // 创建一个 hash 历史记录，用于路由导航
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 路由的初始配置，使用基本路由
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 定义滚动行为，每次路由切换后将页面滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});



// 配置路由器
// 将路由实例注册到应用中
export function setupRouter(app: App<Element>) {
  app.use(router);
}
