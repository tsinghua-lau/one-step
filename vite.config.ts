import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslintPlugin from 'vite-plugin-eslint'; //导入包

import { fileURLToPath, URL } from 'url';

/** 路径查找 */
const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
    '@': pathResolve('src'),
    // '@build': pathResolve('build'),
};

export default defineConfig({
    plugins: [
        vue(),
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
        port: 5699,
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
