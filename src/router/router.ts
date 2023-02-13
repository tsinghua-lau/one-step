import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import 'nprogress/nprogress.css';
import { RouteLocationNormalized, Router } from 'vue-router';
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
    loading.show('努力搬砖中...😛', '#1890ff');
    if (to.path == '/') {
        if (Cookies.get('haslogin')) netxt('/echarts');
        else netxt();
        return;
    }
    NProgress.start();
    if (to.path !== '/login') {
        if (Cookies.get('haslogin')) {
            if (to?.meta.title) {
                document.title = to.meta.title as string;
            }
            netxt();
        } else {
            netxt('/');
        }
    } else {
        netxt('/echarts');
    }
});

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    NProgress.done();
    loading.hide();
});

export default router;
