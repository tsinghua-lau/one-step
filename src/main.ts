// import { createApp } from 'vue';
// import './style.css';
// import App from './App.vue';

// createApp(App).mount('#app');
import './style.css';
import App from './App.vue';
import { createApp } from 'vue';
import router from './router/router';
import plugins from './plugins';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

app.use(router).use(plugins).mount('#app');
