import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
const pinia = createPinia();
import { MotionPlugin } from '@vueuse/motion';
import 'ant-design-vue/dist/antd.css';
import { bus } from './untils/eventbus';
import svgIcon from '@/assets/svg/index.vue';
// 虚拟模块的引入方式，用于给脚手架插件在打包和开发时做相应的处理，如果没有这行代码，svg图标将无法正常展示
import 'virtual:svg-icons-register';

import { Button, message } from 'ant-design-vue';
const app = createApp(App);
app.component('svg-icon', svgIcon);
app.config.globalProperties.$bus = bus;
app.use(router).use(pinia).use(MotionPlugin).use(Button).mount('#app');
