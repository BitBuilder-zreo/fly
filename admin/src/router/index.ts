// 导入 Vue 相关模块
import { App } from "vue";

// 导入基本路由配置
import { basicRoutes } from "./routes";

// 导入路由守卫的创建函数
import { createPermissionGuard, createStateGuard } from "./guard";

import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from "vue-router";

// 创建路由实例
export const router = createRouter({
    // 使用 Web Hash 模式的路由，可配置基本路径
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),

    // 路由配置，基本路由配置转换为 RouteRecordRaw 类型
    routes: basicRoutes as unknown as RouteRecordRaw[],

    // 启用严格模式，用于开发时检测路由参数的合法性
    strict: true,

    // 滚动行为配置，每次路由切换时将页面滚动到左上角
    scrollBehavior: () => ({ left: 0, top: 0 })
});

// 设置路由实例到 Vue 应用程序
export function setupRouter(app: App) {
    app.use(router);
}

// 设置路由守卫
export function setupRouterGuard(router: Router) {
    // 创建状态守卫，用于处理路由状态
    createStateGuard(router);

    // 创建权限守卫，用于处理路由权限
    createPermissionGuard(router);
}
