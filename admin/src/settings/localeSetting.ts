import type { LocaleSetting, LocaleType } from '/#/config';

// LOCALE对象用于将字符串键映射到应用程序支持的本地化类型
export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN', // 中文简体
  EN_US: 'en', // 英文
};

// localeSetting对象包含与应用程序本地化相关的设置和配置信息
export const localeSetting: LocaleSetting = {
  showPicker: true, // 是否显示本地化选择器
  locale: LOCALE.ZH_CN, // 当前选择的本地化类型，默认为中文简体
  fallback: LOCALE.ZH_CN, // 默认的本地化类型，用于回退
  availableLocales: [
    // 支持的本地化类型列表，初始包括中文简体和英文
    LOCALE.ZH_CN,
    LOCALE.EN_US,
  ],
};
