<template>
    <div class="tags">
        <ul>
            <li v-for="(item, index) in tags" :class="{ activeKey: activeKey === item.key }" :key="item.key" @click="changeTags(item)">{{ item.title }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router/router';

import { ROUTE_INFO } from './routeInfo';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
const { activeKey } = storeToRefs(useStore());
const store = useStore();
const tags = ref(ROUTE_INFO);
const changeTags = (obj: any) => {
    store.changeActiveKey(obj);
    router.push({ path: ROUTE_INFO.find(p => p.key === obj.key).path });
};
</script>
<style lang="scss" scoped>
.tags {
    color: #000;
    height: 100%;
    height: 37px;
    margin: 10px 0px;

    ul {
        display: flex;
        height: 37px;
        li {
            cursor: pointer;
            margin-right: 5px;
            padding: 0 10px;
            background: #fff;
            border-radius: 3px;
            color: #000;
            height: 37px;
            line-height: 37px;
            box-sizing: border-box;
        }
        .activeKey {
            color: #fff;
            background-color: #42b983;
            font-weight: 600;
        }
    }
}
</style>
