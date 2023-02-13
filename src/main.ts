import './style.css';
import App from './App.vue';
import { createApp } from 'vue';
import router from './router/router';
import plugins from './plugins';
const app = createApp(App);
app.use(router).use(plugins).mount('#app');
