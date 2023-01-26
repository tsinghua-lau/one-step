import { App } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

const Icon = createFromIconfontCN({
    // 如果在iconfont.cn里新增了icon，记得更新下面的链接
    scriptUrl: '//at.alicdn.com/t/c/font_3869461_eccv8q0a2lj.js',
});

export default {
    install: (app: App) => {
        app.component('Icon', Icon);
    },
};
