<template>
    <div class="one-tags">
        <ul>
            <li v-for="(item, index) in tags" :class="{ activeKey: activeKey === item.key }" :key="item.key" @click="changeTags(item)">
                {{ item.title }}
                <span @click.stop="closeTag(item)"><CloseOutlined :style="{ fontSize: '10px' }" /></span>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router/router';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
const { activeKey } = storeToRefs(useStore());
const store = useStore();
const tags = ref(store.ROUTE_INFO);
const changeTags = (obj: any) => {
    store.changeActiveKey(obj);
    store.changeSelectedKeys([obj.key]);
    router.push({ path: store.ROUTE_INFO.find(p => p.key === obj.key).path });
};
const closeTag = (item: any) => {
    let index = store.ROUTE_INFO.findIndex(p => p.key === item.key);
    store.SET_ROUTE_INFO(0, activeKey.value == item.key ? true : false, index);
};
</script>
<style lang="scss" scoped>
.one-tags {
    color: #000;
    height: 100%;
    height: 30px;
    margin: 5px 0px;

    ul {
        display: flex;
        height: 100%;
        padding-left: 27px;

        li {
            cursor: pointer;
            margin-right: 5px;
            padding: 0 10px;
            background: #eee;
            border-radius: 3px;
            color: #000;
            height: 100%;
            line-height: 30px;
            box-sizing: border-box;
            order: 0.5px solid #ccc;
        }
        .activeKey {
            color: #fff;
            background-color: #42b983;
            font-weight: 600;
        }
    }
}
</style>
