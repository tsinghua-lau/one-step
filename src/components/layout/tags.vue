<template>
    <div class="one-tags">
        <ul>
            <li v-for="(item, index) in tags" class="tags-btn" :class="{ activeKey: activeKey === item.key }" :key="item.key" @click="changeTags(item)">
                {{ item.title }}
                <span @click.stop="closeTag(item)"><CloseOutlined class="close-svg" :style="{ fontSize: '8px', padding: '3px' }" /></span>
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
    store.DEL_ROUTE_INFO(activeKey.value == item.key ? true : false, index);
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
            position: relative;
            span {
                .close-svg {
                    border-radius: 50%;
                    transition: all 0.5s;
                    &:hover {
                        background-color: #ccc;
                        border-radius: 50%;
                    }
                }
            }
        }

        .tags-btn:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            height: 2px;
            width: 0;
            background: #42b983;
            // box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003, 4px 4px 5px 0px #0002;
            transition: 400ms ease all;
        }
        .tags-btn:after {
            right: inherit;
            top: inherit;
            left: 0;
            bottom: 0;
        }
        .tags-btn:hover:after {
            width: 100%;
            transition: 800ms ease all;
        }

        .activeKey {
            color: #fff;
            background-color: #42b983;
            font-weight: 600;
        }
    }
}
</style>
