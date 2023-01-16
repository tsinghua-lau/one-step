<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="action">
                <img src="../../assets/logo.png" st alt="" />
                <div class="title" v-if="!collapsed">欢迎开发者</div>
            </div>

            <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" @click="linkTo">
                <a-menu-item key="1">
                    <LikeOutlined />
                    <span>echarts</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <LikeOutlined />
                    <span>高德地图</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <LikeOutlined />
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

                <div class="layout-header-right"></div>
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
import { MenuUnfoldOutlined, MailOutlined, LikeOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import Tags from '../../components/layout/tags.vue';
import { ROUTE_INFO } from './routeInfo';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { debug } from 'console';
const { selectedKeys } = storeToRefs(useStore());
const store = useStore();

const collapsed = ref<boolean>(false);

const linkTo = ({ item, key, keyPath }: any): void => {
    store.changeSelectedKeys(keyPath);
    router.push({ path: ROUTE_INFO.find(p => p.key === key).path });
    store.changeActiveKey2(key);
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
