import { AES, enc } from 'crypto-ts'

const KEY = 'FLY';

// 加密函数
function encrypt(data: string): string {

    return AES.encrypt(data, KEY).toString();
}

// 解密函数
function decrypt(data: string): string | null {
    try {
        const decryptedData = AES.decrypt(data, KEY).toString(enc.Utf8);
        return decryptedData;
    } catch (error) {
        console.error('解密失败', error);
        return null;
    }
}

class WebStore {

    /**
     * 获取加密数据
     * @param key 
     * @returns 数据
     */
    data<T>(key: string): T | null {

        try {
            const encryptData = localStorage.getItem(key);

            if (encryptData === null) {
                return null;
            }

            const data = decrypt(encryptData);

            if (data === null) {
                return null;
            }
            return JSON.parse(data);
        } catch (error) {

            return null;
        }

    }

    /**
     * 设置存储
     * @param data 存储的数据
     * @param key 数据key
     */
    setData<T>(data: T, key: string) {

        const str = JSON.stringify(data);

        const encryptData = encrypt(str);

        localStorage.setItem(encryptData, key);
    }

}


export const webStore = new WebStore();