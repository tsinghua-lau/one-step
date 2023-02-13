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
        component: () => import('../components/layout/index.vue'),
        meta: {
            title: '工作台',
            hidden: false,
            toOne: false,
            icon: 'icontable',
        },

        children: [
            {
                path: '/echarts',
                name: 'echarts',
                component: () => import('../views/echarts/index.vue'),
                meta: {
                    title: 'echarts',
                    hidden: false,
                    toOne: false,
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
                    toOne: false,
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
                    toOne: false,
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
                    toOne: false,
                    icon: 'icontable',
                },
            },
        ],
    },
    {
        path: '/doc',
        name: 'doc',
        component: () => import('../components/layout/index.vue'),
        redirect: '/button',
        meta: {
            title: 'doc',
            hidden: false,
            toOne: false,
            icon: 'icondocument',
        },
        children: [
            { path: '/button', name: 'button', component: ButtonDoc, meta: { title: 'button', toOne: false, hidden: false, icon: 'iconanniu' } },
            {
                path: '/typescript',
                name: 'typescript',
                component: () => import('@/views/ts/TypeTest.vue'),
                meta: {
                    title: 'ts in vue',
                    hidden: false,
                    toOne: false,
                    icon: 'icontypescript-def',
                },
            },
            {
                path: '/edit',
                name: 'edit',
                component: () => import('../views/edit/index.vue'),
                meta: {
                    title: '富文本编辑器',
                    hidden: false,
                    toOne: true,
                    icon: 'iconfuwenbenkuang',
                },
            },
            {
                path: '/animation',
                name: 'animation',
                component: () => import('../views/animation/index.vue'),
                meta: {
                    title: 'animation',
                    hidden: false,
                    toOne: true,
                    icon: 'icondonghua',
                },
            },
            {
                path: '/404',
                name: '404',
                component: () => import('../components/404.vue'),
                meta: {
                    title: '404',
                    hidden: false,
                    toOne: true,
                    icon: 'icon40401',
                },
            },
        ],
    },
];

export default routes;
