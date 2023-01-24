<template>
    <a-layout :collapsedWidth="20">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsedWidth="50">
            <div class="action">
                <img src="@/assets/svg/icons/case.svg" st alt="" />
                <div class="title" v-if="!collapsed">欢迎开发者</div>
            </div>

            <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" @click="linkTo">
                <a-menu-item key="1">
                    <PieChartOutlined />
                    <span>echarts</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <CompassOutlined />
                    <span>高德地图</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <BarsOutlined />
                    <span>列表</span>
                </a-menu-item>
                <a-sub-menu key="sub">
                    <template #icon>
                        <MailOutlined />
                    </template>
                    <template #title>Navigation One</template>
                    <a-menu-item key="5">Option 5</a-menu-item>
                    <a-menu-item key="6">Option 6</a-menu-item>
                    <a-menu-item key="7">Option 7</a-menu-item>
                    <a-menu-item key="8">Option 8</a-menu-item>
                </a-sub-menu>
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
import { MenuUnfoldOutlined, PieChartOutlined, MailOutlined, LikeOutlined, CompassOutlined, BarsOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import Tags from '../../components/layout/tags.vue';
import Fullscreen from '@/components/FullScreen.vue';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';
import { notification } from 'ant-design-vue';
const { selectedKeys, userName } = storeToRefs(useStore());
const store = useStore();

const collapsed = ref<boolean>(false);

const ROUTE_INFO = [
    {
        key: '1',
        path: '/echarts',
        title: 'echarts',
    },
    {
        key: '2',
        path: '/map',
        title: 'map',
    },
    {
        key: '3',
        path: '/list',
        title: 'list',
    },
];

const linkTo = ({ item, key, keyPath }: any): void => {
    const path = store.ROUTE_INFO.find(p => p.key === key)?.path || null;
    if (path) {
        store.changeSelectedKeys(keyPath);
        router.push({ path: path });
        store.changeActiveKey(key);
    } else {
        const obj = ROUTE_INFO.find(p => p.key === key);
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

const goOut = (): void => {
    Cookies.remove('haslogin');
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
    padding: 10px 4px 10px 10px;
    img {
        width: 32px;
        height: 32px;
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
    // height: 50px;
    // line-height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 4px #00152914;
}
</style>
