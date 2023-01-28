import { RouteRecordRaw } from 'vue-router';
import NotFound from '../components/NotFound.vue';
import Doc from '../views/doc/index.vue';
import ButtonDoc from '../views/doc/button/index.vue';

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
        name: 'index',
        redirect: '/echarts',
        component: () => import('../components/layout/aside.vue'),
        meta: {
            title: '工作台',
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
            {
                path: '/table',
                name: 'table',
                component: () => import('../views/table/index.vue'),
                meta: {
                    title: '表格',
                    hidden: false,
                    toOne: true,
                    icon: 'icontable',
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
    //         hidden: false,
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

export default routes;
