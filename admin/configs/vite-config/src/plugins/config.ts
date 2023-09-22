import { readPackageJSON } from "pkg-types";
import { PluginOption } from "vite";

const PLUGIN_NAME = 'app-config';


export async function defineAppPlugin(root: string, isBuild: boolean): Promise<PluginOption> {

    if (!isBuild) {

        return {
            name: PLUGIN_NAME
        }
    }

    let publicPath: string;
    let source: string;

    const { versoion = '' } = await readPackageJSON(root);
    console.log(versoion)

    return {
        name: PLUGIN_NAME,
        configResolved: async (config) => {
            const title = config?.env?.VITE_APP_TITLE ?? '';
            publicPath = config.base;
            source = await configSourceWith(title);
        },
        transformIndexHtml: async (config) => {


        }

    }
}


async function configSourceWith(title: string) {

    return ""
}