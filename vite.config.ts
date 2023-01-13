import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslintPlugin from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

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
            imports: ['vue'],
            dts: 'src/auto-import.d.ts',
        }),
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
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
                    if (id.includes('node_modules')) {
                        return id.split('/node_modules/').pop()?.split('/')[0];
                    }
                },
            },
        },
    },
    server: {
        // 配置代理服务器，解决跨域
        port: 8088,
        proxy: {
            '/api': {
                target: 'http://139.198.176.206:1980',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },

    resolve: {
        alias,
    },
});
