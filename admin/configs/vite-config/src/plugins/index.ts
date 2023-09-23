// 导入Vite插件选项的模块
import { PluginOption } from "vite";
// 导入vite-plugin-vue插件
import vue from '@vitejs/plugin-vue';
// 导入自定义的HTML插件配置函数
import { defineHtmlPlugin } from "./html";
// 导入自定义的应用程序插件配置函数
import { defineAppPlugin } from "./config";
// 导入自定义的压缩插件配置函数
import { defineCompress } from "./compress";
// 导入自定义的模拟数据插件配置函数
import { defineMock } from "./mock";

// 定义一个Options接口，用于配置插件创建选项
interface Options {
    root: string;       // 项目根目录路径
    isBuild: boolean;   // 是否为构建过程
    compress: string;   // 压缩选项，例如："gzip" 或 "brotli"
    enableMock: boolean; // 是否启用模拟数据
}

// 定义一个异步函数'createPlugins'，用于创建Vite插件数组
export async function createPlugins(defineOptions: Options) {
    const { root, isBuild, compress, enableMock } = defineOptions;

    // 创建一个插件选项数组，初始包含vite-plugin-vue插件
    const plugins: (PluginOption | PluginOption[]) = [vue()];

    // 添加自定义的HTML插件配置
    plugins.push(
        defineHtmlPlugin(isBuild)
    );

    // 添加自定义的应用程序插件配置
    plugins.push(
        await defineAppPlugin(root, isBuild)
    );

    // 如果是构建过程，添加自定义的压缩插件配置
    if (isBuild) {
        plugins.push(
            defineCompress({ compress })
        );
    }

    // 如果启用模拟数据，添加自定义的模拟数据插件配置
    if (enableMock) {
        plugins.push(defineMock(isBuild));
    }

    // 返回最终的插件选项数组
    return plugins;
}
