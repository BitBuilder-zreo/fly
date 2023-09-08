import { App } from "vue";

import { createPinia } from 'pinia'

/**
 * 全局唯一存储类
 */
export const store = createPinia();

/**
 * 设置存储
 * @param app 
 */
export function setupStore(app: App) {
    app.use(store)
}