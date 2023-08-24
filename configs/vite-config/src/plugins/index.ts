import vue from '@vitejs/plugin-vue'
import { PluginOption } from 'vite';
import { defineHTMLPlugins } from './html';

interface Options{
    isBuild: boolean;
    rootPath: string;

}

// 加载插件
export async function loadPlugins({isBuild,rootPath}: Options) {

    const vitePlugins: PluginOption | PluginOption[] = [vue()];

    
    // 加载html插件
    vitePlugins.push(defineHTMLPlugins(isBuild))


    return vitePlugins;
}