import { App } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const pinia = createPinia();
export default {
    install: (app: App) => {
        app.use(pinia);
        pinia.use(piniaPersist);
    },
};
