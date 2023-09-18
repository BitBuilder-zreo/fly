import { getStorageShortName } from '/@/utils/env';
import { createStorage as create, CreateStorageParams } from './storageCache';
import { enableStorageEncryption, DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';

// 定义选项的类型，用于配置存储实例
export type Options = Partial<CreateStorageParams>;

// 创建选项的函数，将默认的存储引擎、加密配置、前缀键等与传入的选项合并
const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption, // 是否启用数据加密
    storage, // 存储引擎，例如 sessionStorage 或 localStorage
    prefixKey: getStorageShortName(), // 存储键的前缀
    ...options, // 其他传入的选项
  };
};

// 创建默认的 WebStorage 实例，使用 sessionStorage 作为存储引擎
export const WebStorage = create(createOptions(sessionStorage));

// 创建存储实例的函数，可以传入自定义的存储引擎和选项
export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

// 创建 session 存储实例的函数，使用 sessionStorage 作为存储引擎，并设置默认的缓存超时时间
export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

// 创建 local 存储实例的函数，使用 localStorage 作为存储引擎，并设置默认的缓存超时时间
export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

// 导出 WebStorage 实例作为默认导出
export default WebStorage;
