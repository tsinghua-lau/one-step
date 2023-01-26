import './style.css';
import App from './App.vue';
import router from './router/router';
import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
import plugins from './plugins';
app.use(router).use(plugins).mount('#app');
