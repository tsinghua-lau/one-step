<template>
    <a-layout :collapsedWidth="20">
        <a-layout-sider v-model:collapsed="collapsed" :theme="theme" :trigger="null" collapsedWidth="50">
            <div class="action" v-if="showSubMenuName">
                <img src="@/assets/svg/icons/case.svg" st alt="" />
                <div class="title" v-if="!collapsed">欢迎开发者</div>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" class="sider-menu" v-model:openKeys="openKeys" :theme="theme" mode="inline" @click="linkTo">
                <template v-for="route in routes.options.routes" :key="route.name">
                    <!-- 一级目录 -->
                    <a-menu-item v-if="!route.children && route.path !== '/' && !route.meta.hidden" :key="route.name">
                        <template #icon>
                            <icon :type="route.meta.icon" class="icon"></icon>
                        </template>
                        <span>{{ route.meta.title }}</span>
                    </a-menu-item>
                    <!-- 将二级目录提升到一级 -->
                    <template v-for="item in route.children" :key="item.name">
                        <a-menu-item v-if="item.meta.toOne" :key="item.name">
                            <template v-if="item.meta.toOne">
                                <icon :type="item.meta.icon" class="icon"></icon>
                                <span v-if="item.meta.toOne">{{ item.meta.title }}</span>
                            </template>
                        </a-menu-item>
                    </template>
                    <!-- 二级目录 -->
                    <a-sub-menu v-if="!route.meta.hidden && route.children" :key="route.name">
                        <template #icon>
                            <icon :type="route.meta.icon" class="icon"></icon>
                        </template>
                        <template #title>
                            <span class="menu-item-title">{{ route.meta.title }}</span>
                        </template>
                        <template v-for="sub in route.children" :key="sub.name">
                            <a-menu-item v-if="!sub.meta.hidden && !sub.meta.toOne" :key="sub.name">
                                <router-link class="menu-item-link" :to="{ name: sub.name }">
                                    <icon :type="sub.meta.icon" class="icon"></icon>
                                    <span class="menu-item-title">{{ sub.meta.title }}</span>
                                </router-link>
                            </a-menu-item>
                        </template>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-header" v-if="showHeader">
                <div class="layout-header-left">
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    <span class="headerIntroductionClass">欢迎进入开发者平台</span>
                </div>

                <div class="layout-header-action">
                    <span class="layout-header-action__item"> <Fullscreen class="hidden 2xl:flex mr-3 text-gray-600" /> </span>
                    <span class="header-user-dropdown">
                        <a-dropdown>
                            <span class="dropdown-link" @click.prevent>
                                <span class="header-user-dropdown"
                                    ><img src="@/assets/github.png" alt="" />
                                    <span class="header-user-dropdown__info">{{ userName }}</span>
                                </span>
                            </span>
                            <template #overlay>
                                <a-menu style="top: 15px">
                                    <a-menu-item>
                                        <a href="javascript:void(0);">
                                            <UserOutlined class="menu-item-icon" />
                                            个人中心
                                        </a>
                                    </a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item>
                                        <a href="#" @click="goOut">
                                            <LoginOutlined class="menu-item-icon" />
                                            退出登录
                                        </a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </span>
                    <span class="header-user-dropdown">
                        <Setting />
                    </span>
                </div>
            </a-layout-header>
            <div class="multiple-tabs" v-if="showTags"><Tags /></div>
            <a-layout-content :style="{ padding: '24px', minHeight: '280px' }">
                <router-view v-if="isRouteActive"></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import router from '../../router/router';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons-vue';
import { useStore } from '../../store/index';
import { storeToRefs } from 'pinia';
import { notification } from 'ant-design-vue';
import routes from '@/router/router';
import Setting from './settings.vue';
import Tags from '../../components/layout/tags.vue';
import Fullscreen from '../../components/FullScreen.vue';
import Cookies from 'js-cookie';
import { useTheme } from '../../hooks/theme';
import loading from '../../components/Loading/loading';

const { selectedKeys, userName } = storeToRefs(useStore());
const { showTags, theme, showSubMenuName, showHeader } = toRefs(useTheme());

const isRouteActive = ref(true);
provide('reload', () => {
    isRouteActive.value = false;
    loading.show('重新加载中...⚡');
    nextTick(() => {
        isRouteActive.value = true;
        loading.hide();
    });
});

const store = useStore();
const collapsed = ref<boolean>(false);
const openKeys = ref<Array<string>>(['index']);
const titleColor = computed(() => {
    return theme.value == 'dark' ? 'white' : '#5e95da';
});

var obj: any = null;
const linkTo = ({ item, key, keyPath }: any): void => {
    findObj(routes.options.routes, key);
    if (obj) {
        store.changeSelectedKeys(keyPath);
        router.push({ path: obj.path });
        store.changeActiveKey(key);

        if (!store.ROUTE_INFO.find(p => p.name === obj.name)) {
            store.ADD_ROUTE_INFO({
                name: obj.name,
                path: obj.name,
                title: obj.meta.title,
            });
        }
        obj = null;
    } else {
        const obj = store.ROUTE_INFO.find(p => p.name === key);
        if (obj) store.ADD_ROUTE_INFO(obj);
        else
            notification.open({
                message: '',
                description: '暂未配置',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
    }
};

const findObj = (arr: any, key: string): void => {
    for (let k = 0; k < arr.length; k++) {
        const el = arr[k];

        if (el.name === key) {
            obj = el;
            break;
        }
        if (el.children && !obj) {
            findObj(el.children, key);
        }
    }
    return;
};
const goOut = (): void => {
    Cookies.remove('haslogin');
    store.ROUTE_INFO = [
        {
            name: 'echarts',
            path: '/echarts',
            title: 'echarts',
        },
    ];
    router.push({ path: '/' });
};
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.site-layout .site-layout-background {
    background: #fff;
}
section.ant-layout.ant-layout-has-sider {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.action {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 48px;
    padding: 10px 4px 10px 12px;
    img {
        width: 23px;
        height: 23px;
    }
    .title {
        color: v-bind(titleColor);
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        margin-left: 10px;
    }
}
.layout-header {
    display: flex;
    height: 48px;
    margin-left: -1px;
    line-height: 48px;
    color: #fff;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    border-bottom: 1px solid #eee;
    .layout-header-action {
        display: flex;
        align-items: center;
        .header-user-dropdown {
            height: 48px;
            padding: 0 10px;
            overflow: hidden;
            font-size: 12px;
            cursor: pointer;
            align-items: center;
            img {
                width: 24px;
                height: 24px;
                margin-right: 12px;
                margin-top: -4px;
                border-radius: 50%;
            }
            .header-user-dropdown__info {
                color: #000000d9;
                font-size: 14px;
                font-weight: 600;
            }
        }
        .layout-header-action__item {
            display: flex !important;
            height: 48px;
            padding: 0 2px;
            font-size: 1.2em;
            cursor: pointer;
            margin-top: 3px;
            align-items: center;
        }
    }
}
:deep(.ant-layout-content) {
    text-align: center;
}
.trigger {
    display: inline-block;
    color: #000;
    padding: 0 10px;
}
.headerIntroductionClass {
    margin-right: 4px;
    margin-bottom: 2px;
    border-bottom: 0px;
    border-left: 0px;
    color: #999;
}
.multiple-tabs {
    z-index: 10;
    background-color: #fff;
    box-shadow: 0 1px 4px #00152914;
}
.icon {
    font-size: 16px;
    color: #f55a00;
}
</style>
