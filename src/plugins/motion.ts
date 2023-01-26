import { MotionPlugin } from '@vueuse/motion';
import { App } from 'vue';

export default {
    install: (app: App) => {
        app.use(MotionPlugin);
    },
};
