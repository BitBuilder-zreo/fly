// 导入必要的加密库和模块
import { encrypt, decrypt } from 'crypto-js/aes';
import UTF8, { parse } from 'crypto-js/enc-utf8';
import pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import md5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';

// 定义加密参数的接口
export interface EncryptionParams {
  key: string;
  iv: string;
}

// AesEncryption 类用于进行AES加密和解密
export class AesEncryption {
  private key;
  private iv;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key, iv } = opt;
    if (key) {
      this.key = parse(key);
    }
    if (iv) {
      this.iv = parse(iv);
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  // 使用AES加密文本
  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }

  // 使用AES解密文本
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}

// 使用Base64编码文本
export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

// 使用Base64解码文本
export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

// 使用MD5加密密码
export function encryptByMd5(password: string) {
  return md5(password).toString();
}
