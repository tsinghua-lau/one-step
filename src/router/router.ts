import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import 'nprogress/nprogress.css';
import { RouteLocationNormalized } from 'vue-router';
import routes from './routes';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Cookies from 'js-cookie';
import loading from '@/components/Loading/loading';
const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, netxt) => {
    // loading.show('努力搬砖中...😛', '#1890ff');

    NProgress.start();

    if (to?.meta.title) {
        document.title = to.meta.title as string;
    }

    if (to.path == '/') {
        if (Cookies.get('haslogin')) {
            const temp = localStorage.getItem('myuser');
            if (temp) {
                netxt(JSON.parse(temp).activeKey || '/echarts');
            } else netxt('/echarts');
        } else netxt();
        return;
    }

    if (Cookies.get('haslogin')) {
        netxt();
    } else {
        netxt('/');
    }
});

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    NProgress.done();
    // loading.hide();
});

export default router;
