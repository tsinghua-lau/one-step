<template>
    <a-layout :collapsedWidth="20">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsedWidth="50">
            <div class="action">
                <img src="@/assets/svg/icons/case.svg" st alt="" />
                <div class="title" v-if="!collapsed">欢迎开发者</div>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" class="sider-menu" theme="dark" mode="inline" @click="linkTo">
                <template v-for="route in routes.options.routes" :key="route.name">
                    <!-- 一级目录 -->
                    <a-menu-item v-if="!route.children && route.path !== '/' && !route.meta.hidden" :key="route.name">
                        <template #icon>
                            <icon :type="route.meta.icon" class="icon"></icon>
                        </template>
                        <span>{{ route.meta.title }}</span>
                    </a-menu-item>
                    <!-- 将二级目录提升到一级 -->
                    <a-menu-item v-for="item in route.children" :key="item.name">
                        <template v-if="item.meta.toOne">
                            <icon :type="item.meta.icon" class="icon"></icon>
                            <span v-if="item.meta.toOne">{{ item.meta.title }}</span>
                        </template>
                    </a-menu-item>

                    <!-- 二级目录 -->
                    <!-- <a-sub-menu v-if="!route.meta.hidden && route.children" :key="route.name">
                        <template #icon>
                            <icon :type="route.meta.icon" class="icon"></icon>
                        </template>
                        <template #title>
                            <span class="menu-item-title">{{ route.meta.title }}</span>
                        </template>
                        <template v-for="sub in route.children" :key="sub.name">
                            <a-menu-item v-if="!sub.meta.hidden" :key="sub.name">
                                <router-link class="menu-item-link" :to="{ name: sub.name }">
                                <icon :type="sub.meta.icon" class="icon"></icon>
                                <span class="menu-item-title">{{ sub.meta.title }}</span>
                                </router-link>
                            </a-menu-item>
                        </template>
                    </a-sub-menu> -->
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-header">
                <div class="layout-header-left">
                    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                    <span class="headerIntroductionClass">欢迎进入开发者平台</span>
                </div>

                <div class="layout-header-action">
                    <span class="layout-header-action__item"> <Fullscreen class="hidden 2xl:flex mr-3 text-gray-600" /> </span>

                    <span class="header-user-dropdown">
                        <a-popover>
                            <template #content>
                                <a href="javascript:0" @click="goOut">退出登录</a>
                            </template>
                            <span class="header-user-dropdown"
                                ><img src="@/assets/github.png" alt="" />
                                <span class="header-user-dropdown__info">{{ userName }}</span>
                            </span>
                        </a-popover>
                    </span>
                </div>
            </a-layout-header>
            <div class="multiple-tabs"><Tags /></div>
            <a-layout-content :style="{ padding: '24px', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import router from '@/router/router';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import Tags from '../../components/layout/tags.vue';
import Fullscreen from '@/components/FullScreen.vue';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';
import { notification } from 'ant-design-vue';
import { RouteRecordRaw } from 'vue-router';
import routes from '@/router/router';
const { selectedKeys, userName } = storeToRefs(useStore());

const store = useStore();

const collapsed = ref<boolean>(false);

var obj = null;
const linkTo = ({ item, key, keyPath }: any): void => {
    // const path = routes.options.routes.find(p => p.name === key)?.path || null;
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
        console.log(el.name);

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
        color: #fff;
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
    padding: 0 8px;
    border-bottom: 1px solid #eee;
    .layout-header-action {
        display: flex;
        // min-width: 180px;
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
                border-radius: 50%;
            }
            .header-user-dropdown__info {
                color: #000000d9;
                font-size: 14px;
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
    color: #fff !important;
}
</style>
