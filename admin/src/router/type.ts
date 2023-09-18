
import { defineComponent } from "vue";
import type { RouteRecordRaw,RouteMeta } from "vue-router";

/**
 * 
 * 定义一个名为 Component 的 TypeScript 类型
 * 这个类型的作用是允许灵活地声明不同类型的 Vue 3 组件。
 *     1. ReturnType<typeof defineComponent> 表示已经通过 defineComponent 创建的 Vue 组件。
 *     2. (() => Promise<typeof import('*.vue')>) 表示一个异步加载的 Vue 单文件组件，
 * 其实际内容在需要时通过 Promise 进行加载。通常用于路由懒加载或动态组件加载。
 *     3. (() => Promise<T>) 表示可以代表任何类型 T 的组件，这是一种通用的组件类型。
 * T 可以是任何类型，不一定是 Vue 组件。
 *     这个类型的灵活性允许你在声明组件时选择适合的方式，无论是普通的 Vue 组件、异步加载的组件，还是其他类型的组件。
 * 这有助于提高代码的可维护性和可扩展性。
 * 
 */
export type Component<T = any> =
  | ReturnType<typeof defineComponent> // 可以是通过 defineComponent 创建的 Vue 组件
  | (() => Promise<typeof import('*.vue')>) // 可以是异步加载的 Vue 单文件组件
  | (() => Promise<T>); // 可以是通用类型 T 的组件


// 定义一个名为 AppRouteRecordRaw 的 TypeScript 接口
// @ts-ignore 注释被用来忽略与 AppRouteRecordRaw 接口扩展 Omit<RouteRecordRaw, 'meta'> 
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string; // 路由的名称，通常用于路由的命名和跳转
  meta: RouteMeta; // 路由的元信息，用于存储路由相关的元数据信息
  component?: Component | string; // 路由的组件，可以是一个 Vue 组件或组件名称（字符串）
  components?: Component; // 路由的组件，可以是一个 Vue 组件
  children?: AppRouteRecordRaw[]; // 子路由配置数组，用于定义嵌套路由
  props?: Recordable; // 路由组件的 props 参数
  fullPath?: string; // 路由的完整路径，通常在路由配置中自动生成
}



export type AppRouteModule = AppRouteRecordRaw;