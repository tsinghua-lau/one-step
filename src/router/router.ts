import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory, useRouter } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Doc from '../views/doc/index.vue';
import ButtonDoc from '../views/doc/button/index.vue';
const $route = useRouter();
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
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
        ],
    },
    {
        path: '/doc',
        component: Doc,
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

router.beforeEach((to, form, next) => {
    if (to.meta?.title) {
        document.title = '123';
    }
    next();
});

export default router;
