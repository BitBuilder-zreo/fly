import { RouteMeta, RouteRecordRaw } from 'vue-router';

//@ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {

    meta: RouteMeta;
}