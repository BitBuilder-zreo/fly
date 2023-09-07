import { App } from "vue";

import { Router, createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: []
});

/**
 * 设置路由
 * @param app vue App 实例 
 */
export function setupRouter(app: App) {
    app.use(router);
}

/**
 * 设置守卫
 * @param router 路由
 */
export function setupRouterGuard(router: Router) {

}