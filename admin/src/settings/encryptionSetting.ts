// 导入 isDevMode 函数，用于检查当前是否处于开发模式
import { isDevMode } from '/@/utils/env';

// 默认缓存时间为一周的秒数
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// 缓存加密的密钥和初始向量（IV）
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// 根据是否处于开发模式来确定是否启用存储加密
export const enableStorageEncryption = !isDevMode();
