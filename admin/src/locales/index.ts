import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { useLocaleStoreHooks } from '../store/modules/locale';
import { localeSetting } from '/@/settings/localeSetting';

export let i18n: ReturnType<typeof createI18n>;

const { fallback, availableLocales } = localeSetting;

// 异步函数，用于创建 i18n 的选项对象
async function createI18nOptions(): Promise<I18nOptions> {
  // 获取本地化设置 store 的钩子函数
  const hooks = useLocaleStoreHooks();
  const locale = hooks.locale; // 获取当前应用程序的本地化设置
  const defaultLocal = await import(`./lang/${locale}.ts`); // 动态导入与当前本地化匹配的语言包
  const message = defaultLocal.default?.message ?? {}; // 获取语言包中的消息对象

  // 返回 i18n 的选项对象
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message, // 将当前语言的消息对象添加到 messages 中
    },
    availableLocales: availableLocales,
    sync: true, // 如果不想从全局范围继承语言设置，可以将 sync 设置为 false
    silentTranslationWarn: true, // 设置为 true 时，禁用翻译警告
    missingWarn: false, // 禁用缺失警告
    silentFallbackWarn: true, // 禁用回退警告
  };
}

// 设置 i18n 实例并在应用程序上注册
export async function setupI18n(app: App) {
  const options = await createI18nOptions(); // 获取 i18n 的选项对象

  i18n = createI18n(options); // 使用选项对象创建 i18n 实例

  app.use(i18n); // 在应用程序上注册 i18n 实例，以便在应用程序中使用国际化功能
}
