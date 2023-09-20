import { UserConfig, defineConfig } from "vite";


interface DefineOptions {
    overrides?: UserConfig,
    options?: {}
}


export function defineApplication(options: DefineOptions = {}) {

    return defineConfig(async ({ command, mode }) => {
        console.log("1231231231");


        return {};
    });
}