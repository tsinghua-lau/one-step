import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import NotFound from '../components/NotFound.vue';
import Doc from '../views/doc/index.vue';
import ButtonDoc from '../views/doc/button/index.vue';
import Cookies from 'js-cookie';

import { RouteLocationNormalized, Router } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录',
            hidden: false,
            toOne: false,
        },
    },
    {
        path: '/index',
        redirect: '/echarts',
        component: () => import('../components/layout/aside.vue'),
        meta: {
            title: 'index',
            hidden: false,
            toOne: false,
        },

        children: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     component: () => import('../views/ts/TypeTest.vue'),

            //     meta: {
            //         title: '首页',
            //         hidden: false,
            //         toOne: true,
            //     },
            // },
            // {
            //     path: '/typescript',
            //     name: 'typescript',
            //     component: () => import('../views/ts/TypeTest.vue'),
            //     meta: {
            //         title: 'ts',
            //         hidden: true,
            //         toOne: false,
            //     },
            // },
            {
                path: '/echarts',
                name: 'echarts',
                component: () => import('../views/echarts/index.vue'),
                meta: {
                    title: 'echarts',
                    hidden: false,
                    toOne: true,
                    icon: 'iconpie-chart_sharp',
                },
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('../views/animateList/index.vue'),
                meta: {
                    title: '列表',
                    hidden: false,
                    toOne: true,
                    icon: 'iconliebiao1',
                },
            },
            {
                path: '/map',
                name: 'map',
                component: () => import('../views/map/index.vue'),
                meta: {
                    title: '地图',
                    hidden: false,
                    toOne: true,
                    icon: 'iconditu',
                },
            },
        ],
    },

    // {
    //     path: '/doc',
    //     component: Doc,
    //     meta: {
    //         title: 'doc',
    //         hidden: true,
    //         toOne: false,
    //     },
    //     children: [{ path: 'button', component: ButtonDoc, meta: { toOne: false, hidden: true } }],
    // },
    // {
    //     path: '/ts',
    //     component: () => import('@/components/TypeTest.vue'),
    //     meta: {
    //         title: 'ts',
    //         hidden: true,
    //         toOne: false,
    //     },
    // },

    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,

        meta: {
            title: '404',
            hidden: true,
            toOne: false,
            icon: 'iconditu',
        },
    },
];

// console.log($route.params.pathMatch,111);

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, netxt) => {
    if (to.path == '/') {
        netxt();
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
