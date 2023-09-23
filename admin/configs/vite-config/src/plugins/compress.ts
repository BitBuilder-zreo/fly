// 导入Vite插件选项的模块
import { PluginOption } from "vite";
// 导入vite-plugin-compression插件
import compressPlugin from 'vite-plugin-compression';

// 定义一个Options接口，用于配置压缩选项
interface Options {
    compress: string; // 压缩选项，例如："gzip" 或 "brotli"
    deleteOriginFile?: boolean; // 是否删除原始文件的标志，可选，默认为false
}

// 定义一个名为'defineCompress'的函数，用于生成Vite的压缩插件选项
export function defineCompress(defineOptions: Options): PluginOption[] {
    // 从传入的配置中解构出'compress'和'deleteOriginFile'选项
    const { compress, deleteOriginFile = false } = defineOptions;

    // 创建一个空数组以存储插件选项
    const plugins: PluginOption[] = [];

    // 如果配置中包含'gzip'选项，添加相应的gzip压缩插件选项
    if (compress.includes('gzip')) {
        plugins.push(
            compressPlugin({
                ext: "gz",
                deleteOriginFile
            })
        );
    }

    // 如果配置中包含'brotli'选项，添加相应的brotli压缩插件选项
    if (compress.includes('brotli')) {
        plugins.push(
            compressPlugin({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile
            })
        );
    }

    // 返回配置的插件选项数组
    return plugins;
}
