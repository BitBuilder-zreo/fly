import { PluginOption } from "vite";
import vue from '@vitejs/plugin-vue';

interface Options{
    root:string;
    isBuild:boolean;
    compress:boolean;
    endaleMock:boolean;
}


export async function createPlugins(defineOptions:Options){

    const { root ,isBuild,compress,endaleMock} = defineOptions;

    const plugins:(PluginOption | PluginOption[]) = [vue()];

    return plugins;
}