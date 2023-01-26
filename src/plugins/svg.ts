import { App } from 'vue';
import svgIcon from '@/assets/svg/index.vue';
// 虚拟模块的引入方式，用于给脚手架插件在打包和开发时做相应的处理，如果没有这行代码，svg图标将无法正常展示
import 'virtual:svg-icons-register';

export default {
    install: (app: App) => {
        app.component('svg-icon', svgIcon);
    },
};
