import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Cookies from 'js-cookie';
import { RouteLocationNormalized, Router } from 'vue-router';
import routes from './routes';

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, netxt) => {
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
});

export default router;
