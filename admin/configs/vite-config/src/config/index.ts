// 从 'vite' 中导入必要的模块和函数。
import { UserConfig, defineConfig, mergeConfig } from 'vite';

// 从本地模块导入自定义配置函数。
import { defineCommon } from './common';
import { defineBase } from './base';

// 定义一个配置选项的接口。
interface Options {
    // 用户配置的覆盖项。
    overrides?: UserConfig,
    // 额外选项（目前未使用）。
    options?: {
        // 在这里可以添加配置选项。
    },
}

/** 
 * Vite 配置函数
 * 
 * @param defineOptions 配置选项
 * 
 * @returns Vite 配置对象
 */
export function defineApplication(defineOptions: Options) {
    // 从 'defineOptions' 中提取 'overrides' 属性，如果未提供则默认为空对象。
    const { overrides = {} } = defineOptions;

    return defineConfig(async ({ command, mode }) => {
        // 获取项目的根目录路径。
        const root = process.cwd();

        // 检查当前命令是否为构建命令。
        const isBuild = command === 'build';

        // 通过调用自定义函数生成通用配置。
        const common = defineCommon(mode);

        // 通过调用自定义函数生成基础配置。
        const base = await defineBase(mode, root, isBuild);

        // 合并通用配置和基础配置。
        const merge = mergeConfig(common, base);

        // 将生成的配置与提供的 'overrides' 进行合并。
        return mergeConfig(merge, overrides);
    });
}
