// 导入Vite的UserConfig类型，用于配置Vite项目
import { UserConfig } from "vite";

// 定义一个名为defineCommon的函数，它接受一个字符串类型的参数mode
export function defineCommon(mode: string): UserConfig {

    // 返回一个配置对象，用于配置Vite项目
    return {
        // 配置服务器选项
        server: {
            // 将服务器绑定到本地主机
            host: true
        },
        // 配置esbuild选项，用于构建JavaScript
        esbuild: {
            // 如果mode是'production'，则移除掉代码中的console和debugger语句
            drop: mode === 'production' ? ['console', 'debugger'] : []
        },
        // 配置构建选项
        build: {
            // 禁用压缩后的文件大小报告
            reportCompressedSize: false,
            // 设置块大小警告的限制
            chunkSizeWarningLimit: 1500,
            // 配置Rollup选项
            rollupOptions: {
                // 设置最大并行文件操作数
                maxParallelFileOps: 3
            }
        }
    };
}
