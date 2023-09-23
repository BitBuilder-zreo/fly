// 导入vite-plugin-mock中的viteMockServe函数
import { viteMockServe } from 'vite-plugin-mock';

// 定义一个函数 defineMock，用于配置和启用模拟数据服务
export function defineMock(isBuild: boolean) {
    // 返回 viteMockServe 函数的调用结果，配置模拟数据服务
    return viteMockServe({
        ignore: /^_/,         // 忽略文件名以 "_" 开头的模拟数据文件
        mockPath: 'mock',    // 模拟数据文件所在的路径，默认为 "mock" 文件夹
        enable: !isBuild      // 如果 isBuild 为 false，则启用模拟数据服务；如果为 true，则禁用
    });
}
