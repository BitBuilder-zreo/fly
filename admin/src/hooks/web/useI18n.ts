// 引入 i18n 对象，这个对象通常包含了国际化配置和翻译函数
import { i18n } from "/@/locales";

// 定义一个全局翻译函数类型，用于处理国际化翻译
type I18nGlobalTranslation = {
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};

type I18nTranslationRestParameters = [string, any];

// 辅助函数，用于处理翻译的键值
function getKey(namespace: string | undefined, key: string) {
  if (!namespace) {
    return key;
  }
  if (key.startsWith(namespace)) {
    return key;
  }
  return `${namespace}.${key}`;
}


// 创建一个自定义 Hook，用于在组件中进行国际化翻译
export function useI18n(namespace?: string): {
  t: I18nGlobalTranslation;
} {
  // 如果 i18n 对象不存在，则返回一个简单的翻译函数
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key);
    },
  };

  if (!i18n) {
    return normalFn;
  }

  // 从 i18n 全局对象中提取翻译函数和其他方法
  const { t, ...methods } = i18n.global;

  // 创建一个新的翻译函数，该函数考虑了命名空间
  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return '';
    if (!key.includes('.') && !namespace) return key;

    // @ts-ignore
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters));;
  };

  // 返回一个包含新翻译函数和其他 i18n 方法的对象
  return {
    ...methods,
    t: tFn,
  };
}

// 导出一个简单的 t 函数，用于处理翻译，如果没有可用的 i18n，则直接返回传入的键值
export const t = (key: string) => key;
