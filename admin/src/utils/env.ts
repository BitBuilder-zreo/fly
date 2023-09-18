// 导入 GlobEnvConfig 类型
import { GlobEnvConfig } from '/#/config';

// 导入 package.json 文件，用于获取应用程序版本号
import pkg from '../../package.json';

// 生成用于全局环境变量的变量名
const getVariableName = (title: string) => {
  // 辅助函数，将字符串转换为十六进制形式
  function strToHex(str: string) {
    const result: string[] = [];
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16);
      result.push(('000' + hex).slice(-4));
    }
    return result.join('').toUpperCase();
  }
  // 生成并返回变量名，将应用程序标题转换为十六进制形式并拼接
  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '');
};

// 获取通用的本地存储前缀
export function getCommonStoragePrefix() {
  // 从应用程序的环境配置中获取应用程序标题
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  // 将应用程序标题转换为大写形式，并替换其中的空格为下划线
  return `${VITE_GLOB_APP_TITLE.replace(/\s/g, '_')}__${getEnv()}`.toUpperCase();
}

// 获取本地存储的短名称
export function getStorageShortName() {
  // 获取通用的本地存储前缀，并添加应用程序版本号
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

// 获取应用程序的环境配置
export function getAppEnvConfig() {
  // 获取用于全局环境变量的变量名
  const ENV_NAME = getVariableName(import.meta.env.VITE_GLOB_APP_TITLE);
  // 根据当前的开发或生产环境获取不同的环境配置
  const ENV = import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : (window[ENV_NAME] as unknown as GlobEnvConfig);
  // 从环境配置中提取应用程序标题、API URL、API URL 前缀和上传 URL 等配置项
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX, VITE_GLOB_UPLOAD_URL } =
    ENV;
  // 返回配置对象
  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}

// 获取当前的应用程序环境（开发或生产）
export function getEnv(): string {
  // 从 import.meta.env 获取应用程序环境模式
  return import.meta.env.MODE;
}

// 检查当前是否处于开发模式
export function isDevMode(): boolean {
  // 检查应用程序是否为开发模式
  return import.meta.env.DEV;
}

// 检查当前是否处于生产模式
export function isProdMode(): boolean {
  // 检查应用程序是否为生产模式
  return import.meta.env.PROD;
}
