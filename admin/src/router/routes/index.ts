import type { AppRouteRecordRaw } from "../types"
import { PageEnum } from "/@/enums/pageEnum"

const rootRoute: AppRouteRecordRaw = {
    name: 'root',
    path: '/',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'root'
    }
}

const loginRoute: AppRouteRecordRaw = {
    name: 'login',
    path: PageEnum.BASE_LOGIN,
    component: () => import('/@/views/system/login/index.vue'),
    meta: {
        title: '登录'
    }
}

export const basicRoutes = [
    rootRoute,
    loginRoute
]



