import { App } from 'vue';
import antd from './antd';
import icon from './icon';
import auth from './auth';
import bus from './bus';
import pinia from './pinia';
import svg from './svg';
import motion from './motion';

export default {
    install: (app: App) => {
        app.use(antd);
        app.use(icon);
        app.use(auth);
        app.use(bus);
        app.use(pinia);
        app.use(svg);
        app.use(motion);
    },
};
