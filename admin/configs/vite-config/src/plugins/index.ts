import { PluginOption } from "vite";
import vue from '@vitejs/plugin-vue';
import { defineHtmlPlugin } from "./html";
import { defineAppPlugin } from "./config";

interface Options {
    root: string;
    isBuild: boolean;
    compress: boolean;
    endaleMock: boolean;
}


export async function createPlugins(defineOptions: Options) {

    const { root, isBuild, compress, endaleMock } = defineOptions;

    const plugins: (PluginOption | PluginOption[]) = [vue()];


    plugins.push(
        defineHtmlPlugin(isBuild)
    )

    plugins.push(
        await defineAppPlugin(root, isBuild)
    )

    return plugins;
}