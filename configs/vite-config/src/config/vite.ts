import { UserConfig, defineConfig, loadEnv, mergeConfig } from "vite"
import { loadPlugins } from "../plugins";
interface DefineOptions {
  ovveride?: UserConfig; // 重写配置
}

export function defineViteConfig(defineOptions: DefineOptions = {}) {
  
  const { ovveride = {} } = defineOptions;
 
  // 绝对路径
  const rootPath = process.cwd();

  return defineConfig( async ({ command, mode }) => {

    // 收到是编译环境
    const isBuild = command === 'build';

    // 加载环境变量
    const env = loadEnv(mode, rootPath);

    // 加载插件
    const plugins = await loadPlugins({
      isBuild,
      rootPath,
    });

    // 配置
    const config: UserConfig = {
      plugins
    }

    return  mergeConfig(config,ovveride);
  });
    

}










