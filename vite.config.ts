import { defineConfig, CSSModulesOptions } from 'vite';

interface MyCSSModulesOptions extends Partial<CSSModulesOptions> {
    enable: boolean;
}
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslintPlugin from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import vueJsx from '@vitejs/plugin-vue-jsx';

/** 路径查找 */
const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
    '@': pathResolve('src'),
};

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        visualizer({
            emitFile: true, //是否被触摸
            filename: 'test.html', //生成分析网页文件名
            open: true, //在默认用户代理中打开生成的文件
            gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
            brotliSize: true, //从源代码中收集 brotli 大小并将其显示在图表中
        }),

        createSvgIconsPlugin({
            // 指定存放svg的文件夹路径
            iconDirs: [resolve(process.cwd(), 'src/assets/svg/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[name]',
        }),

        AutoImport({
            resolvers: [AntDesignVueResolver()],
            imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
            dts: 'src/auto-import.d.ts',
        }),

        Components({
            // 生产环境按需导入
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resolvers: process.env.NODE_ENV === 'production' ? AntDesignVueResolver() : undefined,
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/],
            dts: 'src/components.d.ts',
        }),

        // 开发环境完整导入ant-design-vue
        {
            name: 'dev-auto-import-ant-design-vue',
            transform(code, id) {
//                 if (process.env.NODE_ENV !== 'production' && /src\/main.ts$/.test(id)) {
                    return {
                        code: `${code};import Antd from 'ant-design-vue';import 'ant-design-vue/dist/antd.css';app.use(Antd);`,
                        map: null,
                    };
//                 }
            },
        },

        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
            cache: false,
        }),
    ],
    build: {
        emptyOutDir: true,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes('ant-design-vue/es')) {
                        return 'ant-design-vue';
                    }
                    if (id.includes('node_modules')) {
                        return id.split('/node_modules/').pop()?.split('/')[0];
                    }
                },
            },
        },
    },
    server: {
        // 配置代理服务器，解决跨域
        // port: 8088,
        proxy: {
            '/api': {
                target: 'http://139.198.176.206:1980',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
            '/zh': {
                target: 'https://tenapi.cn',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/zh/, ''),
            },
        },
    },
    css: {
        modules: {
            // 启用 CSS 模块化 tsx文件中的样式开启scoped
            enable: true,

            // 配置 CSS 模块化命名规则
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        } as MyCSSModulesOptions, // 明确指定类型为 MyCSSModulesOptions
    },
    resolve: {
        alias,
    },
});
