import { cacheCipher } from '/@/settings/encryptionSetting';
import type { EncryptionParams } from '/@/utils/cipher';
import { AesEncryption } from '/@/utils/cipher';
import { isNullOrUnDef } from '/@/utils/is';

// 创建存储实例所需的参数
export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string; // 存储键的前缀
  storage: Storage; // 存储引擎，例如 sessionStorage 或 localStorage
  hasEncrypt: boolean; // 是否启用数据加密
  timeout?: Nullable<number>; // 缓存超时时间
}

// 创建存储实例的函数
export const createStorage = ({
  prefixKey = '', // 默认前缀为空
  storage = sessionStorage, // 默认存储引擎为 sessionStorage
  key = cacheCipher.key, // 默认密钥
  iv = cacheCipher.iv, // 默认初始化向量
  timeout = null, // 默认超时时间为空
  hasEncrypt = true, // 默认启用数据加密
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    // 如果启用加密且密钥和初始化向量长度不为16，抛出错误
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /**
   * Cache class
   * 可以传递构造参数到 sessionStorage 或 localStorage 的缓存类
   * @class Cache
   * @example
   */
  const WebStorage = class WebStorage {
    private storage: Storage; // 存储引擎
    private prefixKey?: string; // 存储键前缀
    private encryption: AesEncryption; // 加密实例
    private hasEncrypt: boolean; // 是否启用加密
    /**
     *
     * @param {*} storage
     */
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    // 获取存储键
    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * 设置缓存
     * @param {string} key
     * @param {*} value
     * @param {*} expire 过期时间（秒）
     * @memberof Cache
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    /**
     * 读取缓存
     * @param {string} key
     * @param {*} def 默认值
     * @memberof Cache
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /**
     * 根据键删除缓存
     * @param {string} key
     * @memberof Cache
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * 清空此实例的所有缓存
     */
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
