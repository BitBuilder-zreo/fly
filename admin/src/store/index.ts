// 引入 Vue 3 的 App 类型
import { App } from 'vue';

// 引入 Pinia 的 createPinia 函数
import { createPinia } from 'pinia';

// 使用 createPinia 函数创建一个 Pinia 的 store 实例
const store = createPinia();

// 定义一个函数，用于将创建的 Pinia store 实例注册到 Vue 应用中
export function setupStore(app: App<Element>) {
  // 使用 app.use 方法将 Pinia store 注册到应用中
  app.use(store);
}

// 导出创建的 Pinia store 实例，以便在应用的其他地方使用
export { store };
