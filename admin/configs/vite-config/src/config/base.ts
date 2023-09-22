import { type UserConfig, loadEnv } from "vite";
import { defineInfo } from "./info";
import { createPlugins } from "../plugins";
import { resolve } from 'node:path'





export async function defineBase(mode: string, envDir: string, isBuild: boolean): Promise<UserConfig> {

    // 获取环境变量
    // VITE_PUBLIC_PATH 公开路径
    // VITE_USE_MOCK 自带服务器
    // VITE_BUILD_COMPRESS 构建压缩
    const { VITE_PUBLIC_PATH, VITE_USE_MOCK, VITE_BUILD_COMPRESS } = loadEnv(mode, envDir);

    // 程序基本信息
    const info = await defineInfo(envDir);

    // 创建插件
    const plugins = await createPlugins({
        root: envDir, // 路径
        isBuild: isBuild, // 是否构建
        compress: VITE_BUILD_COMPRESS === 'ture', // 是否构建压缩
        endaleMock: VITE_USE_MOCK === 'ture' // 是否启用服务器
    });
    const pathResolve = (pathname: string) => resolve(envDir, '.', pathname);

    return {
        base: VITE_PUBLIC_PATH,
        resolve: {
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },

                // @/xxxx => src/xxxx
                {
                    find: /@\//,
                    replacement: pathResolve('src') + '/',
                }
            ]
        },
        plugins: plugins,
        define: info,
        build: {

        }
    }
}