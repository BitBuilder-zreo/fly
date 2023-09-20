import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    // 作用：配置是否进行构建前的清理操作。
    // 注释：这里设置为true，表示在构建之前执行清理操作。
    clean: true,

    // 作用：指定入口文件的路径。
    // 注释：在此设置中，包含一个入口文件"src/index"。
    entries: ['src/index'],

    // 作用：是否生成声明文件（.d.ts）。
    // 注释：这里设置为true，表示生成声明文件。
    declaration: true,

    // 作用：配置Rollup构建选项。
    // 注释：这里定义了一个名为"emitCJS"的Rollup选项，设置为true，表示生成CommonJS模块。
    rollup: {
        emitCJS: true,
    }
});
