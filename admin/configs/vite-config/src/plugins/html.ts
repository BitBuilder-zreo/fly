// 从 'vite-plugin-html' 中导入 createHtmlPlugin 函数。
import { createHtmlPlugin } from 'vite-plugin-html';

/**
 * 定义 HTML 插件函数
 * 
 * @param isBuild 是否为构建环境
 * @returns Vite HTML 插件配置
 */
export function defineHtmlPlugin(isBuild: boolean) {
    // 使用 createHtmlPlugin 函数创建一个 HTML 插件配置对象，并根据 isBuild 参数启用或禁用压缩。
    return createHtmlPlugin({ minify: isBuild });
}
