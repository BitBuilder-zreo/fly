// 导入readPackageJSON函数，该函数用于读取指定目录下的package.json文件
import { readPackageJSON } from 'pkg-types';

// 导入dayjs库，用于处理日期和时间
import dayjs from 'dayjs';

// 定义一个名为defineInfo的异步函数，接受一个字符串类型的参数root
export async function defineInfo(root: string) {
    
    try {
        // 尝试读取指定目录下的package.json文件并将其内容存储在pkg变量中
        const pkg = await readPackageJSON(root);
        
        // 从package.json中提取一些信息，包括dependencies（依赖项）、devDependencies（开发依赖项）、name（项目名称）和version（项目版本）
        const { dependencies, devDependencies, name, version } = pkg;
        
        // 创建一个名为__APP_INFO__的对象，包含上述提取的信息以及当前时间的格式化字符串
        const __APP_INFO__ = {
            pkg: { dependencies, devDependencies, name, version },
            lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss") // 格式化当前时间
        }

        // 返回一个包含__APP_INFO__对象的对象，将其转换为JSON字符串
        return {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        };
        
    } catch (e) {
        // 如果发生错误，返回一个空对象
        return {};
    }
}
