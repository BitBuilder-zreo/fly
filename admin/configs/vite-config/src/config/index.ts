
import {UserConfig, defineConfig, loadEnv} from 'vite';
import { defineInfo } from './info';
import { createPlugins } from '../plugins';
import { defineCommon } from './common';

interface Options{
    // 重写配置 UserConfig 
    overrides?:UserConfig,
    // 配置项
    options?:{
    // 配置项
    },
}
/** 
 * Vite 配置
 * 
 * @defineOptions 配置
 * 
 * @retures vite配置
*/
export function defineApplication(defineOptions:Options){

    // 获取重写项
    const { overrides = { } } = defineOptions;

    return defineConfig(async ({command,mode}) => {
         // 获取根路径
         const root =  process.cwd();

         // 是否是构建环境
         const isBuild = command === 'build';


         // 获取环境变量
         // VITE_PUBLIC_PATH 公开路径
         // VITE_USE_MOCK 自带服务器
         // VITE_BUILD_COMPRESS 构建压缩
         const { VITE_PUBLIC_PATH,VITE_USE_MOCK,VITE_BUILD_COMPRESS } = loadEnv(mode, root);

         // 程序基本信息
         const info = await defineInfo(root);

         // 创建插件
         const plugins = createPlugins({
            root, // 路径
            isBuild, // 是否构建
            compress:VITE_BUILD_COMPRESS === 'ture', // 是否构建压缩
            endaleMock:VITE_USE_MOCK === 'ture' // 是否启用服务器
        });
        // 基本通用配置
        const common = defineCommon(mode);

        return {}
    });
}