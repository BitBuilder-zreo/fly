// 导入路由相关的类型
import { AppRouteRecordRaw } from "../type";

// 导入枚举值，通常用于路由路径
import { PageEnum } from "/@/enums";
import { t } from "/@/hooks/web/useI18n";

// 定义根路由
export const root: AppRouteRecordRaw = {
  name: "root", // 路由的名称，通常用于路由的命名和跳转
  path: '/', // 路由的路径
  redirect: PageEnum.home, // 重定向到首页
  meta: {
    title: t('router.menu.home') // 路由的元信息，用于存储路由相关的元数据信息
  }
}

// 定义登录页面路由
export const login: AppRouteRecordRaw = {
  name: "login", // 路由的名称
  path: PageEnum.login, // 路由的路径
  component: () => import('/@/views/system/login/index.vue'), // 路由的组件，异步加载组件
  meta: {
    title: t('router.menu.login') // 路由的元信息
  }
}

// 将上面定义的路由添加到基本路由数组中
export const basicRoutes = [
  root, // 根路由
  login // 登录页面路由
];
