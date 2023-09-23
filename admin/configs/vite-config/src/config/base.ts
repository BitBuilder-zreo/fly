// 从外部包中导入必要的模块
import { type UserConfig, loadEnv } from "vite";
import { defineInfo } from "./info";
import { createPlugins } from "../plugins";
import { resolve } from 'node:path'

// 定义一个异步函数'defineBase'，它接受三个参数：
// - mode: 表示环境模式的字符串
// - envDir: 表示环境配置目录的字符串
// - isBuild: 表示是否为构建过程的布尔值
export async function defineBase(mode: string, envDir: string, isBuild: boolean): Promise<UserConfig> {
    // 加载指定模式和envDir的环境变量
    const { VITE_PUBLIC_PATH, VITE_USE_MOCK, VITE_BUILD_COMPRESS } = loadEnv(mode, envDir);

    // 将'info'定义为包含异步获取的程序信息的对象
    const info = await defineInfo(envDir);

    // 根据提供的配置创建插件
    const plugins = await createPlugins({
        root: envDir, // 项目根目录路径
        isBuild: isBuild, // 表示是否为构建过程
        compress: VITE_BUILD_COMPRESS, // 如果'VITE_BUILD_COMPRESS'为'none'，则启用构建压缩
        enableMock: VITE_USE_MOCK === 'true' // 如果'VITE_USE_MOCK'为'true'，则启用内置服务器模拟
    });

    // 定义一个'pathResolve'函数，用于相对于'envDir'解析文件路径
    const pathResolve = (pathname: string) => resolve(envDir, '.', pathname);

    // 返回包含各种设置的配置对象
    return {
        base: VITE_PUBLIC_PATH, // 设置应用程序的公共路径
        resolve: {
            alias: [
                // 在导入语句中将'/@/xxxx'映射到'src/xxxx'
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },

                // 在导入语句中将'@/xxxx'映射到'src/xxxx'
                {
                    find: /@\//,
                    replacement: pathResolve('src') + '/',
                }
            ]
        },
        plugins: plugins, // 配置Vite的插件
        define: info, // 使用'info'对象定义全局常量
        build: {
            target: "es2015", // 设置构建的目标ES版本
            cssTarget: 'chrome80', // 设置CSS目标版本
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ['vue', 'pinia', 'vue-router'] // 配置特定依赖项的手动拆分
                    }
                }
            }
        }
    }
}
