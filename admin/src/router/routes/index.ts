
import { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 路由
 */
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/login",
            component: () => import("/@/views/system/login/index.vue")
        }
    ]
});

/**
 * 设置路由
 * @param app vue App 实例 
 */
export function setupRouter(app: App) {
    app.use(router);
}