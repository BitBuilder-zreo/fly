import { PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";



export function defineHTMLPlugins(isBuild : Boolean){

     const plugins : PluginOption []  = createHtmlPlugin({
        minify: isBuild,
     });

     return plugins;
}


