
import { App, Component } from "vue";


type EventShim = {
    new(...args: any[]): {
        $props: {
            onClick?: (...args: any[]) => void;
        };
    };
};

export type WithInstall<T> = T & {
    install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };

/**
 * 主要用于为 Vue.js 组件添加全局安装方法
 * @param component 组件
 * @param alias 别名
 * @returns WithInstall
 */

export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {

    (component as Record<string, unknown>).install = (app: App) => {
        // 获取组件名称
        const compName = component.name || component.displayName;
        // 判断组件名称  如果组件名称不存在直接返回
        if (!compName) return;
        // 挂载组件
        app.component(compName, component);
        // 设置全局设置组件别名
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };

    return component as WithInstall<T>;
};