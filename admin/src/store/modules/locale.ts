import { defineStore } from 'pinia';
import { LocaleSetting, LocaleType } from '/#/config';
import { createLocalStorage } from '/@/utils/cache';
import { LOCALE_KEY } from '/@/enums';
import { localeSetting } from '/@/settings/localeSetting';
import { store } from '..'; // 引入全局 store

// State 接口定义了 store 的状态结构
interface State {
  settings: LocaleSetting; // 包含本地化设置的对象
}

// 使用 defineStore 创建一个名为 useLocaleStore 的 store
export const useLocaleStore = defineStore({
  id: 'fly-locale', // store 的唯一标识符
  state: (): State => ({
    settings: (createLocalStorage().get(LOCALE_KEY) || localeSetting) as LocaleSetting,
    // 初始化状态，从本地存储获取本地化设置，如果没有则使用默认设置
  }),
  getters: {
    locale(state): LocaleType {
      return state.settings?.locale ?? 'zh_CN'; // 获取当前本地化设置，如果不存在则默认为中文简体
    },
  },
  actions: {},
});

// 创建一个用于获取 useLocaleStore 的钩子函数
export function useLocaleStoreHooks() {
  return useLocaleStore(store); // 返回已创建的 useLocaleStore 实例
}
