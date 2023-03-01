import { App } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

const Icon = createFromIconfontCN({
    // 阿里图标库
    scriptUrl: '//at.alicdn.com/t/c/font_3869461_5kfbl7d2cvs.js',
});

export default {
    install: (app: App) => {
        app.component('Icon', Icon);
    },
};
