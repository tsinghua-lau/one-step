import { App } from 'vue';
import icon from './icon';
import bus from './bus';
import pinia from './pinia';
import motion from './motion';
import svg from './svg';

export default {
    install: (app: App) => {
        app.use(icon);
        app.use(bus);
        app.use(svg);
        app.use(pinia);
        app.use(motion);
    },
};
