import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, useRouter } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Doc from '../views/doc/index.vue';
import ButtonDoc from '../views/doc/button/index.vue';
import { RouteLocationNormalized, Router } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/echarts',
        meta: {
            title: '首页',
        },

        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/ts/TypeTest.vue'),

                meta: {
                    title: '首页',
                },
            },
            {
                path: '/typescript',
                name: 'typescript',
                component: () => import('../views/ts/TypeTest.vue'),
                meta: {
                    title: 'ts',
                },
            },
            {
                path: '/echarts',
                name: 'echarts',
                component: () => import('../views/echarts/index.vue'),
                meta: {
                    title: 'echarts',
                },
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('../views/animateList/index.vue'),
                meta: {
                    title: '列表',
                },
            },
            {
                path: '/map',
                name: 'map',
                component: () => import('../views/map/index.vue'),
                meta: {
                    title: '地图',
                },
            },
        ],
    },
    {
        path: '/doc',
        component: Doc,
        meta: {
            title: 'doc',
        },
        children: [{ path: 'button', component: ButtonDoc }],
    },

    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,

        meta: {
            title: '404',
        },
    },
];

// console.log($route.params.pathMatch,111);

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to?.meta.title) {
        document.title = to.meta.title as string;
    }
});

export default router;
